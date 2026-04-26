/**
 * Hex → nearest Pantone TCX (textile) colour lookup.
 *
 * Uses chroma-js for sRGB → CIE Lab conversion (D65, 2° observer),
 * then CIEDE2000 to find the perceptually nearest entry in the lookup table.
 *
 * Accuracy: ±2–10 ΔE from "true" nearest Pantone. Adequate as a starting
 * reference for supplier conversations; always confirm against a physical
 * Pantone TCX fan deck before approving production colour.
 *
 * Pantone® is a trademark of Pantone LLC; codes are approximate references.
 */

import chroma from 'chroma-js'

// ─── Pantone TCX reference table ─────────────────────────────────────────────

type PantoneEntry = { name: string; hex: string }

const PANTONE_TCX: PantoneEntry[] = [
  // Whites / creams
  { name: 'Pantone 11-0601 TCX Bright White',    hex: '#F5F5F5' },
  { name: 'Pantone 13-0002 TCX Marshmallow',     hex: '#F2EDE4' },
  { name: 'Pantone 12-0104 TCX Whitecap Gray',   hex: '#EBE0CE' },
  // Greys
  { name: 'Pantone 14-4102 TCX Glacier Gray',    hex: '#CCCAC0' },
  { name: 'Pantone 15-4101 TCX Silver Bullet',   hex: '#B5B3AC' },
  { name: 'Pantone 16-0207 TCX Elephant Skin',   hex: '#98948C' },
  { name: 'Pantone 17-0000 TCX Neutral Gray',    hex: '#807D78' },
  { name: 'Pantone 18-0201 TCX Castlerock',      hex: '#6A6962' },
  { name: 'Pantone 18-0306 TCX Charcoal Gray',   hex: '#4C4844' },
  { name: 'Pantone 19-0303 TCX Forged Iron',     hex: '#383530' },
  // Blacks
  { name: 'Pantone 19-4005 TCX Black Beauty',    hex: '#1C1C1C' },
  // Yellows
  { name: 'Pantone 12-0752 TCX Banana Cream',    hex: '#F5E280' },
  { name: 'Pantone 13-0858 TCX Primrose Yellow', hex: '#F8D068' },
  { name: 'Pantone 14-0846 TCX Amber Yellow',    hex: '#E8B84A' },
  // Oranges
  { name: 'Pantone 14-1048 TCX Mango',           hex: '#F5A030' },
  { name: 'Pantone 15-1157 TCX Vibrant Orange',  hex: '#F87830' },
  { name: 'Pantone 16-1546 TCX Flame',           hex: '#F05828' },
  // Reds
  { name: 'Pantone 17-1563 TCX Cherry Tomato',   hex: '#E83020' },
  { name: 'Pantone 18-1663 TCX True Red',        hex: '#C02020' },
  { name: 'Pantone 17-1544 TCX Rust',            hex: '#B85030' },
  { name: 'Pantone 17-1935 TCX Hibiscus',        hex: '#D03040' },
  // Pinks
  { name: 'Pantone 13-1520 TCX Rose Quartz',     hex: '#F0C0C0' },
  { name: 'Pantone 14-1912 TCX Pink Lemonade',   hex: '#F0A0B0' },
  { name: 'Pantone 15-1512 TCX Dusty Pink',      hex: '#D0A0A0' },
  { name: 'Pantone 17-1513 TCX Mauve',           hex: '#C09090' },
  // Purples
  { name: 'Pantone 15-3810 TCX Pastel Lavender', hex: '#C8B0D8' },
  { name: 'Pantone 16-3520 TCX Lilac',           hex: '#B898C8' },
  { name: 'Pantone 17-3628 TCX Amethyst',        hex: '#9060B0' },
  { name: 'Pantone 18-3628 TCX Violet',          hex: '#8050A8' },
  { name: 'Pantone 19-3536 TCX Purple',          hex: '#502880' },
  // Blues
  { name: 'Pantone 14-4318 TCX Baby Blue',       hex: '#88C8F0' },
  { name: 'Pantone 15-4020 TCX Cerulean',        hex: '#90C0E0' },
  { name: 'Pantone 16-4132 TCX Blithe',          hex: '#80A8C8' },
  { name: 'Pantone 17-4328 TCX Marina',          hex: '#5090C0' },
  { name: 'Pantone 18-4140 TCX Regatta',         hex: '#4878A8' },
  { name: 'Pantone 19-4050 TCX Federal Blue',    hex: '#2840A0' },
  { name: 'Pantone 19-3748 TCX Blue Iris',       hex: '#303898' },
  { name: 'Pantone 19-4340 TCX Navy Peony',      hex: '#192858' },
  { name: 'Pantone 19-4024 TCX Classic Navy',    hex: '#182030' },
  // Teal / turquoise
  { name: 'Pantone 13-5412 TCX Aquamarine',      hex: '#70D0C8' },
  { name: 'Pantone 14-5416 TCX Turquoise',       hex: '#68C0B8' },
  { name: 'Pantone 17-5126 TCX Viridian Green',  hex: '#3A9080' },
  // Greens
  { name: 'Pantone 13-0340 TCX Lime Green',      hex: '#C8E050' },
  { name: 'Pantone 15-0343 TCX Calla Green',     hex: '#90B858' },
  { name: 'Pantone 15-0315 TCX Sage',            hex: '#B0B898' },
  { name: 'Pantone 16-0430 TCX Foliage',         hex: '#88A860' },
  { name: 'Pantone 16-0906 TCX Khaki',           hex: '#A8A060' },
  { name: 'Pantone 17-0535 TCX Pesto',           hex: '#607838' },
  { name: 'Pantone 18-0430 TCX Trekking Green',  hex: '#487040' },
  { name: 'Pantone 19-0230 TCX Bottle Green',    hex: '#2A4028' },
  { name: 'Pantone 19-5420 TCX Pine Needle',     hex: '#203028' },
  // Camels / browns
  { name: 'Pantone 13-0909 TCX Maple Sugar',     hex: '#E0B888' },
  { name: 'Pantone 14-1031 TCX Amber Gold',      hex: '#D89838' },
  { name: 'Pantone 16-1327 TCX Camel',           hex: '#C88050' },
  { name: 'Pantone 17-1328 TCX Caramel',         hex: '#B86830' },
  { name: 'Pantone 17-1518 TCX Adobe',           hex: '#C07058' },
  { name: 'Pantone 18-1244 TCX Brown Sugar',     hex: '#9A5028' },
  { name: 'Pantone 18-0832 TCX Tortoise Shell',  hex: '#906030' },
  { name: 'Pantone 19-0916 TCX Coffee Bean',     hex: '#503020' },
  { name: 'Pantone 19-1118 TCX Toasted Coconut', hex: '#402818' },
]

