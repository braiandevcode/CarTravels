import { RotateCcw, Settings, TrendingUp, DollarSign, Ticket, BarChart3 } from 'lucide-react'
import { ResultsSection } from './sections/ResultsSection'
import { useState, useCallback } from 'react'
import useCalculatorContext from '../../core/context/CalculatorContext'
import ModalPortal from '../../shared/components/ModalPortal'
import ConfigSection from './sections/ConfigSection'
import IncomeSection from './sections/IncomeSection'
import ExpensesSection from './sections/ExpensesSection'
import ValesSection from './sections/ValesSection'
import CollapsibleSection from '../../shared/ui/CollapsibleSection'
import ReceiptModal from './modals/ReceiptModal'
import ConfirmResetModal from './modals/ConfirmResetModal'

const TOTAL_STEPS = 5

const CalculatorContent = () => {
  const { state, dispatch } = useCalculatorContext()
  const [receiptOpen, setReceiptOpen] = useState<boolean>(false)
  const [confirmResetOpen, setConfirmResetOpen] = useState<boolean>(false)
  const [activeStep, setActiveStep] = useState<number>(1)

  const hasData: boolean = state.total > 0 || state.gas > 0 || state.petrol > 0 || state.vales.length > 0

  const handleReset = (): void => {
    if (hasData) {
      setConfirmResetOpen(true)
    }
  }

  const confirmReset = (): void => {
    dispatch({ type: 'RESET' })
    setConfirmResetOpen(false)
  }

  const handleToggle = useCallback((step: number) => {
    setActiveStep((prev) => (prev === step ? step : step))
  }, [])

  const sections = [
    {
      step: 1,
      title: 'Configuración',
      icon: (
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent-amber/15">
          <Settings className="h-4.5 w-4.5 text-accent-amber" aria-hidden="true" />
        </div>
      ),
      content: <ConfigSection />,
    },
    {
      step: 2,
      title: 'Ingreso del Día',
      icon: (
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent-teal/15">
          <TrendingUp className="h-4.5 w-4.5 text-accent-teal" aria-hidden="true" />
        </div>
      ),
      content: <IncomeSection />,
    },
    {
      step: 3,
      title: 'Gastos del Día',
      icon: (
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent-red/15">
          <DollarSign className="h-4.5 w-4.5 text-accent-red" aria-hidden="true" />
        </div>
      ),
      content: <ExpensesSection />,
    },
    {
      step: 4,
      title: 'Viajes con Vale',
      icon: (
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent-amber/15">
          <Ticket className="h-4.5 w-4.5 text-accent-amber" aria-hidden="true" />
        </div>
      ),
      content: <ValesSection />,
    },
    {
      step: 5,
      title: 'Resultados',
      icon: (
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent-teal/15">
          <BarChart3 className="h-4.5 w-4.5 text-accent-teal" aria-hidden="true" />
        </div>
      ),
      content: <ResultsSection onViewReceipt={() => setReceiptOpen(true)} />,
    },
  ]

  return (
    <div className="animate-fade-in-up">
      <main className="mx-auto max-w-2xl px-4 pb-8 pt-4 md:px-6 md:pt-6">
        {hasData && (
          <div className="flex justify-end mb-4">
            <button
              type="button"
              onClick={handleReset}
              className="flex items-center gap-1.5 rounded-lg bg-accent-red/10 px-3 py-1.5 text-sm font-medium text-accent-red transition-colors hover:bg-accent-red/20 cursor-pointer border border-accent-red/20 font-display"
            >
              <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
              Nuevo
            </button>
          </div>
        )}

        <div className="flex flex-col gap-4 md:gap-5">
          {sections.map(({ step, title, icon, content }) => (
            <CollapsibleSection
              key={step}
              step={step}
              totalSteps={TOTAL_STEPS}
              title={title}
              icon={icon}
              isExpanded={activeStep === step}
              onToggle={() => handleToggle(step)}
            >
              {content}
            </CollapsibleSection>
          ))}
        </div>
      </main>

      <ModalPortal>
        <ReceiptModal isOpen={receiptOpen} onClose={() => setReceiptOpen(false)} />
      </ModalPortal>
      <ModalPortal>
        <ConfirmResetModal
          isOpen={confirmResetOpen}
          onConfirm={confirmReset}
          onCancel={() => setConfirmResetOpen(false)}
        />
      </ModalPortal>
    </div>
  )
}

export default CalculatorContent
