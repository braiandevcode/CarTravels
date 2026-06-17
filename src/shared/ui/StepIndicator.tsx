import { Check } from 'lucide-react'
import type { ReactNode } from 'react'

interface IStepIndicatorProps {
  currentStep: number
  totalSteps: number
  labels: string[]
}

const StepIndicator = ({ currentStep, totalSteps, labels }: IStepIndicatorProps): ReactNode => {
  return (
    <div className="flex items-center justify-center gap-1 md:gap-2 mb-6">
      {Array.from({ length: totalSteps }, (_, i) => {
        const step:number = i + 1
        const isActive:boolean = step === currentStep
        const isCompleted: boolean = step < currentStep

        return (
          <div key={step} className="flex items-center gap-1 md:gap-2">
            <div className="flex flex-col items-center gap-1">
              <div
                className={`flex h-8 w-8 md:h-9 md:w-9 items-center justify-center rounded-full text-xs md:text-sm font-bold font-display transition-all duration-300 ${
                  isCompleted
                    ? 'bg-accent-green text-white'
                    : isActive
                      ? 'bg-accent-violet text-white shadow-glow-violet ring-2 ring-accent-violet/40'
                      : 'bg-bg-hover text-text-muted border border-border-subtle'
                }`}
                aria-current={isActive ? 'step' : undefined}
              >
                {isCompleted ? (
                  <Check className="h-4 w-4 md:h-4.5 md:w-4.5" aria-hidden="true" />
                ) : (
                  step
                )}
              </div>
              <span
                className={`hidden md:block text-[11px] font-medium font-display transition-colors duration-300 ${
                  isActive
                    ? 'text-accent-violet'
                    : isCompleted
                      ? 'text-accent-green'
                      : 'text-text-muted'
                }`}
              >
                {labels[i]}
              </span>
            </div>
            {step < totalSteps && (
              <div
                className={`h-0.5 w-6 md:w-10 rounded-full transition-all duration-300 ${
                  isCompleted ? 'bg-accent-green' : 'bg-border-subtle'
                }`}
              />
            )}
          </div>
        )
      })}
    </div>
  )
}

export default StepIndicator
