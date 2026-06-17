import { useState, useEffect, type ReactNode } from 'react'
import { HelpCircle, ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'
import { SPONSORS } from '../../core/config/sponsor.config'
import SponsorBanner from '../../shared/components/SponsorBanner'
import faqItems from '../../core/config/FAQPage.config'
import Accordion from '../../shared/ui/Accordion'

const FAQPage = (): ReactNode => {
  const [showSponsor, setShowSponsor] = useState(false)

  const SHOW_SPONSOR_WITH_TRANSITION = (): (() => void) => {
    const timerId: number = window.setTimeout(() => setShowSponsor(true), 0)
    return () => window.clearTimeout(timerId)
  }
  useEffect(SHOW_SPONSOR_WITH_TRANSITION, [])

  return (
    <div className="min-safe">
      {/* Desktop: fixed left sidebar (xl+) */}
      <div
        className={`hidden xl:block fixed left-4 top-1/2 -translate-y-1/2 z-30 w-60 transition-all duration-700 ease-out ${showSponsor ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'}`}
      >
        <SponsorBanner
          imageUrl={SPONSORS[0].imageUrl}
          linkUrl={SPONSORS[0].linkUrl}
          alt={SPONSORS[0].alt}
        />
      </div>

      {/* Mobile: sticky slide from top with dismiss */}
      <div className="sticky top-[60px] z-20 xl:hidden bg-bg-primary">
        <div
          className={`transition-all duration-700 ease-out overflow-hidden ${showSponsor ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'}`}
        >
          <div className="mx-auto max-w-3xl px-4 pt-2 md:px-6">
            <SponsorBanner
              imageUrl={SPONSORS[0].imageUrl}
              linkUrl={SPONSORS[0].linkUrl}
              alt={SPONSORS[0].alt}
              dismissible
            />
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-4 py-8 md:px-6 md:py-10">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-text-secondary hover:text-accent-teal transition-colors cursor-pointer mb-6 group"
        >
          <ArrowLeft className="h-4 w-4 group-hover:-translate-x-0.5 transition-transform" aria-hidden="true" />
          Volver al inicio
        </Link>

        <div className="flex flex-col items-center text-center mb-8 animate-fade-in-up">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-accent-teal/15 border border-accent-teal/20 mb-4">
            <HelpCircle className="h-7 w-7 text-accent-teal" aria-hidden="true" />
          </div>
          <h1 className="text-3xl md:text-4xl font-black text-text-primary font-display tracking-tight mb-2">
            Preguntas Frecuentes
          </h1>
          <p className="text-base text-text-secondary max-w-md">
            Todo lo que necesitás saber sobre LiquidChofer. Si no encontrás tu respuesta,
            no dudes en contactarnos.
          </p>
        </div>

        <div className="animate-fade-in-up stagger-1">
          <Accordion items={faqItems} />
        </div>

        <div className="mt-10 p-6 card-glass rounded-2xl text-center animate-fade-in-up stagger-2">
          <p className="text-text-secondary text-sm mb-4">
            ¿Tenés otra pregunta?
          </p>
          <p className="text-text-primary font-semibold font-display">
            Estamos acá para ayudarte
          </p>
        </div>

      </div>
    </div>
  )
}

export default FAQPage;
