# DESIGN.md — mauroiman.com

The design system for Mauro Imán's personal site. It is the single source of truth: every exploration, design and line of code follows it.

- Status: design stage (November 2026). No production code yet.
- Explorations: `explorations/concept-v2.html` (concept and demos), `explorations/home.html` (home page, responsive, EN/ES, both themes) and `explorations/home-review.html` (viewer with Desktop 1440 / Mobile 390 frames).

## Working agreement

1. **Read this file before every iteration.** Tokens, type, grid, spacing, components and copy come from here, never from memory or from an older exploration.
2. **Write every decision back here in the same iteration** it is made, and add a line to the Changelog at the end.
3. If an exploration and this file disagree, this file wins. Fix the exploration or update this file on purpose.
4. Copy lives in the Copy deck (EN and ES side by side). Pages use those strings; new strings are added there first.
5. Placeholders are written in square brackets, e.g. `[availability]`, and never presented as real data.

## Concept: Imán / Field

*Imán* is Spanish for *magnet*. The site behaves like a magnetic field: **everything is drawn to its place.**

- **The field:** iron filings around a dipole, drawn behind selected surfaces. They react to the cursor, a finger or scroll.
- **The tilde:** the accent of the "á" is the one recurring brand mark. It works as the nav indicator, bullet, loader, favicon, link hover and logotype accent.
- **The assembly:** opening a case study, the filings fly in and form the case title, then the UI rises in 3D.
- **60-second highlights:** a "Short on time?" mode for recruiters and executives, available from every page.

### Magnetic fluids layer

Three ideas from magnetite and ferrofluid experiments, each with exactly one place:

1. **Flow (magnetite):** particles travel along the field lines, pole to pole, leaving short trails. It is the hero's idle state and slows to a stop as the visitor scrolls. **It is texture, not a show.** Budget:
   - At most 210 particles on desktop and 100 on mobile; trails of at most 11 points; line width 1.2px.
   - Speed 0.45–2.75 px/frame; opacity ≤ 0.42 for ink trails and ≤ 0.82 for green trails.
   - Green only close to the magnet (field strength > 0.42); everything else in ink.
   - Calibrated as the midpoint between iteration 1 (too intense) and round 1 (too quiet). Do not go below or above without a new decision.
2. **Structure film (x-ray):** magnetic viewing film makes invisible forces visible; on the site it makes the **invisible structure of the work** visible. Hovering a case cover opens a circular lens that shows the same screen as a wireframe on green film: boxes, grid and component annotations ("Data table · 4 cols", "Status token"…), over a faint field-line texture. Rules:
   - It always reveals content of that case (its wireframe/system), never a generic effect.
   - A hint on the cover explains it ("Hover to see the structure" / touch: "Press and hold…").
   - Lens radius ~110px (70–120), opens/closes in 350ms; touch: press and hold.
   - Film colors: base `#0A3D2B`, lines and labels `#4ADE9E`, label backing `rgba(6,17,12,.7)`.
   - Production: real wireframes exported per case, aligned 1:1 with the cover image.
   - The origin story of Verde ferrita (the green of viewing film) still needs verifying against real photos.
3. **Ferrofluid:** a black drop at the foot of the closing CTA raises spikes toward the magnet. The magnet is the button by default; spikes follow a far cursor, return when it nears the button, and surge on click. It appears **only** here; there is no field inside the CTA button. Shape rules:
   - Spikes are sharp cones with concave flanks (profile `(1−u)^2.4`), never fins or waves.
   - Two rows for depth: a back row (65% height, offset half a spike, lighter) and a front row.
   - Height follows a Gaussian under the magnet (tallest spikes closest to it); edge spikes stay low.
   - Lean toward the magnet at most ±0.35; springy settle, no constant wobble.
   - Shading: vertical gradient `#3A433F → #111613 → #020403`, a thin highlight down the left flank, a specular dot near each tip, a 1px rim on the top surface only, one green glint on the tallest tip.
   - Production version: a shader with reflections.

## Color — Verde ferrita

Every pair must meet WCAG 2.2 AA. Text accent ≥ 4.5:1 and graphic accent ≥ 3:1 against both `paper` and `panel`.

