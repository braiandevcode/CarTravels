import { Calculator, FileText, Fuel, Percent } from 'lucide-react';
import type { TOnBoardingGuideList } from '../types/featureItems';
import { FaCar } from 'react-icons/fa';

const stepsOnBoardingGuide: TOnBoardingGuideList = [
  {
    id: crypto.randomUUID(),
    icon: Calculator,
    title: "Ingresá el total del día",
    desc: "Poné lo que facturaste en todo el turno. Este es el punto de partida para todos los cálculos.",
    iconColor: "text-accent-violet",
  },
  {
    id: crypto.randomUUID(),
    icon: FaCar,
    title: "Agregá los vales",
    desc: 'Si tuviste viajes con vale, seleccioná el tipo y completá los datos. Los vales tipo "Fábrica" tienen un precio fijo de planilla.',
    iconColor: "text-accent-green",
  },
  {
    id: crypto.randomUUID(),
    icon: Percent,
    title: "Ajustá los porcentajes",
    desc: "Configurá el % que se lleva la agencia y el tuyo. Si el vehículo es alquilado, activá el toggle y ajustá ese % también.",
    iconColor: "text-accent-violet-soft",
  },
  {
    id: crypto.randomUUID(),
    icon: Fuel,
    title: "Cargá los gastos",
    desc: "Anotá lo que gastaste en gas (GNV) y nafta. Estos se descuentan del vehículo si está alquilado.",
    iconColor: "text-accent-red",
  },
  {
    id: crypto.randomUUID(),
    icon: FileText,
    title: "Revisá los resultados",
    desc: "Todo calculado al instante. Podés ver el detalle completo, descargar PDF o compartir por WhatsApp.",
    iconColor: "text-accent-green",
  },
];

export default stepsOnBoardingGuide;