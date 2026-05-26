import { useId } from 'react'
import { Pencil } from 'lucide-react'

interface PercentageInputProps {
  label: string
  value: number
  onChange: (value: number) => void
  hint?: string
}

const PercentageInput = ({ label, value, onChange, hint }: PercentageInputProps) => {
  const inputId:string = useId()
  const hintId: string = `${inputId}-hint`

  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center gap-2">
        <label htmlFor={inputId} className="text-sm font-medium text-text-secondary font-display">{label}</label>
        <Pencil className="h-3.5 w-3.5 text-text-muted/60" aria-hidden="true" />
      </div>
      <div className="relative">
        <input
          id={inputId}
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          value={value}
          onChange={(e) => {
            const raw = e.target.value.replace(/\D/g, '')
            onChange(Number(raw))
          }}
          aria-describedby={hint ? hintId : undefined}
          className="w-full rounded-xl input-glass px-4 py-3.5 pr-12 text-lg font-semibold text-text-primary font-display tracking-wide [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
        />
        <span aria-hidden="true" className="absolute right-4 top-1/2 -translate-y-1/2 text-lg font-bold text-accent-amber font-display">%</span>
      </div>
      {hint && <span id={hintId} className="text-xs text-text-muted/70">{hint}</span>}
    </div>
  )
}

export default PercentageInput;
