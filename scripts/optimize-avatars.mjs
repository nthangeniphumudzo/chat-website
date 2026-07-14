import sharp from 'sharp'
import { readdir, stat } from 'node:fs/promises'
import path from 'node:path'

const dir = '/Users/phumudzonthangeni/repos/chat-website/src/assets/avatars'
const files = (await readdir(dir)).filter(f => f.endsWith('.jpg'))

for (const f of files) {
  const src = path.join(dir, f)
  const out = path.join(dir, f.replace(/\.jpg$/, '.webp'))
  await sharp(src).rotate().resize(128, 128, { fit: 'cover' }).webp({ quality: 82 }).toFile(out)
  const before = (await stat(src)).size
  const after = (await stat(out)).size
  console.log(`${f}: ${(before / 1024).toFixed(0)}K -> ${(after / 1024).toFixed(1)}K`)
}
