import { useMemo } from 'react';
import useCalculatorContext from '../../../core/context/useCalculatorContext';
import { calculateResult } from '../../../core/hooks/useCalculator';
import Button from '../../../shared/ui/Button';
import { Calculator, AlertTriangle, BarChart } from 'lucide-react';
import type { ICalculatorResult, IVoucherTrip } from '../../../core/types/calculator';
import { ENameTypesEntity } from '../../../core/enum/ENameTypesEntity';

const PreCalculationView = () => {
  const { state, dispatch } = useCalculatorContext();
  const result: ICalculatorResult = useMemo(() => calculateResult(state), [state]);

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

  const HAS_VOUCHER: boolean = state.vouchers.length > 0;
  const SHOW_VOUCHER_ACTIVE: boolean = state.showVouchers;

  const HAS_VALID_VOUCHER: boolean = SHOW_VOUCHER_ACTIVE && HAS_VOUCHER
    ? state.vouchers.every((v) => v.saved && !v.editing && v.trips > 0 && v.pricePerTrip > 0 && v.name.trim().length > 0)
    : true;

  const HAS_INVALID_VOUCHER: boolean = SHOW_VOUCHER_ACTIVE && HAS_VOUCHER && !HAS_VALID_VOUCHER;

  const FACTORY_FILTERED: IVoucherTrip[] = state.vouchers.filter((v) => v.type === ENameTypesEntity.FACTORY);
  const OTHER_FILTERED: IVoucherTrip[] = state.vouchers.filter((v) => v.type === ENameTypesEntity.OTHER);

  const FACTORY_COUNT: number = FACTORY_FILTERED.length;
  const OTHER_COUNT: number = OTHER_FILTERED.length;

  const FACTORY_TRIPS: number = FACTORY_FILTERED.reduce((s, v) => s + v.trips, 0);
  const FIXED_FEE_SUM: number = FACTORY_FILTERED.reduce((s, v) => s + v.fixedFeePerTrip * v.trips, 0);

  const CAN_CALCULATE: boolean = result.isPercentValid && HAS_VALID_VOUCHER;

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
        <div className="p-2.5 rounded-xl bg-accent-red/10 border border-accent-red/20 flex items-start gap-2">
          <AlertTriangle
            className="h-4 w-4 text-accent-red flex-shrink-0 mt-0.5"
            aria-hidden="true"
          />
          <span className="text-xs text-text-secondary">
            Guardá o actualizá los vales antes de calcular
          </span>
        </div>
      )}

      {!SHOW_VOUCHER_ACTIVE && (
        <div className="py-2 px-3 rounded-lg bg-bg-input/60">
          <span className="text-sm text-text-muted">Sin vouchers cargados</span>
        </div>
      )}

      {!result.isPercentValid && (
        <div className="p-2.5 rounded-xl bg-accent-red/10 border border-accent-red/20 flex items-start gap-2">
          <AlertTriangle
            className="h-4 w-4 text-accent-red flex-shrink-0 mt-0.5"
            aria-hidden="true"
          />
          <span className="text-xs text-text-secondary">
            Los porcentajes suman {result.percentTotal}% — andá a{" "}
            <strong>Reparto</strong> para ajustarlos
          </span>
        </div>
      )}

      <Button
        variant="primary"
        onClick={() => dispatch({ type: "CALCULATE" })}
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
