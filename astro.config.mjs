import { defineConfig } from 'astro/config';

/* GitHub Pages. Until mauroiman.com points here the site lives at mauro-iman.github.io/portfolio/.
   When the domain moves: set SITE_URL=https://mauroiman.com and BASE_PATH=/ in the deploy workflow
   and add public/CNAME (see DESIGN.md › Hosting). */
const site = process.env.SITE_URL || 'https://mauro-iman.github.io';
const base = process.env.BASE_PATH || '/portfolio';

export default defineConfig({
  site,
  base,
  trailingSlash: 'always',
  build: { format: 'directory' },
  /* Old WordPress URLs keep working once the site is served from the root domain. */
  redirects: base === '/' ? {
    '/portfolio/': '/#work',
    '/portfolio/compass/': '/work/compass/',
    '/portfolio/silstech-ypf/': '/work/silstech-ypf/',
    '/portfolio/statlink/': '/work/statlink/',
    '/portfolio/fintek/': '/work/fintek/',
    '/portfolio/fintek-services/': '/work/fintek/',
    '/portfolio/mi-porhtal-holcim/': '/work/holcim-mi-porhtal/',
    '/portfolio/healthcare-inc/': '/work/healthcare-inc/',
    '/portfolio/viaje-perfecto/': '/work/viaje-perfecto/',
    '/portfolio/rf-solutions-ltd/': '/work/rf-solutions/',
    '/portfolio/3xm-group/': '/work/3xm-group/'
  } : {}
});
