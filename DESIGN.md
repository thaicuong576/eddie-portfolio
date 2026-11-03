# EDDIE PHUNG PORTFOLIO — Design System

## Core Design Tokens (Butter & Teal)

| Token | Value | Use |
|---|---|---|
| `--color-ground` | `#F2EBD3` | page background |
| `--color-surface` | `#F8F4E6` | cards |
| `--color-ink` | `#1A1C1C` | body text, the word "Fin" |
| `--color-muted` | `#57584F` | secondary text |
| `--color-rule` | `#D9CFAE` | borders, dividers |
| `--color-system` | `#0D5C63` | the word "Tech", links, buttons, the one accent |
| `--color-on-system` | `#FFFFFF` | text on system-colored fills |

## Radii
- Cards: `--radius-card: 16px`
- Badges: `4px` to `6px`
- Buttons & Pills: fully rounded (`9999px`)

## Typography & Base
- Fonts: `Geist` (400, 500, 600, 700) as `--font-sans`, `Geist_Mono` (400, 500) as `--font-mono`.
- Body: `font-family: var(--font-sans)`, background `ground`, color `ink`, `-webkit-font-smoothing: antialiased`.
- Numbers & Dates: `font-variant-numeric: tabular-nums` on all monospace and financial figures.
- Fluid type scale with responsive headings and balanced line heights.

## Header & Layout
- Header height: `--header-h: 56px` on mobile (<640px), `--header-h: 72px` on desktop (>=640px).
- Single-row header at all viewport widths (375px+). On mobile, primary nav links scroll horizontally with touch-friendly tap targets and a subtle fade mask, while the wordmark and Contact CTA remain pinned.
- Single hairline divider between header and content; sections use `SectionShell` with top rules except the first section (`Approach`), eliminating double lines.

## Work Grid System
- Dynamic, count-aware grid using static Tailwind column spans:
  - 4 projects: 2x2 grid on desktop and tablet (`sm:col-span-1 lg:col-span-3`).
  - 5 projects: 2 on row 1 (`lg:col-span-3`), 3 on row 2 (`lg:col-span-2`).
  - 6 projects: 2 rows of 3 (`lg:col-span-2`).
  - Phone (<640px): 1 column.

## Hero Motion & Docking
- Seven-letter scatter-converge-dock sequence:
  - Phase 1: Convergence completes early (~p=0.42), bringing "FinTech" into crisp alignment at viewport center with reduced blur (max 1.5px on phone, 3.5px on desktop).
  - Phase 2: Docking smoothly transitions the converged wordmark into the sticky header, matching computed font size and exact position.
  - Reduced Motion (`prefers-reduced-motion: reduce`): Hero renders end state immediately with auto height (no tall scroll track).

## Accessibility
- Contrast meets WCAG AA on all text tokens.
- Strict heading hierarchy: `h1` (one per page) -> `h2` (sections) -> `h3` (cards/rows).
- Visible keyboard focus rings using `--color-system` (and `--color-ink` on teal buttons).
- Descriptive link names incorporating item titles.

## Rule
Fin is ink, Tech is system; system is the only accent.
No other colors anywhere. No gradients, no shadows, no emoji.
