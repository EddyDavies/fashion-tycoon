# a-game

A fashion hoodie design game. Players configure silhouette, material, colour, and details, then see an AI-generated product image. Built for pitching to suppliers at **Canton Fair Phase 3 (apparel), May 1–5, 2026**.

## Stack

React 19 · TypeScript 6 · Vite 8 · no test framework yet

## Key files

| File | Purpose |
|------|---------|
| `soul.md` | Vision, feel, product thesis — read this first |
| `architecture.md` | System shape, tech decisions, three outputs (flat/render/PDF) |
| `to-do.md` | What's queued next |
| `done.md` | Completed work history |
| `docs/open-problems.md` | **Hard unsolved problems — read before touching SVG, PDF, or BOM** |
| `src/state/designState.ts` | The data model — all player choices live here |
| `src/state/buildPrompt.ts` | Converts a `DesignState` into an AI image prompt |
| `docs/game-content-research.md` | Content authority — material variants, silhouettes, Canton Fair brief |
| `docs/ai-image-generation.md` | AI image integration notes |

## Dev commands

```bash
pnpm dev      # start local dev server
pnpm build    # type-check + build
pnpm lint     # eslint
```

Use `pnpm` (not npm) for speed.

## Git

Commit after completing each logical unit of work. Use a descriptive message. Do not batch unrelated changes into one commit.

## Multi-agent coordination

When multiple Claude instances are running in parallel:

- After each commit, `.claude/work-log.md` is automatically updated with your branch and message.
- Every 5 minutes, each agent fetches and surfaces recent commits from the log.
- Check `.claude/work-log.md` directly if you want to see what other instances have done.

## Rendering approach

Use **SVG technical flats** for the garment preview. `GarmentPreview.tsx` composites SVG layers in React — silhouette base + toggled detail overlays. All SVGs share `viewBox="0 0 400 560"` so layers align by coordinate space, not runtime positioning. Colour is a `<rect>` clipped to the silhouette outline, shown in `design` mode and stripped in `print` mode.

## Current priorities

The v1 target is a working hoodie configurator with AI image output, ready to demo at Canton Fair. Scope from `docs/game-content-research.md` — prioritise the options already in `DesignState`, defer backlog items. Keep the UI simple; the demo needs to run, not impress designers.
