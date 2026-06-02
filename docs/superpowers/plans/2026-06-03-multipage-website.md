# Multipage Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Convert the single-scroll-page Juba Consultants site into a 5-page React Router v6 app (Home, About, Services, Partners, Contact).

**Architecture:** A `<Layout>` component wraps `<Outlet>` between the Navbar and Footer; `App.jsx` becomes the route config; all existing section components are reused unchanged by the new page files. Anchor `<a href="#...">` tags in Navbar, Footer, Hero, and CTAStrip are replaced with react-router-dom `<Link>` / `<NavLink>`.

**Tech Stack:** React 18, Vite 5, React Router v6 (already installed), Tailwind CSS 3

> **Note:** `src/sections/Contact.jsx` already contains a full contact form — it is kept as-is. The brainstorming question about a form was based on an inaccurate description of the section.

> **No test framework is configured.** Verification steps use `npm run lint` and the dev server instead of a test runner.

---

### Task 1: Add BrowserRouter to main.jsx

**Files:**
- Modify: `src/main.jsx`

- [ ] **Step 1: Update main.jsx**

Replace the entire file:

```jsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
```

- [ ] **Step 2: Lint check**

```bash
npm run lint
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/main.jsx
git commit -m "feat: wrap app in BrowserRouter"
```

---

### Task 2: Create Layout.jsx

**Files:**
- Create: `src/components/Layout.jsx`

- [ ] **Step 1: Create the file**

```jsx
import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'

export default function Layout() {
  return (
    <div className="font-poppins">
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
```

- [ ] **Step 2: Lint check**

```bash
npm run lint
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/Layout.jsx
git commit -m "feat: add Layout component with Navbar, Outlet, Footer"
```

---

### Task 3: Create PageBanner.jsx

**Files:**
- Create: `src/components/PageBanner.jsx`

The banner sits immediately below the fixed Navbar (72px tall) on every inner page. It uses the existing `.section-label` and `.section-title` CSS classes from `src/index.css`.

- [ ] **Step 1: Create the file**

```jsx
export default function PageBanner({ label, title }) {
  return (
    <div className="pt-[72px] bg-white px-[5%]">
      <div className="max-w-6xl mx-auto py-12 border-l-4 border-gold pl-8">
        <p className="section-label">{label}</p>
        <h1 className="section-title mb-0">{title}</h1>
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Lint check**

```bash
npm run lint
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/PageBanner.jsx
git commit -m "feat: add PageBanner component for inner page headers"
```

---

### Task 4: Update Navbar.jsx — replace anchors with NavLink

**Files:**
- Modify: `src/components/Navbar.jsx`

Replace the entire file. Key changes:
- Links array switches from `href` anchors to router `to` paths, and adds a Home entry
- Logo `<a>` → `<Link to="/">`
- Desktop nav `<a>` → `<NavLink>` with active gold underline via `border-b-2`
- "Get In Touch" button `<a>` → `<Link to="/contact">`
- Mobile menu `<a>` → `<NavLink>`, closes menu on click

- [ ] **Step 1: Replace Navbar.jsx**

```jsx
import { useState, useEffect } from 'react'
import { Link, NavLink } from 'react-router-dom'

