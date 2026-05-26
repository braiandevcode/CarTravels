import { HelpCircle, ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Accordion } from '../../shared/ui/Accordion'

const faqItems = [
  {
    question: '¿Cómo funciona carTravels?',
    answer:
      'carTravels es una calculadora diseñada para simplificar los cálculos diarios de los choferes. Simplemente ingresá el total del día, tus gastos (gas, nafta), y los viajes a fábricas. La herramienta calcula automáticamente la distribución entre la agencia, el conductor y el vehículo (si es alquilado).',
  },
  {
    question: '¿Tengo que crear una cuenta?',
    answer:
      'No. carTravels funciona directamente en tu navegador sin necesidad de registrarte. Tus datos se guardan directamente en tu teléfono o computadora, y solo vos tenés acceso a ellos. No necesitás email ni contraseña.',
  },
  {
    question: '¿Qué pasa con mis datos? ¿Son seguros?',
    answer:
      'Tus datos están 100% seguros. Todo se guarda en tu propio teléfono o computadora. No enviamos nada a internet ni a ningún servidor externo. Podés borrar todo cuando quieras usando el botón "Nuevo" o simplemente cerrando la página.',
  },
  {
    question: '¿Cómo maneja los viajes a fábricas?',
    answer:
      'Podés agregar todas las fábricas que necesites, cada una con su propio precio por viaje. El sistema suma automáticamente el total de todas las fábricas y ajusta el cálculo final de la agencia. Es ideal para cuando tenés contratos fijos con diferentes fábricas.',
  },
  {
    question: '¿Puedo modificar los porcentajes?',
    answer:
      'Sí. En la sección de configuración podés ajustar qué porcentaje le corresponde a la agencia, al conductor y al vehículo (si es alquilado). La suma debe ser exactamente 100% para que todo esté correcto. El mismo sistema te avisa si faltan o sobran puntos.',
  },
  {
    question: '¿Puedo descargar el resumen?',
    answer:
      'Sí. Una vez que tengas todos tus datos cargados, podés generar un recibo en PDF para descargar o compartir directamente por WhatsApp. El recibo viene con todos los detalles de tu jornada organizados de forma clara.',
  },
  {
    question: '¿Funciona sin internet?',
    answer:
      'Sí. Una vez que la página carga por primera vez, podés usar carTravels sin necesidad de tener datos o WiFi. Solo necesitás internet la primera vez para abrir la página. Después podés usarla incluso en zonas sin señal.',
  },
]

export function FAQPage() {
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
