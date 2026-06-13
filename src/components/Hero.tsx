import { useEffect, useRef } from 'react'
import {
  icon_dark, icon_light,
  img_explore, img_settings,
  img_explore_light, img_settings_light,
  img_speed_date_inbox,
} from '../assets/images'
import ScreenshotCarousel from './ScreenshotCarousel'

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

      // Spotlight: instant, relative to section
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect()
        sectionRef.current.style.setProperty('--sx', `${e.clientX - rect.left}px`)
        sectionRef.current.style.setProperty('--sy', `${e.clientY - rect.top}px`)
      }
    }

    const tick = () => {
      cx += (mx - cx) * 0.06
      cy += (my - cy) * 0.06

      if (bgRef.current) {
        bgRef.current.style.transform = `translate(${-cx * 24}px, ${-cy * 16}px)`
      }
      if (phonesRef.current) {
        phonesRef.current.style.transform = `translate(${cx * 18}px, ${cy * 10}px)`
      }
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
      className="relative flex flex-col lg:grid lg:grid-cols-2 items-center gap-8 lg:gap-12 px-5 sm:px-8 lg:px-24 pt-24 sm:pt-28 pb-12 max-w-7xl mx-auto overflow-hidden"
    >
      {/* Spotlight — cursor-following radial glow */}
      <div className="spotlight-overlay absolute inset-0 pointer-events-none z-0" aria-hidden="true" />

      {/* Dot grid — dark mode only, fades toward edges */}
      <div className="hero-grid absolute inset-0 pointer-events-none z-0 opacity-0 dark:opacity-100" aria-hidden="true" />

      {/* Background glow orbs — parallax layer (drifts away from cursor) */}
      <div ref={bgRef} className="absolute inset-0 overflow-hidden pointer-events-none z-0" aria-hidden="true">
        <div className="absolute top-0 right-0 w-72 sm:w-[400px] lg:w-[600px] h-72 sm:h-[400px] lg:h-[600px] bg-mint/10 rounded-full blur-[80px] lg:blur-[120px] -translate-y-1/3 translate-x-1/4" />
        <div className="absolute top-1/3 right-1/4 w-56 sm:w-72 lg:w-96 h-56 sm:h-72 lg:h-96 bg-mint/[0.06] rounded-full blur-[60px] lg:blur-[90px]" />
        <div className="absolute bottom-0 left-0 w-48 sm:w-64 lg:w-80 h-48 sm:h-64 lg:h-80 bg-mint/[0.05] rounded-full blur-[70px] translate-y-1/2 -translate-x-1/3" />
      </div>

      {/* ── Text ── */}
      <div className="relative z-10 animate-fade-up text-center lg:text-left order-2 lg:order-none w-full">
        <div className="flex justify-center lg:justify-start mb-5">
          <img
            src={isDark ? icon_dark : icon_light}
            alt="Chat app"
            className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl object-contain shadow-xl"
          />
        </div>

        <p className="text-mint font-dm font-medium text-sm sm:text-base mb-3 tracking-wide">
          The opener that actually works
        </p>

        <div className="mx-auto mb-6 lg:mb-8 w-full max-w-sm">
          <ScreenshotCarousel />
        </div>

        <h1 className="font-syne font-extrabold text-[2.5rem] sm:text-5xl lg:text-6xl xl:text-7xl leading-[1.05] tracking-tight mb-5">
          Meet them<br />
          before<br />
          <span className="text-mint">the first message.</span>
        </h1>

        <p className="text-gray-500 dark:text-gray-400 text-base sm:text-lg leading-relaxed max-w-md mx-auto lg:mx-0 mb-4">
          Most matches end before they start. The opener goes nowhere. The conversation fades. Not because you weren't right for each other — because there was nothing real to begin with.
        </p>
        <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base leading-relaxed max-w-md mx-auto lg:mx-0 mb-6">
          Ch@t starts differently. You write three questions — your words, not a shared script. People answer them in writing before you ever connect. By the time you're talking, you already know something true about them.
        </p>
        <p className="text-mint/90 text-sm font-medium max-w-md mx-auto lg:mx-0 mb-8">
          Right now, someone nearby is answering. What would you ask?
        </p>

        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start">
          <a
            href="#download"
            className="hidden lg:inline-block w-full sm:w-auto text-center px-8 py-4 rounded-full bg-mint text-gray-900 font-syne font-bold text-base active:scale-95 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-mint/30 transition-all duration-200"
          >
            Download
          </a>
          <a
            href="#features"
            className="w-full sm:w-auto text-center px-8 py-4 rounded-full border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-dm text-base active:scale-95 hover:border-mint hover:text-mint transition-all duration-200"
          >
            How it works
          </a>
        </div>
      </div>

      {/* ── Phones: parallax layer (drifts toward cursor) ── */}
      <div
        ref={phonesRef}
        className="hidden lg:flex relative justify-center items-end h-[560px] animate-fade-up-1 z-10"
        style={{ perspective: '500px', perspectiveOrigin: '50% 70%' }}
      >
        {/* Back phone — most rotated, tilted furthest back */}
        <div
          className="absolute bottom-0 right-0 z-10"
          style={{
            transform: 'translateX(-92px) translateY(46px) scale(0.75) rotateY(-30deg) rotateX(-14deg)',
            opacity: 0.45,
          }}
        >
          <div className={`animate-float-slower w-52 rounded-[38px] overflow-hidden border-2 ${isDark ? 'border-white/10 phone-shadow' : 'border-black/10 phone-shadow-light'}`}>
            <img src={isDark ? img_settings : img_settings_light} alt="Browse — filters and safety" className="w-full block" loading="lazy" />
          </div>
        </div>

        {/* Middle phone — moderate tilt */}
        <div
          className="absolute bottom-0 right-0 z-20"
          style={{
            transform: 'translateX(-46px) translateY(24px) scale(0.875) rotateY(-15deg) rotateX(-8deg)',
            opacity: 0.78,
          }}
        >
          <div className={`animate-float-slow w-52 rounded-[38px] overflow-hidden border-2 ${isDark ? 'border-white/10 phone-shadow' : 'border-black/10 phone-shadow-light'}`}>
            <img src={isDark ? img_explore : img_explore_light} alt="Browse — Speed Date questions on the card" className="w-full block" loading="lazy" />
          </div>
        </div>

        {/* Front phone — slight tilt toward viewer */}
        <div
          className="absolute bottom-0 right-0 z-30"
          style={{
            transform: 'rotateY(8deg) rotateX(-4deg)',
          }}
        >
          <div className={`animate-float w-52 rounded-[38px] overflow-hidden border-2 ${isDark ? 'border-white/10 phone-shadow' : 'border-black/10 phone-shadow-light'}`}>
            <img src={img_speed_date_inbox} alt="Dates — replies you've received" className="w-full block" loading="eager" />
          </div>
        </div>
      </div>

    </section>
  )
}
