import { Outlet } from 'react-router-dom'
import { ThemeProvider } from '../../core/context/ThemeContext'
import Header from './Header'
import Footer from './Footer'

const Layout = () => {
  return (
    <ThemeProvider>
      <div className="min-h-screen flex flex-col bg-bg-deep">
        <Header />
        <main className="flex-1">
          <Outlet />
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  )
}
export default Layout;