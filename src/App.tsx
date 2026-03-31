import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useTheme } from './hooks/useTheme'
import HomePage from './pages/HomePage'
import AccountDeletionPage from './pages/AccountDeletionPage'

function routerBasename(): string {
  const raw = import.meta.env.BASE_URL ?? '/'
  if (raw === './' || raw === '') return '/'
  return raw.endsWith('/') ? raw.slice(0, -1) : raw
}

export default function App() {
  const { toggle, isDark } = useTheme()

  return (
    <div className={isDark ? 'dark' : ''}>
      <BrowserRouter basename={routerBasename()}>
        <Routes>
          <Route path="/" element={<HomePage isDark={isDark} onToggleTheme={toggle} />} />
          <Route path="/account-deletion" element={<AccountDeletionPage isDark={isDark} onToggleTheme={toggle} />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}
