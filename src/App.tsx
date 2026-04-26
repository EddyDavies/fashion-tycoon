import { useDesign } from './state/useDesign'
import { GarmentPreview } from './components/GarmentPreview'
import { RenderPreview } from './components/RenderPreview'
import ColourSwatch from './components/ui/ColourSwatch'
import OptionCard from './components/ui/OptionCard'
import type { DesignState, HoodieDetails, TshirtDetails, ShirtDetails } from './state/designState'

export default function App() {
  const {
    state, setGarmentType, setSilhouette, setMaterial,
    setColour, setHoodieDetails, setTshirtDetails, setShirtDetails, setBrand,
  } = useDesign()

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#0a0a0a', color: '#f5f5f5', fontFamily: 'system-ui, sans-serif' }}>

      {/* ── Left sidebar: design controls ── */}
      <aside style={{ width: 280, minWidth: 280, borderRight: '1px solid #1a1a1a', padding: '24px 20px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 24 }}>

        <Section label="Garment">
          {(['hoodie', 'tshirt', 'shirt'] as const).map(g => (
            <OptionCard key={g} label={{ hoodie: 'Hoodie', tshirt: 'T-Shirt', shirt: 'Shirt' }[g]}
              selected={state.garmentType === g} onClick={() => setGarmentType(g)} />
          ))}
        </Section>

        <Section label="Silhouette">
          {(['regular', 'oversized', 'boxy'] as const).map(s => (
            <OptionCard key={s} label={cap(s)} selected={state.silhouette === s} onClick={() => setSilhouette(s)} />
          ))}
        </Section>

        <Section label="Material">
          {(['cotton', 'fleece', 'technical', 'denim'] as const).map(m => (
            <OptionCard key={m} label={cap(m)} selected={state.material === m} onClick={() => setMaterial(m)} />
          ))}
        </Section>

        <Section label="Colour">
          <ColourSwatch label="Primary" value={state.colour.primary} onChange={v => setColour({ primary: v })} />
          <ColourSwatch label="Secondary" value={state.colour.secondary} onChange={v => setColour({ secondary: v })} />
          <div style={{ marginTop: 6 }}>
            {(['solid', 'gradient', 'stripe', 'graphic', 'camo'] as const).map(p => (
              <OptionCard key={p} label={cap(p)} selected={state.colour.pattern === p} onClick={() => setColour({ pattern: p })} />
            ))}
          </div>
        </Section>

        <Section label="Details">
          <DetailsPanel state={state} onHoodie={setHoodieDetails} onTshirt={setTshirtDetails} onShirt={setShirtDetails} />
        </Section>

        <Section label="Brand">
          <input value={state.brand.name} onChange={e => setBrand({ name: e.target.value.toUpperCase() })}
            placeholder="BRAND NAME" maxLength={24}
            style={inputStyle} />
          {(['minimal', 'bold', 'streetwear', 'luxury', 'utility'] as const).map(id => (
            <OptionCard key={id} label={cap(id)} selected={state.brand.identity === id} onClick={() => setBrand({ identity: id })} />
          ))}
          <textarea value={state.brand.story} onChange={e => setBrand({ story: e.target.value })}
            placeholder="One sentence brand story…" maxLength={120} rows={2}
            style={{ ...inputStyle, resize: 'none', marginTop: 8 }} />
        </Section>

      </aside>

      {/* ── Centre: live SVG preview ── */}
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 48, gap: 20, background: '#080808' }}>
        <div style={{ width: 300, height: 420 }}>
          <GarmentPreview state={state} mode="design" />
        </div>
        <div style={{ textAlign: 'center' }}>
          <p style={{ fontSize: 10, color: '#444', textTransform: 'uppercase', letterSpacing: '0.15em', margin: '0 0 4px' }}>
            {{ hoodie: 'Hoodie', tshirt: 'T-Shirt', shirt: 'Shirt' }[state.garmentType]} · {state.silhouette} · {state.material}
          </p>
          {state.brand.name && (
            <p style={{ fontSize: 20, fontWeight: 300, letterSpacing: '0.25em', color: '#fff', margin: 0 }}>{state.brand.name}</p>
          )}
        </div>
      </main>

      {/* ── Right: AI render panel ── */}
      <aside style={{ width: 300, minWidth: 300, borderLeft: '1px solid #1a1a1a', padding: 24, display: 'flex', flexDirection: 'column', gap: 16 }}>
        <p style={{ fontSize: 10, color: '#444', textTransform: 'uppercase', letterSpacing: '0.15em', margin: 0 }}>AI Render</p>
        <RenderPreview state={state} />
      </aside>

    </div>
  )
}

