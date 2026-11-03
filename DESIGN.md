# EDDIE PHUNG PORTFOLIO — Design System

## Core Design Tokens (Butter & Teal)

| Token | Value | Use |
|---|---|---|
| `--color-ground` | `#F2EBD3` | page background |
| `--color-surface` | `#F8F4E6` | cards, statement panels |
| `--color-ink` | `#1A1C1C` | body text, the word "Fin" |
| `--color-muted` | `#57584F` | secondary text, periods, metadata |
| `--color-rule` | `#D9CFAE` | hairline borders and dividers |
| `--color-system` | `#0D5C63` | the word "Tech", links, buttons, progress line, the one accent |
| `--color-on-system` | `#FFFFFF` | text on system-colored fills |

## Radii & Layout Tokens
- Cards & statement panels: `--radius-card: 12px`
- Buttons & badges: fully rounded (`9999px`)
- Header height: `--header-h: 56px` on mobile (<640px), `64px` on desktop (>=640px)
- Max content width: `1240px`

## Typography & Base
- Fonts: `IBM Plex Sans` (400, 500, 600) as `--font-sans`, `IBM Plex Mono` (400, 500) as `--font-mono`.
- Numerals: tabular figures (`tabular-nums`) for dates, step counters, statuses and metrics.
- Body: `font-family: var(--font-sans)`, background `ground`, color `ink`, `-webkit-font-smoothing: antialiased`.
- Line length: <= 68ch for prose blocks. Sentence case for all labels and eyebrows (no forced uppercase tracking).

## Structure & Rhythm ("The Statement")
- Left rail: Section number (mono tabular teal) and sentence-case label in a 3-column sticky rail on desktop (cols 1-3 of 12-col grid).
- Dividers: Single hairline rules (`rule`), no duplicate borders (first section omits `border-t` to preserve a single clean line below the docked header).
- Work grid: Balanced count-aware grid (2x2 for 4 items, 3-col for multiples of 3, 2-col with final card spanning 2 cols for odd counts).
- Case pages: Two-column layout on desktop with sticky project metadata on the left and stacked Context, Approach, and an emphasized Outcome panel on the right.

## Rule
Fin is ink, Tech is system; system is the only accent.
No other colors anywhere. No gradients, no shadows, no emoji.
