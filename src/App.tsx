import { useTheme } from './hooks/useTheme'
import HomePage from './pages/HomePage'

export default function App() {
  const { toggle, isDark } = useTheme()

  return (
    <div className={isDark ? 'dark' : ''}>
      <HomePage isDark={isDark} onToggleTheme={toggle} />
    </div>
  )
}
