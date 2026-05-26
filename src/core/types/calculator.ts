export interface FactoryTrip {
  id: string
  name: string
  trips: number
  pricePerTrip: number
  discountPerTrip: number
}

export interface CalculatorState {
  total: number
  agencyPercent: number
  driverPercent: number
  carPercent: number
  carRented: boolean
  gas: number
  petrol: number
  factories: FactoryTrip[]
  showFactories: boolean
}

export interface FactoryDetail {
  name: string
  trips: number
  pricePerTrip: number
  discountPerTrip: number
  factorySubtotal: number
  discountSubtotal: number
}

export interface CalculatorResult {
  agencyAmount: number
  agencyDisplayPercent: number
  driverAmount: number
  carAmount: number | null
  gas: number
  petrol: number
  factoryTotal: number
  discountTotal: number
  factoryDetails: FactoryDetail[]
  finalAgency: number
  percentTotal: number
  isPercentValid: boolean
}
