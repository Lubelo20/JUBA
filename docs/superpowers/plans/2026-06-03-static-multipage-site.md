# Static Multipage Site Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the React + Vite SPA with five self-contained HTML files sharing one CSS file and one JS file — zero dependencies, no build step.

**Architecture:** Each page is a complete HTML document with the navbar and footer copy-pasted. `css/style.css` holds all shared styles using CSS custom properties. `js/main.js` handles navbar behaviour, mobile menu, fade-up animations, and active link detection via `window.location.pathname`.

**Tech Stack:** HTML5, CSS3, vanilla JavaScript (ES6). No frameworks, no build tool. Served by any static host or `python3 -m http.server`.

---

### Task 1: Remove React infrastructure

**Files:**
- Delete: `src/` (directory)
- Delete: `node_modules/` (directory)
- Delete: `dist/` (directory)
- Delete: `package.json`, `vite.config.js`, `postcss.config.js`, `tailwind.config.js`, `.eslintrc.cjs`
- Create: `css/` (directory), `js/` (directory)

- [ ] **Step 1: Delete React files**

```bash
rm -rf src node_modules dist package.json vite.config.js postcss.config.js tailwind.config.js .eslintrc.cjs
```

- [ ] **Step 2: Create output directories**

```bash
mkdir -p css js
```

- [ ] **Step 3: Verify structure**

```bash
ls -1
```

Expected output includes: `css/  js/  index.html  public/  docs/  CLAUDE.md  README.md  .gitignore`

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "chore: remove React/Vite infrastructure for static rebuild"
```

---

### Task 2: Create css/style.css

**Files:**
- Create: `css/style.css`

- [ ] **Step 1: Create the file**

```css
/* ─── VARIABLES ─── */
:root {
  --navy:       #0B2E6D;
  --navy-dark:  #071d45;
  --gold:       #C9A34E;
  --gold-light: #dbb96a;
  --off-white:  #f8f7f4;
}

