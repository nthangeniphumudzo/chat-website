import { readFileSync, writeFileSync, rmSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const dist = resolve(__dirname, '../dist')

// Import the build-time render() from the SSR bundle.
const serverEntry = resolve(dist, 'server/entry-server.js')
const { render } = await import(pathToFileURL(serverEntry).href)

const appHtml = render()

const indexPath = resolve(dist, 'index.html')
let html = readFileSync(indexPath, 'utf-8')

if (!html.includes('<div id="root"></div>')) {
  throw new Error('prerender: <div id="root"></div> not found in dist/index.html')
}
html = html.replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`)
writeFileSync(indexPath, html)

// The SSR bundle is build-time only — never ship it.
rmSync(resolve(dist, 'server'), { recursive: true, force: true })

console.log(`prerender: injected ${appHtml.length} chars into dist/index.html`)
