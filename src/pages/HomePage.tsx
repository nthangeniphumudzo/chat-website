import { lazy, Suspense, useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'

// Below-the-fold panels load as a separate chunk so the hero renders sooner
const StoryPanels = lazy(() => import('../components/StoryPanels'))
const PrivacyDemo = lazy(() => import('../components/PrivacyDemo'))
const AppPreview = lazy(() => import('../components/AppPreview'))
const FAQ = lazy(() => import('../components/FAQ'))
const DownloadSection = lazy(() => import('../components/DownloadSection'))
const LegalSection = lazy(() => import('../components/LegalSection'))
const Footer = lazy(() => import('../components/Footer'))

interface HomePageProps {
  isDark: boolean
  onToggleTheme: () => void
}

export default function HomePage({ isDark, onToggleTheme }: HomePageProps) {
  // The pre-rendered HTML contains only the hero. We render the below-the-fold
  // sections (and their Suspense boundary) ONLY after mount, so the server
  // markup and the client's first render are byte-identical — no Suspense
  // hydration mismatch (which Safari punishes hardest).
  const [showBelowFold, setShowBelowFold] = useState(false)
  useEffect(() => setShowBelowFold(true), [])

  return (
    <div className="grain min-h-screen bg-white dark:bg-[#050505] text-gray-900 dark:text-gray-100 transition-colors duration-300 overflow-x-hidden">
      <Navbar isDark={isDark} />
      <Hero />
      {showBelowFold && (
        <Suspense fallback={null}>
          <StoryPanels isDark={isDark} />
          <PrivacyDemo isDark={isDark} />
          <AppPreview isDark={isDark} />
          <FAQ />
          <DownloadSection />
          <LegalSection />
          <Footer isDark={isDark} onToggleTheme={onToggleTheme} />
        </Suspense>
      )}
    </div>
  )
}
