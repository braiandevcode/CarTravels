import { useEffect, useRef, type RefObject } from 'react'

export function useFocusTrap(isOpen: boolean): RefObject<HTMLDivElement | null> {
  const modalRef = useRef<HTMLDivElement | null>(null)

  const HANDLE_FOCUS_TRAP = (): (() => void) | undefined => {
    if (!isOpen) return undefined

    const modal = modalRef.current
    if (!modal) return undefined

    const focusableElements = modal.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    )
    const firstElement = focusableElements[0]
    const lastElement = focusableElements[focusableElements.length - 1]

    firstElement?.focus()

    const HANDLE_KEY_DOWN = (e: KeyboardEvent): void => {
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

    modal.addEventListener('keydown', HANDLE_KEY_DOWN)
    return () => modal.removeEventListener('keydown', HANDLE_KEY_DOWN)
  }
  useEffect(HANDLE_FOCUS_TRAP, [isOpen])

  return modalRef
}