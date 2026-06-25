# Juba Consultants — Security & SEO Audit + Hosting Readiness

_Date: 2026-06-26 · Site: static HTML/CSS/JS on GitHub Pages_

Applied the LTS **Security** (24 sections) and **SEO** (18 sections) checklists
to the site. Because this is a **static marketing site with no backend, database,
authentication, sessions, file uploads or API**, the majority of security items
are **N/A**. The high-value work was SEO and production hardening — all done.

---

## ✅ Fixed this round

### SEO
- **Meta descriptions** — unique, 125–160 chars, on all 9 pages.
- **Canonical tags** — on every page.
- **Open Graph** (title, description, type, url, site_name, locale, image
  1200×630, alt) — all pages, with a branded `images/og-cover.jpg` share card.
- **Twitter cards** — `summary_large_image` on all pages.
- **Structured data (JSON-LD)** — Organization + WebSite on the home page,
  ProfessionalService (with address, phone, areaServed) on contact.
- **robots.txt** — added, references the sitemap.
- **sitemap.xml** — all 9 URLs, submitted-ready.
- **404.html** — branded custom error page (GitHub Pages serves it).
- Already in place: HTTPS, unique titles, one H1 per page, `lang`, viewport,
  charset, descriptive image `alt` text, `loading="lazy"`, responsive design,
  clean relative URLs.

### Security
- **Content-Security-Policy** meta (default-src 'self'; scoped allowances for
  Google Fonts + Formspree) — verified it doesn't break rendering.
- **Referrer-Policy** (`strict-origin-when-cross-origin`) and **theme-color** meta.
- Confirmed: **no secrets/API keys in source**, no inline scripts, HTTPS enforced
  by GitHub Pages, `.gitignore` excludes source archives.

---

## ⚪ N/A — no backend (static site)

Authentication, sessions, SQL injection, CSRF, file uploads, access control/IDOR,
rate limiting, server logging, API security, CMS, SSRF, business-logic/race
conditions, JWT — none apply to a static site with no server-side code.

---

## 🟡 Outstanding — needs your input or a backend/host feature

| Item | Why | Action |
|---|---|---|
| **Contact form endpoint** | Form posts to a placeholder `FORM_ENDPOINT` | Create a free Formspree form and paste the real endpoint into `contact.html` |
| **Real HTTP security headers** (X-Content-Type-Options, HSTS, Permissions-Policy) | GitHub Pages can't set custom headers; only `<meta>` CSP is possible | Set these at the host/CDN level (e.g. Cloudflare) if/when moved |
| **Google Search Console + GA4** | Needed to submit the sitemap and track SEO | Verify the property, submit `sitemap.xml`, add GA4 |
| **Footer social links** | LinkedIn/Facebook/X point to `#` | Replace with real profile URLs |
| **Image format (WebP/AVIF)** | Photos are optimised JPEGs | Optional: convert to WebP for a small Core Web Vitals gain |
| **Custom domain** | Currently `lubelo20.github.io/JUBA/` | Point `jubaconsultants.co.za` via Pages settings + DNS + CNAME |

---

## Result

The site is **production-ready for static hosting** and **search-engine ready**.
The remaining items are either external setup (Search Console, Formspree, social
URLs) or only relevant once moved behind a host/CDN that allows real headers.
