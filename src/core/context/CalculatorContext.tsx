import { createContext, useContext, useReducer, useEffect, type ReactNode, type Dispatch } from 'react'
import type { CalculatorState, ValeTrip } from '../types/calculator'
import { initialState } from '../config/calculates.config'
import { EStoreKey } from '../enum/EStoreKey'

const loadStoredState = (): CalculatorState | null => {
  try {
    const stored:string | null = localStorage.getItem(EStoreKey.CAR_TRAVELS)
    if (stored) {
      const parsed = JSON.parse(stored)

      const isOldFormat: boolean =
        parsed.carRented === false &&
        typeof parsed.agencyPercent === 'number' &&
        typeof parsed.carPercent === 'number' &&
        parsed.agencyPercent < 50

      // Si el estado guardado tiene formato viejo (factories), ignorar y empezar limpio
      if ('factories' in parsed) {
        return null
      }

      const migratedAgency = isOldFormat
        ? parsed.agencyPercent + parsed.carPercent
        : parsed.agencyPercent ?? initialState.agencyPercent

      return {
        ...initialState,
        ...parsed,
        agencyPercent: migratedAgency,
        vales: (parsed.vales || []).map((v: ValeTrip & { fixedFeePerTrip?: number; discountPerTrip?: number }) => ({
          ...v,
          fixedFeePerTrip: v.type === 'fabrica' ? (v.fixedFeePerTrip ?? v.discountPerTrip ?? 0) : 0,
        })),
      }
    }
  } catch {
    return null
  }
  return null
}

const saveStateToStorage = (state: CalculatorState):void => {
  try {
    localStorage.setItem(EStoreKey.CAR_TRAVELS, JSON.stringify(state))
  } catch {
    // Ignore storage errors
  }
}

type Action =
  | { type: 'SET_TOTAL'; payload: number }
  | { type: 'SET_AGENCY_PERCENT'; payload: number }
  | { type: 'SET_DRIVER_PERCENT'; payload: number }
  | { type: 'SET_CAR_PERCENT'; payload: number }
  | { type: 'SET_CAR_RENTED'; payload: boolean }
  | { type: 'SET_GAS'; payload: number }
  | { type: 'SET_PETROL'; payload: number }
  | { type: 'SET_SHOW_VALES'; payload: boolean }
  | { type: 'ADD_VALE'; payload: ValeTrip }
  | { type: 'UPDATE_VALE'; payload: ValeTrip }
  | { type: 'REMOVE_VALE'; payload: string }
  | { type: 'CALCULATE' }
  | { type: 'RESET' }

const calculatorReducer = (state: CalculatorState, action: Action): CalculatorState => {
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
    case 'SET_SHOW_VALES':
      return { ...state, showVales: action.payload, vales: action.payload ? state.vales : [], calculated: false }
    case 'ADD_VALE':
      return { ...state, vales: [...state.vales, action.payload], calculated: false }
    case 'UPDATE_VALE':
      return {
        ...state,
        vales: state.vales.map((v) => (v.id === action.payload.id ? action.payload : v)),
        calculated: false,
      }
    case 'REMOVE_VALE':
      return { ...state, vales: state.vales.filter((v) => v.id !== action.payload), calculated: false }
    case 'CALCULATE':
      return { ...state, calculated: true }
    case 'RESET':
      return { ...initialState, calculated: false }
    default:
      return state
  }
}

interface CalculatorContextType {
  state: CalculatorState
  dispatch: Dispatch<Action>
}

const CalculatorContext = createContext<CalculatorContextType | null>(null)

export const CalculatorProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(
    calculatorReducer,
    initialState,
    (initial) => loadStoredState() || initial
  )

  useEffect(() => {
    saveStateToStorage(state)
  }, [state])

  return (
    <CalculatorContext.Provider value={{ state, dispatch }}>
      {children}
    </CalculatorContext.Provider>
  )
}

const useCalculatorContext = () =>{
  const ctx = useContext(CalculatorContext)
  if (!ctx) {
    throw new Error('useCalculatorContext must be used within CalculatorProvider')
  }
  return ctx
}
export default useCalculatorContext;
