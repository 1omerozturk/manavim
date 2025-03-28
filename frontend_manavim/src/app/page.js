'use client'

import BannerSlider from './components/BannerSlider'
import FeaturedCategories from './components/FeaturedCategories'
import PromotionSection from './components/PromotionSection'
import ProductHighlights from './components/ProductHighlights'
import { ThemeProvider } from './context/ThemeContext'
import BottomMenu from './components/BottomMenu'
import Footer from './components/Footer'
import HealthyFoodShowcase from './components/HealthyFoodShowcase'
import { Providers } from './providers'

export default function Home() {
  return (
   <Providers>

      <div className="relative min-h-screen mx-auto bg-darksmooth">
        <main>
          <BannerSlider />
          <FeaturedCategories />
          <PromotionSection />
          <ProductHighlights />
          <HealthyFoodShowcase />
        </main>
        <footer>
          <Footer />
        </footer>
        <BottomMenu />
      </div>
   </Providers>
  )
}
