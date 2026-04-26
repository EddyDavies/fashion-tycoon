/**
 * GarmentPreview — SVG technical flat compositor.
 *
 * Two modes:
 *   'design' — coloured fill layer behind line work (in-game view)
 *   'print'  — B&W line work only + Pantone callout (PDF tech pack page)
 *
 * SVG COORDINATE SYSTEM: viewBox="0 0 400 560"
 * All silhouette paths must share this viewBox so detail layers align.
 *
 * PLACEHOLDER PATHS: The silhouette paths below are stand-ins. Replace
 * with real assets from the SVG pipeline (see architecture.md §SVG system).
 */

import React from 'react'
import type { DesignState } from '../state/designState'
import { hexToNearestPantone } from '../utils/hexToPantone'

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type GarmentPreviewMode = 'design' | 'print'

interface GarmentPreviewProps {
  state: DesignState
  mode?: GarmentPreviewMode
}

// ---------------------------------------------------------------------------
// Placeholder SVG paths (400×560 viewBox)
// ---------------------------------------------------------------------------
// Outer silhouette — closed path used as clip boundary and fill region.
// Approximates a regular-fit hoodie front view.
const HOODIE_BODY = `
  M 152,60
  Q 176,10 200,8 Q 224,10 248,60
  L 336,96 L 358,148 L 392,166 L 376,296 L 332,278
  L 332,516 L 68,516
  L 68,278 L 24,296 L 8,166
  L 42,148 L 64,96
  Z
`.trim()

// Interior construction lines (seams, hems, stitching)
const HOOD_CENTER_SEAM = 'M 200,8 L 200,60'
const HOOD_CHANNEL = `
  M 152,60 Q 176,80 200,82 Q 224,80 248,60
`.trim()
const SHOULDER_SEAM_L = 'M 64,96 L 110,120'
const SHOULDER_SEAM_R = 'M 336,96 L 290,120'
const HEM_LINE = 'M 68,516 L 332,516'
const CUFF_L = 'M 24,296 L 68,278'
const CUFF_R = 'M 376,296 L 332,278'

// Detail overlays — toggled by DesignState.details
const KANGAROO_POCKET = `
  M 148,328 Q 148,310 168,308 L 232,308 Q 252,310 252,328
  L 252,404 Q 252,418 232,420 L 168,420 Q 148,418 148,404
  Z
`.trim()
const KANGAROO_POCKET_STITCH = `
  M 154,332 Q 154,316 170,314 L 230,314 Q 246,316 246,332
  L 246,400 Q 246,412 230,414 L 170,414 Q 154,412 154,400
  Z
`.trim()

const ZIPPER_LINE = 'M 200,82 L 200,320'
const ZIPPER_PULL = 'M 192,250 L 208,250 L 208,268 L 192,268 Z'

const DRAWSTRING_L = 'M 170,68 C 168,90 164,110 160,140'
const DRAWSTRING_R = 'M 230,68 C 232,90 236,110 240,140'

// ---------------------------------------------------------------------------
// Colour fill helpers
// ---------------------------------------------------------------------------

type ColourState = DesignState['colour']

