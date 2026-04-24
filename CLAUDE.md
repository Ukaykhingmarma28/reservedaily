# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Stack

- **Next.js 16.2.4**, **React 19.2.4**, **Tailwind CSS v4**, **ESLint 9 (flat config)**, **TypeScript 5**.
- APIs, file conventions, and config shapes have breaking changes vs. earlier majors. **Before writing or editing framework code, read the relevant guide in `node_modules/next/dist/docs/`** (`01-app/` for App Router, `03-architecture/` for internals). Heed any deprecation notices printed during `dev`/`build`.

## Commands

```bash
npm run dev          # next dev --turbopack — local dev server on :3000 (binds 0.0.0.0)
npm run dev:network  # same but without Turbopack (for debugging Turbopack-specific issues)
npm run build        # next build — production build (standalone output)
npm run start        # next start — serve the production build
npm run lint         # eslint (flat config at eslint.config.mjs)
```

No test runner is configured. Docker: `docker compose up --build` for production-like local run.

## Architecture

### App Router

- Routes live directly under `app/` — no `pages/` dir, no `src/` wrapper.
- `app/layout.tsx` is the root layout (loads Inter + Fraunces fonts via `next/font/google`).
- `app/page.tsx` is the homepage — assembles section components in order (AnnouncementBar through Footer).
- `app/vital/` is the Vital AI chat page — single `ChatShell` component with its own layout for metadata.
- Path alias `@/*` maps to repo root, so imports look like `@/components/sections/Nav`.

### Component layers

- **`components/ui/`** — Primitives (Button, Card, Container, Badge, SearchInput, ScrollRail, icons, etc.). Mostly server components. Accept props, render no data of their own.
- **`components/sections/`** — Page-level sections (Nav, Hero, Footer, ProductCard, Testimonials, etc.). Each section is self-contained and typically reads from `lib/data.ts`. Most use `"use client"` for interactivity (carousels, dropdowns, touch/swipe).
- **`components/vital/`** — Vital AI chat interface (ChatShell, GreetingView, MessageList, ChatInput, Sidebar, and message-type cards). All client components. ChatShell uses `useReducer` with a state machine driving conversation phases.
- **`components/illustrations/`** — Decorative SVG art components. Accept `{ color, bg, className }` props.

### Data

- `lib/data.ts` — typed arrays for categories, products, navigation links, and section content. No API/database yet.
- `lib/vital/` — Vital AI logic: `types.ts` (discriminated union message types, 9 conversation phases), `mock-engine.ts` (state machine that generates responses per phase), `mock-data.ts` (mock biomarkers, wellness paths, booking slots, Q&A).

### Tailwind v4 (CSS-first)

- Theme is declared in `app/globals.css` via `@import "tailwindcss"` + `@theme inline { ... }`. There is **no `tailwind.config.{js,ts}`** — don't create one.
- Add new design tokens as CSS custom properties inside the `@theme` block.
- PostCSS config in `postcss.config.mjs` uses `@tailwindcss/postcss` plugin.

### Design tokens (defined in globals.css @theme)

- **Colors**: `cream` (#fff), `paper`, `sage`/`sage-2`, `moss`/`moss-2`, `ink`/`ink-2`, `muted`, `line`/`line-2`, `rust`/`rust-soft`, `butter`, `berry`. Background defaults to cream, foreground to ink.
- **Fonts**: Inter (`--font-sans`, body) and Fraunces/Figtree (`--font-display`, headings). Utility class `.ff` applies the display font.
- **Animations**: All keyframes prefixed `rd-` (e.g. `rd-marquee`, `rd-hero-fade`, `rd-dna-spin`, `rd-drawer-slide`, `rd-typing-dot`, `rd-fade-up`, `rd-vital-pulse`, `rd-msg-in`). Defined in globals.css.

### Layout

- `Container` component provides 4 max-width presets: `narrow` (960px), `default` (1200px), `wide` (1400px), `full` (1760px). Padding is `px-6` / `md:px-10`.
- Mobile breakpoint is `lg:` (1024px) — the Nav uses dual layouts: `flex lg:hidden` for mobile, `hidden lg:grid` for desktop.
- Vital AI uses `h-dvh` for full viewport height with flex column layout.

### Config

- `next.config.ts`: `output: "standalone"` for Docker, `turbopack.root: __dirname` (works around ancestor `package.json` resolution issues), `remotePatterns` for Unsplash images.
- ESLint flat config at `eslint.config.mjs` composes `core-web-vitals` + `typescript` presets. Add global ignores to the existing `globalIgnores([...])` call.
- Dockerfile: multi-stage Node 22 Alpine build. `docker-compose.yml` maps port 3000.

### Known gotcha

An ancestor directory may contain a stray `package.json` and `node_modules/` that can intercept Node module resolution. The `turbopack.root` setting in `next.config.ts` works around this for the dev server. If you encounter resolution errors for installed packages, this ancestor `package.json` is likely the cause.
