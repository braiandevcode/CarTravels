export interface IVoucherTrip {
  id: string
  type: 'factory' | 'other'
  name: string
  trips: number
  pricePerTrip: number
  fixedFeePerTrip: number
  saved: boolean
  editing: boolean
}

export interface ICalculatorState {
  total: number
  agencyPercent: number
  driverPercent: number
  carPercent: number
  carRented: boolean
  gas: number
  petrol: number
  vouchers: IVoucherTrip[]
  showVouchers: boolean
  calculated: boolean
}

export interface IVoucherDetail {
  id: string
  type: 'factory' | 'other'
  name: string
  trips: number
  pricePerTrip: number
  fixedFeePerTrip: number
  subtotal: number
  fixedFeeSubtotal: number
}

export interface ICalculatorResult {
  adjustedTotal: number
  agencyAmount: number
  agencyDisplayPercent: number
  driverAmount: number
  carAmount: number | null
  gas: number
  petrol: number
  voucherDetails: IVoucherDetail[]
  factoryTotal: number
  fixedFeeTotal: number
  factoryEarningsTotal: number
  otherTotal: number
  finalAgency: number
  percentTotal: number
  isPercentValid: boolean
}
