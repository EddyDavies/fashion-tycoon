import type { DesignState } from '../state/designState'
import { buildPrompt } from '../state/buildPrompt'

export type RenderVariant = 'model' | 'flat'

export type RenderResult = {
  model: string
  flat: string
}

// Cache key covers every field that affects the rendered image.
// Excludes brand.name and brand.story — neither appears in the prompt.
// brand.identity is included because it drives the photography style.
export function buildCacheKey(state: DesignState): string {
  const { garmentType, silhouette, material, colour, details, brand } = state
  return JSON.stringify([
    garmentType, silhouette, material,
    colour.pattern, colour.primary.toLowerCase(), colour.secondary.toLowerCase(),
    details, brand.identity,
  ])
}

// ─── localStorage persistence ─────────────────────────────────────────────

const STORAGE_KEY = 'a-game:render-cache'

function loadCache(): Map<string, RenderResult> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return new Map()
    return new Map(JSON.parse(raw) as [string, RenderResult][])
  } catch {
    return new Map()
  }
}

function persistCache(map: Map<string, RenderResult>): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...map.entries()]))
  } catch {
    // Storage quota exceeded — cache still works in-memory this session
  }
}

const cache = loadCache()

// ─── API implementation ────────────────────────────────────────────────────

const VARIANT_SUFFIX: Record<RenderVariant, string> = {
  model: 'Worn by a model, full-length shot.',
  flat: 'Flat lay on a clean surface, no model, ghost mannequin style.',
}

async function callApi(prompt: string, variant: RenderVariant): Promise<string> {
  const apiKey = import.meta.env.VITE_OPENROUTER_API_KEY
  if (!apiKey) {
    await new Promise(r => setTimeout(r, 900 + Math.random() * 400))
    return variant === 'model'
      ? 'https://placehold.co/800x1000/111111/ffffff?text=Model+Render'
      : 'https://placehold.co/800x800/111111/ffffff?text=Flat+Lay'
  }

  const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: import.meta.env.VITE_IMAGE_MODEL ?? 'openai/gpt-5.4-image-2',
      messages: [{ role: 'user', content: `${prompt} ${VARIANT_SUFFIX[variant]}` }],
      modalities: ['image'],
    }),
  })

  if (!res.ok) throw new Error(`OpenRouter ${res.status}: ${await res.text()}`)

  const data = await res.json()
  const content = data.choices?.[0]?.message?.content

  if (Array.isArray(content)) {
    for (const block of content) {
      if (block.type === 'image_url') return block.image_url?.url as string
      if (block.type === 'image') {
        const { source } = block
        if (source?.data) return `data:${source.media_type ?? 'image/png'};base64,${source.data}`
        if (block.url) return block.url as string
      }
    }
  } else if (typeof content === 'string' && content.length > 0) {
    return content
  }

  throw new Error('No image in response')
}

// ─── Public API ────────────────────────────────────────────────────────────

// Always generates both variants in parallel so the toggle is instant and
// both images reflect the same design snapshot. 2× cost (~$0.10–0.16) is
// acceptable for a demo; revisit if switching to a paid production tier.
export async function generateRender(state: DesignState): Promise<RenderResult> {
  const key = buildCacheKey(state)
  const cached = cache.get(key)
  if (cached) return cached

  const prompt = buildPrompt(state)
  const [model, flat] = await Promise.all([
    callApi(prompt, 'model'),
    callApi(prompt, 'flat'),
  ])

  const result: RenderResult = { model, flat }
  cache.set(key, result)
  persistCache(cache)
  return result
}

export function getCachedRender(state: DesignState): RenderResult | null {
  return cache.get(buildCacheKey(state)) ?? null
}

export function clearRenderCache(): void {
  cache.clear()
  localStorage.removeItem(STORAGE_KEY)
}
