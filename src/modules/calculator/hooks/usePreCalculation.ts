import { useMemo } from 'react'
import type { ICalculatorResult, ICalculatorState, IVoucherTrip } from '../../../core/types/calculator'
import { ENameTypesEntity } from '../../../core/enum/ENameTypesEntity'
import { calculateResult } from '../../../core/hooks/useCalculator'

interface IUsePreCalculationReturn {
  result: ICalculatorResult
  HAS_VOUCHER: boolean
  SHOW_VOUCHER_ACTIVE: boolean
  HAS_VALID_VOUCHER: boolean
  HAS_INVALID_VOUCHER: boolean
  FACTORY_COUNT: number
  OTHER_COUNT: number
  FACTORY_TRIPS: number
  FIXED_FEE_SUM: number
  CAN_CALCULATE: boolean
}

const usePreCalculation = (state: ICalculatorState): IUsePreCalculationReturn => {
  const result: ICalculatorResult = useMemo(() => calculateResult(state), [state])

  const HAS_VOUCHER: boolean = state.vouchers.length > 0
  const SHOW_VOUCHER_ACTIVE: boolean = state.showVouchers

  const HAS_VALID_VOUCHER: boolean = SHOW_VOUCHER_ACTIVE && HAS_VOUCHER
    ? state.vouchers.every((v) => v.saved && !v.editing && v.trips > 0 && v.pricePerTrip > 0 && v.name.trim().length > 0)
    : true

  const HAS_INVALID_VOUCHER: boolean = SHOW_VOUCHER_ACTIVE && HAS_VOUCHER && !HAS_VALID_VOUCHER

  const FACTORY_FILTERED: IVoucherTrip[] = state.vouchers.filter((v) => v.type === ENameTypesEntity.FACTORY)
  const OTHER_FILTERED: IVoucherTrip[] = state.vouchers.filter((v) => v.type === ENameTypesEntity.OTHER)

  const FACTORY_COUNT: number = FACTORY_FILTERED.length
  const OTHER_COUNT: number = OTHER_FILTERED.length

  const FACTORY_TRIPS: number = FACTORY_FILTERED.reduce((s, v) => s + v.trips, 0)
  const FIXED_FEE_SUM: number = FACTORY_FILTERED.reduce((s, v) => s + v.fixedFeePerTrip * v.trips, 0)

  const CAN_CALCULATE: boolean = result.isPercentValid && HAS_VALID_VOUCHER

  return {
    result,
    HAS_VOUCHER,
    SHOW_VOUCHER_ACTIVE,
    HAS_VALID_VOUCHER,
    HAS_INVALID_VOUCHER,
    FACTORY_COUNT,
    OTHER_COUNT,
    FACTORY_TRIPS,
    FIXED_FEE_SUM,
    CAN_CALCULATE,
  }
}

export default usePreCalculation
