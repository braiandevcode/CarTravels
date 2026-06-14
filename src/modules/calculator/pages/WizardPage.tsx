import { useState, useEffect, useCallback, type JSX } from 'react'
import { ArrowLeft, ArrowRight, RotateCcw } from 'lucide-react'
import useCalculatorContext from '../../../core/context/CalculatorContext'
import HelpHint from '../../../shared/ui/HelpHint'
import StepIndicator from '../../../shared/ui/StepIndicator'
import IncomeSection from '../sections/IncomeSection'
import ConfigSection from '../sections/ConfigSection'
import ExpensesSection from '../sections/ExpensesSection'
import ReceiptModal from '../modals/ReceiptModal'
import ConfirmResetModal from '../modals/ConfirmResetModal'
import OnboardingGuide from './OnboardingGuide'
import type { TDirection } from '../types/direction'
import type { TAnimateWizard } from '../types/animateWizard'
import { ResultsSection } from '../sections/ResultsSection'
import VouchersSection from '../sections/VouchersSection'
import { EStoreKey } from '../../../core/enum/EStoreKey'

const STEP_LABELS: string[] = ['Ingreso', 'Vales', '%', 'Gastos', 'Resultados']
const STEP_HELP_TEXTS: string[] = [
  'Ingresá el total del día para continuar',
  'Completá los datos de todos los vales (nombre, viajes y precio)',
  'Los porcentajes deben sumar 100%',
  '',
]

const stepComponents: (() => JSX.Element)[] = [
  IncomeSection,
  VouchersSection,
  ConfigSection,
  ExpensesSection,
]

const stepValid = (state: ReturnType<typeof useCalculatorContext>['state'], step: number): boolean => {
  switch (step) {
    case 0: return state.total > 0
    case 1: return !state.showVouchers || (state.vouchers.length > 0 && state.vouchers.every((v) => v.trips > 0 && v.pricePerTrip > 0 && v.name.trim().length > 0))
    case 2: {
      const total:number = state.carRented
        ? state.agencyPercent + state.driverPercent + state.carPercent
        : state.agencyPercent + state.driverPercent
      return total === 100
    }
    case 3: return true
    default: return false
  }
}

interface IWizardPageProps {
  onBackToLanding: () => void
}

const StepRenderer = ({ step }: { step: number }): JSX.Element => {
  const StepComponent = stepComponents[step]
  return <StepComponent />
}

const WizardPage = ({ onBackToLanding }: IWizardPageProps) => {
  const { state, dispatch } = useCalculatorContext()
  const [currentStep, setCurrentStep] = useState<number>(0)
  const [direction, setDirection] = useState<TDirection | null>(null)
  const [receiptOpen, setReceiptOpen] = useState<boolean>(false)
  const [confirmResetOpen, setConfirmResetOpen] = useState<boolean>(false)
  const [showOnboarding, setShowOnboarding] = useState<boolean>(false)

  const CHECK_SEEN_ONBOARDING = (): void => {
    const SEEN_VALUE_OF_KEY: string | null = localStorage.getItem(EStoreKey.CAR_TRAVELS_ON_BOARDING)
    if (!SEEN_VALUE_OF_KEY) {
      setShowOnboarding(true)
    }
  }
  useEffect(CHECK_SEEN_ONBOARDING, []); //SOLO AL MONTARSE

  const goNext = useCallback(() => {
    if (currentStep < 4 && stepValid(state, currentStep)) {
      const nextStep: number = currentStep + 1
      setDirection('next')
      setCurrentStep(nextStep)
      if (nextStep === 4 && !state.calculated) {
        dispatch({ type: 'CALCULATE' })
      }
    }
  }, [currentStep, state, dispatch]) //SE RECREA INSTANCIA AL CAMBIAR PASO, Y ESTADO

  const goPrev = useCallback(() => {
    if (currentStep > 0) {
      setDirection('prev')
      setCurrentStep((s) => s - 1)
    }
  }, [currentStep])

  const animateClass: TAnimateWizard = direction === 'next' ? 'animate-slide-in-right' : direction === 'prev'
    ? 'animate-slide-in-left'
    : 'animate-fade-in'

  const HANDLE_CLOSE_RECEIPT = useCallback(() => setReceiptOpen(false), [])
  const HANDLE_CANCEL_RESET = useCallback(() => setConfirmResetOpen(false), [])

  const handleReset = useCallback(() => setConfirmResetOpen(true), [])

  const confirmReset = useCallback(() => {
    dispatch({ type: 'RESET' })
    setConfirmResetOpen(false)
    setCurrentStep(0)
    setDirection(null)
  }, [dispatch])

  return (
    <div className="mx-auto max-w-2xl px-4 pb-8 pt-4 md:px-6 md:pt-6 animate-fade-in-up">
      <div className="flex justify-end mb-4 gap-2">
        {
          (state.total > 0 || state.vouchers.some((v) => v.saved)) && <span className="inline-flex items-center gap-1.5">
            <button
              type="button"
              onClick={handleReset}
              className="inline-flex items-center gap-1.5 rounded-lg bg-accent-red/10 px-3 py-1.5 text-xs font-medium text-accent-red transition-colors hover:bg-accent-red/20 cursor-pointer font-display border border-accent-red/20"
            >
              <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
              Reiniciar
            </button>
            <HelpHint text="Reinicia todos los valores del formulario: total, porcentajes, gastos y vales guardados. Esta acción no se puede deshacer." side="bottom" />
          </span>
        }
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
          {currentStep < 4 && <StepRenderer step={currentStep} />}
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

        <div className="flex items-center gap-2">
          {!stepValid(state, currentStep) && currentStep < 4 && (
            <span className="hidden sm:inline text-xs text-text-muted/70 max-w-28 leading-tight text-right">
              {STEP_HELP_TEXTS[currentStep]}
            </span>
          )}
          {currentStep < 4 && (
            <span className="inline-flex items-center gap-1.5">
              <button
                type="button"
                onClick={goNext}
                disabled={!stepValid(state, currentStep)}
                className="inline-flex items-center gap-1.5 rounded-xl bg-accent-violet px-4 py-2.5 text-sm font-bold text-white transition-all duration-200 hover:shadow-glow-violet disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer font-display"
              >
                Siguiente
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </button>
              {!stepValid(state, currentStep) && (
                <HelpHint text={STEP_HELP_TEXTS[currentStep]} side="bottom" />
              )}
            </span>
          )}
        </div>
      </div>

      <OnboardingGuide
        isOpen={showOnboarding}
        onClose={() => setShowOnboarding(false)}
      />

      <ReceiptModal isOpen={receiptOpen} onClose={HANDLE_CLOSE_RECEIPT} />
      <ConfirmResetModal
        isOpen={confirmResetOpen}
        onConfirm={confirmReset}
        onCancel={HANDLE_CANCEL_RESET}
      />
    </div>
  )
}

export default WizardPage
