import type { CalculatorState, CalculatorResult, ValeDetail } from '../types/calculator'

export function calculateResult(state: CalculatorState): CalculatorResult {
  const { total, agencyPercent, driverPercent, carPercent, carRented, gas, petrol, vales } = state

  const valeDetails: ValeDetail[] = vales.map((v) => ({
    id: v.id,
    type: v.type,
    name: v.name,
    trips: v.trips,
    pricePerTrip: v.pricePerTrip,
    discountPerTrip: v.type === 'fabrica' ? v.discountPerTrip : 0,
    subtotal: v.trips * v.pricePerTrip,
    discountSubtotal: v.type === 'fabrica' ? v.trips * v.discountPerTrip : 0,
  }))

  const fabricaDetails = valeDetails.filter((v) => v.type === 'fabrica')
  const otroDetails = valeDetails.filter((v) => v.type === 'otro')

  const fabricaTotal = fabricaDetails.reduce((sum, v) => sum + v.subtotal, 0)
  const descuentoTotal = fabricaDetails.reduce((sum, v) => sum + v.discountSubtotal, 0)
  const otroTotal = otroDetails.reduce((sum, v) => sum + v.subtotal, 0)

  const gananciaFabricaTotal = fabricaTotal - descuentoTotal
  const adjustedTotal = total - descuentoTotal

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

  const deduction = gananciaFabricaTotal + otroTotal
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
    descuentoTotal,
    gananciaFabricaTotal,
    otroTotal,
    finalAgency,
    percentTotal,
    isPercentValid,
  }
}
