# Juba Consultants Website Redesign — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the Juba Consultants static site in a clean, modern, corporate "Modern Minimal" design — four pages (Home, About, Services, Contact), Partners folded into a Home "Who We Serve" section, a working Contact enquiry form, one consistent inline-SVG icon system, and corrected docs.

**Architecture:** Static HTML/CSS/vanilla-JS, no build step. One stylesheet (`css/style.css`) holds all design tokens and component styles; one script (`js/main.js`) holds nav behaviour, scroll reveals, and form handling. Nav and footer markup are repeated identically across pages. Icons are inline SVG (no external CDN).

**Tech Stack:** HTML5, CSS3 (custom properties, fl/grid), vanilla JavaScript, Google Fonts (Poppins), Formspree (enquiry form delivery).

**Branch:** `redesign-modern-minimal` (already created; the design spec is committed there).

**Reference:** `docs/superpowers/specs/2026-06-09-website-redesign-design.md`

---

## Verification model (no test framework)

This project has no automated test suite. Each task is verified by:
- Serving the site: `python3 -m http.server 8000` (run once, in the background) and loading `http://localhost:8000/<page>.html`.
- `grep` assertions for structural guarantees (no dead references, no CDN, etc.).
- A visual check against the approved Modern Minimal mockup.

Start the server once at the beginning:

```bash
cd /Users/ndumisomngomezulu/Downloads/juba-consultants
python3 -m http.server 8000   # leave running in a background terminal
```

---

## Shared markup (use verbatim in every page task)

These two blocks are **identical on all four pages**. Copy them exactly. The only
per-page difference is which nav link gets `class="active"` (handled by JS via
filename, so the markup is identical).

**NAV block** (immediately inside `<body>`):

```html
<!-- NAVBAR -->
<nav id="navbar">
  <a href="index.html" class="nav-logo">
    <span class="logo-main">JUBA</span>
    <span class="logo-sub">Consultants</span>
  </a>
  <ul class="nav-links">
    <li><a href="index.html">Home</a></li>
    <li><a href="about.html">About</a></li>
    <li><a href="services.html">Services</a></li>
    <li><a href="contact.html">Contact</a></li>
  </ul>
  <a href="contact.html" class="nav-cta btn-navy">Get in touch</a>
  <button class="nav-hamburger" id="hamburger" aria-label="Toggle menu" aria-expanded="false">
    <span></span><span></span><span></span>
  </button>
  <div class="nav-mobile">
    <a href="index.html">Home</a>
    <a href="about.html">About</a>
    <a href="services.html">Services</a>
    <a href="contact.html">Contact</a>
    <a href="contact.html" class="btn-navy">Get in touch</a>
  </div>
</nav>
```

**FOOTER block** (immediately before `<script>` at end of `<body>`):

```html
<!-- FOOTER -->
<footer>
  <div class="footer-inner">
    <div class="footer-brand">
      <div class="footer-logo-main">JUBA</div>
      <div class="footer-logo-sub">Consultants</div>
      <p class="footer-tagline">Empowering excellence. Nurturing potential. Your gateway to strategic HR solutions and professional training.</p>
      <div class="footer-social">
        <a href="#" class="social-icon" aria-label="LinkedIn"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z"/></svg></a>
        <a href="#" class="social-icon" aria-label="Facebook"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg></a>
        <a href="#" class="social-icon" aria-label="X"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"/></svg></a>
      </div>
    </div>
    <div class="footer-col">
      <p class="footer-col-title">Services</p>
      <ul>
        <li><a href="services.html">Skills Audit</a></li>
        <li><a href="services.html">WSP &amp; ATR</a></li>
        <li><a href="services.html">Employment Equity</a></li>
        <li><a href="services.html">SETA Grants</a></li>
        <li><a href="services.html">B-BBEE Advisory</a></li>
        <li><a href="services.html">QCTO Accreditation</a></li>
      </ul>
    </div>
    <div class="footer-col">
      <p class="footer-col-title">Company</p>
      <ul>
        <li><a href="about.html">About Us</a></li>
        <li><a href="services.html">Services</a></li>
        <li><a href="contact.html">Contact</a></li>
      </ul>
    </div>
    <div class="footer-col">
      <p class="footer-col-title">Contact</p>
      <ul>
        <li><a href="tel:+27793517376">+27 79 351 7376</a></li>
        <li><a href="mailto:skhathi@jubasda.co.za">skhathi@jubasda.co.za</a></li>
        <li><span>57 Magwaza Maphalala Street, Berea 4001, Durban</span></li>
        <li><a href="#">www.jubaconsultants.co.za</a></li>
      </ul>
    </div>
  </div>
  <div class="footer-bottom">
    <span>&copy; 2026 Juba Consultants (Pty) Ltd. All rights reserved.</span>
    <span>Juba Skills Development Academy</span>
  </div>
</footer>
```

