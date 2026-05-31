import type { CalculatorState, CalculatorResult, ValeDetail } from '../types/calculator'

export function calculateResult(state: CalculatorState): CalculatorResult {
  const { total, agencyPercent, driverPercent, carPercent, carRented, gas, petrol, vales, showVales } = state
  const effectiveVales = showVales ? vales : []

  const valeDetails: ValeDetail[] = effectiveVales.map((v) => ({
    id: v.id,
    type: v.type,
    name: v.name,
    trips: v.trips,
    pricePerTrip: v.pricePerTrip,
    fixedFeePerTrip: v.type === 'fabrica' ? v.fixedFeePerTrip : 0,
    subtotal: v.trips * v.pricePerTrip,
    fixedFeeSubtotal: v.type === 'fabrica' ? v.trips * v.fixedFeePerTrip : 0,
  }))

  const fabricaDetails = valeDetails.filter((v) => v.type === 'fabrica')
  const otroDetails = valeDetails.filter((v) => v.type === 'otro')

  const fabricaTotal = fabricaDetails.reduce((sum, v) => sum + v.subtotal, 0)
  const fixedFeeTotal = fabricaDetails.reduce((sum, v) => sum + v.fixedFeeSubtotal, 0)
  const otroTotal = otroDetails.reduce((sum, v) => sum + v.subtotal, 0)

  const gananciaFabricaTotal = fabricaTotal - fixedFeeTotal
  const adjustedTotal = total - gananciaFabricaTotal

  const driverAmount: number = adjustedTotal * (driverPercent / 100)

  let agencyAmount: number
  let agencyDisplayPercent: number
  let carAmount: number | null
  let percentTotal: number

  if (carRented) {
    agencyAmount = adjustedTotal * (agencyPercent / 100)
    agencyDisplayPercent = agencyPercent
    carAmount = (adjustedTotal * (carPercent / 100)) - (gas + petrol)
    percentTotal = agencyPercent + driverPercent + carPercent
  } else {
    agencyDisplayPercent = agencyPercent
    agencyAmount = adjustedTotal * (agencyDisplayPercent / 100)
    carAmount = null
    percentTotal = agencyPercent + driverPercent
  }

  const deduction = fixedFeeTotal + otroTotal
  const finalAgency = agencyAmount - deduction

  const isPercentValid = percentTotal === 100

  return {
    adjustedTotal,
    agencyAmount,
    agencyDisplayPercent,
    driverAmount,
    carAmount,
    gas,
    petrol,
    valeDetails,
    fabricaTotal,
    fixedFeeTotal,
    gananciaFabricaTotal,
    otroTotal,
    finalAgency,
    percentTotal,
    isPercentValid,
  }
}
