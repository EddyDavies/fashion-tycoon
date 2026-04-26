import type { DesignState } from '../../state/designState'

type Props = { state: DesignState & { garmentType: 'shirt' } }

// ---------------------------------------------------------------------------
// Silhouette path data
// ---------------------------------------------------------------------------

type SilhouettePaths = {
  body: string
  longSleeveLeft: string
  longSleeveRight: string
  shortSleeveLeft: string
  shortSleeveRight: string
  // Cuff rects for long sleeve: [x, y, w, h]
  cuffLeft: [number, number, number, number]
  cuffRight: [number, number, number, number]
  // Hem band rect: [x, y, w, h]
  hem: [number, number, number, number]
  // Shoulder seam endpoints: [[x1,y1,x2,y2], [x1,y1,x2,y2]]
  shoulderSeamLeft: [number, number, number, number]
  shoulderSeamRight: [number, number, number, number]
  // Back yoke y-position
  yokeY: number
}

const SILHOUETTES: Record<string, SilhouettePaths> = {
  regular: {
    body: 'M88,80 L70,368 L230,368 L212,80 Z',
    longSleeveLeft: 'M88,80 L32,312 L55,322 L100,115 Z',
    longSleeveRight: 'M212,80 L268,312 L245,322 L200,115 Z',
    shortSleeveLeft: 'M88,80 L42,168 L62,178 L102,108 Z',
    shortSleeveRight: 'M212,80 L258,168 L238,178 L198,108 Z',
    cuffLeft: [32, 310, 24, 18],
    cuffRight: [244, 310, 24, 18],
    hem: [70, 354, 160, 14],
    shoulderSeamLeft: [88, 80, 100, 115],
    shoulderSeamRight: [212, 80, 200, 115],
    yokeY: 112,
  },
  oversized: {
    body: 'M75,80 L50,372 L250,372 L225,80 Z',
    longSleeveLeft: 'M75,80 L15,318 L42,330 L88,118 Z',
    longSleeveRight: 'M225,80 L285,318 L258,330 L212,118 Z',
    shortSleeveLeft: 'M75,80 L28,172 L50,184 L90,110 Z',
    shortSleeveRight: 'M225,80 L272,172 L250,184 L210,110 Z',
    cuffLeft: [14, 316, 29, 18],
    cuffRight: [257, 316, 29, 18],
    hem: [50, 358, 200, 14],
    shoulderSeamLeft: [75, 80, 88, 118],
    shoulderSeamRight: [225, 80, 212, 118],
    yokeY: 116,
  },
  boxy: {
    body: 'M80,80 L80,368 L220,368 L220,80 Z',
    longSleeveLeft: 'M80,80 L28,312 L52,322 L95,115 Z',
    longSleeveRight: 'M220,80 L272,312 L248,322 L205,115 Z',
    shortSleeveLeft: 'M80,80 L35,170 L57,180 L97,108 Z',
    shortSleeveRight: 'M220,80 L265,170 L243,180 L203,108 Z',
    cuffLeft: [27, 310, 26, 18],
    cuffRight: [247, 310, 26, 18],
    hem: [80, 354, 140, 14],
    shoulderSeamLeft: [80, 80, 95, 115],
    shoulderSeamRight: [220, 80, 205, 115],
    yokeY: 112,
  },
}

// ---------------------------------------------------------------------------
// Collar renderers
// ---------------------------------------------------------------------------

function StandardCollar({ secondary }: { secondary: string }) {
  return (
    <g>
      {/* Left point collar */}
      <path d="M130,80 L118,68 L148,80" fill={secondary} fillOpacity={0.25} stroke="black" strokeWidth={1.5} strokeLinejoin="round" />
      {/* Right point collar */}
      <path d="M170,80 L182,68 L152,80" fill={secondary} fillOpacity={0.25} stroke="black" strokeWidth={1.5} strokeLinejoin="round" />
      {/* Collar band */}
      <rect x={130} y={78} width={40} height={6} fill={secondary} fillOpacity={0.4} stroke="black" strokeWidth={1.5} />
    </g>
  )
}

function BandCollar({ secondary }: { secondary: string }) {
  return (
    <g>
      {/* Mao / band collar — simple standing band, no points */}
      <rect x={128} y={65} width={44} height={15} rx={2} fill={secondary} fillOpacity={0.4} stroke="black" strokeWidth={2} />
    </g>
  )
}