const links = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Services', to: '/services' },
  { label: 'Partners', to: '/partners' },
  { label: 'Contact', to: '/contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-shadow duration-300 bg-white/97 backdrop-blur-md border-b border-navy/8 px-[5%] flex items-center justify-between h-[72px] ${
        scrolled ? 'shadow-[0_2px_24px_rgba(11,46,109,0.10)]' : ''
      }`}
    >
      {/* Logo */}
      <Link to="/" className="flex flex-col leading-none">
        <span className="text-[26px] font-extrabold text-navy tracking-[4px]">JUBA</span>
        <span className="text-[8px] font-semibold text-gold tracking-[3px] border-t border-b border-gold py-0.5 mt-0.5 uppercase">
          Consultants
        </span>
      </Link>

      {/* Desktop links */}
      <ul className="hidden md:flex gap-9 list-none items-center">
        {links.map((link) => (
          <li key={link.label}>
            <NavLink
              to={link.to}
              end={link.to === '/'}
              className={({ isActive }) =>
                `text-[13px] font-medium tracking-wide transition-colors duration-200 hover:text-navy pb-1 border-b-2 ${
                  isActive
                    ? 'text-navy border-gold'
                    : 'text-slate-500 border-transparent hover:border-gold/50'
                }`
              }
            >
              {link.label}
            </NavLink>
          </li>
        ))}
        <li>
          <Link
            to="/contact"
            className="bg-navy text-white text-[13px] font-bold px-5 py-2.5 rounded tracking-wide hover:bg-gold hover:text-navy transition-colors duration-200"
          >
            Get In Touch
          </Link>
        </li>
      </ul>

      {/* Mobile hamburger */}
      <button
        className="md:hidden flex flex-col gap-1.5 p-2"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle menu"
      >
        <span className={`block w-6 h-0.5 bg-navy transition-transform duration-200 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
        <span className={`block w-6 h-0.5 bg-navy transition-opacity duration-200 ${menuOpen ? 'opacity-0' : ''}`} />
        <span className={`block w-6 h-0.5 bg-navy transition-transform duration-200 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
      </button>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="absolute top-[72px] left-0 right-0 bg-white border-b border-navy/10 shadow-lg md:hidden px-[5%] py-6 flex flex-col gap-4">
          {links.map((link) => (
            <NavLink
              key={link.label}
              to={link.to}
              end={link.to === '/'}
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                `text-[15px] font-medium hover:text-navy ${
                  isActive ? 'text-navy font-semibold' : 'text-slate-600'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
          <Link to="/contact" onClick={() => setMenuOpen(false)} className="btn-navy w-fit">
            Get In Touch
          </Link>
        </div>
      )}
    </nav>
  )
}
```

- [ ] **Step 2: Lint check**

```bash
npm run lint
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/Navbar.jsx
git commit -m "feat: replace anchor tags with NavLink in Navbar, add active gold underline"
```

---

### Task 5: Update Footer.jsx — replace anchors with Link

**Files:**
- Modify: `src/components/Footer.jsx`

Replace the entire file. Key changes:
- Service links `<a href="#services">` → `<Link to="/services">`
- Company links computed from `#aboutus` style anchors → explicit `to` paths
- `tel:` and `mailto:` contact links stay as plain `<a>` (external protocols)

- [ ] **Step 1: Replace Footer.jsx**

```jsx
import { Link } from 'react-router-dom'
import { contact } from '../data/services'

const serviceLinks = [
  'Skills Audit', 'WSP & ATR', 'Employment Equity',
  'SETA Grants', 'B-BBEE Advisory', 'QCTO Accreditation',
]

const companyLinks = [
  { label: 'About Us', to: '/about' },
  { label: 'Our Partners', to: '/partners' },
  { label: 'Contact', to: '/contact' },
]

export default function Footer() {
  return (
    <footer className="bg-[#071d45] text-white pt-16 pb-8 px-[5%]">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
        {/* Brand */}
        <div className="lg:col-span-1">
          <div className="text-[24px] font-extrabold tracking-[4px] mb-1">JUBA</div>
          <div className="text-[8px] font-semibold text-gold tracking-[3px] border-t border-b border-gold py-0.5 inline-block mb-4 uppercase">
            Consultants
          </div>
          <p className="text-white/50 text-[13px] leading-relaxed mb-6">
            Empowering Excellence. Nurturing Potential. Your Gateway to Strategic HR Solutions and Professional Training.
          </p>
          <div className="flex gap-2">
            {['in', 'fb', 'tw'].map((s) => (
              <a
                key={s}
                href="#"
                className="w-9 h-9 bg-white/10 rounded flex items-center justify-center text-white/60 text-xs font-bold hover:bg-gold hover:text-navy transition-all duration-200"
              >
                {s}
              </a>
            ))}
          </div>
        </div>

        {/* Services */}
        <div>
          <p className="text-[11px] font-bold text-gold tracking-[2px] uppercase mb-5">Services</p>
          <ul className="flex flex-col gap-2.5">
            {serviceLinks.map((s) => (
              <li key={s}>
                <Link to="/services" className="text-white/50 text-[13px] hover:text-gold transition-colors duration-200">
                  {s}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Company */}
        <div>
          <p className="text-[11px] font-bold text-gold tracking-[2px] uppercase mb-5">Company</p>
          <ul className="flex flex-col gap-2.5">
            {companyLinks.map(({ label, to }) => (
              <li key={label}>
                <Link to={to} className="text-white/50 text-[13px] hover:text-gold transition-colors duration-200">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <p className="text-[11px] font-bold text-gold tracking-[2px] uppercase mb-5">Contact</p>
          <ul className="flex flex-col gap-2.5">
            <li><a href={`tel:${contact.phone}`} className="text-white/50 text-[13px] hover:text-gold transition-colors">{contact.phone}</a></li>
            <li><a href={`mailto:${contact.email}`} className="text-white/50 text-[13px] hover:text-gold transition-colors">{contact.email}</a></li>
            <li><span className="text-white/50 text-[13px]">{contact.address}</span></li>
            <li><a href="#" className="text-white/50 text-[13px] hover:text-gold transition-colors">{contact.website}</a></li>
          </ul>
        </div>
      </div>

      <div className="max-w-6xl mx-auto pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-2 text-[12px] text-white/35">
        <span>© {new Date().getFullYear()} Juba Consultants (Pty) Ltd. All rights reserved.</span>
        <span>Juba Skills Development Academy</span>
      </div>
    </footer>
  )
}
```