| Token | Light | Dark | Use |
|---|---|---|---|
| `--paper` | `#EDEFEE` | `#0B0F0D` | Page background |
| `--panel` | `#E1E5E3` | `#131916` | Stages, cards, image mats |
| `--ink` | `#0E1311` | `#E6EBE8` | Primary text, filings, primary buttons |
| `--ink-2` | `#4B5550` | `#97A39D` | Secondary text, labels |
| `--line` | `#C5CCC8` | `#25302B` | Rules, borders (decorative only) |
| `--accent` | `#08704E` | `#4ADE9E` | Text accent: links, the "á" |
| `--fill` | `#0E8A5F` | `#4ADE9E` | Graphic accent: tilde, field, cursor |
| `--fill-inv` | `#4ADE9E` | `#08704E` | Graphic accent on inverse (ink) surfaces |
| `--on-accent` | `#FFFFFF` | `#06110C` | Text on accent backgrounds |
| `--tint` | `rgba(14,138,95,.1)` | `rgba(74,222,158,.1)` | Selected/hover wash |

Measured contrast (light): accent 5.29 on paper and 4.80 on panel; fill 3.77 and 3.43. Dark: accent/fill 11.24 and 10.38.

Fixed (theme-independent) colors, only for the magnetic fluids:
- Film: dark `#06110C`, base `#106848`, lines `#4ADE9E`.
- Ferrofluid: gradient `#3A433F` → `#111613` → `#020403`, white specular highlights, rim `rgba(255,255,255,.24)`.

Rules:
- Green is used sparingly: one accent moment per view.
- Do not push the dark-mode green toward lime; it would get close to other well-known brands.
- No mesh gradients, auroras or liquid-metal backgrounds.

## Theme: light and dark

Both themes are first-class; neither is a filter over the other.

- **Default:** follow the system (`prefers-color-scheme`). No preference → light.
- **Manual override:** a three-way switch in the footer settings, next to "Field" and language: *System · Light · Dark*. It sets `data-theme="light|dark"` on `<html>`; *System* removes the attribute.
- **Persistence:** the choice is saved in `localStorage` (key `mi-theme`) and restored by a tiny inline script in `<head>`, before first paint, so there is no flash of the wrong theme. If storage is unavailable, fall back to the system.
- **CSS contract:** tokens live on `:root`; dark values are declared twice, under `@media (prefers-color-scheme: dark) { :root:not([data-theme="light"]) }` and under `:root[data-theme="dark"]`. Each theme also sets `color-scheme` so native controls and scrollbars match.
- **Canvas and WebGL:** the field reads its colors from the tokens, so it re-reads them on every theme change (system or manual) and redraws, including still frames.
- **Inverse surfaces:** on ink buttons use `--fill-inv`, the opposite theme's green, so the tilde keeps ≥ 3:1.
- **Browser chrome:** `<meta name="theme-color">` with one value per scheme (`#EDEFEE` / `#0B0F0D`).
- **Work images:** screenshots keep their own colors in both themes, on a `--panel` mat with a `--line` border; no inverting. Logos and diagrams that need it get a dark variant.
- **Transition:** switching crossfades colors for ~200 ms; instant under reduced motion.
- **Open Graph image:** one version only (light), since social previews do not know the viewer's theme.

## Typography — voice "Producto"

- Display and text: **Geist** (300–800). Labels, metadata and glosses: **Geist Mono** (400–500).
- Foundry equivalents if licensed later: Söhne or Suisse Int'l.
- Geist has no width axis: never rely on `wdth`.

| Token | Size | Use |
|---|---|---|
| `--s-0` | `.75rem` | Labels, metadata (mono) |
| `--s-1` | `1rem` | Body |
| `--s-2` | `1.25rem` | Lead paragraphs, H3 |
| `--s-3` | `1.75rem` | Statements, card titles |
| `--s-4` | `clamp(2rem, 4vw, 3rem)` | H2 |
| `--s-5` | `clamp(2.75rem, 7.5vw, 6.5rem)` | H1 (one per page) |

