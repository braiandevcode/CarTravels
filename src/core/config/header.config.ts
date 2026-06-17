import { House, CircleHelp, Info } from 'lucide-react'
import type { NavLinks } from '../types/header'

export const navLinks: NavLinks[] = [
  { to: '/', label: 'Inicio', icon: House },
  { to: '/faq', label: 'FAQ', icon: CircleHelp },
  { to: '/about', label: 'Acerca', icon: Info },
]
