import type { DesignState } from '../../state/designState'

type Props = { state: DesignState & { garmentType: 'hoodie' } }

// ---------------------------------------------------------------------------
// Silhouette path sets per silhouette variant
// viewBox: 0 0 300 400
// ---------------------------------------------------------------------------

type SilhouetteVariant = 'regular' | 'oversized' | 'boxy'

interface SilhouettePaths {
  body: string
  leftSleeve: string
  rightSleeve: string
  // Cuff rects: [x, y, w, h]
  leftCuff: [number, number, number, number]
  rightCuff: [number, number, number, number]
  // Hem band rect: [x, y, w, h]
  hemBand: [number, number, number, number]
  // Combined fill polygon for colour layer (body + sleeves as separate paths)
  fillPaths: string[]
}

const SILHOUETTES: Record<SilhouetteVariant, SilhouettePaths> = {
  regular: {
    body: 'M80,95 L60,375 L240,375 L220,95 Z',
    leftSleeve: 'M80,95 L30,220 L55,232 L98,128 Z',
    rightSleeve: 'M220,95 L270,220 L245,232 L202,128 Z',
    leftCuff: [28, 218, 30, 14],
    rightCuff: [242, 218, 30, 14],
    hemBand: [60, 359, 180, 16],
    fillPaths: [
      'M80,95 L60,375 L240,375 L220,95 Z',
      'M80,95 L30,220 L55,232 L98,128 Z',
      'M220,95 L270,220 L245,232 L202,128 Z',
    ],
  },
  oversized: {
    body: 'M65,95 L40,382 L260,382 L235,95 Z',
    leftSleeve: 'M65,95 L10,225 L38,242 L88,132 Z',
    rightSleeve: 'M235,95 L290,225 L262,242 L212,132 Z',
    leftCuff: [8, 222, 32, 14],
    rightCuff: [260, 222, 32, 14],
    hemBand: [40, 366, 220, 16],
    fillPaths: [
      'M65,95 L40,382 L260,382 L235,95 Z',
      'M65,95 L10,225 L38,242 L88,132 Z',
      'M235,95 L290,225 L262,242 L212,132 Z',
    ],
  },
  boxy: {
    body: 'M75,95 L75,375 L225,375 L225,95 Z',
    leftSleeve: 'M75,95 L25,218 L50,230 L95,128 Z',
    rightSleeve: 'M225,95 L275,218 L250,230 L205,128 Z',
    leftCuff: [23, 216, 30, 14],
    rightCuff: [247, 216, 30, 14],
    hemBand: [75, 359, 150, 16],
    fillPaths: [
      'M75,95 L75,375 L225,375 L225,95 Z',
      'M75,95 L25,218 L50,230 L95,128 Z',
      'M225,95 L275,218 L250,230 L205,128 Z',
    ],
  },
}

// ---------------------------------------------------------------------------
// Pocket y-position adjustment for oversized silhouette
// ---------------------------------------------------------------------------

