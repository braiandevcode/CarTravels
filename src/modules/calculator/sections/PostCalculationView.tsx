import { useMemo } from 'react';
import useCalculatorContext from '../../../core/context/useCalculatorContext';
import { calculateResult } from '../../../core/hooks/useCalculator';
import Button from '../../../shared/ui/Button';
import VoucherDetailList from '../components/VoucherDetailList';
import { Eye, AlertTriangle, CheckCircle2 } from 'lucide-react';
import type { ICalculatorResult } from '../../../core/types/calculator';

interface IPostCalculationViewProps {
  onViewReceipt: () => void;
}

const CarSection = ({ state, result }: { state: ReturnType<typeof useCalculatorContext>['state']; result: ICalculatorResult }) => {
  const grossCar: number = result.adjustedTotal * (state.carPercent / 100);
  const totalExpenses: number = state.gas + state.petrol;
  return (
    <>
      <div className="subtle-divider my-2" />
      <div className="flex justify-between py-2 px-3 rounded-lg bg-accent-red/5">
        <span className="text-text-secondary">Vehículo ({state.carPercent}%)</span>
        <span className={`font-semibold font-display ${result.carAmount! >= 0 ? "text-accent-teal" : "text-accent-red"}`}>
          {result.carAmount! >= 0 ? "+" : ""}${result.carAmount!.toLocaleString()}
        </span>
      </div>
      <div className="text-xs text-text-muted/70 -mt-0.5 mb-1 pl-3 font-mono bg-bg-input/50 py-1.5 px-3 rounded-lg">
        ${grossCar.toLocaleString()} ({state.carPercent}%)
        {totalExpenses > 0 && <> - ${totalExpenses.toLocaleString()} gastos</>}
        {" = "}${result.carAmount!.toLocaleString()}
      </div>
    </>
  );
};

const PostCalculationView = ({ onViewReceipt }: IPostCalculationViewProps) => {
  const { state } = useCalculatorContext();
  const result: ICalculatorResult = useMemo(() => calculateResult(state), [state]);

  return (
    <div className="flex flex-col gap-2 text-sm md:text-base animate-fade-in">
      <div className="flex items-center gap-2 px-1 mb-1">
        <CheckCircle2 className="h-4 w-4 text-accent-teal" aria-hidden="true" />
        <span className="text-xs font-semibold text-accent-teal font-display tracking-wide">
          Resultados listos
        </span>
      </div>

      <div className="flex justify-between py-2.5 px-3 rounded-lg bg-bg-input">
        <span className="text-text-secondary font-medium">Ganancia del día</span>
        <span className="font-bold text-text-primary font-display text-lg">
          ${result.adjustedTotal.toLocaleString()}
        </span>
      </div>

      <div className="subtle-divider my-2" />

      <div className="rounded-xl bg-accent-amber/8 border border-accent-amber/15 p-3 space-y-2">
        <div className="flex justify-between p-2 rounded-lg hover:bg-bg-input/50 transition-colors">
          <span className="text-text-secondary">
            Agencia ({result.agencyDisplayPercent}%){" "}
            {result.voucherDetails.length > 0 ? "+ desc" : ""}
          </span>
          <span
            className={`font-semibold font-display ${result.finalAgency >= 0 ? "text-accent-amber" : "text-accent-red"}`}
          >
            ${result.finalAgency.toLocaleString()}
          </span>
        </div>
      </div>

      {result.voucherDetails.length > 0 && (
        <div className="text-xs text-text-muted/70 -mt-0.5 mb-1 pl-3 font-mono bg-bg-input/50 py-1.5 px-3 rounded-lg">
          ${result.agencyAmount.toLocaleString()}
          {result.fixedFeeTotal > 0 && (
            <> - ${result.fixedFeeTotal.toLocaleString()}</>
          )}
          {result.otherTotal > 0 && <> - ${result.otherTotal.toLocaleString()}</>}
        </div>
      )}

      <div className="rounded-xl bg-accent-amber/8 border border-accent-amber/15 p-3 space-y-2">
        <div className="flex justify-between">
          <span className="text-text-secondary">Conductor ({state.driverPercent}%)</span>
          <span className="font-semibold text-accent-teal font-display">
            +${result.driverAmount.toLocaleString()}
          </span>
        </div>
      </div>

      {state.gas > 0 && (
        <div className="flex justify-between py-2 px-3 rounded-lg bg-accent-red/5 hover:bg-accent-red/10 transition-colors">
          <span className="text-text-secondary">Gas</span>
          <span className="font-semibold text-accent-red font-display">
            -${state.gas.toLocaleString()}
          </span>
        </div>
      )}

      {state.petrol > 0 && (
        <div className="flex justify-between py-2 px-3 rounded-lg bg-accent-red/5 hover:bg-accent-red/10 transition-colors">
          <span className="text-text-secondary">Nafta</span>
          <span className="font-semibold text-accent-red font-display">
            -${state.petrol.toLocaleString()}
          </span>
        </div>
      )}

      {state.carRented && result.carAmount !== null && <CarSection state={state} result={result} />}

      {result.voucherDetails.length > 0 && (
        <>
          <div className="subtle-divider my-2" />
          <div className="py-2 space-y-1.5">
            <span className="text-xs font-semibold text-text-muted uppercase tracking-wide font-display block px-3 mb-2">
              Vales
            </span>
            <VoucherDetailList voucherDetails={result.voucherDetails} compact />
          </div>
        </>
      )}

      {!result.isPercentValid && (
        <div className="mt-4 p-3 rounded-xl bg-accent-red/10 border border-accent-red/30 flex items-start gap-2.5">
          <AlertTriangle className="h-5 w-5 text-accent-red flex-shrink-0 mt-0.5" aria-hidden="true" />
          <div className="flex flex-col gap-0.5">
            <span className="text-sm font-bold text-accent-red font-display">Falta ajustar los %</span>
            <p className="text-xs text-text-secondary">
              Suma actual: {result.percentTotal}% — tiene que ser 100% para generar el recibo. Andá a <strong>Reparto</strong>.
            </p>
          </div>
        </div>
      )}

      <div className="mt-5">
        <Button variant="primary" onClick={onViewReceipt} disabled={!result.isPercentValid}>
          <Eye className="h-4 w-4" aria-hidden="true" />
          {result.isPercentValid ? "Ver Recibo" : "Ajustá los %"}
        </Button>
      </div>
    </div>
  );
}

export default PostCalculationView;
