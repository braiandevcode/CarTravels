import { useState } from 'react'
import { X, Car, Calculator, Percent, Fuel, FileText, Check } from 'lucide-react'

interface OnboardingGuideProps {
  isOpen: boolean
  onClose: () => void
}

const steps = [
  {
    icon: <Calculator className="h-6 w-6 text-accent-violet" aria-hidden="true" />,
    title: 'Ingresá el total del día',
    desc: 'Poné lo que facturaste en todo el turno. Este es el punto de partida para todos los cálculos.',
  },
  {
    icon: <Car className="h-6 w-6 text-accent-green" aria-hidden="true" />,
    title: 'Agregá los vales',
    desc: 'Si tuviste viajes con vale, seleccioná el tipo y completá los datos. Los vales tipo "Fábrica" tienen un precio fijo de planilla.',
  },
  {
    icon: <Percent className="h-6 w-6 text-accent-violet-soft" aria-hidden="true" />,
    title: 'Ajustá los porcentajes',
    desc: 'Configurá el % que se lleva la agencia y el tuyo. Si el vehículo es alquilado, activá el toggle y ajustá ese % también.',
  },
  {
    icon: <Fuel className="h-6 w-6 text-accent-red" aria-hidden="true" />,
    title: 'Cargá los gastos',
    desc: 'Anotá lo que gastaste en gas (GNV) y nafta. Estos se descuentan del vehículo si está alquilado.',
  },
  {
    icon: <FileText className="h-6 w-6 text-accent-green" aria-hidden="true" />,
    title: 'Revisá los resultados',
    desc: 'Todo calculado al instante. Podés ver el detalle completo, descargar PDF o compartir por WhatsApp.',
  },
]

const OnboardingGuide = ({ isOpen, onClose }: OnboardingGuideProps) => {
  const [step, setStep] = useState(0)

  const handleClose = () => {
    localStorage.setItem('cartravels-onboarding', 'seen')
    onClose()
    setStep(0)
  }

  const handleNext = () => {
    if (step < steps.length - 1) {
      setStep((s) => s + 1)
    } else {
      handleClose()
    }
  }

  const handleSkip = () => handleClose()

  if (!isOpen) return null

  const s = steps[step]

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 animate-fade-in"
      onClick={(e) => { if (e.target === e.currentTarget) handleClose() }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Guía de uso"
        className="relative w-full max-w-sm rounded-2xl bg-bg-card border border-border-subtle shadow-xl overflow-hidden animate-scale-in"
      >
        <div className="flex items-center justify-between p-4 border-b border-border-subtle">
          <span className="text-xs font-semibold text-text-muted font-display tracking-wide uppercase">
            {step + 1} de {steps.length}
          </span>
          <button
            type="button"
            onClick={handleClose}
            className="rounded-full p-1.5 text-text-muted hover:text-text-primary hover:bg-bg-hover transition-colors cursor-pointer"
            aria-label="Cerrar guía"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>

        <div className="p-6 flex flex-col items-center text-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-bg-hover border border-border-subtle">
            {s.icon}
          </div>
          <h2 className="text-lg font-bold text-text-primary font-display tracking-tight">
            {s.title}
          </h2>
          <p className="text-sm text-text-secondary leading-relaxed">
            {s.desc}
          </p>

          <div className="flex gap-1.5 mt-2">
            {steps.map((_, i) => (
              <div
                key={i}
                className={`h-1.5 w-6 rounded-full transition-all duration-300 ${
                  i === step ? 'bg-accent-violet' : 'bg-border-subtle'
                }`}
              />
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between p-4 border-t border-border-subtle">
          <button
            type="button"
            onClick={handleSkip}
            className="text-xs font-medium text-text-muted hover:text-text-primary transition-colors cursor-pointer font-display"
          >
            Saltar
          </button>
          <button
            type="button"
            onClick={handleNext}
            className="inline-flex items-center gap-1.5 rounded-xl bg-accent-violet px-4 py-2 text-sm font-bold text-white transition-all hover:shadow-glow-violet cursor-pointer font-display"
          >
            {step < steps.length - 1 ? 'Siguiente' : (
              <>
                <Check className="h-4 w-4" aria-hidden="true" />
                Listo
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}

export default OnboardingGuide