function adjustHex(hex: string, factor: number): string {
  const [r, g, b] = [0, 2, 4].map(i =>
    Math.min(255, Math.max(0, Math.round(parseInt(hex.slice(i + 1, i + 3), 16) * factor)))
  )
  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`
}

function PatternDefs({ colour }: { colour: ColourState }) {
  const { pattern, primary, secondary } = colour

  if (pattern === 'gradient') {
    return (
      <linearGradient id="colour-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor={primary} />
        <stop offset="100%" stopColor={secondary} />
      </linearGradient>
    )
  }

  if (pattern === 'stripe') {
    return (
      // patternUnits="userSpaceOnUse" + width=400 locks stripes to horizontal
      <pattern id="colour-stripe" patternUnits="userSpaceOnUse" x="0" y="0" width="400" height="36">
        <rect x="0" y="0" width="400" height="18" fill={primary} />
        <rect x="0" y="18" width="400" height="18" fill={secondary} />
      </pattern>
    )
  }

  if (pattern === 'camo') {
    // Tile-based camo: organic blob shapes in a 120×120 tile.
    // dark1/dark2 are darkened variants of primary for depth.
    const dark1 = adjustHex(primary, 0.7)
    const dark2 = adjustHex(secondary, 0.75)
    return (
      <pattern id="colour-camo" patternUnits="userSpaceOnUse" x="0" y="0" width="120" height="120">
        <rect width="120" height="120" fill={secondary} />
        {/* Layer of primary blobs */}
        <ellipse cx="18"  cy="22"  rx="22" ry="13" fill={primary}  transform="rotate(-25,18,22)" />
        <ellipse cx="72"  cy="18"  rx="18" ry="11" fill={primary}  transform="rotate(15,72,18)" />
        <ellipse cx="100" cy="55"  rx="24" ry="12" fill={primary}  transform="rotate(-10,100,55)" />
        <ellipse cx="38"  cy="78"  rx="16" ry="22" fill={primary}  transform="rotate(35,38,78)" />
        <ellipse cx="88"  cy="95"  rx="20" ry="11" fill={primary}  transform="rotate(-20,88,95)" />
        {/* Darker accent patches */}
        <ellipse cx="45"  cy="35"  rx="12" ry="8"  fill={dark1}   transform="rotate(20,45,35)" opacity={0.8} />
        <ellipse cx="10"  cy="75"  rx="10" ry="14" fill={dark1}   transform="rotate(-15,10,75)" opacity={0.8} />
        <ellipse cx="108" cy="25"  rx="9"  ry="12" fill={dark2}   transform="rotate(30,108,25)" opacity={0.7} />
        <ellipse cx="60"  cy="105" rx="14" ry="9"  fill={dark2}   transform="rotate(-5,60,105)" opacity={0.7} />
      </pattern>
    )
  }

  return null
}

function ColourFill({ colour }: { colour: ColourState }) {
  const { pattern, primary, secondary } = colour
  const fullRect = <rect x="0" y="0" width="400" height="560" />

  switch (pattern) {
    case 'solid':
      return React.cloneElement(fullRect, { fill: primary })

    case 'gradient':
      return React.cloneElement(fullRect, { fill: 'url(#colour-gradient)' })

    case 'stripe':
      return React.cloneElement(fullRect, { fill: 'url(#colour-stripe)' })

    case 'graphic':
      // Colour-block: primary body, secondary chest panel (≈yoke height).
      // Represents a garment with contrasting printed chest graphic.
      // The AI render will show the actual graphic artwork.
      return (
        <>
          {React.cloneElement(fullRect, { fill: primary })}
          <rect x="0" y="148" width="400" height="96" fill={secondary} />
        </>
      )

    case 'camo':
      return React.cloneElement(fullRect, { fill: 'url(#colour-camo)' })
  }
}

// ---------------------------------------------------------------------------
// Pantone callout (print mode — top-right corner of flats page)
// ---------------------------------------------------------------------------
// Standard tech pack placement: primary colour chip + Pantone code stacked
// in the top-right corner. Secondary chip shown below if different.

interface PantoneCalloutProps {
  colour: ColourState
}

function PantoneCallout({ colour }: PantoneCalloutProps) {
  const primary = hexToNearestPantone(colour.primary)
  const secondary = hexToNearestPantone(colour.secondary)
  const showSecondary = colour.pattern !== 'solid' && colour.secondary !== colour.primary

  // Positioned at top-right of 400×560 viewBox
  const ox = 284 // left edge of callout block
  const oy = 18  // top edge

  return (
    <g fontFamily="'Helvetica Neue', Arial, sans-serif" fontSize="8">
      {/* ---- Primary colour ---- */}
      <rect x={ox} y={oy} width="28" height="28" fill={colour.primary} stroke="#000" strokeWidth="0.5" />
      <text x={ox + 34} y={oy + 10} fontSize="7" fill="#555" letterSpacing="0.05em">PRIMARY</text>
      <text x={ox + 34} y={oy + 20} fontSize="8.5" fontWeight="bold" fill="#000">
        {primary.code}
      </text>
      <text x={ox + 34} y={oy + 30} fontSize="7" fill="#444">
        {colour.primary.toUpperCase()}
      </text>

      {/* ---- Secondary colour (non-solid patterns only) ---- */}
      {showSecondary && (
        <>
          <rect x={ox} y={oy + 40} width="28" height="28" fill={colour.secondary} stroke="#000" strokeWidth="0.5" />
          <text x={ox + 34} y={oy + 50} fontSize="7" fill="#555" letterSpacing="0.05em">SECONDARY</text>
          <text x={ox + 34} y={oy + 60} fontSize="8.5" fontWeight="bold" fill="#000">
            {secondary.code}
          </text>
          <text x={ox + 34} y={oy + 70} fontSize="7" fill="#444">
            {colour.secondary.toUpperCase()}
          </text>
        </>
      )}

      {/* Accuracy note — small, below chips */}
      <text
        x={ox}
        y={oy + (showSecondary ? 88 : 48)}
        fontSize="6"
        fill="#888"
      >
        Confirm vs. physical Pantone TCX swatch
      </text>
    </g>
  )
}

// ---------------------------------------------------------------------------
// Outline layer — the technical flat itself
// ---------------------------------------------------------------------------

interface OutlineLayerProps {
  state: DesignState
}

function OutlineLayer({ state }: OutlineLayerProps) {
  const { details } = state
  return (
    <g fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round">
      {/* Outer silhouette — heaviest stroke */}
      <path d={HOODIE_BODY} strokeWidth={2.5} />

      {/* Hood construction lines */}
      <path d={HOOD_CENTER_SEAM} strokeWidth={1.5} />
      <path d={HOOD_CHANNEL} strokeWidth={1} />

      {/* Shoulder seams */}
      <path d={SHOULDER_SEAM_L} strokeWidth={1.5} />
      <path d={SHOULDER_SEAM_R} strokeWidth={1.5} />

      {/* Hem & cuffs */}
      <path d={HEM_LINE} strokeWidth={1.5} />
      <path d={CUFF_L} strokeWidth={1.5} />
      <path d={CUFF_R} strokeWidth={1.5} />

      {/* ---- Conditional details ---- */}

      {details.pocket === 'kangaroo' && (
        <>
          <path d={KANGAROO_POCKET} strokeWidth={1.5} />
          {/* Topstitch — dashed, offset inward */}
          <path d={KANGAROO_POCKET_STITCH} strokeWidth={1} strokeDasharray="3,2" />
        </>
      )}

      {details.zipper && (
        <>
          <path d={ZIPPER_LINE} strokeWidth={1} />
          <path d={ZIPPER_PULL} strokeWidth={1} />
        </>
      )}

      {details.drawstrings && (
        <>
          <path d={DRAWSTRING_L} strokeWidth={1} strokeDasharray="4,2" />
          <path d={DRAWSTRING_R} strokeWidth={1} strokeDasharray="4,2" />
        </>
      )}
    </g>
  )
}

// ---------------------------------------------------------------------------
// GarmentPreview — public component
// ---------------------------------------------------------------------------

export function GarmentPreview({ state, mode = 'design' }: GarmentPreviewProps) {
  const isDesign = mode === 'design'

  return (
    <svg
      viewBox="0 0 400 560"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: '100%', height: '100%' }}
      role="img"
      aria-label={`${state.garmentType} technical flat — ${mode} view`}
    >
      <defs>
        {/* Clip boundary: all colour fill is masked to the garment silhouette */}
        <clipPath id="garment-clip">
          <path d={HOODIE_BODY} />
        </clipPath>

        {/* Pattern/gradient defs — design mode only */}
        {isDesign && <PatternDefs colour={state.colour} />}
      </defs>

      {/* 1. Colour fill layer — sits behind line work, design mode only */}
      {isDesign && (
        <g clipPath="url(#garment-clip)" opacity={0.82}>
          <ColourFill colour={state.colour} />
        </g>
      )}

      {/* 2. Technical outline — always shown (B&W in print mode) */}
      <OutlineLayer state={state} />

      {/* 3. Pantone callout — print mode only */}
      {!isDesign && <PantoneCallout colour={state.colour} />}
    </svg>
  )
}
