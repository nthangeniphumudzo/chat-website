/**
 * Apply gentle enhancement (contrast, saturation only — no sharpen, to keep text crisp).
 * Run: node scripts/enhance-all-images.mjs
 */
import sharp from 'sharp'
import { readdirSync, readFileSync, writeFileSync } from 'fs'
import { join, dirname, extname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, '..')
const assetsDir = join(root, 'src/assets')

function* listPngs(dir) {
  const entries = readdirSync(dir, { withFileTypes: true })
  for (const e of entries) {
    const full = join(dir, e.name)
    if (e.isDirectory()) yield* listPngs(full)
    else if (e.isFile() && /\.(png|jpg|jpeg)$/i.test(e.name)) yield full
  }
}

const pipeline = (buffer) =>
  sharp(buffer)
    .linear(1.08, 4)
    .modulate({ saturation: 1.12 })

const files = [...listPngs(assetsDir)]
console.log(`Enhancing ${files.length} images...`)

for (const file of files) {
  const buffer = readFileSync(file)
  const ext = extname(file).toLowerCase()
  const pipe = pipeline(buffer)
  const outBuffer = ext === '.png'
    ? await pipe.png({ quality: 95 }).toBuffer()
    : await pipe.jpeg({ quality: 95 }).toBuffer()
  writeFileSync(file, outBuffer)
  console.log('  ', file.replace(root + '/', ''))
}

console.log('Done.')
