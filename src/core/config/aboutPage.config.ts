import { Calculator, Clock, Download, FileText, Shield, Zap } from 'lucide-react'
import type { Feature } from '../types/about'

export const features:Feature[] = [
  {
    icon: Calculator,
    title: 'Cálculos Automáticos',
    description:
      'Olvidate de hacer cuentas manualmente. Ingresá tus datos y nosotros nos encargamos de todo el resto. Distribución de porcentajes, gastos, fábricas: todo calculado al instante.',
  },
  {
    icon: Clock,
    title: 'Ahorrá Tiempo',
    description:
      'Lo que antes te llevaba 15-20 minutos al finalizar tu jornada, ahora lo hacés en menos de 2 minutos. Más tiempo para vos, menos tiempo para papeleo.',
  },
  {
    icon: Shield,
    title: 'Sin Errores',
    description:
      'Adiós a los errores de cálculo. El sistema valida automáticamente que tus porcentajes sumen 100% y realiza todas las operaciones con precisión matemática.',
  },
  {
    icon: FileText,
    title: 'Recibos Profesionales',
    description:
      'Generá recibos en PDF listos para descargar o compartir. Todo organizado, claro y profesional. Ideal para presentar a tu agencia.',
  },
  {
    icon: Download,
    title: 'Funciona sin Internet',
    description:
      'Una vez que cargás la página, podés usarla sin conexión. Perfecto para zonas con mala señal o cuando te quedás sin datos.',
  },
  {
    icon: Zap,
    title: 'Rápido y Ligero',
    description:
      'Diseñado para ser veloz incluso en teléfonos antiguos. Sin publicidades intrusivas, sin apps pesadas para instalar.',
  },
]

export const benefits: string[] = [
  'Calculá tu jornada en segundos',
  'Distribución automática de porcentajes',
  'Manejo de múltiples fábricas',
  'Control de gastos (Gas y Nafta)',
  'Generá recibos en PDF',
  '100% gratis para usar',
]