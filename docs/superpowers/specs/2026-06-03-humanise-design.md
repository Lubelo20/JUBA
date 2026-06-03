# Humanise Website Design

**Date:** 2026-06-03
**Status:** Approved

## Overview

Remove the four main AI-generation signals from the Juba Consultants static site:
1. Emoji service icons → Lucide SVG icons via CDN
2. Generic corporate copy → warm, direct, personal rewrite
3. Fake stats / inflated metrics → removed entirely
4. Rigid symmetric grids → simplified single-column sections where appropriate

## Changes by File

### `index.html`

**Hero section — full rewrite:**
- Remove the right-side column entirely (badges panel + Gov/SME/Int'l stats block)
- Hero becomes centred single column
- New eyebrow: `Black female owned · Durban, South Africa`
- New headline: `We help South African organisations grow their people.`
- New subtext: `SETA grants, skills plans, employment equity — handled properly, the first time. No jargon, no runaround.`
- Buttons unchanged: "Our Services" → `services.html`, "Get In Touch" → `contact.html`

**About teaser — simplify to single column:**
- Remove the right-side card (navy card with "100% Committed to your growth", quote, badges)
- Left column becomes full width
- New body paragraph: `Juba Skills Development Academy is a black female owned consultancy. We work with government departments, private companies, and SMMEs — helping them submit WSP and ATR reports, claim SETA grants, and meet employment equity targets without the usual headaches.`
- "Learn More →" button stays

**Services preview — replace emoji icons:**
- Replace `🔍📋⚖️` emoji divs with Lucide SVG icons (see Icon Map below)
- Card structure unchanged

**Lucide CDN:** Add `<script src="https://unpkg.com/lucide@latest/dist/umd/lucide.min.js"></script>` before closing `</body>` on all pages. Replace emoji content with `<i data-lucide="[icon-name]"></i>`. Call `lucide.createIcons()` after the script tag.

### `about.html`

- About section body: rewrite to match new single-column tone (remove "comprehensive", "various domains", "trusted, consistent, and memorable" — replace with specific language)
- New body: `We work alongside South African businesses, government departments, and SMMEs to handle the HR compliance work that most organisations find overwhelming. WSP submissions, ATR reports, SETA grants, employment equity plans — we know the process, we know the deadlines, and we make sure it's done right.`
- Replace emoji icons in pillars with Lucide SVGs or remove the pillar grid icons
- About card (navy quote card): keep but remove "100% Committed to your growth" number and "Committed to your growth" subline — start directly with the quote: `"I started this firm because I saw how many South African businesses were losing money they were legally entitled to claim — simply because nobody explained the process clearly."` followed by `— Sinenhlanhla Khathi, Managing Director`

### `services.html`

- Section header subtext: replace "End-to-end services covering every aspect of workforce development, compliance, and organisational growth" with `We've built our practice around the services South African employers actually need — and the ones SETA regulations require.`
- Replace all 9 emoji icons with Lucide SVGs (see Icon Map)
- Additional services banner copy: unchanged (list format, no buzzwords)

### `partners.html`

- Section subtext: replace "Delivering tailored solutions across government, private sector, and international organisations to drive sustainable transformation" with `We've worked with organisations of all sizes across South Africa — from government departments to growing SMEs.`
- Partner card descriptions: rewrite to be more direct (see Copy Rewrites below)

### `contact.html`

- Section heading: keep "Let's Start the Conversation"
- Section subtext: replace with `Call, email, or fill in the form and we'll get back to you within one business day.`

### `css/style.css`

**Hero layout change:**
```css
.hero-inner {
  grid-template-columns: 1fr;   /* was: 1fr 1fr on desktop */
  max-width: 720px;             /* constrain centred column */
  text-align: center;
}
.hero h1, .hero-sub, .hero-buttons { text-align: center; }
.hero-eyebrow { justify-content: center; }
.hero-buttons { justify-content: center; }
.hero-right { display: none; }  /* already hidden on mobile; hide on all */
```

**About inner on home — single column:**
```css
/* On index.html the about-inner no longer needs a 2-col grid */
.about-inner { grid-template-columns: 1fr; max-width: 720px; }
```

**Lucide icon sizing:**
```css
.service-icon i, .service-icon svg { width: 22px; height: 22px; }
```

## Icon Map (emoji → Lucide)

| Service | Emoji | Lucide icon name |
|---|---|---|
| Skills Audit | 🔍 | `search` |
| Employment Skills Plan (WSP) | 📋 | `clipboard-check` |
| Employment Equity Plan & Reporting | ⚖️ | `scale` |
| Annual Training Report (ATR) | 📊 | `bar-chart-2` |
| SETA Grant Application | 💰 | `banknote` |
| WSP & ATR Linked to B-BBEE | 🔗 | `link` |
| QCTO Accreditation | 🎓 | `graduation-cap` |
| Tax Incentives | 💹 | `trending-up` |
| Monthly Training Report | 📅 | `calendar` |

## Partner Card Copy Rewrites

**Government:** `We help government departments meet their skills development and employment equity mandates — on time, correctly documented, and ready for audit.`

**Private Sector:** `From large corporates to growing SMEs, we handle the compliance work so your HR team can focus on your people.`

**International Partners:** `Our work is benchmarked against international HR standards while staying grounded in South African legislation and SETA requirements.`

## Constraints

- No new npm dependencies — Lucide loaded from unpkg CDN
- No structural page changes beyond those listed above
- All 5 HTML pages updated
- No new sections or pages added
