import { Component, type ReactNode, type ErrorInfo } from 'react'
import { AlertTriangle, RotateCcw } from 'lucide-react'

interface IErrorBoundaryState {
  hasError: boolean
}

interface IErrorBoundaryProps {
  children: ReactNode
}

class ErrorBoundary extends Component<IErrorBoundaryProps, IErrorBoundaryState> {
  constructor(props: IErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(): IErrorBoundaryState {
    return { hasError: true }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error('ErrorBoundary caught:', error, errorInfo)
  }

  HANDLE_RELOAD = (): void => {
    window.location.reload()
  }

  render(): ReactNode {
    if (this.state.hasError) {
      return (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-bg-deep p-6 animate-fade-in"
          role="alert"
          aria-live="assertive"
        >
          <div className="flex flex-col items-center text-center gap-5 max-w-sm">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-accent-red/15 border border-accent-red/20">
              <AlertTriangle className="h-8 w-8 text-accent-red" aria-hidden="true" />
            </div>

            <div className="space-y-2">
              <h1 className="text-2xl md:text-3xl font-black text-text-primary font-display tracking-tight">
                Algo salió mal
              </h1>
              <p className="text-sm md:text-base text-text-secondary leading-relaxed">
                Ocurrió un error inesperado. Puede deberse a un problema temporal.
                Intentá recargar la página.
              </p>
            </div>

            <button
              type="button"
              onClick={this.HANDLE_RELOAD}
              className="inline-flex items-center gap-2 rounded-xl bg-accent-violet px-6 py-3 text-sm font-bold text-white font-display transition-all duration-200 hover:shadow-glow-violet hover:scale-[1.02] active:scale-100 cursor-pointer"
            >
              <RotateCcw className="h-4 w-4" aria-hidden="true" />
              Recargar página
            </button>

            <p className="text-xs text-text-muted/60 max-w-xs">
              Si el problema persiste, contactanos para ayudarte.
            </p>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
