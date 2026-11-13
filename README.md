# mauroiman.com

Portfolio of Mauro Imán. Astro static site, deployed to GitHub Pages by `.github/workflows/deploy.yml` on every push to `main`.

## Editing content

All content lives in two places, English and Spanish side by side:

- `src/content/site.yaml` — home and shared copy, email, LinkedIn, teams list, archive list.
- `src/content/cases/<slug>.yaml` — one file per case study (title, facts, metrics, story, workstreams, reflection).

Text in `[brackets]` is still a placeholder. Values that contain `: ` must be in quotes.

## Commands

```bash
npm install      # once
npm run dev      # local preview at http://localhost:4321/portfolio/
npm run build    # static site in dist/
```

Design decisions and the changelog are in `DESIGN.md`. The design explorations stay in `explorations/`.