- [ ] **Step 2: Lint check**

```bash
npm run lint
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/Footer.jsx
git commit -m "feat: replace anchor tags with Link in Footer"
```

---

### Task 6: Update Hero.jsx and CTAStrip.jsx — replace anchor CTAs with Link

**Files:**
- Modify: `src/sections/Hero.jsx`
- Modify: `src/sections/CTAStrip.jsx`

- [ ] **Step 1: Update Hero.jsx CTA buttons**

In `src/sections/Hero.jsx`, add the import at the top:

```jsx
import { Link } from 'react-router-dom'
```

Replace the two CTA anchor tags (lines 37–38 in the original):

```jsx
<div className="flex gap-4 flex-wrap">
  <Link to="/services" className="btn-primary">Our Services</Link>
  <Link to="/contact" className="btn-outline">Contact Us</Link>
</div>
```

- [ ] **Step 2: Update CTAStrip.jsx**

In `src/sections/CTAStrip.jsx`, add the import at the top:

```jsx
import { Link } from 'react-router-dom'
```

Replace the anchor tag CTA button:

```jsx
<Link to="/contact" className="btn-primary whitespace-nowrap flex-shrink-0">
  Let's Grow Together
</Link>
```

- [ ] **Step 3: Lint check**

```bash
npm run lint
```

Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add src/sections/Hero.jsx src/sections/CTAStrip.jsx
git commit -m "feat: replace anchor CTAs with Link in Hero and CTAStrip"
```

---

### Task 7: Create src/pages/Home.jsx

**Files:**
- Create: `src/pages/Home.jsx`

The Home page is the Preview Hub: Hero → About teaser → Services preview (first 3 cards) → Partners → CTAStrip. The About teaser is new inline JSX that mirrors the About section's visual style. The Services preview reuses the same card markup as `src/sections/Services.jsx`.

- [ ] **Step 1: Create src/pages/Home.jsx**

```jsx
import { Link } from 'react-router-dom'
import Hero from '../sections/Hero'
import Partners from '../sections/Partners'
import CTAStrip from '../sections/CTAStrip'
import FadeUp from '../components/FadeUp'
import { services } from '../data/services'

