# Eddie Portfolio v2 - Professional Developer Portfolio

A personal portfolio for Eddie Phung: FP&A, Business Finance, and Finance Systems.

## Tech Stack
- **Framework**: Next.js 15 (App Router, React 19, TypeScript)
- **Styling**: Tailwind CSS v4 via `@tailwindcss/postcss` with `@theme` tokens in `app/globals.css`
- **Typography**: `next/font/google` (`Geist` as `--font-sans`, `Geist_Mono` as `--font-mono`)
- **Runtime & Deployment**: Node 22, npm, Vercel

## Design System
See [DESIGN.md](DESIGN.md) for design tokens, typography, and rules.

## Development Commands
- `npm run dev`: Start Next.js development server
- `npm run build`: Production build (`next build`)
- `npm start`: Start Next.js production server
- `npx tsc --noEmit`: Typecheck codebase

## Adding content
To update or add content, edit the typed data files in `content/` without touching component code:
- **Project**: Add to `content/projects.ts` (automatically renders on the home page and generates a case page at `/work/<slug>`).
- **Achievement / Certificate / Award**: Add to `content/achievements.ts`.
- **Job / Role**: Add to `content/experience.ts`.
- **Skill**: Add to `content/toolkit.ts`.
- **Home section**: Add to `content/sections.ts` (eyebrow numbers and nav links renumber automatically) and wire its component in `components/sections/` into `app/page.tsx`.
- **Profile, Hero & Contact**: Edit `content/profile.ts`.

> Note: Any text enclosed in square brackets (e.g. `[Status]`, `[your@email]`) is a placeholder to be filled in.