- Display: weight 650–800, tight tracking (−.025em to −.055em), line-height .94–1.05, `text-wrap: balance`.
- Body: weight 400, line-height 1.55, max 64ch, `text-wrap: pretty`.
- Labels: mono, `--s-0`, uppercase, letter-spacing .06em, `--ink-2`.
- Metrics: display 700, `font-variant-numeric: tabular-nums`.
- Correct microtypography in both languages: real quotes and apostrophes, en dashes, non-breaking spaces before units, tabular numbers for metrics.

## Grid, spacing and shape

- 12-column grid, max width 1280px, gutter 24px (16px under 760px).
- Pattern: mono labels in columns 1–3, content in 4–12. Under 760px everything spans the full width.
- Side gutter on phones: `max(16px, env(safe-area-inset-*))`. No horizontal page scroll.
- Grid overlay toggled with the G key (part of the craft layer).
- **Alignment rule:** with the grid overlay on, every left edge lands on a column edge and every block spans whole columns. Specifically:
  - Nested layouts use the 12-column grid (or a sub-grid of it), never ad-hoc `fr` ratios.
  - Inside full-width stages (highlights band, CTA), content starts at column 2: `left = (100% − 11 × gutter) / 12 + gutter`. Under 760px, 20px.
  - Featured case: image in columns 1–8, text in 9–12. Other cases: 6 + 6.
  - Footer: Now 1–3, Site 4–6, Elsewhere 7–9, Settings 10–12. Under 760px: Now full width, Site 1–6, Elsewhere 7–12, Settings full width.
  - The footer wordmark is fitted by its **ink bounds** (not its text box): the left of the "I" sits on column 1 and the right of the "n" on column 12.
- Breakpoints: 480px (small phone), 760px (single column), 900px (tablet), 1280px (max width).
- Spacing scale (4px base): 4, 8, 12, 16, 24, 32, 48, 64. Section padding: `clamp(72px, 10vw, 144px)` top and bottom.
- Radius: 6px for cards, stages and image mats; 4px for small inner elements; 999px for pills and buttons.
- Borders: 1px `--line`. Section dividers: 1px `--line` across the content width.
- Elevation: none, except the search palette (`0 12px 40px -12px rgba(0,0,0,.25)`).

## The field budget

Intensity follows what the visitor is doing. The more they read, the quieter the field.

| Place | Intensity | Behavior |
|---|---|---|
| Home hero | Full | Leading role. Responds to cursor or finger; when idle, magnetite flows along the field lines. |
| Opening a case | Full, ~1.5 s | Filings form the title, then fade. |
| Work index | Medium | Points toward the project under the cursor. |
| Case images | Subtle, on hover | The structure film lens reveals the case's wireframe. |
| Case chapters | Medium | Goes from scattered to aligned as you scroll. Own panel, never behind text. |
| Closing CTA | Full, an instant | The site's only ferrofluid. Spikes and filings point at the button and surge on click. |
| Nav and buttons | Subtle | The tilde marks location; buttons lean slightly toward the cursor. |
| Highlights | Ordered | Filings align like parallel tildes. |
| Footer | At rest | Aligned and still; wakes only where the cursor passes. |
| Reading (case body, About, capabilities) | Off | Type, grid and work images only. |

Rules:
1. The field moves only when the visitor acts or changes place. It never animates on its own behind body text.
2. One protagonist per screen.
3. `prefers-reduced-motion`: a still frame of the field; transitions become fades.
4. A "Field off" switch in the footer turns it off site-wide and is remembered (key `mi-field`).

## The tilde

- Angle: −0.98 rad for the field's "order" direction; drawn as a 3×11px bar rotated 34° in UI.
- Uses: nav indicator (springs between items), bullets, three-tilde loader, favicon (works at 16px), link hover (appears at the end of the link), the "á" in the logotype.
- Color: `--fill`, or `--fill-inv` on ink surfaces.

## Motion

