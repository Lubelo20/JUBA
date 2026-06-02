# Juba Consultants Website

A modern, production-ready website for **Juba Consultants** built with React + Vite + Tailwind CSS.

## Tech Stack

| Tool | Purpose |
|------|---------|
| [React 18](https://react.dev/) | UI framework |
| [Vite 5](https://vitejs.dev/) | Build tool & dev server |
| [Tailwind CSS 3](https://tailwindcss.com/) | Utility-first styling |
| [Lucide React](https://lucide.dev/) | Icon library |
| [React Router v6](https://reactrouter.com/) | Client-side routing |

## Brand Colours

| Name | Hex |
|------|-----|
| Navy | `#0B2E6D` |
| Navy Dark | `#071d45` |
| Gold | `#C9A34E` |
| Gold Light | `#dbb96a` |

Font: **Poppins** (300, 400, 500, 600, 700, 800)

## Project Structure

```
juba-consultants/
├── public/
│   └── favicon.svg
├── src/
│   ├── assets/          # Images, logos, brand assets
│   ├── components/
│   │   ├── Navbar.jsx   # Fixed navigation with mobile menu
│   │   ├── Footer.jsx   # Footer with links
│   │   └── FadeUp.jsx   # Scroll-triggered fade animation
│   ├── data/
│   │   └── services.js  # All site content / data
│   ├── hooks/
│   │   └── useInView.js # IntersectionObserver hook
│   ├── sections/
│   │   ├── Hero.jsx
│   │   ├── About.jsx
│   │   ├── Services.jsx
│   │   ├── Partners.jsx
│   │   ├── CTAStrip.jsx
│   │   └── Contact.jsx
│   ├── App.jsx
│   ├── index.css        # Tailwind directives + custom components
│   └── main.jsx
├── .eslintrc.cjs
├── .gitignore
├── .vscode/
│   ├── extensions.json  # Recommended VS Code extensions
│   └── settings.json    # Editor settings
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.js
└── vite.config.js
```

## Getting Started

### 1. Install dependencies
```bash
npm install
```

### 2. Run development server
```bash
npm run dev
```
Opens at [http://localhost:5173](http://localhost:5173)

### 3. Build for production
```bash
npm run build
```

### 4. Preview production build
```bash
npm run preview
```

## Deployment

### Vercel (recommended)
```bash
npm i -g vercel
vercel
```

### Netlify
```bash
npm run build
# Drag & drop the `dist/` folder to Netlify
```

### Railway
Connect your GitHub repo and set:
- Build Command: `npm run build`
- Output Directory: `dist`

## Customisation Guide

### Update contact info
Edit `src/data/services.js` → `contact` object

### Add/edit services
Edit `src/data/services.js` → `services` array

### Brand colours
Edit `tailwind.config.js` → `theme.extend.colors`

### Add pages (e.g. About page, Blog)
1. Create `src/pages/About.jsx`
2. Add route in `src/App.jsx` using `<BrowserRouter>` + `<Routes>`

## TODO / Next Steps

- [ ] Add real team photos to `src/assets/`
- [ ] Wire contact form to email service (EmailJS / Resend / your backend)
- [ ] Add CMS integration for services content
- [ ] Add Google Analytics / Meta Pixel
- [ ] Add WhatsApp floating button
- [ ] Create dedicated Service detail pages
- [ ] Add testimonials section
- [ ] SEO: add sitemap.xml and robots.txt
