import type { CalculatorState, CalculatorResult, FactoryDetail } from '../types/calculator'

export function calculateResult(state: CalculatorState): CalculatorResult {
  const { total, agencyPercent, driverPercent, carPercent, carRented, gas, petrol, factories } = state

  const factoryDetails: FactoryDetail[] = factories.map((f) => ({
    name: f.name,
    trips: f.trips,
    pricePerTrip: f.pricePerTrip,
    discountPerTrip: f.discountPerTrip,
    factorySubtotal: f.trips * f.pricePerTrip,
    discountSubtotal: f.trips * f.discountPerTrip,
  }))

  const factoryTotal = factoryDetails.reduce((sum, f) => sum + f.factorySubtotal, 0)
  const discountTotal = factoryDetails.reduce((sum, f) => sum + f.discountSubtotal, 0)

  const difference = factoryTotal - discountTotal
  const adjustedTotal = factoryTotal > 0 ? total - difference : total

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

  const finalAgency = agencyAmount

  const isPercentValid = percentTotal === 100

  return {
    adjustedTotal,
    agencyAmount,
    agencyDisplayPercent,
    driverAmount,
    carAmount,
    gas,
    petrol,
    factoryTotal,
    discountTotal,
    factoryDetails,
    finalAgency,
    percentTotal,
    isPercentValid,
  }
}
