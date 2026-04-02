import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'

/** GitHub Pages: static policy pages need `folder/index.html` (HTTP 200). Dev server maps bare paths. */
const STATIC_PAGE_PREFIXES = ['/account-deletion', '/child-safety'] as const

function staticPolicyPagesFallback(): Plugin {
  const rewrite = (req: { url?: string }, _res: unknown, next: () => void) => {
    const raw = req.url ?? ''
    const path = raw.split('?')[0] ?? ''
    const query = raw.includes('?') ? '?' + raw.split('?').slice(1).join('?') : ''
    for (const prefix of STATIC_PAGE_PREFIXES) {
      if (path === prefix || path === prefix + '/') {
        req.url = prefix + '/index.html' + query
        break
      }
    }
    next()
  }

  return {
    name: 'static-policy-pages',
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
  plugins: [react(), staticPolicyPagesFallback()],
})
