import { useState, useEffect, useRef } from 'react'
import type { DesignState } from '../state/designState'
import {
  generateRender,
  getCachedRender,
  buildCacheKey,
  type RenderVariant,
  type RenderResult,
} from '../services/renderService'

type Props = {
  state: DesignState
  triggerImmediately?: boolean
}

type Phase =
  | { kind: 'idle' }
  | { kind: 'loading' }
  | { kind: 'ready'; result: RenderResult }
  | { kind: 'error'; message: string }

export function RenderPreview({ state, triggerImmediately = false }: Props) {
  const [phase, setPhase] = useState<Phase>(() => {
    const cached = getCachedRender(state)
    return cached ? { kind: 'ready', result: cached } : { kind: 'idle' }
  })
  const [activeVariant, setActiveVariant] = useState<RenderVariant>('model')

  const inflight = useRef<string | null>(null)

  // Reset to idle (or cached) whenever the design changes.
  useEffect(() => {
    const cached = getCachedRender(state)
    setPhase(cached ? { kind: 'ready', result: cached } : { kind: 'idle' })
  }, [buildCacheKey(state)]) // eslint-disable-line react-hooks/exhaustive-deps

  // Auto-trigger on mount when requested (e.g. switching to the render tab).
  useEffect(() => {
    if (triggerImmediately) trigger()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  async function trigger() {
    if (phase.kind === 'loading') return
    const cached = getCachedRender(state)
    if (cached) {
      setPhase({ kind: 'ready', result: cached })
      return
    }
    const key = buildCacheKey(state)
    inflight.current = key
    setPhase({ kind: 'loading' })
    try {
      const result = await generateRender(state)
      // Ignore if the design changed while we were waiting.
      if (inflight.current !== key) return
      setPhase({ kind: 'ready', result })
    } catch (err) {
      if (inflight.current !== key) return
      setPhase({
        kind: 'error',
        message: err instanceof Error ? err.message : 'Render failed',
      })
    }
  }

  return (
    <div className="render-preview">
      {phase.kind === 'idle' && (
        <button className="render-preview__cta" onClick={trigger}>
          Generate AI render
        </button>
      )}

      {phase.kind === 'loading' && (
        <div className="render-preview__loading" aria-live="polite">
          Generating render…
        </div>
      )}

      {phase.kind === 'error' && (
        <div className="render-preview__error" role="alert">
          <p>{phase.message}</p>
          <button onClick={trigger}>Retry</button>
        </div>
      )}

      {phase.kind === 'ready' && (
        <div className="render-preview__result">
          <div className="render-preview__toggle" role="group" aria-label="View mode">
            <button
              className={activeVariant === 'model' ? 'active' : ''}
              onClick={() => setActiveVariant('model')}
              aria-pressed={activeVariant === 'model'}
            >
              With model
            </button>
            <button
              className={activeVariant === 'flat' ? 'active' : ''}
              onClick={() => setActiveVariant('flat')}
              aria-pressed={activeVariant === 'flat'}
            >
              Flat lay
            </button>
          </div>

          {/* Both images are pre-loaded; switching variant is instant. */}
          <img
            key={activeVariant}
            src={phase.result[activeVariant]}
            alt={activeVariant === 'model' ? 'Model wearing the garment' : 'Flat lay of the garment'}
            className="render-preview__image"
          />

          <button className="render-preview__refresh" onClick={trigger}>
            Re-generate
          </button>
        </div>
      )}
    </div>
  )
}
