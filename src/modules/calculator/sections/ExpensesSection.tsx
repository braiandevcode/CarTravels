import { useCallback, type ReactNode, type ChangeEvent } from 'react'
import useCalculatorContext from '../../../core/context/useCalculatorContext'
import Input from '../../../shared/ui/Input'

const parseNumericInput = (e: ChangeEvent<HTMLInputElement>): number => {
  return Number(e.target.value.replace(/\D/g, ''))
}

const ExpensesSection = (): ReactNode => {
  const { state, dispatch } = useCalculatorContext()
  const totalExpenses: number = state.gas + state.petrol

  const handleGasChange = useCallback((e: ChangeEvent<HTMLInputElement>): void => {
    dispatch({ type: 'SET_GAS', payload: parseNumericInput(e) })
  }, [dispatch])

  const handlePetrolChange = useCallback((e: ChangeEvent<HTMLInputElement>): void => {
    dispatch({ type: 'SET_PETROL', payload: parseNumericInput(e) })
  }, [dispatch])

  return (
    <div className="flex flex-col gap-3">
      {totalExpenses > 0 && (
        <div className="flex justify-end">
          <span className="text-sm font-bold text-accent-red font-display">
            -${totalExpenses.toLocaleString()}
          </span>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label="Gas"
          prefix="$"
          numeric
          placeholder="0"
          value={state.gas || ''}
          onChange={handleGasChange}
          formattedValue={state.gas}
        />
        <Input
          label="Nafta"
          prefix="$"
          numeric
          placeholder="0"
          value={state.petrol || ''}
          onChange={handlePetrolChange}
          formattedValue={state.petrol}
        />
      </div>
    </div>
  )
}

export default ExpensesSection