/* ─── RESET ─── */
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html { scroll-behavior: smooth; font-family: 'Poppins', sans-serif; }
body { color: #0f172a; background: #fff; overflow-x: hidden; }
a { text-decoration: none; }
ul { list-style: none; }

/* ─── BUTTONS ─── */
.btn-primary {
  display: inline-block;
  background: var(--gold);
  color: var(--navy-dark);
  font-weight: 700;
  font-size: 12px;
  letter-spacing: 3px;
  text-transform: uppercase;
  padding: 14px 32px;
  border-radius: 4px;
  border: 2px solid var(--gold);
  transition: background .2s, color .2s;
}
.btn-primary:hover { background: transparent; color: var(--gold); }

.btn-outline {
  display: inline-block;
  background: transparent;
  color: #fff;
  font-weight: 600;
  font-size: 12px;
  letter-spacing: 3px;
  text-transform: uppercase;
  padding: 14px 32px;
  border-radius: 4px;
  border: 2px solid rgba(255,255,255,.3);
  transition: border-color .2s, background .2s;
}
.btn-outline:hover { border-color: #fff; background: rgba(255,255,255,.05); }

.btn-navy {
  display: inline-block;
  background: var(--navy);
  color: #fff;
  font-weight: 700;
  font-size: 12px;
  letter-spacing: 3px;
  text-transform: uppercase;
  padding: 14px 32px;
  border-radius: 4px;
  border: 2px solid var(--navy);
  transition: background .2s, border-color .2s, color .2s;
}
.btn-navy:hover { background: var(--gold); border-color: var(--gold); color: var(--navy); }

/* ─── TYPOGRAPHY ─── */
.section-label {
  display: flex;
  align-items: center;
  gap: 12px;
  color: var(--gold);
  font-weight: 600;
  font-size: 11px;
  letter-spacing: 4px;
  text-transform: uppercase;
  margin-bottom: 16px;
}
.section-label::before {
  content: '';
  display: block;
  width: 28px; height: 2px;
  background: var(--gold);
  flex-shrink: 0;
}
.section-title {
  color: var(--navy);
  font-weight: 800;
  line-height: 1.2;
  margin-bottom: 16px;
  font-size: clamp(28px, 3.5vw, 40px);
}
.section-sub {
  color: #64748b;
  font-size: 14px;
  line-height: 1.7;
}

/* ─── FADE-UP ─── */
.fade-up {
  opacity: 0;
  transform: translateY(30px);
  transition: opacity .6s ease, transform .6s ease;
}
.fade-up.visible { opacity: 1; transform: translateY(0); }

/* ─── NAVBAR ─── */
#navbar {
  position: fixed;
  top: 0; left: 0; right: 0;
  z-index: 50;
  background: rgba(255,255,255,.97);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid rgba(11,46,109,.08);
  padding: 0 5%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 72px;
  transition: box-shadow .3s;
}
#navbar.scrolled { box-shadow: 0 2px 24px rgba(11,46,109,.10); }

.nav-logo { display: flex; flex-direction: column; line-height: 1; }
.nav-logo .logo-main { font-size: 26px; font-weight: 800; color: var(--navy); letter-spacing: 4px; }
.nav-logo .logo-sub {
  font-size: 8px; font-weight: 600; color: var(--gold);
  letter-spacing: 3px;
  border-top: 1px solid var(--gold); border-bottom: 1px solid var(--gold);
  padding: 2px 0; margin-top: 3px; text-transform: uppercase;
}

.nav-links { display: none; gap: 36px; align-items: center; }
@media (min-width: 768px) { .nav-links { display: flex; } }

.nav-links a {
  font-size: 13px; font-weight: 500; color: #64748b;
  padding-bottom: 4px;
  border-bottom: 2px solid transparent;
  transition: color .2s, border-color .2s;
}
.nav-links a:hover { color: var(--navy); border-bottom-color: rgba(201,163,78,.5); }
.nav-links a.active { color: var(--navy); border-bottom-color: var(--gold); }

.nav-cta { display: none; }
@media (min-width: 768px) { .nav-cta { display: inline-block; } }

.nav-hamburger {
  display: flex; flex-direction: column; gap: 6px;
  padding: 8px; background: none; border: none; cursor: pointer;
}
@media (min-width: 768px) { .nav-hamburger { display: none; } }

.nav-hamburger span {
  display: block; width: 24px; height: 2px; background: var(--navy);
  transition: transform .2s, opacity .2s;
}
#navbar.menu-open .nav-hamburger span:nth-child(1) { transform: rotate(45deg) translate(6px, 6px); }
#navbar.menu-open .nav-hamburger span:nth-child(2) { opacity: 0; }
#navbar.menu-open .nav-hamburger span:nth-child(3) { transform: rotate(-45deg) translate(6px, -6px); }

.nav-mobile {
  display: none;
  position: absolute; top: 72px; left: 0; right: 0;
  background: #fff;
  border-bottom: 1px solid rgba(11,46,109,.1);
  box-shadow: 0 8px 24px rgba(0,0,0,.08);
  padding: 24px 5%;
  flex-direction: column; gap: 16px;
}
#navbar.menu-open .nav-mobile { display: flex; }
.nav-mobile a { font-size: 15px; font-weight: 500; color: #475569; }
.nav-mobile a:hover, .nav-mobile a.active { color: var(--navy); font-weight: 600; }

/* ─── PAGE BANNER ─── */
.page-banner { padding-top: 72px; background: #fff; padding-left: 5%; padding-right: 5%; }
.page-banner-inner {
  max-width: 1152px; margin: 0 auto;
  padding: 48px 0 48px 32px;
  border-left: 4px solid var(--gold);
}

/* ─── HERO ─── */
.hero {
  min-height: 100vh;
  background: var(--navy);
  display: flex; flex-direction: column; justify-content: center;
  padding: 120px 5% 80px;
  position: relative; overflow: hidden;
}
.hero::before {
  content: '';
  position: absolute; top: -20%; right: -10%;
  width: 60%; height: 130%;
  border-radius: 50%;
  background: rgba(201,163,78,.05);
  pointer-events: none;
}
.hero::after {
  content: '';
  position: absolute; bottom: 0; right: 0;
  width: 40%; height: 8px;
  background: var(--gold);
}
.hero-inner {
  max-width: 1152px; margin: 0 auto; width: 100%;
  display: grid; grid-template-columns: 1fr; gap: 80px; align-items: center;
}
@media (min-width: 1024px) { .hero-inner { grid-template-columns: 1fr 1fr; } }

.hero-eyebrow {
  display: flex; align-items: center; gap: 12px;
  color: var(--gold); font-weight: 600; font-size: 11px;
  letter-spacing: 4px; text-transform: uppercase; margin-bottom: 20px;
}
.hero-eyebrow::before { content: ''; display: block; width: 32px; height: 2px; background: var(--gold); }

.hero h1 { font-weight: 800; color: #fff; line-height: 1.15; margin-bottom: 16px; font-size: clamp(36px, 4.5vw, 56px); }
.hero h1 span { color: var(--gold); }
.hero-sub { color: rgba(255,255,255,.65); font-size: 15px; line-height: 1.7; margin-bottom: 40px; max-width: 512px; }
.hero-buttons { display: flex; gap: 16px; flex-wrap: wrap; }

.hero-right { display: none; }
@media (min-width: 1024px) { .hero-right { display: block; } }

.hero-badges-box {
  background: rgba(255,255,255,.06);
  border: 1px solid rgba(255,255,255,.12);
  border-radius: 12px; padding: 36px; margin-bottom: 32px;
}
.hero-badges-title { color: var(--gold); font-weight: 600; font-size: 11px; letter-spacing: 2px; text-transform: uppercase; margin-bottom: 16px; }
.hero-badges-list { display: flex; flex-wrap: wrap; gap: 8px; }
.hero-badge {
  background: rgba(201,163,78,.15);
  border: 1px solid rgba(201,163,78,.3);
  color: var(--gold-light); font-size: 11px; font-weight: 500;
  padding: 4px 12px; border-radius: 999px;
}

.hero-stats {
  display: grid; grid-template-columns: repeat(3,1fr);
  border: 1px solid rgba(255,255,255,.1);
  border-radius: 12px; overflow: hidden;
  background: rgba(255,255,255,.04);
}
.hero-stat {
  padding: 28px; text-align: center;
  background: rgba(255,255,255,.04);
  border-right: 1px solid rgba(255,255,255,.1);
}
.hero-stat:last-child { border-right: none; }
.hero-stat-num { display: block; font-size: 30px; font-weight: 800; color: var(--gold); line-height: 1; }
.hero-stat-label { display: block; font-size: 11px; color: rgba(255,255,255,.5); font-weight: 500; margin-top: 4px; letter-spacing: 1px; }

/* ─── ABOUT SECTION ─── */
.about-section { background: var(--off-white); padding: 96px 5%; }
.about-inner {
  max-width: 1152px; margin: 0 auto;
  display: grid; grid-template-columns: 1fr; gap: 80px; align-items: center;
}
@media (min-width: 1024px) { .about-inner { grid-template-columns: 1fr 1fr; } }

.about-body { color: #64748b; font-size: 15px; line-height: 1.7; margin-top: 24px; margin-bottom: 36px; }

.pillars-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
.pillar {
  background: #fff; border-left: 3px solid var(--gold);
  padding: 16px; border-radius: 0 6px 6px 0;
}
.pillar-name { font-size: 12px; font-weight: 700; color: var(--navy); text-transform: uppercase; letter-spacing: 1px; }
.pillar-desc { font-size: 12px; color: #94a3b8; margin-top: 4px; line-height: 1.5; }

.about-card {
  background: var(--navy); border-radius: 12px; padding: 44px;
  color: #fff; position: relative; overflow: hidden; margin-bottom: 20px;
}
.about-card::after {
  content: '';
  position: absolute; bottom: 0; right: 0;
  width: 112px; height: 80px;
  background: var(--gold);
  clip-path: polygon(100% 0, 100% 100%, 0 100%);
}
.about-card-num { font-size: 64px; font-weight: 800; color: var(--gold); line-height: 1; margin-bottom: 8px; }
.about-card-sub { color: rgba(255,255,255,.7); font-size: 14px; margin-bottom: 32px; }
.about-card-quote { font-size: 16px; font-style: italic; font-weight: 300; color: rgba(255,255,255,.9); line-height: 1.6; }
.about-card-author { margin-top: 20px; font-size: 13px; font-weight: 700; color: var(--gold); letter-spacing: 1px; }

.about-badges { display: flex; gap: 12px; }
.about-badge {
  background: #fff; border: 1px solid rgba(11,46,109,.1);
  border-radius: 6px; padding: 14px 16px; flex: 1; text-align: center;
}
.about-badge-icon { font-size: 24px; margin-bottom: 6px; }
.about-badge-label { font-size: 11px; font-weight: 700; color: var(--navy); text-transform: uppercase; letter-spacing: 1px; line-height: 1.3; }

/* ─── SERVICES SECTION ─── */
.services-section { background: #fff; padding: 96px 5%; }
.services-inner { max-width: 1152px; margin: 0 auto; }

.services-header {
  display: flex; flex-direction: column; gap: 32px;
  margin-bottom: 56px; align-items: flex-start;
}
@media (min-width: 1024px) { .services-header { flex-direction: row; align-items: flex-end; justify-content: space-between; } }

.services-grid {
  display: grid; grid-template-columns: 1fr; gap: 24px; margin-bottom: 32px;
}
@media (min-width: 640px) { .services-grid { grid-template-columns: 1fr 1fr; } }
@media (min-width: 1024px) { .services-grid { grid-template-columns: repeat(3,1fr); } }

.service-card {
  border: 1px solid rgba(11,46,109,.1); border-radius: 12px; padding: 32px;
  position: relative; overflow: hidden;
  transition: transform .3s, box-shadow .3s, border-color .3s;
  background: #fff;
}
.service-card::before {
  content: ''; position: absolute; top: 0; left: 0;
  width: 100%; height: 3px;
  background: var(--gold);
  transform: scaleX(0); transform-origin: left; transition: transform .3s;
}
.service-card:hover { transform: translateY(-4px); box-shadow: 0 8px 32px rgba(11,46,109,.08); border-color: rgba(11,46,109,.2); }
.service-card:hover::before { transform: scaleX(1); }

.service-icon {
  width: 48px; height: 48px;
  background: rgba(11,46,109,.06); border-radius: 12px;
  display: flex; align-items: center; justify-content: center;
  font-size: 22px; margin-bottom: 20px;
}
.service-name { font-size: 14px; font-weight: 700; color: var(--navy); text-transform: uppercase; letter-spacing: 1px; line-height: 1.3; margin-bottom: 12px; }
.service-desc { font-size: 13px; color: #64748b; line-height: 1.6; }

.services-extra {
  background: var(--navy); border-radius: 12px; padding: 36px 40px;
  display: grid; grid-template-columns: 1fr; gap: 16px;
}
@media (min-width: 640px) { .services-extra { grid-template-columns: 1fr 1fr; } }
@media (min-width: 1024px) { .services-extra { grid-template-columns: repeat(4,1fr); } }

.services-extra-item {
  display: flex; align-items: flex-start; gap: 10px;
  color: rgba(255,255,255,.8); font-size: 12.5px; font-weight: 500; line-height: 1.4;
}
.services-extra-item::before { content: '✓'; color: var(--gold); font-weight: 700; margin-top: 2px; flex-shrink: 0; }

/* ─── PARTNERS SECTION ─── */
.partners-section { background: var(--off-white); padding: 96px 5%; }
.partners-inner { max-width: 1152px; margin: 0 auto; }

.partners-header { text-align: center; max-width: 512px; margin: 0 auto 56px; }
.partners-header .section-label { justify-content: center; }

.partners-grid { display: grid; grid-template-columns: 1fr; gap: 28px; }
@media (min-width: 768px) { .partners-grid { grid-template-columns: repeat(3,1fr); } }

.partner-card {
  background: #fff; border-radius: 12px; padding: 36px; text-align: center;
  border: 1px solid rgba(11,46,109,.08);
  transition: transform .3s, box-shadow .3s;
}
.partner-card:hover { transform: translateY(-4px); box-shadow: 0 8px 32px rgba(11,46,109,.08); }

.partner-icon {
  width: 64px; height: 64px;
  background: rgba(11,46,109,.07); border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  font-size: 28px; margin: 0 auto 20px;
}
.partner-title { font-size: 15px; font-weight: 700; color: var(--navy); text-transform: uppercase; letter-spacing: 1px; margin-bottom: 12px; }
.partner-desc { font-size: 13px; color: #64748b; line-height: 1.6; }

/* ─── CTA STRIP ─── */
.cta-strip { background: var(--navy); padding: 80px 5%; position: relative; overflow: hidden; }
.cta-strip::before {
  content: ''; position: absolute; top: 0; right: 0;
  width: 288px; height: 100%;
  background: var(--gold); opacity: .1;
  clip-path: polygon(30% 0, 100% 0, 100% 100%, 0% 100%);
}
.cta-strip-inner {
  max-width: 1152px; margin: 0 auto;
  display: flex; flex-direction: column; align-items: center;
  justify-content: space-between; gap: 40px; position: relative;
}
@media (min-width: 768px) { .cta-strip-inner { flex-direction: row; } }
.cta-strip h2 { font-weight: 800; color: #fff; margin-bottom: 8px; font-size: clamp(24px, 3vw, 36px); }
.cta-strip p { color: rgba(255,255,255,.6); font-size: 14px; }

/* ─── CONTACT SECTION ─── */
.contact-section { background: #fff; padding: 96px 5%; }
.contact-inner { max-width: 640px; margin: 0 auto; }

.contact-item {
  display: flex; align-items: flex-start; gap: 16px;
  padding: 20px 0; border-bottom: 1px solid rgba(11,46,109,.08);
}
.contact-item:last-child { border-bottom: none; }
.contact-item-icon {
  width: 44px; height: 44px;
  background: rgba(11,46,109,.07); border-radius: 8px;
  display: flex; align-items: center; justify-content: center;
  font-size: 20px; flex-shrink: 0;
}
.contact-item-label { font-size: 11px; font-weight: 600; color: var(--gold); letter-spacing: 2px; text-transform: uppercase; margin-bottom: 4px; }
.contact-item-value { font-size: 14px; color: var(--navy); font-weight: 500; line-height: 1.5; }
.contact-item-value a { color: var(--navy); transition: color .2s; }
.contact-item-value a:hover { color: var(--gold); }

/* ─── FOOTER ─── */
footer { background: var(--navy-dark); color: #fff; padding: 64px 5% 32px; }
.footer-inner {
  max-width: 1152px; margin: 0 auto;
  display: grid; grid-template-columns: 1fr; gap: 48px; margin-bottom: 48px;
}
@media (min-width: 768px) { .footer-inner { grid-template-columns: 1fr 1fr; } }
@media (min-width: 1024px) { .footer-inner { grid-template-columns: 2fr 1fr 1fr 1fr; } }

.footer-logo-main { font-size: 24px; font-weight: 800; letter-spacing: 4px; margin-bottom: 4px; }
.footer-logo-sub {
  font-size: 8px; font-weight: 600; color: var(--gold); letter-spacing: 3px;
  border-top: 1px solid var(--gold); border-bottom: 1px solid var(--gold);
  padding: 2px 0; display: inline-block; margin-bottom: 16px; text-transform: uppercase;
}
.footer-tagline { color: rgba(255,255,255,.5); font-size: 13px; line-height: 1.6; margin-bottom: 24px; }
.footer-social { display: flex; gap: 8px; }
.social-icon {
  width: 36px; height: 36px; background: rgba(255,255,255,.1); border-radius: 4px;
  display: flex; align-items: center; justify-content: center;
  color: rgba(255,255,255,.6); font-size: 12px; font-weight: 700;
  transition: background .2s, color .2s;
}
.social-icon:hover { background: var(--gold); color: var(--navy); }

.footer-col-title { font-size: 11px; font-weight: 700; color: var(--gold); letter-spacing: 2px; text-transform: uppercase; margin-bottom: 20px; }
.footer-col ul { display: flex; flex-direction: column; gap: 10px; }
.footer-col ul li a, .footer-col ul li span { color: rgba(255,255,255,.5); font-size: 13px; transition: color .2s; }
.footer-col ul li a:hover { color: var(--gold); }

.footer-bottom {
  max-width: 1152px; margin: 0 auto;
  padding-top: 32px; border-top: 1px solid rgba(255,255,255,.1);
  display: flex; flex-direction: column; align-items: center; gap: 8px;
  font-size: 12px; color: rgba(255,255,255,.35);
}
@media (min-width: 768px) { .footer-bottom { flex-direction: row; justify-content: space-between; } }
```

- [ ] **Step 2: Verify file exists**

```bash
ls -lh css/style.css
```

Expected: file exists, ~7–9 KB.

- [ ] **Step 3: Commit**

```bash
git add css/style.css
git commit -m "feat: add shared CSS with brand tokens, components, and all section styles"
```

---

### Task 3: Create js/main.js

**Files:**
- Create: `js/main.js`

- [ ] **Step 1: Create the file**

```javascript
// Navbar scroll shadow
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// Mobile hamburger toggle
const hamburger = document.getElementById('hamburger');
hamburger.addEventListener('click', () => {
  navbar.classList.toggle('menu-open');
});

// Close mobile menu on any link click inside it
document.querySelectorAll('.nav-mobile a').forEach(link => {
  link.addEventListener('click', () => navbar.classList.remove('menu-open'));
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
```

- [ ] **Step 2: Verify file exists**

```bash
ls -lh js/main.js
```

Expected: file exists, ~700–900 bytes.

- [ ] **Step 3: Commit**

```bash
git add js/main.js
git commit -m "feat: add shared JS for navbar, mobile menu, fade-up, active links"
```

---

### Task 4: Create index.html (Home page)

**Files:**
- Modify: `index.html` (replace existing content)

The home page has: navbar → Hero → About teaser → Services preview (3 cards) → Partners section → CTA strip → footer.

- [ ] **Step 1: Replace index.html**

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Juba Consultants – Your Consulting Partner of Choice</title>
  <link rel="icon" href="public/favicon.svg" type="image/svg+xml">
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="css/style.css">
</head>
<body>

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
    <li><a href="partners.html">Partners</a></li>
    <li><a href="contact.html">Contact</a></li>
  </ul>
  <a href="contact.html" class="nav-cta btn-navy">Get In Touch</a>
  <button class="nav-hamburger" id="hamburger" aria-label="Toggle menu">
    <span></span><span></span><span></span>
  </button>
  <div class="nav-mobile">
    <a href="index.html">Home</a>
    <a href="about.html">About</a>
    <a href="services.html">Services</a>
    <a href="partners.html">Partners</a>
    <a href="contact.html">Contact</a>
    <a href="contact.html" class="btn-navy">Get In Touch</a>
  </div>
</nav>

<main>

  <!-- HERO -->
  <section class="hero">
    <div class="hero-inner">
      <div>
        <p class="hero-eyebrow">Your Consulting Partner of Choice</p>
        <h1>Empowering People.<br><span>Building</span> Futures.</h1>
        <p class="hero-sub">Juba Consultants is a black female owned HR consultancy delivering world-class skills development, compliance, and training solutions across South Africa.</p>
        <div class="hero-buttons">
          <a href="services.html" class="btn-primary">Our Services</a>
          <a href="contact.html" class="btn-outline">Contact Us</a>
        </div>
      </div>
      <div class="hero-right">
        <div class="hero-badges-box">
          <p class="hero-badges-title">Core Expertise</p>
          <div class="hero-badges-list">
            <span class="hero-badge">Skills Development</span>
            <span class="hero-badge">HR Consulting</span>
            <span class="hero-badge">SETA Grants</span>
            <span class="hero-badge">B-BBEE Advisory</span>
            <span class="hero-badge">Employment Equity</span>
            <span class="hero-badge">QCTO Accreditation</span>
            <span class="hero-badge">WSP &amp; ATR</span>
            <span class="hero-badge">Tax Incentives</span>
          </div>
        </div>
        <div class="hero-stats">
          <div class="hero-stat">
            <span class="hero-stat-num">Gov</span>
            <span class="hero-stat-label">Institutions</span>
          </div>
          <div class="hero-stat">
            <span class="hero-stat-num">SME</span>
            <span class="hero-stat-label">Enterprises</span>
          </div>
          <div class="hero-stat">
            <span class="hero-stat-num">Int'l</span>
            <span class="hero-stat-label">Standards</span>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- ABOUT TEASER -->
  <section class="about-section">
    <div class="about-inner">
      <div class="about-left fade-up">
        <p class="section-label">About Us</p>
        <h2 class="section-title">Strengthening Organisations Through People</h2>
        <p class="about-body">Juba Skills Development Academy is a black female owned company providing comprehensive HR consultancy services and training across various domains. We serve government departments, private companies, and SMMEs — delivering solutions that are trusted, consistent, and memorable.</p>
        <a href="about.html" class="btn-navy">Learn More &rarr;</a>
      </div>
      <div class="fade-up" style="transition-delay:.15s">
        <div class="about-card">
          <div class="about-card-num">100%</div>
          <p class="about-card-sub">Committed to your growth</p>
          <p class="about-card-quote">&ldquo;Empowering Excellence. Nurturing Potential. Your Gateway to Strategic HR Solutions and Professional Training.&rdquo;</p>
          <p class="about-card-author">&mdash; Sinenhlanhla Khathi, Managing Director</p>
        </div>
        <div class="about-badges">
          <div class="about-badge"><div class="about-badge-icon">🏛</div><div class="about-badge-label">Government Trusted</div></div>
          <div class="about-badge"><div class="about-badge-icon">🌍</div><div class="about-badge-label">Global Standards</div></div>
          <div class="about-badge"><div class="about-badge-icon">🤝</div><div class="about-badge-label">Private Sector</div></div>
        </div>
      </div>
    </div>
  </section>

  <!-- SERVICES PREVIEW (first 3) -->
  <section class="services-section">
    <div class="services-inner">
      <div class="services-header fade-up">
        <div>
          <p class="section-label">What We Do</p>
          <h2 class="section-title">Our Core Services</h2>
        </div>
        <a href="services.html" class="btn-navy">View All Services &rarr;</a>
      </div>
      <div class="services-grid">
        <div class="service-card fade-up">
          <div class="service-icon">🔍</div>
          <h3 class="service-name">Skills Audit</h3>
          <p class="service-desc">Identify skills gaps and opportunities to drive organisational growth and competitive performance.</p>
        </div>
        <div class="service-card fade-up" style="transition-delay:.06s">
          <div class="service-icon">📋</div>
          <h3 class="service-name">Employment Skills Plan (WSP)</h3>
          <p class="service-desc">Develop effective Workplace Skills Plans aligned with business goals and regulatory compliance.</p>
        </div>
        <div class="service-card fade-up" style="transition-delay:.12s">
          <div class="service-icon">⚖️</div>
          <h3 class="service-name">Employment Equity Plan &amp; Reporting</h3>
          <p class="service-desc">Achieve equity and diversity through compliant EE planning, reporting, and transformation strategy.</p>
        </div>
      </div>
    </div>
  </section>

  <!-- PARTNERS -->
  <section class="partners-section">
    <div class="partners-inner">
      <div class="partners-header fade-up">
        <p class="section-label">Who We Serve</p>
        <h2 class="section-title">We Partner With</h2>
        <p class="section-sub">Delivering tailored solutions across government, private sector, and international organisations to drive sustainable transformation.</p>
      </div>
      <div class="partners-grid">
        <div class="partner-card fade-up">
          <div class="partner-icon">🏛</div>
          <h3 class="partner-title">Government</h3>
          <p class="partner-desc">Delivering solutions that support national development and policy objectives. We help government departments meet their skills development and transformation mandates effectively.</p>
        </div>
        <div class="partner-card fade-up" style="transition-delay:.1s">
          <div class="partner-icon">🏢</div>
          <h3 class="partner-title">Private Sector</h3>
          <p class="partner-desc">Driving business performance through people, skills and compliance excellence. We partner with companies of all sizes to build capable, compliant, and competitive workforces.</p>
        </div>
        <div class="partner-card fade-up" style="transition-delay:.2s">
          <div class="partner-icon">🌍</div>
          <h3 class="partner-title">International Partners</h3>
          <p class="partner-desc">Aligned with global standards and best practices for sustainable impact. Our frameworks meet international benchmarks while remaining contextually relevant to South Africa.</p>
        </div>
      </div>
    </div>
  </section>

  <!-- CTA STRIP -->
  <section class="cta-strip">
    <div class="cta-strip-inner">
      <div>
        <h2>Ready to Maximise Your SETA Benefits?</h2>
        <p>Upskill your workforce. Claim back what you&rsquo;re entitled to. Let&rsquo;s grow together.</p>
      </div>
      <a href="contact.html" class="btn-primary">Let&rsquo;s Grow Together</a>
    </div>
  </section>

</main>

<!-- FOOTER -->
<footer>
  <div class="footer-inner">
    <div>
      <div class="footer-logo-main">JUBA</div>
      <div class="footer-logo-sub">Consultants</div>
      <p class="footer-tagline">Empowering Excellence. Nurturing Potential. Your Gateway to Strategic HR Solutions and Professional Training.</p>
      <div class="footer-social">
        <a href="#" class="social-icon">in</a>
        <a href="#" class="social-icon">fb</a>
        <a href="#" class="social-icon">tw</a>
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
        <li><a href="partners.html">Our Partners</a></li>
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

<script src="js/main.js"></script>
</body>
</html>
```

- [ ] **Step 2: Open in browser and confirm the page renders**

```bash
python3 -m http.server 8080
```

Open http://localhost:8080 — confirm Hero, About teaser, 3 service cards, Partners, CTA strip, and Footer are all visible.

- [ ] **Step 3: Commit**

```bash
git add index.html
git commit -m "feat: create Home page (Preview Hub) as static HTML"
```

---

### Task 5: Create about.html

**Files:**
- Create: `about.html`

- [ ] **Step 1: Create the file**

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>About Us | Juba Consultants</title>
  <link rel="icon" href="public/favicon.svg" type="image/svg+xml">
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="css/style.css">
</head>
<body>

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
    <li><a href="partners.html">Partners</a></li>
    <li><a href="contact.html">Contact</a></li>
  </ul>
  <a href="contact.html" class="nav-cta btn-navy">Get In Touch</a>
  <button class="nav-hamburger" id="hamburger" aria-label="Toggle menu">
    <span></span><span></span><span></span>
  </button>
  <div class="nav-mobile">
    <a href="index.html">Home</a>
    <a href="about.html">About</a>
    <a href="services.html">Services</a>
    <a href="partners.html">Partners</a>
    <a href="contact.html">Contact</a>
    <a href="contact.html" class="btn-navy">Get In Touch</a>
  </div>
</nav>

<main>

  <!-- PAGE BANNER -->
  <div class="page-banner">
    <div class="page-banner-inner">
      <p class="section-label">Who We Are</p>
      <h1 class="section-title" style="margin-bottom:0">About Us</h1>
    </div>
  </div>

  <!-- ABOUT SECTION -->
  <section class="about-section">
    <div class="about-inner">
      <div class="about-left fade-up">
        <p class="section-label">About Us</p>
        <h2 class="section-title">Strengthening Organisations Through People</h2>
        <p class="about-body">Juba Skills Development Academy is a black female owned company providing comprehensive HR consultancy services and training across various domains. We serve government departments, private companies, individuals, and Small, Medium, and Micro Enterprises (SMMEs) &mdash; delivering solutions that are trusted, consistent, and memorable.</p>
        <div class="pillars-grid">
          <div class="pillar">
            <p class="pillar-name">Professional</p>
            <p class="pillar-desc">Strong, trustworthy brand identity built on excellence.</p>
          </div>
          <div class="pillar">
            <p class="pillar-name">Consistent</p>
            <p class="pillar-desc">Unified solutions across all client touchpoints.</p>
          </div>
          <div class="pillar">
            <p class="pillar-name">Impactful</p>
            <p class="pillar-desc">Measurable results that drive real organisational change.</p>
          </div>
          <div class="pillar">
            <p class="pillar-name">Inclusive</p>
            <p class="pillar-desc">Aligned with B-BBEE and transformation objectives.</p>
          </div>
        </div>
      </div>
      <div class="fade-up" style="transition-delay:.15s">
        <div class="about-card">
          <div class="about-card-num">100%</div>
          <p class="about-card-sub">Committed to your growth</p>
          <p class="about-card-quote">&ldquo;Empowering Excellence. Nurturing Potential. Your Gateway to Strategic HR Solutions and Professional Training.&rdquo;</p>
          <p class="about-card-author">&mdash; Sinenhlanhla Khathi, Managing Director</p>
        </div>
        <div class="about-badges">
          <div class="about-badge"><div class="about-badge-icon">🏛</div><div class="about-badge-label">Government Trusted</div></div>
          <div class="about-badge"><div class="about-badge-icon">🌍</div><div class="about-badge-label">Global Standards</div></div>
          <div class="about-badge"><div class="about-badge-icon">🤝</div><div class="about-badge-label">Private Sector</div></div>
        </div>
      </div>
    </div>
  </section>

  <!-- CTA STRIP -->
  <section class="cta-strip">
    <div class="cta-strip-inner">
      <div>
        <h2>Ready to Maximise Your SETA Benefits?</h2>
        <p>Upskill your workforce. Claim back what you&rsquo;re entitled to. Let&rsquo;s grow together.</p>
      </div>
      <a href="contact.html" class="btn-primary">Let&rsquo;s Grow Together</a>
    </div>
  </section>

</main>

<!-- FOOTER -->
<footer>
  <div class="footer-inner">
    <div>
      <div class="footer-logo-main">JUBA</div>
      <div class="footer-logo-sub">Consultants</div>
      <p class="footer-tagline">Empowering Excellence. Nurturing Potential. Your Gateway to Strategic HR Solutions and Professional Training.</p>
      <div class="footer-social">
        <a href="#" class="social-icon">in</a>
        <a href="#" class="social-icon">fb</a>
        <a href="#" class="social-icon">tw</a>
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
        <li><a href="partners.html">Our Partners</a></li>
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

<script src="js/main.js"></script>
</body>
</html>
```

- [ ] **Step 2: Verify in browser**

With `python3 -m http.server 8080` running, open http://localhost:8080/about.html — confirm the gold page banner, full About section, and "About" link is active (gold underline) in the navbar.

- [ ] **Step 3: Commit**

```bash
git add about.html
git commit -m "feat: create About page as static HTML"
```

---

### Task 6: Create services.html

**Files:**
- Create: `services.html`

- [ ] **Step 1: Create the file**

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Our Services | Juba Consultants</title>
  <link rel="icon" href="public/favicon.svg" type="image/svg+xml">
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="css/style.css">
</head>
<body>

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
    <li><a href="partners.html">Partners</a></li>
    <li><a href="contact.html">Contact</a></li>
  </ul>
  <a href="contact.html" class="nav-cta btn-navy">Get In Touch</a>
  <button class="nav-hamburger" id="hamburger" aria-label="Toggle menu">
    <span></span><span></span><span></span>
  </button>
  <div class="nav-mobile">
    <a href="index.html">Home</a>
    <a href="about.html">About</a>
    <a href="services.html">Services</a>
    <a href="partners.html">Partners</a>
    <a href="contact.html">Contact</a>
    <a href="contact.html" class="btn-navy">Get In Touch</a>
  </div>
</nav>

<main>

  <!-- PAGE BANNER -->
  <div class="page-banner">
    <div class="page-banner-inner">
      <p class="section-label">What We Do</p>
      <h1 class="section-title" style="margin-bottom:0">Our Services</h1>
    </div>
  </div>

  <!-- SERVICES SECTION -->
  <section class="services-section">
    <div class="services-inner">
      <div class="services-header fade-up">
        <div>
          <p class="section-label">What We Do</p>
          <h2 class="section-title">Comprehensive HR &amp; Skills Solutions</h2>
        </div>
        <p class="section-sub" style="max-width:300px">End-to-end services covering every aspect of workforce development, compliance, and organisational growth.</p>
      </div>
      <div class="services-grid">
        <div class="service-card fade-up">
          <div class="service-icon">🔍</div>
          <h3 class="service-name">Skills Audit</h3>
          <p class="service-desc">Identify skills gaps and opportunities to drive organisational growth and competitive performance.</p>
        </div>
        <div class="service-card fade-up" style="transition-delay:.06s">
          <div class="service-icon">📋</div>
          <h3 class="service-name">Employment Skills Plan (WSP)</h3>
          <p class="service-desc">Develop effective Workplace Skills Plans aligned with business goals and regulatory compliance.</p>
        </div>
        <div class="service-card fade-up" style="transition-delay:.12s">
          <div class="service-icon">⚖️</div>
          <h3 class="service-name">Employment Equity Plan &amp; Reporting</h3>
          <p class="service-desc">Achieve equity and diversity through compliant EE planning, reporting, and transformation strategy.</p>
        </div>
        <div class="service-card fade-up" style="transition-delay:.18s">
          <div class="service-icon">📊</div>
          <h3 class="service-name">Annual Training Report (ATR)</h3>
          <p class="service-desc">Stay compliant with accurate and timeous Annual Training Report submissions to your SETA.</p>
        </div>
        <div class="service-card fade-up" style="transition-delay:.24s">
          <div class="service-icon">💰</div>
          <h3 class="service-name">SETA Grant Application</h3>
          <p class="service-desc">End-to-end support for successful SETA mandatory and discretionary grant applications.</p>
        </div>
        <div class="service-card fade-up" style="transition-delay:.30s">
          <div class="service-icon">🔗</div>
          <h3 class="service-name">WSP &amp; ATR Linked to B-BBEE</h3>
          <p class="service-desc">Maximise B-BBEE points through strategically integrated WSP and ATR reporting.</p>
        </div>
        <div class="service-card fade-up" style="transition-delay:.36s">
          <div class="service-icon">🎓</div>
          <h3 class="service-name">QCTO Accreditation</h3>
          <p class="service-desc">Expert guidance and support for QCTO accreditation, compliance, and quality management.</p>
        </div>
        <div class="service-card fade-up" style="transition-delay:.42s">
          <div class="service-icon">💹</div>
          <h3 class="service-name">Tax Incentives</h3>
          <p class="service-desc">Leverage Section 12H and other tax incentives to maximise your ROI on training spend.</p>
        </div>
        <div class="service-card fade-up" style="transition-delay:.48s">
          <div class="service-icon">📅</div>
          <h3 class="service-name">Monthly Training Report</h3>
          <p class="service-desc">Track progress with detailed, accurate monthly training reports for informed decision-making.</p>
        </div>
      </div>
      <div class="services-extra fade-up">
        <div class="services-extra-item">Health &amp; Safety Trainings</div>
        <div class="services-extra-item">B-BBEE &amp; Skills Development</div>
        <div class="services-extra-item">SETA Stakeholder Representation</div>
        <div class="services-extra-item">Completion &amp; Submission of WSP &amp; ATR</div>
        <div class="services-extra-item">Learnership Implementation &amp; Management</div>
        <div class="services-extra-item">Ensure Implementation of Workplace Skills Plan</div>
        <div class="services-extra-item">Advice &amp; Assist in SETA Grants Applications</div>
        <div class="services-extra-item">Follow Up on SETA Grants</div>
      </div>
    </div>
  </section>

  <!-- CTA STRIP -->
  <section class="cta-strip">
    <div class="cta-strip-inner">
      <div>
        <h2>Ready to Maximise Your SETA Benefits?</h2>
        <p>Upskill your workforce. Claim back what you&rsquo;re entitled to. Let&rsquo;s grow together.</p>
      </div>
      <a href="contact.html" class="btn-primary">Let&rsquo;s Grow Together</a>
    </div>
  </section>

</main>

<!-- FOOTER -->
<footer>
  <div class="footer-inner">
    <div>
      <div class="footer-logo-main">JUBA</div>
      <div class="footer-logo-sub">Consultants</div>
      <p class="footer-tagline">Empowering Excellence. Nurturing Potential. Your Gateway to Strategic HR Solutions and Professional Training.</p>
      <div class="footer-social">
        <a href="#" class="social-icon">in</a>
        <a href="#" class="social-icon">fb</a>
        <a href="#" class="social-icon">tw</a>
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
        <li><a href="partners.html">Our Partners</a></li>
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

<script src="js/main.js"></script>
</body>
</html>
```

- [ ] **Step 2: Verify in browser**

Open http://localhost:8080/services.html — confirm all 9 service cards render, additional services blue banner appears at the bottom, and "Services" nav link is active.

- [ ] **Step 3: Commit**

```bash
git add services.html
git commit -m "feat: create Services page as static HTML"
```

---

### Task 7: Create partners.html

**Files:**
- Create: `partners.html`

- [ ] **Step 1: Create the file**

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Our Partners | Juba Consultants</title>
  <link rel="icon" href="public/favicon.svg" type="image/svg+xml">
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="css/style.css">
</head>
<body>

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
    <li><a href="partners.html">Partners</a></li>
    <li><a href="contact.html">Contact</a></li>
  </ul>
  <a href="contact.html" class="nav-cta btn-navy">Get In Touch</a>
  <button class="nav-hamburger" id="hamburger" aria-label="Toggle menu">
    <span></span><span></span><span></span>
  </button>
  <div class="nav-mobile">
    <a href="index.html">Home</a>
    <a href="about.html">About</a>
    <a href="services.html">Services</a>
    <a href="partners.html">Partners</a>
    <a href="contact.html">Contact</a>
    <a href="contact.html" class="btn-navy">Get In Touch</a>
  </div>
</nav>

<main>

  <!-- PAGE BANNER -->
  <div class="page-banner">
    <div class="page-banner-inner">
      <p class="section-label">Who We Serve</p>
      <h1 class="section-title" style="margin-bottom:0">Our Partners</h1>
    </div>
  </div>

  <!-- PARTNERS SECTION -->
  <section class="partners-section">
    <div class="partners-inner">
      <div class="partners-header fade-up">
        <p class="section-label">Who We Serve</p>
        <h2 class="section-title">We Partner With</h2>
        <p class="section-sub">Delivering tailored solutions across government, private sector, and international organisations to drive sustainable transformation.</p>
      </div>
      <div class="partners-grid">
        <div class="partner-card fade-up">
          <div class="partner-icon">🏛</div>
          <h3 class="partner-title">Government</h3>
          <p class="partner-desc">Delivering solutions that support national development and policy objectives. We help government departments meet their skills development and transformation mandates effectively.</p>
        </div>
        <div class="partner-card fade-up" style="transition-delay:.1s">
          <div class="partner-icon">🏢</div>
          <h3 class="partner-title">Private Sector</h3>
          <p class="partner-desc">Driving business performance through people, skills and compliance excellence. We partner with companies of all sizes to build capable, compliant, and competitive workforces.</p>
        </div>
        <div class="partner-card fade-up" style="transition-delay:.2s">
          <div class="partner-icon">🌍</div>
          <h3 class="partner-title">International Partners</h3>
          <p class="partner-desc">Aligned with global standards and best practices for sustainable impact. Our frameworks meet international benchmarks while remaining contextually relevant to South Africa.</p>
        </div>
      </div>
    </div>
  </section>

  <!-- CTA STRIP -->
  <section class="cta-strip">
    <div class="cta-strip-inner">
      <div>
        <h2>Ready to Maximise Your SETA Benefits?</h2>
        <p>Upskill your workforce. Claim back what you&rsquo;re entitled to. Let&rsquo;s grow together.</p>
      </div>
      <a href="contact.html" class="btn-primary">Let&rsquo;s Grow Together</a>
    </div>
  </section>

</main>

<!-- FOOTER -->
<footer>
  <div class="footer-inner">
    <div>
      <div class="footer-logo-main">JUBA</div>
      <div class="footer-logo-sub">Consultants</div>
      <p class="footer-tagline">Empowering Excellence. Nurturing Potential. Your Gateway to Strategic HR Solutions and Professional Training.</p>
      <div class="footer-social">
        <a href="#" class="social-icon">in</a>
        <a href="#" class="social-icon">fb</a>
        <a href="#" class="social-icon">tw</a>
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
        <li><a href="partners.html">Our Partners</a></li>
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

<script src="js/main.js"></script>
</body>
</html>
```

- [ ] **Step 2: Verify in browser**

Open http://localhost:8080/partners.html — confirm the page banner, 3 partner cards, and "Partners" nav link is active.

- [ ] **Step 3: Commit**

```bash
git add partners.html
git commit -m "feat: create Partners page as static HTML"
```

---

### Task 8: Create contact.html

**Files:**
- Create: `contact.html`

Contact page shows details only — address, phone, email, website, director name. No form.

- [ ] **Step 1: Create the file**

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Contact Us | Juba Consultants</title>
  <link rel="icon" href="public/favicon.svg" type="image/svg+xml">
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="css/style.css">
</head>
<body>

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
    <li><a href="partners.html">Partners</a></li>
    <li><a href="contact.html">Contact</a></li>
  </ul>
  <a href="contact.html" class="nav-cta btn-navy">Get In Touch</a>
  <button class="nav-hamburger" id="hamburger" aria-label="Toggle menu">
    <span></span><span></span><span></span>
  </button>
  <div class="nav-mobile">
    <a href="index.html">Home</a>
    <a href="about.html">About</a>
    <a href="services.html">Services</a>
    <a href="partners.html">Partners</a>
    <a href="contact.html">Contact</a>
    <a href="contact.html" class="btn-navy">Get In Touch</a>
  </div>
</nav>

<main>

  <!-- PAGE BANNER -->
  <div class="page-banner">
    <div class="page-banner-inner">
      <p class="section-label">Get In Touch</p>
      <h1 class="section-title" style="margin-bottom:0">Contact Us</h1>
    </div>
  </div>

  <!-- CONTACT DETAILS -->
  <section class="contact-section">
    <div class="contact-inner fade-up">
      <p class="section-label">Get In Touch</p>
      <h2 class="section-title">Let&rsquo;s Start the Conversation</h2>
      <p class="section-sub" style="margin-bottom:36px">Whether you need skills development support, SETA grant assistance, or a full HR compliance overhaul &mdash; we&rsquo;re here to help.</p>

      <div class="contact-item">
        <div class="contact-item-icon">📍</div>
        <div>
          <p class="contact-item-label">Address</p>
          <p class="contact-item-value">57 Magwaza Maphalala Street, Berea 4001, Durban</p>
        </div>
      </div>
      <div class="contact-item">
        <div class="contact-item-icon">📞</div>
        <div>
          <p class="contact-item-label">Phone</p>
          <p class="contact-item-value"><a href="tel:+27793517376">+27 79 351 7376</a></p>
        </div>
      </div>
      <div class="contact-item">
        <div class="contact-item-icon">✉️</div>
        <div>
          <p class="contact-item-label">Email</p>
          <p class="contact-item-value"><a href="mailto:skhathi@jubasda.co.za">skhathi@jubasda.co.za</a></p>
        </div>
      </div>
      <div class="contact-item">
        <div class="contact-item-icon">🌐</div>
        <div>
          <p class="contact-item-label">Website</p>
          <p class="contact-item-value"><a href="#">www.jubaconsultants.co.za</a></p>
        </div>
      </div>
      <div class="contact-item">
        <div class="contact-item-icon">👤</div>
        <div>
          <p class="contact-item-label">Managing Director</p>
          <p class="contact-item-value">Sinenhlanhla Khathi</p>
        </div>
      </div>
    </div>
  </section>

</main>

<!-- FOOTER -->
<footer>
  <div class="footer-inner">
    <div>
      <div class="footer-logo-main">JUBA</div>
      <div class="footer-logo-sub">Consultants</div>
      <p class="footer-tagline">Empowering Excellence. Nurturing Potential. Your Gateway to Strategic HR Solutions and Professional Training.</p>
      <div class="footer-social">
        <a href="#" class="social-icon">in</a>
        <a href="#" class="social-icon">fb</a>
        <a href="#" class="social-icon">tw</a>
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
        <li><a href="partners.html">Our Partners</a></li>
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

<script src="js/main.js"></script>
</body>
</html>
```

- [ ] **Step 2: Verify in browser**

Open http://localhost:8080/contact.html — confirm the page banner, 5 contact detail rows, and "Contact" nav link is active. No form should appear.

- [ ] **Step 3: Commit**

```bash
git add contact.html
git commit -m "feat: create Contact page as static HTML (details only)"
```

---

### Task 9: Verify all pages

**Files:** none

- [ ] **Step 1: Start local server (if not already running)**

```bash
python3 -m http.server 8080
```

- [ ] **Step 2: Check each page loads**

Visit each URL and verify the page renders correctly:

| URL | Expected |
|---|---|
| http://localhost:8080/ | Hero, About teaser, 3 service cards, Partners, CTA strip |
| http://localhost:8080/about.html | Gold banner, About section with pillars grid and quote card |
| http://localhost:8080/services.html | Gold banner, all 9 service cards, additional services banner |
| http://localhost:8080/partners.html | Gold banner, 3 partner cards |
| http://localhost:8080/contact.html | Gold banner, 5 contact detail rows, no form |

- [ ] **Step 3: Check active nav link on each page**

On each page, the matching nav link must show a gold underline and navy text colour.

- [ ] **Step 4: Check mobile menu**

Resize browser to < 768px wide. Click the hamburger — menu opens. Click a link — menu closes and navigates.

- [ ] **Step 5: Check fade-up animations**

Scroll down on any page — elements with class `fade-up` should animate in.

- [ ] **Step 6: Check all inter-page links**

Click "Learn More →" on Home → lands on about.html.
Click "View All Services →" on Home → lands on services.html.
Click "Let's Grow Together" on any page → lands on contact.html.
Click footer links → each resolves to the correct page.

- [ ] **Step 7: Final commit**

```bash
git add -A
git commit -m "chore: complete static multipage site — all pages verified"
```
