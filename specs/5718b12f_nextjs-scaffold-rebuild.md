# Plan: CRA -> Next.js 15 scaffold (static hero page)

Repo: /home/agent/src/eddie-portfolio (branch rebuild/scaffold). Follow the task prompt's spec exactly; this plan is the ordered work list. Do NOT read/edit/delete `.claude/` or `EXPERIENCES_DEEP_DIVE.md`. No extra deps, no animation.

## 1. Remove
- `git rm -r src public/index.html public/manifest.json public/pdf.worker.min.js .npmrc`
- Keep all other `public/` files untouched.
- Delete `node_modules` locally if present before reinstalling; `package-lock.json` must be regenerated from scratch (delete it, then `npm install`).

## 2. package.json (rewrite from scratch)
- name `eddie-portfolio`, private true, `"engines": {"node": ">=22"}` optional.
- scripts: `dev` = `next dev`, `build` = `next build`, `start` = `next start`.
- dependencies: next@^15, react@^19, react-dom@^19.
- devDependencies: typescript, @types/node, @types/react, @types/react-dom, tailwindcss@^4, @tailwindcss/postcss@^4.
- Run `npm install` to create package-lock.json; commit it. Verify lock has no react-scripts/bootstrap/three/tsparticles/react-pdf/testing-library (grep).
- Add `.nvmrc` with `22` (optional, harmless).

## 3. Config files
- `postcss.config.mjs`: `export default { plugins: { "@tailwindcss/postcss": {} } };`
- `tsconfig.json`: standard Next 15 (strict, jsx "preserve", moduleResolution bundler, plugins [{name:"next"}], paths `@/*`, include next-env.d.ts, **/*.ts, **/*.tsx, .next/types/**/*.ts; exclude node_modules). `next build` may auto-adjust it; keep result.
- `next.config.ts`: `const nextConfig = {}; export default nextConfig;` (no output export).
- `vercel.json`: exactly `{"framework": "nextjs"}`.
- `.gitignore`: keep existing lines, append `.next/`, `out/`, `next-env.d.ts`, `*.tsbuildinfo`.
- `.factory/project.yaml`: as in prompt.

## 4. app/globals.css
```
@import "tailwindcss";
@theme {
  --color-ground:#F2EBD3; --color-surface:#F8F4E6; --color-ink:#1A1C1C;
  --color-muted:#57584F; --color-rule:#D9CFAE; --color-system:#0D5C63; --color-on-system:#FFFFFF;
  --radius-card:16px;
  --font-sans: var(--font-sans); --font-mono: var(--font-mono);  /* see note */
}
body { font-family: var(--font-sans); background: var(--color-ground); color: var(--color-ink); -webkit-font-smoothing: antialiased; }
html { scroll-behavior: smooth }  /* optional; scroll-margin-top: 88px on sections so sticky header doesn't cover anchors */
```
Note: next/font variables `--font-sans`/`--font-mono` set on `<html>` className would collide with an identically named @theme variable (self-reference). Safest: give next/font `variable: "--font-geist-sans"` / `"--font-geist-mono"`... but the spec says fonts are `--font-sans`/`--font-mono`. Resolution: use `@theme inline { --font-sans: var(--font-sans-loaded) ... }` is overkill; simplest compliant approach: next/font `variable: "--font-sans"` and `"--font-mono"` on `<html>`, and do NOT redeclare them in @theme; body uses `var(--font-sans)`; use `font-[family-name:var(--font-mono)]` for mono. Builder: verify in the browser/build output that fonts resolve. Don't add gradients/shadows/other colors. Disable Tailwind default palette not required, but only use the seven token colors (also `border-rule`, `bg-ground`, etc.).

