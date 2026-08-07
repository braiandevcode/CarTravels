import { useMemo, useEffect, useState, type MouseEvent, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import useCalculatorContext from '../../../core/context/useCalculatorContext';
import { calculateResult } from '../../../core/hooks/useCalculator';
import { useFocusTrap } from '../hooks/useFocusTrap';
import { useReceiptExport } from '../../../core/hooks/useReceiptExport';
import Button from '../../../shared/ui/Button';
import IconButton from '../../../shared/styles/IconButton';
import ReceiptContent from '../components/ReceiptContent';
import { X, Download, Share2, AlertTriangle } from 'lucide-react';
import type { ICalculatorResult } from '../../../core/types/calculator';

interface ReceiptModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const BODY_BLOCK_SCROLL = (isOpen: boolean): (() => void) => {
  if (isOpen) {
    document.body.classList.add('overflow-hidden');
    window.dispatchEvent(new CustomEvent('modal:open'));
  } else {
    document.body.classList.remove('overflow-hidden');
  }
  return () => document.body.classList.remove('overflow-hidden');
};

const HANDLE_ESCAPE = (onClose: () => void) => (e: KeyboardEvent): void => {
  if (e.key === 'Escape') {
    onClose();
  }
};

const ReceiptModal = ({ isOpen, onClose }: ReceiptModalProps): ReactNode => {
  const { state } = useCalculatorContext();
  const result: ICalculatorResult = useMemo(() => calculateResult(state), [state]);
  const { shareImage, downloadPDF } = useReceiptExport();
  const modalRef = useFocusTrap(isOpen);
  const [exporting, setExporting] = useState(false);

  const HANDLE_SCROLL_LOCK = (): (() => void) => BODY_BLOCK_SCROLL(isOpen);

  useEffect(HANDLE_SCROLL_LOCK, [isOpen]);

  const HANDLE_KEYBOARD_CLOSE = (): (() => void) | undefined => {
    if (!isOpen) return undefined;
    const ON_ESCAPE = HANDLE_ESCAPE(onClose);
    document.addEventListener('keydown', ON_ESCAPE);
    return () => document.removeEventListener('keydown', ON_ESCAPE);
  };

  useEffect(HANDLE_KEYBOARD_CLOSE, [isOpen, onClose]);

  const handleBackdropClick = (e: MouseEvent<HTMLDivElement>): void => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleShare = async (): Promise<void> => {
    setExporting(true);
    try {
      await shareImage('receipt-content');
      onClose();
    } finally {
      setExporting(false);
    }
  };

  const handleDownload = async (): Promise<void> => {
    setExporting(true);
    try {
      await downloadPDF('receipt-content', `resumen-${Date.now()}.pdf`);
      onClose();
    } finally {
      setExporting(false);
    }
  };

  if (!isOpen) return null;

  const MODAL_TITLE_ID: string = 'receipt-modal-title';

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 p-4 animate-fade-in" onClick={handleBackdropClick}>
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
          <IconButton onClick={onClose} ariaLabel="Cerrar" size="md" autoFocus>
            <X className="h-5 w-5" aria-hidden="true" />
          </IconButton>
        </div>

        <ReceiptContent />

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
            className='flex items-center justify-center gap-2'
            disabled={!result.isPercentValid || exporting}
          >
            <Download className="h-4 w-4" aria-hidden="true" />
            {exporting
              ? 'Exportando...'
              : result.isPercentValid
                ? 'Descargar PDF'
                : 'Ajusta los porcentajes'}
          </Button>
          <Button
            variant="secondary"
            onClick={handleShare}
            className='flex items-center justify-center gap-2'
            disabled={!result.isPercentValid || exporting}
          >
            <Share2 className="h-4 w-4" aria-hidden="true" />
            {exporting
              ? 'Exportando...'
              : result.isPercentValid
                ? 'Compartir por WhatsApp'
                : 'Porcentajes incompletos'}
          </Button>
        </div>
      </div>
    </div>,
    document.body,
  );
};

export default ReceiptModal;
