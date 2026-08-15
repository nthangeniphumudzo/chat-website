import sharp from 'sharp'
import { readdir, stat, mkdir } from 'node:fs/promises'
import path from 'node:path'

// Re-encodes the app screenshots that get shipped to the browser.
//
// `originals/` holds the untouched exports and is the source of truth — it is
// never imported, so nothing in it reaches the bundle. This script reads from
// there and writes the served copies one directory up, which means it can be
// re-run with different settings without compounding compression artefacts.
//
// Sizing: the screenshots render inside a phone frame that is at most 320 CSS
// px wide (`lg:w-80`), and usually 208–240 px on a phone. 420px keeps them
// crisp on the high-DPR screens most visitors have while roughly halving the
// bytes — the page is the priority, not pixel-perfect screenshots.

const dir = new URL('../app/assets/screenshots/', import.meta.url).pathname
const srcDir = path.join(dir, 'originals')

const MAX_WIDTH = 420
const QUALITY = 66

await mkdir(srcDir, { recursive: true })

const files = (await readdir(srcDir)).filter(f => f.endsWith('.webp'))
if (files.length === 0) {
  console.error(`No source screenshots in ${srcDir}`)
  process.exit(1)
}

let before = 0
let after = 0
for (const f of files) {
  const src = path.join(srcDir, f)
  const out = path.join(dir, f)
  const { width, height } = await sharp(src)
    .resize(MAX_WIDTH, null, { withoutEnlargement: true })
    .webp({ quality: QUALITY, effort: 6 })
    .toFile(out)
  const b = (await stat(src)).size
  const a = (await stat(out)).size
  before += b
  after += a
  console.log(
    `${f.padEnd(28)} ${(b / 1024).toFixed(1).padStart(6)}K -> ${(a / 1024).toFixed(1).padStart(6)}K  ${width}x${height}`,
  )
}
console.log(
  `\nTOTAL  ${(before / 1024).toFixed(0)}K -> ${(after / 1024).toFixed(0)}K  (${(100 - (after / before) * 100).toFixed(0)}% smaller)`,
)
