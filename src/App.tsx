import { useTheme } from './hooks/useTheme'
import HomePage from './pages/HomePage'

export default function App() {
  const { toggle, isDark } = useTheme()

  // Dark mode is driven by the class on <html> (set pre-paint by the inline
  // script in index.html and kept in sync by useTheme), so we don't add a
  // theme-dependent wrapper here — that keeps the pre-rendered markup and the
  // client's first render identical.
  return <HomePage isDark={isDark} onToggleTheme={toggle} />
}
