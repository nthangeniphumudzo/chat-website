import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'

/** Static page lives at public/account-deletion/index.html — browsers often omit trailing slash. */
function accountDeletionPublicPage(): Plugin {
  return {
    name: 'account-deletion-public-page',
    configureServer(server) {
      server.middlewares.use((req, _res, next) => {
        const raw = req.url ?? ''
        const path = raw.split('?')[0] ?? ''
        if (path === '/account-deletion') {
          req.url = '/account-deletion/index.html' + (raw.includes('?') ? '?' + raw.split('?').slice(1).join('?') : '')
        }
        next()
      })
    },
    configurePreviewServer(server) {
      server.middlewares.use((req, _res, next) => {
        const raw = req.url ?? ''
        const path = raw.split('?')[0] ?? ''
        if (path === '/account-deletion') {
          req.url = '/account-deletion/index.html' + (raw.includes('?') ? '?' + raw.split('?').slice(1).join('?') : '')
        }
        next()
      })
    },
  }
}

export default defineConfig({
  base: './',
  plugins: [react(), accountDeletionPublicPage()],
})
