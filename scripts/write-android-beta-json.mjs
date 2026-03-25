/**
 * Writes public/android-beta.json from ANDROID_BETA_URL or VITE_ANDROID_BETA_URL.
 * On GitHub Actions, the workflow runs this script once before build; npm prebuild must not overwrite it.
 */
import { writeFileSync, readFileSync, existsSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, '..')
const out = join(root, 'public/android-beta.json')

// npm prebuild on Actions would run without ANDROID_BETA_URL and wipe the file — skip that only.
if (process.env.GITHUB_ACTIONS === 'true' && !process.env.ANDROID_BETA_URL) {
  console.log('android-beta.json: skip npm prebuild (workflow step already wrote file)')
  process.exit(0)
}

if (!process.env.ANDROID_BETA_URL && !process.env.VITE_ANDROID_BETA_URL && existsSync(join(root, '.env'))) {
  try {
    const raw = readFileSync(join(root, '.env'), 'utf8')
    for (const line of raw.split('\n')) {
      const m = line.match(/^\s*VITE_ANDROID_BETA_URL\s*=\s*(.*)$/)
      if (m) {
        let v = m[1].trim()
        if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) v = v.slice(1, -1)
        process.env.VITE_ANDROID_BETA_URL = v
        break
      }
    }
  } catch {
    /* ignore */
  }
}

const url = (
  process.env.ANDROID_BETA_URL ||
  process.env.VITE_ANDROID_BETA_URL ||
  ''
).trim()
writeFileSync(out, JSON.stringify({ url }, null, 0) + '\n', 'utf8')
console.log(url ? 'android-beta.json: url set' : 'android-beta.json: empty url (Coming soon)')
