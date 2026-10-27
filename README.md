# Harsh Rajput — Frontend Portfolio

Personal portfolio built with **Next.js 15 (App Router), TypeScript and Tailwind CSS v4** — no UI or animation libraries.

## Features

- Light / dark theme that follows the system, with a toggle and no flash on load
- **⌘K / Ctrl K command palette** — jump to any section or project, copy email, download resume, switch theme (full keyboard support, ARIA combobox/listbox)
- Filterable project grid with real screenshots, plus a featured case study
- Sticky nav with active-section highlighting and a scroll progress bar
- Scroll-reveal animations that respect `prefers-reduced-motion` and never leave content hidden
- Accessibility basics: skip link, visible focus rings, semantic landmarks, labelled icon buttons
- Static export (`out/`), ~111 kB first-load JS

## Edit content

Everything — profile, projects, experience, skills — lives in [`data/content.ts`](data/content.ts). Screenshots go in `public/shots/` (16:10 WebP works best). The resume served by the site is `public/resume-harsh.pdf`.

## Run locally

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # static site in ./out
```

## Deploy (Vercel)

1. Push this folder to a new GitHub repo.
2. Import it at vercel.com/new — framework preset **Next.js**, no settings to change.
3. Point your custom domain (optional) and update the portfolio link on your resume.
