import { useState } from 'react'
import type { DesignState } from './state/designState'
import './ReleaseScreen.css'

type AestheticKey = 'drop' | 'archive' | 'editorial' | 'hybrid'
type ViewMode = 'desk' | 'mob'

const materialLabels: Record<DesignState['material'], string> = {
  cotton: 'Cotton Jersey',
  fleece: 'Heavyweight Fleece',
  technical: 'Technical Fabric',
  denim: 'Denim',
}

const silhouetteLabels: Record<DesignState['silhouette'], string> = {
  regular: 'Regular',
  oversized: 'Oversized',
  boxy: 'Boxy',
}

const aestheticNames: Record<AestheticKey, string> = {
  drop: 'The Drop',
  archive: 'The Archive',
  editorial: 'Dark Editorial',
  hybrid: 'The Hybrid',
}

const aestheticDescs: Record<AestheticKey, string> = {
  drop: 'Supreme urgency · red CTA · specs · ticker',
  archive: 'Dark field · amber/gold · centred garment',
  editorial: 'Magazine spread · Playfair on dark · i-D energy',
  hybrid: 'Cream + Bebas + Garamond story + red CTA',
}

const DesktopIcon = () => (
  <svg viewBox="0 0 16 12" strokeWidth="1.2" strokeLinecap="round">
    <rect x="0" y="0" width="16" height="10" rx="1"/>
    <line x1="5" y1="10" x2="5" y2="12"/>
    <line x1="11" y1="10" x2="11" y2="12"/>
    <line x1="3" y1="12" x2="13" y2="12"/>
  </svg>
)

const MobileIcon = () => (
  <svg viewBox="0 0 10 14" strokeWidth="1.2" strokeLinecap="round">
    <rect x="0.6" y="0.6" width="8.8" height="12.8" rx="1.5"/>
    <line x1="3.5" y1="2" x2="6.5" y2="2"/>
    <circle cx="5" cy="12" r="0.8" fill="currentColor" stroke="none"/>
  </svg>
)

// ── Aesthetic previews ──────────────────────────────────────────────────────

interface PreviewProps {
  brandName: string
  garmentLine: string
  material: string
  silhouette: string
  season: string
  edition: number
}

function DropDesktop({ brandName, garmentLine, material, silhouette, season, edition }: PreviewProps) {
  const ticker = `${brandName.toUpperCase()} — ${season} — DROP 001 — ${garmentLine.toUpperCase()} — LIMITED ${edition}`
  return (
    <div className="ae-drop">
      <div className="drop-nav">
        <span className="drop-nav-brand">{brandName}</span>
        <span className="drop-nav-meta">{season} · DROP 001</span>
      </div>
      <div className="drop-hero">
        <div className="drop-left">
          <div>
            <div className="drop-name">{brandName.toUpperCase().split(' ').map(w => <span key={w}>{w}<br/></span>)}</div>
            <div className="drop-garment-line">{garmentLine}</div>
          </div>
          <div className="drop-specs">
            <div className="drop-spec-row"><span className="drop-spec-k">Material</span><span className="drop-spec-v">{material}</span></div>
            <div className="drop-spec-row"><span className="drop-spec-k">Silhouette</span><span className="drop-spec-v">{silhouette}</span></div>
            <div className="drop-spec-row"><span className="drop-spec-k">Hardware</span><span className="drop-spec-v">Metal aglets · YKK</span></div>
            <div className="drop-spec-row"><span className="drop-spec-k">Identity</span><span className="drop-spec-v">Streetwear</span></div>
          </div>
        </div>
        <div className="drop-right">
          <div className="drop-img"><div className="drop-hoodie"/></div>
          <div className="drop-edition-badge">EDITION 001 OF {edition}</div>
        </div>
      </div>
      <div className="drop-footer">
        <div><div className="drop-edition-num">{edition}</div><div className="drop-edition-sub">Units · Edition 1</div></div>
        <button className="drop-btn">Release Drop</button>
      </div>
      <div className="drop-ticker"><div className="drop-ticker-inner">{ticker} &nbsp;&nbsp;&nbsp;&nbsp;{ticker} &nbsp;&nbsp;&nbsp;&nbsp;</div></div>
    </div>
  )
}

