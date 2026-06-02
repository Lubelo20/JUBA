# Multipage Website Design

**Date:** 2026-06-03
**Status:** Approved

## Overview

Convert the existing single-scroll-page site into a 5-page website using React Router v6 (already installed). All existing section components are reused — only routing, the Navbar, and page-level composition change.

## Pages & Routes

| Path | Page | Content |
|---|---|---|
| `/` | Home | Hero + About teaser + Services preview (3 cards) + Partners + CTAStrip |
| `/about` | About | PageBanner + existing `<About />` section |
| `/services` | Services | PageBanner + existing `<Services />` section |
| `/partners` | Partners | PageBanner + existing `<Partners />` section |
| `/contact` | Contact | PageBanner + existing `<Contact />` section (details only, no form) |

## Architecture

### Routing

`App.jsx` becomes the router config. A single layout route with `element={<Layout />}` wraps all 5 page routes as children. `<BrowserRouter>` moves to `main.jsx`.

```
<BrowserRouter>           ← main.jsx
  <Routes>                ← App.jsx
    <Route element={<Layout />}>
      <Route index element={<Home />} />
      <Route path="about" element={<About />} />
      <Route path="services" element={<Services />} />
      <Route path="partners" element={<Partners />} />
      <Route path="contact" element={<Contact />} />
    </Route>
  </Routes>
</BrowserRouter>
```

### File Changes

**New files:**
- `src/components/Layout.jsx` — renders Navbar + `<Outlet>` + Footer
- `src/components/PageBanner.jsx` — reusable gold-accent inner page header
- `src/pages/Home.jsx` — Preview Hub page
- `src/pages/About.jsx`
- `src/pages/Services.jsx`
- `src/pages/Partners.jsx`
- `src/pages/Contact.jsx`

**Modified files:**
- `src/main.jsx` — add `<BrowserRouter>` wrapper
- `src/App.jsx` — replace section composition with `<Routes>` config
- `src/components/Navbar.jsx` — replace `react-scroll` Links with `react-router-dom` `<NavLink>`

**Unchanged:**
- All files in `src/sections/` — reused by page components as-is
- `src/data/services.js` — data source unchanged
- `src/hooks/useInView.js`, `src/components/FadeUp.jsx` — animations unchanged

### PageBanner Component

Props: `label: string`, `title: string`

Renders a white block with a 4px gold left border, the label in small gold uppercase (reuses `.section-label` styles), and the title in navy bold (reuses `.section-title`). Sits between the Navbar and the page's main section content.

### Home Page (Preview Hub)

Composed entirely inside `src/pages/Home.jsx`:

1. `<Hero />` — existing, unchanged
2. **About teaser** — inline JSX block: 2 sentences of existing copy + `<Link to="/about">` "Learn More →"
3. **Services preview** — inline JSX: first 3 items from `services[]` rendered as cards + `<Link to="/services">` "View All Services →"
4. `<Partners />` — existing section, reused as-is (already compact)
5. `<CTAStrip />` — existing, unchanged

### Navbar

- Replace `react-scroll` `<Link>` with `react-router-dom` `<NavLink>` in both the desktop nav and the mobile menu
- Use `NavLink`'s `className` callback with `isActive` to apply a gold underline to the active page link
- Mobile menu should close (`setMenuOpen(false)`) on link click, since navigation now changes the route rather than scrolling
- Nav items: Home · About · Services · Partners · Contact

## Constraints

- No contact form — Contact page shows address, phone, email, and director name only
- No new npm dependencies — `react-router-dom` v6 is already installed
- All existing scroll animations (`FadeUp`, `useInView`) remain intact on inner pages
- Vite dev server handles SPA routing in development; production deployment (Vercel/Netlify) needs a `_redirects` or `vercel.json` rewrite rule for client-side routing fallback
