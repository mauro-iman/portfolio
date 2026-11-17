# SITE.md — mauroiman.com

How the site is built and what it contains: pages, content, build, hosting and the changelog. The design system itself (brand, tokens, components, motion) is in `DESIGN.md`, which is also published at mauroiman.com/design.md. Positioning decisions are in `POSITIONING.md`.

## Working agreement

1. **Read `DESIGN.md` and this file before every iteration.** Tokens, type, grid, spacing, components and copy come from them, never from memory or an older exploration.
2. **Write every decision back in the same iteration:** system decisions (brand, tokens, components, motion, accessibility) in `DESIGN.md`; pages, content, build and hosting here; positioning in `POSITIONING.md`. Add a line to the Changelog below, and to "Changes to the system" in `DESIGN.md` when the system changes.
3. Keep `DESIGN.md` portable: no site build details, content status or positioning in it, since anyone can download it.
4. If code and these files disagree, these files win. Fix the code or update the file on purpose.
5. Content lives in `src/content/*.yaml` (EN and ES side by side). The copy deck below is the original reference; the YAML is current.
6. Placeholders are written in square brackets, e.g. `[availability]`, and never presented as real data.

## Page: Home

Order and behavior. The home is the map of the site: every section links deeper.

| # | Section | Field | Desktop layout | Mobile layout |
|---|---|---|---|---|
| 1 | Hero | Full + flow | Field fills the first viewport (min-height 640px, up to 920px; it is a minimum, never a fixed height, so short windows grow the hero instead of clipping the gloss; top padding clamp(56px, 9vh, 112px)). Gloss and H1 in columns 1–9, bottom-left; lead in 1–7; CTAs below; meta row (location, availability) at the bottom right. | Field fills ~78svh. Same order, full width. Touch moves the magnet; scrolling aligns the filings. |
| 2 | Selected work | Medium (index field behind the section header only) | Label in 1–3, H2 in 4–12. One featured card (columns 1–12, image 16:10) then two cards (6 + 6). Archive list below in 4–12. | Cards stacked full width, images 4:3. Archive list full width. |
| 3 | Highlights band | Ordered | Full-width stage inside the wrap, ~360px tall. | Same, ~420px tall, stacked. |
| 4 | Capabilities | Off | Label 1–3, statement H2 4–12, three columns below in 4–12. | Stacked. |
| 5 | Teams | Off | Label 1–3, list in 4–12. | Full width, wraps. |
| 6 | About teaser | Off | Portrait in 1–4, text in 6–12. | Portrait first (max 320px), text below. |
| 7 | Closing CTA | Ferrofluid | Full-width stage, ~520px. | ~480px, smaller spikes. |
| 8 | Footer | At rest | As in Components. | Columns become two, then one. |

## Page: Case study

First case built: **Compass** (`case.html`). Same header, footer, tab bar, settings, language stream and magnetic scroll as the home (shared `site.css` + `site.js`; each page only holds its own content). The header marks **Work** as current. Order:

| # | Section | Field | Layout | Notes |
|---|---|---|---|---|
| 1 | Intro + assembly | Full on load, then medium | Back link "← All work", label (sector · year), H1 in columns 1–9, lead in 1–7, facts row (Role, Scope, Team, Timeline) as a 4-column `dl`. | **Assembly:** filings fly in, left to right, from the field the home handed off (or scattered on a direct visit) and line up into the title (~2.3 s: field, then pull; see Motion › Opening a case), the real H1 fades in and the filings dissolve into the background field. The H1 is real text from the start (hidden only visually while it assembles). Reduced motion: no assembly. |
| 2 | Cover | Subtle (film on hover) | Full width (columns 1–12), 16:10 mat with the cover and the structure film. | Rises in 3D on first view (perspective 1200px, rotateX 14° → 0, 900 ms). |
| 3 | At a glance | Off | Label 1–3; three metrics 4–12 (tabular, `--s-4`), then three one-line answers: problem, what I did, result. | The recruiter's 60 seconds inside the page. |
| 4 | Chapters | Medium, scroll-driven | Sticky field panel in columns 1–6 (top band on mobile), chapters in 7–12 with a sticky rail (01 Problem, 02 Decision, 03 Result). | Field goes scattered → attracted → aligned with page scroll. Each chapter ends with one data point. Rail buttons use the magnetic scroll. |
| 5 | What I did | Off | Label 1–3; three workstreams in 4–12, each with H3, paragraph and an image mat with caption. | Reading zone: type, grid and images only. |
| 6 | System demo | Off (the demo is the visual) | Label 1–3; interactive mock in 4–12. | "A system that absorbs new brands": three brand chips re-skin the same UI; the tilde snaps to the active chip. Respects reduced motion. |
| 7 | Reflection | Off | Large quote in 2–11, small "What I'd do next" below. | |
| 8 | Next case | Medium, follows the cursor | Full-width panel link: label "Next case", title, one line, arrow. | The field leans toward the pointer; the whole panel is one link. |
| 9 | Closing CTA + footer | As on the home | Same components. | One CTA per page. |

