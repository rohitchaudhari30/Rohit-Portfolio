# Developer Portfolio

A production-architecture personal portfolio built with React, TypeScript, Vite, Tailwind CSS, and Framer Motion. All content is data-driven — you edit files in `src/data/`, not the UI components.

> **Note on this build:** this codebase was written without network access, so `npm install` / `npm run build` / `npm run lint` have not been run or verified in this environment. Run them locally as your first step (below) and fix anything that surfaces — the code follows standard, current APIs for this stack, but you should treat the first local build as your verification step, not a formality.

## 1. Setup

```bash
npm install
npm run dev
```

Visit the printed local URL. `npm run build` produces a production build in `dist/`; `npm run lint` runs ESLint.

## 2. Replace your personal information

Everything lives in `src/data/`:

| File | Controls |
|---|---|
| `personal.ts` | Name, title, bio, email, location, profile photo, resume path, stats |
| `socialLinks.ts` | GitHub / LinkedIn / other profile links |
| `navigation.ts` | Nav bar items |
| `highlights.ts` | The compact "Professional Highlights" cards |
| `skills.ts` | Categorized technical skills |
| `experience.ts` | Work history timeline |
| `education.ts` | Education entries |
| `location.ts` | City-level location + map center (keep this city-level, not a home address) |
| `projects.ts` | Your project case studies (see below) |

Every placeholder is marked with a `// REPLACE` comment. Search the `src/data/` folder for `REPLACE` to find everything that needs your real content.

Add your photo and resume to `public/assets/` (see `public/assets/README.md`), matching the paths set in `personal.ts`.

## 3. Add a new project

1. Open `src/data/projects.ts`.
2. Copy one of the existing project objects.
3. Give it a unique `id` and `slug` — the slug becomes the URL: `/projects/<slug>`.
4. Fill in whichever fields you have real content for. Every optional field (architecture, challenges, results, etc.) is handled gracefully if you leave it out — the case-study page simply skips that section instead of showing an empty heading.
5. The card automatically appears in the homepage grid and respects the category filters.

## 4. Add project screenshots

- Create `public/assets/projects/<slug>/` and drop your images there.
- Set `coverImage` to the card image (e.g. `/assets/projects/<slug>/cover.jpg`).
- Set `galleryImages` to an array of `{ src, alt, caption? }` for the case-study gallery/lightbox.
- No screenshots yet? Leave both fields unset — the project card shows a clean "screenshot pending" placeholder and the gallery section hides itself automatically.

## 5. Update your resume

Add `resume.pdf` to `public/assets/` and confirm `personal.resumeUrl` in `src/data/personal.ts` points to it (default: `/assets/resume.pdf`). The Resume section and header CTA both use this same value, and hide the download/view buttons automatically if it isn't set.

## 6. Configure the contact form

This project ships without a backend. The form is wired to call any service that accepts a JSON `POST` and returns a 2xx response:

1. Create an account with a form service such as [Formspree](https://formspree.io) or [Getform](https://getform.io) (or write your own small serverless endpoint).
2. Copy `.env.example` to `.env` and set:
   ```
   VITE_CONTACT_FORM_ENDPOINT=https://formspree.io/f/your-form-id
   ```
3. Restart `npm run dev`. Until this is set, submitting the form will show a clear inline error rather than silently doing nothing.

## 7. Theme system

The palette isn't hardcoded — every color is a CSS variable defined per-theme in `src/styles/themes.css`, and Tailwind's color tokens (`ink-*`, `paper-*`, `signal*`) read from those variables. A sun/moon icon button in the navbar (desktop and mobile) switches between the two themes:

- **Ink & Amber** (default) — dark, terminal-inspired amber accent
- **Porcelain** — light theme with a warm off-white background

The choice is stored in `localStorage` and applied via a `data-theme` attribute on `<html>`, with an inline script in `index.html` that applies it before first paint (no flash of the wrong theme). To add another theme: add one `[data-theme="id"]` block to `themes.css` and one entry to the `themes` array in `src/context/ThemeContext.tsx` — note the toggle button assumes exactly two themes (it flips between them); with three or more you'd want to swap it back for a small picker menu.

## 8. Location map

`src/components/sections/MapView.tsx` renders a real interactive Leaflet map (no API key required — tiles come from CARTO's free basemap service) rather than a static embed. It automatically switches to light or dark map tiles based on the active theme, uses a custom-styled marker (no default-Leaflet-icon asset issues), and its zoom controls/popups are restyled to match the design system instead of showing default browser-chrome-style controls. Coordinates come from `src/data/location.ts` — keep them city-level.

## 9. Deployment

Any static host works since this is a Vite SPA:

- **Vercel / Netlify**: connect the repo, build command `npm run build`, output directory `dist`. Add a rewrite/redirect rule so all paths serve `index.html` (needed for React Router's client-side routes like `/projects/:slug`). On Netlify, add a `public/_redirects` file containing `/*  /index.html  200`. On Vercel, this is handled automatically for SPAs, or add a `vercel.json` rewrite if needed.
- **GitHub Pages**: requires additional SPA-routing configuration (a 404.html fallback) since GitHub Pages doesn't support server-side rewrites natively.

Before deploying, update:
- `index.html` — `<title>`, meta description, Open Graph/Twitter tags, canonical URL, and the Person JSON-LD block.
- `public/robots.txt` and `public/sitemap.xml` — replace `example.com` with your real domain, and add an entry per project slug.

## 10. Project structure

```
src/
  assets/            static images used directly by components (rare — prefer public/assets)
  components/
    common/           Icon, SocialLinks, BackToTop
    layout/           Footer
    navigation/       Navbar, MobileMenu
    sections/         Hero, About, Highlights, Projects, Skills, Experience, Education, Resume, Location, Contact
    projects/         ProjectCard, ProjectGallery, ImageLightbox, CaseStudySection
    ui/               Container, Button, LinkButton, Badge, SectionHeading
  data/               all editable content — see table above
  hooks/              useActiveSection, useContactForm
  layouts/            RootLayout
  pages/              HomePage, ProjectDetailPage, NotFoundPage
  types/              Project, PersonalInfo, and related shared types
```

## 11. Design system

- **Palette**: deep ink-navy background (`ink-950`/`900`/`800`), warm white text (`paper-100`), muted slate secondary text (`paper-400`), and a single amber/brass accent (`signal`) — a restrained nod to terminal/data-pipeline aesthetics that fits the data/AI engineering positioning, rather than a generic dark theme.
- **Type**: Space Grotesk (display), Inter (body), IBM Plex Mono (labels, eyebrows, metadata) — loaded via Google Fonts in `index.html`.
- **Motion**: Framer Motion is used for entrance/scroll reveals only; `prefers-reduced-motion` is respected globally in `src/index.css`.

## 12. Before going live — checklist

- [ ] Replace every `// REPLACE` marker in `src/data/`
- [ ] Add real project screenshots or confirm placeholders look acceptable
- [x] Add profile photo and resume PDF (done — `public/assets/profile.jpg` and `public/assets/resume.pdf`)
- [ ] Configure `VITE_CONTACT_FORM_ENDPOINT`
- [ ] Update SEO tags in `index.html`, `robots.txt`, `sitemap.xml`
- [ ] Run `npm run build` and `npm run lint` locally and fix any errors
- [ ] Test keyboard navigation, mobile menu, and the project filters
- [ ] Check the site at 320px, 375px, 768px, 1024px, and 1440px widths
