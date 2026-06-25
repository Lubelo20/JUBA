# Juba Consultants — Content Migration & Warmer Feel

**Date:** 2026-06-25
**Status:** Approved

## Goal

Bring the richer content from the live site (`jubaconsultants.co.za`) into the
repo's "new design", add dedicated division pages, and refine the visual feel
toward "warmer & human" — all while staying static HTML/CSS/vanilla JS.

> Note: the live site is **not** served from this repo. This work refines the
> repo only; deployment is a separate step the client must perform.

## Structure

Pages (nav order): **Home · About · Services ▾ · Incubation · Gallery · Contact**

Services becomes an overview **hub** with a dropdown to three new division pages:

- `skills.html` — Skills Development & Training
- `ai.html` — AI Breakthrough
- `ict.html` — ICT & Technology Solutions
- `incubation.html` — Business Incubation (its own page, per client decision)

Secondary offerings (Capacity Building, Bursary Facilitation) remain as cards on
the Services hub.

Nav + footer markup is duplicated across all pages and must be kept in sync
(per CLAUDE.md). The Services dropdown is added to every page's nav.

## Per-page content (all live-site specifics included)

### skills.html
Trading note: "trading as KZN Project Management". Offerings:
- Training: Learnerships, Skills Programmes, Short Courses, Corporate Training
- Consultancy/PM: Skills Development Facilitation, WSP/ATR, Accreditation support,
  Learnership & internship coordination
- Additional: Learner sourcing & placement, Training needs analysis & skills
  audits, Entrepreneurship & life skills, Discretionary grants & tax incentives
  advisory, Quality management systems, Community project facilitation
- SETA / QCTO aligned.

### ai.html
Headline: "Making Artificial Intelligence Accessible to All". Offerings:
AI Education, Solution Creation, Tool Application, Community Deployment,
Emerging Technology (incl. quantum-computing R&D), Collaborative Programs.

### ict.html
Headline: "Transforming Ideas Into Digital Solutions". Offerings:
- Development: custom mobile/web apps, website & e-commerce, AI/ML integration,
  database & cloud, system integration & APIs, maintenance & 24/7 support
- Training tiers: Kids & youth (ages 8–16), advanced programming (teens/students),
  professional AI & data science, corporate upskilling, client-specific training
- Notable Projects: Corundum Platform, Project LMS, Mentor Management System,
  JubaSkillsDevelopment Platform

### incubation.html
Startup readiness, business model refinement, compliance support, digital
enablement, operational structuring, growth mentoring.

### Home
Add mission line, weave in photo bands from `images/gallery/*`, update services
preview to link to the new division pages, keep Who-We-Serve + CTA.

### Contact
Add all departmental emails:
- General: jubaskillsdev@gmail.com, jubaskillscomm@gmail.com
- Training Academy: training.academy@jubaconsultants.co.za
- Director (Sinenhlanhla Khathi): sne.khathi@jubaconsultants.co.za
- Technical Director: techdirector@jubaconsultants.co.za
Add WhatsApp button (wa.me/27683825733).

## Warmer & human feel (CSS only, keep navy/gold/Poppins)

- Softer rounded cards (larger radius), gentle shadows replacing hard borders.
- Warm-tinted section background (replace cold grey `--soft`).
- Photo bands using existing `images/gallery/*` shots on Home + division pages.
- Rounded photo treatments; slightly larger imagery.
- Keep existing scroll-reveal (`.fade-up`) in `js/main.js`.

## Constraints

- No framework, no build step, no test suite.
- Inline SVG icons only — no icon CDN.
- Reuse existing component classes (`.btn-primary`, `.card-item`, `.eyebrow`, …).
- Brand: navy `#0B2E6D`, navy-dark `#071d45`, gold `#C9A34E`.

## Out of scope

Deployment / hosting changes; reconciling which version is live.