function SpreadCollar({ secondary }: { secondary: string }) {
  return (
    <g>
      {/* Left spread collar — wider angle */}
      <path d="M128,80 L108,62 L148,80" fill={secondary} fillOpacity={0.25} stroke="black" strokeWidth={1.5} strokeLinejoin="round" />
      {/* Right spread collar — wider angle */}
      <path d="M172,80 L192,62 L152,80" fill={secondary} fillOpacity={0.25} stroke="black" strokeWidth={1.5} strokeLinejoin="round" />
      {/* Collar band */}
      <rect x={130} y={78} width={40} height={6} fill={secondary} fillOpacity={0.4} stroke="black" strokeWidth={1.5} />
    </g>
  )
}

// ---------------------------------------------------------------------------
// Button placket
// ---------------------------------------------------------------------------

function ButtonPlacket() {
  // 5 buttons evenly spaced between y=95 and y=340
  const buttonYStart = 95
  const buttonYEnd = 340
  const buttonCount = 5
  const step = (buttonYEnd - buttonYStart) / (buttonCount - 1)
  const buttons = Array.from({ length: buttonCount }, (_, i) => buttonYStart + i * step)

  return (
    <g>
      {/* Centre front placket line */}
      <line x1={150} y1={80} x2={150} y2={365} stroke="black" strokeWidth={1} strokeDasharray="none" />
      {/* Placket stitch lines — narrow channel either side */}
      <line x1={144} y1={84} x2={144} y2={360} stroke="black" strokeWidth={1} strokeDasharray="3,2" opacity={0.5} />
      <line x1={156} y1={84} x2={156} y2={360} stroke="black" strokeWidth={1} strokeDasharray="3,2" opacity={0.5} />
      {/* Buttons */}
      {buttons.map((y, i) => (
        <circle key={i} cx={150} cy={y} r={3.5} fill="none" stroke="black" strokeWidth={1.5} />
      ))}
    </g>
  )
}

// ---------------------------------------------------------------------------
// Chest pocket
// ---------------------------------------------------------------------------

function ChestPocket({ secondary }: { secondary: string }) {
  return (
    <g>
      {/* Pocket flap — filled with secondary at low opacity */}
      <path d="M100,178 L136,178 L136,188 L100,188 Z" fill={secondary} fillOpacity={0.3} stroke="black" strokeWidth={1} />
      {/* Pocket body */}
      <rect x={100} y={178} width={36} height={38} rx={2} fill="none" stroke="black" strokeWidth={1.5} />
      {/* Pocket stitching */}
      <rect x={102} y={180} width={32} height={34} rx={1} fill="none" stroke="black" strokeWidth={1} strokeDasharray="3,2" opacity={0.6} />
    </g>
  )
}

// ---------------------------------------------------------------------------
// Embroidery mark
// ---------------------------------------------------------------------------

function EmbroideryMark({ secondary }: { secondary: string }) {
  return (
    <text x={175} y={205} fontSize={10} fill={secondary} fontFamily="serif" textAnchor="middle">
      ✦
    </text>
  )
}

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