// ─── CIEDE2000 ────────────────────────────────────────────────────────────────

function deltaE2000(lab1: [number, number, number], lab2: [number, number, number]): number {
  const [L1, a1, b1] = lab1
  const [L2, a2, b2] = lab2
  const C1 = Math.sqrt(a1 ** 2 + b1 ** 2)
  const C2 = Math.sqrt(a2 ** 2 + b2 ** 2)
  const Cbar7 = ((C1 + C2) / 2) ** 7
  const G = 0.5 * (1 - Math.sqrt(Cbar7 / (Cbar7 + 25 ** 7)))
  const a1p = a1 * (1 + G), a2p = a2 * (1 + G)
  const C1p = Math.sqrt(a1p ** 2 + b1 ** 2)
  const C2p = Math.sqrt(a2p ** 2 + b2 ** 2)
  const toHp = (bp: number, ap: number) => {
    const h = Math.atan2(bp, ap) * (180 / Math.PI)
    return h >= 0 ? h : h + 360
  }
  const h1p = toHp(b1, a1p), h2p = toHp(b2, a2p)
  const dLp = L2 - L1
  const dCp = C2p - C1p
  let dhp = 0
  if (C1p * C2p !== 0) {
    if (Math.abs(h2p - h1p) <= 180)    dhp = h2p - h1p
    else if (h2p <= h1p)               dhp = h2p - h1p + 360
    else                               dhp = h2p - h1p - 360
  }
  const dHp = 2 * Math.sqrt(C1p * C2p) * Math.sin((dhp / 2) * (Math.PI / 180))
  const Lbarp = (L1 + L2) / 2
  const Cbarp = (C1p + C2p) / 2
  let hbarp = h1p + h2p
  if (C1p * C2p !== 0) {
    if (Math.abs(h1p - h2p) <= 180)         hbarp = (h1p + h2p) / 2
    else if (h1p + h2p < 360)               hbarp = (h1p + h2p + 360) / 2
    else                                     hbarp = (h1p + h2p - 360) / 2
  }
  const deg = (x: number) => x * (Math.PI / 180)
  const T = 1
    - 0.17 * Math.cos(deg(hbarp - 30))
    + 0.24 * Math.cos(deg(2 * hbarp))
    + 0.32 * Math.cos(deg(3 * hbarp + 6))
    - 0.20 * Math.cos(deg(4 * hbarp - 63))
  const SL = 1 + 0.015 * (Lbarp - 50) ** 2 / Math.sqrt(20 + (Lbarp - 50) ** 2)
  const SC = 1 + 0.045 * Cbarp
  const SH = 1 + 0.015 * Cbarp * T
  const Cbarp7 = Cbarp ** 7
  const RC = 2 * Math.sqrt(Cbarp7 / (Cbarp7 + 25 ** 7))
  const RT = -(Math.sin(deg(60 * Math.exp(-Math.pow((hbarp - 275) / 25, 2)))) * RC)
  return Math.sqrt((dLp / SL) ** 2 + (dCp / SC) ** 2 + (dHp / SH) ** 2 + RT * (dCp / SC) * (dHp / SH))
}

// Pre-compute Lab values at module load using chroma-js (D65/2° observer).
const PANTONE_LAB = PANTONE_TCX.map(e => ({
  ...e,
  lab: chroma(e.hex).lab() as [number, number, number],
}))

// ─── Public API ───────────────────────────────────────────────────────────────

export interface PantoneMatch {
  name: string    // e.g. "Pantone 19-4024 TCX Classic Navy"
  hex: string     // reference hex from the lookup table
  deltaE: number  // CIEDE2000 distance — < 2 imperceptible, 2–5 close, > 10 loose ref
}

/** Returns the nearest Pantone TCX entry for a given hex colour, with distance. */
export function hexToNearestPantone(hex: string): PantoneMatch {
  const lab = chroma(hex).lab() as [number, number, number]
  let best = PANTONE_LAB[0]
  let bestDelta = Infinity
  for (const entry of PANTONE_LAB) {
    const d = deltaE2000(lab, entry.lab)
    if (d < bestDelta) { bestDelta = d; best = entry }
  }
  return { name: best.name, hex: best.hex, deltaE: bestDelta }
}

/** Returns the Pantone name string for use in BOM / tech pack copy. */
export function hexToPantone(hex: string): string {
  return hexToNearestPantone(hex).name
}
