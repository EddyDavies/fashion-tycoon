# Done

## 2026-04-26 (scaffold)

- Built scaffold: `useDesign` hook, `renderService.ts` stub, `pdfService.ts` stub
- Added `tshirt` as third garment type (`TshirtDetails` with neckline, sleeves, hem, graphic)
- Built `GarmentPreview.tsx` — SVG compositor with `design` / `print` modes, colour fill layer, Pantone callout
- Added `buildPOM.ts` and `buildBOM.ts` — lookup-table based, keyed by garment type + silhouette
- Added `hexToPantone.ts` — hex → nearest Pantone TCX
- Built `RenderPreview.tsx` — AI render panel with with/without model toggle
- Built garment-specific preview components: `HoodiePreview.tsx`, `TshirtPreview.tsx`, `ShirtPreview.tsx`
- Built shared UI components: `ColourSwatch.tsx`, `OptionCard.tsx`, `StepLayout.tsx`
- Confirmed canvas spec: `viewBox="0 0 400 560"`

## 2026-04-26 (design decisions)

- Defined game concept: fashion brand builder, browser-based, Vite + React + SVG
- Defined DesignState shape and 6-screen flow
- Wrote soul.md, architecture.md, to-do.md
- Built Vite + React scaffold with DesignState type and buildPrompt.ts
- Wrote AI generation context doc (`docs/ai-image-generation.md`)
- Researched and decided: in-game SVG = technical flat (black outlines, dashed stitching, no fills)
- Decided: three outputs per design session — technical flat (live), AI render (on-demand + auto), PDF tech pack (on release)
- Decided: PDF via Browserless.io API → Vercel serverless function
- Decided: PDF tech pack structure (A4, 6 sections, 4–6pp t-shirt, 8–12pp hoodie)
- Decided: AI render has with-model / without-model toggle; auto-triggers at Step 3 end + Step 6
- Decided: build stub-first — all external interfaces wired as mocks from day one
- Decided: both hoodie and t-shirt in v1
- Identified open problems and saved to `docs/open-problems.md`