function DropMobile({ brandName, garmentLine, material, silhouette, season, edition }: PreviewProps) {
  const ticker = `${brandName.toUpperCase()} — ${season} — DROP 001 — LIMITED ${edition}`
  return (
    <div className="ae-drop-mob">
      <div className="dm-brand">{brandName.toUpperCase().split(' ').map(w => <span key={w}>{w}<br/></span>)}</div>
      <div className="dm-sub">{garmentLine}</div>
      <div className="dm-img"><div className="dm-hoodie"/></div>
      <div className="dm-grid">
        <div className="dm-cell"><div className="dm-k">Material</div><div className="dm-v">{material}</div></div>
        <div className="dm-cell"><div className="dm-k">Silhouette</div><div className="dm-v">{silhouette}</div></div>
        <div className="dm-cell"><div className="dm-k">Hardware</div><div className="dm-v">YKK+Metal</div></div>
        <div className="dm-cell"><div className="dm-k">Edition</div><div className="dm-v">1 of {edition}</div></div>
      </div>
      <button className="dm-btn">Release Drop</button>
      <div className="dm-ticker"><div className="dm-ticker-inner">{ticker} &nbsp;&nbsp;&nbsp;&nbsp;{ticker} &nbsp;&nbsp;&nbsp;&nbsp;</div></div>
    </div>
  )
}

function ArchiveDesktop({ brandName, garmentLine, material, silhouette, season, edition }: PreviewProps) {
  return (
    <div className="ae-archive">
      <div className="arch-bar">
        <div className="arch-brand">{brandName}</div>
        <div className="arch-meta">ARCHIVE 001 · {season}</div>
      </div>
      <div className="arch-hero">
        <div className="arch-ghost">{brandName.split(' ')[0].toUpperCase()}</div>
        <div className="arch-garment"><div className="arch-hoodie"/></div>
        <div className="arch-garment-id">{garmentLine}</div>
        <div className="arch-meta-row">
          <div className="arch-col"><span className="arch-col-label">Material</span><span className="arch-col-val">{material}</span></div>
          <div className="arch-col"><span className="arch-col-label">Silhouette</span><span className="arch-col-val">{silhouette}</span></div>
          <div className="arch-col"><span className="arch-col-label">Edition</span><span className="arch-col-val">{edition} units</span></div>
        </div>
      </div>
      <div className="arch-footer">
        <div><div className="arch-edition-label">EDITION</div><div className="arch-edition-num">001</div></div>
        <button className="arch-btn">Archive & Release</button>
      </div>
    </div>
  )
}

function ArchiveMobile({ brandName, garmentLine, material, silhouette, season, edition }: PreviewProps) {
  return (
    <div className="ae-archive-mob">
      <div className="am-bar">
        <div className="am-brand">{brandName}</div>
        <div className="am-meta">ARCHIVE 001 · {season}</div>
      </div>
      <div className="am-hero">
        <div className="am-ghost">{brandName.split(' ')[0].toUpperCase()}</div>
        <div className="am-garment"><div className="am-hoodie"/></div>
        <div className="am-gid">{garmentLine}</div>
        <div className="am-cols">
          <div className="am-col"><span className="am-col-label">Material</span><span className="am-col-val">{material.split(' ')[0]}</span></div>
          <div className="am-col"><span className="am-col-label">Fit</span><span className="am-col-val">{silhouette}</span></div>
          <div className="am-col"><span className="am-col-label">Edition</span><span className="am-col-val">{edition}</span></div>
        </div>
      </div>
      <div className="am-footer">
        <div><div className="am-edition-label">EDITION</div><div className="am-edition-num">001</div></div>
        <button className="am-btn">Release</button>
      </div>
    </div>
  )
}

