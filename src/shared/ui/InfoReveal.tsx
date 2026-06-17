import { useState, useRef, useEffect, useId, type ReactNode } from 'react'
import { Info } from 'lucide-react'

type TAlign = 'start' | 'center' | 'end'

interface IInfoRevealProps {
  text: string
  side?: 'top' | 'bottom'
  align?: TAlign
  className?: string
}

const ALIGN_CLASSES: Record<TAlign, string> = {
  start: 'left-0',
  center: 'left-1/2 -translate-x-1/2',
  end: 'right-0',
}

const ALIGN_POINTER_CLASSES: Record<TAlign, string> = {
  start: 'left-3',
  center: 'left-1/2 -translate-x-1/2',
  end: 'right-3',
}

const InfoReveal = ({ text, side = 'top', align = 'center', className = '' }: IInfoRevealProps): ReactNode => {
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const desktopContentId = `info-reveal-desktop-${useId()}`
  const mobileContentId = `info-reveal-mobile-${useId()}`

  const HANDLE_TOGGLE = (): void => setIsOpen((prev) => !prev)
  const HANDLE_CLOSE = (): void => setIsOpen(false)

  const HANDLE_KEYDOWN = (e: React.KeyboardEvent): void => {
    if (e.key === 'Escape') HANDLE_CLOSE()
  }

  useEffect((): (() => void) | undefined => {
    if (!isOpen) return undefined
    const HANDLE_CLICK_OUTSIDE = (e: MouseEvent): void => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        HANDLE_CLOSE()
      }
    }
    document.addEventListener('mousedown', HANDLE_CLICK_OUTSIDE)
    return () => document.removeEventListener('mousedown', HANDLE_CLICK_OUTSIDE)
  }, [isOpen])

  return (
    <div ref={containerRef} className="relative inline-flex items-center" onKeyDown={HANDLE_KEYDOWN}>
      <button
        type="button"
        onClick={HANDLE_TOGGLE}
        className="flex h-5 w-5 items-center justify-center rounded-full border border-border-subtle bg-bg-input/60 text-text-muted transition-colors hover:border-text-muted hover:text-text-secondary cursor-pointer"
        aria-label={text}
        aria-expanded={isOpen || undefined}
        aria-controls={isOpen ? mobileContentId : undefined}
      >
        <Info className="h-3 w-3" aria-hidden="true" />
      </button>

      <span
        id={desktopContentId}
        role="status"
        className={`hidden md:inline-flex text-xs ml-1.5 animate-slide-in-left ${className || 'text-text-muted'}`}
      >
        {text}
      </span>

      {isOpen && (
        <div
          id={mobileContentId}
          role="tooltip"
          className={`md:hidden absolute z-50 w-64 rounded-lg border border-border-subtle bg-bg-card px-3 py-2 text-xs text-text-secondary leading-relaxed shadow-lg animate-fade-in ${
            side === 'top' ? 'bottom-full mb-2.5' : 'top-full mt-2.5'
          } ${ALIGN_CLASSES[align]}`}
        >
          {text}
          <div
            className={`absolute h-2 w-2 rotate-45 border-l border-t border-border-subtle bg-bg-card ${
              side === 'top' ? '-bottom-1' : '-top-1'
            } ${ALIGN_POINTER_CLASSES[align]}`}
          />
        </div>
      )}
    </div>
  )
}

export default InfoReveal
