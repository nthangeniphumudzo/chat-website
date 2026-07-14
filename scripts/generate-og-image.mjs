// Generates public/og-image.png (1200x630) — the social share card.
import sharp from 'sharp'

const svg = `
<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="glow" cx="50%" cy="0%" r="90%">
      <stop offset="0%" stop-color="#00e6a0" stop-opacity="0.22"/>
      <stop offset="60%" stop-color="#050505" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="#050505"/>
  <rect width="1200" height="630" fill="url(#glow)"/>
  <text x="90" y="150" font-family="Georgia, serif" font-weight="800" font-size="56" fill="#00e6a0">Ch@t</text>
  <text x="90" y="300" font-family="Georgia, serif" font-weight="800" font-size="72" fill="#ffffff">Stop endless swiping.</text>
  <text x="90" y="390" font-family="Georgia, serif" font-weight="800" font-size="72" fill="#00e6a0">Start real conversations.</text>
  <text x="90" y="480" font-family="Helvetica, Arial, sans-serif" font-size="30" fill="#9ca3af">Three questions. Honest answers. Better connections.</text>
  <text x="90" y="560" font-family="Helvetica, Arial, sans-serif" font-size="26" fill="#6b7280">Free on iOS &amp; Android · www.chatphcreations.co.za</text>
</svg>`

await sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toFile('public/og-image.png')
console.log('public/og-image.png written')
