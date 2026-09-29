# The KariGhars — Premium Scroll Website (GitHub Pages Ready)

Production rebuild of https://www.thekarighars.com/ as a premium scroll-based experience.

## Stack
- Vite + React 19 + Tailwind CSS v4 + Framer Motion + Lenis + React Router (HashRouter for GH Pages)
- All content + 28 images from existing site stored locally in `public/images/`
- Frontend-only lead form → opens WhatsApp with prefilled enquiry (no backend needed)

## Pages (all content preserved)
- `/` Home — 8-slide fullscreen hero, stats, intro, quote form, 9 services, 3 property types, 8 projects, why-choose, packages, process, press + awards, reviews, 10 FAQs
- `/portfolio` `/gallery` `/about` `/contact` `/videos` `/client-lens` `/experience-center` `/news-media` `/blog`

## Scroll / animation system
- `ScrollScene` — each section has full-bleed background image with parallax `y` + `scale` via `useScroll`, overlay crossfade
- Hero auto-rotates every 5s with crossfade + scale
- `Reveal` — fade-up on scroll, `Counter` — animated stats, Lenis smooth scroll

## Run
```bash
npm install
npm run dev
npm run build
npm run preview
```

## Deploy to GitHub Pages (2 options)
1. **Auto (recommended):** push to `main` — `.github/workflows/deploy.yml` builds `dist/` and deploys via Pages. Enable: Repo Settings → Pages → Source: GitHub Actions.
2. **Manual:** `npm run build` → publish `dist/` (contains `index.html`, `404.html`, `.nojekyll`, `assets/`, `images/`).

Base is `./` + HashRouter, so it works on user pages (`user.github.io/`) and project pages (`user.github.io/repo/`) with no config change.
