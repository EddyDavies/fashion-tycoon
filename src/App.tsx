import { useState, useEffect, useRef } from 'react'
import { useDesign } from './state/useDesign'
import { GarmentPreview } from './components/GarmentPreview'
import { RenderPreview } from './components/RenderPreview'
import { buildCacheKey } from './services/renderService'
import type { DesignState } from './state/designState'
import './App.css'

const PRESETS = [
  '#1a1a1a', '#4a4a4a', '#ffffff', '#f0ece4',
  '#c0392b', '#e74c3c', '#e67e22', '#f1c40f',
  '#2ecc71', '#16a085', '#3498db', '#2c3e50',
  '#9b59b6', '#ff6b9d', '#795548', '#607d8b',
]

function PillGroup<T extends string>({
  options, value, onChange,
}: { options: { value: T; label: string }[]; value: T; onChange: (v: T) => void }) {
  return (
    <div className="pill-group">
      {options.map(o => (
        <button
          key={o.value}
          className={`pill${value === o.value ? ' selected' : ''}`}
          onClick={() => onChange(o.value)}
          aria-pressed={value === o.value}
        >
          {o.label}
        </button>
      ))}
    </div>
  )
}

function Toggle({ label, value, onChange }: { label: string; value: boolean; onChange: (v: boolean) => void }) {
  return (
    <button className={`toggle${value ? ' on' : ''}`} onClick={() => onChange(!value)} aria-pressed={value}>
      <span className="toggle-track"><span className="toggle-thumb" /></span>
      {label}
    </button>
  )
}

