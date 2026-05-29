import { type ReactNode, useRef } from 'react'
import { ChevronDown } from 'lucide-react'

interface CollapsibleSectionProps {
  children: ReactNode
  title: string
  icon: ReactNode
  step: number
  totalSteps: number
  isExpanded: boolean
  onToggle: () => void
}

const CollapsibleSection = ({
  children,
  title,
  icon,
  step,
  totalSteps,
  isExpanded,
  onToggle,
}: CollapsibleSectionProps) => {
  const contentRef = useRef<HTMLDivElement>(null)

  return (
    <div className="rounded-2xl card-glass card-accent-top overflow-hidden animate-fade-in-up">
      <button
        type="button"
        onClick={onToggle}
        className="w-full flex items-center justify-between p-5 md:p-6 cursor-pointer md:cursor-default group"
        aria-expanded={isExpanded}
      >
        <div className="flex items-center gap-3 min-w-0">
          <span className="hidden md:flex h-7 w-7 items-center justify-center rounded-lg bg-accent-amber/15 text-xs font-bold text-accent-amber font-display shrink-0">
            {step}
          </span>
          <div className="flex items-center gap-2 min-w-0">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg shrink-0">
              {icon}
            </div>
            <div className="flex items-center gap-2 min-w-0">
              <h2 className="text-lg font-bold text-text-primary font-display tracking-wide truncate">{title}</h2>
              <span className="md:hidden text-xs text-text-muted font-display shrink-0">
                {step}/{totalSteps}
              </span>
            </div>
          </div>
        </div>
        <ChevronDown
          className={`h-5 w-5 text-text-muted transition-transform duration-300 md:hidden shrink-0 ${
            isExpanded ? 'rotate-180' : ''
          } group-hover:text-accent-amber md:group-hover:text-text-muted`}
          aria-hidden="true"
        />
      </button>

      <div
        className={`collapsible-content transition-all duration-300 ease-in-out overflow-hidden ${
          isExpanded ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div ref={contentRef} className="px-5 pb-5 md:px-6 md:pb-6">
          {children}
        </div>
      </div>
    </div>
  )
}

export default CollapsibleSection
