import { useEffect, useRef, useState } from 'react'
import {
  img_explore, img_settings,
  img_explore_light, img_settings_light,
  img_speed_date_inbox,
} from '../assets/images'
import ScreenshotCarousel from './ScreenshotCarousel'
import { usePlatform } from '../hooks/usePlatform'

const GOOGLE_PLAY_URL = 'https://play.google.com/store/apps/details?id=com.phcreations.chat'
const APP_STORE_URL = 'https://apps.apple.com/us/app/ch-t/id6763358775'

interface HeroProps {
  isDark: boolean
}

export default function Hero({ isDark }: HeroProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const bgRef = useRef<HTMLDivElement>(null)
  const phonesRef = useRef<HTMLDivElement>(null)
  const platform = usePlatform()
  const downloadUrl = platform === 'ios' ? APP_STORE_URL : GOOGLE_PLAY_URL

  const line1 = "Your future gf/bf has already installed the app."
  const line2 = "Don't leave them hanging."
  const fullText = line1 + line2
  const [charCount, setCharCount] = useState(0)

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>
    const type = (count: number) => {
      setCharCount(count)
      if (count < fullText.length) {
        timer = setTimeout(() => type(count + 1), 42)
      }
    }
    const delay = setTimeout(() => type(0), 800)
    return () => { clearTimeout(delay); clearTimeout(timer) }
  }, [])

  const segments = [
    { text: "Your ", cls: "font-dm text-gray-500 dark:text-white/50", link: false },
    { text: "future gf/bf ", cls: "font-syne italic font-semibold text-gray-900 dark:text-white", link: false },
    { text: "has already ", cls: "font-dm text-gray-500 dark:text-white/50", link: false },
    { text: "installed", cls: "font-dm text-gray-500 dark:text-white/50 underline decoration-dotted underline-offset-2 hover:text-mint transition-colors duration-200 cursor-pointer", link: true },
    { text: " the app.", cls: "font-dm text-gray-500 dark:text-white/50", link: false },
  ]
  let rem = charCount
  const typed1 = segments.map(s => {
    const vis = s.text.slice(0, Math.max(0, rem))
    rem = Math.max(0, rem - s.text.length)
    return { ...s, vis }
  })
  const typed2 = charCount > line1.length ? line2.slice(0, charCount - line1.length) : ''
  const isDone = charCount >= fullText.length

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
        <div className="mb-3">
          <p className="text-xl sm:text-2xl min-h-[1.75rem]">
            {typed1.map((s, i) => s.link ? (
              <a key={i} href={downloadUrl} target="_blank" rel="noopener noreferrer" className={s.cls}>{s.vis}</a>
            ) : (
              <span key={i} className={s.cls}>{s.vis}</span>
            ))}
            {charCount <= line1.length && <span className="animate-cursor-blink select-none font-light font-dm text-gray-400 dark:text-white/40">|</span>}
          </p>
          {charCount > line1.length && (
            <p className="font-dm text-xs sm:text-sm text-gray-400 dark:text-white/30 tracking-widest uppercase mt-1">
              {typed2}{!isDone && <span className="animate-cursor-blink select-none font-light">|</span>}
            </p>
          )}
        </div>

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