function EditorialDesktop({ brandName, garmentLine: _garmentLine, material, silhouette, season, edition }: PreviewProps) {
  return (
    <div className="ae-editorial">
      <div className="ed-head">
        <span className="ed-wordmark">{brandName}</span>
        <span className="ed-issue">VOL. I · {season}</span>
      </div>
      <div className="ed-spread">
        <div className="ed-left">
          <div>
            <div className="ed-coll-tag">Collection 001</div>
            <div className="ed-brand">{brandName.toUpperCase().split(' ').map(w => <span key={w}>{w}<br/></span>)}</div>
            <div className="ed-subtitle">The Founding Pieces</div>
          </div>
          <p className="ed-story">"Designed for the in-between — the walk to the studio, the late nights, the years before anyone knows your name."</p>
          <div className="ed-specs">
            <div><div className="ed-spec-k">Garment</div><div className="ed-spec-v">{silhouette} Hoodie</div></div>
            <div><div className="ed-spec-k">Material</div><div className="ed-spec-v">{material}</div></div>
            <div><div className="ed-spec-k">Identity</div><div className="ed-spec-v">Streetwear</div></div>
            <div><div className="ed-spec-k">Edition</div><div className="ed-spec-v">1 of {edition}</div></div>
          </div>
        </div>
        <div className="ed-right">
          <div className="ed-img"><div className="ed-hoodie"/></div>
          <div className="ed-material">{material}</div>
          <div className="ed-folio">01</div>
        </div>
      </div>
      <div className="ed-footer">
        <span className="ed-edition-note">Edition 1 of {edition}</span>
        <button className="ed-btn">Publish Collection →</button>
      </div>
    </div>
  )
}

function EditorialMobile({ brandName, garmentLine: _garmentLine, material, silhouette, season, edition }: PreviewProps) {
  return (
    <div className="ae-editorial-mob">
      <div className="em-head">
        <span className="em-wordmark">{brandName}</span>
        <span className="em-issue">VOL. I · {season}</span>
      </div>
      <div className="em-brand-block">
        <div className="em-coll-tag">Collection 001</div>
        <div className="em-brand">{brandName.toUpperCase().split(' ').map(w => <span key={w}>{w}<br/></span>)}</div>
        <div className="em-subtitle">The Founding Pieces</div>
      </div>
      <div className="em-img-row">
        <div className="em-img"><div className="em-hoodie"/></div>
        <div className="em-folio">01</div>
      </div>
      <p className="em-story">"Designed for the in-between — the years before anyone knows your name."</p>
      <div className="em-spec-row">
        <div><div className="em-spec-k">Garment</div><div className="em-spec-v">{silhouette}</div></div>
        <div><div className="em-spec-k">Material</div><div className="em-spec-v">{material.split(' ')[0]}</div></div>
        <div><div className="em-spec-k">Identity</div><div className="em-spec-v">SW</div></div>
        <div><div className="em-spec-k">Edition</div><div className="em-spec-v">1/{edition}</div></div>
      </div>
      <div className="em-footer">
        <span className="em-edition-note">Edition 1 of {edition}</span>
        <button className="em-btn">Publish →</button>
      </div>
    </div>
  )
}