- Case covers on the home link to their case page; cases not built yet stay as placeholders.
- Built cases: **Compass** (`case.html`) and **Silstech · YPF** (`ypf.html`). Every case uses the same layout and keys; a small copy file per case (`ypf.js`) overrides the Compass copy. Sections a case doesn't need are left out of its HTML (YPF has no system demo) and the script skips them. Next case links form a loop: Compass → YPF → Compass (StatLink still a placeholder).
- **Long titles:** the H1 may wrap (YPF wraps to two lines on desktop at 13vw). The assembly reads the real line breaks and assembles every line; the magnet's poles sit at the two ends of the widest line, centered on the block, and lines below start 120 ms later.
- Language choice persists across pages (`mi-lang`), like theme and Field.
- Chapter and workstream copy is a **draft written from the home copy**; facts, numbers and details in [brackets] must come from Mauro.

## Copy deck

Placeholders in brackets must be replaced before launch.

| Key | EN (default) | ES |
|---|---|---|
| nav.work | Work | Trabajo |
| nav.highlights | Highlights | Highlights |
| nav.about | About | Sobre mí |
| nav.contact | Contact | Contacto |
| tab.home | Home | Inicio |
| tab.60 | 60 s | 60 s |
| hero.gloss | imán /iˈman/ — Spanish for *magnet* | imán /iˈman/ — lo que atrae |
| hero.h1 | I design products people are drawn to. | Diseño productos que atraen. |
| hero.lead | Product designer who builds. I turn complex operations into products people trust, from 0→1 platforms to design systems at scale. | Diseñador de producto que también construye. Convierto operaciones complejas en productos confiables, desde plataformas 0→1 hasta design systems a escala. |
| hero.cta1 | See selected work | Ver trabajos |
| hero.cta2 | Short on time? 60 s | ¿Poco tiempo? 60 s |
| hero.loc | Buenos Aires · Working worldwide | Buenos Aires · Trabajo en todo el mundo |
| hero.avail | [Availability] | [Disponibilidad] |
| work.label | Selected work | Trabajos seleccionados |
| work.h2 | Three products, three different kinds of hard. | Tres productos, tres tipos de desafío. |
| case.compass.t | Compass | Compass |
| case.compass.s | Design at the scale of a $17B company built on acquisitions: compliance operations, CRM research and a design system that absorbs new brands. | Diseño a la escala de una empresa de USD 17B que crece por adquisiciones: operaciones de compliance, research de CRM y un design system que absorbe marcas nuevas. |
| case.ypf.t | Silstech · YPF | Silstech · YPF |
| case.ypf.s | A national logistics and safety platform, designed from zero for Argentina's leading energy company and its carriers. | Una plataforma nacional de logística y seguridad, diseñada desde cero para la principal energética de Argentina y sus transportistas. |
| case.statlink.t | StatLink | StatLink |
| case.statlink.s | The information architecture pivot that reshaped a platform for coaches, players and scouts. | El pivot de arquitectura de información que transformó una plataforma para entrenadores, jugadores y scouts. |
| case.read | Read the case | Leer el caso |
| work.all | View all work | Ver todos los trabajos |
| hl.h | Recruiter, founder or just busy? | ¿Recruiter, founder o con poco tiempo? |
| hl.btn | Show me Mauro's highlights | Mostrame los highlights de Mauro |
| cap.label | What I do | Qué hago |
| cap.h2 | Strategy, design and code in one person. | Estrategia, diseño y código en una sola persona. |
| cap.sub | Fewer handoffs, faster decisions, products that ship as designed. | Menos traspasos, decisiones más rápidas y productos que salen como se diseñaron. |
| cap.1.t | Product strategy | Estrategia de producto |
| cap.1.p | Research, discovery and the hard prioritization calls that turn a vague goal into a plan. | Research, discovery y las decisiones de prioridad que convierten un objetivo difuso en un plan. |
| cap.2.t | Product & systems design | Diseño de producto y sistemas |
| cap.2.p | Flows, interfaces and design systems for complex, data-heavy operations. | Flujos, interfaces y design systems para operaciones complejas y con muchos datos. |
| cap.3.t | Front-end build | Desarrollo front-end |
| cap.3.p | Production UI and high-fidelity prototypes, so the product ships the way it was designed. | UI de producción y prototipos de alta fidelidad, para que el producto salga como se diseñó. |
| teams.label | Teams I've designed with | Equipos con los que diseñé |
| about.h | Hi, I'm Mauro. | Hola, soy Mauro. |
| about.p | A product designer based in Buenos Aires. [Years] years designing for PropTech, energy, healthcare and sports, usually as the person who connects business, design and engineering. | Diseñador de producto en Buenos Aires. [Años] años diseñando para PropTech, energía, salud y deportes, casi siempre como quien conecta negocio, diseño e ingeniería. |
| about.more | More about me | Más sobre mí |
| cta.h | Let's build something people are drawn to. | Construyamos algo que atraiga. |
| cta.btn | Start a conversation | Empecemos a hablar |
| cta.copy | Copy | Copiar |
| cta.copied | Copied | Copiado |
| foot.now | Now | Ahora |
| foot.in | in Buenos Aires | en Buenos Aires |
| foot.site | Site | Sitio |
| foot.else | Elsewhere | En otros lados |
| foot.settings | Settings | Ajustes |
| foot.top | Top ↑ | Arriba ↑ |
| foot.field | Field | Campo |
| foot.theme | Theme | Tema |
| foot.system / light / dark | System / Light / Dark | Sistema / Claro / Oscuro |
| foot.legal | Set in Geist on a 12-column grid | Geist sobre una grilla de 12 columnas |

