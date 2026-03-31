import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'

/** GitHub Pages serves real files; `/account-deletion` must map to `account-deletion/index.html` (HTTP 200). */
function accountDeletionStaticFallback(): Plugin {
  const rewrite = (req: { url?: string }, _res: unknown, next: () => void) => {
    const raw = req.url ?? ''
    const path = raw.split('?')[0] ?? ''
    const query = raw.includes('?') ? '?' + raw.split('?').slice(1).join('?') : ''
    if (path === '/account-deletion' || path === '/account-deletion/') {
      req.url = '/account-deletion/index.html' + query
    }
    next()
  }

  return {
    name: 'account-deletion-static',
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
  plugins: [react(), accountDeletionStaticFallback()],
})