function HybridDesktop({ brandName, garmentLine, material, silhouette, season, edition }: PreviewProps) {
  const ticker = brandName.toUpperCase().split(' ')
  return (
    <div className="ae-hybrid">
      <div className="hy-header">
        <div className="hy-brand">{brandName}</div>
        <div className="hy-header-right">
          <div className="hy-drop-tag">● LIVE DROP</div>
          <div className="hy-vol">Vol. I · {season} · 001</div>
        </div>
      </div>
      <div className="hy-body">
        <div className="hy-left">
          <div>
            <div className="hy-headline">The garment that starts everything</div>
            <p className="hy-story">"Heavyweight fleece. Every detail earns its place. The first piece from {brandName}."</p>
          </div>
          <div className="hy-specs">
            <div className="hy-spec-row"><span className="hy-spec-k">Garment</span><span className="hy-spec-v">{silhouette} Hoodie</span></div>
            <div className="hy-spec-row"><span className="hy-spec-k">Material</span><span className="hy-spec-v">{material}</span></div>
            <div className="hy-spec-row"><span className="hy-spec-k">Hardware</span><span className="hy-spec-v">YKK · Metal aglets</span></div>
          </div>
        </div>
        <div className="hy-right">
          <div className="hy-ghost">{brandName.split(' ')[0].toUpperCase()}</div>
          <div className="hy-img"><div className="hy-hoodie"/></div>
          <div className="hy-edition">Edition 1 of {edition}</div>
        </div>
      </div>
      <div className="hy-footer">
        <div><div className="hy-edition-large">{edition} Units</div><div className="hy-edition-sub">Limited · Drop 001</div></div>
        <button className="hy-btn">Release Drop</button>
      </div>
      <div className="hy-ticker">
        <div className="hy-ticker-inner">
          {ticker.map(w => <span key={w}>{w}</span>)}
          <span>{season}</span><span>DROP 001</span><span>{garmentLine.toUpperCase()}</span><span>LIMITED {edition}</span>
          {ticker.map(w => <span key={w + '2'}>{w}</span>)}
          <span>{season}</span><span>DROP 001</span><span>{garmentLine.toUpperCase()}</span><span>LIMITED {edition}</span>
        </div>
      </div>
    </div>
  )
}

function HybridMobile({ brandName, garmentLine: _garmentLine, material, silhouette, season, edition }: PreviewProps) {
  const ticker = brandName.toUpperCase().split(' ')
  return (
    <div className="ae-hybrid-mob">
      <div className="hm-header">
        <div className="hm-brand">{brandName}</div>
        <div className="hm-drop-tag">● LIVE DROP</div>
      </div>
      <div className="hm-img-area">
        <div className="hm-ghost">{brandName.split(' ')[0].toUpperCase()}</div>
        <div className="hm-img"><div className="hm-hoodie"/></div>
      </div>
      <div className="hm-story">
        <div className="hm-headline">The garment that starts everything</div>
        <p className="hm-body">"Every detail earns its place. The first piece from {brandName}."</p>
      </div>
      <div className="hm-specs">
        <div className="hm-spec-row"><span className="hm-spec-k">Garment</span><span className="hm-spec-v">{silhouette} Hoodie</span></div>
        <div className="hm-spec-row"><span className="hm-spec-k">Material</span><span className="hm-spec-v">{material}</span></div>
        <div className="hm-spec-row"><span className="hm-spec-k">Hardware</span><span className="hm-spec-v">YKK · Metal</span></div>
      </div>
      <div className="hm-footer">
        <div><div className="hm-edition-large">{edition} Units</div><div className="hm-edition-sub">Limited · Drop 001</div></div>
        <button className="hm-btn">Release</button>
      </div>
      <div className="hm-ticker">
        <div className="hm-ticker-inner">
          {ticker.map(w => <span key={w}>{w}</span>)}
          <span>{season}</span><span>DROP 001</span><span>LIMITED {edition}</span>
          {ticker.map(w => <span key={w + '2'}>{w}</span>)}
          <span>{season}</span><span>DROP 001</span><span>LIMITED {edition}</span>
        </div>
      </div>
    </div>
  )
}

// ── Main component ──────────────────────────────────────────────────────────

interface Props {
  design: DesignState
  onRelease?: (aesthetic: AestheticKey) => void
}

