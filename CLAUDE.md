# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Minimal Astro starter with Tailwind CSS v4. This is a personal blog project running on Astro.

## Tech Stack

- **Astro 6.x** — Static site generator
- **Tailwind CSS v4** — Styling (via `@tailwindcss/vite`)
- **Node.js >= 22.12.0** — Runtime requirement
- Bun - javascript runtime

## Commands

```bash
bun dev      # Start dev server at localhost:4321
bun build    # Build production site to ./dist/
bun preview  # Preview production build locally
bun astro    # Run Astro CLI (e.g., astro add, astro check)
```

## Architecture

- `src/pages/index.astro` — Main page with dark mode toggle via `prefers-color-scheme`
- `src/styles/global.css` — Tailwind v4 configuration with CSS-first theming and custom `dark` variant
- `astro.config.mjs` — Astro config with Tailwind Vite plugin
- `public/` — Static assets (favicon, etc.)

## Notes

- Dark mode uses `.dark` class on `<html>` element, toggled by inline script based on `prefers-color-scheme`
- Tailwind v4 uses CSS `@custom-variant` syntax, not the traditional `darkMode` config
- No test suite configured
- No backend/API — pure static site
