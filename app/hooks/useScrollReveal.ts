import { useEffect, useRef } from 'react'

/**
 * Reveals an element once it scrolls into view.
 *
 * Pair with the `reveal` class. The hidden state lives in CSS and only applies
 * while <html> has .js-reveal (see the inline boot script in root.tsx), so a
 * slow or failed bundle never leaves the page blank — this hook only ever makes
 * things visible sooner and more prettily, never later.
 */
export function useScrollReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const show = () => el.classList.add('is-visible')

    // Already in the viewport on mount (e.g. above the fold) — reveal now.
    if (el.getBoundingClientRect().top < window.innerHeight) {
      show()
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          show()
          observer.disconnect()
        }
      },
      {
        threshold: 0.08,                  // low — tall mobile sections rarely cross a high one
        rootMargin: '0px 0px -40px 0px',  // trigger just before the element enters
      }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return ref
}