UI strings used by the home (also in `home.html`):

| Key | EN | ES |
|---|---|---|
| skip | Skip to content | Saltar al contenido |
| case.*.k | PropTech / Energy / Sports tech · [year] | PropTech / Energía / Deportes · [año] |
| m.val / m.zero / m.impact | company valuation / built from scratch / [impact metric] | valuación de la empresa / construido desde cero / [métrica de impacto] |
| mat.ph / portrait | [cover image] / [portrait] | [imagen de portada] / [retrato] |
| arch.rf / arch.sector | Since 2017 / [sector] · [year] | Desde 2017 / [sector] · [año] |
| hl.label | Short on time? | ¿Poco tiempo? |
| hl.who / hl.next / hl.exit | Who / Next / Exit | Quién / Lo que sigue / Salir |
| hl.left / hl.done | s left / Done | s restantes / Listo |
| cta.copiedMsg | Email copied to clipboard. | Email copiado al portapapeles. |
| cta.selMsg | Email selected. Press Ctrl+C or ⌘C to copy. | Email seleccionado. Copialo con Ctrl+C o ⌘C. |
| foot.avail | Open to senior product roles · [availability] | Disponible para roles senior de producto · [disponibilidad] |
| foot.colophon | Colophon | Colofón |
| foot.on / foot.off | On / Off | Sí / No |
| foot.grid | Press G for the grid (hidden on touch devices) | Tocá G para ver la grilla |
| x.hint | Hover to see the structure | Pasá el cursor para ver la estructura |
| x.hintTouch | Press and hold to see the structure | Mantené apretado para ver la estructura |
| x.* (annotations) | Data table · 4 cols, KPI cards, Status token, Navigation, Route, Origin, Destination, Profile card, Avatar, Role tag | Same terms in both languages (design vocabulary) |

## Implementation notes

