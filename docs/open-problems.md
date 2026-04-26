# Open Problems

These are the hard, unresolved questions that need deliberate attention before the relevant build step. Any agent picking up this work should read this file first.

---

## 1. SVG layer compositing — alignment and conflict

**Resolved decisions:**
- Fixed shared canvas: `viewBox="0 0 300 400"` on every SVG file (base and detail). Layers align by sharing a coordinate space, not by runtime positioning.
- Front + back views both included — in-game and in PDF.
- Cropped silhouette removed. Remaining: regular, oversized, boxy.
- garmentType is `'hoodie' | 'shirt'` (collared button-up, not t-shirt).

**Canvas dimensions resolved:** `400 × 560` — confirmed in `GarmentPreview.tsx`. All open questions in §1 are resolved.

**Detail layer sharing across silhouettes:** With cropped removed, the remaining three silhouettes (regular, oversized, boxy) have similar hem lengths. One set of detail layers works for all three — no per-silhouette variants needed. This significantly reduces the asset count.

**File naming convention:**
```
hoodie/base/hoodie-{silhouette}-{view}.svg        e.g. hoodie-regular-front.svg
hoodie/details/hood-{variant}.svg                  e.g. hood-standard.svg (shared across silhouettes)
hoodie/details/pocket-{variant}.svg
hoodie/details/zipper.svg
hoodie/details/drawstrings.svg
hoodie/details/embroidery-chest.svg

shirt/base/shirt-{silhouette}-{sleeve}-{view}.svg e.g. shirt-regular-long-front.svg
shirt/details/collar-{variant}.svg
shirt/details/pocket-chest.svg
shirt/details/embroidery-chest.svg
```

**Minimum SVG count for v1:**
- Hoodie: 6 base (3 silhouettes × front/back) + 9 details = 15 files
- Shirt: 12 base (3 silhouettes × 2 sleeve lengths × front/back) + 6 details = 18 files
- Total: 33 files

**Canvas dimensions resolved:** `400 × 560` — confirmed in code.

---

## 2. Technical flat asset pipeline

**The problem:** Designers Nexus provides SVG/AI files. These are whole-garment drawings, not pre-separated layer files. We need to extract and separate: base silhouette path, seam lines, individual detail regions — each as independent SVG elements.

**What needs deciding:**
- Manual extraction in Illustrator/Figma vs. automated path parsing?
- What's the minimum viable asset set to ship v1? (2 garment types × 4 silhouettes = 8 base files, plus ~8–10 detail layers per garment)
- Do we use existing assets and adapt, or draw from scratch in a consistent style?

**Recommendation to investigate:** Figma's SVG export with named layers maps cleanly to React component props. Consider drawing the flats in Figma from scratch using the Designers Nexus files as reference, then exporting clean named-layer SVGs.

---

## 3. POM (Points of Measure) generation from DesignState

**RESOLVED** — see `docs/tech-pack-research.md` §1 and §2.

**Decision:** Size M as sample size (industry standard). Lookup table in `buildPOM.ts` keyed `{ hoodie: { regular: {...}, oversized: {...}, boxy: {...} }, shirt: {...} }`. Grade rules for other sizes in `docs/tech-pack-research.md` §6.

**Values:** Full POM tables for hoodie and shirt across all silhouettes with tolerances. Example — regular hoodie size M: chest 54 cm, body 71 cm, sleeve 65 cm (CB neck to cuff), shoulder 46 cm, armhole 21 cm.

---

## 4. BOM (Bill of Materials) generation

**RESOLVED** — see `docs/tech-pack-research.md` §3.

**Decision:** Full BOM with quantities and specs, auto-generated from DesignState. Lookup table per material type → fabric spec + GSM + blend. Details toggles → trim entries (e.g. `zipper: true` → `"YKK #5 Molded Vislon, separating, 55 cm, antique nickel pull"`).

**Key BOM entries now specified:** Shell fabric per material, ribbing (1x1 vs 2x2), thread (tex + SPI), hood lining, zippers (full vs half, YKK spec), drawcord + aglets, pocket lining, neck label, care label, hang tag, poly bag.

**DesignState gaps identified:** Missing `materialGSM`, `materialBlend`, `trimColor`, `zipperType`, `ribType`, `countryOfOrigin`, `careSymbols` — needed to generate a complete BOM. See `docs/tech-pack-research.md` §8 for full gap list and suggested extended DesignState shape.

---

## 5. Colour representation — in-game vs. PDF

**RESOLVED** — implemented in `GarmentPreview.tsx`.

`GarmentPreview` accepts `mode: 'design' | 'print'`. In `design` mode a semi-transparent colour fill layer (clipped to the garment silhouette) sits behind the line work. In `print` mode the fill is stripped and a Pantone callout is rendered instead (top-right corner, primary + secondary chips).

Pantone conversion uses Pantone TCX (Textile Cotton eXtended). Tolerance spec: ΔE ≤ 2.0 (CIEDE2000), D65 illuminant, 10° observer. Implementation in `src/utils/hexToPantone.ts`. See `docs/tech-pack-research.md` §5 for full spec.

---

## 6. AI render consistency — with/without model

**The problem:** "With model" and "without model" renders are two separate API calls. They may be requested at different times during the session. If generated independently, the garment's colour, material texture, and lighting may look inconsistent between the two variants — undermining the comparison.

**What needs deciding:**
- Do we generate both variants together in a single request (one job, two outputs)?
- Or generate one and use img2img seeding from the first to produce the second?
- Is consistency a hard requirement for v1, or acceptable to solve later?

**Note:** The AI render API design lives in `docs/ai-image-generation.md` — this problem is noted here for awareness but the solution belongs in that workstream.

---

## 7. Silhouette visual distinction on a technical flat

**The problem:** The three silhouettes (regular, oversized, boxy) need to look meaningfully different as technical flats so the player's choice feels significant. On a small screen, the difference between "regular" and "oversized" may be subtle.

**What needs deciding:**
- How much do we exaggerate the silhouette differences for clarity?
- Do we add dimension callouts (e.g., "body length: 55cm" vs "body length: 70cm") to reinforce the difference?
- Is a side-by-side comparison shown when the player is on Step 1?

**Suggested approach:** Exaggerate proportions slightly beyond real-world differences. Oversized should look clearly wide and long; boxy should read as a drop-shoulder square shape. Label each with its key characteristic measurement so the choice feels grounded.
