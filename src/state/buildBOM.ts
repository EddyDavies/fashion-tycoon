import type { DesignState } from './designState'
import { isHoodie, isTshirt, isShirt } from './designState'
import { hexToPantone } from '../utils/hexToPantone'

// ─── Types ────────────────────────────────────────────────────────────────────

export type BOMItemCategory =
  | 'fabric'
  | 'lining'
  | 'trim'
  | 'hardware'
  | 'thread'
  | 'label'
  | 'packaging'

export type BOMItem = {
  id: string
  category: BOMItemCategory
  description: string
  composition?: string
  weight?: string    // e.g. '320 GSM'
  width?: string     // e.g. '60 in (152 cm)'
  quantity: string   // e.g. '2.2 m' or '1 unit'
  colour?: string    // Pantone reference or descriptor
  supplier?: string
  notes?: string
}

export type ColourRef = {
  hex: string
  pantone: string
}

export type BOM = {
  items: BOMItem[]
  primaryColour: ColourRef
  secondaryColour: ColourRef
}

// ─── Pantone TCX lookup + CIEDE2000 ──────────────────────────────────────────
// chroma-js converts hex → CIE Lab; CIEDE2000 gives perceptually accurate
// nearest match. Pantone® is a trademark of Pantone LLC; codes are approx refs.

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

// CIEDE2000 colour-difference formula. Inputs are CIE Lab triples [L, a, b].
// Values < 2 are imperceptible to most observers.
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
  const RT = -(Math.sin(deg(60 * Math.exp(-(((hbarp - 275) / 25) ** 2))))) * RC

  return Math.sqrt(
    (dLp / SL) ** 2 + (dCp / SC) ** 2 + (dHp / SH) ** 2 + RT * (dCp / SC) * (dHp / SH),
  )
}

// Pre-compute Lab values at module load so each hexToPantone call is fast.
const PANTONE_LAB = PANTONE_TCX.map(e => ({
  ...e,
  lab: chroma(e.hex).lab() as [number, number, number],
}))

export function hexToPantone(hex: string): string {
  const lab = chroma(hex).lab() as [number, number, number]
  let nearest = PANTONE_LAB[0]
  let minDist = Infinity
  for (const entry of PANTONE_LAB) {
    const d = deltaE2000(lab, entry.lab)
    if (d < minDist) { minDist = d; nearest = entry }
  }
  return nearest.name
}

// ─── Material specs ───────────────────────────────────────────────────────────

type MaterialSpec = {
  description: string
  composition: string
  weight: string
  width: string
}

const MATERIAL_SPECS: Record<DesignState['material'], MaterialSpec> = {
  cotton: {
    description: 'French Terry',
    composition: '80% cotton / 20% polyester',
    weight: '320 GSM',
    width: '60 in (152 cm)',
  },
  fleece: {
    description: 'Anti-Pill Polar Fleece',
    composition: '100% polyester',
    weight: '300 GSM',
    width: '58 in (147 cm)',
  },
  technical: {
    description: 'Performance Stretch Woven',
    composition: '88% polyester / 12% spandex',
    weight: '210 GSM',
    width: '57 in (145 cm)',
  },
  denim: {
    description: 'Washed Denim',
    composition: '98% cotton / 2% elastane',
    weight: '11.5 oz (390 GSM)',
    width: '59 in (150 cm)',
  },
}

// ─── Shell fabric consumption (size M) ───────────────────────────────────────
// Per-unit estimates including seam allowance and pattern waste, in metres.
// Hood variants and pocket cuts are absorbed in the hoodie estimates.

type SilhouetteQty = Record<'regular' | 'oversized' | 'boxy', string>

const SHELL_QTY: Record<string, SilhouetteQty> = {
  'hoodie-cotton':    { regular: '2.2 m', oversized: '2.6 m', boxy: '2.4 m' },
  'hoodie-fleece':    { regular: '2.3 m', oversized: '2.7 m', boxy: '2.5 m' },
  'hoodie-technical': { regular: '2.2 m', oversized: '2.6 m', boxy: '2.4 m' },
  'hoodie-denim':     { regular: '2.3 m', oversized: '2.7 m', boxy: '2.5 m' },
  'tshirt-cotton':    { regular: '1.4 m', oversized: '1.7 m', boxy: '1.5 m' },
  'tshirt-fleece':    { regular: '1.5 m', oversized: '1.8 m', boxy: '1.6 m' },
  'tshirt-technical': { regular: '1.4 m', oversized: '1.7 m', boxy: '1.5 m' },
  'tshirt-denim':     { regular: '1.5 m', oversized: '1.8 m', boxy: '1.6 m' },
  'shirt-cotton':     { regular: '1.6 m', oversized: '1.9 m', boxy: '1.7 m' },
  'shirt-fleece':     { regular: '1.7 m', oversized: '2.0 m', boxy: '1.8 m' },
  'shirt-technical':  { regular: '1.6 m', oversized: '1.9 m', boxy: '1.7 m' },
  'shirt-denim':      { regular: '1.7 m', oversized: '2.0 m', boxy: '1.8 m' },
}

