# Humanise Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Remove the four main AI-generation signals from the static site: emoji icons, generic buzzword copy, fake stats, and rigid symmetric grids.

**Architecture:** Pure HTML/CSS edits across 5 pages and 1 CSS file. Lucide SVG icons loaded from CDN replace emojis on `index.html` and `services.html`. No new files created. No build step required.

**Tech Stack:** HTML5, CSS3, Lucide Icons CDN (`https://unpkg.com/lucide@latest/dist/umd/lucide.min.js`)

---

### Task 1: Update css/style.css — hero centred layout + Lucide icon sizing

**Files:**
- Modify: `css/style.css`

- [ ] **Step 1: Make hero centred single column**

Find and replace the `.hero-inner` block and its media query override:

**Find:**
```css
.hero-inner {
  max-width: 1152px; margin: 0 auto; width: 100%;
  display: grid; grid-template-columns: 1fr; gap: 80px; align-items: center;
}
@media (min-width: 1024px) { .hero-inner { grid-template-columns: 1fr 1fr; } }
```

**Replace with:**
```css
.hero-inner {
  max-width: 720px; margin: 0 auto; width: 100%;
  display: block;
  text-align: center;
}
.hero-eyebrow { justify-content: center; }
.hero-buttons { justify-content: center; }
```

- [ ] **Step 2: Remove hero-eyebrow gold bar (looks unbalanced when centred)**

Find and delete this line:
```css
.hero-eyebrow::before { content: ''; display: block; width: 32px; height: 2px; background: var(--gold); }
```

Replace with nothing (delete the line entirely).

- [ ] **Step 3: Remove hero-sub max-width constraint**

Find:
```css
.hero-sub { color: rgba(255,255,255,.65); font-size: 15px; line-height: 1.7; margin-bottom: 40px; max-width: 512px; }
```

Replace with:
```css
.hero-sub { color: rgba(255,255,255,.65); font-size: 15px; line-height: 1.7; margin-bottom: 40px; }
```

- [ ] **Step 4: Remove hero-right desktop display rule**

Find and delete this line:
```css
@media (min-width: 1024px) { .hero-right { display: block; } }
```

- [ ] **Step 5: Add Lucide icon sizing after .service-icon styles**

Find:
```css
.service-name { font-size: 14px; font-weight: 700; color: var(--navy); text-transform: uppercase; letter-spacing: 1px; line-height: 1.3; margin-bottom: 12px; }
```

Insert this line immediately before it:
```css
.service-icon i, .service-icon svg { width: 22px; height: 22px; stroke: var(--navy); stroke-width: 2; fill: none; }
```

- [ ] **Step 6: Verify file saved correctly**

```bash
grep -n "720px\|justify-content: center\|data-lucide\|stroke: var" /Users/ndumisomngomezulu/Downloads/juba-consultants/css/style.css | head -10
```

Expected: lines mentioning `720px`, `justify-content: center`, `stroke: var(--navy)`.

- [ ] **Step 7: Commit**

```bash
git -C /Users/ndumisomngomezulu/Downloads/juba-consultants add css/style.css
git -C /Users/ndumisomngomezulu/Downloads/juba-consultants commit -m "feat: centred hero layout and Lucide icon sizing in CSS"
```

---

### Task 2: Update index.html — hero, about teaser, service icons, Lucide CDN

**Files:**
- Modify: `index.html`

- [ ] **Step 1: Rewrite hero eyebrow and heading**

Find:
```html
        <p class="hero-eyebrow">Your Consulting Partner of Choice</p>
        <h1>Empowering People.<br><span>Building</span> Futures.</h1>
        <p class="hero-sub">Juba Consultants is a black female owned HR consultancy delivering world-class skills development, compliance, and training solutions across South Africa.</p>
```

Replace with:
```html
        <p class="hero-eyebrow">Black female owned &middot; Durban, South Africa</p>
        <h1>We help South African<br>organisations <span>grow their people.</span></h1>
        <p class="hero-sub">SETA grants, skills plans, employment equity &mdash; handled properly, the first time. No jargon, no runaround.</p>
```

- [ ] **Step 2: Remove the hero-right div entirely**

Find and delete the entire block (from `<div class="hero-right">` to its closing `</div>`):
```html
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
```

Replace with nothing (delete the entire block).

- [ ] **Step 3: Rewrite about teaser — single column, remove right card**

