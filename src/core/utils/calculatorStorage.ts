import { EStoreKey } from '../enum/EStoreKey'
import { ENameTypesEntity } from '../enum/ENameTypesEntity'
import { initialState } from '../config/calculates.config'
import type { ICalculatorState, IVoucherTrip } from '../types/calculator'

export const loadStoredState = (): ICalculatorState | null => {
  try {
    const STORED: string | null = localStorage.getItem(EStoreKey.CAR_TRAVELS)
    if (STORED) {
      const PARSED = JSON.parse(STORED)
      const CAR_NOT_RENTED: boolean = PARSED.carRented === false
      const IS_NUMBER_AGENCY_PERCENT: boolean = typeof PARSED.agencyPercent === 'number'
      const IS_NUMBER_CAR_PERCENT: boolean = typeof PARSED.carPercent === 'number'

      const isOldFormat: boolean = CAR_NOT_RENTED && IS_NUMBER_AGENCY_PERCENT && IS_NUMBER_CAR_PERCENT &&
        PARSED.agencyPercent < 50

      if (ENameTypesEntity.FACTORY in PARSED) {
        return null
      }

      const migratedAgency = isOldFormat
        ? PARSED.agencyPercent + PARSED.carPercent
        : PARSED.agencyPercent ?? initialState.agencyPercent

      return {
        ...initialState,
        ...PARSED,
        agencyPercent: migratedAgency,
        vouchers: (PARSED.vouchers || []).map((v: IVoucherTrip & { fixedFeePerTrip?: number; fixedPricePerTrip?: number }) => ({
          ...v,
          saved: true,
          editing: false,
          fixedFeePerTrip: v.type === ENameTypesEntity.FACTORY ? (v.fixedFeePerTrip ?? v.fixedPricePerTrip ?? 0) : 0,
        })),
      }
    }
  } catch {
    return null
  }
  return null
}

export const saveStateToStorage = (state: ICalculatorState): void => {
  try {
    const stateToSave = {
      ...state,
      vouchers: state.vouchers
        .filter((v) => v.saved)
        .map((v) => ({ ...v, editing: false })),
    }
    localStorage.setItem(EStoreKey.CAR_TRAVELS, JSON.stringify(stateToSave))
  } catch {
    // IGNORO ERRORES DE STORAGE
  }
}
