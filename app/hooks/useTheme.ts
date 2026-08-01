import { useState, useEffect, useCallback } from 'react'

type Theme = 'dark' | 'light'

/**
 * SSR-safe theme. Initial render is deterministically 'light' on both server and
 * the client's first paint (so hydration never mismatches) — a first-time
 * visitor lands in light mode. The inline script in root.tsx already applied
 * the saved theme class before paint; after mount we sync React state and keep
 * <html> in sync, so anyone who previously chose dark keeps it.
 */
export function useTheme() {
  const [theme, setTheme] = useState<Theme>('light')

  useEffect(() => {
    try {
      const saved = localStorage.getItem('chat-theme') as Theme | null
      if (saved === 'light' || saved === 'dark') setTheme(saved)
    } catch {
      /* localStorage unavailable */
    }
  }, [])

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
