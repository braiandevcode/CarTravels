import { createContext, useContext, useReducer, useEffect, type ReactNode } from 'react'
import type { CalculatorState, FactoryTrip } from '../types/calculator'

const initialState: CalculatorState = {
  total: 0,
  agencyPercent: 70,
  driverPercent: 30,
  carPercent: 50,
  carRented: false,
  gas: 0,
  petrol: 0,
  factories: [],
  showFactories: false,
}

const STORAGE_KEY = 'cartravels-state-v1'

function loadStoredState(): CalculatorState | null {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      const parsed = JSON.parse(stored)

      const isOldFormat =
        parsed.carRented === false &&
        typeof parsed.agencyPercent === 'number' &&
        typeof parsed.carPercent === 'number' &&
        parsed.agencyPercent < 50

      const migratedAgency = isOldFormat
        ? parsed.agencyPercent + parsed.carPercent
        : parsed.agencyPercent ?? initialState.agencyPercent

      return {
        ...initialState,
        ...parsed,
        agencyPercent: migratedAgency,
        factories: (parsed.factories || []).map((f: FactoryTrip & { discountPerTrip?: number }) => ({
          ...f,
          discountPerTrip: f.discountPerTrip ?? 0,
        })),
      }
    }
  } catch {
    return null
  }
  return null
}

function saveStateToStorage(state: CalculatorState) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
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
  | { type: 'SET_SHOW_FACTORIES'; payload: boolean }
  | { type: 'ADD_FACTORY'; payload: FactoryTrip }
  | { type: 'UPDATE_FACTORY'; payload: FactoryTrip }
  | { type: 'REMOVE_FACTORY'; payload: string }
  | { type: 'RESET' }

function calculatorReducer(state: CalculatorState, action: Action): CalculatorState {
  switch (action.type) {
    case 'SET_TOTAL':
      return { ...state, total: action.payload }
    case 'SET_AGENCY_PERCENT':
      return { ...state, agencyPercent: action.payload }
    case 'SET_DRIVER_PERCENT':
      return { ...state, driverPercent: action.payload }
    case 'SET_CAR_PERCENT':
      return { ...state, carPercent: action.payload }
    case 'SET_CAR_RENTED': {
      const newValue = action.payload
      if (newValue === state.carRented) {
        return state
      }
      if (newValue === false) {
        const combinedAgency = state.agencyPercent + state.carPercent
        return {
          ...state,
          carRented: false,
          agencyPercent: combinedAgency,
        }
      }
      return { ...state, carRented: newValue }
    }
    case 'SET_GAS':
      return { ...state, gas: action.payload }
    case 'SET_PETROL':
      return { ...state, petrol: action.payload }
    case 'SET_SHOW_FACTORIES':
      return { ...state, showFactories: action.payload, factories: action.payload ? state.factories : [] }
    case 'ADD_FACTORY':
      return { ...state, factories: [...state.factories, action.payload] }
    case 'UPDATE_FACTORY':
      return {
        ...state,
        factories: state.factories.map((f) => (f.id === action.payload.id ? action.payload : f)),
      }
    case 'REMOVE_FACTORY':
      return { ...state, factories: state.factories.filter((f) => f.id !== action.payload) }
    case 'RESET':
      return initialState
    default:
      return state
  }
}

interface CalculatorContextType {
  state: CalculatorState
  dispatch: React.Dispatch<Action>
}

const CalculatorContext = createContext<CalculatorContextType | null>(null)

export function CalculatorProvider({ children }: { children: ReactNode }) {
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

export function useCalculatorContext() {
  const ctx = useContext(CalculatorContext)
  if (!ctx) {
    throw new Error('useCalculatorContext must be used within CalculatorProvider')
  }
  return ctx
}
