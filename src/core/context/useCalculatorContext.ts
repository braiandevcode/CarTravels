import { useContext } from 'react'
import { CalculatorContext } from './calculatorContextValue'

const useCalculatorContext = () => {
  const ctx = useContext(CalculatorContext)
  if (!ctx) {
    throw new Error('useCalculatorContext must be used within CalculatorProvider')
  }
  return ctx
}

export default useCalculatorContext
