import type { CalculatorState, CalculatorResult, FactoryDetail } from '../types/calculator'

export function calculateResult(state: CalculatorState): CalculatorResult {
  const { total, agencyPercent, driverPercent, carPercent, carRented, gas, petrol, factories } = state

  const driverAmount: number = total * (driverPercent / 100)

  let agencyAmount: number
  let agencyDisplayPercent: number
  let carAmount: number | null
  let finalAgency: number
  let percentTotal: number

  if (carRented) {
    agencyAmount = total * (agencyPercent / 100)
    agencyDisplayPercent = agencyPercent
    carAmount = (total * (carPercent / 100)) - (gas + petrol)
    finalAgency = agencyAmount
    percentTotal = agencyPercent + driverPercent + carPercent
  } else {
    agencyDisplayPercent = agencyPercent
    agencyAmount = total * (agencyDisplayPercent / 100)
    carAmount = null
    finalAgency = agencyAmount
    percentTotal = agencyPercent + driverPercent
  }

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

  if (factoryTotal > 0) {
    finalAgency = (finalAgency + factoryTotal) - discountTotal
  }

  const isPercentValid = percentTotal === 100

  return {
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