function getPocketY(silhouette: SilhouetteVariant): number {
  return silhouette === 'oversized' ? 285 : 268
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function HoodiePreview({ state }: Props) {
  const { silhouette, colour, details } = state
  const { primary, secondary } = colour
  const sil = SILHOUETTES[silhouette]
  const pocketY = getPocketY(silhouette)

  return (
    <svg
      viewBox="0 0 300 400"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: '100%', height: '100%' }}
      role="img"
      aria-label={`Hoodie technical flat — ${silhouette} silhouette`}
    >
      {/* ------------------------------------------------------------------ */}
      {/* 1. Colour fill layer — semi-transparent, behind all outlines         */}
      {/* ------------------------------------------------------------------ */}
      <g opacity={0.35} stroke="none">
        {sil.fillPaths.map((d, i) => (
          <path key={i} d={d} fill={primary} />
        ))}
        {/* Cuffs and hem in secondary colour */}
        <rect
          x={sil.leftCuff[0]}
          y={sil.leftCuff[1]}
          width={sil.leftCuff[2]}
          height={sil.leftCuff[3]}
          fill={secondary}
        />
        <rect
          x={sil.rightCuff[0]}
          y={sil.rightCuff[1]}
          width={sil.rightCuff[2]}
          height={sil.rightCuff[3]}
          fill={secondary}
        />
        <rect
          x={sil.hemBand[0]}
          y={sil.hemBand[1]}
          width={sil.hemBand[2]}
          height={sil.hemBand[3]}
          fill={secondary}
        />
        {/* Hood fill */}
        {details.hood === 'standard' && (
          <path d="M105,97 Q110,30 150,18 Q190,30 195,97 Z" fill={primary} />
        )}
        {details.hood === 'oversized' && (
          <path d="M90,97 Q95,15 150,0 Q205,15 210,97 Z" fill={primary} />
        )}
      </g>

      {/* ------------------------------------------------------------------ */}
      {/* 2. Technical flat outlines                                           */}
      {/* ------------------------------------------------------------------ */}
      <g fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round">
        {/* Outer silhouette — heaviest weight */}
        <path d={sil.body} strokeWidth={2.5} />
        <path d={sil.leftSleeve} strokeWidth={2.5} />
        <path d={sil.rightSleeve} strokeWidth={2.5} />

        {/* Cuff bands — secondary colour fill, seam-weight stroke */}
        <rect
          x={sil.leftCuff[0]}
          y={sil.leftCuff[1]}
          width={sil.leftCuff[2]}
          height={sil.leftCuff[3]}
          fill={secondary}
          stroke="#000"
          strokeWidth={1.5}
        />
        <rect
          x={sil.rightCuff[0]}
          y={sil.rightCuff[1]}
          width={sil.rightCuff[2]}
          height={sil.rightCuff[3]}
          fill={secondary}
          stroke="#000"
          strokeWidth={1.5}
        />

        {/* Hem band — secondary colour fill */}
        <rect
          x={sil.hemBand[0]}
          y={sil.hemBand[1]}
          width={sil.hemBand[2]}
          height={sil.hemBand[3]}
          fill={secondary}
          stroke="#000"
          strokeWidth={1.5}
        />

        {/* Topstitch on hem band — dashed */}
        <line
          x1={sil.hemBand[0] + 4}
          y1={sil.hemBand[1] + 4}
          x2={sil.hemBand[0] + sil.hemBand[2] - 4}
          y2={sil.hemBand[1] + 4}
          strokeWidth={1}
          strokeDasharray="3,2"
        />

        {/* ---- Hood ---- */}
        {details.hood === 'none' && (
          /* Crew neckline curve */
          <path d="M115,95 Q150,82 185,95" strokeWidth={1.5} fill="none" />
        )}

        {details.hood === 'standard' && (
          <>
            <path
              d="M105,97 Q110,30 150,18 Q190,30 195,97"
              strokeWidth={2.5}
              fill={primary}
              fillOpacity={0.35}
            />
            {/* Inner lining curve */}
            <path
              d="M120,97 Q150,80 180,97"
              strokeWidth={3}
              stroke={secondary}
              fill="none"
            />
          </>
        )}

        {details.hood === 'oversized' && (
          <>
            <path
              d="M90,97 Q95,15 150,0 Q205,15 210,97"
              strokeWidth={2.5}
              fill={primary}
              fillOpacity={0.35}
            />
            {/* Inner lining curve */}
            <path
              d="M120,97 Q150,80 180,97"
              strokeWidth={3}
              stroke={secondary}
              fill="none"
            />
          </>
        )}

        {/* ---- Zipper ---- */}
        {details.zipper && (
          <line
            x1={150}
            y1={details.hood === 'none' ? 90 : 97}
            x2={150}
            y2={sil.hemBand[1]}
            strokeWidth={1.5}
            stroke={secondary}
            strokeDasharray="4,3"
          />
        )}

        {/* ---- Pockets ---- */}
        {details.pocket === 'kangaroo' && (
          <>
            <path
              d={`M112,${pocketY} Q150,${pocketY + 27} 188,${pocketY}`}
              strokeWidth={2}
              fill="none"
            />
            {/* Topstitch */}
            <path
              d={`M112,${pocketY} Q150,${pocketY + 27} 188,${pocketY}`}
              strokeWidth={1}
              fill="none"
              strokeDasharray="3,2"
              transform="translate(0, 4)"
            />
          </>
        )}

        {details.pocket === 'split' && (
          <>
            <rect x={98} y={pocketY + 4} width={35} height={24} rx={3} strokeWidth={1.5} fill="none" />
            <rect x={167} y={pocketY + 4} width={35} height={24} rx={3} strokeWidth={1.5} fill="none" />
            {/* Topstitch on split pockets */}
            <rect
              x={101}
              y={pocketY + 7}
              width={29}
              height={18}
              rx={2}
              strokeWidth={1}
              fill="none"
              strokeDasharray="3,2"
            />
            <rect
              x={170}
              y={pocketY + 7}
              width={29}
              height={18}
              rx={2}
              strokeWidth={1}
              fill="none"
              strokeDasharray="3,2"
            />
          </>
        )}

        {/* ---- Drawstrings ---- */}
        {details.drawstrings && details.hood !== 'none' && (
          <>
            <line x1={133} y1={97} x2={123} y2={162} strokeWidth={1} stroke={secondary} />
            <line x1={167} y1={97} x2={177} y2={162} strokeWidth={1} stroke={secondary} />
            <circle cx={123} cy={162} r={3} fill={secondary} stroke={secondary} strokeWidth={1} />
            <circle cx={177} cy={162} r={3} fill={secondary} stroke={secondary} strokeWidth={1} />
          </>
        )}
      </g>

      {/* ------------------------------------------------------------------ */}
      {/* 3. Embroidery mark — rendered above outlines so it's always legible  */}
      {/* ------------------------------------------------------------------ */}
      {details.embroidery && (
        <text
          x={118}
          y={200}
          fontSize={10}
          fill={secondary}
          fontFamily="serif"
          textAnchor="middle"
        >
          ✦
        </text>
      )}
    </svg>
  )
}