- Spring: `cubic-bezier(.3, 1.45, .5, 1)` for things that snap (tilde, magnetic buttons). Out: `cubic-bezier(.2, .8, .1, 1)` for entrances.
- Durations: 200 ms (color, opacity), 350–500 ms (position), 900 ms (3D rise).
- Section entrances: content rises 16px and fades in once, when 15% visible. Never re-animates on scroll back.
- Smooth scroll (Lenis) can be turned off and is disabled under reduced motion.
- **Magnetic scroll (in-page links), v2:** nav, tab bar, logo, footer links, CTAs and "Top" pull the target section into place. Goal: a gesture visitors *want* to repeat. Four beats:
  1. **Grab** — the page moves in the same frame as the click (no ease-in dead time) and the clicked link "charges" (2px dip + 4% squash, spring back, 420 ms).
  2. **Pull** — damped spring, ζ 0.6, settle time 560 ms + 0.14 ms/px (620–1250 ms). Arrival at the target in ~240–480 ms. Past the target the overshoot is compressed to ≤16px (or less if there is no room), so every trip ends with the same small rebound regardless of distance.
  3. **Field** — while travelling, a fixed overlay shows filings on a 30px grid (26px on mobile) that move with the page and point at a magnet beyond the viewport edge in the direction of travel. Length 5–22px grows with speed; opacity .12–.42 grows toward the magnet; the band nearest the magnet is green. Fades out in 260 ms after landing. Speed is measured per time (normalized to a 60 Hz frame), never per frame, so 90/120 Hz phones look identical. On touch screens the field is 25% stronger (opacity cap .6) and the seam is 3px.
  4. **Clack** — at the moment of impact a 2px `--fill` seam snaps across under the header (scaleX 0→1 in ~170 ms, then fades, 620 ms total) and touch devices get a 12 ms haptic tick (only after a real user gesture).
  Lands under the sticky header (Home at 0), updates the hash and moves focus to the section (`tabindex=-1`). Wheel, touch or key interrupts it. Reduced motion: instant jump, no overlay, no seam. Safety timer lands it if frames stall. Case links (placeholders) and the 60 s tab are excluded. v1 (pure ease-in + overshoot) was rejected: it felt laggy at the start and the effect was invisible.
