import { HelpCircle, ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Accordion } from '../../shared/ui/Accordion'
import faqItems from '../../core/config/FAQPage.config'

const FAQPage = () => {
  return (
    <div className="min-h-[calc(100vh-140px)]">
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
            Todo lo que necesitás saber sobre carTravels. Si no encontrás tu respuesta,
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