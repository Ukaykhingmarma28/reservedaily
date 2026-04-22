# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Stack

- **Next.js 16.2.4**, **React 19.2.4**, **Tailwind CSS v4**, **ESLint 9 (flat config)**, **TypeScript 5**.
- APIs, file conventions, and config shapes have breaking changes vs. earlier majors. **Before writing or editing framework code, read the relevant guide in `node_modules/next/dist/docs/`** (`01-app/` for App Router, `03-architecture/` for internals). Heed any deprecation notices printed during `dev`/`build`.

## Commands

```bash
npm run dev      # next dev — local dev server on :3000
npm run build    # next build — production build
npm run start    # next start — serve the production build
npm run lint     # eslint (flat config at eslint.config.mjs)
```

No test runner is configured.

## Architecture

### App Router

- Routes live directly under `app/` — no `pages/` dir, no `src/` wrapper.
- `app/layout.tsx` is the root layout (loads Inter + Fraunces fonts via `next/font/google`).
- `app/page.tsx` is the homepage — assembles 17 section components in order (AnnouncementBar through Footer). No other routes exist yet.
- Path alias `@/*` maps to repo root, so imports look like `@/components/sections/Nav`.

### Component layers

- **`components/ui/`** — Primitives (Button, Card, Container, Badge, SearchInput, ScrollRail, icons, etc.). These accept props and render no data of their own.
- **`components/sections/`** — Page-level sections (Nav, Hero, Footer, ProductCard, Testimonials, etc.). Each section is self-contained and typically reads from `lib/data.ts`.
- **`components/illustrations/`** — Decorative SVG art components (BottleArt, LeafArt, CellArt, etc.).

### Data

- `lib/data.ts` is the single data source — exports typed arrays for categories, navigation links, and section content. No API/database yet.

### Tailwind v4 (CSS-first)

- Theme is declared in `app/globals.css` via `@import "tailwindcss"` + `@theme inline { ... }`. There is **no `tailwind.config.{js,ts}`** — don't create one.
- Add new design tokens as CSS custom properties inside the `@theme` block.
- PostCSS config in `postcss.config.mjs` uses `@tailwindcss/postcss` plugin.

### Design tokens (defined in globals.css @theme)

- **Colors**: `cream`, `paper`, `sage`/`sage-2`, `moss`/`moss-2`, `ink`/`ink-2`, `muted`, `line`/`line-2`, `rust`/`rust-soft`, `butter`, `berry`. Background defaults to cream, foreground to ink.
- **Fonts**: Inter (`--font-inter`, body sans) and Fraunces (`--font-fraunces`, display serif with variable optical size). Utility classes `.ff` and `.ff-italic` apply Fraunces.
- **Animations**: `rd-marquee`, `rd-hero-fade`, `rd-pj-grid-drift`, `rd-pj-pulse`, `rd-rev-fade`, `rd-dna-spin`, `rd-drawer-fade`, `rd-drawer-slide`. All prefixed `rd-`.

### Layout

- `Container` component provides 4 max-width presets: `narrow` (960px), `default` (1200px), `wide` (1400px), `full` (1760px). Padding is `px-6` / `md:px-10`.
- Mobile breakpoint is `lg:` (1024px) — the Nav uses dual layouts: `flex lg:hidden` for mobile, `hidden lg:grid` for desktop.

### Config

- `next.config.ts` sets `turbopack.root` to `__dirname` (required — ancestor `package.json` at `/home/maklu/Codes/` causes resolution issues without it) and allows Unsplash remote images.
- ESLint flat config at `eslint.config.mjs` composes `core-web-vitals` + `typescript` presets. Add global ignores to the existing `globalIgnores([...])` call.

### Known gotcha

The parent directory `/home/maklu/Codes/` contains a stray `package.json` and `node_modules/` that can intercept Node module resolution. The `turbopack.root` setting in `next.config.ts` works around this for the dev server. If you encounter resolution errors for installed packages, this ancestor `package.json` is likely the cause.
