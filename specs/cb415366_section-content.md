# Plan: content for Approach, Work, Toolkit, Experience, Contact

## Context
`app/page.tsx` currently maps a SECTIONS array to 5 empty `<section>`s (id, `max-w-[1240px] mx-auto px-10 py-24 border-t border-rule scroll-mt-[88px]`, h2 title) inside `<ScrollHero>`. Tokens in `app/globals.css` (@theme): ground, surface, ink, muted, rule, system, on-system -> Tailwind classes `bg-surface`, `border-rule`, `text-system`, etc. Fonts: `font-sans` (Geist), `font-mono` (Geist Mono). Do NOT touch ScrollHero, header, layout.tsx, vercel.json, .factory/project.yaml.

## Changes
Edit only `app/page.tsx` (optionally add small server components under `components/`, e.g. `components/sections/*.tsx` or `components/Section.tsx`; no client code, no deps).

1. Replace the SECTIONS map with five explicit sections, keeping ids `approach work toolkit experience contact` and `scroll-mt-[88px]`.
2. Shared helpers (small local components): `Container/Section` (`max-w-[1240px] mx-auto px-5 sm:px-10 py-24`, `border-t border-rule` except Approach), `Eyebrow` (`font-mono text-[13px] uppercase tracking-[0.08em] text-system mb-[14px]`), `H2` (`text-[32px] sm:text-[44px] font-semibold leading-[1.1] tracking-[-0.03em] max-w-[760px] mb-12 text-ink`). Note: sm breakpoint is 640px, "under 640px" = below sm. Padding: 20px below 640, 40px above.
3. Cards: `bg-surface border border-rule rounded-[16px] p-7` (Work: `rounded-[20px] p-8`). Muted text: `text-muted leading-[1.55]`.
4. **Approach**: eyebrow `01 · Approach`; h2 `From the numbers to a decision, every time.`; grid `grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-4`. Cards: number (mono 13px system), title (22px 600), muted line. Items:
   - 01 What happened — Reliable actuals: data that is complete, reconciled and traceable to source.
   - 02 Why it happened — Variance against budget and forecast, traced back to revenue and cost drivers.
   - 03 What happens next — Driver-based forecasts with stated assumptions, scenarios and sensitivity.
   - 04 What we should do — A recommendation a budget owner can act on, defended with numbers.
5. **Work**: eyebrow `02 · Selected work`; h2 `Four pieces of evidence.`; paragraph `text-[18px] text-muted max-w-[640px] mb-12 leading-[1.55]`: `Built on synthetic or anonymised data. Each one starts from a business problem and ends with an insight or a tool.` Grid `repeat(auto-fit,minmax(320px,1fr))` gap-5, cards are `<a href="#work">` `flex flex-col min-h-[280px]`. Top row `flex justify-between` mono 12px uppercase: tag (left, `text-muted`; `text-system` for card 4) and `[Status]` (right, muted). Title 28px 600 tracking-[-0.02em]; "Proves" line muted; problem line `text-ink mt-auto`; `Read the case →` `text-system font-semibold`. Add vertical spacing (e.g. gap/margins) between elements. Data:
   - `Finance · Reporting` / Management reporting pack / `Proves: P&L structure, consolidation by company and department, Actual vs Budget vs Forecast.` / `[The business problem, in one sentence]`
   - `Finance · Analysis` / Variance analysis case / `Proves: finance judgment. Revenue up, profit down: why, and what to change.` / same placeholder
   - `Finance · Planning` / Driver-based forecast model / `Proves: FP&A capability. Revenue built from drivers, with scenarios and sensitivity.` / same placeholder
   - `Systems · Data` (system color) / Finance data system / `Proves: systems capability. Architecture, data model, validation, reconciliation and audit trail.` / `[Before and after: what the workflow cost, and what it costs now]`
   Use an arrow character `→` literally. Wrap placeholders in JSX string expressions if needed (`{"[Status]"}`) – brackets are fine in JSX text.
6. **Toolkit**: eyebrow `03 · Toolkit`; h2 `Finance first. Systems as leverage.`; grid `repeat(auto-fit,minmax(320px,1fr))` gap-10. Each column: h3 18px 600 (Finance: ink; Systems: system), then `flex flex-wrap gap-[10px]` pills `rounded-full px-[14px] py-[9px]`. Finance pills: `bg-surface border border-rule font-sans text-[15px]` — Financial statements, Management accounting, Budgeting, Forecasting, Variance analysis, Profitability analysis, Working capital. Systems pills: `border border-system text-system font-mono text-[14px]`, no fill — Excel modeling, SQL, Power BI, Data modeling, Workflow automation, AI coding, ERP / EPM. Use `ul/li`.
7. **Experience**: eyebrow `04 · Experience`; h2 `Where the work happened.`; two rows `flex flex-wrap gap-x-12 gap-y-4 py-7 border-t border-rule` (last also `border-b`). Date col `w-[200px] font-mono text-[14px] text-muted` (add `shrink-0`); body `flex-[1_1_480px]` with h3 22px 600 and muted line.
   - `[Start] — now` / `[Role] · YouNet` / `[What you owned, in finance terms] · [The system you built, and what it changed]`
   - `[Start] — [End]` / `[Role] · [Company]` / `[Only what supports the finance story]`
   Use em dash `—` exactly.
8. **Contact**: section `pt-[120px] pb-[72px]`; eyebrow `05 · Contact`; h2 `text-[36px] sm:text-[56px] leading-[1.05] max-w-[900px]` text `[One line on what you are open to]`. Row `flex flex-wrap gap-3` of three `<a>` `rounded-full px-[22px] py-[14px]`:
   - `[your@email]` `bg-system text-on-system font-semibold` href `#contact`
   - `LinkedIn` `border border-ink` href `#contact`
   - `Download CV` `border border-ink` href `/Phung-Thai-Cuong-(Eddie)-Resume.pdf` `target="_blank" rel="noopener noreferrer"`
   Footer `<p className="mt-12 text-[14px] text-muted">© Eddie Phung</p>`. Keep border-t on Contact (Shared style).
9. Mind 375px: no horizontal overflow. `minmax(320px,1fr)` with 20px side padding at 375 gives 335px available — OK; but if needed use `minmax(min(320px,100%),1fr)` to be safe (equivalent at desktop). Do same for 240px. Date column 200px wraps via flex-wrap; fine. Ensure long strings can wrap (`break-words`) for the email placeholder.
10. Use only the seven token colors (no `text-black`, `bg-white`, etc.).

## Verify
- `npx tsc --noEmit` and `npm run build` pass.
- `npm run dev`; check at 375px and 1280px: no horizontal scroll; each header nav link scrolls to its section; bracketed placeholders appear exactly as written (grep page.tsx for each).
- grep for hex/arbitrary colors: none added.
