import { useTheme } from './hooks/useTheme'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import StatsBar from './components/StatsBar'
import Features from './components/Features'
import Screenshots from './components/Screenshots'
import MessagingSection from './components/MessagingSection'
import PremiumSection from './components/PremiumSection'
import SafetySection from './components/SafetySection'
import PrivacySection from './components/PrivacySection'
import DownloadSection from './components/DownloadSection'
import WaitlistSection from './components/WaitlistSection'
import LegalSection from './components/LegalSection'
import Footer from './components/Footer'

export default function App() {
  const { toggle, isDark } = useTheme()

  return (
    <div className={isDark ? 'dark' : ''}>
      <div className="min-h-screen bg-white dark:bg-[#050505] text-gray-900 dark:text-gray-100 transition-colors duration-300 overflow-x-hidden">
        <Navbar isDark={isDark} onToggle={toggle} />
        <Hero isDark={isDark} />
        <StatsBar />
        <Features />
        <Screenshots isDark={isDark} />
        <MessagingSection isDark={isDark} />
        <PremiumSection isDark={isDark} />
        <SafetySection />
        <PrivacySection isDark={isDark} />
        <DownloadSection />
        <WaitlistSection />
        <LegalSection />
        <Footer isDark={isDark} />
      </div>
    </div>
  )
}
