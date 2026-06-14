import { useState, type ReactNode } from 'react'
import { CalculatorProvider } from '../../core/context/CalculatorContext'
import LandingPage from './LandingPage'
import WizardPage from '../calculator/pages/WizardPage'

type TMode = 'landing' | 'wizard';

const HomePage = ():ReactNode => {
  const [mode, setMode] = useState<TMode>('landing')

  if (mode === 'landing') {
    return <LandingPage onStart={() => setMode('wizard')} />
  }

  return (
    <CalculatorProvider>
      <WizardPage onBackToLanding={() => setMode('landing')} />
    </CalculatorProvider>
  )
}

export default HomePage
