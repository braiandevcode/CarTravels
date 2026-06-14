import {
  ArrowLeft,
  Calculator,
  Sparkles,
  CheckCircle,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import { SPONSORS } from '../../core/config/sponsor.config'
import SponsorBanner from '../../shared/components/SponsorBanner'
import Button  from '../../shared/ui/Button'
import { benefits, features } from '../../core/config/aboutPage.config'
import { useState, useEffect, type ReactNode } from 'react'

const AboutPage = ():ReactNode => {
  const [showSponsor, setShowSponsor] = useState(false)

  useEffect(() => {
    setShowSponsor(true)
  }, [])

  return (
    <div className="min-h-[calc(100vh-140px)]">
      {/* Desktop: fixed right sidebar (xl+) */}
      <div
        className={`hidden xl:block fixed right-4 top-1/2 -translate-y-1/2 z-10 w-80 transition-all duration-700 ease-out ${showSponsor ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}`}
      >
        <SponsorBanner
          imageUrl={SPONSORS[0].imageUrl}
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
          <div className="mx-auto max-w-5xl px-4 pt-2 md:px-6">
            <SponsorBanner
              imageUrl={SPONSORS[0].imageUrl}
              linkUrl={SPONSORS[0].linkUrl}
              alt={SPONSORS[0].alt}
              dismissible
            />
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-4 py-8 md:px-6 md:py-10">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-text-secondary hover:text-accent-teal transition-colors cursor-pointer mb-6 group"
        >
          <ArrowLeft className="h-4 w-4 group-hover:-translate-x-0.5 transition-transform" aria-hidden="true" />
          Volver al inicio
        </Link>

        <section className="text-center mb-16 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-amber/10 border border-accent-amber/20 mb-6">
            <Sparkles className="h-4 w-4 text-accent-amber" aria-hidden="true" />
            <span className="text-sm font-medium text-accent-amber font-display tracking-wide">
              Diseñado para choferes
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-text-primary font-display tracking-tight mb-6">
            Dejá de Hacer
            <br />
            <span className="bg-gradient-to-r from-accent-amber to-accent-teal bg-clip-text text-transparent">
              Cuentas Manuales
            </span>
          </h1>

          <p className="text-lg md:text-xl text-text-secondary max-w-2xl mx-auto mb-10">
            CarTravels simplifica el cálculo de tu jornada laboral. Ingresá tus datos,
            y nosotros nos encargamos de distribuir cada peso entre agencia, conductor
            y vehículo. Sin errores, sin complicaciones.
          </p>

          <Link to="/">
            <Button variant="primary" fullWidth={false} className="text-lg px-10 py-4">
              Empezar a Usar
            </Button>
          </Link>
        </section>

        <section className="mb-16 animate-fade-in-up stagger-1">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="order-2 lg:order-1">
              <h2 className="text-3xl font-black text-text-primary font-display tracking-tight mb-4">
                Pensado para Vos
              </h2>
              <p className="text-text-secondary mb-6 leading-relaxed">
                Sabemos que al finalizar una jornada larga, lo último que querés es
                ponerte a hacer cuentas en una libreta. CarTravels fue creado
                específicamente para choferes de agencias de autos y taxis.
              </p>
              <ul className="space-y-3">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle
                      className="h-5 w-5 text-accent-teal flex-shrink-0 mt-0.5"
                      aria-hidden="true"
                    />
                    <span className="text-text-secondary">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="order-1 lg:order-2">
              <div className="card-glass rounded-2xl p-8 card-accent-top">
                <div className="text-center">
                  <div className="inline-flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-accent-amber/20 to-accent-teal/20 border border-accent-amber/20 mb-6">
                    <Calculator className="h-10 w-10 text-accent-amber" aria-hidden="true" />
                  </div>
                  <h3 className="text-2xl font-black text-text-primary font-display mb-2">
                    Simple y Efectivo
                  </h3>
                  <p className="text-text-secondary">
                    Sin curvas de aprendizaje. Sin configuraciones complejas.
                    Abrís, ingresás tus datos, y listo.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-16 animate-fade-in-up stagger-2">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black text-text-primary font-display tracking-tight mb-3">
              Todo lo que Necesitás
            </h2>
            <p className="text-text-secondary max-w-xl mx-auto">
              Funcionalidades diseñadas específicamente para tu trabajo diario.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {features.map((feature, index) => (
              <div
                key={index}
                className="card-glass rounded-xl p-6 hover:border-accent-teal/30 transition-all duration-300 group"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent-teal/10 border border-accent-teal/20 mb-4 group-hover:bg-accent-teal/15 transition-colors">
                  <feature.icon
                    className="h-6 w-6 text-accent-teal"
                    aria-hidden="true"
                  />
                </div>
                <h3 className="text-lg font-bold text-text-primary font-display mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-text-secondary leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="animate-fade-in-up stagger-3">
          <div className="card-glass rounded-2xl p-8 md:p-12 text-center card-accent-top border-accent-amber/30">
            <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-accent-amber/15 border border-accent-amber/20 mb-6">
              <Sparkles className="h-7 w-7 text-accent-amber" aria-hidden="true" />
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-text-primary font-display tracking-tight mb-4">
              Listo para Empezar?
            </h2>
            <p className="text-lg text-text-secondary max-w-xl mx-auto mb-8">
              Dejá las libretas y las calculadoras manuales atrás.
              Probá CarTravels ahora y simplificá tu jornada.
            </p>
            <Link to="/">
              <Button variant="primary" fullWidth={false} className="text-lg px-10 py-4">
                Ir a la Calculadora
              </Button>
            </Link>
          </div>
        </section>
      </div>
    </div>
  )
}

export default AboutPage;