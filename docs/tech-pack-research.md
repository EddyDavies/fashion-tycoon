# Tech Pack Research
_Compiled 2026-04-26. Research agent covering POM, BOM, construction notes, colour spec, labels, factory formats, grading._

> Directly addresses open-problems.md #3 (POM) and #4 (BOM). See bottom of this file for DesignState gaps and implementation priority tiers.

---

## §1 — Points of Measure (POM): Hoodie, Size M

All measurements in cm, taken flat. Size M = industry standard sample size.

| Measurement | Regular | Oversized | Cropped | Boxy | Tolerance |
|-------------|---------|-----------|---------|------|-----------|
| A. Chest width (1" below armhole, flat) | 54 | 58 | 54 | 60 | ±1.0 |
| B. Body length (shoulder to hem) | 71 | 73 | 50 | 70 | ±1.0 |
| C. Sleeve length (CB neck to cuff) | 65 | 67 | 64 | 66 | ±1.0 |
| D. Shoulder width (seam to seam) | 46 | 49 | 46 | 50 | ±0.8 |
| E. Armhole depth | 21 | 22 | 20 | 22 | ±0.8 |
| F. Sleeve opening (cuff, flat) | 16 | 17 | 15.5 | 18 | ±0.5 |
| G. Hem opening (flat) | 54 | 58 | 54 | 60 | ±1.0 |
| H. Hood height (neckline seam to crown) | 24 | 26 | 23 | 25 | ±0.8 |
| I. Hood width (widest, flat) | 28 | 30 | 27 | 31 | ±0.8 |
| J. Front rise (CF neckline to hem) | 72 | 74 | 51 | 71 | ±1.0 |
| K. Kangaroo pocket width | 35 | 37 | 35 | 38 | ±0.8 |
| L. Kangaroo pocket depth | 18 | 19 | 17 | 19 | ±0.6 |

**Tolerance rationale**: Main circumference/length = ±1.0 cm (knit fabric natural stretch/shrinkage). Cuff/hood = ±0.5–0.8 cm (visible, affects fit perception).

---

## §2 — Points of Measure (POM): T-Shirt, Size M

| Measurement | Regular | Oversized | Cropped | Boxy | Tolerance |
|-------------|---------|-----------|---------|------|-----------|
| A. Chest width (1" below armhole, flat) | 52 | 56 | 52 | 58 | ±1.0 |
| B. Body length (shoulder to hem) | 70 | 72 | 50 | 69 | ±1.0 |
| C. Shoulder width (seam to seam) | 45 | 48 | 45 | 50 | ±0.8 |
| D. Sleeve length (shoulder seam to cuff) | 20 | 21 | 19 | 21 | ±0.6 |
| E. Sleeve opening (flat) | 16 | 17 | 15.5 | 18 | ±0.5 |
| F. Hem opening (flat) | 52 | 56 | 52 | 58 | ±1.0 |
| G. Neck width (across collar, flat) | 18 | 18.5 | 18 | 19 | ±0.4 |
| H. Front neck drop (shoulder to neckline) | 8 | 8.5 | 8 | 8.5 | ±0.4 |
| I. Armhole depth | 20 | 21 | 19 | 22 | ±0.8 |

**Note**: T-shirt sleeve length is measured from the shoulder seam, not CB neck (differs from hoodies).

---

## §3 — Bill of Materials (BOM)

### Shell fabric by material

| Material | Spec | Qty | GSM | Notes |
|----------|------|-----|-----|-------|
| Cotton (jersey) | 100% Cotton Jersey, single-knit | 1.2 m | 160 | AATCC pre-shrunk |
| Fleece | 80% Cotton / 20% Poly French Terry | 1.5 m | 300 | Brushed back; pre-shrunk <2% |
| Technical | 88% Polyester / 12% Spandex Interlock | 1.3 m | 220 | Moisture-wicking, antimicrobial finish |
| Denim | 100% Cotton Twill Weave | 1.8 m | 350 | Sanforized; rope-dyed indigo |

### Ribbing

| Component | Spec | Qty | Width | Stretch |
|-----------|------|-----|-------|---------|
| Neck rib | 95% Cotton / 5% Spandex, **1x1** | 0.15 m | 3 cm | 40–50% |
| Cuff rib (sleeves) | 95% Cotton / 5% Spandex, **2x2** | 0.3 m per sleeve | 4 cm | 25–30% |
| Waistband rib (hoodie) | 95% Cotton / 5% Spandex, **2x2** | 0.4 m | 5 cm | 25–30% |

**2x2 vs 1x1**: 2x2 maintains ~87% stretch recovery after 50 washes vs 1x1 at ~79%. Use 2x2 for cuffs/waistbands, 1x1 for neck only.

### Thread

| Component | Type | Tex | Qty | Notes |
|-----------|------|-----|-----|-------|
| Main construction | 100% Polyester Core-Spun | 40 | 500 m | Match body colour; SPI 10–12 |
| Serger/overlock | 100% Polyester low-twist | 30 | 200 m | Edge neatening |
| Topstitch (if visible) | 100% Polyester bonded | 24 | 50 m | Contrast or match |

Thread consumption: ~150–200 m per t-shirt; ~250–300 m per hoodie.

### Hood lining (when present)

| Component | Spec | Qty | GSM |
|-----------|------|-----|-----|
| Hood lining | 100% Poly Taffeta or Cotton Sateen | 0.4 m | 75–100 |

### Zippers

**Full zip**: YKK #5 Molded Vislon, separating, 55 cm. Slider: metal or plastic, custom pull optional.  
**Half zip**: YKK #5 Vislon, non-separating, 25–30 cm.  
**Premium feel**: YKK #3 metal teeth for half-zip on premium positioning.

Always specify: separating (open-end, for full-zip) vs non-separating (closed-end, for half-zip).

### Drawcord & aglets

| Component | Spec | Qty | Notes |
|-----------|------|-----|-------|
| Drawcord | 100% Polyester or Cotton round cord, 5–6 mm | 2 × 140 cm | Standard or braided |
| Aglets | Brass or Aluminum, 5–6 mm | 2 per cord | Brass = corrosion-resistant; press-fit |

### Kangaroo pocket lining

| Component | Spec | Notes |
|-----------|------|-------|
| Pocket lining | 100% Poly Mesh or Cotton Flannel, 60–80 GSM | Mesh = breathable; flannel = warmer |

### Labels & tags

| Component | Spec | Size | Placement |
|-----------|------|------|-----------|
| Neck label (brand) | Woven or printed, centre fold | 3.5 cm × 5 cm folded | Centre back neck, sewn into neckline seam |
| Care label | Printed satin, ASTM D5489 symbols | 2.5 cm × 5–6 cm | Left side seam, 10–15 cm from hem |
| Hang tag | 250–350 gsm cardstock | 2.5" × 4" | 1/8" hole, cotton string attachment |

### Packaging

| Component | Spec | Size |
|-----------|------|------|
| Poly bag | 40–50 micron LDPE | 35 × 50 cm (t-shirt); 35 × 60 cm (hoodie) |
| Tissue (optional) | Acid-free, white or brand colour | Wraps folded garment |
| Size sticker | 2 × 2 cm | Applied to poly bag exterior |

---

## §4 — Construction Notes

### Seam types by location

| Location | Stitch | ISO code | SPI | Notes |
|----------|--------|----------|-----|-------|
| **T-shirt shoulder** | Chainstitch or lockstitch | 401 / 301 | 10–12 | Chainstitch preferred for knits (elasticity) |
| **T-shirt side seam** | Overlock + chainstitch | 504 + 401 | 12–14 | Flatlock for premium seamless look |
| **T-shirt hem** | Coverstitch 3-needle | 407 | 14–16 | Soft, stretchy finish |
| **Hoodie side seam** | Flatlock or overlock | 504 / flatlock | 12–14 | Flatlock = no seam bulk |
| **Hoodie hood attachment** | Lockstitch | 301 | 10–12 | High-stress seam; must be strong |
| **Hoodie pocket** | Lockstitch + bartacks | 301 + bartack | 10–12 | See bartack spec below |
| **Cuff/waistband rib** | Lockstitch | 301 | 10–12 | Rib attachment to body |

### Hem finishes

| Type | Stitch | When |
|------|--------|------|
| Coverstitch 3-needle | ISO 407 | Premium; flat, invisible on reverse, very stretchy |
| Double-needle lockstitch | ISO 301 | Standard; visible twin parallel lines |
| Blind stitch | — | Not suitable for knits (no stretch) |

### Pocket bartacks

2 bartacks per pocket corner = 4 total per garment. Each ~6–8 mm long. Stitch: 0.2–0.3 mm length, 2–3 mm width, 8–16 SPI.  
Topstitching: lockstitch 1.5–2.0 mm from pocket edge (matching or contrast thread).

### Embroidery stabiliser

| Fabric | Stabiliser type | GSM |
|--------|----------------|-----|
| Hoodies (fleece) | Cutaway mesh | 70–90 gsm |
| T-shirts (jersey) | No-show diagonal mesh | 70–80 gsm |

Max 10,000–12,000 stitches per design area on knits. Higher density = puckering risk.  
Thread: 40WT polyester embroidery thread.

### Print placement spec format (for tech pack)

```
[Garment]: [Placement]
Position: [e.g., 4" down from neck, centred]
Size: [Width × Height, e.g., 8" × 6"]
Colour: [Pantone TCX or RGB]
Ink type: [Water-based / plastisol / discharge]
Cure: [350°F for 4 seconds, then 325°F for 8 seconds]
```

---

## §5 — Colour Specification

### Pantone system for apparel

Use **Pantone TCX (Textile Cotton eXtended)** — the gold standard for fabric dyeing, not Pantone Coated (C) or Uncoated (U).

**Hex → Pantone conversion**:  
Tools: dnschecker.org/convert-hex-to-pantone-pms or hoodieoem.com/hex-to-pantone-converter  
No conversion is exact — always request physical swatches from supplier for approval.

### Colour tolerance (ΔE)

| ΔE value | Perception |
|----------|------------|
| < 1.0 | Imperceptible |
| 1.0–2.0 | Trained eye only |
| 2.0–3.5 | Noticeable to average person |
| > 3.5 | Obviously different |

**Standard for apparel**: ΔE < 2.0–3.0 (CMC 2:1). Premium/luxury: ΔE < 1.5.  
**Measurement conditions**: D65 illuminant, 10° observer.

### Colour spec format in tech pack

```
Main Body: PMS 286C TCX
Lab Target: L* 24.5, a* -8.3, b* -18.2
Tolerance: ΔE ≤ 2.0 (CIEDE2000)
Trim (rib, cuff): PMS 286C TCX (matching body)
Hood Lining: PMS 11-0604 TCX (White)
Drawstring: Black polyester cord
Zipper slider: Antique nickel metal
```

---

## §6 — Grade Rules (Sizing)

### Hoodie grade increments (per size step)

| Measurement | XS→S | S→M | M→L | L→XL | XL→2XL |
|-------------|------|-----|-----|------|--------|
| Chest width | +2.0 | +2.0 | +2.0 | +2.0 | +2.5 |
| Body length | +1.0 | +1.0 | +1.5 | +1.5 | +2.0 |
| Sleeve length | +0.75 | +0.75 | +0.75 | +1.0 | +1.0 |
| Shoulder width | +1.5 | +1.5 | +1.5 | +1.5 | +2.0 |
| Armhole depth | +0.5 | +0.5 | +0.75 | +0.75 | +1.0 |
| Hood height | +0.5 | +0.5 | +0.75 | +0.75 | +1.0 |
| Pocket width | +1.5 | +1.5 | +1.5 | +2.0 | +2.0 |

### T-shirt grade increments (per size step)

| Measurement | XS→S | S→M | M→L | L→XL | XL→2XL |
|-------------|------|-----|-----|------|--------|
| Chest width | +2.0 | +2.0 | +2.0 | +2.0 | +2.5 |
| Body length | +1.0 | +1.0 | +1.5 | +1.5 | +2.0 |
| Shoulder width | +1.2 | +1.2 | +1.5 | +1.5 | +2.0 |
| Sleeve length | +0.5 | +0.5 | +0.75 | +0.75 | +1.0 |
| Neck width | +0.3 | +0.3 | +0.4 | +0.4 | +0.5 |
| Armhole depth | +0.5 | +0.5 | +0.5 | +0.75 | +1.0 |

**Who grades**: For a first sample order, factory grades from your size M spec using their defaults (close to the table above). For production, brand should provide a full graded spec or pay a pattern maker ($200–500 per style) to grade it.

---

## §7 — Factory Format Preferences

**Best format**: PDF (visual reference) + Excel BOM (editable line items). Send both.

**For first Canton Fair sample**: Minimum viable pack:
1. Front & back flat sketches (hand-drawn or SVG OK)
2. POM: chest, length, sleeve, shoulder width
3. Material: "100% Cotton Jersey, 160 GSM"
4. Main colour: Pantone reference + physical swatch if possible
5. Brand label placement
6. Sample size: M

**Software in industry**: Techpacker ($99–599/mo), Adobe InDesign + Illustrator, Figma (newer adopters), custom Google Sheets + Canva (small brands).  
**For the game**: Puppeteer/Playwright or pdfkit to generate PDF from DesignState. Inject SVG flats, colour fills, POM table, BOM table, care symbols.

---

## §8 — Gaps in Current DesignState

These are fields a factory needs that the game currently doesn't capture.

### Critical gaps (affect tech pack generation)

| Gap | Where to add | Notes |
|-----|-------------|-------|
| **Material GSM** | Material step | Cotton = 160–280 GSM; fleece = 280–500 GSM; determines cost + feel |
| **Material blend** | Material step | "100% Cotton" vs "80/20" vs "50/50" — factories need this to source fabric |
| **Trim colour** | Colour step | Rib/cuff colour separate from body |
| **Zipper type** | Details step | Full vs half zip; vislon vs metal teeth |
| **Rib type** | Details step (or quality tier) | 1x1 vs 2x2 — quality signal |
| **Hood lining colour** | Details step | Default to body or white; affects BOM |
| **Pocket lining material** | Details step | Mesh vs flannel |
| **Neckline type** | T-shirt details | Crew, V-neck, scoop, henley — affects rib spec |
| **Hem finish** | Details or quality tier | Coverstitch vs double-needle |
| **Embellishment type** | Details step | Screen print vs embroidery vs DTG — different specs |
| **Embellishment placement** | Details step | Chest, back, sleeve — affects tech pack diagram |
| **Country of manufacture** | Brand step | Required on care label |
| **Care symbols** | Brand step | Wash temp, bleach allowed, dry method |

### Extended DesignState shape (suggested additions)

```ts
type DesignState = {
  // ... existing fields ...

  // Material detail
  materialGSM: number                    // e.g. 160, 280, 320
  materialBlend: string                  // e.g. "100% Cotton", "80% Cotton / 20% Poly"

  // Hoodie-specific additions
  hoodLiningColor: string               // hex, defaults to body or white
  zipperType: 'full' | 'half' | null
  zipperStyle: 'vislon' | 'metal'
  pocketLining: 'mesh' | 'flannel' | null
  ribType: '1x1' | '2x2'

  // T-shirt-specific additions
  neckline: 'crew' | 'v-neck' | 'scoop' | 'henley'
  sleeveLength: 'cap' | 'short' | 'three-quarter' | 'long'
  hemFinish: 'coverstitch' | 'double-needle'

  // Colour additions
  trimColor: string                     // hex (rib, cuffs)
  accentColor?: string                  // hex (stripes, sleeve band)

  // Embellishment
  embellishment: {
    type: 'none' | 'embroidery' | 'screen-print' | 'dtg'
    placement: 'chest-left' | 'chest-center' | 'back' | 'sleeve'
    color: string                       // hex
  }

  // Label & compliance
  labelType: 'woven' | 'printed'
  countryOfOrigin: string               // e.g. "Vietnam"
  careSymbols: {
    washTemp: 30 | 40 | 60
    bleachAllowed: boolean
    dryMethod: 'tumble' | 'hang' | 'flat'
  }

  // Production
  targetVolume: number                  // units — affects supplier matching
  qualityTier: 'budget' | 'standard' | 'premium'
}
```

---

## §9 — Tech Pack Generator Algorithm

```
INPUT: DesignState

1. COLOURS
   hex → Pantone TCX (converter API)
   Output: PMS reference + ΔE ≤ 2.0 tolerance

2. POM TABLE
   Lookup: garmentType + silhouette → base measurements (§1 or §2)
   Apply: grade rules if multiple sizes needed (§6)
   Include: tolerances

3. BOM
   Body fabric: material → spec lookup (§3)
   Add: materialGSM, materialBlend from state
   Ribbing: ribType from state → 1x1 or 2x2 spec
   Thread: match to PMS from step 1
   Zipper: if hoodie + zipperType !== null → YKK #5 spec
   Drawcord: if drawstrings → cord + aglet spec
   Pocket lining: if pocket !== 'none' → mesh/flannel spec
   Hood lining: if hood !== 'none' → taffeta spec + colour
   Labels: brand name, countryOfOrigin from state
   Care label: careSymbols from state → ASTM D5489 symbols

4. CONSTRUCTION NOTES
   Default seam types from §4
   If qualityTier === 'premium' → upgrade to flatlock + coverstitch
   If embellishment.type === 'embroidery' → add stabiliser spec

5. COLOUR DIAGRAM
   Inject PMS references onto front/back flat SVG zones
   Body, trim, accent, hood lining

6. LABEL SPEC
   Neck label: centre back, 3.5 × 5 cm, content = brand.name + countryOfOrigin
   Care label: left side seam, 10 cm from hem, ASTM D5489
   Hang tag: 2.5" × 4", 1/8" hole

7. GENERATE PDF
   Front/back flats (SVG with colour fills)
   POM table
   BOM table
   Construction notes
   Colour diagram
   Care label symbols
   Label placement diagrams

OUTPUT: tech_pack_[brand]_[garment]_[date].pdf
```

---

## §10 — Implementation Priority Tiers

| Tier | What to build | Unlocks |
|------|--------------|---------|
| **MVP** | POM lookup table (§1/§2), basic BOM (fabric + rib + thread + neck label), Pantone hex conversion | Credible first sample spec |
| **v1.1** | Hood lining colour, zipper type, trim colour, ribType, embellishment type/placement, care symbols | Full BOM; factory can source all components |
| **v1.2** | Seam type selection, hem finish, bartack count, graded specs for all sizes | Production-ready spec |
| **Polish** | Shrinkage calculator, production volume, quality tier affecting tolerances, hang tag design | Luxury-tier output |
