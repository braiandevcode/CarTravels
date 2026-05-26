import { RotateCcw } from "lucide-react"
import { ResultsSection } from "./sections/ResultsSection"
import { useState } from "react"
import useCalculatorContext  from '../../core/context/CalculatorContext'
import ModalPortal from "../../shared/components/ModalPortal"
import ConfigSection from "./sections/ConfigSection"
import IncomeSection from "./sections/IncomeSection"
import ExpensesSection from "./sections/ExpensesSection"
import FactoriesSection from "./sections/FactoriesSection"
import ReceiptModal from "./modals/ReceiptModal"
import ConfirmResetModal from "./modals/ConfirmResetModal"

const CalculatorContent = () => {
  const { state, dispatch } = useCalculatorContext()
  const [receiptOpen, setReceiptOpen] = useState<boolean>(false)
  const [confirmResetOpen, setConfirmResetOpen] = useState<boolean>(false)

  const hasData: boolean = state.total > 0 || state.gas > 0 || state.petrol > 0 || state.factories.length > 0

  const handleReset = ():void => {
    if (hasData) {
      setConfirmResetOpen(true)
    }
  }

  const confirmReset = ():void => {
    dispatch({ type: 'RESET' })
    setConfirmResetOpen(false)
  }

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
          <ConfigSection />
          <IncomeSection />
          <ExpensesSection />
          <FactoriesSection />
          <ResultsSection onViewReceipt={() => setReceiptOpen(true)} />
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

export default CalculatorContent;