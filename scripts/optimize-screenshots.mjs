import sharp from 'sharp'
import { readdir, stat } from 'node:fs/promises'
import path from 'node:path'

const dir = new URL('../src/assets/screenshots/', import.meta.url).pathname

// Phones render at ~320px CSS max; 900px covers that even on 3x-DPR screens.
const MAX_WIDTH = 900
const QUALITY = 80

// Unused stray asset — don't bother converting it.
const skip = new Set(['Screenshot_1780275827.png'])

const files = (await readdir(dir)).filter(f => f.endsWith('.png') && !skip.has(f))

let before = 0
let after = 0
for (const f of files) {
  const src = path.join(dir, f)
  const out = path.join(dir, f.replace(/\.png$/, '.webp'))
  await sharp(src)
    .resize(MAX_WIDTH, null, { withoutEnlargement: true })
    .webp({ quality: QUALITY })
    .toFile(out)
  const b = (await stat(src)).size
  const a = (await stat(out)).size
  before += b
  after += a
  console.log(`${f.padEnd(28)} ${(b / 1024).toFixed(0).padStart(5)}K -> ${(a / 1024).toFixed(1).padStart(6)}K`)
}
console.log(`\nTOTAL  ${(before / 1024).toFixed(0)}K -> ${(after / 1024).toFixed(0)}K  (${(100 - (after / before) * 100).toFixed(0)}% smaller)`)