export default function ShirtPreview({ state }: Props) {
  const { silhouette, colour, details } = state
  const primary = colour.primary
  const secondary = colour.secondary

  const s = SILHOUETTES[silhouette] ?? SILHOUETTES.regular
  const isLong = details.sleeve === 'long'

  const sleevePath = isLong
    ? { left: s.longSleeveLeft, right: s.longSleeveRight }
    : { left: s.shortSleeveLeft, right: s.shortSleeveRight }

  const collarProps = { secondary }

  return (
    <svg
      viewBox="0 0 300 400"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: '100%', height: '100%' }}
      aria-label="Shirt technical flat"
    >
      {/* ------------------------------------------------------------------ */}
      {/* 1. Colour fill layer — behind all outlines                          */}
      {/* ------------------------------------------------------------------ */}
      <g fill={primary} opacity={0.35} stroke="none">
        <path d={s.body} />
        <path d={sleevePath.left} />
        <path d={sleevePath.right} />
      </g>

      {/* ------------------------------------------------------------------ */}
      {/* 2. Secondary colour accents (hem band, cuffs)                       */}
      {/* ------------------------------------------------------------------ */}
      {/* Hem band */}
      <rect
        x={s.hem[0]} y={s.hem[1]} width={s.hem[2]} height={s.hem[3]}
        fill={secondary} opacity={0.75} stroke="none"
      />

      {/* Cuffs — long sleeve only */}
      {isLong && (
        <>
          <rect
            x={s.cuffLeft[0]} y={s.cuffLeft[1]} width={s.cuffLeft[2]} height={s.cuffLeft[3]}
            fill={secondary} opacity={0.75} stroke="none"
          />
          <rect
            x={s.cuffRight[0]} y={s.cuffRight[1]} width={s.cuffRight[2]} height={s.cuffRight[3]}
            fill={secondary} opacity={0.75} stroke="none"
          />
        </>
      )}

      {/* ------------------------------------------------------------------ */}
      {/* 3. Outer silhouette — stroke only                                   */}
      {/* ------------------------------------------------------------------ */}
      <g fill="none" stroke="black" strokeWidth={2.5} strokeLinejoin="round" strokeLinecap="round">
        <path d={s.body} />
        <path d={sleevePath.left} />
        <path d={sleevePath.right} />
      </g>

      {/* ------------------------------------------------------------------ */}
      {/* 4. Interior seams (strokeWidth 1.5)                                 */}
      {/* ------------------------------------------------------------------ */}
      <g fill="none" stroke="black" strokeWidth={1.5} strokeLinecap="round">
        {/* Armhole curves — where sleeve meets body */}
        <path d={`M${s.shoulderSeamLeft[0]},${s.shoulderSeamLeft[1]} Q${s.shoulderSeamLeft[0] - 6},${s.shoulderSeamLeft[1] + 20} ${s.shoulderSeamLeft[2]},${s.shoulderSeamLeft[3]}`} />
        <path d={`M${s.shoulderSeamRight[0]},${s.shoulderSeamRight[1]} Q${s.shoulderSeamRight[0] + 6},${s.shoulderSeamRight[1] + 20} ${s.shoulderSeamRight[2]},${s.shoulderSeamRight[3]}`} />
      </g>

      {/* ------------------------------------------------------------------ */}
      {/* 5. Construction details (strokeWidth 1)                             */}
      {/* ------------------------------------------------------------------ */}
      <g fill="none" stroke="black" strokeWidth={1} strokeLinecap="round">
        {/* Side seams — faint inner lines */}
        <line x1={150} y1={80} x2={150} y2={370} opacity={0.1} />
      </g>

      {/* ------------------------------------------------------------------ */}
      {/* 6. Stitching lines (dashed, strokeWidth 1)                          */}
      {/* ------------------------------------------------------------------ */}
      <g fill="none" stroke="black" strokeWidth={1} strokeDasharray="3,2" strokeLinecap="round">
        {/* Shoulder seams — always visible */}
        <line
          x1={s.shoulderSeamLeft[0]} y1={s.shoulderSeamLeft[1]}
          x2={s.shoulderSeamLeft[2]} y2={s.shoulderSeamLeft[3]}
          opacity={0.7}
        />
        <line
          x1={s.shoulderSeamRight[0]} y1={s.shoulderSeamRight[1]}
          x2={s.shoulderSeamRight[2]} y2={s.shoulderSeamRight[3]}
          opacity={0.7}
        />
        {/* Back yoke hint — subtle horizontal dashed line */}
        <line x1={88} y1={s.yokeY} x2={212} y2={s.yokeY} opacity={0.5} strokeDasharray="4,3" />
        {/* Hem stitch line */}
        <line x1={s.hem[0] + 2} y1={s.hem[1] + 4} x2={s.hem[0] + s.hem[2] - 2} y2={s.hem[1] + 4} opacity={0.5} />
        {/* Cuff stitch lines — long sleeve only */}
        {isLong && (
          <>
            <line
              x1={s.cuffLeft[0] + 2} y1={s.cuffLeft[1] + 4}
              x2={s.cuffLeft[0] + s.cuffLeft[2] - 2} y2={s.cuffLeft[1] + 4}
              opacity={0.5}
            />
            <line
              x1={s.cuffRight[0] + 2} y1={s.cuffRight[1] + 4}
              x2={s.cuffRight[0] + s.cuffRight[2] - 2} y2={s.cuffRight[1] + 4}
              opacity={0.5}
            />
          </>
        )}
      </g>

      {/* ------------------------------------------------------------------ */}
      {/* 7. Collar                                                           */}
      {/* ------------------------------------------------------------------ */}
      {details.collar === 'standard' && <StandardCollar {...collarProps} />}
      {details.collar === 'band' && <BandCollar {...collarProps} />}
      {details.collar === 'spread' && <SpreadCollar {...collarProps} />}

      {/* ------------------------------------------------------------------ */}
      {/* 8. Button placket — always on a collared shirt                      */}
      {/* ------------------------------------------------------------------ */}
      <ButtonPlacket />

      {/* ------------------------------------------------------------------ */}
      {/* 9. Optional details                                                 */}
      {/* ------------------------------------------------------------------ */}
      {details.pocket && <ChestPocket secondary={secondary} />}
      {details.embroidery && <EmbroideryMark secondary={secondary} />}
    </svg>
  )
}
