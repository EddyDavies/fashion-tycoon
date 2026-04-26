import type { DesignState } from '../../state/designState'

type Props = { state: DesignState & { garmentType: 'tshirt' } }

// ---------------------------------------------------------------------------
// Silhouette path builders
// ---------------------------------------------------------------------------

type Silhouette = 'regular' | 'oversized' | 'boxy'
type Sleeves = 'short' | 'long' | 'sleeveless'

interface BodyPaths {
  body: string
  sleeveLeft: string | null
  sleeveRight: string | null
  shoulderSeamLeft: string
  shoulderSeamRight: string
  sideSeamLeft: string
  sideSeamRight: string
  sleeveHemLeft: string | null
  sleeveHemRight: string | null
  armholeLeft?: string
  armholeRight?: string
}

function getBodyPaths(silhouette: Silhouette, sleeves: Sleeves, hem: 'straight' | 'curved' | 'cropped'): BodyPaths {
  // Bottom Y varies by hem
  const bottomY = hem === 'cropped' ? 310 : 355

  if (silhouette === 'regular') {
    const bodyPath = `M85,75 L68,${bottomY} L232,${bottomY} L215,75 Z`

    if (sleeves === 'sleeveless') {
      return {
        body: bodyPath,
        sleeveLeft: null,
        sleeveRight: null,
        shoulderSeamLeft: 'M85,75 L100,75',
        shoulderSeamRight: 'M215,75 L200,75',
        sideSeamLeft: `M85,75 L68,${bottomY}`,
        sideSeamRight: `M215,75 L232,${bottomY}`,
        sleeveHemLeft: null,
        sleeveHemRight: null,
        armholeLeft: 'M85,75 Q70,95 68,115',
        armholeRight: 'M215,75 Q230,95 232,115',
      }
    }

    if (sleeves === 'short') {
      return {
        body: bodyPath,
        sleeveLeft: 'M85,75 L42,168 L64,178 L100,105 Z',
        sleeveRight: 'M215,75 L258,168 L236,178 L200,105 Z',
        shoulderSeamLeft: 'M85,75 L100,105',
        shoulderSeamRight: 'M215,75 L200,105',
        sideSeamLeft: `M85,75 L68,${bottomY}`,
        sideSeamRight: `M215,75 L232,${bottomY}`,
        sleeveHemLeft: 'M42,168 L64,178',
        sleeveHemRight: 'M258,168 L236,178',
      }
    }

    // long sleeves
    return {
      body: bodyPath,
      sleeveLeft: 'M85,75 L42,168 L38,330 L60,340 L64,178 L100,105 Z',
      sleeveRight: 'M215,75 L258,168 L262,330 L240,340 L236,178 L200,105 Z',
      shoulderSeamLeft: 'M85,75 L100,105',
      shoulderSeamRight: 'M215,75 L200,105',
      sideSeamLeft: `M85,75 L68,${bottomY}`,
      sideSeamRight: `M215,75 L232,${bottomY}`,
      sleeveHemLeft: 'M38,330 L60,340',
      sleeveHemRight: 'M262,330 L240,340',
    }
  }

  if (silhouette === 'oversized') {
    const bodyPath = `M72,75 L48,${bottomY} L252,${bottomY} L228,75 Z`

    if (sleeves === 'sleeveless') {
      return {
        body: bodyPath,
        sleeveLeft: null,
        sleeveRight: null,
        shoulderSeamLeft: 'M72,75 L90,75',
        shoulderSeamRight: 'M228,75 L210,75',
        sideSeamLeft: `M72,75 L48,${bottomY}`,
        sideSeamRight: `M228,75 L252,${bottomY}`,
        sleeveHemLeft: null,
        sleeveHemRight: null,
        armholeLeft: 'M72,75 Q56,98 55,120',
        armholeRight: 'M228,75 Q244,98 245,120',
      }
    }

    if (sleeves === 'short') {
      return {
        body: bodyPath,
        sleeveLeft: 'M72,75 L22,172 L48,185 L90,108 Z',
        sleeveRight: 'M228,75 L278,172 L252,185 L210,108 Z',
        shoulderSeamLeft: 'M72,75 L90,108',
        shoulderSeamRight: 'M228,75 L210,108',
        sideSeamLeft: `M72,75 L48,${bottomY}`,
        sideSeamRight: `M228,75 L252,${bottomY}`,
        sleeveHemLeft: 'M22,172 L48,185',
        sleeveHemRight: 'M278,172 L252,185',
      }
    }

    // long sleeves
    return {
      body: bodyPath,
      sleeveLeft: 'M72,75 L22,172 L18,338 L44,350 L48,185 L90,108 Z',
      sleeveRight: 'M228,75 L278,172 L282,338 L256,350 L252,185 L210,108 Z',
      shoulderSeamLeft: 'M72,75 L90,108',
      shoulderSeamRight: 'M228,75 L210,108',
      sideSeamLeft: `M72,75 L48,${bottomY}`,
      sideSeamRight: `M228,75 L252,${bottomY}`,
      sleeveHemLeft: 'M18,338 L44,350',
      sleeveHemRight: 'M282,338 L256,350',
    }
  }

  // boxy
  const bodyPath = `M78,75 L78,${bottomY} L222,${bottomY} L222,75 Z`

  if (sleeves === 'sleeveless') {
    return {
      body: bodyPath,
      sleeveLeft: null,
      sleeveRight: null,
      shoulderSeamLeft: 'M78,75 L98,75',
      shoulderSeamRight: 'M222,75 L202,75',
      sideSeamLeft: `M78,75 L78,${bottomY}`,
      sideSeamRight: `M222,75 L222,${bottomY}`,
      sleeveHemLeft: null,
      sleeveHemRight: null,
      armholeLeft: 'M78,75 Q62,96 62,116',
      armholeRight: 'M222,75 Q238,96 238,116',
    }
  }

  if (sleeves === 'short') {
    return {
      body: bodyPath,
      sleeveLeft: 'M78,75 L30,170 L54,182 L98,108 Z',
      sleeveRight: 'M222,75 L270,170 L246,182 L202,108 Z',
      shoulderSeamLeft: 'M78,75 L98,108',
      shoulderSeamRight: 'M222,75 L202,108',
      sideSeamLeft: `M78,75 L78,${bottomY}`,
      sideSeamRight: `M222,75 L222,${bottomY}`,
      sleeveHemLeft: 'M30,170 L54,182',
      sleeveHemRight: 'M270,170 L246,182',
    }
  }

  // boxy long
  return {
    body: bodyPath,
    sleeveLeft: 'M78,75 L30,170 L26,334 L50,346 L54,182 L98,108 Z',
    sleeveRight: 'M222,75 L270,170 L274,334 L250,346 L246,182 L202,108 Z',
    shoulderSeamLeft: 'M78,75 L98,108',
    shoulderSeamRight: 'M222,75 L202,108',
    sideSeamLeft: `M78,75 L78,${bottomY}`,
    sideSeamRight: `M222,75 L222,${bottomY}`,
    sleeveHemLeft: 'M26,334 L50,346',
    sleeveHemRight: 'M274,334 L250,346',
  }
}

