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
const model = process.env.IMAGE_MODEL ?? 'openai/gpt-5.4-image-2'

console.log('DesignState:', JSON.stringify(state, null, 2))
console.log('\nBuilt prompt:\n', prompt)
console.log(`\nModel: ${model}`)
console.log('\nSending to OpenRouter...')

const TIMEOUT_MS = 120_000
const controller = new AbortController()
const timeout = setTimeout(() => controller.abort(), TIMEOUT_MS)

const spinner = ['⠋','⠙','⠹','⠸','⠼','⠴','⠦','⠧','⠇','⠏']
let tick = 0
const start = Date.now()
const interval = setInterval(() => {
  const elapsed = ((Date.now() - start) / 1000).toFixed(1)
  process.stdout.write(`\r${spinner[tick++ % spinner.length]}  Waiting... ${elapsed}s / ${TIMEOUT_MS / 1000}s`)
}, 100)

let res
try {
  res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
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
    signal: controller.signal,
  })
} catch (err) {
  clearInterval(interval)
  clearTimeout(timeout)
  process.stdout.write('\n')
  if (err.name === 'AbortError') {
    console.error(`\nTimed out after ${TIMEOUT_MS / 1000}s — no response from OpenRouter.`)
  } else {
    console.error('\nFetch error:', err.message)
    if (err.cause) console.error('Caused by:', err.cause)
  }
  process.exit(1)
}

clearInterval(interval)
clearTimeout(timeout)
const elapsed = ((Date.now() - start) / 1000).toFixed(1)
process.stdout.write(`\r✓  Got response in ${elapsed}s                    \n`)

const data = await res.json()

if (!res.ok) {
  console.error('\nAPI error:', JSON.stringify(data, null, 2))
  process.exit(1)
}

console.log('\nFull response:', JSON.stringify(data, null, 2))

const content = data.choices?.[0]?.message?.content
const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19)

async function saveOrLog(url, label = 'image_url') {
  if (!url) { console.log(`\n${label}: (empty)`); return }
  const b64Match = url.match(/^data:image\/(\w+);base64,(.+)$/)
  if (b64Match) {
    const [, ext, b64] = b64Match
    const file = join(outputDir, `${timestamp}.${ext}`)
    writeFileSync(file, Buffer.from(b64, 'base64'))
    console.log('\nSaved:', file)
  } else if (url.startsWith('http')) {
    console.log(`\nDownloading ${label}...`)
    const imgRes = await fetch(url)
    const contentType = imgRes.headers.get('content-type') ?? 'image/png'
    const ext = contentType.split('/')[1]?.split(';')[0] ?? 'png'
    const file = join(outputDir, `${timestamp}.${ext}`)
    writeFileSync(file, Buffer.from(await imgRes.arrayBuffer()))
    console.log('Saved:', file)
  } else {
    console.log(`\n${label}:`, url)
  }
}

if (Array.isArray(content)) {
  for (const block of content) {
    if (block.type === 'image_url') await saveOrLog(block.image_url?.url ?? '', 'image_url')
    else if (block.type === 'image') await saveOrLog(block.source?.data ? `data:image/${block.source.media_type ?? 'png'};base64,${block.source.data}` : (block.url ?? ''), 'image')
    else if (block.type === 'text') console.log('\nText:', block.text)
    else console.log('\nUnknown block type:', JSON.stringify(block, null, 2))
  }
} else if (typeof content === 'string') {
  await saveOrLog(content, 'content')
} else {
  console.log('\nUnrecognised content shape — raw:', JSON.stringify(content, null, 2))
}
