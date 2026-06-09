# CLAUDE.md

Guidance for Claude Code when working in this repository.

## What this is

A static, multi-page marketing site (HTML/CSS/vanilla JS) for Juba Consultants,
a South African HR/skills-development consultancy. **No framework, no build
step, no test suite.** Do not assume React/Vite/Tailwind.

## Run / preview

```bash
python3 -m http.server 8000   # open http://localhost:8000
```

## Structure

- `index.html` — Home (hero → about teaser → services preview → Who We Serve → CTA)
- `about.html` — company story, values, founder card
- `services.html` — full services grid
- `contact.html` — contact details + enquiry form (Formspree)
- `css/style.css` — all styling; design tokens (`--navy`, `--gold`, …) at the top
- `js/main.js` — nav behaviour, scroll-reveal (`.fade-up`), contact-form handling
- `images/`, `public/favicon.svg` — assets

There is no Partners page; that content is the "Who We Serve" section on Home.

## Conventions

- Nav and footer markup are duplicated across all four pages — keep them in sync.
- Icons are inline SVG with `class="icon"`; do not reintroduce an icon CDN.
- Prefer the existing component classes (`.btn-primary`, `.eyebrow`,
  `.section-title`, `.card-item`, …) over one-off styles.
- Brand colours: navy `#0B2E6D`, navy-dark `#071d45`, gold `#C9A34E`; font Poppins.
