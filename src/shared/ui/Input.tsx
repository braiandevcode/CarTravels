import { type InputHTMLAttributes, forwardRef, useId } from 'react'

interface IInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label: string
  prefix?: string
  error?: string
  formattedValue?: number
  numeric?: boolean
}

const Input = forwardRef<HTMLInputElement, IInputProps>(
  ({ label, prefix, error, formattedValue, numeric, className = '', inputMode, id: externalId, ...props }, ref) => {
    const generatedId: string = useId()
    const inputId: string = externalId || generatedId
    const errorId: string = `${inputId}-error`
    const formattedId:string = `${inputId}-formatted`

    return (
      <div className="flex flex-col gap-1">
        <label htmlFor={inputId} className="text-base font-bold text-text-primary font-display tracking-wide">{label}</label>
        <div className="relative">
          {prefix && (
            <span aria-hidden="true" className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted font-semibold text-lg font-display">
              {prefix}
            </span>
          )}
          <input
            ref={ref}
            id={inputId}
            type="text"
            inputMode={numeric ? 'numeric' : (inputMode || 'text')}
            pattern={numeric ? '[0-9]*' : undefined}
            aria-invalid={error ? 'true' : undefined}
            aria-describedby={error ? errorId : (formattedValue !== undefined && formattedValue > 0 ? formattedId : undefined)}
            className={`w-full rounded-xl input-glass px-4 py-3.5 text-lg font-semibold text-text-primary placeholder:text-text-muted/50 font-display tracking-wide ${
              prefix ? 'pl-10' : ''
            } ${error ? 'input-error' : ''} ${className}`}
            {...props}
          />
        </div>
        {formattedValue !== undefined && formattedValue > 0 && (
          <span
            id={formattedId}
            className="text-xs text-text-muted font-mono"
          >
            {`ARS ${formattedValue.toLocaleString('es-AR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
          </span>
        )}
        {error && (
          <span id={errorId} role="alert" className="text-sm font-medium text-accent-red font-display">
            {error}
          </span>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'

export default Input;
