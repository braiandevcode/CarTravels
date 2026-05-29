import useCalculatorContext from '../../../core/context/CalculatorContext'
import Input from '../../../shared/ui/Input'

const ExpensesSection = () => {
  const { state, dispatch } = useCalculatorContext()
  const totalExpenses: number = state.gas + state.petrol

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
          onChange={(e) => {
            const raw = e.target.value.replace(/\D/g, '')
            dispatch({ type: 'SET_GAS', payload: Number(raw) })
          }}
          formattedValue={state.gas}
        />
        <Input
          label="Nafta"
          prefix="$"
          numeric
          placeholder="0"
          value={state.petrol || ''}
          onChange={(e) => {
            const raw: string = e.target.value.replace(/\D/g, '')
            dispatch({ type: 'SET_PETROL', payload: Number(raw) })
          }}
          formattedValue={state.petrol}
        />
      </div>
    </div>
  )
}

export default ExpensesSection
