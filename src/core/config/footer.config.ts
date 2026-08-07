import { SiGithub } from 'react-icons/si';
import type { LegalLink, SocialLink } from '../types/footer';
import { FileText, Shield } from 'lucide-react';

export const legalLinks: LegalLink[] = [
  { to: "/terms", label: "Términos y Condiciones", icon: FileText },
  { to: "/privacy", label: "Política de Privacidad", icon: Shield },
];

export const socialLinks: SocialLink[] = [
  {
    href: import.meta.env.VITE_GITHUB,
    label: "GitHub",
    icon: SiGithub,
  },
];
