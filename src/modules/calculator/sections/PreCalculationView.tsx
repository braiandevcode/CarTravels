import { useCallback, type ReactNode } from 'react';
import useCalculatorContext from '../../../core/context/useCalculatorContext';
import Button from '../../../shared/ui/Button';
import StatusBanner from '../../../shared/styles/StatusBanner';
import { Calculator, AlertTriangle, BarChart } from 'lucide-react';
import usePreCalculation from '../hooks/usePreCalculation';

const PreCalculationView = (): ReactNode => {
  const { state, dispatch } = useCalculatorContext();

  const handleCalculate = useCallback((): void => {
    dispatch({ type: 'CALCULATE' })
  }, [dispatch])

  const {
    result,
    HAS_VOUCHER,
    SHOW_VOUCHER_ACTIVE,
    HAS_VALID_VOUCHER,
    HAS_INVALID_VOUCHER,
    FACTORY_COUNT,
    OTHER_COUNT,
    FACTORY_TRIPS,
    FIXED_FEE_SUM,
    CAN_CALCULATE,
  } = usePreCalculation(state)

  if (state.total === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-8 gap-3 opacity-60">
        <div className="text-4xl opacity-30" role="img" aria-label="Calculadora"><BarChart /></div>
        <p className="text-center text-text-muted">
          Primero ingresá el total del día
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 animate-fade-in">
      <div className="flex justify-between py-2.5 px-3 rounded-lg bg-bg-input">
        <span className="text-text-secondary font-medium">Total del día</span>
        <span className="font-bold text-text-primary font-display text-lg">
          ${state.total.toLocaleString()}
        </span>
      </div>

      {HAS_VOUCHER && HAS_VALID_VOUCHER && (
        <div className="flex flex-col gap-1.5 py-2 px-3 rounded-lg bg-accent-amber/5 border border-accent-amber/10">
          <span className="text-xs font-semibold text-text-muted uppercase tracking-wide font-display">
            Vales cargados
          </span>
          {FACTORY_COUNT > 0 && (
            <span className="text-sm text-text-secondary flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-accent-amber" />
              {FACTORY_COUNT} vale{FACTORY_COUNT > 1 ? "s" : ""} fábrica ·{" "}
              {FACTORY_TRIPS} viaje{FACTORY_TRIPS > 1 ? "s" : ""} · $
              {FIXED_FEE_SUM.toLocaleString()} fijo
            </span>
          )}
          {OTHER_COUNT > 0 && (
            <span className="text-sm text-text-secondary flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-accent-amber/60" />
              {OTHER_COUNT} vale{OTHER_COUNT > 1 ? "s" : ""} otro
            </span>
          )}
        </div>
      )}

      {HAS_INVALID_VOUCHER && (
        <StatusBanner variant="error" icon={<AlertTriangle className="h-full w-full" aria-hidden="true" />}>
          Guardá o actualizá los vales antes de calcular
        </StatusBanner>
      )}

      {!SHOW_VOUCHER_ACTIVE && (
        <div className="py-2 px-3 rounded-lg bg-bg-input/60">
          <span className="text-sm text-text-muted">Sin vouchers cargados</span>
        </div>
      )}

      {!result.isPercentValid && (
        <StatusBanner variant="error" icon={<AlertTriangle className="h-full w-full" aria-hidden="true" />}>
          Los porcentajes suman {result.percentTotal}% — andá a <strong>Reparto</strong> para ajustarlos
        </StatusBanner>
      )}

      <Button
        variant="primary"
        onClick={handleCalculate}
        className="py-4 text-lg"
        disabled={!CAN_CALCULATE}
      >
        <Calculator className="h-5 w-5" aria-hidden="true" />
        Calcular resultados
      </Button>
    </div>
  );
}

export default PreCalculationView;
