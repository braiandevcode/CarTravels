interface IFaqItems{
  question: string;
  answer: string;
}

const faqItems: IFaqItems[] = [
  {
    question: '¿Cómo funciona LiquidChofer?',
    answer:
      'LiquidChofer es una calculadora pensada para simplificar tus cuentas del día. Solo tenés que ingresar el total de la jornada, tus gastos (gas o nafta), si el auto es alquilado o no, y los vales. La app calcula sola cuánto le toca a la agencia, cuánto te queda a vos y cuánto va para el auto.',
  },
  {
    question: '¿Aplica a todos los choferes de cualquier agencia?',
    answer:
      'Intentamos ofrecer un servicio flexible que se adapte a cualquier chofer. Sin embargo, somos conscientes de que hay casos muy particulares donde la app puede no ajustarse a tu necesidad exacta. De todas formas, te invitamos a probar la herramienta para ver por vos mismo si te sirve.',
  },
  {
    question: '¿Tengo que crear una cuenta?',
    answer:
      'No. LiquidChofer funciona directo en el navegador de tu teléfono o computadora sin necesidad de registrarte. Tus datos se guardan solo en tu dispositivo, por lo que nadie más tiene acceso a ellos. No necesitás email ni contraseña.',
  },
  {
    question: '¿Qué pasa con mis datos? ¿Son seguros?',
    answer:
      'Tus datos están 100% seguros. Todo se guarda en tu propio teléfono o computadora. No enviamos nada a internet ni a ninguna base de datos fuera de tu dispositivo. Podés borrar todo cuando quieras usando el botón "Resetear".',
  },
  {
    question: '¿Cómo maneja los vales?',
    answer:
      'Podés agregar todos los vales que necesites, poniéndoles su nombre, tipo, valor y la cantidad de viajes que hiciste con cada uno. La app suma todo automáticamente y descuenta lo que corresponde de la liquidación de la agencia. Es ideal si trabajás con agencias que tienen contratos fijos.',
  },
  {
    question: '¿Qué tipos de vales existen?',
    answer:
      'Están pensados para cubrir lo que más se usa en el día a día de las agencias. Para darte flexibilidad, tenés dos opciones: "Fábrica" u "Otro".',
  },
  {
    question: '¿Qué sucede al elegir un vale de tipo "Fábrica"?',
    answer:
      'Se usan para viajes de contratos o empresas que tienen una tarifa fija acordada con la agencia (que suele ser más barata). Ponés el precio real del viaje y el precio fijado por la agencia, y la app se encarga de acomodar la diferencia en los números.',
  },
  {
    question: '¿Qué sucede al elegir un vale de tipo "Otro"?',
    answer:
      'Son para los vales comunes de todos los días, donde el viaje no tiene ningún descuento ni tarifa especial. Solo ponés el valor real del viaje y listo.',
  },
  {
    question: '¿Puedo modificar los porcentajes?',
    answer:
      'Sí. En la sección de configuración podés cambiar los porcentajes que se llevan la agencia, el conductor y el auto (si es alquilado). Lo único importante es que la suma dé exactamente 100%. La misma pantalla te avisa si te falta o te pasás de ese total.',
  },
  {
    question: '¿Puedo descargar el resumen?',
    answer:
      'Sí. Una vez que cargues tus datos, podés armar un recibo en PDF para descargar o compartir directo por WhatsApp. El documento viene con todos los detalles de tu día organizados de forma clara.',
  },
  {
    question: '¿Funciona sin internet?',
    answer:
      'Sí. Una vez que entrás a la página por primera vez, podés usar LiquidChofer sin gastar datos ni necesitar WiFi. Es ideal para seguir trabajando en zonas donde te quedás sin señal.',
  },
]

export default faqItems