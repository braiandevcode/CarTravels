import type { IVoucherTrip } from './calculator';

export type TAction =
  | { type: 'SET_TOTAL'; payload: number }
  | { type: 'SET_AGENCY_PERCENT'; payload: number }
  | { type: 'SET_DRIVER_PERCENT'; payload: number }
  | { type: 'SET_CAR_PERCENT'; payload: number }
  | { type: 'SET_CAR_RENTED'; payload: boolean }
  | { type: 'SET_GAS'; payload: number }
  | { type: 'SET_PETROL'; payload: number }
  | { type: 'SET_SHOW_VOUCHERS'; payload: boolean }
  | { type: 'ADD_VOUCHER'; payload: IVoucherTrip }
  | { type: 'UPDATE_VOUCHER'; payload: IVoucherTrip }
  | { type: 'SAVE_VOUCHER'; payload: string }
  | { type: 'REMOVE_VOUCHER'; payload: string }
  | { type: 'CLEAR_UNSAVED_VOUCHERS' }
  | { type: 'CALCULATE' }
  | { type: 'RESET' }
