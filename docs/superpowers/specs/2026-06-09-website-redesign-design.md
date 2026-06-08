# Juba Consultants — Website Redesign (Design Spec)

**Date:** 2026-06-09
**Status:** Approved design, pending implementation plan

## Overview

Full restructure and visual redesign of the Juba Consultants marketing site. The
current site is a static multi-page HTML/CSS/JS site whose look feels dated and
whose docs (`CLAUDE.md`, `README.md`) wrongly describe a React/Vite app that does
not exist. This project rebuilds the site as a **clean, modern, corporate** static
site in the chosen **Modern Minimal** visual direction, and corrects the docs.

## Goals

- A site that reads clean, modern, and corporate — premium, never cheap.
- Restructure the information architecture: fold the standalone **Partners** page
  into a **"Who We Serve"** section on the Home page.
- Add a working **enquiry form** on Contact (the current site has no form).
- Keep the existing **navy + gold** brand and **Poppins** typeface.
- Keep it a **static site** (HTML/CSS/vanilla JS) — no framework, easy to host.
- Fix the documentation so it describes the real stack.

## Non-Goals (out of scope)

- No migration to React/Vite/Tailwind.
- No new photography. Imagery stays minimal/graphic; reuse the existing founder
  photo (`images/sinenhlanhla-khathi.jpg`) on About only.
- No blog, testimonials, gallery, or CMS.
- No copywriting overhaul beyond tightening existing copy to suit the cleaner look.

## Design Direction — "Modern Minimal"

Chosen from three options (Classic Corporate / Modern Minimal / Bold Professional).

- Generous whitespace, large headings, calm layout.
- White backgrounds with occasional soft-grey (`#f7f8fa`) section bands.
- Navy and gold used as **accents** (eyebrow labels, buttons, dividers, icons),
  not as large color blocks.
- Thin `1px` dividers between sections instead of heavy shadows.
- Minimal/graphic imagery: icons + subtle shapes; no large stock photos.

### Design Tokens (CSS custom properties)

| Token | Value | Use |
|-------|-------|-----|
| `--navy` | `#0B2E6D` | primary brand, headings accent, buttons |
| `--navy-dark` | `#071d45` | CTA/footer backgrounds |
| `--gold` | `#C9A34E` | accent: eyebrow labels, primary button, dividers |
| `--gold-light` | `#dbb96a` | hover states |
| `--ink` | `#1a1a1a` | body headings |
| `--muted` | `#6b7280` | secondary/body text |
| `--line` | `#ececec` | borders, dividers |
| `--soft` | `#f7f8fa` | alternating section background |
| `--bg` | `#ffffff` | base background |

- **Font:** Poppins (300–800), loaded from Google Fonts (already in use).
- **Buttons:** `.btn-gold` (gold fill, navy text — primary), `.btn-navy` (navy
  fill, white text), `.btn-ghost` (1.5px grey border, dark text).
- **Eyebrow label:** gold uppercase, letter-spaced, with a short `24px` gold rule
  before it.

## Information Architecture

Four pages (down from five; Partners is removed as a page):

1. **Home** (`index.html`)
2. **About** (`about.html`)
3. **Services** (`services.html`)
4. **Contact** (`contact.html`)

Navbar links: Home · About · Services · Contact, plus a "Get in touch" button.
The old `partners.html` is deleted and redirected conceptually into Home's
"Who We Serve" section.

## Page Structures

### Home (`index.html`)
1. **Nav** — white, sticky, subtle bottom border; logo + links + "Get in touch".
2. **Hero** — two columns: left = eyebrow ("Black female owned · Durban, South
   Africa"), large headline, sub, two buttons (Our Services / Contact Us); right =
   soft "Core Expertise" panel with chips + a 3-item stat strip (Gov / SME / Int'l).
3. **About teaser** — heading + intro left; 4 brand values (Professional,
   Consistent, Impactful, Inclusive) right; "Learn more →" to About.
4. **Services preview** — soft-grey band; 3 service cards with icons; link to
   Services.
5. **Who We Serve** (folded-in Partners) — 3 cards: Government, Private Sector,
   International.
6. **CTA strip** — navy band: "Ready to maximise your SETA benefits?" + button.
7. **Footer** — logo/tagline, Services / Company / Contact columns, social icons,
   copyright bar.

### About (`about.html`)
- Page banner (eyebrow + title).
- Company story / "Strengthening organisations through people".
- Brand values / pillars grid.
- **Founder card** — `images/sinenhlanhla-khathi.jpg`, quote, "Sinenhlanhla Khathi,
  Managing Director".
- Trust badges (Government Trusted / Global Standards / Private Sector).
- CTA strip + footer.

### Services (`services.html`)
- Page banner.
- Full services grid (icon cards): Skills Audit, WSP & ATR, Employment Equity
  Plan & Reporting, SETA Grants, B-BBEE Advisory, QCTO Accreditation, plus any
  others already listed in the current `services.html`.
- CTA strip + footer.

### Contact (`contact.html`)
- Page banner.
- Two columns: **contact details** (address, phone, email, website, MD) on one
  side; **enquiry form** on the other.
- **Enquiry form** fields: Name, Email, Phone (optional), Message; submit button.
  Submissions delivered by email to `skhathi@jubasda.co.za` via a static-site form
  service (e.g. Formspree free tier) or `mailto` fallback — exact mechanism chosen
  during implementation. Includes basic required-field validation and a success/
  error message.
- Footer.

## Shared Components & Consistency

- **Single source of truth for nav and footer markup** repeated identically across
  all four pages (same approach as today). Updating one means updating all four.
- **Iconography:** one consistent system across the whole site. Resolve the current
  inconsistency (Home uses emoji; other pages use Lucide SVG). Decision: use a
  single set — inline SVG icons (no external CDN dependency) for service/feature
  icons, and inline brand SVGs for footer social. This removes the runtime
  dependency on `unpkg.com/lucide`.
- **Social + website links:** keep as placeholders (`#`) until real URLs exist;
  mark clearly so they are easy to fill in.
- **Animations:** keep the lightweight `fade-up` IntersectionObserver in
  `js/main.js`; reuse for section reveals.

## CSS / JS Architecture

- One stylesheet `css/style.css`, organised: tokens → base/reset → buttons →
  nav → footer → per-section blocks. Replace the current styles with the Modern
  Minimal system.
- One `js/main.js`: nav scroll state, mobile hamburger, active-link highlight,
  fade-up observer, and contact-form handling.
- No build step; files served directly.

## Documentation Fixes

- Rewrite `README.md` and `CLAUDE.md` to describe the real static-site stack
  (HTML/CSS/vanilla JS, no React/Vite/Tailwind, no `src/`), the four-page IA, the
  design tokens, and how to preview locally (open `index.html` or a simple static
  server).

## Accessibility & Quality

- Semantic landmarks (`nav`, `main`, `footer`, headings in order).
- Color contrast: body text and buttons meet WCAG AA against their backgrounds.
- All interactive elements keyboard-reachable; visible focus styles.
- `alt` text on the founder image; `aria-label`s on icon-only links.
- Responsive: mobile-first; hero and grids collapse to single column on small
  screens; hamburger menu on mobile.

## Success Criteria

- Four pages render the Modern Minimal design consistently.
- Partners content lives in Home's "Who We Serve" section; `partners.html` removed
  and not linked anywhere.
- Contact enquiry form submits and delivers (or degrades gracefully).
- No emoji/Lucide icon inconsistency; no external icon CDN dependency.
- `README.md` and `CLAUDE.md` accurately describe the static site.
- Site is responsive and passes basic a11y checks.
