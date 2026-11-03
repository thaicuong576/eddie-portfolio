# EDDIE PHUNG PORTFOLIO — Design System

## Core Design Tokens (Butter & Teal)

| Token | Value | Use |
|---|---|---|
| `--color-ground` | `#F2EBD3` | page background |
| `--color-surface` | `#F8F4E6` | cards and alternating section bands |
| `--color-ink` | `#1A1C1C` | body text, the word "Fin" |
| `--color-muted` | `#57584F` | secondary text, metadata |
| `--color-rule` | `#D9CFAE` | borders, dividers |
| `--color-system` | `#0D5C63` | the word "Tech", links, buttons, the one accent |
| `--color-on-system` | `#FFFFFF` | text on system-colored fills |

## Radii
- Cards: `--radius-card: 16px`
- Buttons: fully rounded (`9999px`)
- Chips: fully rounded (`9999px`)

## Typography & Base
- Fonts: `Geist` (400, 500, 600, 700) as `--font-sans`, `Geist_Mono` (400, 500) as `--font-mono`.
- Body: `font-family: var(--font-sans)`, background `ground`, color `ink`, `-webkit-font-smoothing: antialiased`.
- Monospace usage: limited strictly to tabular figures/numbers, dates/years, tags, status badges, and code.
- Headings: set in `Geist` sans, strictly kept to two lines or fewer across all viewports.
- Body copy: full `ink` for readability and WCAG AAA compliance; `muted` reserved for secondary notes/metadata.

## Frame & Layout
- Container: centered max width `1240px`, horizontal padding `20px` mobile, `40px` desktop.
- Section layout: 12-column grid. Left sticky column (5 columns on desktop) holds section eyebrow, heading, and optional intro; right column (7 columns on desktop) holds content.
- Rhythm & Section bands: alternating `ground` and `surface` bands provide clear tone steps without stacked hairline borders. Closing `Contact` section sits on a full-width `system` field.
- Header: sticky 1-row layout (56px on mobile, 80px on desktop). Wordmark and Contact button sit on the exact same row with zero wrapping on 375px screens. Mobile nav links collapse into an accessible disclosure menu.

## Cards & Components
- Work cards: balanced 6-column grid supporting any number of projects (e.g. 2x2 for 4, 2+3 for 5, 2x3 for 6) with no orphan cards.
- Surfaces: `surface` fill with 1px `rule` border, radius 16px.
- States: border color shifts to `system` on hover/focus; keyboard focus uses `2px` solid `system` outline with `2px` offset.
- Rules: Fin is ink, Tech is system; system is the only accent.
- No other colors anywhere. No gradients, no shadows at rest, no glass blur, no decorative icons, no emoji.
