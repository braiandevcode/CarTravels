import { Car, Menu, X } from 'lucide-react'
import { useState } from 'react'
import { NavLink, useNavigate, type NavigateFunction } from 'react-router-dom'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const navigate: NavigateFunction = useNavigate()

  const navLinks = [
    { to: '/', label: 'Inicio' },
    { to: '/faq', label: 'Preguntas Frecuentes' },
    { to: '/about', label: 'Acerca de' },
  ]

  const handleLogoClick = () => {
    navigate('/')
    setIsMenuOpen(false)
  }

  const handleNavClick = () => {
    setIsMenuOpen(false)
  }

  return (
    <header className="sticky top-0 z-50 bg-gradient-to-r from-bg-card via-bg-card to-bg-card-subtle border-b border-border-subtle backdrop-blur-sm">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3 md:px-6">
        <button
          type="button"
          onClick={handleLogoClick}
          className="flex items-center gap-3 cursor-pointer"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent-amber/15 border border-accent-amber/20">
            <Car className="h-5 w-5 text-accent-amber" aria-hidden="true" />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-black text-text-primary font-display tracking-tight">
              CarTravels
            </span>
            <span className="text-[10px] text-text-muted font-display">
              Calculadora de jornada
            </span>
          </div>
        </button>

        <nav className="hidden md:flex items-center gap-2" aria-label="Navegación principal">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              onClick={handleNavClick}
              className={({ isActive }) =>
                `px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer font-display tracking-wide ${
                  isActive
                    ? 'bg-accent-amber/15 text-accent-amber border border-accent-amber/20'
                    : 'text-text-secondary hover:bg-bg-hover hover:text-text-primary border border-transparent'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <button
          type="button"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden flex items-center justify-center h-9 w-9 rounded-lg bg-bg-card border border-border-subtle text-text-secondary hover:text-text-primary hover:bg-bg-hover transition-colors cursor-pointer"
          aria-label={isMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ? (
            <X className="h-5 w-5" aria-hidden="true" />
          ) : (
            <Menu className="h-5 w-5" aria-hidden="true" />
          )}
        </button>
      </div>

      {isMenuOpen && (
        <nav
          className="md:hidden border-t border-border-subtle bg-bg-card animate-fade-in"
          aria-label="Navegación móvil"
        >
          <div className="flex flex-col p-2 gap-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={handleNavClick}
                className={({ isActive }) =>
                  `px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 cursor-pointer font-display tracking-wide ${
                    isActive
                      ? 'bg-accent-amber/15 text-accent-amber border-l-4 border-accent-amber'
                      : 'text-text-secondary hover:bg-bg-hover hover:text-text-primary border-l-4 border-transparent'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </div>
        </nav>
      )}
    </header>
  )
}

export default Header;