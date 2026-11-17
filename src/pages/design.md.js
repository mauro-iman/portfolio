/* Publishes the repo's DESIGN.md at /design.md (the footer's "Download the design system" link),
   so the downloadable file is always the same one the site is built from. */
import md from '../../DESIGN.md?raw';

export const GET = () => new Response(md, { headers: { 'Content-Type': 'text/markdown; charset=utf-8' } });
