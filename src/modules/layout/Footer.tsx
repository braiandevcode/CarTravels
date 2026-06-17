import { Link } from 'react-router-dom'
import { legalLinks, socialLinks } from '../../core/config/footer.config'

import type { ReactNode } from 'react'

const Footer = ():ReactNode => {
  const currentYear: number = new Date().getFullYear()
  return (
    <footer className="bg-bg-card border-t border-border-subtle mt-auto">
      <div className="mx-auto max-w-5xl px-4 py-8 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col gap-3">
            <Link to="/" className="flex items-center gap-2 cursor-pointer">
              <img src="/logo.png" alt="LiquidChofer" className="h-10 w-10 rounded-lg" />
              <span className="text-lg font-black text-text-primary font-display tracking-tight">
                LiquidChofer
              </span>
            </Link>
            <p className="text-sm text-text-secondary max-w-xs">
              Calculadora de jornada diseñada para choferes de agencias de autos y taxis.
              Simplifica tus cálculos diarios.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <h3 className="text-sm font-bold text-text-primary font-display tracking-wide uppercase">
              Legal
            </h3>
            <nav aria-label="Enlaces legales" className="flex flex-col gap-2">
              {legalLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="flex items-center gap-2 text-sm text-text-secondary hover:text-accent-teal transition-colors cursor-pointer group"
                >
                  <link.icon className="h-4 w-4 text-text-muted group-hover:text-accent-teal transition-colors" aria-hidden="true" />
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="flex flex-col gap-3">
            <h3 className="text-sm font-bold text-text-primary font-display tracking-wide uppercase">
              Redes Sociales
            </h3>
            <nav aria-label="Redes sociales" className="flex flex-row gap-2">
              {socialLinks.map((social) => (
                <a
                  key={social.href}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center h-10 w-10 rounded-xl bg-bg-input border border-border-subtle text-text-secondary hover:text-accent-amber hover:border-accent-amber/30 hover:bg-accent-amber/5 transition-all duration-200 cursor-pointer"
                  aria-label={`Visitar ${social.label}`}
                >
                  <social.icon className="h-5 w-5" aria-hidden="true" />
                </a>
              ))}
            </nav>
          </div>
        </div>

        <div className="subtle-divider my-6" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-2">
          <p className="text-xs text-text-muted font-display">
            © {currentYear} LiquidChofer. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer;