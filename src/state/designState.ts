export type DesignState = {
  garmentType: 'hoodie'
  silhouette: 'cropped' | 'regular' | 'oversized' | 'boxy'
  material: 'cotton' | 'fleece' | 'technical' | 'denim' | 'leather'
  colour: {
    pattern: 'solid' | 'gradient' | 'stripe' | 'graphic' | 'camo'
    primary: string   // hex
    secondary: string // hex
  }
  details: {
    hood: 'none' | 'standard' | 'oversized'
    pocket: 'none' | 'kangaroo' | 'split'
    zipper: boolean
    drawstrings: boolean
    embroidery: boolean
  }
  brand: {
    name: string
    identity: 'minimal' | 'bold' | 'streetwear' | 'luxury' | 'utility'
    story: string
  }
}

export const initialDesignState: DesignState = {
  garmentType: 'hoodie',
  silhouette: 'regular',
  material: 'cotton',
  colour: { pattern: 'solid', primary: '#000000', secondary: '#ffffff' },
  details: { hood: 'standard', pocket: 'kangaroo', zipper: false, drawstrings: true, embroidery: false },
  brand: { name: '', identity: 'minimal', story: '' },
}