- **Language switch (stream):** text in view resolves left→right out of "filings" (`/ \ | - ·` in `--ink-2` at 70%), keeping the new text's length so layout barely moves. Per element 160 ms + 12 ms/char (max 650 ms), ease-out, staggered top→bottom (max 260 ms). Glyphs refresh every 55 ms. Rich-text strings (`data-ih`) fade in over 450 ms instead. Text out of view changes instantly. Screen readers get the final text at once (visually hidden copy; the animated layer is `aria-hidden`). Reduced motion and first load: instant. Never on the language buttons themselves. A 1.1 s safety timer always lands the final text, even if frames stall; switching again mid-stream finishes the current one first.
- **Opening a case (home → case page):** the home and each case are separate pages (own URL, shareable, indexable), stitched so they read as one gesture:
  1. **Gather (home, 420 ms)** — clicking a case cover dims the page to 8% and fills the screen with filings on a 30px grid that turn from the resting field angle toward the case title, as if the magnet landed on it. Length 4→13px, longer near the title; the band within ~200px of it is green. Ease-out cubic.
  2. **Hand-off** — the final grid (magnet point, grid size, viewport) is stored in `sessionStorage` (`mi-arrive`, valid 5 s and only at the same width ±40px) so the case page starts from exactly those filings.
  3. **Cross-document View Transition** — header and tab bar keep their place (`view-transition-name`), the rest cross-fades in 300 ms. Browsers without support simply navigate.
  4. **Field (case page, ~1 s)** — the title becomes a bar magnet with its poles at the two ends. Every filing on screen (the handed-off grid, or a fresh 30px grid on a direct visit) turns to the dipole's field lines in a wave spreading out from the title (650 ms each, delay up to 380 ms by distance) and creeps up to 14px toward it. Filings get longer and turn green near the poles, so the arcs from pole to pole are readable before anything moves.
  5. **Pull** — from 950 ms the filings nearest the title (about one per three letter points) are pulled in along curved paths that start on their field line, oriented along their path, left to right (stagger 320 ms + up to 100 ms jitter, flight 820 ms, out-back ease, 1.3px lines, sample step = font size / 28, 4–7px), and turn to the resting angle as they land. The rest stay as the field. At 2.3 s, after the last filing lands, the real H1 fades in and the field dissolves (500 ms) into the background field; back link, label, lead and facts stagger in (0.04 / 0.12 / 0.22 s). Everything except the H1 stays hidden until then; a 4 s CSS fallback shows it all if scripts fail.
  **Under review, variant B "sweep"** (default in the exploration; A above is "pull", kept for comparison; the review viewer switches them): filings never travel. As if a strong magnet slid behind a plastic lid, it sweeps across the hero (right→left by default, left→right as an option) in 1.3 s (sine in-out, starting just off screen). Every filing turns toward it as it passes, on a spring (stiff only while the magnet is near, light damping, so they wobble and then freeze in the lean they had when it left). Background filings (30px grid, or the home's hand-off grid) stretch and turn green in the band around the magnet. Filings on a fine grid inside the letters (step = font size / 28) only appear once the magnet is right over them, so the title forms in its wake. The real H1 fades in 420 ms after the sweep ends.
  *Visibility pass (felt imperceptible, especially on phones):* sweep slowed to 1.7 s and starts only half a band off screen; a soft green glow (12%, fades in and out with the sweep) travels with the magnet; stiffer, less damped spring (more wobble); background filings keep an afterglow (decays in ~0.6 s) so the magnet leaves a visible wake of longer, brighter filings; phones get 1.6px, longer filings. Letters get no afterglow and settle to one shared lean once combed, so the title stays legible. Reveal at ~2.3 s.
  **Comb (variant B only, mouse only):** once the title is formed, moving the mouse over it shows the letters as filings again and they turn toward the pointer like a hand-held magnet; the text returns 0.9 s after the mouse stops or leaves. Not on touch (it would fight scrolling) or with reduced motion.
  Reduced motion or Field off: no gather, no view transition, no assembly. The browser's back button restores the home as it was.
- The case chapters use scroll as the timeline: scattered (problem) → attracted (decision) → aligned (result).

## Components

- **Header (desktop):** logo left ("Mauro Im**á**n", the á in `--accent`); nav center-right (Work, Highlights, About, Contact) with the springing tilde; language pill (EN/ES) right. Sticky, `--paper` background, 1px `--line` bottom border once scrolled.
- **Bottom tab bar (under 760px):** replaces the nav. Home, Work, 60 s, About, with the tilde. Floating pill, blurred `--paper` at 86%, 12px from the bottom edge plus safe area. The header keeps only logo and language.
- **Buttons:** primary = ink pill with `--paper` text (min height 44px); secondary = `--paper` pill with 1px ink border; small = mono uppercase pill with `--line` border. Labels use line-height 1.2, left-aligned, `text-wrap: balance`; when a label must wrap, the button grows with 12px vertical padding (never clipped) and mono tags ("60 s") never break. Magnetic lean toward the cursor (max ~6px) on fine pointers only.
- **Text link:** `--accent`, no underline only inside nav lists; elsewhere underlined (1px, offset 3px). Hover adds the tilde at the end.
- **Case card:** image mat (`--panel`, 6px radius, aspect 4:3 or 16:10) with the structure film lens on hover and its hint label; below it, sector label · year (mono), title (`--s-3`, 700), one-line summary (`--ink-2`), one metric (tabular) and "Read the case" link. The whole card is one link.
- **Archive list:** rows with name, sector and year in mono columns, 1px `--line` separators, tilde on hover. "View all work" link at the end.
- **Highlights band:** full-width `--panel` stage with the ordered field; heading + primary button with the tilde and a "60 s" mono tag. Under 480px the button is full width (padding 12px 18px) with the tag pushed to the right; EN fits on one line, ES wraps to two balanced lines.
- **Capabilities:** three columns (one under 760px), each with H3, a short paragraph and tilde bullets. No field.
- **Teams list:** names set as large text (`--s-3`, 600, `--ink-2`, hover `--ink`), separated by the tilde. Never a logo marquee.
- **About teaser:** portrait mat (4:5, `--panel`) + short bio + link. Portrait placeholder until a real photo exists.
- **Closing CTA:** one per page. Heading, ink button and the ferrofluid drop below it. Next to the button, "Copy email" that confirms visibly and through `role="status"`.
- **Footer:** local time in Buenos Aires, availability, site and external links, settings (Field, Theme, Language, Top). The "Imán" wordmark spans the full width and bleeds off the bottom; it is `aria-hidden` because the name is also present as text.
- **Search:** closed by default as a pill; opens with click or ⌘K / Ctrl+K, closes with Esc.

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

## Performance budget

Motion is the brand, so it has to feel smooth on a mid-range Android phone, not only on a laptop. Rules (measured in `home.html`: per-frame logic costs ~0.2 ms on desktop and ~0.05 ms on mobile, so the cost is painting canvases, not JavaScript):

- **Pixel density:** decorative canvases render at most 2× on fine pointers and 1.5× on touch screens; 1× at reduced quality. Thin filings stay crisp at 1.5×.
- **Frame rate:** 60 fps on fine pointers, 30 fps on touch screens (hero, fields, ferrofluid, footer). Canvas loops run only while their section is on screen (IntersectionObserver) and pause while the magnetic scroll is running (its own overlay is the only thing drawn).
- **Adaptive quality:** every loop feeds the real frame interval into one shared monitor. If frames stay slower than ~24 ms for 1.5 s, quality steps down once: level 1 = density 1×, filings 30% sparser, half the flow particles; level 0 = also half the frame rate. It never steps back up within the visit.
- **Batching:** filings are drawn as one path per opacity band (4 strokes per field per frame), never one stroke per filing.
- **Production:** move the field math to an OffscreenCanvas worker where available, and lazy-start fields below the fold. Test on a mid-range Android (e.g. Galaxy A series) before shipping; target ≥ 50 fps while scrolling the home.
- **Review viewer:** only one copy of the page is ever loaded; on a phone it shows the real page full width (never the 1440px desktop scaled down, which costs ~9× the pixels).

## Implementation notes

- The field moves from 2D canvas to a custom **WebGL2** shader, with no three.js.
- It pauses off-screen and in background tabs, caps resolution at 2×, and uses fewer filings and 30 fps on mobile.
- Fallbacks: a still PNG of the field for Open Graph images, and a static frame when WebGL is not available.
- Suggested stack: Astro (static output), GSAP, WebGL for the field.
- **Content (decided):** no admin panel. Cases and copy live as Markdown/JSON files in the repo (EN and ES side by side); Mauro edits them or asks Claude. Source content comes from the live WordPress site (mauroiman.com/portfolio).
- **Hosting (decided): GitHub Pages**, deployed by `.github/workflows/deploy.yml` on every push to `main`. One-time setup: repo Settings → Pages → Source "GitHub Actions". Until the domain moves the site lives at `mauro-iman.github.io/portfolio/` (`BASE_PATH=/portfolio`). To move mauroiman.com: set `SITE_URL=https://mauroiman.com` and `BASE_PATH=/` in the workflow, add `public/CNAME` with `mauroiman.com`, and point the Cloudflare DNS to GitHub Pages; the old WordPress case URLs (`/portfolio/compass/` …) then redirect to `/work/…` automatically.
- **Build (v1):** Astro static site. `src/content/site.yaml` (site copy, email, LinkedIn, teams, archive) and `src/content/cases/<slug>.yaml` (one file per case, EN and ES side by side) are the only places content lives. `src/views/Home.astro` and `Case.astro` render both languages at `/` and `/es/` (`/work/<slug>/`, `/es/work/<slug>/`) with hreflang alternates. The exploration scripts (`public/site.js`, `case.js`, `site.css`) run unchanged in behavior: the page injects both dictionaries (`window.MI`), so the language switch still streams the text in place, and it now also updates the address and internal links to the other language. The 2D canvas field stays for v1; WebGL is a later step.
- **Case images:** files live in `src/assets/cases/<slug>/` (migrated from the live WordPress site) and are named in the case YAML: `coverImage` (replaces the drawn cover on the home card and the case cover; the x-ray hint only stays on drawn covers), `workImages` (one per workstream, in order; `null` keeps the drawing) and `screens` / `phones` (the gallery, captions in EN/ES). Astro converts everything to WebP in several widths and lazy-loads thumbnails. Wide banners and phone screens are shown whole; regular screens fill the frame from the top left. Alt text: the cover alt from the copy, workstream images use the gallery caption of the same file (or the workstream title); all switch with the language.
- **Screens section** (case pages, after "What I did"): label "Screens", heading "Inside the product.", one horizontal snap strip per group (desktop 16:10 thumbnails, phones in a rounded phone ratio), bleeding to the right edge. Each thumbnail is a button ("Enlarge: caption") that opens a native `<dialog>` lightbox: large WebP, caption, "n of N", ← → keys and buttons, swipe on touch, Esc or backdrop click closes and focus returns to the thumbnail.
- **Home structure (v1.1):** Hero → Selected work (3 featured cases) → **Building now** (`#building`: Datria360 and Estética Link, 2 cards, role line in accent, intro "Two products, built end to end this year… now I want to bring that to a team and to products at scale") → **More work** (`#more`: every other project, linked to its page; NDA items listed without a link) → Highlights → Capabilities → Teams → About → Contact. The 60 s highlights add a "Building now" step.
- **Project pages** (`src/content/projects/<slug>.yaml`, view `Project.astro`, same `/work/<slug>/` routes): lighter than a case, no assembly intro. Hero with facts (role, timeline, team), an optional anonymization note, "What I did" as chips (Datria360 uses "Hats I wore"), Results, then story sections (kicker, title, text and/or list) and the optional Screens gallery. Next project loops within its group. `group`: `building`, `work` or `list` (no page).
- **Project media**: `coverImage`, `screens` and `phones` work as in cases (files in `src/assets/cases/<slug>/`); `galleryTitle` per language overrides "Inside the product." when the images are not product screens (3XM, Holcim, Viaje Perfecto). Thumbnails that would crop badly (logos, very wide or tall images, by the same `fit()` rule as covers) are shown whole. An animated GIF opens as the original file in the lightbox, since WebP conversion keeps only the first frame.
- **Prototype videos** (`videos: [{ file, en, es, phone }]`, files in `public/videos/`, served as-is): a "Prototype · See it move." section before the gallery, native `<video controls playsinline preload="metadata">`, no autoplay (WCAG 2.2.2); `phone: true` caps the width at 300 px. The four videos (FinTek, Holcim, Viaje Perfecto desktop and mobile) are the live site's originals, about 80 MB together: under GitHub's 100 MB per-file limit, but they make the repo heavy. Decision (2026-11-13): keep the originals in the repo as they are. If size becomes a problem later, recompress them (ffmpeg, H.264 at 720p) or host them outside the repo. They have no speech, so no captions track.
- **Positioning decisions:** Datria360 title is "Co-founder · Product & Design Lead" everywhere (site, LinkedIn, CV) for consistency. Sensatica LLC is not presented as an agency: consulting work is told by role (StatLink, UPSL as "independent consulting"). Unbuilt proposals are not cases; the UPSL Match Day concept appears inside the UPSL page, labelled as a concept, without price or Sensatica branding. Availability: "Open to full-time senior product roles".
- Adding a case: copy a case YAML, change `title`, `order`, `cover` and the copy; the page, home card, next-case loop and 60 s highlights pick it up. `system: true` adds the brand demo. Workstreams accept 2–4 items (4 lay out 2 × 2).
- Site map: `/`, `/work` (list and canvas views), `/work/[case]`, `/about`, `/colophon`, `/es/…`.

## Accessibility (WCAG 2.2 AA)

- Contrast as specified above; never place body text over an active field.
- Visible focus: 2px `--accent` outline, 3px offset.
- Targets of at least 24×24px (44px for primary actions).
- Every canvas is `aria-hidden`; all meaning is also in text.
- Full keyboard paths for search, case opening and closing, highlights and chapters.
- `lang` set per page and on language switches. A skip link ("Skip to content") is the first focusable element.
- One H1 per page; headings never skip levels.

## Content still pending

- One real metric per case (Compass, Silstech · YPF, StatLink) and the year of each.
- Public contact email (the explorations use the example `hello@mauroiman.com`), availability line and which social links to show.
- Real cover images for the three cases (the home uses UI mock placeholders).
- Years of experience for the About teaser, and a portrait.
- One case written in three chapters (problem, decision, result) with a data point each.
- Confirmation of the teams list (which names can be shown).
- Screenshots of Datria360 and Estética Link (the Datria360 deck is commercial and has no product screens).

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
