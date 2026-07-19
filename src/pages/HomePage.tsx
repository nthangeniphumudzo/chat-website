import { lazy, Suspense } from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import StatsBar from '../components/StatsBar'
import HowItWorks from '../components/HowItWorks'
import StickyDownloadBar from '../components/StickyDownloadBar'

// Below-the-fold sections load as a separate chunk so the hero renders sooner
const FeatureTabs = lazy(() => import('../components/FeatureTabs'))
const PrivacyDemo = lazy(() => import('../components/PrivacyDemo'))
const SafetySection = lazy(() => import('../components/SafetySection'))
const Screenshots = lazy(() => import('../components/Screenshots'))
const PremiumSection = lazy(() => import('../components/PremiumSection'))
const FAQ = lazy(() => import('../components/FAQ'))
const DownloadSection = lazy(() => import('../components/DownloadSection'))
const LegalSection = lazy(() => import('../components/LegalSection'))
const Footer = lazy(() => import('../components/Footer'))

interface HomePageProps {
  isDark: boolean
  onToggleTheme: () => void
}

export default function HomePage({ isDark, onToggleTheme }: HomePageProps) {
  return (
    <div className="grain min-h-screen bg-white dark:bg-[#050505] text-gray-900 dark:text-gray-100 transition-colors duration-300 overflow-x-hidden">
      <Navbar isDark={isDark} onToggle={onToggleTheme} />
      <Hero />
      <StatsBar />
      <HowItWorks isDark={isDark} />
      <Suspense fallback={null}>
        <FeatureTabs isDark={isDark} />
        <PrivacyDemo isDark={isDark} />
        <SafetySection />
        <Screenshots isDark={isDark} />
        <PremiumSection isDark={isDark} />
        <FAQ />
        <DownloadSection />
        <LegalSection />
        <Footer isDark={isDark} />
      </Suspense>
      <StickyDownloadBar />
    </div>
  )
}
