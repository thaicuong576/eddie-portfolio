# Content model, project case pages and Achievements

## What changed
All home-page copy moved out of `app/page.tsx` into typed data files in `content/`. Each home section is now its own component in `components/sections/` that reads that data. Two things are new: an Achievements section (`#achievements`, between Experience and Contact) and one statically generated case page per project at `/work/<slug>`. Adding a project, achievement, job, skill or section is now a data edit, not a component edit.

## Where it lives
- `content/types.ts`: types (`Profile`, `Project`/`CaseStudy`, `Achievement`, `ExperienceItem`, `ToolkitGroup`, `ApproachStep`, `Section`).
- `content/profile.ts`, `approach.ts`, `projects.ts`, `achievements.ts`, `experience.ts`, `toolkit.ts`: one file per kind. `content/index.ts` re-exports them all.
- `content/sections.ts`: ordered list of home sections (approach, work, toolkit, experience, achievements, contact). It also exports `sectionEyebrow(id)` (gives `01 · Approach` and so on from list position), `getSection`, `navSections` (every section except contact; uses `navLabel` if set, e.g. "Work") and `contactSection` (the nav pill).
- `content/ui.ts`: small shared UI labels (`Read the case →`, `View →`, `← All work`, Context/Approach/Outcome labels).
- `components/sections/{Approach,Work,Toolkit,Experience,Achievements,Contact}.tsx`: one server component per section.
- `app/work/[slug]/page.tsx`: case page. `generateStaticParams` over `projects`, `dynamicParams = false`, `notFound()` for unknown slugs, `generateMetadata` returns the project title. Shows back link, tag/status, title, proves line, Context/Approach/Outcome blocks, tools, and links if any.
- `components/SiteHeader.tsx`: static header (wordmark and nav in end state, links to `/#<id>`) used on case pages.
- `components/ScrollHero.tsx`: now takes `hero`, `nav` and `contactLabel` props instead of hard-coded strings. The diff only swaps strings for props, so the scroll motion is unchanged.
- `app/page.tsx`: composes the section components and passes data to `ScrollHero`.

## Housekeeping in the same change
- Deleted the whole `.claude/skills/ui-ux-pro-max/` directory (SKILL.md, 24 CSV files under `data/` and `data/stacks/`, `scripts/core.py`, `design_system.py`, `search.py`, and five `__pycache__/*.pyc` files).
- `.factory/project.yaml`: added `ship: base: staging`.
- `CLAUDE.md`: added an "Adding content" section mapping each kind of content to its file.
- `specs/2643f14f_content-model-case-pages.md`: the spec for this work.

## Placeholders
Bracketed text (`[Year]`, `[Award]`, `[Issuer]`, `[Tool]`, the case-study `[ ]` text, contact headline and email) is kept literally in the data. The owner replaces these later.

## How to use / verify
- New project: add an entry to `content/projects.ts` with `featured: true`. A card in Work and a `/work/<slug>` page appear with no other change.
- New achievement, job or skill: add to `achievements.ts`, `experience.ts` or `toolkit.ts`. An achievement with `href` shows a `View →` link opening in a new tab.
- New section: add to `sections.ts` (eyebrows and nav links renumber), then write a component in `components/sections/` and add it to `app/page.tsx`.
- Check: `npm run build` (should list the four `/work/<slug>` pages) and `npx tsc --noEmit`.
