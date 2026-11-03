# Visual design pass: "the ledger"

## What changed
A visual-layer-only redesign of the home page, its six sections, the header, the scroll hero and the `/work/[slug]` case pages. Copy, `content/*.ts` entries, the seven Butter & teal tokens, and `app/layout.tsx` are untouched. Fonts stay Geist / Geist Mono. The look is calm and tabular: hairline rules, mono eyebrows and labels, tabular numerals, teal as the only accent.

## Known problems solved
- **Work cards 3+1.** `components/sections/Work.tsx` uses a 2-column grid from `sm`. When the project count is odd, the last card gets `sm:col-span-2`, so 3 or 5 projects have no orphan and 4 or 6 sit in even pairs. The section heading is sticky in a 4/8 column split at `lg`.
- **Double line under the header.** The header border is transparent until the word docks. `ScrollHero.tsx` then sets `borderBottomColor` to `--color-rule`, so exactly one hairline shows. Under reduced motion the border is always `rule` (`motion-reduce:!border-rule`). `Approach.tsx` was also changed (see DESIGN.md: it carries no top border).
- **375px header.** `SiteHeader.tsx` and the header inside `ScrollHero.tsx` are one fixed row: 56px high on mobile, 72px from `sm`. The nav does not wrap and scrolls horizontally with its scrollbar hidden. Wordmark and nav sizes shrink on mobile.
- **Hero legibility on phones.** In `ScrollHero.tsx`, blur is capped at 2px on mobile and 4px on desktop. It ramps to 0 by 60% of each letter's progress. Letter opacity starts at 0.55 instead of 0.25. Scatter distance and rotation are scaled to 0.6 on mobile. The scroll track is shorter on mobile (`220vh` and 1.2 viewport heights of travel, against `300vh` and 2.0 on desktop). The word is also shrunk so it fits within the viewport width minus 40px.
- **Hero to wordmark hand-off.** The docked scale now uses the wordmark's real computed font size (`wmFs`) instead of a hard-coded 30px. The header height is read from the DOM. The grid opacity is lowered to 0.35 and the grid cell is 64px.
- **Case pages.** `app/work/[slug]/page.tsx` is now a two-column layout at `lg`. The main column holds Context, Approach and Outcome as `h2` sections. A sticky "fact sheet" card holds track, status, tools and links. On mobile the card comes first.

## Globals (`app/globals.css`)
- `--header-h` (56px, 72px from 640px). It is used for `scroll-padding-top` and the sticky offsets.
- Smooth scrolling only under `prefers-reduced-motion: no-preference`.
- A global `:focus-visible` outline: 2px teal with a 3px offset.
- `::selection` in teal, and `body { overflow-x: clip }` as a guard against horizontal scroll.
- A `.tabular-nums` helper class.

## Other files
- `components/sections/Achievements.tsx`, `Approach.tsx`, `Contact.tsx`, `Experience.tsx`, `Toolkit.tsx`: restyled in the same ledger language.
- `content/ui.ts`: three new labels, `factSheetLabel`, `trackLabel` and `statusLabel`.
- `DESIGN.md`: updated with the new header, grid, focus, contrast and motion rules.
- `specs/022a38a9_visual-design-pass.md`: the plan this work followed.

## How to verify
1. Run `npm run build` and `npx tsc --noEmit`.
2. Run `npm run dev`. At 375px check that the header is one row and there is no horizontal scroll while scrolling. Check that the hero letters are readable as they converge, that the word docks into the wordmark, and that one hairline sits under the header.
3. Click every header link and confirm it reaches its section.
4. Open each `/work/<slug>` page and check that the placeholders such as `[Year]` and `[Status]` render.
5. In the Work grid, add a project to `content/projects.ts` and confirm the grid still balances.
6. Enable reduced motion. The hero should show its end state with no tall scroll track.

This write-up is from the diff only. The build, typecheck and browser checks were not run as part of it.
