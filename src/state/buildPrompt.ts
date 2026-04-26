import type { DesignState } from './designState'
import { isHoodie, isTshirt } from './designState'

const silhouetteMap: Record<DesignState['silhouette'], string> = {
  regular: 'regular fit',
  oversized: 'oversized',
  boxy: 'boxy cut',
}

const garmentNameMap: Record<DesignState['garmentType'], string> = {
  hoodie: 'hoodie',
  tshirt: 't-shirt',
  shirt: 'shirt',
}

const materialMap: Record<DesignState['material'], string> = {
  cotton: 'cotton jersey',
  fleece: 'heavyweight fleece',
  technical: 'technical performance fabric',
  denim: 'denim',
}

const patternMap: Record<DesignState['colour']['pattern'], (primary: string, secondary: string) => string> = {
  solid:    (p)    => `in ${p}`,
  gradient: (p, s) => `with a gradient from ${p} to ${s}`,
  stripe:   (p, s) => `with ${p} and ${s} stripes`,
  graphic:  (p, s) => `with a graphic print in ${p} and ${s}`,
  camo:     (p, s) => `in camouflage pattern using ${p} and ${s}`,
}

const photoStyleMap: Record<DesignState['brand']['identity'], string> = {
  minimal:    'Clean studio shot, white background, minimal styling, soft diffused light',
  bold:       'Dramatic lighting, high contrast editorial photography, bold composition',
  streetwear: 'Shot on location, urban street style, natural daylight, candid energy',
  luxury:     'Luxury fashion photography, soft studio lighting, premium feel, neutral background',
  utility:    'Technical product photography, clean grey background, sharp detail throughout',
}

export function buildPrompt(state: DesignState): string {
  const silhouette = silhouetteMap[state.silhouette]
  const material = materialMap[state.material]
  const colour = patternMap[state.colour.pattern](state.colour.primary, state.colour.secondary)
  const photoStyle = photoStyleMap[state.brand.identity]

  const details: string[] = []
  if (isHoodie(state)) {
    if (state.details.hood !== 'none') details.push(`${state.details.hood} hood`)
    if (state.details.pocket !== 'none') details.push(state.details.pocket === 'kangaroo' ? 'kangaroo pocket' : 'split hem pockets')
    if (state.details.zipper) details.push('full-zip closure')
    if (state.details.drawstrings) details.push('adjustable drawstrings')
    if (state.details.embroidery) details.push('embroidered detailing')
  } else if (isTshirt(state)) {
    details.push({ crew: 'crew neck', vneck: 'V-neck', scoop: 'scoop neck' }[state.details.neckline])
    details.push({ short: 'short sleeves', long: 'long sleeves', sleeveless: 'sleeveless' }[state.details.sleeves])
    if (state.details.hem !== 'straight') details.push(`${state.details.hem} hem`)
    if (state.details.graphic) details.push('graphic print')
  } else {
    details.push(`${state.details.sleeve} sleeve`)
    details.push({ standard: 'point collar', band: 'band collar', spread: 'spread collar' }[state.details.collar])
    if (state.details.pocket) details.push('chest pocket')
    if (state.details.embroidery) details.push('embroidered detailing')
  }

  const garmentName = garmentNameMap[state.garmentType]
  const detailsStr = details.length > 0 ? `, ${details.join(', ')}` : ''

  return [
    `Photorealistic product photograph of a ${silhouette} ${material} ${garmentName} ${colour}${detailsStr}.`,
    photoStyle + '.',
    'High-quality fashion photography, sharp fabric detail.',
  ].join(' ')
}
