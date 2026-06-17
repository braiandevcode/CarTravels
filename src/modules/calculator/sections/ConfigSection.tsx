import { useCallback, useMemo, type ReactNode } from 'react'
import useCalculatorContext from '../../../core/context/useCalculatorContext'
import Toggle from '../../../shared/ui/Toggle'
import HelpHint from '../../../shared/ui/HelpHint'
import PercentageInput from '../../../shared/ui/PercentageInput'
import { AlertCircle, CheckCircle2 } from 'lucide-react'

const ConfigSection = (): ReactNode => {
  const { state, dispatch } = useCalculatorContext()
  const PERCENT_TOTAL = 100

  const percentTotal: number = useMemo(() => {
    if (state.carRented) {
      return state.agencyPercent + state.driverPercent + state.carPercent
    }
    return state.agencyPercent + state.driverPercent
  }, [state.carRented, state.agencyPercent, state.driverPercent, state.carPercent])

  const isValid: boolean = percentTotal === PERCENT_TOTAL
  const difference: number = PERCENT_TOTAL - percentTotal

  const handleToggleCarRented = useCallback((v: boolean): void => {
    dispatch({ type: 'SET_CAR_RENTED', payload: v })
  }, [dispatch])

  const handleAgencyPercentChange = useCallback((v: number): void => {
    dispatch({ type: 'SET_AGENCY_PERCENT', payload: v })
  }, [dispatch])

  const handleDriverPercentChange = useCallback((v: number): void => {
    dispatch({ type: 'SET_DRIVER_PERCENT', payload: v })
  }, [dispatch])

  const handleCarPercentChange = useCallback((v: number): void => {
    dispatch({ type: 'SET_CAR_PERCENT', payload: v })
  }, [dispatch])

  return (
    <div className="flex flex-col gap-4">
      <div className="p-3 rounded-xl bg-bg-input border border-border-subtle">
        <div className="flex items-center gap-2">
          <div className="flex-1">
            <Toggle
              label="Vehículo alquilado"
              enabled={state.carRented}
              onChange={handleToggleCarRented}
            />
          </div>
          <HelpHint text="Al activarlo, el % del vehículo se descuenta de la agencia y se agrega al reparto. Ajustá los porcentajes para que sumen 100%." side="bottom" align="end" />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <PercentageInput
          label="% Agencia"
          value={state.agencyPercent}
          onChange={handleAgencyPercentChange}
          hint={state.carRented ? '% Para la agencia' : '% Que se lleva la agencia'}
        />
        <PercentageInput
          label="% Conductor"
          value={state.driverPercent}
          onChange={handleDriverPercentChange}
          hint="Tu porcentaje"
        />
      </div>

      {state.carRented && (
        <PercentageInput
          label="% Vehículo"
          value={state.carPercent}
          onChange={handleCarPercentChange}
          hint="Porcentaje para gastos del vehículo"
        />
      )}

      <div
        className={`p-3 rounded-xl border flex items-start gap-2.5 transition-all duration-300 ${
          isValid
            ? 'bg-accent-teal/10 border-accent-teal/30'
            : 'bg-accent-red/10 border-accent-red/30'
        }`}
      >
        {isValid ? (
          <CheckCircle2 className="h-5 w-5 text-accent-teal flex-shrink-0 mt-0.5" aria-hidden="true" />
        ) : (
          <AlertCircle className="h-5 w-5 text-accent-red flex-shrink-0 mt-0.5" aria-hidden="true" />
        )}

        <div className="flex flex-col gap-0.5">
          <div className="flex items-center gap-2">
            <span className={`text-sm font-bold font-display ${
              isValid ? 'text-accent-teal' : 'text-accent-red'
            }`}>
              Suma: {percentTotal}%
            </span>
            {!isValid && (
              <span className="text-xs text-text-muted font-display">
                (debe ser 100%)
              </span>
            )}
          </div>

          {!isValid && (
            <span className="text-xs text-text-secondary">
              {difference > 0
                ? `Sumá ${difference}% más en total`
                : `Sacá ${Math.abs(difference)}% en total`}
            </span>
          )}
        </div>
      </div>

      {!isValid && (
        <div className="text-xs text-text-muted/80 pl-1">
          Tocá los números de arriba para ajustar
        </div>
      )}
    </div>
  )
}

export default ConfigSection