export default function Home() {
  return (
    <>
      <Hero />

      {/* About teaser */}
      <section className="bg-[#f8f7f4] py-24 px-[5%]">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <FadeUp>
            <p className="section-label">About Us</p>
            <h2 className="section-title">Strengthening Organisations Through People</h2>
            <p className="text-slate-500 text-[15px] leading-relaxed mt-6 mb-8">
              Juba Skills Development Academy is a black female owned company providing comprehensive HR consultancy
              services and training across various domains. We serve government departments, private companies, and
              SMMEs — delivering solutions that are trusted, consistent, and impactful.
            </p>
            <Link to="/about" className="btn-navy">Learn More →</Link>
          </FadeUp>
          <FadeUp delay={150}>
            <div className="bg-navy rounded-xl p-11 text-white relative overflow-hidden">
              <div
                className="absolute bottom-0 right-0 w-28 h-20 bg-gold"
                style={{ clipPath: 'polygon(100% 0, 100% 100%, 0 100%)' }}
              />
              <div className="text-[64px] font-extrabold text-gold leading-none mb-2">100%</div>
              <p className="text-white/70 text-[14px] mb-8">Committed to your growth</p>
              <p className="text-[16px] italic font-light text-white/90 leading-relaxed">
                "Empowering Excellence. Nurturing Potential. Your Gateway to Strategic HR Solutions and Professional Training."
              </p>
              <p className="mt-5 text-[13px] font-bold text-gold tracking-wide">
                — Sinenhlanhla Khathi, Managing Director
              </p>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* Services preview — first 3 services */}
      <section className="bg-white py-24 px-[5%]">
        <div className="max-w-6xl mx-auto">
          <FadeUp>
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8 mb-14">
              <div>
                <p className="section-label">What We Do</p>
                <h2 className="section-title">Our Core Services</h2>
              </div>
              <Link to="/services" className="btn-navy whitespace-nowrap">View All Services →</Link>
            </div>
          </FadeUp>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.slice(0, 3).map((service, i) => (
              <FadeUp key={service.id} delay={i * 60}>
                <div className="group border border-navy/10 rounded-xl p-8 relative overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_32px_rgba(11,46,109,0.08)] hover:border-navy/20 bg-white h-full">
                  <span className="absolute top-0 left-0 w-full h-[3px] bg-gold scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100" />
                  <div className="w-12 h-12 bg-navy/6 rounded-xl flex items-center justify-center text-[22px] mb-5">
                    {service.icon}
                  </div>
                  <h3 className="text-[14px] font-bold text-navy uppercase tracking-wide leading-snug mb-3">
                    {service.name}
                  </h3>
                  <p className="text-[13px] text-slate-500 leading-relaxed">{service.description}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      <Partners />
      <CTAStrip />
    </>
  )
}
```

- [ ] **Step 2: Lint check**

```bash
npm run lint
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/pages/Home.jsx
git commit -m "feat: create Home page with Preview Hub layout"
```

---

### Task 8: Create inner page files (About, Services, Partners, Contact)

**Files:**
- Create: `src/pages/About.jsx`
- Create: `src/pages/Services.jsx`
- Create: `src/pages/Partners.jsx`
- Create: `src/pages/Contact.jsx`

Each page composes `<PageBanner>` + the matching existing section. The existing section components are reused unchanged.

- [ ] **Step 1: Create src/pages/About.jsx**

```jsx
import PageBanner from '../components/PageBanner'
import About from '../sections/About'

export default function AboutPage() {
  return (
    <>
      <PageBanner label="Who We Are" title="About Us" />
      <About />
    </>
  )
}
```

- [ ] **Step 2: Create src/pages/Services.jsx**

```jsx
import PageBanner from '../components/PageBanner'
import Services from '../sections/Services'

export default function ServicesPage() {
  return (
    <>
      <PageBanner label="What We Do" title="Our Services" />
      <Services />
    </>
  )
}
```

- [ ] **Step 3: Create src/pages/Partners.jsx**

```jsx
import PageBanner from '../components/PageBanner'
import Partners from '../sections/Partners'

export default function PartnersPage() {
  return (
    <>
      <PageBanner label="Who We Serve" title="Our Partners" />
      <Partners />
    </>
  )
}
```

- [ ] **Step 4: Create src/pages/Contact.jsx**

```jsx
import PageBanner from '../components/PageBanner'
import Contact from '../sections/Contact'

export default function ContactPage() {
  return (
    <>
      <PageBanner label="Get In Touch" title="Contact Us" />
      <Contact />
    </>
  )
}
```

- [ ] **Step 5: Lint check**

```bash
npm run lint
```

Expected: no errors.

- [ ] **Step 6: Commit**

```bash
git add src/pages/About.jsx src/pages/Services.jsx src/pages/Partners.jsx src/pages/Contact.jsx
git commit -m "feat: create About, Services, Partners, Contact page components"
```

---

### Task 9: Rewrite App.jsx as the router config

**Files:**
- Modify: `src/App.jsx`

Replace the entire file. The old section-composition is gone; routing takes over.

- [ ] **Step 1: Replace App.jsx**

```jsx
import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import AboutPage from './pages/About'
import ServicesPage from './pages/Services'
import PartnersPage from './pages/Partners'
import ContactPage from './pages/Contact'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="services" element={<ServicesPage />} />
        <Route path="partners" element={<PartnersPage />} />
        <Route path="contact" element={<ContactPage />} />
      </Route>
    </Routes>
  )
}
```

- [ ] **Step 2: Lint check**

```bash
npm run lint
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/App.jsx
git commit -m "feat: rewrite App.jsx as React Router v6 layout route config"
```

---

### Task 10: Verify in the dev server

**Files:** none

- [ ] **Step 1: Start the dev server**

```bash
npm run dev
```

Open http://localhost:5173 in a browser.

- [ ] **Step 2: Check each route manually**

Visit each URL and confirm:

| URL | Expected |
|---|---|
| `/` | Home — Hero, About teaser, 3 service cards, Partners, CTA strip |
| `/about` | Gold banner "Who We Are / About Us" + full About section |
| `/services` | Gold banner "What We Do / Our Services" + full service grid |
| `/partners` | Gold banner "Who We Serve / Our Partners" + partners cards |
| `/contact` | Gold banner "Get In Touch / Contact Us" + contact details + form |

- [ ] **Step 3: Check Navbar active state**

On each page, confirm the matching nav link shows a gold underline and navy text.

- [ ] **Step 4: Check mobile menu**

Resize browser to mobile width. Open the hamburger menu, tap a link — confirm it navigates and the menu closes.

- [ ] **Step 5: Final lint**

```bash
npm run lint
```

Expected: no errors.

- [ ] **Step 6: (If deploying to Netlify) Add SPA rewrite rule**

Create `public/_redirects` so that direct URL visits and browser refreshes are handled by the React app:

```
/*    /index.html   200
```

For Vercel, create `vercel.json` at the project root instead:

```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

Commit whichever applies:

```bash
git add public/_redirects
git commit -m "feat: add Netlify SPA rewrite rule"
```
