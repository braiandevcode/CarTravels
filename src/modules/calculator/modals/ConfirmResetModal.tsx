import { useCallback, type ReactNode } from 'react'
import { X, AlertTriangle } from 'lucide-react'
import Button  from '../../../shared/ui/Button'
import IconButton from '../../../shared/styles/IconButton'
import ModalPortal from '../../../shared/components/ModalPortal'
import { useFocusTrap } from '../hooks/useFocusTrap'

interface IConfirmResetModalProps {
  isOpen: boolean
  onConfirm: () => void
  onCancel: () => void
}

const TITLE_ID: string = 'confirm-reset-title'

const ConfirmResetModal = ({ isOpen, onConfirm, onCancel }: IConfirmResetModalProps): ReactNode => {
  const modalRef = useFocusTrap(isOpen)

  const handleStopPropagation = useCallback((e: React.MouseEvent): void => {
    e.stopPropagation()
  }, [])

  if (!isOpen) return null

  return (
    <ModalPortal>
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 animate-fade-in"
      onClick={onCancel}
    >
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={TITLE_ID}
        className="w-full max-w-sm rounded-2xl bg-bg-card border border-border-subtle shadow-xl p-6 animate-scale-in"
        onClick={handleStopPropagation}
      >
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent-red/15">
              <AlertTriangle className="h-5 w-5 text-accent-red" aria-hidden="true" />
            </div>
            <h3 id={TITLE_ID} className="text-lg font-bold text-text-primary font-display">¿Restablecer?</h3>
          </div>
          <IconButton onClick={onCancel} ariaLabel="Cancelar">
            <X className="h-4 w-4" aria-hidden="true" />
          </IconButton>
        </div>

        <p className="text-text-secondary text-sm mb-6">
          Se eliminarán todos los datos ingresados. Esta acción no se puede deshacer.
        </p>

        <div className="flex gap-3">
          <Button variant="ghost" fullWidth={false} onClick={onCancel} className="flex-1" autoFocus>
            Cancelar
          </Button>
          <Button variant="danger" fullWidth={false} onClick={onConfirm} className="flex-1">
            Restablecer
          </Button>
        </div>
      </div>
    </div>
    </ModalPortal>
  )
}

export default ConfirmResetModal;
