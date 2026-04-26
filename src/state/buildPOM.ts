// buildPOM.ts — Points of Measure lookup table
// All values: cm, laid flat, sample size M (unisex/men's).
// Sources: AAMA/ASTM D5585 standard POM conventions; industry tech pack
// references (Techpacker, Makers Row, Designers Nexus).
//
// DECISIONS NEEDING HUMAN SIGN-OFF — see bottom of file.

import type { DesignState } from './designState'

export type POMRow = {
  id: string
  label: string
  value: number    // cm, laid flat, sample size M
  tolerance: number // ±cm
}

export type POMTable = {
  sampleSize: 'M'
  unit: 'cm'
  garmentType: DesignState['garmentType']
  silhouette: DesignState['silhouette']
  rows: POMRow[]
}

// Display labels — "(half)" = laid-flat half-measurement; no suffix = full width.
const LABELS: Record<string, string> = {
  chestWidth:        'Chest Width (2.5 cm below armhole, half)',
  bodyLengthFront:   'Body Length Front (HPS to hem)',
  bodyLengthBack:    'Body Length Back (HPS to hem)',
  shoulderWidth:     'Shoulder Width (point to point)',
  sleeveLength:      'Sleeve Length (shoulder seam to cuff edge)',
  armholeDepth:      'Armhole Depth (shoulder seam to underarm)',
  bicepWidth:        'Bicep Width (2.5 cm below armhole, half)',
  elbowWidth:        'Elbow Width (half)',
  cuffWidth:         'Cuff Opening Width (half)',
  cuffHeight:        'Cuff Rib Height',
  sleeveOpening:     'Sleeve Opening Width (half)',
  hemWidth:          'Hem Width (half)',
  hemRibHeight:      'Hem Rib Height',
  backNeckWidth:     'Back Neck Width',
  frontNeckDrop:     'Front Neck Drop (from HPS)',
  backNeckDrop:      'Back Neck Drop (from HPS)',
  neckRibHeight:     'Neck Rib Height',
  hoodDepth:         'Hood Depth (neckline seam to crown)',
  hoodWidth:         'Hood Width at Widest Point (half)',
  hoodOpening:       'Hood Face Opening Width (laid flat)',
  drawstringChannel: 'Drawstring Channel Width',
  pocketWidth:       'Kangaroo Pocket Width',
  pocketHeight:      'Kangaroo Pocket Height',
  pocketFromHem:     'Pocket Placement from Hem',
  zipperLength:      'Zipper Length (top stop to bottom stop)',
}

type Spec = { value: number; tolerance: number }
type SpecMap = Partial<Record<string, Spec>>

// ─── Hoodie specs ─────────────────────────────────────────────────────────────
// Hood, drawstring, pocket, zipper entries are always included here;
// buildPOM() removes inapplicable ones based on DesignState.details.

