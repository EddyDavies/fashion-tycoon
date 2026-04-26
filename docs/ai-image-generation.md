# AI Image Generation

## Decision: Model

**Chosen: GPT Image 1.5 via OpenRouter**

Rationale:
- Highest LM Arena ELO (1264) for prompt adherence and complex instructions
- Best at following specific color (hex), material, and silhouette constraints — critical since DesignState is structured
- $0.04–0.08/image at 1024×1024 standard quality — within the $0.05 target
- Available on OpenRouter so we can switch to Flux 2 (photorealism) or Nano Banana 2 / Gemini Flash (speed/cost) by changing one env var
- Fallback: if budget is tight, GPT Image 1 Mini at $0.005/image degrades gracefully

**Runner-up: Flux 2 Pro** — marginally more photorealistic (ELO 1265) but ~$0.055/image and less precise instruction following. Better for lookbook-style renders later.

## Decision: Prompt structure

Each DesignState field maps to a plain English phrase, assembled into a single paragraph prompt:

```
Photorealistic product photograph of a {silhouette} {material} hoodie {colourDescription}{detailsList}.
{photoStyle based on brand.identity}.
High-quality fashion photography, sharp fabric detail.
```

Key mapping decisions:
- **`brand.identity`** drives the photography register (studio/editorial/street/luxury/utility)
- **Hex colours** passed directly — GPT Image 1.5 handles hex accurately enough for a prototype; v2 can add a hex→name lookup for better fidelity
- **Details** are omitted from the prompt if not selected (clean prompt, no "no hood" negatives)

## Decision: Integration interface

`buildPrompt(state: DesignState): string` — pure function, no side effects.

The caller (Release screen) handles:
1. Call `buildPrompt(state)` on design completion
2. POST to `https://openrouter.ai/api/v1/images/generations` with the prompt
3. Show loading state while waiting (3–10s typical)
4. Render returned `data[0].url` beside the SVG collection card
5. On error: fall back to SVG-only view silently

## Files

- `src/state/designState.ts` — DesignState type + initialState
- `src/state/buildPrompt.ts` — prompt construction function
- `scripts/test-image.mjs` — standalone test: builds prompt + calls OpenRouter API
- `.env.example` — required env vars: `OPENROUTER_API_KEY`, `IMAGE_MODEL`
