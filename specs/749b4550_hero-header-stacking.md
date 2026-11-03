# Plan: keep header above hero content after dock

File: `components/ScrollHero.tsx` only.

## Cause
`<section id="top">` has `z-[60]` (relative) and the sticky box has `z-[60]`; both sit above the header (`z-50`), so the whole hero, including the intro block, paints over the header once it scrolls up. Note `position: sticky` always creates a stacking context, so the flying word (z-[60]) cannot escape the sticky box. The sticky box's z-index therefore has to be switched at runtime.

## Changes
1. Section className (line ~304): remove `z-[60]` and the `motion-reduce:!z-auto` (now redundant). A `relative` element with z-auto creates no stacking context. Keep the other classes.
2. Sticky box className (line ~308): remove the static `z-[60]` and `motion-reduce:!z-auto`. Keep `sticky top-0 ... pointer-events-none` etc.
3. In `update()`, new step after "4. Word docking": `stickyBoxRef.current.style.zIndex = dock >= 1 ? "0" : "60";`. While docking (dock < 1) the box is above the header, so the word shows over it. Once docked (dock = 1, the word is `visibility:hidden`), the box drops below the header (z-50), so the intro slides under the opaque header (`bg-ground`).
4. Initial state: `measure()`/`update()` run on mount, so the inline zIndex is set at setup. In `cleanupMotion()` add `if (stickyBoxRef.current) stickyBoxRef.current.style.zIndex = "";` so reduced motion falls back to static.
Do not touch anything else (letters, intro, header, timings).

## Verify
- `npx tsc --noEmit` and `npm run build` pass.
- `npm run dev`, 1440×900 window (browser/Playwright): at `scrollY ≈ 2.74*900 = 2466` the header wordmark and nav are fully visible and the intro text is not painted over them. `document.elementFromPoint` at the wordmark returns the header anchor. At `scrollY ≈ 1500` (dock between 0 and 1) the word is visible over the header area.
- At scrollY 0 the hero looks unchanged; reduced-motion layout unchanged.
