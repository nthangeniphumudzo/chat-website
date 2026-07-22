import { useState, useEffect, useCallback } from 'react'

type Theme = 'dark' | 'light'

/**
 * SSR-safe theme. The initial render is deterministically 'dark' on both the
 * server (pre-render) and the client's first paint, so hydration never
 * mismatches. After mount we read the saved preference and apply the class to
 * <html> (the inline script in index.html already set it before paint, so
 * dark-default visitors see no flash).
 */
export function useTheme() {
  const [theme, setTheme] = useState<Theme>('dark')

  // Pull the saved preference in after hydration.
  useEffect(() => {
    try {
      const saved = localStorage.getItem('chat-theme') as Theme | null
      if (saved === 'light' || saved === 'dark') setTheme(saved)
    } catch {
      /* localStorage unavailable — keep default */
    }
  }, [])

  // Apply + persist whenever it changes.
  useEffect(() => {
    const root = document.documentElement
    root.classList.toggle('dark', theme === 'dark')
    root.classList.toggle('light', theme === 'light')
    try {
      localStorage.setItem('chat-theme', theme)
    } catch {
      /* ignore */
    }
  }, [theme])

  const toggle = useCallback(() => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'))
  }, [])

  return { theme, toggle, isDark: theme === 'dark' }
}
