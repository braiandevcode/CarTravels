import { useState, useEffect } from 'react'
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom'
import { CalculatorProvider } from './core/context/CalculatorContext'
import LoadingScreen from './shared/components/LoadingScreen'
import Layout from './modules/layout/Layout'
import { FAQPage } from './modules/pages/FAQPage'
import { AboutPage } from './modules/pages/AboutPage'
import { TermsPage } from './modules/pages/TermsPage'
import { PrivacyPage } from './modules/pages/PrivacyPage'
import CalculatorContent from './modules/calculator/CalculationContent'

const HomePage = () => {
  return (
    <CalculatorProvider>
      <CalculatorContent />
    </CalculatorProvider>
  )
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'faq', element: <FAQPage /> },
      { path: 'about', element: <AboutPage /> },
      { path: 'terms', element: <TermsPage /> },
      { path: 'privacy', element: <PrivacyPage /> },
      { path: '*', element: <Navigate to="/" replace /> },
    ],
  },
])

function App() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer: number = setTimeout(() => {
      setIsLoading(false)
    }, 800)

    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return <LoadingScreen />
  }

  return <RouterProvider router={router} />
}

export default App
