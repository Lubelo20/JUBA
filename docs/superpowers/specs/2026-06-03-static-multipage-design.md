# Static Multipage Website Design

**Date:** 2026-06-03
**Status:** Approved

## Overview

Replace the React + Vite SPA with a zero-dependency static site: five plain HTML files sharing one CSS file and one JS file. No build step. Drop the folder on any CDN or static host.

The visual design (navy/gold brand, Poppins font, all section layouts) is preserved exactly from the current React implementation.

## File Structure

```
juba-consultants/
├── index.html          ← Home page
├── about.html
├── services.html
├── partners.html
├── contact.html
├── css/
│   └── style.css       ← all shared styles
├── js/
│   └── main.js         ← navbar, mobile menu, fade-up, active link
└── public/
    └── favicon.svg     (unchanged)
```

Everything under `src/`, `node_modules/`, `dist/`, `package.json`, `vite.config.js`, `postcss.config.js`, `tailwind.config.js`, `.eslintrc.cjs` is deleted.

## Pages

| File | Content |
|---|---|
| `index.html` | Hero → About teaser ("Learn More" → `about.html`) → Services preview (3 cards + "View All" → `services.html`) → Partners section → CTA strip |
| `about.html` | Page banner + full About section (pillars grid + quote card) |
| `services.html` | Page banner + full Services grid (all 9 cards + additional services banner) |
| `partners.html` | Page banner + Partners cards (Government, Private Sector, International) |
| `contact.html` | Page banner + contact details only — address, phone, email, website, director name. No form. |

All five files share an identical copy-pasted Navbar and Footer.

## CSS (`css/style.css`)

- **CSS custom properties** at `:root`: `--navy: #0B2E6D`, `--navy-dark: #071d45`, `--gold: #C9A34E`, `--gold-light: #dbb96a`
- **Font:** Poppins loaded via Google Fonts CDN `<link>` in each `<head>`
- **Reusable button classes:** `.btn-primary`, `.btn-outline`, `.btn-navy`
- **Typography utilities:** `.section-label` (gold uppercase with left bar), `.section-title` (navy extrabold, fluid clamp sizing), `.section-sub` (slate body)
- **Page banner:** `.page-banner` — white block, 4px gold left border, `pt: 72px` to clear fixed navbar
- **Fade-up animation:** `@keyframes fadeUp` + `.fade-up` class (opacity 0 → 1, translateY 30px → 0); JS adds `.visible` class via IntersectionObserver
- **All section-specific styles** (hero, about, services, partners, CTA strip, footer)

## JavaScript (`js/main.js`)

Four responsibilities, no dependencies:

1. **Navbar scroll shadow** — `window.scroll` listener toggles `.scrolled` class on `<nav>`
2. **Mobile hamburger** — toggles `.open` class; all nav links close the menu on click
3. **Fade-up animations** — `IntersectionObserver` adds `.visible` to `.fade-up` elements when they enter the viewport (fires once, then unobserves)
4. **Active nav link** — on `DOMContentLoaded`, compares `window.location.pathname` to each nav link's `href`; adds `.active` class to the matching link (gold underline, navy text)

## Brand & Content

- Colors, font weights, and spacing match the current React implementation exactly
- All text content is taken from the existing React section components (`src/sections/`)
- Services data (9 cards + additional services list) is hardcoded in `services.html` and the 3-card preview in `index.html`
- Partners data (3 cards) hardcoded in `partners.html` and reused in `index.html`
- Contact details hardcoded from `src/data/services.js`: address, phone, email, website, director

## Constraints

- No JavaScript frameworks or libraries
- No build step — files are served as-is
- Production deployment: upload the root folder directly; no rewrite rules needed (each page is its own `.html` file)
- `public/favicon.svg` is the only asset carried over
