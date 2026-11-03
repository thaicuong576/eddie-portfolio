# Scroll hero intro (letters converge into "FinTech", dock into the header)

## What changed
The static home-page hero is now a scroll-driven intro. At scroll 0 the seven letters of "FinTech" are scattered, rotated and blurred. Scrolling pulls them together in the middle of the screen. Further scrolling shrinks the word and moves it onto the header wordmark. The header nav and the intro block (eyebrow, `h1`, paragraph) fade in as it docks. The five section anchors below the hero are unchanged.

## Where it lives
- `components/ScrollHero.tsx` (new, `"use client"`): renders the header (wordmark and nav) and `<main>` containing the hero section, then its `children`. It holds all the animation logic.
- `app/page.tsx`: stays a server component. The header and hero markup moved out. It now renders `<ScrollHero>` and passes the five `SECTIONS` as children, with the same markup as before.
- `specs/d25a0127_scroll-hero-intro.md`: the plan this was built from.

## How it works
- **Layout:** the hero `section#top` is `300vh` tall. It holds a `sticky top-0 h-screen overflow-hidden` box with the grid, hints, flying word, intro block and readout. The section has a `-88px` top margin, which `measure()` replaces with the real header height. This puts the hero at the top of the page, under the sticky header.
- **Progress:** `p = clamp((scrollY − heroTop) / (2·H))`. `dock = ease(clamp((p − 0.62) / 0.33))`. Each letter uses `t = ease(clamp((p/0.55 − i·0.04)/0.76))`. All formulas, offsets and the `ease` function (easeInOutCubic) are in `ScrollHero.tsx`.
- **Rendering:** one passive `scroll` listener schedules a single `requestAnimationFrame`. `update()` writes `transform`, `filter` and `opacity` straight to refs. There is no React state per frame. The readout's `textContent` is written only when the rounded value changes.
- **Measuring:** `measure()` sets the word's font size to `min(0.19·W, 0.36·H)`, reads `offsetWidth` and reads the header wordmark's `getBoundingClientRect()`. It runs on mount, on `resize` and after `document.fonts.ready`.
- **Hand-off:** the header wordmark is `opacity: 0` until `dock >= 1`. At that point the flying word becomes `visibility: hidden` and the wordmark `opacity: 1`. The nav opacity is `clamp((dock − 0.5)·2)`, with `pointer-events` off while it is invisible. The word and hero have `z-[60]`, above the `z-50` header, so the word is visible while docking.
- **Reduced motion:** when `prefers-reduced-motion: reduce` matches, no listeners are attached and any inline styles are cleared. `motion-reduce:` Tailwind variants (mostly `!important`) hide the grid, hints, word and readout, drop the 300vh height and negative margin, and show the wordmark, nav and intro in a static flex layout like the previous page. The effect also listens for changes to the media query and sets up or tears down the animation.
- **Mobile:** left and right offsets are `left-5`/`right-5` below 640px and 40px from `sm:` up. The intro block also gets `right-5` below `sm`.

## Verify
1. `npx tsc --noEmit` and `npm run build`.
2. `npm run dev`, then check at 1440×900:
   - At scroll 0: letters are blurred and scattered, the hints are visible and the readout reads `000 / 100`. The intro block and nav are invisible.
   - At scroll = hero top + 2×viewport height: the readout reads `100 / 100`, the grid is gone, and the intro and nav are fully visible. The header wordmark is shown and the flying word is hidden.
   - Just before the end (p ≈ 0.95), the flying word's rect should match the header wordmark's left/top at a 30px height.
3. Emulate reduced motion in devtools. The hero should not be 300vh tall, and the page should look like the old static version.
4. At 375px wide, `document.documentElement.scrollWidth <= innerWidth` at every scroll position.

I did not run these checks while writing this up. This write-up is based on the diff alone.