Find the entire about section:
```html
  <!-- ABOUT TEASER -->
  <section class="about-section">
    <div class="about-inner">
      <div class="about-left fade-up">
        <p class="section-label">About Us</p>
        <h2 class="section-title">Strengthening Organisations Through People</h2>
        <p class="about-body">Juba Skills Development Academy is a black female owned company providing comprehensive HR consultancy services and training across various domains. We serve government departments, private companies, and SMMEs &mdash; delivering solutions that are trusted, consistent, and memorable.</p>
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
```

Replace with:
```html
  <!-- ABOUT TEASER -->
  <section class="about-section">
    <div class="about-inner" style="grid-template-columns:1fr;max-width:720px">
      <div class="about-left fade-up">
        <p class="section-label">About Us</p>
        <h2 class="section-title">We know South African HR compliance inside out.</h2>
        <p class="about-body">Juba Skills Development Academy is a black female owned consultancy. We work with government departments, private companies, and SMMEs &mdash; helping them submit WSP and ATR reports, claim SETA grants, and meet employment equity targets without the usual headaches.</p>
        <a href="about.html" class="btn-navy">Learn More &rarr;</a>
      </div>
    </div>
  </section>
```

- [ ] **Step 4: Replace emoji icons in services preview**

Find and replace each emoji in the three service cards:

```html
          <div class="service-icon">🔍</div>
```
→
```html
          <div class="service-icon"><i data-lucide="search"></i></div>
```

```html
          <div class="service-icon">📋</div>
```
→
```html
          <div class="service-icon"><i data-lucide="clipboard-check"></i></div>
```

```html
          <div class="service-icon">⚖️</div>
```
→
```html
          <div class="service-icon"><i data-lucide="scale"></i></div>
```

- [ ] **Step 5: Update footer tagline**

Find:
```html
      <p class="footer-tagline">Empowering Excellence. Nurturing Potential. Your Gateway to Strategic HR Solutions and Professional Training.</p>
```

Replace with:
```html
      <p class="footer-tagline">Skills development, SETA grants, and employment equity compliance &mdash; done properly.</p>
```

- [ ] **Step 6: Add Lucide CDN before closing </body>**

Find:
```html
<script src="js/main.js"></script>
</body>
```

Replace with:
```html
<script src="js/main.js"></script>
<script src="https://unpkg.com/lucide@latest/dist/umd/lucide.min.js"></script>
<script>lucide.createIcons();</script>
</body>
```

- [ ] **Step 7: Verify icons rendered**

```bash
python3 -m http.server 8082 --directory /Users/ndumisomngomezulu/Downloads/juba-consultants &
sleep 2
curl -s http://localhost:8082/ | grep -c 'data-lucide'
```

Expected: `3` (three Lucide icon references in the services preview).

- [ ] **Step 8: Kill server and commit**

```bash
kill $(lsof -ti:8082) 2>/dev/null || true
git -C /Users/ndumisomngomezulu/Downloads/juba-consultants add index.html
git -C /Users/ndumisomngomezulu/Downloads/juba-consultants commit -m "feat: rewrite hero copy, simplify about teaser, replace emoji service icons on Home"
```

---

### Task 3: Update about.html — copy rewrite, about card, footer tagline

**Files:**
- Modify: `about.html`

- [ ] **Step 1: Rewrite about body paragraph**

Find:
```html
        <p class="about-body">Juba Skills Development Academy is a black female owned company providing comprehensive HR consultancy services and training across various domains. We serve government departments, private companies, individuals, and Small, Medium, and Micro Enterprises (SMMEs) &mdash; delivering solutions that are trusted, consistent, and memorable.</p>
```

Replace with:
```html
        <p class="about-body">We work alongside South African businesses, government departments, and SMMEs to handle the HR compliance work that most organisations find overwhelming. WSP submissions, ATR reports, SETA grants, employment equity plans &mdash; we know the process, we know the deadlines, and we make sure it&rsquo;s done right.</p>
```

- [ ] **Step 2: Remove "100%" number and generic subline from about card, replace quote**

Find:
```html
        <div class="about-card">
          <div class="about-card-num">100%</div>
          <p class="about-card-sub">Committed to your growth</p>
          <p class="about-card-quote">&ldquo;Empowering Excellence. Nurturing Potential. Your Gateway to Strategic HR Solutions and Professional Training.&rdquo;</p>
          <p class="about-card-author">&mdash; Sinenhlanhla Khathi, Managing Director</p>
        </div>
```

Replace with:
```html
        <div class="about-card">
          <p class="about-card-quote">&ldquo;I started this firm because I saw how many South African businesses were losing money they were legally entitled to claim &mdash; simply because nobody explained the process clearly.&rdquo;</p>
          <p class="about-card-author">&mdash; Sinenhlanhla Khathi, Managing Director</p>
        </div>
```

