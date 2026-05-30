import { ArrowRight, Car, Calculator, FileText, Smartphone } from 'lucide-react'

interface LandingPageProps {
  onStart: () => void
}

const LandingPage = ({ onStart }: LandingPageProps) => {
  const features = [
    {
      icon: <Calculator className="h-5 w-5 text-accent-violet" aria-hidden="true" />,
      title: 'Calculá al instante',
      desc: 'Ingresá el total, los vales y los gastos. Todo se ajusta solo.',
    },
    {
      icon: <FileText className="h-5 w-5 text-accent-green" aria-hidden="true" />,
      title: 'Comprobante al toque',
      desc: 'Descargá PDF o compartí por WhatsApp el resumen de tu jornada.',
    },
    {
      icon: <Smartphone className="h-5 w-5 text-accent-violet-soft" aria-hidden="true" />,
      title: 'Sin registro, sin vueltas',
      desc: 'Todo queda guardado en tu dispositivo. Usalo sin internet.',
    },
  ]

  return (
    <div className="mx-auto max-w-2xl px-4 pb-16 pt-8 md:pt-16 animate-fade-in-up">
      <div className="flex flex-col items-center text-center gap-6 md:gap-8">
        <div className="flex h-16 w-16 md:h-20 md:w-20 items-center justify-center rounded-2xl bg-accent-violet/15 border border-accent-violet/20 shadow-glow-violet">
          <Car className="h-8 w-8 md:h-10 md:w-10 text-accent-violet" aria-hidden="true" />
        </div>

        <div className="space-y-3">
          <h1 className="text-3xl md:text-5xl font-black text-text-primary font-display tracking-tight leading-tight">
            Tu jornada,
            <br />
            <span className="text-accent-violet">calculada al instante</span>
          </h1>
          <p className="text-base md:text-lg text-text-secondary max-w-lg mx-auto leading-relaxed">
            Olvidate de los cálculos tediosos al final del turno.{' '}
            <span className="text-text-primary font-semibold">carTravels</span> hace el trabajo
            por vos: ingresá los datos y tené todo listo en segundos.
          </p>
        </div>

        <button
          type="button"
          onClick={onStart}
          className="inline-flex items-center gap-2.5 rounded-xl bg-accent-violet px-6 py-3.5 md:px-8 md:py-4 text-base md:text-lg font-bold text-white font-display transition-all duration-200 hover:shadow-glow-violet hover:scale-[1.02] active:scale-100 cursor-pointer"
        >
          Empezar
          <ArrowRight className="h-5 w-5" aria-hidden="true" />
        </button>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8 md:mt-12 w-full">
          {features.map((f) => (
            <div
              key={f.title}
              className="card-glass rounded-xl p-4 md:p-5 text-left space-y-2 hover:border-accent-violet/30 transition-all duration-200"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-bg-hover">
                {f.icon}
              </div>
              <h3 className="text-sm font-bold text-text-primary font-display">{f.title}</h3>
              <p className="text-xs text-text-muted leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default LandingPage
