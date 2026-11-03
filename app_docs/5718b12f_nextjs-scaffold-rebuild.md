# Next.js scaffold rebuild (run 1 of 3)

## What changed
The Create React App site was replaced with a Next.js 15 (App Router, React 19, TypeScript) site that renders one static page: header, hero text and five empty anchor sections. There is no animation and no content beyond the hero yet.

## Where it lives
- `app/page.tsx`: the page.
  - Sticky 88px header with an "Fin"(ink) + "Tech"(system) wordmark linking to `#top`, nav links to `#approach`, `#work`, `#toolkit` and `#experience`, and a `Contact` pill linking to `#contact`.
  - Hero `section#top`: eyebrow, `h1` "Eddie Phung" and the intro paragraph.
  - Five placeholder sections (Approach, Selected work, Toolkit, Experience, Contact), each holding only an `h2`. They are generated from a `SECTIONS` array and use `scroll-mt-[88px]`.
- `app/layout.tsx`: `lang="en"`, title and description metadata, `/favicon.png` icon. Geist (400/500/600/700) is exposed as `--font-sans` and Geist Mono (400/500) as `--font-mono` through `next/font/google`.
- `app/globals.css`: Tailwind v4 import and an `@theme` block with the Butter & teal tokens (`ground`, `surface`, `ink`, `muted`, `rule`, `system`, `on-system`, `--radius-card: 16px`). It also sets body font, background, colour and antialiasing, and `scroll-behavior: smooth` on `html`.
- `postcss.config.mjs` (Tailwind via `@tailwindcss/postcss`), `next.config.ts` (empty config), `tsconfig.json`, `.nvmrc` (22).
- `package.json` was restarted. It has only `next`, `react` and `react-dom`, plus Tailwind, TypeScript and type packages as dev dependencies. Scripts are `dev`, `build` and `start`. `package-lock.json` was regenerated.
- `vercel.json` is now `{"framework": "nextjs"}`. The old SPA rewrite is gone.
- `.factory/project.yaml` (new) sets the factory test to `npm run build` and the typecheck to `npx tsc --noEmit`, with 900s timeouts.
- `.gitignore` gains `.next/`, `out/`, `next-env.d.ts` and `*.tsbuildinfo`.
- `CLAUDE.md` and `DESIGN.md` were rewritten for the new stack and tokens.
- `specs/5718b12f_nextjs-scaffold-rebuild.md` is the spec for this run.

## Removed
All of `src/`, `public/index.html`, `public/manifest.json`, `public/pdf.worker.min.js` and `.npmrc`, along with every CRA dependency.

## Verify
- `npm ci && npm run build`
- `npx tsc --noEmit`
- `npm run dev`, then check the anchors resolve and that nothing scrolls horizontally at 375px wide.

I did not run these commands while writing this up.
