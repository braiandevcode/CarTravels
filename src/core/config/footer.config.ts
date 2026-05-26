import { SiGithub, SiInstagram } from "react-icons/si";
import type { LegalLink, SocialLink } from "../types/footer";
import { FileText, Shield } from "lucide-react";

export const legalLinks: LegalLink[] = [
  { to: "/terms", label: "Términos y Condiciones", icon: FileText },
  { to: "/privacy", label: "Política de Privacidad", icon: Shield },
];

export const socialLinks: SocialLink[] = [
  {
    href: "https://github.com/braiandevcode",
    label: "GitHub",
    icon: SiGithub,
  },
  {
    href: "https://www.instagram.com/freelancer.dev.bp/",
    label: "Instagram",
    icon: SiInstagram,
  },
];
