/**
 * One-off script: make explore-dark.png more vibrant and detailed.
 * Run: node scripts/enhance-explore-dark.mjs
 */
import sharp from 'sharp'
import { readFileSync, writeFileSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, '..')
const src = join(root, 'src/assets/screenshots/explore-dark.png')
const out = src

const buffer = readFileSync(src)
const enhanced = await sharp(buffer)
  .linear(1.08, 4)
  .modulate({ saturation: 1.12 })
  .png({ quality: 95 })
  .toBuffer()

writeFileSync(out, enhanced)
console.log('Written:', out)
