import type { DesignState } from './designState'

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
  weight?: string    // e.g. '320 GSM' or '0.9–1.1 mm'
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

// ─── Pantone TCX approximate lookup ──────────────────────────────────────────
// Nearest match via Euclidean RGB distance — sufficient for sample-stage refs.
// For production accuracy replace with CIE ΔE2000 distance in Lab colour space.
// Pantone® is a trademark of Pantone LLC; codes listed here are approximations.

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

function hexToRgb(hex: string): [number, number, number] {
  const c = hex.replace('#', '')
  return [parseInt(c.slice(0, 2), 16), parseInt(c.slice(2, 4), 16), parseInt(c.slice(4, 6), 16)]
}

export function hexToPantone(hex: string): string {
  const [r, g, b] = hexToRgb(hex)
  let nearest = PANTONE_TCX[0]
  let minDist = Infinity
  for (const entry of PANTONE_TCX) {
    const [pr, pg, pb] = hexToRgb(entry.hex)
    const dist = (r - pr) ** 2 + (g - pg) ** 2 + (b - pb) ** 2
    if (dist < minDist) { minDist = dist; nearest = entry }
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
  leather: {
    description: 'Full-Grain Nappa Leather',
    composition: '100% genuine lambskin',
    weight: '0.9–1.1 mm thickness',
    width: 'N/A — sold by sq ft',
  },
}

// ─── Shell fabric consumption (size M) ───────────────────────────────────────
// Quantities are per-unit estimates including seam allowance and pattern waste.
// Leather in sq ft (hide units); all other materials in metres at stated width.
// Hood variants and pocket cuts are absorbed in these estimates.

const SHELL_QTY: Record<string, Record<DesignState['silhouette'], string>> = {
  'hoodie-cotton':    { cropped: '1.8 m', regular: '2.2 m', oversized: '2.6 m', boxy: '2.4 m' },
  'hoodie-fleece':    { cropped: '1.9 m', regular: '2.3 m', oversized: '2.7 m', boxy: '2.5 m' },
  'hoodie-technical': { cropped: '1.8 m', regular: '2.2 m', oversized: '2.6 m', boxy: '2.4 m' },
  'hoodie-denim':     { cropped: '1.9 m', regular: '2.3 m', oversized: '2.7 m', boxy: '2.5 m' },
  'hoodie-leather':   { cropped: '24 sq ft', regular: '28 sq ft', oversized: '34 sq ft', boxy: '31 sq ft' },
  'tshirt-cotton':    { cropped: '1.1 m', regular: '1.4 m', oversized: '1.7 m', boxy: '1.5 m' },
  'tshirt-fleece':    { cropped: '1.2 m', regular: '1.5 m', oversized: '1.8 m', boxy: '1.6 m' },
  'tshirt-technical': { cropped: '1.1 m', regular: '1.4 m', oversized: '1.7 m', boxy: '1.5 m' },
  'tshirt-denim':     { cropped: '1.2 m', regular: '1.5 m', oversized: '1.8 m', boxy: '1.6 m' },
  'tshirt-leather':   { cropped: '14 sq ft', regular: '17 sq ft', oversized: '21 sq ft', boxy: '19 sq ft' },
}

// ─── Main export ──────────────────────────────────────────────────────────────

export function buildBOM(state: DesignState): BOM {
  const items: BOMItem[] = []
  let seq = 0
  const nextId = () => `bom-${String(++seq).padStart(3, '0')}`

  // garmentType is currently typed as literal 'hoodie'; cast to accept future 'tshirt'
  const garmentType = state.garmentType as 'hoodie' | 'tshirt'
  const isHoodie = garmentType === 'hoodie'
  const isLeather = state.material === 'leather'

  const primaryPantone   = hexToPantone(state.colour.primary)
  const secondaryPantone = hexToPantone(state.colour.secondary)

  const spec = MATERIAL_SPECS[state.material]
  const shellQty = SHELL_QTY[`${garmentType}-${state.material}`]?.[state.silhouette] ?? '2.2 m'

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

  // 2 — Rib knit for cuffs and waistband
  // Leather garments use self-material cuffs; all knit fabrics use rib.
  if (!isLeather) {
    items.push({
      id: nextId(),
      category: 'fabric',
      description: 'Cuff & waistband rib knit',
      composition: '95% cotton / 5% spandex',
      weight: '300 GSM',
      width: '60 in (152 cm)',
      quantity: isHoodie ? '0.6 m' : '0.3 m',
      colour: primaryPantone,
      notes: isHoodie
        ? 'Cut 2 sleeve cuffs (22 × 14 cm each) + 1 waistband (66 × 14 cm)'
        : 'Cut 1 neckband (54 × 7 cm)',
    })
  }

  // 3 — Pocket bag lining (split pocket only — kangaroo uses shell fabric)
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

  // 4 — Overlock thread (main seams)
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

  // 5 — Coverseam thread (hems, cuffs, waistband attachment)
  items.push({
    id: nextId(),
    category: 'thread',
    description: 'Coverseam thread — 3-needle coverseam, hems and rib attachment',
    composition: '100% spun polyester',
    weight: 'Tex 24 (Nm 80/2)',
    quantity: 'Approx. 40 m per unit',
    colour: `Colour-matched to ${primaryPantone}`,
    supplier: 'Coats EPIC or equivalent',
  })

  // 6 — Zipper
  if (state.details.zipper) {
    const zipLen =
      state.silhouette === 'cropped'   ? '55 cm' :
      state.silhouette === 'oversized' ? '70 cm' : '65 cm'
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

  // 7 — Drawcord + aglets (hoodie with hood only)
  if (state.details.drawstrings && isHoodie && state.details.hood !== 'none') {
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

  // 8 — Embroidery thread + stabiliser
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
      notes: 'Tear-away for jersey/knit; cut-away for fleece or heavy fabric',
    })
  }

  // 9 — Labels
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

  // 10 — Hang tag + attachment string
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

  // 11 — Polybag
  items.push({
    id: nextId(),
    category: 'packaging',
    description: 'Polybag — clear polypropylene, self-seal',
    quantity: '1 per unit',
    notes: isHoodie ? '35 × 45 cm' : '30 × 40 cm',
  })

  return {
    items,
    primaryColour:   { hex: state.colour.primary,   pantone: primaryPantone },
    secondaryColour: { hex: state.colour.secondary, pantone: secondaryPantone },
  }
}