function ColourPicker({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  const norm = value.toLowerCase()
  return (
    <div className="colour-picker">
      <span className="section-label">{label}</span>
      <div className="colour-presets">
        {PRESETS.map(c => (
          <button
            key={c}
            className={`colour-dot${norm === c.toLowerCase() ? ' selected' : ''}`}
            style={{ background: c }}
            onClick={() => onChange(c)}
            title={c}
          />
        ))}
        <label className="colour-dot colour-dot--custom" title="Custom colour">
          <input type="color" value={value} onChange={e => onChange(e.target.value)} />
        </label>
      </div>
      <div className="colour-current">
        <span className="colour-swatch-sm" style={{ background: value }} />
        <span className="colour-hex">{value.toUpperCase()}</span>
      </div>
    </div>
  )
}

function HoodieDetails({ state }: { state: DesignState & { garmentType: 'hoodie' } }) {
  const { setHoodieDetails } = useDesign()
  const d = state.details
  return (
    <div className="section">
      <span className="section-label">Details</span>
      <div style={{ marginBottom: 10 }}>
        <PillGroup
          options={[{ value: 'none', label: 'No hood' }, { value: 'standard', label: 'Standard' }, { value: 'oversized', label: 'Oversized' }]}
          value={d.hood} onChange={v => setHoodieDetails({ hood: v })}
        />
      </div>
      <div style={{ marginBottom: 12 }}>
        <PillGroup
          options={[{ value: 'none', label: 'No pocket' }, { value: 'kangaroo', label: 'Kangaroo' }, { value: 'split', label: 'Split' }]}
          value={d.pocket} onChange={v => setHoodieDetails({ pocket: v })}
        />
      </div>
      <div className="toggle-group">
        <Toggle label="Zipper" value={d.zipper} onChange={v => setHoodieDetails({ zipper: v })} />
        <Toggle label="Drawstrings" value={d.drawstrings} onChange={v => setHoodieDetails({ drawstrings: v })} />
        <Toggle label="Embroidery" value={d.embroidery} onChange={v => setHoodieDetails({ embroidery: v })} />
      </div>
    </div>
  )
}

function TshirtDetails({ state }: { state: DesignState & { garmentType: 'tshirt' } }) {
  const { setTshirtDetails } = useDesign()
  const d = state.details
  return (
    <div className="section">
      <span className="section-label">Details</span>
      <div style={{ marginBottom: 10 }}>
        <PillGroup
          options={[{ value: 'crew', label: 'Crew' }, { value: 'vneck', label: 'V-neck' }, { value: 'scoop', label: 'Scoop' }]}
          value={d.neckline} onChange={v => setTshirtDetails({ neckline: v })}
        />
      </div>
      <div style={{ marginBottom: 10 }}>
        <PillGroup
          options={[{ value: 'short', label: 'Short sleeve' }, { value: 'long', label: 'Long sleeve' }, { value: 'sleeveless', label: 'Sleeveless' }]}
          value={d.sleeves} onChange={v => setTshirtDetails({ sleeves: v })}
        />
      </div>
      <div style={{ marginBottom: 12 }}>
        <PillGroup
          options={[{ value: 'straight', label: 'Straight' }, { value: 'curved', label: 'Curved' }, { value: 'cropped', label: 'Cropped' }]}
          value={d.hem} onChange={v => setTshirtDetails({ hem: v })}
        />
      </div>
      <div className="toggle-group">
        <Toggle label="Graphic print" value={d.graphic} onChange={v => setTshirtDetails({ graphic: v })} />
      </div>
    </div>
  )
}

function ShirtDetails({ state }: { state: DesignState & { garmentType: 'shirt' } }) {
  const { setShirtDetails } = useDesign()
  const d = state.details
  return (
    <div className="section">
      <span className="section-label">Details</span>
      <div style={{ marginBottom: 10 }}>
        <PillGroup
          options={[{ value: 'short', label: 'Short sleeve' }, { value: 'long', label: 'Long sleeve' }]}
          value={d.sleeve} onChange={v => setShirtDetails({ sleeve: v })}
        />
      </div>
      <div style={{ marginBottom: 12 }}>
        <PillGroup
          options={[{ value: 'standard', label: 'Point collar' }, { value: 'band', label: 'Band' }, { value: 'spread', label: 'Spread' }]}
          value={d.collar} onChange={v => setShirtDetails({ collar: v })}
        />
      </div>
      <div className="toggle-group">
        <Toggle label="Chest pocket" value={d.pocket} onChange={v => setShirtDetails({ pocket: v })} />
        <Toggle label="Embroidery" value={d.embroidery} onChange={v => setShirtDetails({ embroidery: v })} />
      </div>
    </div>
  )
}

export default function App() {
  const { state, setGarmentType, setSilhouette, setMaterial, setColour, setBrand } = useDesign()
  const [tab, setTab] = useState<'flat' | 'render'>('flat')
  const [showRelease, setShowRelease] = useState(false)

  const prevKey = useRef(buildCacheKey(state))
  useEffect(() => {
    const key = buildCacheKey(state)
    if (key !== prevKey.current) {
      setTab('flat')
      prevKey.current = key
    }
  })

  const showSecondary = state.colour.pattern !== 'solid'

  if (showRelease) {
    return <ReleaseScreen design={state} onRelease={() => setShowRelease(false)} />
  }

  return (
    <div className="app">

      <aside className="sidebar">
        <div className="sidebar-header">
          <h1>Design Studio</h1>
        </div>

        <div className="sidebar-scroll">

          <div className="section">
            <span className="section-label">Garment</span>
            <PillGroup
              options={[{ value: 'hoodie', label: 'Hoodie' }, { value: 'tshirt', label: 'T-Shirt' }, { value: 'shirt', label: 'Shirt' }]}
              value={state.garmentType} onChange={setGarmentType}
            />
          </div>

          <div className="section">
            <span className="section-label">Silhouette</span>
            <PillGroup
              options={[{ value: 'regular', label: 'Regular' }, { value: 'oversized', label: 'Oversized' }, { value: 'boxy', label: 'Boxy' }]}
              value={state.silhouette} onChange={setSilhouette}
            />
          </div>

          <div className="section">
            <span className="section-label">Material</span>
            <PillGroup
              options={[{ value: 'cotton', label: 'Cotton' }, { value: 'fleece', label: 'Fleece' }, { value: 'technical', label: 'Technical' }, { value: 'denim', label: 'Denim' }]}
              value={state.material} onChange={setMaterial}
            />
          </div>

          <div className="section">
            <span className="section-label">Colour</span>
            <div style={{ marginBottom: 12 }}>
              <PillGroup
                options={[{ value: 'solid', label: 'Solid' }, { value: 'gradient', label: 'Gradient' }, { value: 'stripe', label: 'Stripe' }, { value: 'graphic', label: 'Graphic' }, { value: 'camo', label: 'Camo' }]}
                value={state.colour.pattern} onChange={v => setColour({ pattern: v })}
              />
            </div>
            <ColourPicker label="Primary" value={state.colour.primary} onChange={v => setColour({ primary: v })} />
            {showSecondary && (
              <ColourPicker label="Secondary" value={state.colour.secondary} onChange={v => setColour({ secondary: v })} />
            )}
          </div>

          {state.garmentType === 'hoodie' && <HoodieDetails state={state} />}
          {state.garmentType === 'tshirt' && <TshirtDetails state={state} />}
          {state.garmentType === 'shirt' && <ShirtDetails state={state} />}

          <div className="section">
            <span className="section-label">Brand</span>
            <div className="input-row">
              <label className="input-label" htmlFor="brand-name">Name</label>
              <input
                id="brand-name"
                className="text-input"
                type="text"
                value={state.brand.name}
                onChange={e => setBrand({ name: e.target.value })}
                placeholder="Your brand name"
              />
            </div>
            <div className="input-row">
              <span className="input-label">Identity</span>
              <PillGroup
                options={[{ value: 'minimal', label: 'Minimal' }, { value: 'bold', label: 'Bold' }, { value: 'streetwear', label: 'Streetwear' }, { value: 'luxury', label: 'Luxury' }, { value: 'utility', label: 'Utility' }]}
                value={state.brand.identity} onChange={v => setBrand({ identity: v })}
              />
            </div>
            <div className="input-row">
              <label className="input-label" htmlFor="brand-story">Story</label>
              <textarea
                id="brand-story"
                className="text-area"
                value={state.brand.story}
                onChange={e => setBrand({ story: e.target.value })}
                placeholder="What's behind the brand?"
              />
            </div>
          </div>

        </div>

        <div className="sidebar-footer">
          <button className="generate-btn" onClick={() => setTab('render')}>
            Generate AI render →
          </button>
        </div>
      </aside>

      <main className="preview-panel">
        <div className="preview-tabs">
          <button className={`preview-tab${tab === 'flat' ? ' active' : ''}`} onClick={() => setTab('flat')}>
            Flat
          </button>
          <button className={`preview-tab${tab === 'render' ? ' active' : ''}`} onClick={() => setTab('render')}>
            AI Render
          </button>
        </div>

        <div className="preview-content">
          {tab === 'flat' && (
            <div className="flat-container">
              <GarmentPreview state={state} />
            </div>
          )}
          {tab === 'render' && (
            <RenderPreview state={state} />
          )}
        </div>
      </main>

    </div>
  )
}
