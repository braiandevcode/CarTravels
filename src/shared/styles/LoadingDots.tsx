import type { ReactNode } from 'react'

interface ILoadingDotsProps {
  count?: number
  color?: string
  size?: string
  className?: string
}

const LoadingDots = ({ count = 3, color = 'bg-accent-amber', size = 'w-2 h-2', className = '' }: ILoadingDotsProps): ReactNode => (
  <div className={`flex gap-1 ${className}`}>
    {Array.from({ length: count }, (_, i) => (
      <div
        key={i}
        className={`${size} rounded-full ${color} animate-bounce`}
        style={{ animationDelay: `${i * 150}ms` }}
      />
    ))}
  </div>
)

export default LoadingDots
