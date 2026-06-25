# JUBA Consultants — Website Overview & Improvements

_Last updated: 2026-06-26_

A handover summary of what the website contains and what was improved in this
round of work.

---

## 1. At a glance

| | |
|---|---|
| **Live site (GitHub Pages)** | https://lubelo20.github.io/JUBA/ |
| **Repository** | https://github.com/Lubelo20/JUBA (branch `main`) |
| **Stack** | Static HTML + CSS + vanilla JavaScript — no framework, no build step |
| **Deploy** | GitHub Pages, source `main` / root — every push to `main` auto-deploys |
| **Brand** | Navy `#0B2E6D` · Navy-dark `#071d45` · Gold `#C9A34E` · Poppins |
| **Positioning** | Skills Development · AI · ICT — "Driving innovation. Building capacity. Transforming futures." |

> Note: the public marketing domain `jubaconsultants.co.za` is a separate,
> older build and is **not** served from this repository. To put this site on
> that domain, a custom-domain + DNS step is required (see §7).

---

## 2. Site map — what's on each page

**Navigation:** Home · About · Services ▾ (Skills / AI / ICT) · Incubation · Gallery · Contact

### Home (`index.html`)
- **Hero** with a **mock JUBA LMS dashboard** (learner view: progress ring, KPI
  cards, course list, upcoming session) — pure CSS/SVG, labelled as a preview.
- About teaser → Services preview (cards link to the three division pages).
- **Who We Serve** (Government · Private Sector · International).
- **Mission strip** and a **"Life at Juba"** photo band.
- Closing call-to-action.

### About (`about.html`)
Rebuilt from the company profile:
- Intro + **founder card** (Sinenhlanhla Khathi) + trust badges.
- **Core values** band (7 values) on a navy-overlaid **photo background**.
- **Vision & Mission** cards.
- **Our Approach** (5-step methodology) with a photo.
- **Areas of Operation** — 7 provinces (KZN, Gauteng, Eastern Cape, Free State,
  Limpopo, Mpumalanga, Northern Cape).
- **Our Team** — Director, Technical Director, Senior Developer + interns.

### Services hub (`services.html`)
- Overview of the **three divisions** as image cards.
- Secondary offerings: Business Incubation, Organisational Capacity Building,
  Bursary Facilitation.

### Division pages
- **Skills Development & Training** (`skills.html`) — learnerships, skills
  programmes, short courses, corporate training, SDF consultancy (WSP/ATR,
  accreditation, discretionary grants); **trading as KZN Project Management**;
  SETA & QCTO aligned.
- **AI Breakthrough** (`ai.html`) — AI education, solution creation, tool
  application, community deployment, emerging tech, collaborative programs.
- **ICT & Technology Solutions** (`ict.html`) — development services + training
  tiers (ages 8–16 to enterprise) + **Notable Projects** (Corundum, Project LMS,
  Mentor Management System, JubaSkillsDevelopment Platform).

### Incubation (`incubation.html`)
Startup readiness, business-model refinement, compliance support, digital
enablement, operational structuring, growth mentoring.

### Gallery (`gallery.html`)
- **Masonry photo grid** (15 curated photos, mixed orientation, lightbox).
- **Video section** (5 short clips).

### Contact (`contact.html`)
- Address, phone, director.
- **Departmental emails**: general (×2), training academy, director, technical
  director.
- **WhatsApp** button + enquiry form (Formspree-ready).

---

## 3. Design system

- **Warmer, more human feel:** softer rounded cards, gentle shadows (replacing
  hard borders), warm-tinted section backgrounds, real photo bands woven in.
- **Reusable components:** dropdown nav, gradient **banner heroes**, checkmark
  **feature lists**, **offer cards**, **hub cards**, **project cards**, **mission
  strips**, photo **splits/strips**, the **LMS dashboard mock**, departmental
  **email cards**, **WhatsApp** button.
- **Accessibility:** inline SVG icons (no icon CDN), focus-visible states,
  `aria` labels, scroll-reveal that respects `prefers-reduced-motion`.
- **Responsive** across desktop, tablet and mobile.

---

## 4. Media

- Event photos and videos were **curated, optimised and renamed** descriptively
  (`training-session.jpg`, `keynote-presentation.jpg`, `spokesperson-01.jpg`, …)
  and live in `images/gallery/`.
- Loose source files were **archived locally** to `images/originals/`
  (git-ignored — kept on disk, not in the repo).
- Gallery **videos were compressed** for the web; the 9-minute session recording
  was **trimmed to a 25-second highlight** (31 MB → ~4 MB).

---

## 5. What we improved (this round)

1. **Content migration** — brought the richer live-site content into the
   multi-page design with all specifics (programmes, trading name, projects).
2. **New pages & navigation** — added Skills, AI, ICT division pages and a
   dedicated Incubation page; turned Services into a hub with a dropdown nav.
3. **Warmer, more human design** — rounded cards, soft shadows, photo bands,
   mission strips.
4. **Home LMS dashboard mockup** — replaced the static "Core Expertise" panel
   with a product-style JUBA LMS preview.
5. **About page rebuilt** from the company profile (vision/mission, 7 values,
   approach, areas of operation, team) and **re-balanced** the intro layout.
6. **Core-values band** given a navy-overlaid **photo background**.
7. **Contact** — added departmental emails + WhatsApp; fixed a stale fallback
   email in `js/main.js`.
8. **Gallery** — switched to a **masonry layout** so portrait photos display
   fully (no more awkward cropping); refreshed photos and videos.
9. **Media housekeeping** — curated, optimised, renamed, archived originals,
   compressed videos, trimmed the long clip to a highlight.
10. **Copy** — replaced "Black female owned" with **"Proudly South African"**.
11. **Shipped** — committed and pushed to `main`; **deployed to GitHub Pages**
    and verified live.

---

## 6. Tech & deployment notes

- **No build step / no dependencies.** Preview locally with
  `python3 -m http.server 8000` then open `http://localhost:8000`.
- Nav and footer markup are duplicated across pages — keep them in sync when
  editing (helper scripts were used to do this consistently).
- GitHub Pages serves from `main` / root; pushing to `main` redeploys
  automatically (build takes ~1 minute).

---

## 7. Suggested next steps

- **Custom domain:** point `jubaconsultants.co.za` (or a subdomain) at GitHub
  Pages — add the domain in repo **Settings → Pages**, add a `CNAME` file, and
  create the DNS records. This makes the new site the public one.
- **Contact form:** set the real Formspree endpoint in `contact.html`
  (currently a placeholder) so enquiries are delivered.
- **Social links:** the footer LinkedIn/Facebook/X icons point to `#` — add the
  real profile URLs when available.
- **LMS link:** if/when the real JUBA LMS is online, link the hero mock and the
  ICT "Access LMS Portal" CTA to it.
