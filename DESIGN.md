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

## Radii & Geometry
- Cards: `--radius-card: 16px`
- Buttons: fully rounded (`9999px`)
- Pills & Chips: fully rounded (`9999px`)

## Typography & Base
- Fonts: `Geist` (400, 500, 600, 700) as `--font-sans`, `Geist_Mono` (400, 500) as `--font-mono`.
- Body: `font-family: var(--font-sans)`, background `ground`, color `ink`, `-webkit-font-smoothing: antialiased`. Max line length ≤ 65ch for sustained reading.
- Tabular figures: `tabular-nums` (`font-variant-numeric: tabular-nums`) on years, step numbers, metrics, and readouts.
- Eyebrows: Monospace uppercase with tracking (`tracking-[0.1em]`) in `system` teal.
- Headings: Strict semantic hierarchy (H1 → H2 → H3) with tight negative tracking (`tracking-[-0.03em]`).

## Header & Navigation
- Height: `--header-h`: `56px` mobile / `72px` desktop.
- Mobile layout: Single non-wrapping row at 375px; nav links scroll horizontally with hidden scrollbar.
- Seam line: Exactly one hairline `border-b border-rule` under the docked header; Approach section carries no top border to prevent double lines.

## Balanced Grid Rule
- Work grid automatically balances based on project count:
  - Even counts (4, 6) layout in 2 columns (`sm:grid-cols-2`).
  - Odd counts (3, 5) layout in 2 columns with the final odd card spanning both columns (`sm:col-span-2`).
  - Never leaves an orphan single narrow card.

## Focus & Accessibility
- Visible focus: Global `outline: 2px solid var(--color-system)` with `outline-offset: 3px` on `:focus-visible`.
- Contrast: All text uses `ink` or `muted` (#57584F on #F2EBD3 passes WCAG AA at ~6:1). Teal accent on ground passes at ~6.5:1. Rule token is reserved for decorative hairlines.

## Motion & Scroll Hero
- "FinTech" letter convergence: 7 letters converge as visitor scrolls, docking into the header wordmark.
- Blur cap: Restricted to 2px on mobile / 4px on desktop and ramps to 0 by 60% of convergence so letters remain legible.
- Reduced motion: When `prefers-reduced-motion: reduce` is active, hero renders static end state immediately with no tall scroll track (`h-auto`).

## Rule
Fin is ink, Tech is system; system is the only accent.

No other colors anywhere. No gradients, no shadows, no emoji.
