import { useId, useEffect, useRef, type ReactNode } from 'react'

interface IToggleProps {
  label: string
  enabled: boolean
  disabled?: boolean
  onChange: (enabled: boolean) => void
}

const Toggle = ({ label, enabled, disabled = false, onChange }: IToggleProps):ReactNode => {
  const labelId:string = useId()
  const liveRef = useRef<HTMLSpanElement>(null)

  const HANDLE_LIVE_REGION_UPDATE = (): void => {
    if (liveRef.current) {
      liveRef.current.textContent = `${label}: ${enabled ? 'activado' : 'desactivado'}`
    }
  }
  useEffect(HANDLE_LIVE_REGION_UPDATE, [enabled, label])

  return (
    <div className="flex items-center justify-between">
      <span id={labelId} className="text-sm font-medium text-text-secondary font-display">{label}</span>
      <button
        type="button"
        role="switch"
        aria-checked={enabled}
        aria-labelledby={labelId}
        onClick={() => !disabled && onChange(!enabled)}
        className={`relative inline-flex h-8 w-14 shrink-0 items-center rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-accent-green/30 focus:ring-offset-2 focus:ring-offset-bg-deep ${
          disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'
        } ${
          enabled ? 'bg-accent-green' : 'bg-border-subtle'
        }`}
        style={
          enabled
            ? { boxShadow: '0 0 15px rgba(34, 197, 94, 0.4)' }
            : {}
        }
      >
        <span
          aria-hidden="true"
          className={`inline-block h-6 w-6 transform rounded-full bg-white shadow-md transition-transform duration-300 ${
            enabled ? 'translate-x-7' : 'translate-x-1'
          }`}
        />
      </button>
      <span
        ref={liveRef}
        role="status"
        aria-live="polite"
        className="sr-only"
      />
    </div>
  )
}
export default Toggle;