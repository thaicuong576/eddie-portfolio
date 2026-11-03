# Visual design pass: finance-and-systems look

## What changed
A visual-layer redesign of the home page, header, six sections and `/work/[slug]` case pages. Copy, palette and the FinTech scroll-hero idea are unchanged. The only content edit is three new UI labels in `content/ui.ts`.

Known problems fixed:
- **Work cards broke 3+1.** `Work.tsx` now uses a 6-column grid at `lg` and a static-class helper, `getWorkCardSpanClasses(total, index)`. 4 cards give a 2x2 grid; 5 give 2 then 3; 6 give 2 rows of 3. Between 640px and 1023px there are 2 columns, and an odd last card spans the full width. Below 640px there is 1 column.
- **Double line under the header.** The new `SectionShell` draws a top rule on every section except the one passed `first` (Approach). The header keeps its single `border-b`.
- **375px header wrapped to 3 rows.** The header (`SiteHeader.tsx` and the header inside `ScrollHero.tsx`) is now one fixed-height row: 56px on phones and 72px from 640px up, set by `--header-h` in `globals.css`. The nav scrolls horizontally with the scrollbar hidden (`.no-scrollbar`) and a right-edge fade mask. The wordmark and the Contact pill stay pinned.
- **Hero letters too blurred.** Max blur is 1.5px on phones and 3.5px on desktop (was 14px). Opacity starts at 0.6 (was 0.25). Scatter distance is scaled down (0.45 on phone, 0.85 on desktop), as is rotation on phones. The word is shrunk to fit `W - 32px` if it would overflow.
- **Plain case pages.** See below.

## Files that carry it
- `app/globals.css`: `--header-h`, `overflow-x: clip` on `html` and `body`, tabular numerals on `.font-mono`, global `:focus-visible` ring (ink ring on `.bg-system` elements), `.no-scrollbar`, and a `prefers-reduced-motion` rule that collapses animation and transition durations.
- `components/ui/SectionShell.tsx` (new, server component): shared section wrapper with eyebrow, h2, optional intro, spacing, scroll margin from `--header-h`, and the `first` option. Approach, Work, Toolkit, Experience, Achievements and Contact all use it.
- `components/ScrollHero.tsx`: retimed hero. Letters converge by about p=0.42, there is a short readable pause, and docking runs from p=0.52 to 0.94. Progress is measured against the real hero height, which is 260vh on phones and 300vh from 640px up. Docked scale uses the header wordmark's computed font size instead of a hard-coded 30px. Header height is read from the DOM. The hero still renders the end state with auto height under `prefers-reduced-motion`.
- `components/SiteHeader.tsx`: same header look as the hero header, with `Link`s to `/#id`.
- `app/work/[slug]/page.tsx`: case pages now have a title band (tag and status badges, h1, `proves` as the lead, and the problem in a surface card). Below that is a two-column layout on `lg`: a sticky sidebar with Tools and Links, and numbered Context, Approach and Outcome cards (01 to 03). On smaller screens the main content comes first. A footer nav links to the previous case, back to work, and the next case, computed from the `projects` order.
- `components/sections/*`: restyled. Experience and Achievements are ledger-style rows with a 200px date column from `md` up. Achievements links wrap the whole row, with `aria-label` set to `ui.viewLabel: title`. Work cards are links with `aria-label` of `title — readCase`. Toolkit shows each group as a surface tile.
- `content/ui.ts`: adds `problemLabel`, `previousCase` and `nextCase`.
- `DESIGN.md`: documents the header, grid, motion and accessibility rules above.
- `specs/a6bb90d3_visual-design-pass.md`: the plan this work followed.

## Verify
- `npm run build` and `npx tsc --noEmit`.
- At 375px, the header is one row and the page has no horizontal scroll at any scroll position.
- Each header link reaches its section, which is not hidden under the header.
- Every `/work/<slug>` renders.
- Bracketed placeholders still render as written.
- Emulate `prefers-reduced-motion: reduce`: the hero has auto height and the wordmark, nav and intro are visible.
- With 5 or 6 projects, the Work grid stays balanced.
- Tab through the page and check that focus rings are visible.

## Notes
- `previousCase` and `nextCase` hold the arrows ("← Previous case", "Next case →") inside the label strings.
- The diff does not show a test run, so nothing here claims a build, typecheck or browser check passed.
