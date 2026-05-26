import { useCalculatorContext } from '../../../core/context/CalculatorContext'
import { Input } from '../../../shared/ui/Input'
import { TrendingUp } from 'lucide-react'

export function IncomeSection() {
  const { state, dispatch } = useCalculatorContext()

  return (
    <section aria-label="Ingreso del día" className="rounded-2xl card-glass card-accent-top p-5 md:p-6 animate-fade-in-up stagger-2">
      <div className="flex items-center gap-2 mb-4">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent-teal/15">
          <TrendingUp className="h-4.5 w-4.5 text-accent-teal" aria-hidden="true" />
        </div>
        <h2 className="text-lg font-bold text-text-primary font-display tracking-wide">Ingreso del Día</h2>
      </div>

      <Input
        label="Total facturado"
        prefix="$"
        numeric
        placeholder="0"
        value={state.total || ''}
        onChange={(e) => {
          const raw = e.target.value.replace(/\D/g, '')
          dispatch({ type: 'SET_TOTAL', payload: Number(raw) })
        }}
        formattedValue={state.total}
      />

      {state.total > 0 && (
        <div className="mt-3 flex items-center gap-2 text-xs text-text-muted">
          <div className="h-1.5 w-1.5 rounded-full bg-accent-teal animate-pulse" />
          <span>Resultados calculados automáticamente</span>
        </div>
      )}
    </section>
  )
}
