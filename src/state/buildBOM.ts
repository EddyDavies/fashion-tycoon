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
