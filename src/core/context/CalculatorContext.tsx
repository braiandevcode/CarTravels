import { useReducer, useEffect, useMemo, type ReactNode } from 'react'
import type { ICalculatorState, IVoucherTrip } from '../types/calculator'
import { EStoreKey } from '../enum/EStoreKey'
import { ENameTypesEntity } from '../enum/ENameTypesEntity'
import { initialState } from '../config/calculates.config'
import calculatorReducer from '../reducer/calculate.reducer'
import { debounce } from '../../shared/lib/debounce'
import { CalculatorContext } from './calculatorContextValue'

// CARGO DATOS DEL STORAGE
const loadStoredState = (): ICalculatorState | null => {
  try {
    const STORED:string | null = localStorage.getItem(EStoreKey.CAR_TRAVELS)
    if (STORED) {
      const PARSED = JSON.parse(STORED)
      const CAR_NOT_RENTED: boolean = PARSED.carRented === false // AUTO NO ALQUILADO
      const IS_NUMBER_AGENCY_PERCENT: boolean = typeof PARSED.agencyPercent === 'number'; //VERIFICO SI PORCENTAJE DE AGENCIA ES NUMERO
      const IS_NUMBER_CAR_PERCENT:boolean = typeof PARSED.carPercent === 'number'; // VERIFICO SI PORCENTAJE DEL AUTO ES NUMERO

      // VERIFICO SI EL FORMATO ES VIEJO
      const isOldFormat: boolean = CAR_NOT_RENTED && IS_NUMBER_AGENCY_PERCENT && IS_NUMBER_CAR_PERCENT &&
        PARSED.agencyPercent < 50

      // SI ESTADO GUARDADO TIENE FORMATO VIEJO, IGNORO Y EMPIEZO LIMPIO
      if (ENameTypesEntity.FACTORY in PARSED) {
        return null
      }

      // MIGRO DATOS DE AGENCIA
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

// GUARDO DATOS EN STORAGE (solo vales con saved: true)
const saveStateToStorage = (state: ICalculatorState):void => {
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

// PROVEO CALCULOS DE LOS DATOS
export const CalculatorProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(calculatorReducer, initialState, (initial) => loadStoredState() || initial)

  const debouncedSave = useMemo(() => debounce(saveStateToStorage, 300), [])

  const HANDLE_STATE_PERSISTENCE = (): void => {
    debouncedSave(state)
  }
  useEffect(HANDLE_STATE_PERSISTENCE, [state, debouncedSave])

  return (
    <CalculatorContext.Provider value={{ state, dispatch }}>
      {children}
    </CalculatorContext.Provider>
  )
}
