import { useEffect, useRef } from 'react'
import {
  img_explore, img_settings,
  img_explore_light, img_settings_light,
  img_speed_date_inbox,
} from '../assets/images'
import ScreenshotCarousel from './ScreenshotCarousel'

const GOOGLE_PLAY_URL = 'https://play.google.com/store/apps/details?id=com.phcreations.chat'
const APP_STORE_URL = 'https://apps.apple.com/us/app/ch-t/id6763358775'

interface HeroProps {
  isDark: boolean
}

export default function Hero({ isDark }: HeroProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const bgRef = useRef<HTMLDivElement>(null)
  const phonesRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    let mx = 0, my = 0
    let cx = 0, cy = 0
    let raf: number

    const onMove = (e: MouseEvent) => {
      mx = (e.clientX / window.innerWidth) * 2 - 1
      my = (e.clientY / window.innerHeight) * 2 - 1

      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect()
        sectionRef.current.style.setProperty('--sx', `${e.clientX - rect.left}px`)
        sectionRef.current.style.setProperty('--sy', `${e.clientY - rect.top}px`)
      }
    }

    const tick = () => {
      cx += (mx - cx) * 0.06
      cy += (my - cy) * 0.06
      if (bgRef.current) bgRef.current.style.transform = `translate(${-cx * 24}px, ${-cy * 16}px)`
      if (phonesRef.current) phonesRef.current.style.transform = `translate(${cx * 18}px, ${cy * 10}px)`
      raf = requestAnimationFrame(tick)
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    const timer = setTimeout(() => { raf = requestAnimationFrame(tick) }, 750)

    return () => {
      window.removeEventListener('mousemove', onMove)
      clearTimeout(timer)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative flex flex-col lg:grid lg:grid-cols-2 items-center gap-8 lg:gap-12 px-5 sm:px-8 lg:px-24 pt-20 sm:pt-24 lg:pt-28 pb-12 max-w-7xl mx-auto overflow-hidden"
    >
      <div className="spotlight-overlay absolute inset-0 pointer-events-none z-0" aria-hidden="true" />
      <div className="hero-grid absolute inset-0 pointer-events-none z-0 opacity-0 dark:opacity-100" aria-hidden="true" />

      <div ref={bgRef} className="absolute inset-0 overflow-hidden pointer-events-none z-0" aria-hidden="true">
        <div className="absolute top-0 right-0 w-72 sm:w-[400px] lg:w-[600px] h-72 sm:h-[400px] lg:h-[600px] bg-mint/10 rounded-full blur-[80px] lg:blur-[120px] -translate-y-1/3 translate-x-1/4" />
        <div className="absolute top-1/3 right-1/4 w-56 sm:w-72 lg:w-96 h-56 sm:h-72 lg:h-96 bg-mint/[0.06] rounded-full blur-[60px] lg:blur-[90px]" />
        <div className="absolute bottom-0 left-0 w-48 sm:w-64 lg:w-80 h-48 sm:h-64 lg:h-80 bg-mint/[0.05] rounded-full blur-[70px] translate-y-1/2 -translate-x-1/3" />
      </div>

      {/* ── Text ── */}
      <div className="relative z-10 animate-fade-up text-center lg:text-left order-2 lg:order-none w-full">
        <p className="text-mint font-dm font-medium text-sm sm:text-base mb-3 tracking-wide">
          Swipe less. Connect more
        </p>

        <h1 className="hidden lg:block font-syne font-extrabold text-[2.4rem] sm:text-5xl lg:text-6xl xl:text-7xl leading-[1.05] tracking-tight mb-5 lg:mb-8">
          Meet them<br />before<br />
          <span className="text-mint">the first message.</span>
        </h1>

        {/* Mobile: carousel first */}
        <div className="lg:hidden mt-4 mb-5 flex justify-center">
          <div className="w-56 sm:w-64">
            <ScreenshotCarousel />
          </div>
        </div>

        {/* Mobile: store badges below carousel */}
        <p className="lg:hidden text-center font-syne font-bold text-lg mb-3">
          Download the app
        </p>
        <div className="lg:hidden flex gap-3 justify-center mb-5">
          <a href={GOOGLE_PLAY_URL} target="_blank" rel="noopener noreferrer" className="hover:scale-105 active:scale-95 transition-transform duration-200" aria-label="Get it on Google Play">
            <svg viewBox="0 0 180 53" className="h-10 w-auto" role="img" aria-label="Google Play Store">
              <rect width="180" height="53" rx="6" fill="#000000" />
              <rect x="0.5" y="0.5" width="179" height="52" rx="5.5" stroke="#A6A6A6" strokeOpacity="0.5" fill="none" />
              <g transform="translate(12, 10)">
                <path d="M0 3.5L18 16.5L0 29.5V3.5Z" fill="url(#heroPlayGradient)" />
                <path d="M0 3.5L18 16.5L23 11.5L5 0L0 3.5Z" fill="#00F076" />
                <path d="M23 11.5L18 16.5L23 21.5L28 16.5L23 11.5Z" fill="#FFD400" />
                <path d="M0 29.5L18 16.5L23 21.5L5 33L0 29.5Z" fill="#F33E48" />
                <path d="M0 3.5L5 0L28 16.5L5 33L0 29.5V3.5Z" fill="url(#heroPlayOverlay)" fillOpacity="0.1" />
                <defs>
                  <linearGradient id="heroPlayGradient" x1="0" y1="16.5" x2="18" y2="16.5">
                    <stop stopColor="#00D4FF" />
                    <stop offset="1" stopColor="#00F076" />
                  </linearGradient>
                  <linearGradient id="heroPlayOverlay" x1="14" y1="0" x2="14" y2="33">
                    <stop stopColor="white" />
                    <stop offset="1" stopColor="white" stopOpacity="0" />
                  </linearGradient>
                </defs>
              </g>
              <text x="52" y="18" fill="#FFFFFF" fontSize="8" fontFamily="system-ui, -apple-system, sans-serif" letterSpacing="0.5">GET IT ON</text>
              <text x="52" y="36" fill="#FFFFFF" fontSize="16" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="500">Google Play</text>
            </svg>
          </a>
          <a href={APP_STORE_URL} target="_blank" rel="noopener noreferrer" className="hover:scale-105 active:scale-95 transition-transform duration-200" aria-label="Download on the App Store">
            <svg viewBox="0 0 180 53" className="h-10 w-auto" role="img" aria-label="Apple App Store">
              <rect width="180" height="53" rx="6" fill="#000000" />
              <rect x="0.5" y="0.5" width="179" height="52" rx="5.5" stroke="#A6A6A6" strokeOpacity="0.5" fill="none" />
              <g transform="translate(14, 10)">
                <path d="M15.5 8.5C14.2 8.5 12.7 9.3 11.8 10.4C11 11.4 10.3 12.9 10.5 14.4C11.9 14.5 13.4 13.6 14.2 12.5C15 11.5 15.6 10 15.5 8.5ZM18.7 14.7C16.6 14.6 14.8 15.9 13.8 15.9C12.8 15.9 11.2 14.8 9.5 14.8C6.9 14.9 4.5 16.1 3.2 18.2C0.5 22.4 2.5 28.7 5.1 32C6.4 33.7 7.9 35.5 9.8 35.5C11.6 35.4 12.3 34.3 14.4 34.3C16.5 34.3 17.1 35.5 19 35.4C21 35.4 22.3 33.7 23.6 32C25.1 30.1 25.7 28.2 25.7 28.1C25.7 28 22.4 26.8 22.4 23C22.4 19.7 25 18.2 25.1 18.1C23.4 15.6 20.8 14.8 18.7 14.7Z" fill="#FFFFFF" />
              </g>
              <text x="48" y="18" fill="#FFFFFF" fontSize="8" fontFamily="system-ui, -apple-system, sans-serif" letterSpacing="0.3">Download on the</text>
              <text x="48" y="36" fill="#FFFFFF" fontSize="16" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="500">App Store</text>
            </svg>
          </a>
        </div>

        <div className="hidden lg:flex justify-start">
          <a
            href="#download"
            className="w-full sm:w-auto text-center px-8 py-4 rounded-full bg-mint text-gray-900 font-syne font-bold text-base active:scale-95 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-mint/30 transition-all duration-200"
          >
            Download
          </a>
        </div>
      </div>

      {/* ── Phones: desktop only, parallax foreground layer ── */}
      <div
        ref={phonesRef}
        className="hidden lg:flex relative justify-center items-end h-[580px] animate-fade-up-1 z-10"
        style={{ perspective: '500px', perspectiveOrigin: '50% 70%' }}
      >
        <div
          className="absolute bottom-0 right-0 z-10"
          style={{ transform: 'translateX(-92px) translateY(46px) scale(0.75) rotateY(-30deg) rotateX(-14deg)', opacity: 0.45 }}
        >
          <div className={`animate-float-slower w-52 rounded-[38px] overflow-hidden border-2 ${isDark ? 'border-white/10 phone-shadow' : 'border-black/10 phone-shadow-light'}`}>
            <img src={isDark ? img_settings : img_settings_light} alt="Browse — filters and safety" className="w-full block" loading="lazy" />
          </div>
        </div>

        <div
          className="absolute bottom-0 right-0 z-20"
          style={{ transform: 'translateX(-46px) translateY(24px) scale(0.875) rotateY(-15deg) rotateX(-8deg)', opacity: 0.78 }}
        >
          <div className={`animate-float-slow w-52 rounded-[38px] overflow-hidden border-2 ${isDark ? 'border-white/10 phone-shadow' : 'border-black/10 phone-shadow-light'}`}>
            <img src={isDark ? img_explore : img_explore_light} alt="Browse — Speed Date questions on the card" className="w-full block" loading="lazy" />
          </div>
        </div>

        <div
          className="absolute bottom-0 right-0 z-30"
          style={{ transform: 'rotateY(8deg) rotateX(-4deg)' }}
        >
          <div className={`animate-float w-52 rounded-[38px] overflow-hidden border-2 ${isDark ? 'border-white/10 phone-shadow' : 'border-black/10 phone-shadow-light'}`}>
            <img src={img_speed_date_inbox} alt="Dates — replies you've received" className="w-full block" loading="eager" />
          </div>
        </div>
      </div>

    </section>
  )
}
