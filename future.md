# Future BOM — Full Production Spec

This describes what a production-grade Bill of Materials would contain, beyond what `buildBOM.ts` currently generates. Use it as a reference when upgrading the tech pack for real supplier conversations.

---

## What the current BOM does

`buildBOM.ts` generates a **simplified BOM** — fabric type, composition, and approximate quantities by garment type and silhouette; trims and hardware driven by detail toggles; standard labels and packaging. Colour references via CIEDE2000 nearest-Pantone match.

Good enough for: Canton Fair pitch conversations, first-contact supplier discussions, sample stage.

---

## What a production BOM adds

### 1. Accurate fabric yardage (requires POM)

Current: consumption estimates from a lookup table (e.g. regular-fit hoodie in cotton = 2.2 m).

Production: yardage calculated from actual pattern pieces, derived from POM measurements.

```
fabric_qty = Σ (piece_length × piece_width) / (fabric_width × marker_efficiency)
```

Marker efficiency is typically 80–85% for woven fabrics, 85–90% for knit. A production BOM lists:

| Component | Piece count | Dimensions (cm) | Subtotal |
|-----------|-------------|-----------------|---------|
| Front body | 1 | 72 × 58 | 4,176 cm² |
| Back body | 1 | 74 × 58 | 4,292 cm² |
| Hood panel | 2 | 40 × 34 | 2,720 cm² |
| Sleeve | 2 | 64 × 26 | 3,328 cm² |
| … | … | … | … |
| **Total** | | | **~17,000 cm²** |
| + 15% waste | | | **~19,550 cm²** |
| At 152 cm width | | | **≈ 1.29 m** |

Multiply by order quantity to get total fabric requirement for the purchase order.

### 2. Graded quantities across size run

Current: size M only.

Production: one BOM per size, or a graded BOM table showing consumption by size:

| Size | Shell fabric | Rib knit | Drawcord |
|------|-------------|----------|---------|
| XS   | 2.0 m       | 0.55 m   | 130 cm  |
| S    | 2.1 m       | 0.58 m   | 135 cm  |
| M    | 2.2 m       | 0.60 m   | 140 cm  |
| L    | 2.3 m       | 0.63 m   | 145 cm  |
| XL   | 2.4 m       | 0.66 m   | 150 cm  |
| XXL  | 2.6 m       | 0.70 m   | 155 cm  |

Graded BOM is required for any production run.

### 3. Supplier codes and lead times

Current: generic supplier name (e.g. "YKK #5 metal OE separating").

Production: each line has a specific supplier reference:

| Item | Supplier | SKU / Colour code | MOQ | Lead time |
|------|----------|-------------------|-----|-----------|
| YKK #5 metal zipper, 65 cm | YKK Group | #670D-65CM-GUN | 200 pcs | 4–6 weeks |
| French Terry, 320 GSM | Fabric supplier TBC | Style ref TBC | 500 m | 8–12 weeks |
| Drawcord, 5 mm flat cotton | Trim supplier TBC | Colour: to match | 1,000 m | 3–4 weeks |

These supplier details are populated by the merchandiser during development, not generated.

### 4. Unit costs

Production BOM includes a cost column per line:

| Item | Unit cost (USD) | Qty per unit | Line total |
|------|----------------|--------------|-----------|
| French Terry | $4.20/m | 2.2 m | $9.24 |
| Rib knit | $2.80/m | 0.6 m | $1.68 |
| YKK zipper | $0.85 ea | 1 | $0.85 |
| … | … | … | … |
| **CMT total** | | | **$XX.XX** |

FOB cost = fabric + trims + CMT labour + packing + agent margin.

This requires actual price quotes — nothing we can generate from DesignState alone.

### 5. Pantone vs actual dip/dyeing spec

Current: nearest Pantone TCX code, via CIEDE2000 match against 60-colour lookup.

Production: the colour spec references the actual Pantone shade confirmed against a physical swatch, plus the dye chemistry notes for the mill:

```
Colour ref:      Pantone 19-4024 TCX Classic Navy
Lab (D65/10°):   L* 18.2, a* −2.1, b* −9.4
Tolerance:       ΔE2000 ≤ 1.5
Strike-off req:  Lab swatch + digital + bulk submission
Dye class:       Reactive (for cotton); disperse (for polyester component)
```

The CIEDE2000 tolerance (≤ 1.5) is what tells the mill how close they need to match.

### 6. Interlining and interfacing

Current: interlining noted for shirts (collar/cuff) but not specified in detail.

Production lists:

| Location | Interfacing type | Weight | Bonding temp |
|----------|-----------------|--------|-------------|
| Collar stand | Woven fusible | 80 GSM | 150°C, 15 s |
| Cuff facing | Woven fusible | 80 GSM | 150°C, 15 s |
| Front placket | Non-woven fusible | 40 GSM | 140°C, 12 s |
| Hood facing edge | Woven tape, 1 cm | — | — |

### 7. Thread full spec

Current: Tex 27 overlock and Tex 24 coverseam, colour-matched.

Production adds:

| Stitch type | Thread spec | Needle size | SPI | Seam |
|-------------|------------|-------------|-----|------|
| 4-thread overlock | Tex 27 poly | #14 | 14 | Shoulder, side seams |
| 3-needle coverseam | Tex 24 poly | #14 | 14 | Hems, cuffs |
| Single-needle lockstitch | Tex 24 poly | #12 | 12 | Topstitching |
| Bartack | Tex 40 poly | #14 | — | Pocket corners, belt loops |

(SPI = stitches per inch)

### 8. Label placement diagram

Current: text description of placement (e.g. "75 × 25 mm folded; left side seam").

Production: annotated technical flat showing exact placement, stitch type used to attach, and folding instruction for each label. Usually a separate page in the tech pack.

### 9. Packing spec

Current: polybag with size note.

Production includes the full export carton spec:

```
Inner carton:  12 units per inner, colour/size sorted
Master carton: 48 units, 60 × 40 × 40 cm, max 18 kg
Barcode:       EAN-13 per SKU, scanned at carton and unit level
Shipping mark: Style / PO# / Destination / Carton # of #
Country of origin: required on label (MADE IN …)
```

---

## Which gaps matter most for Canton Fair

The questions a supplier will actually ask at the booth:

1. **What fabric and GSM?** — answered now ✓
2. **What's the approximate quantity per unit?** — answered now (with caveat it's estimated) ✓
3. **What trims do you need?** — answered now ✓
4. **What sizes are you going to run?** — not answered, needs graded table
5. **What's your target FOB?** — not in BOM scope (commercial, not technical)
6. **Can you send the tech pack?** — yes, PDF export covers this ✓

The missing piece that matters most before sampling is the **graded quantity table** — even rough estimates. Everything else can be resolved at proto stage.
