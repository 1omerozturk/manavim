import Image from 'next/image'
import BannerSlider from './components/BannerSlider'
import DarkModeToggler from './components/DarkModeToggler'
import Navbar from './components/Navbar'
import { ThemeProvider } from './context/ThemeContext'

export default function Home() {
  return (
    <ThemeProvider>
      <div className="relative min-h-screen mx-auto bg-darksmooth">
        <Navbar />
        <BannerSlider />
        <div className='h-screen'>

        </div>
      </div>
    </ThemeProvider>
  )
}
