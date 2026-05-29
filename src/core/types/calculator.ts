export interface ValeTrip {
  id: string
  type: 'fabrica' | 'otro'
  name: string
  trips: number
  pricePerTrip: number
  fixedFeePerTrip: number
}

export interface CalculatorState {
  total: number
  agencyPercent: number
  driverPercent: number
  carPercent: number
  carRented: boolean
  gas: number
  petrol: number
  vales: ValeTrip[]
  showVales: boolean
  calculated: boolean
}

export interface ValeDetail {
  id: string
  type: 'fabrica' | 'otro'
  name: string
  trips: number
  pricePerTrip: number
  fixedFeePerTrip: number
  subtotal: number
  fixedFeeSubtotal: number
}

export interface CalculatorResult {
  adjustedTotal: number
  agencyAmount: number
  agencyDisplayPercent: number
  driverAmount: number
  carAmount: number | null
  gas: number
  petrol: number
  valeDetails: ValeDetail[]
  fabricaTotal: number
  fixedFeeTotal: number
  gananciaFabricaTotal: number
  otroTotal: number
  finalAgency: number
  percentTotal: number
  isPercentValid: boolean
}
