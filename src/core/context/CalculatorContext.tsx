import { useReducer, useEffect, useMemo, type ReactNode } from 'react'
import { initialState } from '../config/calculates.config'
import calculatorReducer from '../reducer/calculate.reducer'
import { debounce } from '../../shared/lib/debounce'
import { CalculatorContext } from './calculatorContextValue'
import { loadStoredState, saveStateToStorage } from '../utils/calculatorStorage'

export const CalculatorProvider = ({ children }: { children: ReactNode }): ReactNode => {
  const [state, dispatch] = useReducer(calculatorReducer, initialState, (initial) => loadStoredState() || initial)

  const debouncedSave = useMemo(() => debounce(saveStateToStorage, 300), [])

  const HANDLE_STATE_PERSISTENCE = (): void => {
    debouncedSave(state)
  }
  useEffect(HANDLE_STATE_PERSISTENCE, [state, debouncedSave])

  return (
    <CalculatorContext.Provider value={{ state, dispatch }}>
      {children}
    </CalculatorContext.Provider>
  )
}
