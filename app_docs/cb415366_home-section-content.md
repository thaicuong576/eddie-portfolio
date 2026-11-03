# Home page section content (Approach, Work, Toolkit, Experience, Contact)

## What changed
`app/page.tsx` previously rendered five empty anchor sections from a `SECTIONS` array. It now renders five fully written sections inside `<ScrollHero>`, with data held in module-level constants (`APPROACH_CARDS`, `WORK_CARDS`, `FINANCE_SKILLS`, `SYSTEMS_SKILLS`, `EXPERIENCE_ITEMS`). It is server-only markup with Tailwind classes. No new dependency, and the hero, header and layout are untouched.

Anchor ids are kept (`approach`, `work`, `toolkit`, `experience`, `contact`), each with `scroll-mt-[88px]` so the header nav lands correctly.

## Sections
- **01 Approach**: four numbered cards (What happened / Why it happened / What happens next / What we should do). No top border, since it follows the hero.
- **02 Selected work**: intro paragraph plus four cards. Each is an `<a href="#work">` (no case-study pages yet) with tag, `[Status]`, title, "Proves" line, problem line pushed to the bottom with `mt-auto`, and `Read the case →`. The `Systems · Data` tag uses `text-system`, the others `text-muted`, via the `isSystemTag` flag.
- **03 Toolkit**: two columns of pills. Finance pills are filled with `surface`, bordered with `rule`, and set in Geist. Systems pills are outlined in `system` and set in Geist Mono. Both are `ul/li`.
- **04 Experience**: two rows with a 200px mono date column and a flexible body. The last row also gets a bottom border.
- **05 Contact**: larger padding (120px top, 72px bottom), a placeholder h2, three pill links, and the `© Eddie Phung` footer line. `Download CV` links to `/Phung-Thai-Cuong-(Eddie)-Resume.pdf` and opens in a new tab with `rel="noopener noreferrer"`. The email and LinkedIn links point to `#contact`.

## Things to know
- Bracketed text (`[Status]`, `[Role] · YouNet`, `[your@email]`, etc.) is intentional owner-fill-in placeholder copy and is kept literally. Do not "fix" it.
- Responsive: container padding is `px-5 sm:px-10`, and h2 sizes switch at the `sm` (640px) breakpoint. Grids use `minmax(min(Npx,100%),1fr)` rather than a bare `minmax(Npx,1fr)` so a column cannot overflow narrow viewports (this is equivalent on desktop).
- Colors use only the existing tokens (`surface`, `rule`, `ink`, `muted`, `system`, `on-system`).

## Files
- `app/page.tsx`: all the content and layout.
- `specs/cb415366_section-content.md`: the implementation plan this was built from.

## Verify
- `npx tsc --noEmit` and `npm run build`.
- `npm run dev`, then check 375px and 1280px: no horizontal scroll, every header nav link scrolls to its section, and the placeholders read exactly as written.
