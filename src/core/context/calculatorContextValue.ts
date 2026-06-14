import { createContext } from 'react'
import type { ICalculatorContextType } from '../types/calculatorContextType'

export const CalculatorContext = createContext<ICalculatorContextType | null>(null)
