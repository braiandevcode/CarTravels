import type { CalculatorState } from '../types/calculator'

export const initialState: CalculatorState = {
  total: 0,
  agencyPercent: 70,
  driverPercent: 30,
  carPercent: 50,
  carRented: false,
  gas: 0,
  petrol: 0,
  vales: [],
  showVales: false,
  calculated: false,
}