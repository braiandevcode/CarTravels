import { Car } from 'lucide-react';
import type { ReactNode } from 'react';
import LoadingDots from '../styles/LoadingDots';

const LoadingScreen = (): ReactNode => {
  return (
    <div className="min-h-dvh bg-bg-deep flex flex-col items-center justify-center">
      <div className="flex flex-col items-center gap-4 animate-fade-in">
        <div className="relative">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-accent-amber/15 motion-safe:animate-pulse-glow">
            <Car className="h-8 w-8 text-accent-amber" />
          </div>
          <div className="absolute -inset-2 rounded-3xl bg-accent-amber/5 blur-md animate-pulse" />
        </div>

        <div className="flex flex-col items-center gap-1 mt-2">
          <h1 className="text-2xl font-black text-text-primary font-display tracking-tight">
            CarTravels
          </h1>
          <p className="text-sm text-text-muted font-display">
            Calculadora de jornada
          </p>
        </div>

        <div className="flex items-center gap-2 mt-4">
          <LoadingDots />
        </div>
      </div>
    </div>
  )
}

export default LoadingScreen;