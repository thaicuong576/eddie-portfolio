# Ledger Visual Redesign

## What changed
Redesigned the portfolio's visual layer into a financial statement / ledger aesthetic tailored for senior finance and systems roles (FP&A, Business Finance, Finance Systems):
- **Typography & Scale:** Replaced Geist with IBM Plex Sans and IBM Plex Mono (for tabular figures, counters, dates, and statuses). Line length kept <= 68ch.
- **Section Frame (`components/SectionFrame.tsx`):** Unified all home sections under a shared frame featuring a sticky 3-column left rail (tabular section number + sentence-case label) and content in columns 4–12 on desktop.
- **Double Line Fix:** Removed `border-t` from the first section (Approach) so that when the sticky header docks, exactly one divider line exists.
- **Header & Mobile Nav:** Constrained header to a single row at 375px (`--header-h: 56px` mobile, `64px` desktop) with wordmark, contact pill, and a mobile `<details>` dropdown menu.
- **Hero Convergence:** Enhanced FinTech hero animation with capped blur (max 3px only when `r > 0.6`), raised minimum opacity (0.55), phone-scaled scatter offsets, a 48px ledger-line field, and a bottom teal progress line. Reduced-motion fallback renders cleanly without tall scroll tracks.
- **Work Grid Balance:** Implemented a count-aware layout that renders 4 cards as a 2x2 grid, 5 cards as 2+2+1 with final card spanning both columns, and multiples of 3 as 3 columns.
- **Case Study Layout:** Converted `/work/[slug]` into a two-column desktop layout with sticky metadata/tools on the left and Context, Approach, and an emphasized Outcome block on the right.

## Verification
- `npm run build` and `npx tsc --noEmit` pass with zero errors.
- Verified all placeholder strings (`[Status]`, `[Year]`, etc.) appear verbatim in generated HTML.
- Confirmed single-row header navigation and absence of horizontal overflow at 375px viewport.
- Confirmed heading hierarchy (`h1` -> `h2` -> `h3`) across all pages.
