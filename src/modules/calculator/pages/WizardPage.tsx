import { useState, useEffect, useCallback } from 'react'
import { ArrowLeft, ArrowRight, RotateCcw } from 'lucide-react'
import useCalculatorContext from '../../../core/context/CalculatorContext'
import StepIndicator from '../../../shared/ui/StepIndicator'
import IncomeSection from '../sections/IncomeSection'
import ValesSection from '../sections/ValesSection'
import ConfigSection from '../sections/ConfigSection'
import ExpensesSection from '../sections/ExpensesSection'
import { ResultsSection } from '../sections/ResultsSection'
import ReceiptModal from '../modals/ReceiptModal'
import ConfirmResetModal from '../modals/ConfirmResetModal'
import OnboardingGuide from './OnboardingGuide'

const STEP_LABELS = ['Ingreso', 'Vales', '%', 'Gastos', 'Resultados']

const stepComponents = [
  IncomeSection,
  ValesSection,
  ConfigSection,
  ExpensesSection,
]

const stepValid = (state: ReturnType<typeof useCalculatorContext>['state'], step: number): boolean => {
  switch (step) {
    case 0: return state.total > 0
    case 1: return !state.showVales || (state.vales.length > 0 && state.vales.every((v) => v.trips > 0 && v.pricePerTrip > 0))
    case 2: {
      const total = state.carRented
        ? state.agencyPercent + state.driverPercent + state.carPercent
        : state.agencyPercent + state.driverPercent
      return total === 100
    }
    case 3: return true
    default: return false
  }
}

interface WizardPageProps {
  onBackToLanding: () => void
}

const WizardPage = ({ onBackToLanding }: WizardPageProps) => {
  const { state, dispatch } = useCalculatorContext()
  const [currentStep, setCurrentStep] = useState(0)
  const [direction, setDirection] = useState<'next' | 'prev' | null>(null)
  const [receiptOpen, setReceiptOpen] = useState(false)
  const [confirmResetOpen, setConfirmResetOpen] = useState(false)
  const [showOnboarding, setShowOnboarding] = useState(false)

  useEffect(() => {
    const seen = localStorage.getItem('cartravels-onboarding')
    if (!seen) {
      setShowOnboarding(true)
    }
  }, [])

  useEffect(() => {
    if (currentStep === 4 && !state.calculated) {
      dispatch({ type: 'CALCULATE' })
    }
  }, [currentStep, state.calculated, dispatch])

  const goNext = useCallback(() => {
    if (currentStep < 4 && stepValid(state, currentStep)) {
      setDirection('next')
      setCurrentStep((s) => s + 1)
    }
  }, [currentStep, state])

  const goPrev = useCallback(() => {
    if (currentStep > 0) {
      setDirection('prev')
      setCurrentStep((s) => s - 1)
    }
  }, [currentStep])

  const animateClass = direction === 'next'
    ? 'animate-slide-in-right'
    : direction === 'prev'
      ? 'animate-slide-in-left'
      : 'animate-fade-in'

  const handleReset = () => setConfirmResetOpen(true)

  const confirmReset = () => {
    dispatch({ type: 'RESET' })
    setConfirmResetOpen(false)
    setCurrentStep(0)
    setDirection(null)
  }

  return (
    <div className="mx-auto max-w-2xl px-4 pb-8 pt-4 md:px-6 md:pt-6 animate-fade-in-up">
      <div className="flex justify-end mb-4 gap-2">
        <button
          type="button"
          onClick={handleReset}
          className="inline-flex items-center gap-1.5 rounded-lg bg-accent-red/10 px-3 py-1.5 text-xs font-medium text-accent-red transition-colors hover:bg-accent-red/20 cursor-pointer font-display border border-accent-red/20"
        >
          <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
          Reiniciar
        </button>
        <button
          type="button"
          onClick={() => setShowOnboarding(true)}
          className="rounded-lg bg-bg-hover px-3 py-1.5 text-xs font-medium text-text-muted transition-colors hover:text-text-primary cursor-pointer font-display border border-border-subtle"
        >
          ¿Cómo funciona?
        </button>
        <button
          type="button"
          onClick={onBackToLanding}
          className="rounded-lg bg-bg-hover px-3 py-1.5 text-xs font-medium text-text-muted transition-colors hover:text-text-primary cursor-pointer font-display border border-border-subtle"
        >
          Salir
        </button>
      </div>

      <StepIndicator
        currentStep={currentStep + 1}
        totalSteps={5}
        labels={STEP_LABELS}
      />

      <div className="card-glass rounded-2xl p-5 md:p-6" key={`step-${currentStep}-${direction}`}>
        <div className={animateClass}>
          {currentStep < 4 && (() => {
            const StepComponent = stepComponents[currentStep]
            return <StepComponent />
          })()}
          {currentStep === 4 && (
            <ResultsSection onViewReceipt={() => setReceiptOpen(true)} />
          )}
        </div>
      </div>

      <div className="flex items-center justify-between mt-5">
        <div>
          {currentStep > 0 && (
            <button
              type="button"
              onClick={goPrev}
              className="inline-flex items-center gap-1.5 rounded-xl bg-bg-hover px-4 py-2.5 text-sm font-medium text-text-secondary transition-colors hover:text-text-primary hover:bg-accent-violet/10 cursor-pointer font-display border border-border-subtle"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              Atrás
            </button>
          )}
        </div>

        <div className="flex items-center gap-3">
          {currentStep < 4 && (
            <button
              type="button"
              onClick={goNext}
              disabled={!stepValid(state, currentStep)}
              className="inline-flex items-center gap-1.5 rounded-xl bg-accent-violet px-4 py-2.5 text-sm font-bold text-white transition-all duration-200 hover:shadow-glow-violet disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer font-display"
            >
              Siguiente
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </button>
          )}
        </div>
      </div>

      <OnboardingGuide
        isOpen={showOnboarding}
        onClose={() => setShowOnboarding(false)}
      />

      <ReceiptModal isOpen={receiptOpen} onClose={() => setReceiptOpen(false)} />
      <ConfirmResetModal
        isOpen={confirmResetOpen}
        onConfirm={confirmReset}
        onCancel={() => setConfirmResetOpen(false)}
      />
    </div>
  )
}

export default WizardPage
