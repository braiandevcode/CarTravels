import { type InputHTMLAttributes, forwardRef, useId } from 'react'

interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label: string
  prefix?: string
  error?: string
  formattedValue?: number
  numeric?: boolean
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, prefix, error, formattedValue, numeric, className = '', inputMode, id: externalId, ...props }, ref) => {
    const generatedId = useId()
    const inputId = externalId || generatedId
    const errorId = `${inputId}-error`
    const formattedId = `${inputId}-formatted`

    return (
      <div className="flex flex-col gap-1.5">
        <label htmlFor={inputId} className="text-sm font-medium text-text-secondary font-display tracking-wide">{label}</label>
        <span
          id={formattedId}
          className="text-xs text-text-muted font-mono -mt-0.5"
          aria-hidden={!(formattedValue !== undefined && formattedValue > 0)}
        >
          {formattedValue !== undefined && formattedValue > 0
            ? `ARS ${formattedValue.toLocaleString('es-AR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
            : '\u00A0'}
        </span>
        <div className="relative">
          {prefix && (
            <span aria-hidden="true" className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted font-semibold text-lg font-display">
              {prefix}
            </span>
          )}
          <input
            ref={ref}
            id={inputId}
            type={numeric ? 'text' : 'text'}
            inputMode={numeric ? 'numeric' : (inputMode || 'text')}
            pattern={numeric ? '[0-9]*' : undefined}
            aria-invalid={error ? 'true' : undefined}
            aria-describedby={error ? errorId : (formattedValue !== undefined && formattedValue > 0 ? formattedId : undefined)}
            className={`w-full rounded-xl input-glass px-4 py-3.5 text-lg font-semibold text-text-primary placeholder:text-text-muted/50 font-display tracking-wide ${
              prefix ? 'pl-10' : ''
            } ${error ? 'border-accent-red focus:border-accent-red focus:shadow-[0_0_0_3px_rgba(239,68,68,0.15)]' : ''} ${className}`}
            {...props}
          />
        </div>
        {error && (
          <span id={errorId} role="alert" className="text-sm text-accent-red font-display">
            {error}
          </span>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'