**HEAD block** (per page — only `<title>` changes):

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>PAGE_TITLE</title>
  <link rel="icon" href="public/favicon.svg" type="image/svg+xml">
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="css/style.css">
</head>
<body>
```

**SCRIPT block** (end of every page, replaces the old Lucide CDN tags):

```html
<script src="js/main.js"></script>
</body>
</html>
```

**Inline SVG icon set** — paste the matching `<svg>` where a task references
`ICON(name)`. All are 24×24 stroke icons; the CSS sizes them via the parent.

```html
<!-- ICON(search) -->
<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/></svg>
<!-- ICON(clipboard) -->
<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="8" y="3" width="8" height="4" rx="1"/><path d="M9 5H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-3"/><path d="m9 14 2 2 4-4"/></svg>
<!-- ICON(scale) -->
<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3v18"/><path d="M5 21h14"/><path d="m6 8 -3 6h6Z"/><path d="m18 8 -3 6h6Z"/><path d="M5 8h14"/></svg>
<!-- ICON(coins) -->
<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="8" cy="8" r="6"/><path d="M18.09 10.37A6 6 0 1 1 10.34 18"/><path d="M7 6h1v4"/><path d="m16.71 13.88.7.71-2.82 2.82"/></svg>
<!-- ICON(award) -->
<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/></svg>
<!-- ICON(cap) -->
<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 10 12 5 2 10l10 5 10-5Z"/><path d="M6 12v5c0 1 2.5 3 6 3s6-2 6-3v-5"/></svg>
<!-- ICON(landmark) -->
<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 22h18"/><path d="M6 18v-7"/><path d="M10 18v-7"/><path d="M14 18v-7"/><path d="M18 18v-7"/><path d="M12 2 3 8h18Z"/></svg>
<!-- ICON(building) -->
<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="5" y="2" width="14" height="20" rx="1"/><path d="M9 6h0M15 6h0M9 10h0M15 10h0M9 14h0M15 14h0"/><path d="M10 22v-4h4v4"/></svg>
<!-- ICON(globe) -->
<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15 15 0 0 1 0 20 15 15 0 0 1 0-20"/></svg>
<!-- ICON(map-pin) -->
<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
<!-- ICON(phone) -->
<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92Z"/></svg>
<!-- ICON(mail) -->
<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m2 7 10 6 10-6"/></svg>
<!-- ICON(user) -->
<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="8" r="4"/><path d="M4 21v-1a6 6 0 0 1 6-6h4a6 6 0 0 1 6 6v1"/></svg>
<!-- ICON(handshake) -->
<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m11 17 2 2a1 1 0 0 0 1.4 0l3.6-3.6a1 1 0 0 0 0-1.4L13 9"/><path d="m18 14 2-2"/><path d="m3.5 11.5 4-4a2 2 0 0 1 2.8 0L13 10"/><path d="m6 18 2 2"/></svg>
```

---

### Task 1: Stylesheet — full Modern Minimal design system

**Files:**
- Modify (full replace): `css/style.css`

- [ ] **Step 1: Replace the entire contents of `css/style.css`** with the design system below. It defines tokens, base styles, buttons, nav, footer, page banner, and all section components used by the four pages.

```css
/* ============ Juba Consultants — Modern Minimal ============ */
:root {
  --navy:       #0B2E6D;
  --navy-dark:  #071d45;
  --gold:       #C9A34E;
  --gold-light: #dbb96a;
  --ink:        #1a1a1a;
  --muted:      #6b7280;
  --line:       #ececec;
  --soft:       #f7f8fa;
  --bg:         #ffffff;
  --maxw:       1200px;
}

* { margin: 0; padding: 0; box-sizing: border-box; }
html { scroll-behavior: smooth; }
body { font-family: 'Poppins', system-ui, sans-serif; color: var(--ink); background: var(--bg); line-height: 1.6; -webkit-font-smoothing: antialiased; }
a { color: inherit; text-decoration: none; }
img { max-width: 100%; display: block; }
.icon { width: 100%; height: 100%; }

.container { max-width: var(--maxw); margin: 0 auto; padding: 0 24px; }
.section { padding: 88px 0; }
.section--soft { background: var(--soft); border-top: 1px solid var(--line); border-bottom: 1px solid var(--line); }
.section--border { border-top: 1px solid var(--line); }

/* Eyebrow / labels / titles */
.eyebrow { display: inline-flex; align-items: center; gap: 10px; color: var(--gold); font-size: 12px; font-weight: 600; letter-spacing: 2px; text-transform: uppercase; }
.eyebrow::before { content: ""; width: 26px; height: 2px; background: var(--gold); }
.section-title { color: var(--ink); font-weight: 700; letter-spacing: -.5px; font-size: clamp(26px, 4vw, 38px); line-height: 1.15; margin: 14px 0 0; }
.section-sub { color: var(--muted); font-size: 16px; max-width: 620px; margin: 16px 0 0; }

