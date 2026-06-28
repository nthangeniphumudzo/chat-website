import { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import ConversionHero from '../components/ConversionHero'
import StatsBar from '../components/StatsBar'
import NarrativeSection from '../components/NarrativeSection'
import TrustRow from '../components/TrustRow'
import Features from '../components/Features'
import Screenshots from '../components/Screenshots'
import MessagingSection from '../components/MessagingSection'
import PremiumSection from '../components/PremiumSection'
import SafetySection from '../components/SafetySection'
import PrivacySection from '../components/PrivacySection'
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
      <ConversionHero />
      <NarrativeSection isDark={isDark} />
      <StatsBar />
      <Features />
      <Screenshots isDark={isDark} />
      <MessagingSection isDark={isDark} />
      <SafetySection />
      <PrivacySection isDark={isDark} />
      <PremiumSection isDark={isDark} />
      <TrustRow />
      <DownloadSection />
      <LegalSection />
      <Footer isDark={isDark} />
      {/* <FloatingDownloadBar /> */}
    </div>
  )
}