// ---------------------------------------------------------------------------
// Neckline path builders
// ---------------------------------------------------------------------------

function getNecklinePath(neckline: 'crew' | 'vneck' | 'scoop'): string {
  switch (neckline) {
    case 'crew':
      return 'M118,75 Q150,96 182,75'
    case 'vneck':
      return 'M118,75 L150,138 L182,75'
    case 'scoop':
      return 'M112,75 Q150,118 188,75'
  }
}

// Closed fill path for neckline cutout shading
function getNecklineFillPath(neckline: 'crew' | 'vneck' | 'scoop'): string {
  switch (neckline) {
    case 'crew':
      return 'M118,75 Q150,96 182,75 Z'
    case 'vneck':
      return 'M118,75 L150,138 L182,75 Z'
    case 'scoop':
      return 'M112,75 Q150,118 188,75 Z'
  }
}

// ---------------------------------------------------------------------------
// Combined fill path for the colour layer (body + sleeves as one region)
// ---------------------------------------------------------------------------

function getCombinedFillPath(paths: BodyPaths): string {
  const parts = [paths.body]
  if (paths.sleeveLeft) parts.push(paths.sleeveLeft)
  if (paths.sleeveRight) parts.push(paths.sleeveRight)
  return parts.join(' ')
}

// ---------------------------------------------------------------------------
// Hem band rect dimensions by silhouette
// ---------------------------------------------------------------------------

