# To Do

## SVG technical flats

- [ ] Source hoodie + t-shirt base SVGs from Designers Nexus (250+ free vector flats — designersnexus.com)
- [ ] Adapt to layered SVG system (silhouette base + detail overlays)
- [ ] `GarmentPreview.tsx` — composites layers from DesignState
- [ ] Colour fill layer (semi-transparent, sits behind outline — stripped in PDF)
- [ ] Detail layers: hood (standard, oversized), pocket (kangaroo, split), zipper, drawstrings, embroidery
- [ ] Both hoodie AND t-shirt variants

## Step UI

- [ ] Step 1: Silhouette selector
- [ ] Step 2: Material selector
- [ ] Step 3: Colour & Pattern (hex picker + pattern toggle)
- [ ] Step 4: Details (toggles)
- [ ] Step 5: Brand (name, identity, story)
- [ ] Step 6: Release (collection card + download PDF + share)
- [ ] Preview button available from Step 2 onwards

## PDF tech pack

- [ ] HTML template for tech pack (A4, covers all 6 sections)
- [ ] `api/generate-pdf.ts` — Vercel serverless fn calling Browserless.io
- [ ] Wire `pdfService.ts` to real endpoint
- [ ] Browserless.io API key in `.env`

## Polish

- [ ] Step transition animations
- [ ] Brand identity affects collection card typography/palette
- [ ] Mobile responsiveness
- [ ] localStorage save (resume where you left off)
- [ ] Full end-to-end test
- [ ] Deploy to Vercel

## Backlog (post-Canton Fair)

- [ ] Multiple garment types (jacket, trousers)
- [ ] Inspiration board step
- [ ] Collections (multiple pieces as a capsule)
- [ ] Market simulation
- [ ] Real-world sourcing CTA (Canton Fair supplier links)
- [ ] Multiplayer gallery
- [ ] Brand progression score
