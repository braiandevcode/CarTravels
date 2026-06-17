import type { ReactNode } from 'react'

type TIconButtonSize = 'sm' | 'md'

interface IIconButtonProps {
  onClick: () => void
  ariaLabel: string
  children: ReactNode
  size?: TIconButtonSize
  autoFocus?: boolean
  className?: string
}

const SIZE_CLASSES: Record<TIconButtonSize, string> = {
  sm: 'p-1.5',
  md: 'p-2',
}

const IconButton = ({ onClick, ariaLabel, children, size = 'sm', autoFocus = false, className = '' }: IIconButtonProps): ReactNode => (
  <button
    type="button"
    onClick={onClick}
    autoFocus={autoFocus}
    className={`rounded-full ${SIZE_CLASSES[size]} text-text-secondary hover:bg-bg-hover hover:text-text-primary transition-colors cursor-pointer ${className}`}
    aria-label={ariaLabel}
  >
    {children}
  </button>
)

export default IconButton
