import useCalculatorContext  from '../../../core/context/CalculatorContext'
import  Input  from '../../../shared/ui/Input'
import { DollarSign } from 'lucide-react'

const ExpensesSection = ()  => {
  const { state, dispatch } = useCalculatorContext()
  const totalExpenses: number = state.gas + state.petrol

  return (
    <section aria-label="Gastos del día" className="rounded-2xl card-glass card-accent-top p-5 md:p-6 animate-fade-in-up stagger-3">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent-red/15">
            <DollarSign className="h-4.5 w-4.5 text-accent-red" aria-hidden="true" />
          </div>
          <h2 className="text-lg font-bold text-text-primary font-display tracking-wide">Gastos del Día</h2>
        </div>
        {totalExpenses > 0 && (
          <span className="text-sm font-bold text-accent-red font-display">
            -${totalExpenses.toLocaleString()}
          </span>
        )}
      </div>

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
    </section>
  )
}

export default ExpensesSection;