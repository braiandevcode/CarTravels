import { useCallback, useState, type ReactNode } from 'react'
import { CalculatorProvider } from '../../core/context/CalculatorContext'
import LandingPage from './LandingPage'
import WizardPage from '../calculator/pages/WizardPage'

type TMode = 'landing' | 'wizard';

const HomePage = ():ReactNode => {
  const [mode, setMode] = useState<TMode>('landing')

  const handleStart = useCallback((): void => {
    setMode('wizard')
  }, [])

  const handleBackToLanding = useCallback((): void => {
    setMode('landing')
  }, [])

  if (mode === 'landing') {
    return <LandingPage onStart={handleStart} />
  }

  return (
    <CalculatorProvider>
      <WizardPage onBackToLanding={handleBackToLanding} />
    </CalculatorProvider>
  )
}

export default HomePage
