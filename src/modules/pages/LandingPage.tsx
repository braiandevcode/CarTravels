import { useState, useEffect } from 'react'
import { ArrowRight } from 'lucide-react'

import features from '../../core/config/landing.config'
import { SPONSORS } from '../../core/config/sponsor.config'
import SponsorBanner from '../../shared/components/SponsorBanner'
import type { ReactNode } from 'react'

interface ILandingPageProps {
  onStart: () => void
}

const LandingPage = ({ onStart }: ILandingPageProps):ReactNode => {
  const [showSponsor, setShowSponsor] = useState(false)

  const SHOW_SPONSOR_WITH_TRANSITION = (): (() => void) => {
    const timerId: number = window.setTimeout(() => setShowSponsor(true), 0)
    return () => window.clearTimeout(timerId)
  }
  useEffect(SHOW_SPONSOR_WITH_TRANSITION, [])

  return (
    <>
      {/* Desktop: fixed left sidebar (xl+) */}
      <div
        className={`hidden xl:block fixed left-4 top-1/2 -translate-y-1/2 z-10 w-60 transition-all duration-700 ease-out ${showSponsor ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'}`}
      >
        <SponsorBanner
          imageUrl={SPONSORS[0].imageUrl}
          logoUrl={SPONSORS[0].logoUrl ?? SPONSORS[0].imageUrl}
          linkUrl={SPONSORS[0].linkUrl}
          alt={SPONSORS[0].alt}
          dismissible
        />
      </div>

      {/* Mobile: sticky slide from top with dismiss */}
      <div className="sticky top-[60px] z-20 xl:hidden bg-bg-primary">
        <div
          className={`transition-all duration-700 ease-out overflow-hidden ${showSponsor ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'}`}
        >
          <div className="mx-auto max-w-2xl px-4 pt-2">
            <SponsorBanner
              imageUrl={SPONSORS[0].imageUrl}
              logoUrl={SPONSORS[0].logoUrl ?? SPONSORS[0].imageUrl}
              linkUrl={SPONSORS[0].linkUrl}
              alt={SPONSORS[0].alt}
              dismissible
            />
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-2xl px-4 pb-16 pt-8 md:pt-16 animate-fade-in-up">
      <div className="flex flex-col items-center text-center gap-6 md:gap-8">
        <img src="/logo.png" alt="LiquidChofer" className="h-20 w-20 md:h-24 md:w-24 rounded-2xl shadow-glow-violet" />

        <div className="space-y-3">
          <h1 className="text-3xl md:text-5xl font-black text-text-primary font-display tracking-tight leading-tight">
            Tu jornada,
            <br />
            <span className="text-accent-violet">calculada al instante</span>
          </h1>
          <p className="text-base md:text-lg text-text-secondary max-w-lg mx-auto leading-relaxed">
            Olvidate de los cálculos tediosos al final del turno.{' '}
            <span className="text-text-primary font-semibold">LiquidChofer</span> hace el trabajo
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
          {
           features.map((f) => {
            // ASIGNO A CONSTANTE CON MAYUSCULA PARA QUE REACT LO ENTIENDA
            const Icon = f.icon;
            return (
            <div
              key={f.id}
              className="card-glass rounded-xl p-4 md:p-5 text-left space-y-2 hover:border-accent-violet/30 transition-all duration-200"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-bg-hover">
                { <Icon className={`h-5 w-5 ${f.iconColor}`} aria-hidden='true' /> }
              </div>
              <h3 className="text-sm font-bold text-text-primary font-display">{f.title}</h3>
              <p className="text-xs text-text-muted leading-relaxed">{f.desc}</p>
            </div>
            )
          })}
        </div>
      </div>

      {/* Bottom: permanent banner (non-dismissible) */}
      <div className="mt-12 md:mt-16">
        <SponsorBanner
          imageUrl={SPONSORS[0].imageUrl}
          linkUrl={SPONSORS[0].linkUrl}
          alt={SPONSORS[0].alt}
        />
      </div>
    </div>
    </>
  )
}

export default LandingPage