function getHemBandProps(silhouette: Silhouette, hem: 'straight' | 'curved' | 'cropped') {
  const bottomY = hem === 'cropped' ? 310 : 355
  const bandHeight = 14

  const widths: Record<Silhouette, { x: number; width: number }> = {
    regular: { x: 68, width: 164 },
    oversized: { x: 48, width: 204 },
    boxy: { x: 78, width: 144 },
  }

  return { y: bottomY - bandHeight, height: bandHeight, ...widths[silhouette] }
}

// ---------------------------------------------------------------------------
// TshirtPreview component
// ---------------------------------------------------------------------------

export default function TshirtPreview({ state }: Props) {
  const { silhouette, colour, details } = state
  const { neckline, sleeves, hem, graphic } = details
  const primary = colour.primary
  const secondary = colour.secondary

  const paths = getBodyPaths(silhouette, sleeves, hem)
  const necklinePath = getNecklinePath(neckline)
  const necklineFillPath = getNecklineFillPath(neckline)
  const combinedFillPath = getCombinedFillPath(paths)
  const hemBand = getHemBandProps(silhouette, hem)
  const bottomY = hem === 'cropped' ? 310 : 355

  // Sleeve cuff band dimensions
  const cuffHeight = 10

  return (
    <svg
      viewBox="0 0 300 400"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: '100%', height: '100%' }}
      role="img"
      aria-label={`T-shirt technical flat — ${silhouette} ${neckline} ${sleeves} sleeve`}
    >
      {/* ------------------------------------------------------------------ */}
      {/* 1. Colour fill layer — semi-transparent primary behind all outlines  */}
      {/* ------------------------------------------------------------------ */}
      <path
        d={combinedFillPath}
        fill={primary}
        opacity={0.35}
        stroke="none"
        fillRule="nonzero"
      />

      {/* ------------------------------------------------------------------ */}
      {/* 2. Neckline fill tint (secondary at very low opacity)               */}
      {/* ------------------------------------------------------------------ */}
      <path
        d={necklineFillPath}
        fill={secondary}
        opacity={0.1}
        stroke="none"
      />

      {/* ------------------------------------------------------------------ */}
      {/* 3. Cropped hem band (secondary at 0.7) — rendered before outlines   */}
      {/* ------------------------------------------------------------------ */}
      {hem === 'cropped' && (
        <rect
          x={hemBand.x}
          y={294}
          width={hemBand.width}
          height={16}
          fill={secondary}
          opacity={0.7}
          stroke="none"
        />
      )}

      {/* ------------------------------------------------------------------ */}
      {/* 4. Hem rib band — always present at bottom of body                  */}
      {/* ------------------------------------------------------------------ */}
      {hem !== 'cropped' && (
        <rect
          x={hemBand.x}
          y={hemBand.y}
          width={hemBand.width}
          height={hemBand.height}
          fill={secondary}
          opacity={0.75}
          stroke="none"
        />
      )}

      {/* ------------------------------------------------------------------ */}
      {/* 5. Sleeve hem (cuff) bands                                          */}
      {/* ------------------------------------------------------------------ */}
      {sleeves === 'short' && silhouette === 'regular' && (
        <>
          {/* Left cuff band along cuff edge */}
          <rect x={42} y={168} width={22} height={cuffHeight} fill={secondary} opacity={0.75} stroke="none" transform="rotate(-25,53,173)" />
          <rect x={236} y={168} width={22} height={cuffHeight} fill={secondary} opacity={0.75} stroke="none" transform="rotate(25,247,173)" />
        </>
      )}
      {sleeves === 'short' && silhouette === 'oversized' && (
        <>
          <rect x={22} y={172} width={26} height={cuffHeight} fill={secondary} opacity={0.75} stroke="none" transform="rotate(-23,35,177)" />
          <rect x={252} y={172} width={26} height={cuffHeight} fill={secondary} opacity={0.75} stroke="none" transform="rotate(23,265,177)" />
        </>
      )}
      {sleeves === 'short' && silhouette === 'boxy' && (
        <>
          <rect x={30} y={170} width={24} height={cuffHeight} fill={secondary} opacity={0.75} stroke="none" transform="rotate(-22,42,175)" />
          <rect x={246} y={170} width={24} height={cuffHeight} fill={secondary} opacity={0.75} stroke="none" transform="rotate(22,258,175)" />
        </>
      )}
      {sleeves === 'long' && silhouette === 'regular' && (
        <>
          <rect x={38} y={330} width={22} height={cuffHeight} fill={secondary} opacity={0.75} stroke="none" transform="rotate(-5,49,335)" />
          <rect x={240} y={330} width={22} height={cuffHeight} fill={secondary} opacity={0.75} stroke="none" transform="rotate(5,251,335)" />
        </>
      )}
      {sleeves === 'long' && silhouette === 'oversized' && (
        <>
          <rect x={18} y={338} width={26} height={cuffHeight} fill={secondary} opacity={0.75} stroke="none" transform="rotate(-4,31,343)" />
          <rect x={256} y={338} width={26} height={cuffHeight} fill={secondary} opacity={0.75} stroke="none" transform="rotate(4,269,343)" />
        </>
      )}
      {sleeves === 'long' && silhouette === 'boxy' && (
        <>
          <rect x={26} y={334} width={24} height={cuffHeight} fill={secondary} opacity={0.75} stroke="none" transform="rotate(-4,38,339)" />
          <rect x={250} y={334} width={24} height={cuffHeight} fill={secondary} opacity={0.75} stroke="none" transform="rotate(4,262,339)" />
        </>
      )}

      {/* ------------------------------------------------------------------ */}
      {/* 6. Graphic chest placement indicator                                */}
      {/* ------------------------------------------------------------------ */}
      {graphic && (
        <g>
          <rect x={120} y={158} width={60} height={60} rx={4} fill={secondary} opacity={0.2} />
          <text
            x={150}
            y={194}
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize={20}
            fill={secondary}
            fontFamily="'Helvetica Neue', Arial, sans-serif"
          >
            ◆
          </text>
        </g>
      )}

      {/* ------------------------------------------------------------------ */}
      {/* 7. Outline layer — technical flat line work                          */}
      {/* ------------------------------------------------------------------ */}
      <g fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round">

        {/* Outer silhouette — heaviest stroke */}
        <path d={paths.body} strokeWidth={2.5} />
        {paths.sleeveLeft && <path d={paths.sleeveLeft} strokeWidth={2.5} />}
        {paths.sleeveRight && <path d={paths.sleeveRight} strokeWidth={2.5} />}

        {/* Armhole curves for sleeveless */}
        {sleeves === 'sleeveless' && paths.armholeLeft && (
          <path d={paths.armholeLeft} strokeWidth={1.5} />
        )}
        {sleeves === 'sleeveless' && paths.armholeRight && (
          <path d={paths.armholeRight} strokeWidth={1.5} />
        )}

        {/* Neckline seam — interior seam weight */}
        <path d={necklinePath} strokeWidth={1.5} />

        {/* Shoulder seams — dashed construction lines */}
        <path
          d={paths.shoulderSeamLeft}
          strokeWidth={1}
          strokeDasharray="3,2"
        />
        <path
          d={paths.shoulderSeamRight}
          strokeWidth={1}
          strokeDasharray="3,2"
        />

        {/* Side seams — subtle interior lines */}
        <path d={paths.sideSeamLeft} strokeWidth={1} />
        <path d={paths.sideSeamRight} strokeWidth={1} />

        {/* Sleeve hem / cuff edge lines */}
        {paths.sleeveHemLeft && (
          <path d={paths.sleeveHemLeft} strokeWidth={1.5} />
        )}
        {paths.sleeveHemRight && (
          <path d={paths.sleeveHemRight} strokeWidth={1.5} />
        )}

        {/* Hem rib band top edge (always) */}
        <line
          x1={hemBand.x}
          y1={hemBand.y}
          x2={hemBand.x + hemBand.width}
          y2={hemBand.y}
          strokeWidth={1}
        />

        {/* Curved hem overlay — additional curved hem line */}
        {hem === 'curved' && (
          <path
            d={`M${hemBand.x},${bottomY} Q150,${bottomY + 17} ${hemBand.x + hemBand.width},${bottomY}`}
            strokeWidth={1}
            strokeDasharray="3,2"
            fill="none"
          />
        )}

        {/* Hem stitching line (always) — dashed stitch just inside hem band */}
        <line
          x1={hemBand.x + 4}
          y1={hemBand.y + 4}
          x2={hemBand.x + hemBand.width - 4}
          y2={hemBand.y + 4}
          strokeWidth={1}
          strokeDasharray="3,2"
        />

      </g>
    </svg>
  )
}
