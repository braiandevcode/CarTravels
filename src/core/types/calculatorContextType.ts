import type { Dispatch } from 'react'
import type { ICalculatorState } from './calculator'
import type { TAction } from './action'

// DEFINO FIRMA PARA CALCULO DE REDUCER
export interface ICalculatorContextType {
  state: ICalculatorState
  dispatch: Dispatch<TAction>
}