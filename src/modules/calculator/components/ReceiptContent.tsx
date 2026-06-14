import { useMemo } from 'react';
import useCalculatorContext from '../../../core/context/CalculatorContext';
import { calculateResult } from '../../../core/hooks/useCalculator';
import type { ICalculatorResult } from '../../../core/types/calculator';
import VoucherDetailList from './VoucherDetailList';
import { FaCar } from 'react-icons/fa';

const CarSectionReceipt = ({ state, result }: { state: ReturnType<typeof useCalculatorContext>['state']; result: ICalculatorResult }) => {
  const grossCar = result.adjustedTotal * (state.carPercent / 100);
  const totalExpenses = state.gas + state.petrol;
  return (
    <>
      <div className="subtle-divider" />
      <div className="flex justify-between p-2 rounded-lg hover:bg-bg-input/50 transition-colors">
        <span className="text-text-secondary">Vehículo ({state.carPercent}%)</span>
        <span className={`font-semibold font-display ${result.carAmount! >= 0 ? "text-accent-teal" : "text-accent-red"}`}>
          {result.carAmount! >= 0 ? "+" : ""}${result.carAmount!.toLocaleString()}
        </span>
      </div>
      <div className="text-[11px] text-text-muted/70 -mt-1 pl-2 font-mono">
        ${grossCar.toLocaleString()}
        {totalExpenses > 0 && <> - ${totalExpenses.toLocaleString()}</>}
        {" = "}${result.carAmount!.toLocaleString()}
      </div>
    </>
  );
};

const ReceiptContent = () => {
  const { state } = useCalculatorContext();
  const result: ICalculatorResult = useMemo(() => calculateResult(state), [state]);

  return (
    <div id="receipt-content" className="flex-1 overflow-y-auto p-6 min-h-0">
      <div className="text-center mb-6">
        <div className="inline-flex items-center gap-2 mb-2">
          <div className="w-10 h-10 rounded-full bg-accent-amber/20 flex items-center justify-center">
            <span role="img" aria-label="Auto">
              <FaCar aria-hidden="true" />
            </span>
          </div>
        </div>
        <h1 className="text-2xl font-black text-text-primary font-display tracking-tight">
          CarTravels
        </h1>
        <p className="text-xs text-text-muted mt-1 font-display">
          Resumen de jornada
        </p>
        <div className="subtle-divider mt-4" />
      </div>

      <div className="border border-border-subtle rounded-xl p-4 space-y-3 text-sm bg-bg-card-subtle">
        <div className="flex justify-between items-baseline p-2 rounded-lg bg-bg-input">
          <span className="text-text-secondary font-medium">Ganancia del día</span>
          <span className="text-xl font-black text-text-primary font-display">
            ${result.adjustedTotal.toLocaleString()}
          </span>
        </div>

        <div className="subtle-divider" />

        <div className="space-y-2">
          <span className="text-xs font-semibold text-text-muted uppercase tracking-wider font-display pl-2">
            Distribución
          </span>

          <div>
            <div className="flex justify-between p-2 rounded-lg hover:bg-bg-input/50 transition-colors">
              <span className="text-text-secondary">
                Agencia ({result.agencyDisplayPercent}%){" "}
                {result.voucherDetails.length > 0 ? "+ desc" : ""}
              </span>
              <span className={`font-semibold font-display ${result.finalAgency >= 0 ? "text-accent-amber" : "text-accent-red"}`}>
                ${result.finalAgency.toLocaleString()}
              </span>
            </div>
            {result.voucherDetails.length > 0 && (
              <span className="text-[11px] text-text-muted/70 font-mono text-right px-2">
                ${result.agencyAmount.toLocaleString()}
                {result.fixedFeeTotal > 0 && <> - ${result.fixedFeeTotal.toLocaleString()}</>}
                {result.otherTotal > 0 && <> - ${result.otherTotal.toLocaleString()}</>}
              </span>
            )}
          </div>

          <div className="flex justify-between p-2 rounded-lg hover:bg-bg-input/50 transition-colors">
            <span className="text-text-secondary">Conductor ({state.driverPercent}%)</span>
            <span className="font-semibold text-accent-teal font-display">
              +${result.driverAmount.toLocaleString()}
            </span>
          </div>
        </div>

        {(state.gas > 0 || state.petrol > 0) && (
          <>
            <div className="subtle-divider" />
            <div className="space-y-2">
              <span className="text-xs font-semibold text-text-muted uppercase tracking-wider font-display pl-2">
                Gastos
              </span>
              {state.gas > 0 && (
                <div className="flex justify-between p-2 rounded-lg hover:bg-bg-input/50 transition-colors">
                  <span className="text-text-secondary">Gas</span>
                  <span className="font-semibold text-accent-red font-display">
                    -${state.gas.toLocaleString()}
                  </span>
                </div>
              )}
              {state.petrol > 0 && (
                <div className="flex justify-between p-2 rounded-lg hover:bg-bg-input/50 transition-colors">
                  <span className="text-text-secondary">Nafta</span>
                  <span className="font-semibold text-accent-red font-display">
                    -${state.petrol.toLocaleString()}
                  </span>
                </div>
              )}
            </div>
          </>
        )}

        {state.carRented && result.carAmount !== null && <CarSectionReceipt state={state} result={result} />}

        {result.voucherDetails.length > 0 && (
          <>
            <div className="subtle-divider" />
            <div className="space-y-2">
              <div className="flex justify-between px-2">
                <span className="text-xs font-semibold text-text-muted uppercase tracking-wider font-display">Vales</span>
              </div>
              <div className="mt-1 pl-2">
                <VoucherDetailList voucherDetails={result.voucherDetails} />
              </div>
            </div>
          </>
        )}
      </div>

      <div className="mt-5 text-center text-xs text-text-muted font-display">
        Generado por carTravels &mdash; {new Date().toLocaleDateString("es-AR")}
      </div>
    </div>
  );
};

export default ReceiptContent;
