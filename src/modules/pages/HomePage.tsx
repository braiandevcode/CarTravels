import { useState } from 'react'
import { CalculatorProvider } from '../../core/context/CalculatorContext'
import LandingPage from './LandingPage'
import WizardPage from '../calculator/pages/WizardPage'

const HomePage = () => {
  const [mode, setMode] = useState<'landing' | 'wizard'>('landing')

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
