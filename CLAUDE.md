# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # start dev server at http://localhost:5173
npm run build     # production build → dist/
npm run preview   # preview the production build locally
npm run lint      # ESLint — zero warnings policy (--max-warnings 0)
```

There is no test suite configured.

## Architecture

Single-page marketing site for a South African HR/skills-development consultancy. No routing is active despite `react-router-dom` being installed — everything lives on one scroll page.

**Data layer:** All site content (services, partners, contact info) is centralised in `src/data/services.js`. Edit there first when copy or contact details change.

**Page composition:** `App.jsx` composes fixed sections in order: `Navbar → Hero → About → Services → Partners → CTAStrip → Contact → Footer`. Add new sections here.

**Scroll animations:** `FadeUp.jsx` wraps content with a CSS `fade-up` keyframe triggered by the `useInView` hook (IntersectionObserver). Wrap any new section content in `<FadeUp>` to match the existing animation style.

## Brand & Styling

Custom Tailwind tokens (defined in `tailwind.config.js`):
- Colors: `navy` / `navy-dark` / `navy-light`, `gold` / `gold-light` / `gold-dark`
- Font: `font-poppins`

Reusable CSS component classes (defined in `src/index.css`):
- `.btn-primary` — gold fill, navy text; hover inverts to outline
- `.btn-outline` — transparent with white border
- `.btn-navy` — navy fill; hover flips to gold
- `.section-label` — gold uppercase label with decorative left line
- `.section-title` — navy extrabold with fluid clamp sizing
- `.section-sub` — muted slate body text

Prefer these classes over one-off Tailwind utilities to keep the brand consistent.
