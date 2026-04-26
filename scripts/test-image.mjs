// Run: node --env-file=.env scripts/test-image.mjs
// Output: saves generated image to scripts/output/

// Inline prompt builder (mirrors src/state/buildPrompt.ts — no build step needed)
const silhouetteMap = { cropped: 'cropped fit', regular: 'regular fit', oversized: 'oversized', boxy: 'boxy cut' }
const materialMap = { cotton: 'cotton jersey', fleece: 'heavyweight fleece', technical: 'technical performance fabric', denim: 'denim', leather: 'leather' }
const patternMap = {
  solid:    (p)    => `in ${p}`,
  gradient: (p, s) => `with a gradient from ${p} to ${s}`,
  stripe:   (p, s) => `with ${p} and ${s} stripes`,
  graphic:  (p, s) => `with a graphic print in ${p} and ${s}`,
  camo:     (p, s) => `in camouflage pattern using ${p} and ${s}`,
}
const photoStyleMap = {
  minimal:    'Clean studio shot, white background, minimal styling, soft diffused light',
  bold:       'Dramatic lighting, high contrast editorial photography, bold composition',
  streetwear: 'Shot on location, urban street style, natural daylight, candid energy',
  luxury:     'Luxury fashion photography, soft studio lighting, premium feel, neutral background',
  utility:    'Technical product photography, clean grey background, sharp detail throughout',
}

function buildPrompt(state) {
  const silhouette = silhouetteMap[state.silhouette]
  const material = materialMap[state.material]
  const colour = patternMap[state.colour.pattern](state.colour.primary, state.colour.secondary)
  const photoStyle = photoStyleMap[state.brand.identity]

  const details = []
  if (state.details.hood !== 'none') details.push(`${state.details.hood} hood`)
  if (state.details.pocket !== 'none') details.push(state.details.pocket === 'kangaroo' ? 'kangaroo pocket' : 'split hem pockets')
  if (state.details.zipper) details.push('full-zip closure')
  if (state.details.drawstrings) details.push('adjustable drawstrings')
  if (state.details.embroidery) details.push('embroidered detailing')

  const detailsStr = details.length > 0 ? `, ${details.join(', ')}` : ''

  return [
    `Photorealistic product photograph of a ${silhouette} ${material} hoodie ${colour}${detailsStr}.`,
    photoStyle + '.',
    'High-quality fashion photography, sharp fabric detail.',
  ].join(' ')
}

import { writeFileSync, mkdirSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const outputDir = join(__dirname, 'output')
mkdirSync(outputDir, { recursive: true })

// Sample design — sensible streetwear hoodie
const state = {
  garmentType: 'hoodie',
  silhouette: 'oversized',
  material: 'fleece',
  colour: { pattern: 'solid', primary: '#1A1A2E', secondary: '#E94560' },
  details: { hood: 'oversized', pocket: 'kangaroo', zipper: false, drawstrings: true, embroidery: true },
  brand: { name: 'VOID', identity: 'streetwear', story: 'Designed for the in-between hours' },
}

const prompt = buildPrompt(state)
const model = process.env.IMAGE_MODEL ?? 'black-forest-labs/flux.2-pro'

console.log('DesignState:', JSON.stringify(state, null, 2))
console.log('\nBuilt prompt:\n', prompt)
console.log(`\nModel: ${model}`)
console.log('\nSending to OpenRouter...')

const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    model,
    messages: [{ role: 'user', content: prompt }],
    modalities: ['image'],
  }),
})

const data = await res.json()

if (!res.ok) {
  console.error('\nAPI error:', JSON.stringify(data, null, 2))
  process.exit(1)
}

console.log('\nFull response:', JSON.stringify(data, null, 2))

// Images come back as base64 data URLs in content blocks
const content = data.choices?.[0]?.message?.content
const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19)

if (Array.isArray(content)) {
  for (const block of content) {
    if (block.type === 'image_url') {
      const dataUrl = block.image_url?.url ?? ''
      const match = dataUrl.match(/^data:image\/(\w+);base64,(.+)$/)
      if (match) {
        const [, ext, b64] = match
        const file = join(outputDir, `${timestamp}.${ext}`)
        writeFileSync(file, Buffer.from(b64, 'base64'))
        console.log('\nSaved:', file)
      } else {
        console.log('\nImage URL:', dataUrl)
      }
    }
    if (block.type === 'text') console.log('\nText response:', block.text)
  }
} else if (typeof content === 'string') {
  console.log('\nResponse:', content)
}