/* Buttons */
.btn-primary, .btn-outline, .btn-navy { display: inline-block; padding: 13px 26px; border-radius: 7px; font-size: 14px; font-weight: 600; cursor: pointer; transition: .2s; border: 2px solid transparent; }
.btn-primary { background: var(--gold); color: var(--navy-dark); }
.btn-primary:hover { background: var(--gold-light); }
.btn-outline { background: transparent; color: var(--ink); border-color: #d7d7d7; }
.btn-outline:hover { border-color: var(--navy); color: var(--navy); }
.btn-navy { background: var(--navy); color: #fff; }
.btn-navy:hover { background: var(--navy-dark); }

/* Navbar */
#navbar { position: sticky; top: 0; z-index: 50; display: flex; align-items: center; justify-content: space-between; gap: 24px; padding: 14px 24px; background: rgba(255,255,255,.92); backdrop-filter: blur(8px); border-bottom: 1px solid var(--line); }
.nav-logo .logo-main { font-size: 24px; font-weight: 800; color: var(--navy); letter-spacing: 3px; line-height: 1; }
.nav-logo .logo-sub { font-size: 8px; font-weight: 600; color: var(--gold); letter-spacing: 3px; text-transform: uppercase; }
.nav-links { display: flex; gap: 28px; list-style: none; }
.nav-links a { font-size: 14px; font-weight: 500; color: #444; transition: .2s; }
.nav-links a:hover, .nav-links a.active { color: var(--navy); font-weight: 600; }
.nav-cta { padding: 10px 20px; font-size: 13px; }
.nav-hamburger { display: none; flex-direction: column; gap: 5px; background: none; border: none; cursor: pointer; }
.nav-hamburger span { width: 24px; height: 2px; background: var(--navy); transition: .2s; }
.nav-mobile { display: none; }

/* Page banner (inner pages) */
.page-banner { background: var(--soft); border-bottom: 1px solid var(--line); padding: 56px 0; }
.page-banner .container { display: flex; flex-direction: column; gap: 6px; }

/* Hero */
.hero { padding: 80px 0; }
.hero-inner { display: grid; grid-template-columns: 1.15fr .85fr; gap: 48px; align-items: center; }
.hero h1 { font-size: clamp(34px, 5vw, 50px); font-weight: 700; line-height: 1.08; letter-spacing: -1px; margin: 18px 0 18px; }
.hero h1 span { color: var(--navy); }
.hero-sub { color: var(--muted); font-size: 17px; max-width: 460px; margin-bottom: 28px; }
.hero-buttons { display: flex; gap: 14px; flex-wrap: wrap; }
.hero-panel { background: var(--soft); border: 1px solid var(--line); border-radius: 14px; padding: 28px; }
.hero-panel-title { font-size: 12px; letter-spacing: 1.5px; text-transform: uppercase; color: var(--gold); font-weight: 600; margin-bottom: 16px; }
.hero-chips { display: flex; flex-wrap: wrap; gap: 9px; }
.hero-chip { background: #fff; border: 1px solid var(--line); border-radius: 22px; padding: 7px 14px; font-size: 12px; font-weight: 500; color: #333; }
.hero-stats { display: flex; gap: 24px; margin-top: 22px; padding-top: 22px; border-top: 1px solid var(--line); }
.hero-stat-num { display: block; color: var(--navy); font-size: 20px; font-weight: 700; }
.hero-stat-label { font-size: 10px; color: var(--muted); text-transform: uppercase; letter-spacing: 1px; }

/* Two-column about */
.about-inner { display: grid; grid-template-columns: 1fr 1fr; gap: 56px; align-items: start; }
.about-body { color: var(--muted); font-size: 16px; margin: 18px 0 24px; }
.values-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
.value { border-left: 2px solid var(--gold); padding: 4px 0 4px 16px; }
.value-name { font-weight: 600; font-size: 15px; }
.value-desc { font-size: 13px; color: var(--muted); }

/* Founder card */
.founder-card { background: var(--soft); border: 1px solid var(--line); border-radius: 16px; padding: 28px; }
.founder-photo { width: 150px; height: 150px; object-fit: cover; border-radius: 50%; margin-bottom: 18px; }
.founder-quote { font-size: 16px; font-style: italic; color: var(--ink); }
.founder-author { margin-top: 12px; font-weight: 600; color: var(--navy); font-size: 14px; }
.trust-badges { display: flex; gap: 14px; margin-top: 22px; }
.trust-badge { flex: 1; text-align: center; border: 1px solid var(--line); border-radius: 12px; padding: 16px 8px; }
.trust-badge-icon { width: 26px; height: 26px; margin: 0 auto 8px; color: var(--navy); }
.trust-badge-label { font-size: 12px; font-weight: 500; }

/* Header row (section title + side link) */
.section-head { display: flex; align-items: flex-end; justify-content: space-between; gap: 20px; flex-wrap: wrap; }

/* Service cards */
.cards-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 22px; margin-top: 36px; }
.card-item { background: #fff; border: 1px solid var(--line); border-radius: 12px; padding: 26px; transition: .2s; }
.card-item:hover { border-color: var(--gold); transform: translateY(-3px); }
.card-icon { width: 46px; height: 46px; border-radius: 10px; background: rgba(11,46,109,.07); color: var(--navy); display: flex; align-items: center; justify-content: center; padding: 11px; margin-bottom: 16px; }
.card-name { font-size: 16px; font-weight: 600; margin-bottom: 8px; }
.card-desc { font-size: 14px; color: var(--muted); }

/* Who We Serve */
.serve-card { border: 1px solid var(--line); border-radius: 12px; padding: 28px; }
.serve-icon { width: 36px; height: 36px; color: var(--navy); margin-bottom: 14px; }
.serve-title { color: var(--navy); font-size: 18px; font-weight: 600; margin-bottom: 8px; }
.serve-desc { font-size: 14px; color: var(--muted); }

/* CTA strip */
.cta-strip { background: var(--navy); color: #fff; }
.cta-strip .container { display: flex; align-items: center; justify-content: space-between; gap: 24px; padding-top: 56px; padding-bottom: 56px; flex-wrap: wrap; }
.cta-strip h2 { font-size: clamp(22px, 3vw, 28px); font-weight: 700; }
.cta-strip p { color: #c3cee0; margin-top: 6px; }

/* Contact */
.contact-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 56px; align-items: start; }
.contact-item { display: flex; gap: 16px; margin-bottom: 22px; }
.contact-item-icon { flex: none; width: 44px; height: 44px; border-radius: 10px; background: rgba(11,46,109,.07); color: var(--navy); display: flex; align-items: center; justify-content: center; padding: 11px; }
.contact-item-label { font-size: 12px; text-transform: uppercase; letter-spacing: 1px; color: var(--gold); font-weight: 600; }
.contact-item-value { font-size: 15px; }
.contact-form { background: var(--soft); border: 1px solid var(--line); border-radius: 16px; padding: 30px; }
.form-field { margin-bottom: 18px; }
.form-field label { display: block; font-size: 13px; font-weight: 500; margin-bottom: 6px; }
.form-field input, .form-field textarea { width: 100%; padding: 12px 14px; border: 1px solid #dcdcdc; border-radius: 8px; font-family: inherit; font-size: 14px; background: #fff; }
.form-field input:focus, .form-field textarea:focus { outline: none; border-color: var(--navy); }
.form-field textarea { resize: vertical; min-height: 120px; }
.form-status { margin-top: 14px; font-size: 14px; font-weight: 500; }
.form-status.ok { color: #1a7f37; }
.form-status.err { color: #c0392b; }

/* Footer */
footer { background: var(--navy-dark); color: #b9c4da; padding: 56px 0 0; }
.footer-inner { max-width: var(--maxw); margin: 0 auto; padding: 0 24px 40px; display: grid; grid-template-columns: 1.6fr 1fr 1fr 1fr; gap: 32px; }
.footer-logo-main { font-size: 22px; font-weight: 800; color: #fff; letter-spacing: 3px; }
.footer-logo-sub { font-size: 9px; font-weight: 600; color: var(--gold); letter-spacing: 3px; text-transform: uppercase; }
.footer-tagline { font-size: 13px; margin: 14px 0 18px; max-width: 320px; }
.footer-social { display: flex; gap: 10px; }
.social-icon { width: 36px; height: 36px; border-radius: 8px; background: rgba(255,255,255,.08); display: flex; align-items: center; justify-content: center; transition: .2s; }
.social-icon svg { width: 16px; height: 16px; fill: #fff; }
.social-icon:hover { background: var(--gold); }
.social-icon:hover svg { fill: var(--navy-dark); }
.footer-col-title { color: #fff; font-weight: 600; font-size: 14px; margin-bottom: 14px; }
.footer-col ul { list-style: none; }
.footer-col li { margin-bottom: 9px; font-size: 13px; }
.footer-col a:hover { color: var(--gold); }
.footer-bottom { border-top: 1px solid rgba(255,255,255,.1); padding: 20px 24px; max-width: var(--maxw); margin: 0 auto; display: flex; justify-content: space-between; font-size: 12px; flex-wrap: wrap; gap: 8px; }

/* Fade-up animation */
.fade-up { opacity: 0; transform: translateY(24px); transition: opacity .6s ease, transform .6s ease; }
.fade-up.visible { opacity: 1; transform: none; }

/* Responsive */
@media (max-width: 860px) {
  .nav-links, .nav-cta { display: none; }
  .nav-hamburger { display: flex; }
  .nav-mobile { display: none; flex-direction: column; gap: 4px; position: absolute; top: 100%; left: 0; right: 0; background: #fff; border-bottom: 1px solid var(--line); padding: 12px 24px 20px; }
  #navbar.menu-open .nav-mobile { display: flex; }
  .nav-mobile a { padding: 12px 0; border-bottom: 1px solid var(--line); font-size: 15px; }
  .nav-mobile a.btn-navy { text-align: center; border: none; margin-top: 8px; }
  .hero-inner, .about-inner, .contact-grid { grid-template-columns: 1fr; gap: 36px; }
  .cards-grid { grid-template-columns: 1fr; }
  .footer-inner { grid-template-columns: 1fr 1fr; }
}
@media (max-width: 520px) {
  .values-grid, .footer-inner { grid-template-columns: 1fr; }
  .trust-badges { flex-direction: column; }
}
```

- [ ] **Step 2: Verify the CSS parses and serves.**

Run: `python3 -c "import urllib.request; print(urllib.request.urlopen('http://localhost:8000/css/style.css').status)"`
Expected: `200`

- [ ] **Step 3: Commit.**

```bash
git add css/style.css
git commit -m "feat: rewrite stylesheet as Modern Minimal design system"
```

---

### Task 2: JavaScript — nav, scroll reveal, form handling

**Files:**
- Modify (full replace): `js/main.js`

- [ ] **Step 1: Replace the entire contents of `js/main.js`** with:

```javascript
// Navbar scroll shadow
const navbar = document.getElementById('navbar');
if (navbar) {
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  });
}

// Mobile hamburger toggle
const hamburger = document.getElementById('hamburger');
if (hamburger && navbar) {
  hamburger.addEventListener('click', () => {
    const open = navbar.classList.toggle('menu-open');
    hamburger.setAttribute('aria-expanded', String(open));
  });
}

// Close mobile menu on any link click inside it
document.querySelectorAll('.nav-mobile a').forEach(link => {
  link.addEventListener('click', () => navbar && navbar.classList.remove('menu-open'));
});

// Active nav link — match current filename
const currentFile = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a, .nav-mobile a').forEach(link => {
  const href = link.getAttribute('href');
  if (href === currentFile || (href === 'index.html' && currentFile === '')) {
    link.classList.add('active');
  }
});

// Fade-up IntersectionObserver
const fadeObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      fadeObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });
document.querySelectorAll('.fade-up').forEach(el => fadeObserver.observe(el));

// Contact enquiry form (progressive enhancement over a Formspree action)
const form = document.getElementById('enquiry-form');
if (form) {
  const status = document.getElementById('form-status');
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    status.textContent = '';
    status.className = 'form-status';
    const data = new FormData(form);
    if (!data.get('name') || !data.get('email') || !data.get('message')) {
      status.textContent = 'Please complete all required fields.';
      status.classList.add('err');
      return;
    }
    try {
      const res = await fetch(form.action, {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' }
      });
      if (res.ok) {
        form.reset();
        status.textContent = 'Thank you — we\'ll get back to you within one business day.';
        status.classList.add('ok');
      } else {
        status.textContent = 'Something went wrong. Please email us directly at skhathi@jubasda.co.za.';
        status.classList.add('err');
      }
    } catch (err) {
      status.textContent = 'Something went wrong. Please email us directly at skhathi@jubasda.co.za.';
      status.classList.add('err');
    }
  });
}
```

- [ ] **Step 2: Verify it serves.**

Run: `python3 -c "import urllib.request; print(urllib.request.urlopen('http://localhost:8000/js/main.js').status)"`
Expected: `200`

- [ ] **Step 3: Commit.**

```bash
git add js/main.js
git commit -m "feat: nav, scroll-reveal and enquiry-form handling in main.js"
```

---

### Task 3: Home page (`index.html`)

**Files:**
- Modify (full replace): `index.html`

- [ ] **Step 1: Replace the entire contents of `index.html`.** Use the HEAD block with `<title>Juba Consultants – Your Consulting Partner of Choice</title>`, then the shared NAV block, then the `<main>` below, then the CTA strip, then the shared FOOTER block, then the SCRIPT block. Paste the matching `ICON(...)` SVG wherever referenced.

```html
<main>
  <!-- HERO -->
  <section class="hero">
    <div class="container hero-inner">
      <div class="fade-up">
        <span class="eyebrow">Black female owned · Durban, South Africa</span>
        <h1>Strengthening organisations <span>through people.</span></h1>
        <p class="hero-sub">Juba Consultants delivers skills development, HR compliance, and training for government, business, and SMMEs — done properly, the first time.</p>
        <div class="hero-buttons">
          <a href="services.html" class="btn-primary">Our Services</a>
          <a href="contact.html" class="btn-outline">Contact Us</a>
        </div>
      </div>
      <div class="hero-panel fade-up" style="transition-delay:.12s">
        <p class="hero-panel-title">Core Expertise</p>
        <div class="hero-chips">
          <span class="hero-chip">Skills Development</span>
          <span class="hero-chip">SETA Grants</span>
          <span class="hero-chip">B-BBEE Advisory</span>
          <span class="hero-chip">Employment Equity</span>
          <span class="hero-chip">WSP &amp; ATR</span>
          <span class="hero-chip">QCTO</span>
        </div>
        <div class="hero-stats">
          <div class="hero-stat"><span class="hero-stat-num">Gov</span><span class="hero-stat-label">Institutions</span></div>
          <div class="hero-stat"><span class="hero-stat-num">SME</span><span class="hero-stat-label">Enterprises</span></div>
          <div class="hero-stat"><span class="hero-stat-num">Int'l</span><span class="hero-stat-label">Standards</span></div>
        </div>
      </div>
    </div>
  </section>

  <!-- ABOUT TEASER -->
  <section class="section section--border">
    <div class="container about-inner">
      <div class="fade-up">
        <span class="eyebrow">About Us</span>
        <h2 class="section-title">We know South African HR compliance inside out.</h2>
        <p class="about-body">A black female owned consultancy helping organisations submit WSP &amp; ATR reports, claim SETA grants, and meet employment equity targets — without the usual headaches.</p>
        <a href="about.html" class="btn-navy">Learn more &rarr;</a>
      </div>
      <div class="values-grid fade-up" style="transition-delay:.12s">
        <div class="value"><p class="value-name">Professional</p><p class="value-desc">Built on excellence and trust.</p></div>
        <div class="value"><p class="value-name">Consistent</p><p class="value-desc">Unified across every touchpoint.</p></div>
        <div class="value"><p class="value-name">Impactful</p><p class="value-desc">Measurable, real organisational change.</p></div>
        <div class="value"><p class="value-name">Inclusive</p><p class="value-desc">Aligned with B-BBEE and transformation goals.</p></div>
      </div>
    </div>
  </section>

  <!-- SERVICES PREVIEW -->
  <section class="section section--soft">
    <div class="container">
      <div class="section-head fade-up">
        <div>
          <span class="eyebrow">What We Do</span>
          <h2 class="section-title">Our core services</h2>
        </div>
        <a href="services.html" class="btn-navy">View all services &rarr;</a>
      </div>
      <div class="cards-grid">
        <div class="card-item fade-up"><div class="card-icon">ICON(search)</div><h3 class="card-name">Skills Audit</h3><p class="card-desc">Identify skills gaps and opportunities to drive organisational growth and competitive performance.</p></div>
        <div class="card-item fade-up" style="transition-delay:.06s"><div class="card-icon">ICON(clipboard)</div><h3 class="card-name">Workplace Skills Plan (WSP)</h3><p class="card-desc">Develop and submit WSP &amp; ATR documents aligned with business goals and SETA deadlines.</p></div>
        <div class="card-item fade-up" style="transition-delay:.12s"><div class="card-icon">ICON(scale)</div><h3 class="card-name">Employment Equity</h3><p class="card-desc">Achieve equity and diversity through compliant EE planning, reporting, and transformation strategy.</p></div>
      </div>
    </div>
  </section>

  <!-- WHO WE SERVE (folded-in Partners) -->
  <section class="section section--border">
    <div class="container">
      <div class="fade-up" style="text-align:center">
        <span class="eyebrow" style="justify-content:center">Who We Serve</span>
        <h2 class="section-title">Trusted across sectors</h2>
        <p class="section-sub" style="margin-left:auto;margin-right:auto">Tailored solutions across government, private sector, and international organisations to drive sustainable transformation.</p>
      </div>
      <div class="cards-grid">
        <div class="serve-card fade-up"><div class="serve-icon">ICON(landmark)</div><h3 class="serve-title">Government</h3><p class="serve-desc">We help government departments meet their skills development and transformation mandates — on time, correctly documented, and ready for audit.</p></div>
        <div class="serve-card fade-up" style="transition-delay:.1s"><div class="serve-icon">ICON(building)</div><h3 class="serve-title">Private Sector</h3><p class="serve-desc">From large corporates to growing SMEs, we handle the compliance work so your HR team can focus on your people.</p></div>
        <div class="serve-card fade-up" style="transition-delay:.2s"><div class="serve-icon">ICON(globe)</div><h3 class="serve-title">International</h3><p class="serve-desc">Benchmarked against international HR standards while staying grounded in South African legislation and SETA requirements.</p></div>
      </div>
    </div>
  </section>

  <!-- CTA STRIP -->
  <section class="cta-strip">
    <div class="container">
      <div>
        <h2>Ready to maximise your SETA benefits?</h2>
        <p>Upskill your workforce. Claim back what you&rsquo;re entitled to. Let&rsquo;s grow together.</p>
      </div>
      <a href="contact.html" class="btn-primary">Let&rsquo;s grow together</a>
    </div>
  </section>
</main>
```

- [ ] **Step 2: Verify it serves and uses no Lucide CDN.**

Run: `python3 -c "import urllib.request; print(urllib.request.urlopen('http://localhost:8000/index.html').status)"` → Expected: `200`
Run: `grep -c "lucide\|data-lucide" index.html` → Expected: `0`

- [ ] **Step 3: Open `http://localhost:8000/index.html` in a browser and visually confirm** hero, about, services, who-we-serve, CTA, footer all render and the mobile menu works at narrow width.

- [ ] **Step 4: Commit.**

```bash
git add index.html
git commit -m "feat: rebuild Home page in Modern Minimal with Who We Serve section"
```

---

### Task 4: About page (`about.html`)

**Files:**
- Modify (full replace): `about.html`

- [ ] **Step 1: Replace the entire contents of `about.html`.** Use the HEAD block with `<title>About Us | Juba Consultants</title>`, shared NAV, the `<main>` below, the shared CTA strip (same markup as Home's `<section class="cta-strip">`), shared FOOTER, SCRIPT block. Paste matching `ICON(...)` SVGs.

```html
<main>
  <!-- PAGE BANNER -->
  <div class="page-banner">
    <div class="container">
      <span class="eyebrow">Who We Are</span>
      <h1 class="section-title">About Us</h1>
    </div>
  </div>

  <!-- ABOUT -->
  <section class="section">
    <div class="container about-inner">
      <div class="fade-up">
        <span class="eyebrow">About Us</span>
        <h2 class="section-title">Strengthening organisations through people.</h2>
        <p class="about-body">We work alongside South African businesses, government departments, and SMMEs to handle the HR compliance work most organisations find overwhelming. WSP submissions, ATR reports, SETA grants, employment equity plans — we know the process, we know the deadlines, and we make sure it&rsquo;s done right.</p>
        <div class="values-grid">
          <div class="value"><p class="value-name">Professional</p><p class="value-desc">A strong, trustworthy brand built on excellence.</p></div>
          <div class="value"><p class="value-name">Consistent</p><p class="value-desc">Unified solutions across all client touchpoints.</p></div>
          <div class="value"><p class="value-name">Impactful</p><p class="value-desc">Measurable results that drive real change.</p></div>
          <div class="value"><p class="value-name">Inclusive</p><p class="value-desc">Aligned with B-BBEE and transformation objectives.</p></div>
        </div>
      </div>
      <div class="fade-up" style="transition-delay:.12s">
        <div class="founder-card">
          <img class="founder-photo" src="images/sinenhlanhla-khathi.jpg" alt="Sinenhlanhla Khathi, Managing Director of Juba Consultants">
          <p class="founder-quote">&ldquo;I started this firm because I saw how many South African businesses were losing money they were legally entitled to claim — simply because nobody explained the process clearly.&rdquo;</p>
          <p class="founder-author">— Sinenhlanhla Khathi, Managing Director</p>
        </div>
        <div class="trust-badges">
          <div class="trust-badge"><div class="trust-badge-icon">ICON(landmark)</div><div class="trust-badge-label">Government Trusted</div></div>
          <div class="trust-badge"><div class="trust-badge-icon">ICON(globe)</div><div class="trust-badge-label">Global Standards</div></div>
          <div class="trust-badge"><div class="trust-badge-icon">ICON(handshake)</div><div class="trust-badge-label">Private Sector</div></div>
        </div>
      </div>
    </div>
  </section>

  <!-- CTA STRIP -->
  <section class="cta-strip">
    <div class="container">
      <div>
        <h2>Ready to maximise your SETA benefits?</h2>
        <p>Upskill your workforce. Claim back what you&rsquo;re entitled to. Let&rsquo;s grow together.</p>
      </div>
      <a href="contact.html" class="btn-primary">Let&rsquo;s grow together</a>
    </div>
  </section>
</main>
```

- [ ] **Step 2: Verify.**

Run: `python3 -c "import urllib.request; print(urllib.request.urlopen('http://localhost:8000/about.html').status)"` → Expected: `200`
Run: `grep -c "lucide" about.html` → Expected: `0`

- [ ] **Step 3: Commit.**

```bash
git add about.html
git commit -m "feat: rebuild About page with founder card and values"
```

---

### Task 5: Services page (`services.html`)

**Files:**
- Modify (full replace): `services.html`

- [ ] **Step 1: Replace the entire contents of `services.html`.** Use HEAD block with `<title>Services | Juba Consultants</title>`, shared NAV, the `<main>` below, shared CTA strip, shared FOOTER, SCRIPT block. Paste matching `ICON(...)` SVGs.

```html
<main>
  <!-- PAGE BANNER -->
  <div class="page-banner">
    <div class="container">
      <span class="eyebrow">What We Do</span>
      <h1 class="section-title">Our Services</h1>
    </div>
  </div>

  <!-- SERVICES GRID -->
  <section class="section">
    <div class="container">
      <div class="fade-up">
        <span class="eyebrow">Full Service Range</span>
        <h2 class="section-title">Everything you need, handled properly.</h2>
        <p class="section-sub">From audits to accreditation, we cover the full skills-development and HR-compliance lifecycle.</p>
      </div>
      <div class="cards-grid">
        <div class="card-item fade-up"><div class="card-icon">ICON(search)</div><h3 class="card-name">Skills Audit</h3><p class="card-desc">Identify skills gaps and opportunities to drive organisational growth and competitive performance.</p></div>
        <div class="card-item fade-up" style="transition-delay:.05s"><div class="card-icon">ICON(clipboard)</div><h3 class="card-name">WSP &amp; ATR</h3><p class="card-desc">Develop and submit Workplace Skills Plans and Annual Training Reports aligned with business goals and SETA deadlines.</p></div>
        <div class="card-item fade-up" style="transition-delay:.1s"><div class="card-icon">ICON(scale)</div><h3 class="card-name">Employment Equity Plan &amp; Reporting</h3><p class="card-desc">Achieve equity and diversity through compliant EE planning, reporting, and transformation strategy.</p></div>
        <div class="card-item fade-up"><div class="card-icon">ICON(coins)</div><h3 class="card-name">SETA Grants &amp; Funding</h3><p class="card-desc">Register, claim mandatory and discretionary grants, and recover the levies you&rsquo;re entitled to.</p></div>
        <div class="card-item fade-up" style="transition-delay:.05s"><div class="card-icon">ICON(award)</div><h3 class="card-name">B-BBEE Advisory</h3><p class="card-desc">Improve your scorecard through strategic skills-development spend and transformation planning.</p></div>
        <div class="card-item fade-up" style="transition-delay:.1s"><div class="card-icon">ICON(cap)</div><h3 class="card-name">QCTO Accreditation</h3><p class="card-desc">Guidance through QCTO accreditation and quality-assured occupational qualifications.</p></div>
      </div>
    </div>
  </section>

  <!-- CTA STRIP -->
  <section class="cta-strip">
    <div class="container">
      <div>
        <h2>Not sure where to start?</h2>
        <p>Tell us about your organisation and we&rsquo;ll recommend the right path.</p>
      </div>
      <a href="contact.html" class="btn-primary">Get in touch</a>
    </div>
  </section>
</main>
```

> Note: if the pre-redesign `services.html` listed additional services beyond
> these six, carry each one over as another `.card-item` using the closest icon
> from the icon set.

- [ ] **Step 2: Verify.**

Run: `python3 -c "import urllib.request; print(urllib.request.urlopen('http://localhost:8000/services.html').status)"` → Expected: `200`
Run: `grep -c "lucide" services.html` → Expected: `0`

- [ ] **Step 3: Commit.**

```bash
git add services.html
git commit -m "feat: rebuild Services page with full service grid"
```

---

### Task 6: Contact page + enquiry form (`contact.html`)

**Files:**
- Modify (full replace): `contact.html`

- [ ] **Step 1: Replace the entire contents of `contact.html`.** Use HEAD block with `<title>Contact Us | Juba Consultants</title>`, shared NAV, the `<main>` below, shared FOOTER, SCRIPT block. Paste matching `ICON(...)` SVGs. **Replace `FORM_ENDPOINT`** in the form `action` with the real Formspree form ID once created (see Step 2); until then leave the placeholder — the JS still validates and shows the email fallback on failure.

```html
<main>
  <!-- PAGE BANNER -->
  <div class="page-banner">
    <div class="container">
      <span class="eyebrow">Get In Touch</span>
      <h1 class="section-title">Contact Us</h1>
    </div>
  </div>

  <!-- CONTACT -->
  <section class="section">
    <div class="container contact-grid">
      <!-- details -->
      <div class="fade-up">
        <span class="eyebrow">Get In Touch</span>
        <h2 class="section-title">Let&rsquo;s start the conversation.</h2>
        <p class="section-sub" style="margin-bottom:32px">Call, email, or send us a message and we&rsquo;ll get back to you within one business day.</p>
        <div class="contact-item"><div class="contact-item-icon">ICON(map-pin)</div><div><p class="contact-item-label">Address</p><p class="contact-item-value">57 Magwaza Maphalala Street, Berea 4001, Durban</p></div></div>
        <div class="contact-item"><div class="contact-item-icon">ICON(phone)</div><div><p class="contact-item-label">Phone</p><p class="contact-item-value"><a href="tel:+27793517376">+27 79 351 7376</a></p></div></div>
        <div class="contact-item"><div class="contact-item-icon">ICON(mail)</div><div><p class="contact-item-label">Email</p><p class="contact-item-value"><a href="mailto:skhathi@jubasda.co.za">skhathi@jubasda.co.za</a></p></div></div>
        <div class="contact-item"><div class="contact-item-icon">ICON(user)</div><div><p class="contact-item-label">Managing Director</p><p class="contact-item-value">Sinenhlanhla Khathi</p></div></div>
      </div>
      <!-- form -->
      <div class="fade-up" style="transition-delay:.12s">
        <form id="enquiry-form" class="contact-form" action="https://formspree.io/f/FORM_ENDPOINT" method="POST">
          <div class="form-field"><label for="name">Name *</label><input type="text" id="name" name="name" required></div>
          <div class="form-field"><label for="email">Email *</label><input type="email" id="email" name="email" required></div>
          <div class="form-field"><label for="phone">Phone</label><input type="tel" id="phone" name="phone"></div>
          <div class="form-field"><label for="message">Message *</label><textarea id="message" name="message" required></textarea></div>
          <button type="submit" class="btn-primary" style="width:100%">Send enquiry</button>
          <p id="form-status" class="form-status" role="status" aria-live="polite"></p>
        </form>
      </div>
    </div>
  </section>
</main>
```

- [ ] **Step 2: Create the Formspree endpoint.** This step requires the site owner — it needs the Juba email account. Ask the user to create a free form at https://formspree.io targeting `skhathi@jubasda.co.za`, then paste the form ID (the part after `/f/`) to replace `FORM_ENDPOINT`. If unavailable now, leave the placeholder; validation + the mailto fallback message still work, and this becomes a follow-up.

- [ ] **Step 3: Verify.**

Run: `python3 -c "import urllib.request; print(urllib.request.urlopen('http://localhost:8000/contact.html').status)"` → Expected: `200`
Run: `grep -c "id=\"enquiry-form\"" contact.html` → Expected: `1`

- [ ] **Step 4: Open the page, submit the form with a blank field**, confirm the inline "Please complete all required fields." message appears (validates the JS path without needing a live endpoint).

- [ ] **Step 5: Commit.**

```bash
git add contact.html
git commit -m "feat: rebuild Contact page with enquiry form"
```

---

### Task 7: Remove the Partners page

**Files:**
- Delete: `partners.html`

- [ ] **Step 1: Delete the file and confirm nothing links to it.**

```bash
git rm partners.html
grep -rn "partners.html" . --include=*.html
```

Expected: the `grep` returns **no matches** (all nav/footer links were already
updated to omit Partners in Tasks 1–6). If any match appears, remove that link.

- [ ] **Step 2: Commit.**

```bash
git commit -m "refactor: remove Partners page (folded into Home 'Who We Serve')"
```

---

### Task 8: Fix documentation

**Files:**
- Modify (full replace): `README.md`
- Modify (full replace): `CLAUDE.md`

- [ ] **Step 1: Replace `README.md`** with content describing the real stack:

```markdown
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
```

- [ ] **Step 2: Replace `CLAUDE.md`** with:

```markdown
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
```

- [ ] **Step 3: Commit.**

```bash
git add README.md CLAUDE.md
git commit -m "docs: rewrite README and CLAUDE.md to match the real static stack"
```

---

### Task 9: Final verification pass

**Files:** none (verification only)

- [ ] **Step 1: Confirm all four pages return 200 and Partners is gone.**

```bash
for p in index about services contact; do
  python3 -c "import urllib.request; print('$p', urllib.request.urlopen('http://localhost:8000/$p.html').status)"
done
python3 -c "import urllib.request,sys
try:
    urllib.request.urlopen('http://localhost:8000/partners.html'); print('FAIL: partners still served')
except Exception: print('OK: partners.html removed')"
```

Expected: four `200` lines, then `OK: partners.html removed`.

- [ ] **Step 2: Assert no Lucide CDN and no leftover `data-lucide` anywhere.**

```bash
grep -rn "unpkg.com/lucide\|data-lucide" . --include=*.html
```

Expected: no matches.

- [ ] **Step 3: Assert every page has exactly the four nav links and no Partners link.**

```bash
grep -c ">Home<\|>About<\|>Services<\|>Contact<" index.html about.html services.html contact.html
grep -rn ">Partners<" . --include=*.html
```

Expected: the second `grep` returns no matches.

- [ ] **Step 4: Visual + responsive check in a browser.** Load each page at desktop width and at ~375px width. Confirm: hamburger menu opens/closes on mobile; hero, grids, and footer collapse to single column; founder photo shows on About; contact form validates.

- [ ] **Step 5: Final commit (if any tweaks were made during verification).**

```bash
git add -A
git commit -m "fix: verification-pass adjustments" || echo "nothing to commit"
```

---

## Self-Review (completed by plan author)

- **Spec coverage:** Direction (Task 1) · four-page IA + Partners removal (Tasks 3,7) · Who We Serve on Home (Task 3) · enquiry form (Task 6) · navy/gold + Poppins (Task 1) · static, no framework (all) · unified inline-SVG icons, no CDN (Tasks 1–6, verified Task 9) · founder photo on About (Task 4) · doc fixes (Task 8) · responsive + a11y (Task 1 CSS + Task 9 check). All spec sections map to a task.
- **Placeholder scan:** The only intentional placeholder is `FORM_ENDPOINT` (Formspree ID), which requires the owner's email account — flagged explicitly in Task 6 Step 2 with a working fallback. No vague "add error handling" steps.
- **Type/name consistency:** Class names (`.eyebrow`, `.section-title`, `.card-item`, `.serve-card`, `.hero-panel`, `.contact-form`), the form id (`enquiry-form`) and status id (`form-status`) match between the CSS (Task 1), JS (Task 2), and the page markup (Tasks 3–6).
```
