import { useState, useEffect, useCallback, useRef } from 'react'

type Theme = 'dark' | 'light'

/** Where an explicit tap on the footer toggle is remembered. A new key on
 *  purpose: the old 'chat-theme' was written on every visit whether or not the
 *  visitor chose anything, so it can't tell a real choice from a default. */
export const THEME_CHOICE_KEY = 'chat-theme-choice'

/**
 * Dark for everyone, until they pick light with the footer toggle.
 *
 * The owner's call: the site looks its best dark — the opening photo is a
 * night shot — so first-time visitors get dark whatever their phone is set
 * to. Only a tap on the toggle is remembered, and that choice wins from then on.
 *
 * The inline boot script in root.tsx paints the right class on <html> before
 * first paint. React starts from a deterministic 'light' (so server and client
 * render identically) and adopts the painted class after mount.
 */
export function useTheme() {
  const [theme, setTheme] = useState<Theme>('light')
  // The boot script already set <html> correctly; the first sync must not
  // overwrite it with the placeholder 'light' (that was a light-mode flash).
  const adopted = useRef(false)

  useEffect(() => {
    setTheme(document.documentElement.classList.contains('dark') ? 'dark' : 'light')
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
