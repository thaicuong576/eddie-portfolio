# Visual design pass: shared section shell, one-row header, balanced Work grid, two-column case pages

This is a visual-layer rewrite of the home page, header and `/work/[slug]` pages. The only content-layer change is seven new UI labels in `content/ui.ts`. Palette tokens are unchanged. `app_docs/a74e5ccc_visual-design-pass.md` is the earlier summary written by the builder; this note is based on the diff.

## What changed and why it matters

**Header (fixed row, no wrapping at 375px)**
- Header is now a single row: `h-14` on mobile, `sm:h-20` on desktop.
- Below `sm`, section links collapse into a `<details>` disclosure labelled by `ui.menuLabel` / `ui.closeLabel`. The Contact button stays beside it. From `sm` up, links show inline.
- On the home page the mobile menu closes when a link is clicked (`closeMobileMenu` in `ScrollHero.tsx`).
- `components/headerStyles.ts` holds the class strings shared by `ScrollHero.tsx` (home header) and `SiteHeader.tsx` (case-page header), so the two headers cannot drift. It also holds the skip-link class.
- Both pages get a skip-to-content link (`ui.skipToContent`). It targets `#intro-content` on the home page and `#case-content` on case pages.
- The nav has `aria-label={ui.navAriaLabel}`.

**Hero (`components/ScrollHero.tsx`)**
- Same idea: letters scatter, converge on scroll, then dock into the header wordmark.
- Scroll track shortened from `300vh` to `220vh` on phones and `240vh` on larger screens. The scroll range inside `update()` is `1.2×` viewport height on phones and `1.4×` elsewhere.
- Blur is capped at 4px (2px on phones), down from 14px. Minimum letter opacity is 0.55, up from 0.25. On phones, scatter distances are reduced and the word is larger (`0.24 × width`) so it stays legible and inside the viewport.
- The dock scale now uses the header wordmark's real computed font size (`wmFs`, read in `measure()`) instead of a hard-coded `30`.
- The header's bottom border is transparent until the word has docked (`dock >= 0.98`). Together with removing section `border-t` rules, this addresses the double line under the header.
- The background grid is now an inline SVG `<pattern>` using `--color-rule` instead of a `linear-gradient`.
- The intro block now shows a Contact button and, if `profile.cv` and `profile.cvLabel` exist, a CV button. `app/page.tsx` passes `cv` and `cvLabel` into the hero for this. The intro eyebrow is now teal and not uppercase.
- Reduced motion: the existing `motion-reduce:` classes are kept. The sticky box becomes static with padding and `min-h-0`. When the media query matches, `cleanupMotion()` now runs and explicitly sets the end-state styles (wordmark, nav and intro visible).

**Section layout (`components/SectionShell.tsx`, new)**
- Every home section except Contact goes through one shell: a 12-column grid with a sticky 5-column left side (eyebrow from `sectionEyebrow()`, `h2` heading, optional intro) and a 7-column content side.
- `tone` selects the band: `ground`, `surface` or `system`. Tone bands replace the per-section `border-t` hairlines.
- Anchors use `scroll-mt-14 sm:scroll-mt-20`, and `html` has `scroll-padding-top: 80px`.
- Section tones as written in the diff: Work `ground`, Approach `surface`, Toolkit `surface`, Experience `ground`, Achievements `surface`.
- Contact is built separately as a full-width `bg-system` band. It has the headline, a large email link, outlined LinkedIn and CV buttons, and a footer row with `profile.copyright` and a `ui.backToTop` link.

**Sections**
- `Work.tsx`: the `auto-fit` grid is replaced by a 6-column grid with `getCardSpanClass(index, total)`. At `lg`, 4 projects render as 2×2 (span 3 each). 5 render as 2+3 (first two span 3, rest span 2). 6 (or any multiple of 3) render as 3+3 (span 2 each). Other counts fall back to span 3. Below `lg` the grid is 1 column, then 2 columns from `sm`. Cards are equal height. The whole card is a link whose text includes the title.
- `Approach.tsx`: ledger rows with a large mono teal number, replacing the card grid.
- `Experience.tsx`: timeline rows with the period in a fixed-width mono column. The first (most recent) row is tinted and its company is teal.
- `Achievements.tsx`: compact rows of year, title, issuer and kind. A row with `href` becomes a single link to that `href`, with a "view" label.
- `Toolkit.tsx`: two equal-height panels on `md` and up. Systems groups keep teal outlined mono chips.

**Case pages (`app/work/[slug]/page.tsx`)**
- Full-width header block (back link, tag/status, `h1`, `proves`).
- Below it, a `lg` two-column split. A sticky aside on the left holds Tools and Links panels. The right side stacks Context, Approach and Outcome as `<section aria-labelledby>` panels with `h2` headings. Outcome has a teal left border and a faint teal tint (`bg-system/[0.03]`). On mobile the narrative comes first and the aside after.
- A previous/next project row is built from the `projects` array and uses `ui.prevCase` / `ui.nextCase` plus the project title.

**Global (`app/globals.css`, `DESIGN.md`)**
- Adds a `:root` block with the seven colour tokens (same names and values). Adds `overflow-x: clip` on `html` and `body`, a global `:focus-visible` ring (2px `system`, 2px offset), a `.tabular-nums` utility, and a reduced-motion block that turns off smooth scroll and shortens transitions and animations.
- `DESIGN.md` now documents the frame, header, section bands, card rules, and the rule that mono type is for figures, dates, tags and status only.

**`content/ui.ts`**: adds `skipToContent`, `menuLabel`, `closeLabel`, `navAriaLabel`, `nextCase`, `prevCase`, `backToTop`. Existing keys are untouched.

## How to verify
1. `npm run build` and `npx tsc --noEmit`.
2. At 375px: the header is one row with the wordmark and Contact on the same line, and there is no horizontal scroll while scrolling the hero and the page.
3. Scroll through the hero: letters stay readable as they converge, the word docks onto the header wordmark without a flash, and only one line appears under the header after docking.
4. Click each header link (or open Menu on a phone). Each should land its section below the header.
5. Open every `/work/<slug>`. Placeholders such as `[Status]` still render as written.
6. Emulate `prefers-reduced-motion: reduce`. The hero shows the end state with no tall scroll track.
7. To check Work balance, temporarily use 5 or 6 featured projects locally and revert. `content/projects.ts` must show no diff.

## Things to know
- At the `sm` breakpoint (2 columns), a count of 3 or 5 featured projects leaves one card alone on the last row. Balance is guaranteed at `lg` and for 4 projects at every width.
- Nothing in this diff shows the build, typecheck or screenshot checks being run. Run them yourself.
