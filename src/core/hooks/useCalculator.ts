import type { ICalculatorState, ICalculatorResult, IVoucherDetail } from '../types/calculator'

export function calculateResult(state: ICalculatorState): ICalculatorResult {
  const { total, agencyPercent, driverPercent, carPercent, carRented, gas, petrol, vouchers, showVouchers } = state
  const effectiveVouchers = showVouchers ? vouchers : []

  const voucherDetailList: IVoucherDetail[] = effectiveVouchers.map((v) => ({
    id: v.id,
    type: v.type,
    name: v.name,
    trips: v.trips,
    pricePerTrip: v.pricePerTrip,
    fixedFeePerTrip: v.type === 'factory' ? v.fixedFeePerTrip : 0,
    subtotal: v.trips * v.pricePerTrip,
    fixedFeeSubtotal: v.type === 'factory' ? v.trips * v.fixedFeePerTrip : 0,
  }))

  const ONE_HUNDRED: number = 100

  const factoryDetails: IVoucherDetail[] = voucherDetailList.filter((v) => v.type === 'factory')
  const otherDetails: IVoucherDetail[] = voucherDetailList.filter((v) => v.type === 'other')

  const factoryTotal: number = factoryDetails.reduce((sum, v) => sum + v.subtotal, 0)
  const fixedFeeTotal: number = factoryDetails.reduce((sum, v) => sum + v.fixedFeeSubtotal, 0)
  const otherTotal: number = otherDetails.reduce((sum, v) => sum + v.subtotal, 0)

  const factoryEarningsTotal: number = factoryTotal - fixedFeeTotal
  const adjustedTotal: number = total - factoryEarningsTotal

  const driverAmount: number = adjustedTotal * (driverPercent / ONE_HUNDRED)

  let agencyAmount: number
  let agencyDisplayPercent: number
  let carAmount: number | null
  let percentTotal: number

  if (carRented) {
    agencyAmount = adjustedTotal * (agencyPercent / ONE_HUNDRED)
    agencyDisplayPercent = agencyPercent
    carAmount = Math.max(0, (adjustedTotal * (carPercent / ONE_HUNDRED)) - (gas + petrol))
    percentTotal = agencyPercent + driverPercent + carPercent
  } else {
    agencyDisplayPercent = agencyPercent
    agencyAmount = adjustedTotal * (agencyDisplayPercent / ONE_HUNDRED)
    carAmount = null
    percentTotal = agencyPercent + driverPercent
  }

  const deduction = fixedFeeTotal + otherTotal
  const finalAgency = agencyAmount - deduction

  const isPercentValid = percentTotal === ONE_HUNDRED

  return {
    adjustedTotal,
    agencyAmount,
    agencyDisplayPercent,
    driverAmount,
    carAmount,
    gas,
    petrol,
    voucherDetails: voucherDetailList,
    factoryTotal,
    fixedFeeTotal,
    factoryEarningsTotal,
    otherTotal,
    finalAgency,
    percentTotal,
    isPercentValid,
  }
}
