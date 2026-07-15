import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { cn } from '../../shared/lib/utils'

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger'
  fullWidth?: boolean
}

const variants = {
  primary: 'btn-primary-glow text-slate-900 font-bold shadow-sm',
  secondary: 'bg-bg-card border border-border-subtle text-text-primary hover:bg-bg-hover hover:border-border-emphasis shadow-sm',
  ghost: 'bg-transparent text-text-secondary border border-border-subtle hover:bg-bg-card hover:text-text-primary hover:border-border-emphasis',
  danger: 'bg-accent-red/10 text-accent-red border border-accent-red/30 hover:bg-accent-red/20 hover:border-accent-red/50',
} as const

const Button = ({variant = 'primary', fullWidth = true, className, children, ...props}: IButtonProps): ReactNode => {
  const base = 'rounded-xl font-semibold transition-all duration-200 active:scale-[0.98] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed font-display tracking-wide'

  return (
    <button className={cn(base, variants[variant], fullWidth && 'w-full', !fullWidth && 'w-auto', 'px-6 py-3.5 md:py-3 text-base', className)}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button;