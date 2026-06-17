import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'

type Theme = 'dark' | 'light'

interface ThemeContextType {
  theme: Theme
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextType | null>(null)

const STORAGE_KEY: string = 'cartravels-theme'

export function ThemeProvider({ children }: { children: ReactNode }): ReactNode {
  const [theme, setTheme] = useState<Theme>(() => {
    try {
      const stored: string | null = localStorage.getItem(STORAGE_KEY)
      if (stored === 'light' || stored === 'dark') return stored
    } catch {
      // localStorage not available
    }
    return 'dark'
  })

  const HANDLE_THEME_SYNC = (): void => {
    const root: HTMLElement = document.documentElement
    if (theme === 'light') {
      root.classList.add('light')
    } else {
      root.classList.remove('light')
    }
    localStorage.setItem(STORAGE_KEY, theme)
  }

  useEffect(HANDLE_THEME_SYNC, [theme])

  const toggleTheme = (): void => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useTheme(): ThemeContextType {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider')
  return ctx
}