- The field moves from 2D canvas to a custom **WebGL2** shader, with no three.js.
- It pauses off-screen and in background tabs, caps resolution at 2×, and uses fewer filings and 30 fps on mobile.
- Fallbacks: a still PNG of the field for Open Graph images, and a static frame when WebGL is not available.
- Suggested stack: Astro (static output), GSAP, WebGL for the field.
- **Content (decided):** no admin panel. Cases and copy live as Markdown/JSON files in the repo (EN and ES side by side); Mauro edits them or asks Claude. Source content came from the old WordPress site.
- **Hosting (decided): GitHub Pages on mauroiman.com**, deployed by `.github/workflows/deploy.yml` on every push to `main` (repo Settings → Pages → Source "GitHub Actions"). The site is served from the domain root: `SITE_URL=https://mauroiman.com`, `BASE_PATH=/` (also the defaults in `astro.config.mjs`), and `public/CNAME` holds `mauroiman.com`. DNS on Cloudflare points to GitHub Pages; `mauro-iman.github.io/portfolio/` redirects to the domain. The old WordPress case URLs (`/portfolio/compass/` …) redirect to `/work/…`.
- **Build (v1):** Astro static site. `src/content/site.yaml` (site copy, email, LinkedIn, teams, archive) and `src/content/cases/<slug>.yaml` (one file per case, EN and ES side by side) are the only places content lives. `src/views/Home.astro` and `Case.astro` render both languages at `/` and `/es/` (`/work/<slug>/`, `/es/work/<slug>/`) with hreflang alternates. The exploration scripts (`public/site.js`, `case.js`, `site.css`) run unchanged in behavior: the page injects both dictionaries (`window.MI`), so the language switch still streams the text in place, and it now also updates the address and internal links to the other language. The 2D canvas field stays for v1; WebGL is a later step.
- **Case images:** files live in `src/assets/cases/<slug>/` (migrated from the live WordPress site) and are named in the case YAML: `coverImage` (replaces the drawn cover on the home card and the case cover; the x-ray hint only stays on drawn covers), `workImages` (one per workstream, in order; `null` keeps the drawing) and `screens` / `phones` (the gallery, captions in EN/ES). Astro converts everything to WebP in several widths and lazy-loads thumbnails. Wide banners and phone screens are shown whole; regular screens fill the frame from the top left. Alt text: the cover alt from the copy, workstream images use the gallery caption of the same file (or the workstream title); all switch with the language.
- **Screens section** (case pages, after "What I did"): label "Screens", heading "Inside the product.", one horizontal snap strip per group (desktop 16:10 thumbnails, phones in a rounded phone ratio), bleeding to the right edge. Each thumbnail is a button ("Enlarge: caption") that opens a native `<dialog>` lightbox: large WebP, caption, "n of N", ← → keys and buttons, swipe on touch, Esc or backdrop click closes and focus returns to the thumbnail.
- **Home structure (v1.1):** Hero → Selected work (3 featured cases) → **Building now** (`#building`: Datria360 and Estética Link, 2 cards, role line in accent, intro "Two products, built end to end this year… now I want to bring that to a team and to products at scale") → **More work** (`#more`: every other project, linked to its page; NDA items listed without a link) → Highlights → Capabilities → Teams → About → Contact. The 60 s highlights add a "Building now" step.
- **Project pages** (`src/content/projects/<slug>.yaml`, view `Project.astro`, same `/work/<slug>/` routes): lighter than a case, no assembly intro. Hero with facts (role, timeline, team), an optional anonymization note, "What I did" as chips (Datria360 uses "Hats I wore"), Results, then story sections (kicker, title, text and/or list) and the optional Screens gallery. Next project loops within its group. `group`: `building`, `work` or `list` (no page).
- **Project media**: `coverImage`, `screens` and `phones` work as in cases (files in `src/assets/cases/<slug>/`); `galleryTitle` per language overrides "Inside the product." when the images are not product screens (3XM, Holcim, Viaje Perfecto). Thumbnails that would crop badly (logos, very wide or tall images, by the same `fit()` rule as covers) are shown whole. An animated GIF opens as the original file in the lightbox, since WebP conversion keeps only the first frame.
- **Prototype videos** (`videos: [{ file, en, es, phone }]`, files in `public/videos/`, served as-is): a "Prototype · See it move." section before the gallery, native `<video controls playsinline preload="metadata">`, no autoplay (WCAG 2.2.2); `phone: true` caps the width at 300 px. The four videos (FinTek, Holcim, Viaje Perfecto desktop and mobile) are the live site's originals, about 80 MB together: under GitHub's 100 MB per-file limit, but they make the repo heavy. Decision (2026-11-13): keep the originals in the repo as they are. If size becomes a problem later, recompress them (ffmpeg, H.264 at 720p) or host them outside the repo. They have no speech, so no captions track.
- **Video carousel** (decision 2026-11-15, Mauro): an inline player only when the page has a single video. With two or more, the section is a carousel on the same strip as the screens: each card shows a frame of the video (`thumb` seconds, default 2) with a play badge, and a click opens it in the shared lightbox (`src/components/Lightbox.astro`, `public/gallery.js`) with native controls; it plays on open because the visitor asked for it, stops on close or when moving to another item, ← → move between videos (not while the player has focus, where arrows seek), Esc closes and focus returns to the card. Optional `videoLabel` / `videoTitle` rename the section per project.
- Adding a case: copy a case YAML, change `title`, `order`, `cover` and the copy; the page, home card, next-case loop and 60 s highlights pick it up. `system: true` adds the brand demo. Workstreams accept 2–4 items (4 lay out 2 × 2).
- Site map: `/`, `/work` (list and canvas views), `/work/[case]`, `/about`, `/colophon`, `/es/…`.

