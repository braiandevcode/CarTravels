import { useEffect, useRef } from 'react'
import { X, AlertTriangle } from 'lucide-react'
import Button  from '../../../shared/ui/Button'

interface ConfirmResetModalProps {
  isOpen: boolean
  onConfirm: () => void
  onCancel: () => void
}

const TITLE_ID: string = 'confirm-reset-title'

const ConfirmResetModal = ({ isOpen, onConfirm, onCancel }: ConfirmResetModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!isOpen) return

    const modal = modalRef.current
    if (!modal) return

    const focusableElements: NodeListOf<HTMLElement> = modal.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    )
    const firstElement: HTMLElement = focusableElements[0]
    const lastElement: HTMLElement = focusableElements[focusableElements.length - 1]

    firstElement?.focus()

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        if (e.shiftKey && document.activeElement === firstElement) {
          e.preventDefault()
          lastElement?.focus()
        } else if (!e.shiftKey && document.activeElement === lastElement) {
          e.preventDefault()
          firstElement?.focus()
        }
      }
    }

    modal.addEventListener('keydown', handleKeyDown)
    return () => modal.removeEventListener('keydown', handleKeyDown)
  }, [isOpen])

  if (!isOpen) return null

  return (
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
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent-red/15">
              <AlertTriangle className="h-5 w-5 text-accent-red" aria-hidden="true" />
            </div>
            <h3 id={TITLE_ID} className="text-lg font-bold text-text-primary font-display">¿Restablecer?</h3>
          </div>
          <button
            type="button"
            onClick={onCancel}
            className="rounded-full p-1.5 text-text-secondary hover:bg-bg-hover transition-colors cursor-pointer"
            aria-label="Cancelar"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
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
  )
}

export default ConfirmResetModal;