const HOODIE_SPECS: Record<string, SpecMap> = {
  regular: {
    chestWidth:        { value: 55,   tolerance: 1.5 },
    bodyLengthFront:   { value: 70,   tolerance: 1.5 },
    bodyLengthBack:    { value: 72,   tolerance: 1.5 },
    shoulderWidth:     { value: 48,   tolerance: 1.0 },
    sleeveLength:      { value: 63,   tolerance: 1.5 },
    armholeDepth:      { value: 25,   tolerance: 1.0 },
    bicepWidth:        { value: 20.0, tolerance: 1.0 },
    elbowWidth:        { value: 17.0, tolerance: 1.0 },
    cuffWidth:         { value: 9.5,  tolerance: 0.5 },
    cuffHeight:        { value: 7,    tolerance: 0.5 },
    hemWidth:          { value: 55,   tolerance: 1.5 },
    hemRibHeight:      { value: 7,    tolerance: 0.5 },
    backNeckWidth:     { value: 19,   tolerance: 0.5 },
    frontNeckDrop:     { value: 11,   tolerance: 0.5 },
    backNeckDrop:      { value: 3.0,  tolerance: 0.3 },
    neckRibHeight:     { value: 2.0,  tolerance: 0.3 },
    hoodDepth:         { value: 35,   tolerance: 1.5 },
    hoodWidth:         { value: 27,   tolerance: 1.0 },
    hoodOpening:       { value: 22,   tolerance: 1.0 },
    drawstringChannel: { value: 1.5,  tolerance: 0.3 },
    pocketWidth:       { value: 24,   tolerance: 0.5 },
    pocketHeight:      { value: 18,   tolerance: 0.5 },
    pocketFromHem:     { value: 4.0,  tolerance: 0.5 },
    zipperLength:      { value: 65,   tolerance: 1.0 },
  },

  // Oversized: drop shoulder, wide chest, longer body, larger hood.
  // hemWidth matches chestWidth (no taper).
  oversized: {
    chestWidth:        { value: 63,   tolerance: 1.5 },
    bodyLengthFront:   { value: 77,   tolerance: 1.5 },
    bodyLengthBack:    { value: 79,   tolerance: 1.5 },
    shoulderWidth:     { value: 54,   tolerance: 1.0 },
    sleeveLength:      { value: 66,   tolerance: 1.5 },
    armholeDepth:      { value: 28,   tolerance: 1.0 },
    bicepWidth:        { value: 24.0, tolerance: 1.0 },
    elbowWidth:        { value: 20.0, tolerance: 1.0 },
    cuffWidth:         { value: 10.5, tolerance: 0.5 },
    cuffHeight:        { value: 8,    tolerance: 0.5 },
    hemWidth:          { value: 63,   tolerance: 1.5 },
    hemRibHeight:      { value: 7,    tolerance: 0.5 },
    backNeckWidth:     { value: 20,   tolerance: 0.5 },
    frontNeckDrop:     { value: 11.5, tolerance: 0.5 },
    backNeckDrop:      { value: 3.0,  tolerance: 0.3 },
    neckRibHeight:     { value: 2.0,  tolerance: 0.3 },
    hoodDepth:         { value: 37,   tolerance: 1.5 },
    hoodWidth:         { value: 29,   tolerance: 1.0 },
    hoodOpening:       { value: 24,   tolerance: 1.0 },
    drawstringChannel: { value: 1.5,  tolerance: 0.3 },
    pocketWidth:       { value: 26,   tolerance: 0.5 },
    pocketHeight:      { value: 20,   tolerance: 0.5 },
    pocketFromHem:     { value: 5.0,  tolerance: 0.5 },
    zipperLength:      { value: 72,   tolerance: 1.0 },
  },

  // Boxy: wide and short; hemWidth matches chestWidth (square silhouette).
  boxy: {
    chestWidth:        { value: 61,   tolerance: 1.5 },
    bodyLengthFront:   { value: 65,   tolerance: 1.5 },
    bodyLengthBack:    { value: 67,   tolerance: 1.5 },
    shoulderWidth:     { value: 52,   tolerance: 1.0 },
    sleeveLength:      { value: 61,   tolerance: 1.5 },
    armholeDepth:      { value: 27,   tolerance: 1.0 },
    bicepWidth:        { value: 22.0, tolerance: 1.0 },
    elbowWidth:        { value: 19.0, tolerance: 1.0 },
    cuffWidth:         { value: 10.0, tolerance: 0.5 },
    cuffHeight:        { value: 7,    tolerance: 0.5 },
    hemWidth:          { value: 61,   tolerance: 1.5 },
    hemRibHeight:      { value: 7,    tolerance: 0.5 },
    backNeckWidth:     { value: 20,   tolerance: 0.5 },
    frontNeckDrop:     { value: 11,   tolerance: 0.5 },
    backNeckDrop:      { value: 3.0,  tolerance: 0.3 },
    neckRibHeight:     { value: 2.0,  tolerance: 0.3 },
    hoodDepth:         { value: 36,   tolerance: 1.5 },
    hoodWidth:         { value: 28,   tolerance: 1.0 },
    hoodOpening:       { value: 23,   tolerance: 1.0 },
    drawstringChannel: { value: 1.5,  tolerance: 0.3 },
    pocketWidth:       { value: 25,   tolerance: 0.5 },
    pocketHeight:      { value: 18,   tolerance: 0.5 },
    pocketFromHem:     { value: 4.0,  tolerance: 0.5 },
    zipperLength:      { value: 62,   tolerance: 1.0 },
  },
}