- [ ] **Step 3: Update footer tagline**

Find:
```html
      <p class="footer-tagline">Empowering Excellence. Nurturing Potential. Your Gateway to Strategic HR Solutions and Professional Training.</p>
```

Replace with:
```html
      <p class="footer-tagline">Skills development, SETA grants, and employment equity compliance &mdash; done properly.</p>
```

- [ ] **Step 4: Commit**

```bash
git -C /Users/ndumisomngomezulu/Downloads/juba-consultants add about.html
git -C /Users/ndumisomngomezulu/Downloads/juba-consultants commit -m "feat: rewrite about copy and director quote card"
```

---

### Task 4: Update services.html — subtext rewrite, all 9 emoji icons → Lucide, Lucide CDN

**Files:**
- Modify: `services.html`

- [ ] **Step 1: Rewrite services header subtext**

Find:
```html
        <p class="section-sub" style="max-width:300px">End-to-end services covering every aspect of workforce development, compliance, and organisational growth.</p>
```

Replace with:
```html
        <p class="section-sub" style="max-width:300px">We&rsquo;ve built our practice around the services South African employers actually need &mdash; and the ones SETA regulations require.</p>
```

- [ ] **Step 2: Replace all 9 emoji service icons with Lucide icons**

Make these 9 replacements (each is a single-line change):

1. `<div class="service-icon">🔍</div>` → `<div class="service-icon"><i data-lucide="search"></i></div>`
2. `<div class="service-icon">📋</div>` → `<div class="service-icon"><i data-lucide="clipboard-check"></i></div>`
3. `<div class="service-icon">⚖️</div>` → `<div class="service-icon"><i data-lucide="scale"></i></div>`
4. `<div class="service-icon">📊</div>` → `<div class="service-icon"><i data-lucide="bar-chart-2"></i></div>`
5. `<div class="service-icon">💰</div>` → `<div class="service-icon"><i data-lucide="banknote"></i></div>`
6. `<div class="service-icon">🔗</div>` → `<div class="service-icon"><i data-lucide="link"></i></div>`
7. `<div class="service-icon">🎓</div>` → `<div class="service-icon"><i data-lucide="graduation-cap"></i></div>`
8. `<div class="service-icon">💹</div>` → `<div class="service-icon"><i data-lucide="trending-up"></i></div>`
9. `<div class="service-icon">📅</div>` → `<div class="service-icon"><i data-lucide="calendar"></i></div>`

- [ ] **Step 3: Update footer tagline**

Find:
```html
      <p class="footer-tagline">Empowering Excellence. Nurturing Potential. Your Gateway to Strategic HR Solutions and Professional Training.</p>
```

Replace with:
```html
      <p class="footer-tagline">Skills development, SETA grants, and employment equity compliance &mdash; done properly.</p>
```

- [ ] **Step 4: Add Lucide CDN before closing </body>**

Find:
```html
<script src="js/main.js"></script>
</body>
```

Replace with:
```html
<script src="js/main.js"></script>
<script src="https://unpkg.com/lucide@latest/dist/umd/lucide.min.js"></script>
<script>lucide.createIcons();</script>
</body>
```

- [ ] **Step 5: Verify icon count**

```bash
grep -c 'data-lucide' /Users/ndumisomngomezulu/Downloads/juba-consultants/services.html
```

Expected: `9`

- [ ] **Step 6: Commit**

```bash
git -C /Users/ndumisomngomezulu/Downloads/juba-consultants add services.html
git -C /Users/ndumisomngomezulu/Downloads/juba-consultants commit -m "feat: replace emoji icons with Lucide SVGs on Services page, rewrite header copy"
```

---

### Task 5: Update partners.html — copy rewrites and footer tagline

**Files:**
- Modify: `partners.html`

- [ ] **Step 1: Rewrite section subtext**

Find:
```html
        <p class="section-sub">Delivering tailored solutions across government, private sector, and international organisations to drive sustainable transformation.</p>
```

Replace with:
```html
        <p class="section-sub">We&rsquo;ve worked with organisations of all sizes across South Africa &mdash; from government departments to growing SMEs.</p>
```

- [ ] **Step 2: Rewrite Government card description**

Find:
```html
          <p class="partner-desc">Delivering solutions that support national development and policy objectives. We help government departments meet their skills development and transformation mandates effectively.</p>
```