export function ReleaseScreen({ design, onRelease }: Props) {
  const [selected, setSelected] = useState<AestheticKey | null>(null)
  const [modes, setModes] = useState<Record<AestheticKey, ViewMode>>({
    drop: 'desk', archive: 'desk', editorial: 'desk', hybrid: 'desk',
  })

  const setMode = (key: AestheticKey, mode: ViewMode, e: React.MouseEvent) => {
    e.stopPropagation()
    setModes(prev => ({ ...prev, [key]: mode }))
  }

  const selectCard = (key: AestheticKey) => {
    setSelected(prev => prev === key ? null : key)
  }

  const brandName = design.brand.name || 'Your Brand'
  const garmentLine = `${silhouetteLabels[design.silhouette]} ${materialLabels[design.material]} Hoodie`
  const previewProps: PreviewProps = {
    brandName,
    garmentLine,
    material: materialLabels[design.material],
    silhouette: silhouetteLabels[design.silhouette],
    season: 'SS26',
    edition: 100,
  }

  const desktopViews: Record<AestheticKey, React.ReactNode> = {
    drop: <DropDesktop {...previewProps} />,
    archive: <ArchiveDesktop {...previewProps} />,
    editorial: <EditorialDesktop {...previewProps} />,
    hybrid: <HybridDesktop {...previewProps} />,
  }

  const mobileViews: Record<AestheticKey, React.ReactNode> = {
    drop: <DropMobile {...previewProps} />,
    archive: <ArchiveMobile {...previewProps} />,
    editorial: <EditorialMobile {...previewProps} />,
    hybrid: <HybridMobile {...previewProps} />,
  }

  const keys: AestheticKey[] = ['drop', 'archive', 'editorial', 'hybrid']

  return (
    <div className="rs">
      <header className="rs-header">
        <div className="rs-header-left">
          <div className="rs-brand-label">{brandName}</div>
          <div className="rs-sub">Choose your launch aesthetic</div>
        </div>
        <div className="rs-steps">
          <div className="rs-dot done"/><div className="rs-dot done"/>
          <div className="rs-dot done"/><div className="rs-dot done"/>
          <div className="rs-dot active"/>
          <span className="rs-step-label">RELEASE</span>
        </div>
      </header>

      <div className="rs-intro">
        <div>
          <h2>How does <strong>{brandName}</strong><br/>launch its first collection?</h2>
          <p>Select one aesthetic · you can change it before release</p>
        </div>
        <div className="rs-count">
          <span className="rs-count-num">{selected ? '1' : '—'}</span>
          of 4 selected
        </div>
      </div>

      <div className="rs-grid">
        {keys.map(key => {
          const mode = modes[key]
          const isSelected = selected === key
          return (
            <div
              key={key}
              className={`rs-card${isSelected ? ' selected' : ''}`}
              onClick={() => selectCard(key)}
            >
              <div className="rs-toggle">
                <button
                  className={`rs-toggle-btn${mode === 'desk' ? ' active' : ''}`}
                  onClick={e => setMode(key, 'desk', e)}
                >
                  <DesktopIcon /> DESK
                </button>
                <button
                  className={`rs-toggle-btn${mode === 'mob' ? ' active' : ''}`}
                  onClick={e => setMode(key, 'mob', e)}
                >
                  <MobileIcon /> MOB
                </button>
              </div>

              <div className={`rs-check`}>✓</div>

              <div className={`rs-screen${mode === 'mob' ? ' mob-mode' : ''}`}>
                <div className="rs-desktop" style={{ display: mode === 'desk' ? 'block' : 'none' }}>
                  {desktopViews[key]}
                </div>
                <div className="rs-mobile" style={{ display: mode === 'mob' ? 'flex' : 'none' }}>
                  <div className="rs-phone">
                    <div className="rs-phone-inner">
                      {mobileViews[key]}
                    </div>
                  </div>
                </div>
              </div>

              <div className="rs-card-footer">
                <div>
                  <div className="rs-card-name">{aestheticNames[key]}</div>
                  <div className="rs-card-desc">{aestheticDescs[key]}</div>
                </div>
                <div className="rs-select-label">{isSelected ? 'Selected ✓' : 'Select'}</div>
              </div>
            </div>
          )
        })}
      </div>

      <div className={`rs-launch-bar${selected ? ' visible' : ''}`}>
        <div>
          <div className="rs-launch-pre">Launching as</div>
          <div className="rs-launch-name">{selected ? aestheticNames[selected] : ''}</div>
        </div>
        <div className="rs-launch-actions">
          <button className="rs-change-btn" onClick={() => setSelected(null)}>← Change</button>
          <button className="rs-launch-btn" onClick={() => selected && onRelease?.(selected)}>
            Launch Collection →
          </button>
        </div>
      </div>
    </div>
  )
}
