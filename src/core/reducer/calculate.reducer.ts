import { initialState } from '../config/calculates.config'
import type { TAction } from '../types/action'
import type { ICalculatorState } from '../types/calculator'

const calculatorReducer = (state: ICalculatorState, action: TAction): ICalculatorState => {
  switch (action.type) {
    case 'SET_TOTAL':
      return { ...state, total: action.payload, calculated: false }
    case 'SET_AGENCY_PERCENT':
      return { ...state, agencyPercent: action.payload, calculated: false }
    case 'SET_DRIVER_PERCENT':
      return { ...state, driverPercent: action.payload, calculated: false }
    case 'SET_CAR_PERCENT':
      return { ...state, carPercent: action.payload, calculated: false }
    case 'SET_CAR_RENTED': {
      const newValue: boolean = action.payload
      if (newValue === state.carRented) {
        return state
      }
      return { ...state, carRented: newValue, calculated: false }
    }
    case 'SET_GAS':
      return { ...state, gas: action.payload, calculated: false }
    case 'SET_PETROL':
      return { ...state, petrol: action.payload, calculated: false }
    case 'SET_SHOW_VOUCHERS':
      return {
        ...state,
        showVouchers: action.payload,
        vouchers: action.payload === false
          ? state.vouchers.filter((v) => v.saved)
          : state.vouchers,
        calculated: false,
      }
    case 'ADD_VOUCHER':
      return { ...state, vouchers: [...state.vouchers, action.payload], calculated: false }
    case 'UPDATE_VOUCHER':
      return {
        ...state,
        vouchers: state.vouchers.map((v) => (v.id === action.payload.id ? action.payload : v)),
        calculated: false,
      }
    case 'SAVE_VOUCHER':
      return {
        ...state,
        vouchers: state.vouchers.map((v) =>
          v.id === action.payload ? { ...v, saved: true, editing: false } : v
        ),
      }
    case 'REMOVE_VOUCHER':
      return { ...state, vouchers: state.vouchers.filter((v) => v.id !== action.payload), calculated: false }
    case 'CLEAR_UNSAVED_VOUCHERS': {
      const savedVouchers = state.vouchers
        .filter((v) => v.saved)
        .map((v) => ({ ...v, editing: false }))

      return {
        ...state,
        vouchers: savedVouchers,
        showVouchers: savedVouchers.length > 0,
        calculated: false,
      }
    }
    case 'CALCULATE':
      return { ...state, calculated: true }
    case 'RESET':
      return { ...initialState, calculated: false }
    default:
      return state
  }
}

export default calculatorReducer;