/* ── Local helpers ── */

const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1)

const inputStyle: React.CSSProperties = {
  width: '100%', background: 'transparent', border: '1px solid #222',
  borderRadius: 6, padding: '8px 10px', color: '#fff', fontSize: 13,
  letterSpacing: '0.1em', boxSizing: 'border-box',
}

function Section({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <p style={{ fontSize: 9, color: '#444', textTransform: 'uppercase', letterSpacing: '0.12em', margin: '0 0 8px' }}>{label}</p>
      {children}
    </div>
  )
}

function SubLabel({ children }: { children: React.ReactNode }) {
  return <p style={{ fontSize: 9, color: '#333', textTransform: 'uppercase', letterSpacing: '0.1em', margin: '8px 0 4px' }}>{children}</p>
}

function Toggle({ label, on, onClick }: { label: string; on: boolean; onClick: () => void }) {
  return (
    <button onClick={onClick} style={{
      width: '100%', textAlign: 'left', padding: '7px 10px', marginBottom: 3,
      borderRadius: 5, border: `1px solid ${on ? '#555' : '#1e1e1e'}`,
      background: on ? 'rgba(255,255,255,0.06)' : 'transparent',
      color: on ? '#fff' : '#555', fontSize: 12, cursor: 'pointer',
    }}>
      {on ? '✓ ' : ''}{label}
    </button>
  )
}

function DetailsPanel({ state, onHoodie, onTshirt, onShirt }: {
  state: DesignState
  onHoodie: (v: Partial<HoodieDetails>) => void
  onTshirt: (v: Partial<TshirtDetails>) => void
  onShirt: (v: Partial<ShirtDetails>) => void
}) {
  if (state.garmentType === 'hoodie') {
    const d = state.details as HoodieDetails
    return <>
      <SubLabel>Hood</SubLabel>
      {(['none', 'standard', 'oversized'] as const).map(v => (
        <OptionCard key={v} label={cap(v)} selected={d.hood === v} onClick={() => onHoodie({ hood: v })} />
      ))}
      <SubLabel>Pocket</SubLabel>
      {(['none', 'kangaroo', 'split'] as const).map(v => (
        <OptionCard key={v} label={cap(v)} selected={d.pocket === v} onClick={() => onHoodie({ pocket: v })} />
      ))}
      <Toggle label="Zipper" on={d.zipper} onClick={() => onHoodie({ zipper: !d.zipper })} />
      <Toggle label="Drawstrings" on={d.drawstrings} onClick={() => onHoodie({ drawstrings: !d.drawstrings })} />
      <Toggle label="Embroidery" on={d.embroidery} onClick={() => onHoodie({ embroidery: !d.embroidery })} />
    </>
  }
  if (state.garmentType === 'tshirt') {
    const d = state.details as TshirtDetails
    return <>
      <SubLabel>Neckline</SubLabel>
      {([['crew', 'Crew'], ['vneck', 'V-Neck'], ['scoop', 'Scoop']] as const).map(([v, l]) => (
        <OptionCard key={v} label={l} selected={d.neckline === v} onClick={() => onTshirt({ neckline: v })} />
      ))}
      <SubLabel>Sleeves</SubLabel>
      {(['short', 'long', 'sleeveless'] as const).map(v => (
        <OptionCard key={v} label={cap(v)} selected={d.sleeves === v} onClick={() => onTshirt({ sleeves: v })} />
      ))}
      <SubLabel>Hem</SubLabel>
      {(['straight', 'curved', 'cropped'] as const).map(v => (
        <OptionCard key={v} label={cap(v)} selected={d.hem === v} onClick={() => onTshirt({ hem: v })} />
      ))}
      <Toggle label="Graphic print" on={d.graphic} onClick={() => onTshirt({ graphic: !d.graphic })} />
    </>
  }
  const d = state.details as ShirtDetails
  return <>
    <SubLabel>Sleeve</SubLabel>
    {(['short', 'long'] as const).map(v => (
      <OptionCard key={v} label={cap(v)} selected={d.sleeve === v} onClick={() => onShirt({ sleeve: v })} />
    ))}
    <SubLabel>Collar</SubLabel>
    {(['standard', 'band', 'spread'] as const).map(v => (
      <OptionCard key={v} label={cap(v)} selected={d.collar === v} onClick={() => onShirt({ collar: v })} />
    ))}
    <Toggle label="Chest pocket" on={d.pocket} onClick={() => onShirt({ pocket: !d.pocket })} />
    <Toggle label="Embroidery" on={d.embroidery} onClick={() => onShirt({ embroidery: !d.embroidery })} />
  </>
}
