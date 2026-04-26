type BaseDesignState = {
  silhouette: 'regular' | 'oversized' | 'boxy'
  material: 'cotton' | 'fleece' | 'technical' | 'denim' | 'leather'
  colour: {
    pattern: 'solid' | 'gradient' | 'stripe' | 'graphic' | 'camo'
    primary: string   // hex
    secondary: string // hex
  }
  brand: {
    name: string
    identity: 'minimal' | 'bold' | 'streetwear' | 'luxury' | 'utility'
    story: string
  }
}

export type HoodieDetails = {
  hood: 'none' | 'standard' | 'oversized'
  pocket: 'none' | 'kangaroo' | 'split'
  zipper: boolean
  drawstrings: boolean
  embroidery: boolean
}

// Plain crewneck / graphic tee
export type TshirtDetails = {
  neckline: 'crew' | 'vneck' | 'scoop'
  sleeves: 'short' | 'long' | 'sleeveless'
  hem: 'straight' | 'curved' | 'cropped'
  graphic: boolean
}

// Collared button-up / woven shirt
export type ShirtDetails = {
  sleeve: 'short' | 'long'
  collar: 'standard' | 'band' | 'spread'
  pocket: boolean   // chest patch pocket
  embroidery: boolean
}

export type DesignState =
  | (BaseDesignState & { garmentType: 'hoodie'; details: HoodieDetails })
  | (BaseDesignState & { garmentType: 'tshirt'; details: TshirtDetails })
  | (BaseDesignState & { garmentType: 'shirt'; details: ShirtDetails })

export const initialDesignState: DesignState = {
  garmentType: 'hoodie',
  silhouette: 'regular',
  material: 'cotton',
  colour: { pattern: 'solid', primary: '#000000', secondary: '#ffffff' },
  details: { hood: 'standard', pocket: 'kangaroo', zipper: false, drawstrings: true, embroidery: false },
  brand: { name: '', identity: 'minimal', story: '' },
}

// Type guards for narrowing
export const isHoodie = (s: DesignState): s is BaseDesignState & { garmentType: 'hoodie'; details: HoodieDetails } =>
  s.garmentType === 'hoodie'
export const isTshirt = (s: DesignState): s is BaseDesignState & { garmentType: 'tshirt'; details: TshirtDetails } =>
  s.garmentType === 'tshirt'
export const isShirt = (s: DesignState): s is BaseDesignState & { garmentType: 'shirt'; details: ShirtDetails } =>
  s.garmentType === 'shirt'
