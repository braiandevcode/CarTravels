import { useMemo } from "react";
import useCalculatorContext from "../../../core/context/CalculatorContext";
import { calculateResult } from "../../../core/hooks/useCalculator";
import Button from "../../../shared/ui/Button";
import { Calculator, Eye, AlertTriangle, CheckCircle2 } from "lucide-react";
import type { CalculatorResult } from "../../../core/types/calculator";

interface ResultsSectionProps {
  onViewReceipt: () => void;
}

export function ResultsSection({ onViewReceipt }: ResultsSectionProps) {
  const { state, dispatch } = useCalculatorContext();

  const result: CalculatorResult = useMemo(() => calculateResult(state),[state]);

  if (state.total === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-8 gap-3 opacity-60">
        <div
          className="text-4xl opacity-30"
          role="img"
          aria-label="Calculadora"
        >
          📊
        </div>
        <p className="text-center text-text-muted">
          Primero ingresá el total del día
        </p>
      </div>
    );
  }

  if (!state.calculated) {
    const hasVales = state.vales.length > 0;
    const showValesActive = state.showVales;
    const hasValidVales =
      state.showVales && state.vales.length > 0
        ? state.vales.every((v) => v.trips > 0 && v.pricePerTrip > 0)
        : true;
    const hasInvalidVales =
      state.showVales && state.vales.length > 0 && !hasValidVales;
    const fabricaCount = state.vales.filter((v) => v.type === "fabrica").length;
    const otrosCount = state.vales.filter((v) => v.type === "otro").length;
    const fabricaTrips = state.vales
      .filter((v) => v.type === "fabrica")
      .reduce((s, v) => s + v.trips, 0);
    const fixedFeeSum = state.vales
      .filter((v) => v.type === "fabrica")
      .reduce((s, v) => s + v.fixedFeePerTrip * v.trips, 0);

    const canCalculate = result.isPercentValid && hasValidVales;

    return (
      <div className="flex flex-col gap-4 animate-fade-in">
        <div className="flex justify-between py-2.5 px-3 rounded-lg bg-bg-input">
          <span className="text-text-secondary font-medium">Total del día</span>
          <span className="font-bold text-text-primary font-display text-lg">
            ${state.total.toLocaleString()}
          </span>
        </div>

        {hasVales && hasValidVales && (
          <div className="flex flex-col gap-1.5 py-2 px-3 rounded-lg bg-accent-amber/5 border border-accent-amber/10">
            <span className="text-xs font-semibold text-text-muted uppercase tracking-wide font-display">
              Vales cargados
            </span>
            {fabricaCount > 0 && (
              <span className="text-sm text-text-secondary flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-accent-amber" />
                {fabricaCount} vale{fabricaCount > 1 ? "s" : ""} fábrica ·{" "}
                {fabricaTrips} viaje{fabricaTrips > 1 ? "s" : ""} · $
                {fixedFeeSum.toLocaleString()} fijo
              </span>
            )}
            {otrosCount > 0 && (
              <span className="text-sm text-text-secondary flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-accent-amber/60" />
                {otrosCount} vale{otrosCount > 1 ? "s" : ""} otro
              </span>
            )}
          </div>
        )}

        {hasInvalidVales && (
          <div className="p-2.5 rounded-xl bg-accent-red/10 border border-accent-red/20 flex items-start gap-2">
            <AlertTriangle
              className="h-4 w-4 text-accent-red flex-shrink-0 mt-0.5"
              aria-hidden="true"
            />
            <span className="text-xs text-text-secondary">
              Completá los datos de los vales o eliminalos
            </span>
          </div>
        )}

        {!showValesActive && (
          <div className="py-2 px-3 rounded-lg bg-bg-input/60">
            <span className="text-sm text-text-muted">Sin vales cargados</span>
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
          disabled={!canCalculate}
        >
          <Calculator className="h-5 w-5" aria-hidden="true" />
          Calcular resultados
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2 text-sm md:text-base animate-fade-in">
      <div className="flex items-center gap-2 px-1 mb-1">
        <CheckCircle2 className="h-4 w-4 text-accent-teal" aria-hidden="true" />
        <span className="text-xs font-semibold text-accent-teal font-display tracking-wide">
          Resultados listos
        </span>
      </div>

      <div className="flex justify-between py-2.5 px-3 rounded-lg bg-bg-input">
        <span className="text-text-secondary font-medium">
          Ganancia del día
        </span>
        <span className="font-bold text-text-primary font-display text-lg">
          ${result.adjustedTotal.toLocaleString()}
        </span>
      </div>

      <div className="subtle-divider my-2" />

      <div className="rounded-xl bg-accent-amber/8 border border-accent-amber/15 p-3 space-y-2">
        <div className="flex justify-between p-2 rounded-lg hover:bg-bg-input/50 transition-colors">
          <span className="text-text-secondary">
            Agencia ({result.agencyDisplayPercent}%) + desc.
          </span>
          <span
            className={`font-semibold font-display ${result.finalAgency >= 0 ? "text-accent-amber" : "text-accent-red"}`}
          >
            ${result.finalAgency.toLocaleString()}
          </span>
        </div>
      </div>
        <div className="text-xs text-text-muted/70 -mt-0.5 mb-1 pl-3 font-mono bg-bg-input/50 py-1.5 px-3 rounded-lg">
          ${result.agencyAmount.toLocaleString()}
          {result.fixedFeeTotal > 0 && (
            <> - ${result.fixedFeeTotal.toLocaleString()}</>
          )}
          {result.otroTotal > 0 && <> - ${result.otroTotal.toLocaleString()}</>}
        </div>

      <div className="rounded-xl bg-accent-amber/8 border border-accent-amber/15 p-3 space-y-2">
        <div className="flex justify-between">
          <span className="text-text-secondary">
            Conductor ({state.driverPercent}%)
          </span>
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

      {state.carRented &&
        result.carAmount !== null &&
        (() => {
          const grossCar: number =
            result.adjustedTotal * (state.carPercent / 100);
          const totalExpenses: number = state.gas + state.petrol;
          return (
            <>
              <div className="subtle-divider my-2" />
              <div className="flex justify-between py-2 px-3 rounded-lg bg-accent-red/5">
                <span className="text-text-secondary">
                  Vehículo ({state.carPercent}%)
                </span>
                <span
                  className={`font-semibold font-display ${result.carAmount >= 0 ? "text-accent-teal" : "text-accent-red"}`}
                >
                  {result.carAmount >= 0 ? "+" : ""}$
                  {result.carAmount.toLocaleString()}
                </span>
              </div>
              <div className="text-xs text-text-muted/70 -mt-0.5 mb-1 pl-3 font-mono bg-bg-input/50 py-1.5 px-3 rounded-lg">
                ${grossCar.toLocaleString()} ({state.carPercent}%)
                {totalExpenses > 0 && (
                  <> - ${totalExpenses.toLocaleString()} gastos</>
                )}
                {" = "}${result.carAmount.toLocaleString()}
              </div>
            </>
          );
        })()}

      {result.valeDetails.length > 0 && (
        <>
          <div className="subtle-divider my-2" />
          <div className="py-2 space-y-1.5">
            <span className="text-xs font-semibold text-text-muted uppercase tracking-wide font-display block px-3 mb-2">
              Vales
            </span>

            {result.otroTotal > 0 && (
              <div className="flex justify-between py-1.5 px-3 text-sm bg-accent-red/5 rounded-lg">
                <span className="text-text-secondary">- Total otros</span>
                <span className="text-accent-red font-display font-semibold">
                  -${result.otroTotal.toLocaleString()}
                </span>
              </div>
            )}

            {result.valeDetails.map((v, i) => (
              <div
                key={i}
                className="py-1 text-xs border-l-2 border-border-subtle pl-2 ml-1"
              >
                <span className="text-text-secondary font-medium">
                  {v.name}
                </span>
                <span className="text-text-muted ml-1">
                  ({v.type === "fabrica" ? "Fábrica" : "Otro"})
                </span>
                <div className="flex justify-between mt-0.5">
                  <span className="text-text-muted/80">
                    {v.trips}× ${v.pricePerTrip.toLocaleString()}
                  </span>
                  <span className="text-accent-teal/90">
                    +${v.subtotal.toLocaleString()}
                  </span>
                </div>
                {v.type === "fabrica" && v.fixedFeePerTrip > 0 && (
                  <div className="flex justify-between mt-0.5">
                    <span className="text-text-muted/80">
                      {v.trips} × ${v.fixedFeePerTrip.toLocaleString()} fijo
                    </span>
                    <span className="text-orange-400">
                      ${v.fixedFeeSubtotal.toLocaleString()}
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </>
      )}

      {!result.isPercentValid && (
        <div className="mt-4 p-3 rounded-xl bg-accent-red/10 border border-accent-red/30 flex items-start gap-2.5">
          <AlertTriangle
            className="h-5 w-5 text-accent-red flex-shrink-0 mt-0.5"
            aria-hidden="true"
          />
          <div className="flex flex-col gap-0.5">
            <span className="text-sm font-bold text-accent-red font-display">
              Falta ajustar los %
            </span>
            <p className="text-xs text-text-secondary">
              Suma actual: {result.percentTotal}% — tiene que ser 100% para
              generar el recibo. Andá a <strong>Reparto</strong>.
            </p>
          </div>
        </div>
      )}

      <div className="mt-5">
        <Button
          variant="primary"
          onClick={onViewReceipt}
          disabled={!result.isPercentValid}
        >
          <Eye className="h-4 w-4" aria-hidden="true" />
          {result.isPercentValid ? "Ver Recibo" : "Ajustá los %"}
        </Button>
      </div>
    </div>
  );
}
