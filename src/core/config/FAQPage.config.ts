interface FaqItems{
    question: string;
    answer: string;
}

const faqItems: FaqItems[] = [
  {
    question: '¿Cómo funciona CarTravels?',
    answer:
      'CarTravels es una calculadora diseñada para simplificar los cálculos diarios de los choferes. Simplemente ingresá el total del día, tus gastos (gas, nafta), y los viajes a fábricas. La herramienta calcula automáticamente la distribución entre la agencia, el conductor y el vehículo (si es alquilado).',
  },
  {
    question: '¿Tengo que crear una cuenta?',
    answer:
      'No. CarTravels funciona directamente en tu navegador sin necesidad de registrarte. Tus datos se guardan directamente en tu teléfono o computadora, y solo vos tenés acceso a ellos. No necesitás email ni contraseña.',
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
      'Sí. Una vez que la página carga por primera vez, podés usar CarTravels sin necesidad de tener datos o WiFi. Solo necesitás internet la primera vez para abrir la página. Después podés usarla incluso en zonas sin señal.',
  },
]

export default faqItems