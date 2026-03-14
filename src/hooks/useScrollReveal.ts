import { useEffect, useRef } from 'react'

export function useScrollReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // If element is already in the viewport on mount (e.g. above the fold), reveal immediately
    const rect = el.getBoundingClientRect()
    if (rect.top < window.innerHeight) {
      el.classList.add('opacity-100', 'translate-y-0')
      el.classList.remove('opacity-0', 'translate-y-8')
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('opacity-100', 'translate-y-0')
          el.classList.remove('opacity-0', 'translate-y-8')
          observer.disconnect()
        }
      },
      {
        threshold: 0.08,          // lower threshold — works better on mobile tall sections
        rootMargin: '0px 0px -40px 0px',  // trigger slightly before element enters viewport
      }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return ref
}
