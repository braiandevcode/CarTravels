import { Calculator, FileText, Smartphone } from 'lucide-react';
import type { TLandingList } from '../types/featureItems';

const features: TLandingList = [
  {
    id: crypto.randomUUID(),
    icon: Calculator,
    title: "Calculá al instante",
    desc: "Ingresá el total, los vales y los gastos. Todo se ajusta solo.",
    iconColor: "text-accent-violet",
  },
  {
    id: crypto.randomUUID(),
    icon: FileText,
    title: "Comprobante al toque",
    desc: "Descargá PDF o compartí por WhatsApp el resumen de tu jornada.",
    iconColor: "text-accent-green",
  },
  {
    id: crypto.randomUUID(),
    icon: Smartphone,
    title: "Sin registro, sin vueltas",
    desc: "Todo queda guardado en tu dispositivo. Usalo sin internet.",
    iconColor: "text-accent-violet-soft",
  },
];

export default features;
