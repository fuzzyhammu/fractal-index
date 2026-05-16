# Geetika Gehlot Portfolio

A personal e-portfolio site for Geetika Gehlot — a multidisciplinary creator, scientist, researcher, and musician from Montréal.

## Run & Operate

- `pnpm --filter @workspace/geetika run dev` — run the portfolio site (port from workflow)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- Frontend: React + Vite + Tailwind CSS v3 (PostCSS)
- UI: shadcn/ui components, Radix UI
- Routing: react-router-dom (BrowserRouter with BASE_URL basename)
- Fonts: Libre Baskerville, Cormorant Garamond, Source Sans 3, JetBrains Mono (Google Fonts)

## Where things live

- `artifacts/geetika/` — the portfolio frontend artifact (main app)
- `artifacts/geetika/src/pages/` — page components (Index, About, Academics, Works, Vault, Contact, Dashboard)
- `artifacts/geetika/src/components/` — shared components including SiteChrome, HeroSlideshow, ThemeToggle
- `artifacts/geetika/src/data/clusters.ts` — navigation cluster data + legacy URL redirects
- `artifacts/geetika/src/index.css` — full design system (HSL CSS vars, editorial typography, textures)
- `artifacts/geetika/tailwind.config.ts` — Tailwind v3 config with custom palette (paper, ink, navy, gold, oxblood)

## Architecture decisions

- Pure frontend, no backend — no Supabase, no auth, no database needed
- Tailwind v3 with PostCSS (not @tailwindcss/vite) for compatibility with the monorepo
- BrowserRouter with `basename={import.meta.env.BASE_URL}` for Replit path routing
- Dark mode default via localStorage, `class` strategy on `<html>`
- Design system built around editorial magazine aesthetic with custom CSS utilities (grain, scanlines, fancy-tile, etc.)

## Product

A cinematic editorial e-portfolio showcasing Geetika's work across science, academics, creative projects, and music. Features a hero slideshow, bento-style content grids, mood mosaic, fractal visualizations, and a curated vault.

## User preferences

- Preserve original Lovable design exactly — no unsolicited redesigns
- The portfolio is the user's real product; treat visual fidelity as a hard requirement

## Gotchas

- Tailwind v3 used (not v4) — `@tailwind base/components/utilities` directives, not `@import "tailwindcss"`
- `postcss.config.js` required alongside `tailwind.config.ts`
- Do not use `@tailwindcss/vite` plugin — use CSS PostCSS plugins in vite.config.ts instead
- The app has custom CSS utilities (`.grain`, `.fancy-tile`, `.force-light`, etc.) that must not be removed
- Images are served from `artifacts/geetika/public/` and `src/assets/`

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
