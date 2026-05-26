import { useId } from 'react'

interface ToggleProps {
  label: string
  enabled: boolean
  onChange: (enabled: boolean) => void
}

const Toggle = ({ label, enabled, onChange }: ToggleProps) => {
  const labelId:string = useId()

  return (
    <div className="flex items-center justify-between">
      <span id={labelId} className="text-sm font-medium text-text-secondary font-display">{label}</span>
      <button
        type="button"
        role="switch"
        aria-checked={enabled}
        aria-labelledby={labelId}
        onClick={() => onChange(!enabled)}
        className={`relative inline-flex h-8 w-14 shrink-0 cursor-pointer items-center rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-accent-amber/30 focus:ring-offset-2 focus:ring-offset-bg-deep ${
          enabled ? 'bg-accent-amber' : 'bg-border-subtle'
        }`}
        style={
          enabled
            ? { boxShadow: '0 0 15px rgba(245, 158, 11, 0.4)' }
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
    </div>
  )
}
export default Toggle;