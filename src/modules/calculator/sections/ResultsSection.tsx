import { useMemo } from 'react'
import useCalculatorContext from '../../../core/context/CalculatorContext'
import { calculateResult } from '../../../core/hooks/useCalculator'
import Button from '../../../shared/ui/Button'
import { BarChart3, Eye, AlertTriangle } from 'lucide-react'
import type { CalculatorResult } from '../../../core/types/calculator'

interface ResultsSectionProps {
  onViewReceipt: () => void
}

export function ResultsSection({ onViewReceipt }: ResultsSectionProps) {
  const { state } = useCalculatorContext()

  const result:CalculatorResult = useMemo(() => calculateResult(state), [state])

  if (state.total === 0) {
    return (
      <section aria-label="Resultados" className="rounded-2xl card-glass border border-border-subtle p-5 md:p-6 opacity-60 animate-fade-in-up stagger-5">
        <div className="flex items-center gap-2 mb-4">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-text-muted/10">
            <BarChart3 className="h-4.5 w-4.5 text-text-muted" aria-hidden="true" />
          </div>
          <h2 className="text-lg font-bold text-text-muted font-display tracking-wide">Resultados</h2>
        </div>
        <div className="flex flex-col items-center justify-center py-8 gap-3">
          <div className="text-4xl opacity-30" role="img" aria-label="Gráfico">📊</div>
          <p className="text-center text-text-muted">Ingresa el total del día para ver los resultados</p>
        </div>
      </section>
    )
  }

  return (
    <section aria-label="Resultados" className="rounded-2xl card-glass card-accent-top p-5 md:p-6 animate-fade-in-up stagger-5">
      <div className="flex items-center gap-2 mb-4">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent-teal/15">
          <BarChart3 className="h-4.5 w-4.5 text-accent-teal" aria-hidden="true" />
        </div>
        <h2 className="text-lg font-bold text-text-primary font-display tracking-wide">Resultados</h2>
      </div>

      <div className="flex flex-col gap-2 text-sm md:text-base">
        <div className="flex justify-between py-2 px-3 rounded-lg bg-bg-input">
          <span className="text-text-secondary font-medium">Total del día</span>
          <span className="font-bold text-text-primary font-display text-lg">${result.adjustedTotal.toLocaleString()}</span>
        </div>

        <div className="subtle-divider my-2" />

        <div className="flex justify-between py-2 px-3 rounded-lg hover:bg-bg-input/50 transition-colors">
          <span className="text-text-secondary">Agencia ({result.agencyDisplayPercent}%)</span>
          <span className="font-semibold text-accent-teal font-display">+${result.agencyAmount.toLocaleString()}</span>
        </div>

        <div className="flex justify-between py-2 px-3 rounded-lg hover:bg-bg-input/50 transition-colors">
          <span className="text-text-secondary">Conductor ({state.driverPercent}%)</span>
          <span className="font-semibold text-accent-teal font-display">+${result.driverAmount.toLocaleString()}</span>
        </div>

        {state.gas > 0 && (
          <div className="flex justify-between py-2 px-3 rounded-lg hover:bg-bg-input/50 transition-colors">
            <span className="text-text-secondary">Gas (GNV)</span>
            <span className="font-semibold text-accent-red font-display">-${state.gas.toLocaleString()}</span>
          </div>
        )}

        {state.petrol > 0 && (
          <div className="flex justify-between py-2 px-3 rounded-lg hover:bg-bg-input/50 transition-colors">
            <span className="text-text-secondary">Nafta</span>
            <span className="font-semibold text-accent-red font-display">-${state.petrol.toLocaleString()}</span>
          </div>
        )}

        {state.carRented && result.carAmount !== null && (() => {
          const grossCar: number = result.adjustedTotal * (state.carPercent / 100)
          const totalExpenses: number = state.gas + state.petrol
          return (
            <>
              <div className="subtle-divider my-2" />
              <div className="flex justify-between py-2 px-3 rounded-lg hover:bg-bg-input/50 transition-colors">
                <span className="text-text-secondary">
                  Vehículo ({state.carPercent}%)
                </span>
                <span className={`font-semibold font-display ${result.carAmount >= 0 ? 'text-accent-teal' : 'text-accent-red'}`}>
                  {result.carAmount >= 0 ? '+' : ''}${result.carAmount.toLocaleString()}
                </span>
              </div>
              <div className="text-xs text-text-muted/70 -mt-0.5 mb-1 pl-3 font-mono bg-bg-input/50 py-1.5 px-3 rounded-lg">
                {state.carPercent}% del total (${grossCar.toLocaleString()})
                {totalExpenses > 0 && (
                  <> - ${totalExpenses.toLocaleString()} en gastos</>
                )}
                {' = '}${result.carAmount.toLocaleString()}
              </div>
            </>
          )
        })()}

        {result.factoryDetails.length > 0 && (
          <>
            <div className="subtle-divider my-2" />
            <div className="py-2">
              <div className="flex items-center justify-between px-3 mb-2">
                <span className="text-xs font-semibold text-text-muted uppercase tracking-wide font-display">
                  Ajustes Fábricas
                </span>
              </div>

              <div className="flex justify-between py-1.5 px-3 text-sm bg-accent-teal/5 rounded-lg mb-1">
                <span className="text-text-secondary">+ Total precio real fábricas</span>
                <span className="text-accent-teal font-display font-semibold">
                  +${result.factoryTotal.toLocaleString()}
                </span>
              </div>

              {result.discountTotal > 0 && (
                <div className="flex justify-between py-1.5 px-3 text-sm bg-accent-red/5 rounded-lg mb-1">
                  <span className="text-text-secondary">- Total descuentos fábricas</span>
                  <span className="text-accent-red font-display font-semibold">
                    -${result.discountTotal.toLocaleString()}
                  </span>
                </div>
              )}

              <div className="mt-2 pl-2">
                {result.factoryDetails.map((f, i) => (
                  <div key={i} className="py-1.5 text-xs border-l-2 border-border-subtle pl-2 mb-1">
                    <div className="flex justify-between">
                      <span className="text-text-secondary font-medium">{f.name}</span>
                    </div>
                    <div className="flex justify-between mt-0.5">
                      <span className="text-text-muted/80">
                        {f.trips} viajes × ${f.pricePerTrip.toLocaleString()}
                      </span>
                      <span className="text-accent-teal/90">
                        +${f.factorySubtotal.toLocaleString()}
                      </span>
                    </div>
                    {f.discountPerTrip > 0 && (
                      <div className="flex justify-between mt-0.5">
                        <span className="text-text-muted/80">
                          {f.trips} viajes × ${f.discountPerTrip.toLocaleString()} descuento
                        </span>
                        <span className="text-accent-red/90">
                          -${f.discountSubtotal.toLocaleString()}
                        </span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-between py-3 px-4 rounded-lg bg-accent-amber/10 border border-accent-amber/20">
              <span className="text-text-secondary font-medium font-display">Agencia final</span>
              <span className={`font-bold font-display text-lg ${result.finalAgency >= 0 ? 'text-accent-teal' : 'text-accent-red'}`}>
                ${result.finalAgency.toLocaleString()}
              </span>
            </div>
          </>
        )}

      </div>

      {!result.isPercentValid && (
        <div className="mt-4 p-3 rounded-xl bg-accent-red/10 border border-accent-red/30 flex items-start gap-2.5">
          <AlertTriangle className="h-5 w-5 text-accent-red flex-shrink-0 mt-0.5" aria-hidden="true" />
          <div className="flex flex-col gap-0.5">
            <span className="text-sm font-bold text-accent-red font-display">
              Porcentajes incompletos
            </span>
            <p className="text-xs text-text-secondary">
              La suma de porcentajes es {result.percentTotal}%. Necesitas que sea exactamente 100% para generar el recibo.
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
          {result.isPercentValid ? 'Ver Recibo Completo' : 'Ajusta los porcentajes'}
        </Button>
      </div>
    </section>
  )
}
