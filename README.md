# Keerthan Karumudi — Personal Site

A 5-page personal website built with Vite, React, TypeScript, Tailwind CSS v4, Framer Motion, and React Router.

## Stack

- Vite + React + TypeScript
- Tailwind CSS v4 (via `@tailwindcss/vite`, CSS-first `@theme` config in `src/index.css` — no `tailwind.config.ts`)
- Framer Motion (waveform draw-on-load, scroll reveals, magnetic buttons, card hover)
- React Router (`BrowserRouter`, clean URLs)
- Self-hosted fonts via Fontsource (Space Grotesk, Inter, Source Serif 4 italic)

## Local development

```
npm install
npm run dev
```

Visit the printed `http://localhost:5173/Keerthans-Portfolio/` URL (the `/Keerthans-Portfolio/` prefix comes from `base` in `vite.config.ts`, matching this repo's GitHub Pages project-page URL).

## Production build

```
npm run build
npm run preview
```

`npm run build` type-checks (`tsc -b`) and outputs to `dist/`. `npm run preview` serves that build locally so you can sanity-check it before deploying.

## Deploying to GitHub Pages

This repo deploys via the GitHub Actions workflow at `.github/workflows/deploy.yml` (build → upload → `actions/deploy-pages`).

**One-time setup:** in the repo's GitHub Settings → Pages, set **Source** to **"GitHub Actions"**. After that, every push to `main` builds and deploys automatically.

The site will be live at `https://githubneos.github.io/Keerthans-Portfolio/`.

### If you rename the repo to `Githubneos.github.io`

That gives you a root user-page deploy instead of a project-page one. If you do this, update:
1. `vite.config.ts` — change `base: '/Keerthans-Portfolio/'` to `base: '/'`
2. `public/404.html` — change `pathSegmentsToKeep` from `1` to `0`

(`src/main.tsx`'s router `basename` reads `import.meta.env.BASE_URL` automatically, so it doesn't need a manual change.)

### Why there's a `public/404.html`

GitHub Pages is a static host with no server-side routing, so a direct visit to e.g. `/Keerthans-Portfolio/writing` (not via in-app navigation) would normally 404. `public/404.html` + the decode script in `index.html`'s `<head>` implement the standard [`spa-github-pages`](https://github.com/rafgraph/spa-github-pages) redirect trick so React Router's clean URLs work correctly on the static host.

## Placeholder content checklist

Every page below uses clearly-marked placeholder text instead of invented facts. Replace all of the following before publishing:

### Home (`src/pages/Home.tsx`)
- [ ] "What I do" paragraph — replace with your real summary

### About (`src/pages/About.tsx`)
- [x] Bio paragraphs set to real content (career path, Foliotrend + project accomplishments, Skeptical Optimist/Substack motivation, outside interests), sourced from your resume + LinkedIn
- [x] Sidebar facts (Based in, Focus, Also building, Writing, Open to) set to real values
- [ ] Revisit if your focus areas, current projects, or availability change

### Work (`src/pages/Work.tsx`)
- [x] Experience entries set to real work history (Ari Tech Consulting, Foliotrend, Optix - Robotics Club), sourced from your resume
- [x] Independent projects (Chaintrace, ride-match-, MatchWeek, Drinks and Drift) set to real descriptions from each repo's README, linking to their real public GitHub repos in `src/lib/links.ts` (`PROJECT_REPOS`)
- [ ] Add or remove experience/project entries as your work history changes

### Writing (`src/pages/Writing.tsx`)
- [ ] Featured essay #1 — real title + one-line hook + link
- [ ] Featured essay #2 — real title + one-line hook + link
- [ ] The "Read the archive" / "Subscribe" buttons both point at the same Substack URL — refine once you have real per-post deep-link URLs

### Contact (`src/pages/Contact.tsx`)
- [x] Email, LinkedIn, GitHub, Instagram, X, Substack set to real values in `src/lib/links.ts`
- [ ] Wire up the contact form to [Formspree](https://formspree.io) (see the comment above the `<form>` in `src/pages/Contact.tsx`) — takes about 5 minutes. The "Email" row in the social list already works via a real `mailto:` link; the form itself is still a static placeholder until this is done

### General
- [ ] Update the copyright year if publishing after 2026 (it's dynamic — `src/components/Footer.tsx` — so this is automatic)
- [ ] Double-check all social links resolve to the correct profiles
