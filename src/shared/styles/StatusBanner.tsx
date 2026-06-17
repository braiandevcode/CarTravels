import type { ReactNode } from 'react'

type TStatusBannerVariant = 'error' | 'warning' | 'info' | 'success'

interface IStatusBannerProps {
  variant: TStatusBannerVariant
  icon?: ReactNode
  children: ReactNode
  className?: string
}

const VARIANT_CLASSES: Record<TStatusBannerVariant, string> = {
  error: 'bg-accent-red/10 border-accent-red/20',
  warning: 'bg-accent-amber/10 border-accent-amber/20',
  info: 'bg-accent-violet/10 border-accent-violet/20',
  success: 'bg-accent-teal/10 border-accent-teal/20',
}

const ICON_CLASSES: Record<TStatusBannerVariant, string> = {
  error: 'text-accent-red',
  warning: 'text-accent-amber',
  info: 'text-accent-violet',
  success: 'text-accent-teal',
}

const StatusBanner = ({ variant, icon, children, className = '' }: IStatusBannerProps): ReactNode => (
  <div className={`p-2.5 rounded-xl border flex items-start gap-2 ${VARIANT_CLASSES[variant]} ${className}`}>
    {icon && (
      <div className={`h-4 w-4 flex-shrink-0 mt-0.5 ${ICON_CLASSES[variant]}`}>
        {icon}
      </div>
    )}
    <span className="text-xs text-text-secondary">{children}</span>
  </div>
)

export default StatusBanner
