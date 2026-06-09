# Juba Consultants Website

Marketing site for **Juba Consultants**, a black female owned South African
HR / skills-development consultancy. Built as a fast, static, multi-page site —
no framework, no build step.

## Tech Stack

| Tool | Purpose |
|------|---------|
| HTML5 | Page structure (one file per page) |
| CSS3 | Styling via `css/style.css` (custom-property design tokens) |
| Vanilla JS | `js/main.js` — nav, scroll reveals, contact form |
| Poppins (Google Fonts) | Typography |
| Formspree | Contact-form delivery |

## Pages

`index.html` (Home) · `about.html` · `services.html` · `contact.html`

The Home page includes a "Who We Serve" section (Government / Private Sector /
International) — there is no separate Partners page.

## Brand

| Name | Hex |
|------|-----|
| Navy | `#0B2E6D` |
| Navy Dark | `#071d45` |
| Gold | `#C9A34E` |

Design direction: **Modern Minimal** — generous whitespace, navy/gold accents,
inline-SVG icons (no icon CDN).

## Run locally

No build needed. Serve the folder with any static server:

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

## Editing

- Content lives directly in each `.html` file.
- Shared nav and footer markup is repeated in every page — update all four when
  changing links.
- Styling tokens are at the top of `css/style.css`.
