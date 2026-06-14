import type { ICalculatorState } from '../types/calculator'

export const initialState: ICalculatorState = {
  total: 0,
  agencyPercent: 70,
  driverPercent: 30,
  carPercent: 50,
  carRented: false,
  gas: 0,
  petrol: 0,
  vouchers: [],
  showVouchers: false,
  calculated: false,
}