// ─── T-shirt specs ────────────────────────────────────────────────────────────
// No hood/drawstring/zipper entries. Pocket entries present but filtered out
// when details.pocket === 'none'.

const TSHIRT_SPECS: Record<string, SpecMap> = {
  regular: {
    chestWidth:        { value: 50,   tolerance: 1.5 },
    bodyLengthFront:   { value: 71,   tolerance: 1.5 },
    bodyLengthBack:    { value: 73,   tolerance: 1.5 },
    shoulderWidth:     { value: 44,   tolerance: 1.0 },
    sleeveLength:      { value: 22,   tolerance: 1.0 },
    armholeDepth:      { value: 22,   tolerance: 1.0 },
    bicepWidth:        { value: 18.0, tolerance: 1.0 },
    sleeveOpening:     { value: 18.0, tolerance: 0.5 },
    hemWidth:          { value: 49,   tolerance: 1.5 },
    backNeckWidth:     { value: 18,   tolerance: 0.5 },
    frontNeckDrop:     { value: 9.0,  tolerance: 0.5 },
    backNeckDrop:      { value: 2.5,  tolerance: 0.3 },
    neckRibHeight:     { value: 1.5,  tolerance: 0.3 },
    pocketWidth:       { value: 14,   tolerance: 0.5 },
    pocketHeight:      { value: 14,   tolerance: 0.5 },
    pocketFromHem:     { value: 3.5,  tolerance: 0.5 },
  },

  // hemWidth matches chestWidth; drop shoulder.
  oversized: {
    chestWidth:        { value: 58,   tolerance: 1.5 },
    bodyLengthFront:   { value: 74,   tolerance: 1.5 },
    bodyLengthBack:    { value: 76,   tolerance: 1.5 },
    shoulderWidth:     { value: 50,   tolerance: 1.0 },
    sleeveLength:      { value: 24,   tolerance: 1.0 },
    armholeDepth:      { value: 26,   tolerance: 1.0 },
    bicepWidth:        { value: 22.0, tolerance: 1.0 },
    sleeveOpening:     { value: 20.0, tolerance: 0.5 },
    hemWidth:          { value: 57,   tolerance: 1.5 },
    backNeckWidth:     { value: 19,   tolerance: 0.5 },
    frontNeckDrop:     { value: 10.0, tolerance: 0.5 },
    backNeckDrop:      { value: 2.5,  tolerance: 0.3 },
    neckRibHeight:     { value: 1.5,  tolerance: 0.3 },
    pocketWidth:       { value: 15,   tolerance: 0.5 },
    pocketHeight:      { value: 15,   tolerance: 0.5 },
    pocketFromHem:     { value: 4.0,  tolerance: 0.5 },
  },

  // hemWidth matches chestWidth; shorter than regular.
  boxy: {
    chestWidth:        { value: 56,   tolerance: 1.5 },
    bodyLengthFront:   { value: 64,   tolerance: 1.5 },
    bodyLengthBack:    { value: 66,   tolerance: 1.5 },
    shoulderWidth:     { value: 49,   tolerance: 1.0 },
    sleeveLength:      { value: 22,   tolerance: 1.0 },
    armholeDepth:      { value: 24,   tolerance: 1.0 },
    bicepWidth:        { value: 20.0, tolerance: 1.0 },
    sleeveOpening:     { value: 19.0, tolerance: 0.5 },
    hemWidth:          { value: 56,   tolerance: 1.5 },
    backNeckWidth:     { value: 19,   tolerance: 0.5 },
    frontNeckDrop:     { value: 9.0,  tolerance: 0.5 },
    backNeckDrop:      { value: 2.5,  tolerance: 0.3 },
    neckRibHeight:     { value: 1.5,  tolerance: 0.3 },
    pocketWidth:       { value: 14,   tolerance: 0.5 },
    pocketHeight:      { value: 14,   tolerance: 0.5 },
    pocketFromHem:     { value: 3.5,  tolerance: 0.5 },
  },
}

