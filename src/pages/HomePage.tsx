import { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import StatsBar from '../components/StatsBar'
import HowItWorks from '../components/HowItWorks'
import FeatureTabs from '../components/FeatureTabs'
import PrivacyDemo from '../components/PrivacyDemo'
import SafetySection from '../components/SafetySection'
import Screenshots from '../components/Screenshots'
import PremiumSection from '../components/PremiumSection'
import FAQ from '../components/FAQ'
import DownloadSection from '../components/DownloadSection'
import LegalSection from '../components/LegalSection'
import Footer from '../components/Footer'

interface HomePageProps {
  isDark: boolean
  onToggleTheme: () => void
}

export default function HomePage({ isDark, onToggleTheme }: HomePageProps) {
  const [badgesVisible, setBadgesVisible] = useState(true)

  useEffect(() => {
    const el = document.getElementById('store-badges')
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => setBadgesVisible(entry.isIntersecting),
      { threshold: 0.1 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div className="grain min-h-screen bg-white dark:bg-[#050505] text-gray-900 dark:text-gray-100 transition-colors duration-300 overflow-x-hidden">
      <Navbar isDark={isDark} onToggle={onToggleTheme} badgesVisible={badgesVisible} />
      <Hero />
      <StatsBar />
      <HowItWorks isDark={isDark} />
      <FeatureTabs isDark={isDark} />
      <PrivacyDemo isDark={isDark} />
      <SafetySection />
      <Screenshots isDark={isDark} />
      <PremiumSection isDark={isDark} />
      <FAQ />
      <DownloadSection />
      <LegalSection />
      <Footer isDark={isDark} />
    </div>
  )
}
