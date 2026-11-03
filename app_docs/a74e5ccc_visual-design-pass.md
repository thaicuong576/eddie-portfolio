# Visual Design Pass: Senior Finance & Systems Portfolio

## Overview
Redesigned the visual layer of the portfolio to communicate calm precision, ledger clarity, and systems craftsmanship suited for a senior FP&A, Business Finance, or Finance Systems professional.

## Key Changes
1. **Header Architecture & Mobile Responsiveness**:
   - Refactored header to fit on exactly one single row on 375px mobile screens (56px height on mobile, 80px on desktop).
   - Wordmark and Contact CTA sit on the exact same vertical center line.
   - On mobile `<sm`, section navigation links collapse into an accessible `<details>` dropdown disclosure menu.
   - Standardized shared styling across `ScrollHero.tsx` and `SiteHeader.tsx` via `components/headerStyles.ts`.

2. **Hero Interaction & Docking Refinements**:
   - Replaced `linear-gradient` background grid with crisp 1px SVG pattern lines using `var(--color-rule)`.
   - Tuned letter scatter coordinates and scale so letters stay inside mobile viewports with minimal blur (<=2px) and high starting legibility.
   - Calculated dynamic wordmark font size in `measure()` to ensure seamless, flash-free docking into the header wordmark.
   - Prevented stacked lines by transitioning header border cleanly upon dock.
   - Reduced motion (`prefers-reduced-motion: reduce`) renders the finished hero state immediately with no tall scroll track.

3. **12-Column Section Shell & Alternating Tone Bands**:
   - Built reusable `SectionShell.tsx` using a 12-column grid: 5-column sticky left sidebar for section number, eyebrow, and heading; 7-column right container for content.
   - Alternated `ground` (#F2EBD3) and `surface` (#F8F4E6) background bands to create clear rhythm via tone steps rather than stacked hairline borders.
   - Closed with a full-width `system` (#0D5C63) closing band for Contact.

4. **Balanced Work Grid**:
   - Built a 6-column grid structure in `Work.tsx` that mathematically balances any project count without orphan cards (2x2 for 4 projects, 2+3 for 5 projects, 2x3 for 6 projects).
   - Equal-height card cards with clean tag/status top rows, problem statements, and hover states.

5. **Case Study Two-Column Layout**:
   - Rebuilt `/work/[slug]` with a full-width header block and a two-column desktop split (`lg:grid lg:grid-cols-12`).
   - Sticky left sidebar hosts tools chips and action links; right main column presents Context, Approach, and an emphasised Outcome panel.
   - Added Next/Previous project navigation row at the bottom.
   - Preserved all bracketed placeholders (`[Status]`, `[Tool]`, etc.).

6. **Accessibility & Design Rules**:
   - Added skip-to-content link using `ui.skipToContent`.
   - Configured global `:focus-visible` ring in `app/globals.css`.
   - Verified WCAG AA contrast compliance across all text and backgrounds.
