import { Car, Menu, X, Sun, Moon } from 'lucide-react'
import { useState, useEffect } from 'react'
import { NavLink, useNavigate, type NavigateFunction } from 'react-router-dom'
import { navLinks } from '../../core/config/header.config'
import { useTheme } from '../../core/context/ThemeContext'
import { FaCar } from 'react-icons/fa'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false)

  useEffect(() => {
    const handler = () => setIsMenuOpen(false)
    window.addEventListener('modal:open', handler)
    return () => window.removeEventListener('modal:open', handler)
  }, [])
  const navigate: NavigateFunction = useNavigate()
  const { theme, toggleTheme } = useTheme()
  const ThemeIcon = theme === 'dark' ? Sun : Moon

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
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent-violet/15 border border-accent-violet/20">
            <FaCar className="h-5 w-5 text-accent-violet" aria-hidden="true" />
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
                    ? 'bg-accent-violet/15 text-accent-violet border border-accent-violet/20'
                    : 'text-text-secondary hover:bg-bg-hover hover:text-text-primary border border-transparent'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={toggleTheme}
            className="flex items-center justify-center h-9 w-9 rounded-lg bg-bg-card border border-border-subtle text-text-secondary hover:text-accent-violet hover:border-accent-violet/30 transition-all duration-200 cursor-pointer"
            aria-label={theme === 'dark' ? 'Activar modo claro' : 'Activar modo oscuro'}
            title={theme === 'dark' ? 'Modo claro' : 'Modo oscuro'}
          >
            <ThemeIcon className="h-4.5 w-4.5" aria-hidden="true" />
          </button>

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
                    ? 'bg-accent-violet/15 text-accent-violet border-l-4 border-accent-violet'
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