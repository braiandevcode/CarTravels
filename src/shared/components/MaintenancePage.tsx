import { Wrench, RotateCcw } from 'lucide-react'
import type { ReactNode } from 'react'

const MaintenancePage = (): ReactNode => {
  const HANDLE_RETRY = (): void => {
    window.location.reload()
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-bg-deep p-6 animate-fade-in"
      role="alert"
      aria-live="polite"
    >
      <div className="flex flex-col items-center text-center gap-5 max-w-sm">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-accent-amber/15 border border-accent-amber/20">
          <Wrench className="h-8 w-8 text-accent-amber" aria-hidden="true" />
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl md:text-3xl font-black text-text-primary font-display tracking-tight">
            Sitio en mantenimiento
          </h1>
          <p className="text-sm md:text-base text-text-secondary leading-relaxed">
            Estamos trabajando para mejorar tu experiencia.
            Volvé pronto.
          </p>
        </div>

        <button
          type="button"
          onClick={HANDLE_RETRY}
          className="inline-flex items-center gap-2 rounded-xl bg-accent-violet px-6 py-3 text-sm font-bold text-white font-display transition-all duration-200 hover:shadow-glow-violet hover:scale-[1.02] active:scale-100 cursor-pointer"
        >
          <RotateCcw className="h-4 w-4" aria-hidden="true" />
          Reintentar
        </button>

        <p className="text-xs text-text-muted/60 max-w-xs">
          Si esto sigue así, volvé más tarde o contactanos.
        </p>
      </div>
    </div>
  )
}

export default MaintenancePage
