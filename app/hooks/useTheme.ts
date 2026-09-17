import { useState, useEffect, useCallback, useRef } from 'react'

type Theme = 'dark' | 'light'

/** Where an explicit tap on the footer toggle is remembered. A new key on
 *  purpose: the old 'chat-theme' was written on every visit whether or not the
 *  visitor chose anything, so it can't tell a real choice from a default. */
export const THEME_CHOICE_KEY = 'chat-theme-choice'

/**
 * Light or dark, following the visitor's phone unless they've picked one here.
 *
 * Apple's guidance is not to override the system appearance — people "may think
 * your app is broken because it doesn't respond to their systemwide appearance
 * choice" (HIG, Dark Mode). So the phone's setting is the default, the footer
 * toggle stays as an optional override, and only a tap on it is remembered.
 *
 * The inline boot script in root.tsx paints the right class on <html> before
 * first paint. React starts from a deterministic 'light' (so server and client
 * render identically), adopts the painted class after mount, and follows the
 * phone live — e.g. when it switches to dark at sunset — until the visitor
 * makes a choice of their own.
 */
export function useTheme() {
  const [theme, setTheme] = useState<Theme>('light')
  // The boot script already set <html> correctly; the first sync must not
  // overwrite it with the placeholder 'light' (that was a light-mode flash).
  const adopted = useRef(false)

  useEffect(() => {
    setTheme(document.documentElement.classList.contains('dark') ? 'dark' : 'light')

    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    const followPhone = (e: MediaQueryListEvent) => {
      let choice: string | null = null
      try {
        choice = localStorage.getItem(THEME_CHOICE_KEY)
      } catch {
        /* storage unavailable: nothing chosen */
      }
      if (choice !== 'dark' && choice !== 'light') setTheme(e.matches ? 'dark' : 'light')
    }
    mq.addEventListener('change', followPhone)
    return () => mq.removeEventListener('change', followPhone)
  }, [])

  useEffect(() => {
    if (!adopted.current) {
      adopted.current = true
      return
    }
    const root = document.documentElement
    root.classList.toggle('dark', theme === 'dark')
    root.classList.toggle('light', theme === 'light')
  }, [theme])

  const toggle = useCallback(() => {
    setTheme(prev => {
      const next = prev === 'dark' ? 'light' : 'dark'
      try {
        localStorage.setItem(THEME_CHOICE_KEY, next)
      } catch {
        /* ignore */
      }
      return next
    })
  }, [])

  return { theme, toggle, isDark: theme === 'dark' }
}
