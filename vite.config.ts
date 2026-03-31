import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'

/** SPA: `/account-deletion` must serve `index.html` (no trailing slash). */
function accountDeletionSpaFallback(): Plugin {
  const rewrite = (req: { url?: string }, _res: unknown, next: () => void) => {
    const raw = req.url ?? ''
    const path = raw.split('?')[0] ?? ''
    const query = raw.includes('?') ? '?' + raw.split('?').slice(1).join('?') : ''
    if (path === '/account-deletion' || path === '/account-deletion/') {
      req.url = '/index.html' + query
    }
    next()
  }

  return {
    name: 'account-deletion-spa-fallback',
    configureServer(server) {
      server.middlewares.use(rewrite)
    },
    configurePreviewServer(server) {
      server.middlewares.use(rewrite)
    },
  }
}

export default defineConfig({
  base: './',
  plugins: [react(), accountDeletionSpaFallback()],
})