## Content still pending

- One real metric per case (Compass, Silstech · YPF, StatLink) and the year of each.
- Public contact email (the explorations use the example `hello@mauroiman.com`), availability line and which social links to show.
- Real cover images for the three cases (the home uses UI mock placeholders).
- One case written in three chapters (problem, decision, result) with a data point each.
- Confirmation of the teams list (which names can be shown).
- Screenshots of Estética Link for its project page.

## Changelog

- 2026-11-11 — Concept Imán/Field; palette Verde ferrita; voice Producto (Geist + Geist Mono).
- 2026-11-11 — Added from references: case chapters, attracting CTA, closing footer, implementation notes, this file.
- 2026-11-11 — Theme rules (system default, manual System/Light/Dark switch, persistence).
- 2026-11-11 — Magnetic fluids layer: flow in the hero, film on case images, ferrofluid only in the closing CTA (replaces the field inside the button).
- 2026-11-11 — Working agreement, spacing/shape/breakpoints, component specs, Home page structure and the EN/ES copy deck.
- 2026-11-11 — Home iteration 1 built (`home.html`): all 8 sections, highlights overlay, theme switch, Field switch, EN/ES, G grid overlay. Ferrofluid spike lean capped at ±0.55 so spikes stand up.
- 2026-11-11 — Feedback round 1: flow budget lowered; film redefined as a structure x-ray that reveals each case's wireframe; ferrofluid rebuilt as two rows of concave cones; alignment rule (stages from column 2, featured case 8/4, footer 3/3/3/3, wordmark fitted by ink bounds).
- 2026-11-11 — Mobile fix: button labels at line-height 1.2 with balanced wrapping; the highlights button goes full width under 480px so its label is never clipped.
- 2026-11-11 — Hero flow set to the midpoint between iteration 1 and round 1: 210/100 particles, 11-point trails, speed 0.45–2.75, opacity .42 ink / .82 green, green above .42.
- 2026-11-11 — Language switch stream: new text resolves out of filings, accessible and skipped under reduced motion.
- 2026-11-11 — Hero uses min-height so the gloss never clips on short windows; in-page navigation uses the magnetic scroll (attraction + overshoot clack).
- 2026-11-11 — Magnetic scroll v2 replaces v1 (rejected as unsatisfying): instant grab, ζ 0.6 spring with constant 16px rebound, visible filings during travel, green seam + haptic clack on impact.
- 2026-11-11 — Magnetic scroll: velocity normalized by time (the field was half as visible on 120 Hz phones); stronger field and 3px seam on touch.
- 2026-11-11 — Performance budget: DPR caps (2× / 1.5× touch), 30 fps on touch, loops paused during the magnetic scroll, adaptive quality levels; review viewer loads one page only and shows the real mobile page on phones.
- 2026-11-11 — Case study page defined (Compass): assembly intro, cover, at a glance, scroll chapters, workstreams, brand-absorbing system demo, reflection, next case. Shared site.css/site.js for all pages; language persists.
- 2026-11-11 — Opening a case: separate pages stitched into one gesture (gather toward the title on the home, hand-off of the filing grid, cross-document View Transition, assembly from those filings). Assembly filings thinner (1.3px) and denser (step = font size / 28); the rest of the intro waits for the title.
- 2026-11-11 — Opening a case: added a ~1 s field phase (the title acts as a bar magnet; filings align to its pole-to-pole arcs) and curved pull along field lines, so the attraction reads as magnetic instead of dots lining up. Intro reveal moves to 2.3 s.
- 2026-11-11 — Second case page: Silstech · YPF (draft copy, no system demo). Case pages share one layout with per-case copy files; the assembly now supports titles that wrap to several lines.
- 2026-11-12 — Case intro variant B "sweep" (magnet sliding behind the page, filings turn in place, title forms in its wake) plus mouse comb on the title. Variant A "pull" kept; the review viewer switches between Sweep ←, Sweep → and Pull.
- 2026-11-12 — Sweep visibility pass: slower sweep, traveling glow, afterglow wake, more wobble, thicker filings on phones; letters settle to one lean.
- 2026-11-12 — Exploration closed; building the real site starts. Content decision: no admin, content files versioned in the repo, migrated from the live site.
- 2026-11-12 — Real site v1: Astro on GitHub Pages, content in YAML (EN/ES), routes `/`, `/es/`, `/work/<slug>/`. Compass, Silstech · YPF and StatLink use the real facts and metrics from the live site; StatLink case added; archive shows sectors; email and LinkedIn from the live site. Language switch now also changes the URL.
- 2026-11-12 — Real case images: 57 screens from the live site (Compass 9, Silstech · YPF 20, StatLink 28) as covers, workstream images and a new Screens gallery with lightbox; optimized to WebP at build.
- 2026-11-12 — Removed "UI kit components" from StatLink: it belongs to Digital Global Systems (DGS). The design system workstream now shows the UI components board.
- 2026-11-13 — Building now (Datria360, Estética Link), More work with linked project pages (UPSL, Megatrans · Fenix, Cideon · Enify, FinTek, RF Solutions, Holcim, Healthcare Inc., Viaje Perfecto, 3XM), ePlan listed under NDA; Holcim Performance LH dropped. Old WordPress URLs mapped. Availability and About copy updated.
- 2026-11-13 — Project media from the live site: covers and galleries for RF Solutions (21 screens, DGS UI kit excluded), Healthcare Inc. (18 phone screens), Holcim (plant photo and research charts), 3XM (old and new logo, brand applied), FinTek (branding GIF) and Viaje Perfecto; prototype videos for FinTek, Holcim and Viaje Perfecto. Datria360 copy updated from the commercial deck: three pillars (Conversion, Operations, Growth), four plans and the Founding Circle launch in Córdoba, June 2026.
- 2026-11-13 — Home review: location is Córdoba, Argentina (hero, About, footer); About says more than 20 years; portrait photo in About (`src/assets/about/mauro.webp`, 1600×2000). Datria360 card shows the app video (`coverVideo`, muted loop, pause button, paused under reduced motion). Estética Link card uses the wireframe-face art with a subtle WhatsApp agent + CRM overlay (`coverOverlay: chat`, decorative, copy in `chat.*`). More work lists only projects with a page; ePlan removed.
- 2026-11-13 — 60 s highlights expanded from 6 to 8 steps: Who (with 20+ years and location), the three cases now with the role, a new "How I lead" step (UPSL team and account, hiring the StatLink backend developer, agile rituals, RF Solutions mentoring), Building now, a new "Range" step (industries and teams), then the CTA. Copy in `hl.*`.
- 2026-11-13 — Availability line widened to senior, staff and founding product design roles (hero, footer, last highlights step). Closing CTA button now opens the mailto link (an exploration leftover was blocking it).
- 2026-11-15 — Datria360 page: website link, branding, the AI agent and the stack it runs on; cover (appointments calendar) and a 7-screen gallery (landing, sign-in, appointments, patient record, service catalog, marketing strategy center, booking portal with the agent). The home card keeps the video.
- 2026-11-15 — Project page sections (`.p-sec`, e.g. The problem / The product): 16px of padding above the heading instead of 0, so the title no longer sits on the divider line.
- 2026-11-15 — Case studies: draft reflections and “What I’d do next” lines for Compass, Silstech · YPF and StatLink (to be reviewed by Mauro); StatLink metric labels quoted so the text after the comma shows; “[impact metric]” removed from the Iterpro line.
- 2026-11-15 — Video carousel: with two or more videos (Estética Link, Viaje Perfecto) the section is a carousel and each video opens full screen with controls; single videos (FinTek, Holcim) stay inline. The lightbox moved out of the gallery into its own component so a page with videos and no screens can use it.
- 2026-11-16 — Estética Link cover is now the congress home page hero (`cover-hero.webp`, temporary per Mauro); the WhatsApp/CRM chat overlay is off, since it covered the logo and the cover already shows the product.
- 2026-11-16 — Estética Link: Branding added to What I did; the Result now lists five outcomes (no plugin costs or dependencies, client-owned CRM data, a full CMS, an automated CRM + AI agent across the event, time back for the organizer). Project pages accept an optional `resultItems` list under the result line.
- 2026-11-16 — Datria360 Result lists six traction numbers (99.6% attendance on closed appointments, 1,000+ appointments, ARS 70M+ billed, 450+ patients, 28% returning, 12%+ bookings outside business hours).
- 2026-11-16 — Contact email is now hi@mauroiman.com (was a personal Gmail), set once in `site.yaml` and used by every mailto and copy button.
- 2026-11-16 — 60 s highlights: the last step (“Let’s build something people are drawn to.”) shows a small portrait above the label (104–148 px wide, 4:5, same photo and alt as About). Estética Link benefits screenshots replaced so they no longer show a personal email.
- 2026-11-17 — Project years filled: UPSL July 2024 – April 2025, Megatrans · Fenix October 2021 – January 2022 (4 months of workshops), Healthcare Inc. about 4 months in 2020 (at 3XM Group, new team line), Viaje Perfecto July – December 2016.
- 2026-11-17 — Results: UPSL (fixes went from weeks or months to days; proposals incl. Match Day; ended when UPSL was acquired), Megatrans · Fenix (architecture bottleneck diagnosis and a new structure to scale), Viaje Perfecto (top 10 in local Google searches, as a list with the previous outcomes). No result placeholders left.
- 2026-11-17 — Healthcare Inc. reframed: role and summary say Mauro joined to complete the design; result says it was handed off on time for launch. Kept in Other projects.
- 2026-11-17 — UPSL: the acquisition line removed (it is context, not an outcome, and looked out of place as a note); the summary names the product, the Registry System for Teams and Players; cover is the Match Day concept art (`upsl/cover.webp`, trial); Context adds four points (bugs and user support, renewals that needed developers, platforms with no integration and manual results, the unified-flow + mobile app proposal).
- 2026-11-17 — Megatrans · Fenix: prototype video of the proposed MVP (`megatrans-fenix-prototype.webm`, 1280×720, 58 s, 4.3 MB), shown inline as the page’s only video; the caption says it is not the final product.
- 2026-11-17 — Cideon · Enify cover: Enify key art, a red wireframe machine part over a dark grid (`cideon-enify/cover.jpg`, 1920×1080), shown in full (`coverFit: full`). It replaced the four-device mockup, which repeated the gallery.
- 2026-11-17 — Cideon · Enify: gallery of four, the remote-service call as device mockups (iMac, iPad, iPhone, which replace the plain desktop screenshot) and the SAP integration screen (3D parts tree). The four wireframes of the service room (chat; call beside the chat; call with the chat collapsed; the phone chat with a join-the-call banner) moved to their own strip under “Wireframes as a story”. The frame takes the median ratio (16:10); images with other ratios are shown whole. The annotated SAP mockup was left out: it repeats the clean screen with German labels.
- 2026-11-17 — Project pages: a story section can carry its own strip of screens (`sectionScreens: { <section index>: [{file, en, es}] }`), rendered under the section with the same thumbnails and lightbox as the gallery (← → stay in that strip). The strip markup moved to `GalleryStrip.astro`, shared with the gallery.
- 2026-11-17 — Footer: the “Imán” wordmark ignores the pointer (`pointer-events: none`). Its glyph box overlapped the footer buttons and blocked clicks on Top at some widths.
- 2026-11-17 — Domain: the site moved to mauroiman.com, served from the root (`BASE_PATH=/`, `public/CNAME`). With the old `/portfolio` base the domain loaded the pages without styles or scripts.
- 2026-11-17 — DESIGN.md is now the portable design system only (brand signature with exact geometry and SVG, machine-readable tokens, other media, reproduction checklist) and downloads from the footer at `/design.md`. Pages, copy deck, build, hosting, pending content and this changelog moved to `SITE.md`; positioning decisions to `POSITIONING.md`.
- 2026-11-15 — Estética Link: two videos in its page (the new site’s hero intro, 1920×1080, and the animated Three.js attendee credential, 1080×1920 as a phone video), as WebM (9.7 MB and 7.1 MB, converted by Mauro from the 15.7 MB and 21.9 MB MP4s). Projects can now rename the video section with `videoLabel` / `videoTitle` (Estética Link: “Video · The site in motion.”). Later the same day: a third video (add-to-cart animation, 1280×720) and a 5-screen gallery (passes, speakers, expo, attendee tickets, sponsor benefits).
