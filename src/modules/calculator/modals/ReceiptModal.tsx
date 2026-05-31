import { useMemo, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import useCalculatorContext from "../../../core/context/CalculatorContext";
import { calculateResult } from "../../../core/hooks/useCalculator";
import { useReceiptExport } from "../../../core/hooks/useReceiptExport";
import Button from "../../../shared/ui/Button";
import { X, Download, Share2, AlertTriangle } from "lucide-react";
import type { CalculatorResult } from "../../../core/types/calculator";

interface ReceiptModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ReceiptModal = ({ isOpen, onClose }: ReceiptModalProps) => {
  const { state } = useCalculatorContext();
  const result: CalculatorResult = useMemo(
    () => calculateResult(state),
    [state],
  );
  const { shareImage, downloadPDF } = useReceiptExport();
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.dispatchEvent(new CustomEvent("modal:open"));
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
    }
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>): void => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  useEffect(() => {
    if (!isOpen) return;

    const modal = modalRef.current;
    if (!modal) return;

    const focusableElements: NodeListOf<HTMLElement> =
      modal.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
      );
    const firstElement: HTMLElement = focusableElements[0];
    const lastElement: HTMLElement =
      focusableElements[focusableElements.length - 1];

    firstElement?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Tab") {
        if (e.shiftKey && document.activeElement === firstElement) {
          e.preventDefault();
          lastElement?.focus();
        } else if (!e.shiftKey && document.activeElement === lastElement) {
          e.preventDefault();
          firstElement?.focus();
        }
      }
    };

    modal.addEventListener("keydown", handleKeyDown);
    return () => modal.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  const [exporting, setExporting] = useState(false);

  const handleShare = async (): Promise<void> => {
    setExporting(true);
    try {
      await shareImage("receipt-content");
      onClose();
    } finally {
      setExporting(false);
    }
  };

  const handleDownload = async (): Promise<void> => {
    setExporting(true);
    try {
      await downloadPDF("receipt-content", `resumen-${Date.now()}.pdf`);
      onClose();
    } finally {
      setExporting(false);
    }
  };

  if (!isOpen) return null;

  const MODAL_TITLE_ID: string = "receipt-modal-title";

  return createPortal(
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 p-4 animate-fade-in"
      onClick={handleBackdropClick}
    >
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={MODAL_TITLE_ID}
        className="relative w-full max-w-md rounded-2xl bg-bg-card border border-border-subtle shadow-xl max-h-[calc(100vh-2rem)] flex flex-col animate-scale-in print-white"
      >
        <div className="flex items-center justify-between border-b border-border-subtle p-4 shrink-0 no-print">
          <h2
            id={MODAL_TITLE_ID}
            className="text-lg font-bold text-text-primary font-display tracking-wide"
          >
            Recibo de Jornada
          </h2>
          <button
            type="button"
            onClick={onClose}
            autoFocus
            className="rounded-full p-2 text-text-secondary hover:bg-bg-hover hover:text-text-primary transition-colors cursor-pointer"
            aria-label="Cerrar"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        <div
          id="receipt-content"
          className="flex-1 overflow-y-auto p-6 min-h-0"
        >
          <div className="text-center mb-6">
            <div className="inline-flex items-center gap-2 mb-2">
              <div className="w-10 h-10 rounded-full bg-accent-amber/20 flex items-center justify-center">
                <span className="text-xl" role="img" aria-label="Auto">
                  🚗
                </span>
              </div>
            </div>
            <h1 className="text-2xl font-black text-text-primary font-display tracking-tight">
              carTravels
            </h1>
            <p className="text-xs text-text-muted mt-1 font-display">
              Resumen de jornada
            </p>
            <div className="subtle-divider mt-4" />
          </div>

          <div className="border border-border-subtle rounded-xl p-4 space-y-3 text-sm bg-bg-card-subtle">
            <div className="flex justify-between items-baseline p-2 rounded-lg bg-bg-input">
              <span className="text-text-secondary font-medium">
                Ganancia del día
              </span>
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
                    Agencia ({result.agencyDisplayPercent}%) + desc.
                  </span>
                  <span className={`font-semibold font-display ${result.finalAgency >= 0 ? "text-accent-amber" : "text-accent-red"}`}>
                    ${result.finalAgency.toLocaleString()}
                  </span>
                </div>
                <span className="text-[11px] text-text-muted/70 font-mono text-right px-2">
                  ${result.agencyAmount.toLocaleString()}
                  {result.fixedFeeTotal > 0 && (
                    <> - ${result.fixedFeeTotal.toLocaleString()}</>
                  )}
                  {result.otroTotal > 0 && (
                    <> - ${result.otroTotal.toLocaleString()}</>
                  )}
                </span>
              </div>

              <div className="flex justify-between p-2 rounded-lg hover:bg-bg-input/50 transition-colors">
                <span className="text-text-secondary">
                  Conductor ({state.driverPercent}%)
                </span>
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

            {state.carRented &&
              result.carAmount !== null &&
              (() => {
                const grossCar =
                  result.adjustedTotal * (state.carPercent / 100);
                const totalExpenses = state.gas + state.petrol;
                return (
                  <>
                    <div className="subtle-divider" />
                    <div className="flex justify-between p-2 rounded-lg hover:bg-bg-input/50 transition-colors">
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
                    <div className="text-[11px] text-text-muted/70 -mt-1 pl-2 font-mono">
                      ${grossCar.toLocaleString()}
                      {totalExpenses > 0 && (
                        <> - ${totalExpenses.toLocaleString()}</>
                      )}
                      {" = "}${result.carAmount.toLocaleString()}
                    </div>
                  </>
                );
              })()}

            {result.valeDetails.length > 0 && (
              <>
                <div className="subtle-divider" />
                <div className="space-y-2">
                  <div className="flex justify-between px-2">
                    <span className="text-xs font-semibold text-text-muted uppercase tracking-wider font-display">
                      Vales
                    </span>
                  </div>

                  {result.otroTotal > 0 && (
                    <div className="flex justify-between p-2 text-sm bg-accent-red/5 rounded-lg">
                      <span className="text-text-secondary">- Total otros</span>
                      <span className="text-accent-red font-display font-semibold">
                        -${result.otroTotal.toLocaleString()}
                      </span>
                    </div>
                  )}

                  <div className="mt-1 pl-2">
                    {result.valeDetails.map((v, i) => (
                      <div
                        key={i}
                        className="py-1.5 text-xs border-l-2 border-border-subtle pl-2 mb-1"
                      >
                        <div className="flex justify-between">
                          <span className="text-text-secondary font-medium">
                            {v.name}
                            <span className="text-text-muted ml-1">
                              ({v.type === "fabrica" ? "Fábrica" : "Otro"})
                            </span>
                          </span>
                        </div>
                        <div className="flex justify-between mt-0.5">
                          <span className="text-text-muted/80">
                            {v.trips} × ${v.pricePerTrip.toLocaleString()}
                          </span>
                          <span className="text-accent-teal/90">
                            +${v.subtotal.toLocaleString()}
                          </span>
                        </div>
                        {v.type === "fabrica" && v.fixedFeePerTrip > 0 && (
                          <div className="flex justify-between mt-0.5">
                            <span className="text-text-muted/80">
                              {v.trips} × ${v.fixedFeePerTrip.toLocaleString()}{" "}
                              fijo planilla
                            </span>
                            <span className="text-orange-400">
                              ${v.fixedFeeSubtotal.toLocaleString()}
                            </span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>

          <div className="mt-5 text-center text-xs text-text-muted font-display">
            Generado por carTravels &mdash;{" "}
            {new Date().toLocaleDateString("es-AR")}
          </div>
        </div>

        {!result.isPercentValid && (
          <div className="mx-4 mb-2 p-3 rounded-xl bg-accent-red/10 border border-accent-red/30 flex items-start gap-2.5 shrink-0 no-print">
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
                descargar.
              </p>
            </div>
          </div>
        )}

        <div className="flex flex-col gap-2 border-t border-border-subtle p-4 shrink-0 no-print">
          <Button
            variant="primary"
            onClick={handleDownload}
            disabled={!result.isPercentValid || exporting}
          >
            <Download className="h-4 w-4" aria-hidden="true" />
            {exporting
              ? "Exportando..."
              : result.isPercentValid
                ? "Descargar PDF"
                : "Ajusta los porcentajes"}
          </Button>
          <Button
            variant="secondary"
            onClick={handleShare}
            disabled={!result.isPercentValid || exporting}
          >
            <Share2 className="h-4 w-4" aria-hidden="true" />
            {exporting
              ? "Exportando..."
              : result.isPercentValid
                ? "Compartir por WhatsApp"
                : "Porcentajes incompletos"}
          </Button>
        </div>
      </div>
    </div>,
    document.body,
  );
};

export default ReceiptModal;