// Row order matches standard tech pack reading order.
const HOODIE_ORDER = [
  'chestWidth', 'bodyLengthFront', 'bodyLengthBack', 'shoulderWidth',
  'sleeveLength', 'armholeDepth', 'bicepWidth', 'elbowWidth',
  'cuffWidth', 'cuffHeight', 'hemWidth', 'hemRibHeight',
  'backNeckWidth', 'frontNeckDrop', 'backNeckDrop', 'neckRibHeight',
  'hoodDepth', 'hoodWidth', 'hoodOpening', 'drawstringChannel',
  'pocketWidth', 'pocketHeight', 'pocketFromHem',
  'zipperLength',
]

const TSHIRT_ORDER = [
  'chestWidth', 'bodyLengthFront', 'bodyLengthBack', 'shoulderWidth',
  'sleeveLength', 'armholeDepth', 'bicepWidth', 'sleeveOpening',
  'hemWidth', 'backNeckWidth', 'frontNeckDrop', 'backNeckDrop', 'neckRibHeight',
  'pocketWidth', 'pocketHeight', 'pocketFromHem',
]

export function buildPOM(state: DesignState): POMTable {
  const isHoodie = state.garmentType === 'hoodie'
  const specs: SpecMap = { ...(isHoodie ? HOODIE_SPECS[state.silhouette] : TSHIRT_SPECS[state.silhouette]) }
  const order = isHoodie ? HOODIE_ORDER : TSHIRT_ORDER

  // Oversized hood detail adds volume to all three hood measurements.
  if (isHoodie && state.details.hood === 'oversized') {
    if (specs.hoodDepth)   specs.hoodDepth   = { value: specs.hoodDepth.value  + 3, tolerance: specs.hoodDepth.tolerance }
    if (specs.hoodWidth)   specs.hoodWidth   = { value: specs.hoodWidth.value  + 2, tolerance: specs.hoodWidth.tolerance }
    if (specs.hoodOpening) specs.hoodOpening = { value: specs.hoodOpening.value + 2, tolerance: specs.hoodOpening.tolerance }
  }

  const excluded = new Set<string>()
  if (!isHoodie || state.details.hood === 'none')
    ['hoodDepth', 'hoodWidth', 'hoodOpening'].forEach(id => excluded.add(id))
  if (!isHoodie || !state.details.drawstrings)
    excluded.add('drawstringChannel')
  if (!('pocket' in state.details) || (state.details as { pocket: string }).pocket === 'none')
    ['pocketWidth', 'pocketHeight', 'pocketFromHem'].forEach(id => excluded.add(id))
  if (!isHoodie || !state.details.zipper)
    excluded.add('zipperLength')

  const rows: POMRow[] = order
    .filter(id => !excluded.has(id) && specs[id] !== undefined)
    .map(id => ({
      id,
      label: LABELS[id] ?? id,
      value: specs[id]!.value,
      tolerance: specs[id]!.tolerance,
    }))

  return {
    sampleSize: 'M',
    unit: 'cm',
    garmentType: state.garmentType,
    silhouette: state.silhouette,
    rows,
  }
}

// ─── DECISIONS NEEDING HUMAN SIGN-OFF ────────────────────────────────────────
//
// 1. GRADED SPECS vs SAMPLE SIZE M ONLY
//    This table outputs sample size M only, which is industry standard for a
//    first-sample / development spec sheet. Graded specs (XS–XXL) require a
//    second table of grade rules (how much each measurement grows/shrinks per
//    size step) — typically supplier-specific and not agreed until bulk order.
//    Recommendation: ship v1 with sample size M; add grading post-Canton Fair.
//
// 2. MEASUREMENT VALUES NEED PHYSICAL VALIDATION
//    All values are derived from published industry specs. They have NOT been
//    validated against physical garments or an existing supplier's block.
//    Before using these in a real tech pack presented to suppliers, cross-check
//    at least the regular hoodie against a physical size-M reference garment.
//    Key risk: armhole depth and sleeve length are the most factory-sensitive.
//
// 3. MEASUREMENT POINT DEFINITIONS
//    Label strings encode the reference point (e.g. "2.5 cm below armhole",
//    "HPS to hem"). Suppliers may use different conventions (e.g. some measure
//    body length from collar seam, not HPS). Have someone with factory tech
//    pack experience review the LABELS map before the first supplier meeting.
