# Ledger visual redesign: how the code carries it

Companion to `app_docs/8cb1a770_ledger-visual-redesign.md` (the earlier summary) and `specs/8cb1a770_ledger-visual-redesign.md`. This one maps each requested fix to the code that implements it. Content files are untouched except for two new labels in `content/ui.ts`.

## What changed
- **Fonts** (`app/layout.tsx`): Geist is replaced by `IBM_Plex_Sans` (`--font-sans`) and `IBM_Plex_Mono` (`--font-mono`) via `next/font/google`. Metadata is not changed.
- **Tokens** (`app/globals.css`): the palette is unchanged. Adds `--header-h` (56px, 64px from 640px up), `scroll-padding-top: var(--header-h)`, and a `prefers-reduced-motion` block. `DESIGN.md` is updated to match.
- **Shared section frame** (`components/SectionFrame.tsx`, new): every home section uses it. On `md` and up it has a sticky left rail with the section number and label. Content sits beside it. Section numbers come from `content/sections.ts`. Approach is passed `first` so it has no top border. That removes the double line under the header once the hero docks.
- **Header** (`components/SiteHeader.tsx`): a single row at `--header-h` with wordmark, links, and a contact pill. Below `md` the links collapse into a `<details>` "Menu" dropdown, so the header doesn't wrap at 375px. Adds a skip-to-content link. New labels `ui.menu` and `ui.skipToContent` are in `content/ui.ts`.
- **Hero** (`components/ScrollHero.tsx`): the scroll track is `220vh` on phones and `260vh` from `sm` up. Letter blur is capped at 3px and applies only once progress `r` passes 0.6. Minimum letter opacity is 0.55. Scatter offsets scale for phones. The hero adds a 48px ledger-line background that fades as the word docks, and a 2px teal progress line at the bottom. With reduced motion the hero is static, has no tall track, and shows the end state.
- **Work grid** (`components/sections/Work.tsx`): the layout depends on the number of featured projects. A multiple of 3 gives 1/2/3 columns. Anything else gives 1/2 columns, and an odd last card spans both columns (`sm:col-span-2`). So 4 cards are 2×2, and 5 are 2+2+1.
- **Case pages** (`app/work/[slug]/page.tsx`): on `lg` the page is a 12-column grid. The left side (5 columns) is sticky and holds the back link, metadata, tools and links. The right side holds Context, Approach, and an emphasized Outcome. Labels come from `ui.*`.
- **Other sections**: `Achievements`, `Approach`, `Contact`, `Experience` and `Toolkit` are moved onto `SectionFrame` and restyled.

## How to verify
- `npm run build` and `npx tsc --noEmit`.
- `npm run dev`, then at 375px: the header stays on one row, the Menu dropdown reaches every section, and the page doesn't scroll horizontally at any scroll position.
- Scroll the hero: the letters should be readable as they converge, and the wordmark should hand off cleanly into the header. There should be one divider line under the header.
- Work grid: add or remove a featured entry in `content/projects.ts` and check the layout stays balanced.
- Emulate `prefers-reduced-motion: reduce`: the end state shows with no tall scroll track.
- Placeholders such as `[Status]` and `[Year]` should still render verbatim.
