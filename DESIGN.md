# Imán — design system

The design system behind [mauroiman.com](https://mauroiman.com), Mauro Imán's portfolio. It defines the brand, the tokens, the components and the motion. Use it to build pages, slide decks, documents or images that look like the site.

- Version 1.0 · November 2026
- Download: [mauroiman.com/design.md](https://mauroiman.com/design.md)
- Source: [github.com/mauro-iman/portfolio](https://github.com/mauro-iman/portfolio) (the site's build and content notes are in `SITE.md`)

## How to use this file

For people and for AI tools (Claude, Gemini, ChatGPT, Figma Make…) that generate artifacts from it:

1. **Values are exact.** Use the hex colors, sizes, angles and curves as written. Do not round them, restyle them or pick "something close".
2. **The brand mark is a shape, not a character.** Draw the tilde from the SVG in [Brand signature](#brand-signature-the-tilde), copied verbatim. Never replace it with `~`, `˜`, a dot, a square, a dash or an icon.
3. **One green moment per view.** The accent green is rare on purpose. A slide, card or screen gets one green element at most (the tilde, the "á" or one link).
4. **If something is not specified, keep it plain:** paper background, ink text, Geist, the 12-column grid. Do not add gradients, shadows, glows, emoji or stock icons to fill the gap.
5. Check the [Reproduction checklist](#reproduction-checklist) before delivering.

## Tokens (machine-readable)

The same values as the tables below, in one block for tools.

```json
{
  "color": {
    "light": { "paper": "#EDEFEE", "panel": "#E1E5E3", "ink": "#0E1311", "ink-2": "#4B5550", "line": "#C5CCC8", "accent": "#08704E", "fill": "#0E8A5F", "fill-inv": "#4ADE9E", "on-accent": "#FFFFFF" },
    "dark":  { "paper": "#0B0F0D", "panel": "#131916", "ink": "#E6EBE8", "ink-2": "#97A39D", "line": "#25302B", "accent": "#4ADE9E", "fill": "#4ADE9E", "fill-inv": "#08704E", "on-accent": "#06110C" }
  },
  "font": { "display": "Geist", "text": "Geist", "mono": "Geist Mono", "fallback": { "sans": "Inter, Helvetica Neue, Arial, sans-serif", "mono": "IBM Plex Mono, ui-monospace, monospace" } },
  "type": { "label": "0.75rem mono uppercase 0.06em", "body": "1rem/1.55 400", "lead": "1.25rem", "statement": "1.75rem", "h2": "clamp(2rem, 4vw, 3rem)", "h1": "clamp(2.75rem, 7.5vw, 6.5rem)", "display": { "weight": "650-800", "tracking": "-0.025em to -0.055em", "leading": "0.94-1.05" } },
  "grid": { "columns": 12, "maxWidth": "1280px", "gutter": "24px", "gutterMobile": "16px", "labelColumns": "1-3", "contentColumns": "4-12" },
  "space": [4, 8, 12, 16, 24, 32, 48, 64],
  "radius": { "card": "6px", "inner": "4px", "pill": "999px" },
  "border": "1px line",
  "shadow": "none",
  "tilde": { "shape": "rounded rectangle", "ratio": "3:11 (width:height)", "corner": "fully rounded ends", "rotation": "34deg clockwise", "fill": "fill (or fill-inv on ink)", "svg": "see Brand signature" },
  "motion": { "spring": "cubic-bezier(.3, 1.45, .5, 1)", "out": "cubic-bezier(.2, .8, .1, 1)", "fast": "200ms", "move": "350-500ms", "rise": "900ms" }
}
```

## Concept: Imán / Field

*Imán* is Spanish for *magnet*. The site behaves like a magnetic field: **everything is drawn to its place.**

- **The field:** iron filings around a dipole, drawn behind selected surfaces. They react to the cursor, a finger or scroll.
- **The tilde:** the accent of the "á" is the one recurring brand mark. It works as the nav indicator, bullet, loader, favicon, link hover and logotype accent (see [Brand signature](#brand-signature-the-tilde)).
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
3. **Ferrofluid:** a black drop at the foot of the closing CTA raises spikes toward the magnet. The magnet is the button by default; spikes follow a far cursor, return when it nears the button, and surge on click. It appears **only** here; there is no field inside the CTA button. Shape rules:
   - Spikes are sharp cones with concave flanks (profile `(1−u)^2.4`), never fins or waves.
   - Two rows for depth: a back row (65% height, offset half a spike, lighter) and a front row.
   - Height follows a Gaussian under the magnet (tallest spikes closest to it); edge spikes stay low.
   - Lean toward the magnet at most ±0.35; springy settle, no constant wobble.
   - Shading: vertical gradient `#3A433F → #111613 → #020403`, a thin highlight down the left flank, a specular dot near each tip, a 1px rim on the top surface only, one green glint on the tallest tip.
   - Production version: a shader with reflections.

## Brand signature: the tilde

The tilde is the accent of the "á" in Im**á**n, lifted out of the word and used on its own. It is the only brand mark: there is no logo symbol, monogram or icon set.

**What it is:** a short bar with fully rounded ends, leaning right at 34°, filled with the accent green. It looks like an acute accent (´) drawn as a solid shape.

**What it is not:** the tilde character `~` or `˜`, a wave, a dot, a square, a dash, a slash in a font, an outline, or an icon.

### Geometry

| Property | Value |
|---|---|
| Shape | Rounded rectangle (a pill standing upright) |
| Proportion | 3 : 11 (width : height). Large uses may go to 8 : 30, same feel |
| Ends | Fully rounded (corner radius = half the width) |
| Rotation | 34° clockwise around its center, so the top leans right. Never left, never another angle |
| Fill | Solid `fill` (`#0E8A5F` on light, `#4ADE9E` on dark). On ink or dark-on-light surfaces use `fill-inv` |
| Stroke, gradient, shadow, glow | None |
| Minimum size | 2.5 × 8 px on screen; 1 × 3.7 mm in print |

### Canonical SVG

Copy these verbatim. The drawing box is square so the mark can be placed and scaled like an icon; the bar is centered.

On light backgrounds:

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32" role="img" aria-label="Tilde">
  <rect x="13.8" y="7.9" width="4.4" height="16.2" rx="2.2" fill="#0E8A5F" transform="rotate(34 16 16)"/>
</svg>
```

On dark backgrounds, the same with `fill="#4ADE9E"`.

Three-tilde row (bullets in a row, the loader's resting frame):

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 16" width="40" height="16" aria-hidden="true">
  <g fill="#0E8A5F">
    <rect x="6.5" y="2.5" width="3" height="11" rx="1.5" transform="rotate(34 8 8)"/>
    <rect x="18.5" y="2.5" width="3" height="11" rx="1.5" transform="rotate(34 20 8)"/>
    <rect x="30.5" y="2.5" width="3" height="11" rx="1.5" transform="rotate(34 32 8)"/>
  </g>
</svg>
```

CSS (how the site draws it):

```css
.tilde { display: inline-block; width: 3px; height: 11px; border-radius: 2px;
         background: var(--fill); transform: rotate(34deg); }
```

Drawing it by hand (Figma, Keynote, PowerPoint, Google Slides, Illustrator): insert a rounded rectangle, set width and height in a 3 : 11 ratio (for example 0.08 × 0.29 in, or 3 × 11 px at 1×), set the corner radius to the maximum, rotate it 34° clockwise, fill it with the hex above and remove the outline.

### Uses

Each use is the same shape; only size, placement and behavior change.

| Use | Size (w × h) | Placement | Behavior |
|---|---|---|---|
| Navigation indicator | 3 × 11 px | Above the active menu item, 2px over the text, left-aligned with it | Springs to the new item: `left` over 500 ms, `cubic-bezier(.3, 1.45, .5, 1)` |
| Mobile tab bar indicator | 2.5 × 8 px | 4px from the top of the active tab | Same spring |
| Bullet | 3 × 10 px | Left of the line, top at .45em | Static |
| Link and row hover | 3 × 10 px | At the right end of the link or row | Fades in over 200 ms and slides in from (−4px, +4px) with the spring over 350 ms |
| Separator | 3 × 14 px, 18px each side | Between names in a list (the teams line) | Static |
| Button accent | 3 × 11 px | After the label of the primary button, in `fill-inv` (the button is ink) | Leans with the button |
| Progress marker | 3 × 11 px | Riding the end of a progress bar (60 s highlights) | Moves with the bar |
| Large accent | 8 × 30 px, radius 4px | Next to a portrait | Static |
| Favicon | `favicon.svg` (4 × 22 in a 32 box) | Browser tab | Switches green with the system theme |
| Loader | Three tildes, 3 × 11 px, 5px apart | Inline, where content is loading | Each fades .25 → 1 → .25 in turn, 900 ms loop, 150 ms apart. Reduced motion: three at full opacity, still. (Specified; the site has no loading states yet) |

### Logotype

- The wordmark is **Mauro Imán** set in Geist 700, tracking −.01em, in `ink`. The whole letter **á** (letter and accent) is `accent` green; every other letter stays ink. It is the typeface's own "á", not a drawn tilde placed over an "a".
- The large footer wordmark is **Imán** alone, Geist 800, tracking −.055em, same coloring, fitted by its ink bounds from column 1 to column 12.
- Never set the name in another typeface, never color more than the "á", never replace the accent with the tilde shape.

### Do and don't

- **Do** use the tilde to point at one thing: where you are, what is next, what you can click.
- **Do** keep it small. It is a mark, not an illustration; the largest use is 30px tall.
- **Don't** type `~` to represent it, even in a quick mockup or a slide.
- **Don't** use a dot, square or circle as a bullet or loader; the tilde is the bullet and the loader.
- **Don't** rotate it to another angle, mirror it, outline it, add a gradient or glow, or animate it in ways not listed above.
- **Don't** use more than one green moment per view: if the tilde is green, the rest of the view is ink.

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
  Lands under the sticky header (Home at 0), updates the hash and moves focus to the section (`tabindex=-1`). Wheel, touch or key interrupts it. Reduced motion: instant jump, no overlay, no seam. Safety timer lands it if frames stall. The 60 s tab is excluded.
- **Language switch (stream):** text in view resolves left→right out of "filings" (`/ \ | - ·` in `--ink-2` at 70%), keeping the new text's length so layout barely moves. Per element 160 ms + 12 ms/char (max 650 ms), ease-out, staggered top→bottom (max 260 ms). Glyphs refresh every 55 ms. Rich-text strings (`data-ih`) fade in over 450 ms instead. Text out of view changes instantly. Screen readers get the final text at once (visually hidden copy; the animated layer is `aria-hidden`). Reduced motion and first load: instant. Never on the language buttons themselves. A 1.1 s safety timer always lands the final text, even if frames stall; switching again mid-stream finishes the current one first.
- **Opening a case (home → case page):** the home and each case are separate pages (own URL, shareable, indexable), stitched so they read as one gesture:
  1. **Gather (home, 420 ms)** — clicking a case cover dims the page to 8% and fills the screen with filings on a 30px grid that turn from the resting field angle toward the case title, as if the magnet landed on it. Length 4→13px, longer near the title; the band within ~200px of it is green. Ease-out cubic.
  2. **Hand-off** — the final grid (magnet point, grid size, viewport) is stored in `sessionStorage` (`mi-arrive`, valid 5 s and only at the same width ±40px) so the case page starts from exactly those filings.
  3. **Cross-document View Transition** — header and tab bar keep their place (`view-transition-name`), the rest cross-fades in 300 ms. Browsers without support simply navigate.
  4. **Field (case page, ~1 s)** — the title becomes a bar magnet with its poles at the two ends. Every filing on screen (the handed-off grid, or a fresh 30px grid on a direct visit) turns to the dipole's field lines in a wave spreading out from the title (650 ms each, delay up to 380 ms by distance) and creeps up to 14px toward it. Filings get longer and turn green near the poles, so the arcs from pole to pole are readable before anything moves.
  5. **Pull** — from 950 ms the filings nearest the title (about one per three letter points) are pulled in along curved paths that start on their field line, oriented along their path, left to right (stagger 320 ms + up to 100 ms jitter, flight 820 ms, out-back ease, 1.3px lines, sample step = font size / 28, 4–7px), and turn to the resting angle as they land. The rest stay as the field. At 2.3 s, after the last filing lands, the real H1 fades in and the field dissolves (500 ms) into the background field; back link, label, lead and facts stagger in (0.04 / 0.12 / 0.22 s). Everything except the H1 stays hidden until then; a 4 s CSS fallback shows it all if scripts fail.
  **Variant B "sweep"** (an alternative to "pull" above): filings never travel. As if a strong magnet slid behind a plastic lid, it sweeps across the hero (right→left by default, left→right as an option) in 1.3 s (sine in-out, starting just off screen). Every filing turns toward it as it passes, on a spring (stiff only while the magnet is near, light damping, so they wobble and then freeze in the lean they had when it left). Background filings (30px grid, or the home's hand-off grid) stretch and turn green in the band around the magnet. Filings on a fine grid inside the letters (step = font size / 28) only appear once the magnet is right over them, so the title forms in its wake. The real H1 fades in 420 ms after the sweep ends.
  *Visibility:* sweep slowed to 1.7 s and starts only half a band off screen; a soft green glow (12%, fades in and out with the sweep) travels with the magnet; stiffer, less damped spring (more wobble); background filings keep an afterglow (decays in ~0.6 s) so the magnet leaves a visible wake of longer, brighter filings; phones get 1.6px, longer filings. Letters get no afterglow and settle to one shared lean once combed, so the title stays legible. Reveal at ~2.3 s.
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
- **About teaser:** portrait mat (4:5, `--panel`) + short bio + link.
- **Closing CTA:** one per page. Heading, ink button and the ferrofluid drop below it. Next to the button, "Copy email" that confirms visibly and through `role="status"`.
- **Footer:** local time in Córdoba, Argentina, availability, site and external links, settings (Field, Theme, Language, Top), and a link to download this file. The "Imán" wordmark spans the full width and bleeds off the bottom; it is `aria-hidden` because the name is also present as text.
- **Search:** closed by default as a pill; opens with click or ⌘K / Ctrl+K, closes with Esc.

## Accessibility (WCAG 2.2 AA)

- Contrast as specified above; never place body text over an active field.
- Visible focus: 2px `--accent` outline, 3px offset.
- Targets of at least 24×24px (44px for primary actions).
- Every canvas is `aria-hidden`; all meaning is also in text.
- Full keyboard paths for search, case opening and closing, highlights and chapters.
- `lang` set per page and on language switches. A skip link ("Skip to content") is the first focusable element.
- One H1 per page; headings never skip levels.

## Performance budget

Motion is the brand, so it has to feel smooth on a mid-range Android phone, not only on a laptop. The cost is painting canvases, not JavaScript. Rules:

- **Pixel density:** decorative canvases render at most 2× on fine pointers and 1.5× on touch screens; 1× at reduced quality. Thin filings stay crisp at 1.5×.
- **Frame rate:** 60 fps on fine pointers, 30 fps on touch screens (hero, fields, ferrofluid, footer). Canvas loops run only while their section is on screen (IntersectionObserver) and pause while the magnetic scroll is running (its own overlay is the only thing drawn).
- **Adaptive quality:** every loop feeds the real frame interval into one shared monitor. If frames stay slower than ~24 ms for 1.5 s, quality steps down once: level 1 = density 1×, filings 30% sparser, half the flow particles; level 0 = also half the frame rate. It never steps back up within the visit.
- **Batching:** filings are drawn as one path per opacity band (4 strokes per field per frame), never one stroke per filing.
- **Production:** move the field math to an OffscreenCanvas worker where available, and lazy-start fields below the fold. Test on a mid-range Android (e.g. Galaxy A series) before shipping; target ≥ 50 fps while scrolling the home.

## Other media

How the system carries outside the browser: slide decks, documents, social images, print.

- **Fonts:** Geist and Geist Mono are free (Google Fonts, Vercel). Install them before building. If a tool cannot load them, use Inter and IBM Plex Mono, keep the weights and tracking, and say so.
- **Background:** a whole artifact is either light (`paper` `#EDEFEE`, text `ink` `#0E1311`) or dark (`paper` `#0B0F0D`, text `#E6EBE8`). Do not mix themes inside one deck or page.
- **Layout:** the 12-column grid. Mono labels in columns 1–3, content in columns 4–12. Generous margins; at least 1/12 of the width on each side.
- **Slide pattern:** a mono uppercase label at the top left (`ink-2`, letter-spacing .06em), a Geist 700 headline with tight tracking (−.03em) and line-height 1, then content. Cards are `panel` with a 6px radius, no border or a 1px `line` border, no shadow.
- **Card pattern:** a tilde (or a short mono label) at the top left, a Geist 700 title, one or two lines of `ink-2` text. Left-aligned; centered text only for a single short statement.
- **Images and screenshots:** on a `panel` mat with a 6px radius. Never recolor or invert screenshots.
- **Charts:** ink and `ink-2` for data, `fill` green for the one series or value that matters, `line` for gridlines. No 3D, no gradients.
- **Iconography:** none by default. If an artifact truly needs icons, use simple 1.5px outline icons in `ink`, never green, never filled.

## Reproduction checklist

Before delivering a page, deck or image made with this system:

- [ ] The tilde is the SVG shape (rounded bar, 3 : 11, 34° to the right), not `~`, a dot or a square.
- [ ] Only one green element per view.
- [ ] Only the "á" of "Imán" is green in the name.
- [ ] Geist for text, Geist Mono for labels (or the stated fallback).
- [ ] Colors are the exact hex values above, from one theme only.
- [ ] Content sits on the 12-column grid; labels in 1–3, content in 4–12.
- [ ] No gradients, glows, shadows, stock icons or emoji.
- [ ] Text contrast meets WCAG 2.2 AA (4.5 : 1 for text, 3 : 1 for graphics).

## Changes to the system

System-level changes only. The site's full changelog is in `SITE.md`.

- 2026-11-17 — v1.0: published as a standalone, downloadable design system. Brand signature specified with exact geometry, canonical SVG, sizes per use, logotype rules and do/don't; machine-readable tokens; guidance for other media and a reproduction checklist.
- 2026-11-11 — Concept Imán / Field, palette Verde ferrita, voice Producto (Geist + Geist Mono).