// ─── Main export ──────────────────────────────────────────────────────────────

export function buildBOM(state: DesignState): BOM {
  const items: BOMItem[] = []
  let seq = 0
  const nextId = () => `bom-${String(++seq).padStart(3, '0')}`

  const primaryPantone   = hexToPantone(state.colour.primary)
  const secondaryPantone = hexToPantone(state.colour.secondary)

  const spec    = MATERIAL_SPECS[state.material]
  const shellQty = SHELL_QTY[`${state.garmentType}-${state.material}`]?.[state.silhouette] ?? '2.2 m'

  // 1 — Shell fabric
  items.push({
    id: nextId(),
    category: 'fabric',
    description: `Main shell — ${spec.description}`,
    composition: spec.composition,
    weight: spec.weight,
    width: spec.width,
    quantity: shellQty,
    colour: primaryPantone,
  })

  // 2 — Rib knit: cuffs + waistband (hoodie), neckband only (tshirt)
  // Shirts use woven facing, not rib.
  if (!isShirt(state)) {
    items.push({
      id: nextId(),
      category: 'fabric',
      description: 'Rib knit',
      composition: '95% cotton / 5% spandex',
      weight: '300 GSM',
      width: '60 in (152 cm)',
      quantity: isHoodie(state) ? '0.6 m' : '0.3 m',
      colour: primaryPantone,
      notes: isHoodie(state)
        ? 'Cut 2 sleeve cuffs (22 × 14 cm each) + 1 waistband (66 × 14 cm)'
        : 'Cut 1 neckband (54 × 7 cm)',
    })
  }

  // 3 — Garment-type-specific items
  if (isHoodie(state)) {
    if (state.details.pocket === 'split') {
      items.push({
        id: nextId(),
        category: 'lining',
        description: 'Pocket bag lining',
        composition: '65% polyester / 35% cotton',
        weight: '120 GSM',
        width: '60 in (152 cm)',
        quantity: '0.25 m',
        colour: 'Natural / unbleached',
        notes: 'Two pocket bags; each approx. 18 × 22 cm; cut 2 pieces per bag',
      })
    }

    if (state.details.zipper) {
      const zipLen = state.silhouette === 'oversized' ? '70 cm' : '65 cm'
      items.push({
        id: nextId(),
        category: 'hardware',
        description: `Centre-front separating zipper, ${zipLen}, gun-metal finish`,
        quantity: '1 unit',
        colour: 'Gun-metal (or match brand hardware finish)',
        supplier: 'YKK #5 metal open-end (OE) separating',
        notes: 'Confirm finish (gun-metal / antique brass / nickel) at proto stage',
      })
    }

    if (state.details.drawstrings && state.details.hood !== 'none') {
      items.push({
        id: nextId(),
        category: 'trim',
        description: 'Hood drawcord — flat woven, 5 mm wide × 140 cm',
        composition: '100% cotton',
        quantity: '1 length per unit',
        colour: `Colour-matched to ${primaryPantone}`,
        notes: 'Feeds through hood channel; exits both sides of front facing',
      })
      items.push({
        id: nextId(),
        category: 'hardware',
        description: 'Metal aglet tips for drawcord ends',
        quantity: '2 per unit',
        colour: 'Gun-metal',
        notes: 'Match finish to zipper hardware where applicable',
      })
    }

    if (state.details.embroidery) {
      items.push({
        id: nextId(),
        category: 'trim',
        description: 'Embroidery thread — 40-weight rayon',
        composition: '100% rayon',
        weight: '40-weight (135 denier)',
        quantity: 'As required per embroidery file',
        colour: `${secondaryPantone} (accent) / ${primaryPantone} (fill)`,
        supplier: 'Madeira Classic Rayon 40 or Isacord equivalent',
      })
      items.push({
        id: nextId(),
        category: 'trim',
        description: 'Embroidery stabiliser backing',
        composition: '100% polyester non-woven',
        weight: '60 GSM',
        quantity: '1 piece per embroidery area (min. 150 × 150 mm)',
        notes: 'Tear-away for jersey/knit; cut-away for fleece',
      })
    }

  } else if (isTshirt(state)) {
    if (state.details.graphic) {
      items.push({
        id: nextId(),
        category: 'trim',
        description: 'Screen print / DTG graphic',
        quantity: '1 placement per unit',
        notes: 'Plastisol or water-based ink; artwork file required at proto stage',
      })
    }

  } else if (isShirt(state)) {
    items.push({
      id: nextId(),
      category: 'fabric',
      description: 'Collar & cuff interfacing — woven fusible',
      composition: '100% polyester',
      weight: 'Medium weight',
      quantity: '0.3 m',
      notes: 'Applied to collar stand, collar leaf, and cuff pieces',
    })
    items.push({
      id: nextId(),
      category: 'hardware',
      description: 'Buttons — 11 mm resin, 4-hole',
      quantity: 'Approx. 7–9 front placket + 2 cuff per unit',
      colour: `Colour-matched to ${primaryPantone}`,
      notes: 'Confirm finish at proto stage; spare button attached inside hem',
    })
    if (state.details.pocket) {
      items.push({
        id: nextId(),
        category: 'fabric',
        description: 'Chest patch pocket — self-fabric',
        quantity: '1 per unit',
        notes: 'Approx. 14 × 14 cm; bar-tacked at corners',
      })
    }
    if (state.details.embroidery) {
      items.push({
        id: nextId(),
        category: 'trim',
        description: 'Embroidery thread — 40-weight rayon',
        composition: '100% rayon',
        weight: '40-weight (135 denier)',
        quantity: 'As required per embroidery file',
        colour: `${secondaryPantone} (accent) / ${primaryPantone} (fill)`,
        supplier: 'Madeira Classic Rayon 40 or Isacord equivalent',
      })
      items.push({
        id: nextId(),
        category: 'trim',
        description: 'Embroidery stabiliser backing',
        composition: '100% polyester non-woven',
        weight: '60 GSM',
        quantity: '1 piece per embroidery area (min. 150 × 150 mm)',
        notes: 'Cut-away stabiliser recommended for woven fabrics',
      })
    }
  }

  // 4 — Overlock thread (main seams — all garments)
  items.push({
    id: nextId(),
    category: 'thread',
    description: 'Overlock thread — 4-thread overlock, all main seams',
    composition: '100% spun polyester',
    weight: 'Tex 27 (Nm 80/3)',
    quantity: 'Approx. 80 m per unit',
    colour: `Colour-matched to ${primaryPantone}`,
    supplier: 'Coats EPIC or equivalent',
  })

  // 5 — Coverseam / lockstitch thread
  items.push({
    id: nextId(),
    category: 'thread',
    description: isShirt(state)
      ? 'Lockstitch thread — single-needle lockstitch, topstitching and seams'
      : 'Coverseam thread — 3-needle coverseam, hems and rib attachment',
    composition: '100% spun polyester',
    weight: 'Tex 24 (Nm 80/2)',
    quantity: 'Approx. 40 m per unit',
    colour: `Colour-matched to ${primaryPantone}`,
    supplier: 'Coats EPIC or equivalent',
  })

  // 6 — Labels (every garment)
  items.push({
    id: nextId(),
    category: 'label',
    description: 'Main brand label — woven, centre back neck',
    quantity: '1 per unit',
    notes: '60 × 30 mm folded; 2-colour woven; centred at back neck seam',
  })
  items.push({
    id: nextId(),
    category: 'label',
    description: 'Size label — woven tab',
    quantity: '1 per unit',
    notes: '40 × 25 mm; attached below or alongside main label',
  })
  items.push({
    id: nextId(),
    category: 'label',
    description: 'Care & content label — woven or printed satin',
    quantity: '1 per unit',
    notes: '75 × 25 mm folded; ISO care symbols + fibre composition; left side seam placement',
  })

  // 7 — Hang tag + attachment string
  items.push({
    id: nextId(),
    category: 'packaging',
    description: 'Hang tag — duplex artboard',
    quantity: '1 per unit',
    notes: '50 × 80 mm; 350 gsm; brand name, style code, colourway, barcode on reverse',
  })
  items.push({
    id: nextId(),
    category: 'packaging',
    description: 'Tag attachment string — waxed cotton cord',
    quantity: '1 loop (25 cm) per unit',
    notes: 'Black or natural; looped through care label or bartack point',
  })

  // 8 — Polybag
  items.push({
    id: nextId(),
    category: 'packaging',
    description: 'Polybag — clear polypropylene, self-seal',
    quantity: '1 per unit',
    notes: isHoodie(state) ? '35 × 45 cm' : '30 × 40 cm',
  })

  return {
    items,
    primaryColour:   { hex: state.colour.primary,   pantone: primaryPantone },
    secondaryColour: { hex: state.colour.secondary, pantone: secondaryPantone },
  }
}
