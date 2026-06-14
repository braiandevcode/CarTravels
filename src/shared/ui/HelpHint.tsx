import { useState, useRef, useEffect, type ReactNode } from 'react'

interface IHelpHintProps {
  text: string
  side?: 'top' | 'bottom'
}

const HelpHint = ({ text, side = 'top' }: IHelpHintProps): ReactNode => {
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const contentId = `help-hint-${useRef(crypto.randomUUID()).current}`

  const HANDLE_TOGGLE = (): void => setIsOpen((prev) => !prev)
  const HANDLE_CLOSE = (): void => setIsOpen(false)

  const HANDLE_KEYDOWN = (e: React.KeyboardEvent): void => {
    if (e.key === 'Escape') HANDLE_CLOSE()
  }

  useEffect(() => {
    if (!isOpen) return
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
        className="flex h-5 w-5 items-center justify-center rounded-full border border-border-subtle bg-bg-input/60 text-[11px] font-bold text-text-muted transition-colors hover:border-text-muted hover:text-text-secondary cursor-pointer"
        aria-label="Más información"
        aria-expanded={isOpen}
        aria-controls={contentId}
      >
        ?
      </button>
      {isOpen && (
        <div
          id={contentId}
          role="tooltip"
          className={`absolute z-50 w-64 rounded-lg border border-border-subtle bg-bg-card px-3 py-2 text-xs text-text-secondary leading-relaxed shadow-lg animate-fade-in ${
            side === 'top' ? 'bottom-full mb-2.5' : 'top-full mt-2.5'
          } left-1/2 -translate-x-1/2`}
        >
          {text}
          <div
            className={`absolute left-1/2 h-2 w-2 -translate-x-1/2 rotate-45 border-l border-t border-border-subtle bg-bg-card ${
              side === 'top' ? '-bottom-1' : '-top-1'
            }`}
          />
        </div>
      )}
    </div>
  )
}

export default HelpHint