## 5. app/layout.tsx
- Geist (weight 400,500,600,700, subsets latin, variable `--font-sans`), Geist_Mono (400,500, variable `--font-mono`) from `next/font/google`. (Google fonts fetch at build time; needs network.)
- `export const metadata: Metadata` title `Eddie Phung · FP&A, Business Finance, Finance Systems`, description = hero paragraph, `icons: { icon: "/favicon.png" }`.
- `<html lang="en" className={`${sans.variable} ${mono.variable}`}><body>{children}</body></html>`; import "./globals.css".

## 6. app/page.tsx (static server component)
- `<header>`: `sticky top-0 z-10 bg-ground border-b border-rule`, `min-h-[88px]` (exactly 88px tall at >=640px: `sm:h-[88px]`; under 640px nav wraps below wordmark so allow auto height), `px-5 sm:px-10`, flex, flex-wrap, items-center, justify-between, gap. Wordmark `<a href="#top" aria-label="FinTech, back to top">` 700, 30px, tracking-[-0.045em], leading-none: `<span class="text-ink">Fin</span><span class="text-system">Tech</span>` with no whitespace between. Nav: Approach/Work/Toolkit/Experience links (ink, 15px) + `Contact` pill: `rounded-full bg-system text-on-system font-semibold px-[18px] py-[10px]`, href `#contact`. Under 640px: nav `w-full` on second row; ensure no horizontal overflow at 375px (small gaps, flex-wrap).
- `<main>` not required wrapper: `<section id="top">` min-h `calc(100vh-88px)`, `flex flex-col justify-end p-10` (40px), inner `max-w-[760px]`: eyebrow `font-mono text-[13px] uppercase tracking-[0.08em] text-muted` "FP&A · Business Finance · Finance Systems" (use `&amp;` / `{"FP&A"}`), h1 `font-semibold text-[40px] sm:text-[60px] leading-[1.02] tracking-[-0.035em]` "Eddie Phung", p `text-[18px] sm:text-[21px] leading-[1.5]` with the exact paragraph. Use 640px breakpoint = Tailwind `sm`.
- Five sections ids approach/work/toolkit/experience/contact, headings "Approach", "Selected work", "Toolkit", "Experience", "Contact": `mx-auto max-w-[1240px] px-10 py-24 border-t border-rule`? Note border-t on a max-w centered box would only span 1240px; acceptable per spec ("each: max width 1240px centered ... 1px rule top border"). h2 `font-semibold text-[44px] tracking-[-0.03em]`. Add `scroll-mt-[88px]`. Consider mobile px: spec says 40px; keep 40px (fits 375).
- Body text `text-ink` default; `overflow-x` guard not needed if layout is right.

## 7. Docs
- `CLAUDE.md`: short; keep title/description updated; Tech Stack (Next.js 15 App Router, TS, React 19, Tailwind v4 via @tailwindcss/postcss with @theme tokens in app/globals.css, next/font Geist + Geist Mono, npm/Node 22, Vercel); Development Commands (`npm run dev`, `npm run build`, `npm start`, `npx tsc --noEmit`); mention DESIGN.md. Remove UI UX Pro Max sections and search script block.
- `DESIGN.md`: token table, radius, font pairing (Geist sans 400/500/600/700, Geist Mono 400/500), rule: "Fin is ink, Tech is system; system is the only accent." Also note no gradients/shadows/emoji.

## 8. Verify
1. `rm -rf node_modules .next && npm ci && npm run build` passes.
2. `npx tsc --noEmit` passes (run after build so .next/types exist).
3. `ls src` fails; `grep -E "react-scripts|bootstrap|three|tsparticles|react-pdf|testing-library" package.json package-lock.json` finds nothing.
4. `npm run start` (or dev), fetch `/` and check header, hero text, five ids present; at 375px confirm no horizontal scroll (e.g. headless browser if available; otherwise reason from CSS and check no fixed widths > 375).
5. `git status`: ensure `.next`, `next-env.d.ts`, node_modules not committed; `.claude/` and EXPERIENCES_DEEP_DIVE.md unchanged.
