import { ChevronDown } from 'lucide-react'
import { useState, type ReactNode } from 'react'

interface IAccordionItemProps {
  question: string
  answer: string
  isDefaultOpen?: boolean
}

const AccordionItem = ({ question, answer, isDefaultOpen = false }: IAccordionItemProps):ReactNode => {
  const [isOpen, setIsOpen] = useState<boolean>(isDefaultOpen)

  return (
    <div className="card-glass rounded-xl overflow-hidden card-accent-top">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="w-full flex items-center justify-between p-5 text-left transition-colors cursor-pointer hover:bg-bg-input/30"
        aria-expanded={isOpen}
        aria-controls={`accordion-panel-${question.replace(/\s+/g, '-').toLowerCase()}`}
        id={`accordion-btn-${question.replace(/\s+/g, '-').toLowerCase()}`}
      >
        <span className="text-base font-semibold text-text-primary pr-4 font-display">
          {question}
        </span>
        <div
          className={`flex-shrink-0 flex items-center justify-center h-8 w-8 rounded-lg bg-bg-input border border-border-subtle transition-all duration-300 ${
            isOpen ? 'rotate-180 bg-accent-teal/10 border-accent-teal/20' : ''
          }`}
        >
          <ChevronDown
            className={`h-5 w-5 transition-colors ${
              isOpen ? 'text-accent-teal' : 'text-text-muted'
            }`}
            aria-hidden="true"
          />
        </div>
      </button>
      <div
        id={`accordion-panel-${question.replace(/\s+/g, '-').toLowerCase()}`}
        role="region"
        aria-labelledby={`accordion-btn-${question.replace(/\s+/g, '-').toLowerCase()}`}
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-5 pb-5 pt-0 border-t border-border-subtle/50">
          <p className="text-sm text-text-secondary leading-relaxed">
            {answer}
          </p>
        </div>
      </div>
    </div>
  )
}

export default AccordionItem;