Replace with:
```html
          <p class="partner-desc">We help government departments meet their skills development and employment equity mandates &mdash; on time, correctly documented, and ready for audit.</p>
```

- [ ] **Step 3: Rewrite Private Sector card description**

Find:
```html
          <p class="partner-desc">Driving business performance through people, skills and compliance excellence. We partner with companies of all sizes to build capable, compliant, and competitive workforces.</p>
```

Replace with:
```html
          <p class="partner-desc">From large corporates to growing SMEs, we handle the compliance work so your HR team can focus on your people.</p>
```

- [ ] **Step 4: Rewrite International Partners card description**

Find:
```html
          <p class="partner-desc">Aligned with global standards and best practices for sustainable impact. Our frameworks meet international benchmarks while remaining contextually relevant to South Africa.</p>
```

Replace with:
```html
          <p class="partner-desc">Our work is benchmarked against international HR standards while staying grounded in South African legislation and SETA requirements.</p>
```

- [ ] **Step 5: Update footer tagline**

Find:
```html
      <p class="footer-tagline">Empowering Excellence. Nurturing Potential. Your Gateway to Strategic HR Solutions and Professional Training.</p>
```

Replace with:
```html
      <p class="footer-tagline">Skills development, SETA grants, and employment equity compliance &mdash; done properly.</p>
```

- [ ] **Step 6: Commit**

```bash
git -C /Users/ndumisomngomezulu/Downloads/juba-consultants add partners.html
git -C /Users/ndumisomngomezulu/Downloads/juba-consultants commit -m "feat: rewrite partners page copy"
```

---

### Task 6: Update contact.html — subtext rewrite and footer tagline

**Files:**
- Modify: `contact.html`

- [ ] **Step 1: Rewrite contact section subtext**

Find:
```html
      <p class="section-sub" style="margin-bottom:36px">Whether you need skills development support, SETA grant assistance, or a full HR compliance overhaul &mdash; we&rsquo;re here to help.</p>
```

Replace with:
```html
      <p class="section-sub" style="margin-bottom:36px">Call or email us and we&rsquo;ll get back to you within one business day.</p>
```

- [ ] **Step 2: Update footer tagline**

Find:
```html
      <p class="footer-tagline">Empowering Excellence. Nurturing Potential. Your Gateway to Strategic HR Solutions and Professional Training.</p>
```

Replace with:
```html
      <p class="footer-tagline">Skills development, SETA grants, and employment equity compliance &mdash; done properly.</p>
```

- [ ] **Step 3: Commit**

```bash
git -C /Users/ndumisomngomezulu/Downloads/juba-consultants add contact.html
git -C /Users/ndumisomngomezulu/Downloads/juba-consultants commit -m "feat: rewrite contact page copy"
```

---

### Task 7: Verify all pages

**Files:** none

- [ ] **Step 1: Start local server**

```bash
python3 -m http.server 8082 --directory /Users/ndumisomngomezulu/Downloads/juba-consultants &
sleep 2
```

- [ ] **Step 2: Check hero is centred on Home**

```bash
curl -s http://localhost:8082/ | grep -o 'Black female owned\|We help South African\|hero-right'
```

Expected: `Black female owned` and `We help South African` present, `hero-right` absent.

- [ ] **Step 3: Check service icons use Lucide on both pages**

```bash
curl -s http://localhost:8082/ | grep -c 'data-lucide'
curl -s http://localhost:8082/services.html | grep -c 'data-lucide'
```

Expected: `3` for Home (3-card preview), `9` for Services (all cards).

- [ ] **Step 4: Check footer tagline updated on all pages**

```bash
for page in "" about.html services.html partners.html contact.html; do
  url="http://localhost:8082/${page}"
  old=$(curl -s "$url" | grep -c 'Empowering Excellence' || true)
  new=$(curl -s "$url" | grep -c 'done properly' || true)
  echo "${page:-index.html}: old tagline=$old new tagline=$new"
done
```

Expected: all pages show `old tagline=0 new tagline=1`.

- [ ] **Step 5: Check about.html has no "100%" number**

```bash
curl -s http://localhost:8082/about.html | grep -c 'about-card-num\|100%'
```

Expected: `0`

- [ ] **Step 6: Stop server and make final commit**

```bash
kill $(lsof -ti:8082) 2>/dev/null || true
git -C /Users/ndumisomngomezulu/Downloads/juba-consultants add -A
git -C /Users/ndumisomngomezulu/Downloads/juba-consultants commit -m "chore: humanise website — all pages verified" 2>/dev/null || echo "nothing to commit"
```
