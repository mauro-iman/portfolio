/* Content loader: reads the YAML files in src/content and turns them into the key → text dictionaries
   the pages render at build time and site.js uses to switch language in place. */
import fs from 'node:fs';
import path from 'node:path';
import yaml from 'js-yaml';

const dir = path.resolve('src/content');
const read = f => yaml.load(fs.readFileSync(path.join(dir, f), 'utf8'));

export const LANGS = ['en', 'es'];
export const site = read('site.yaml');
export const cases = fs.readdirSync(path.join(dir, 'cases'))
  .filter(f => f.endsWith('.yaml'))
  .map(f => ({ slug: f.replace(/\.yaml$/, ''), ...read(path.join('cases', f)) }))
  .sort((a, b) => a.order - b.order);

export const nextOf = c => cases[(cases.indexOf(c) + 1) % cases.length];

/* Lighter project pages (src/content/projects): group "building" shows in "Building now" on the home,
   "work" gets a page and a link in "More work", "list" is listed without a page (NDA, coming soon). */
export const projects = fs.readdirSync(path.join(dir, 'projects'))
  .filter(f => f.endsWith('.yaml'))
  .map(f => ({ slug: f.replace(/\.yaml$/, ''), ...read(path.join('projects', f)) }))
  .sort((a, b) => a.order - b.order);
export const building = projects.filter(p => p.group === 'building');
export const more = projects.filter(p => p.group !== 'building');
export const paged = projects.filter(p => p.group !== 'list');
export const nextProject = p => { const g = projects.filter(x => x.group === p.group && x.group !== 'list'); return g[(g.indexOf(p) + 1) % g.length]; };

/* Base URL with a trailing slash, e.g. "/portfolio/" on GitHub Pages or "/" on the root domain. */
export const BASE = (import.meta.env.BASE_URL || '/').replace(/\/?$/, '/');
/* Language-neutral path ("", "work/compass/", "#work") → URL for a language. */
export const url = (lang, p = '') => BASE + (lang === 'es' ? 'es/' : '') + p;

/* Keys every page needs for the case cards, the next-case link and the 60 s highlights. */
const cardKeys = (c, l) => {
  const d = c[l];
  return {
    [`case.${c.slug}.k`]: `${d.sector} · ${d.years}`,
    [`case.${c.slug}.t`]: c.title,
    [`case.${c.slug}.s`]: d.summary,
    [`case.${c.slug}.m`]: d.homeMetricLabel,
    [`case.${c.slug}.hl`]: d.highlight
  };
};

/* Keys for one case page. Names match the data-i attributes in Case.astro. */
const caseKeys = (c, l) => {
  const d = c[l], s = site[l], o = {
    'c.doc': `${c.title} — ${s['c.doc.suffix']}`,
    'c.kicker': `${s['c.label']} · ${d.sector} · ${d.years}`,
    'c.f.roleV': d.role, 'c.f.scopeV': d.scope, 'c.f.teamV': d.team, 'c.f.timeV': d.timeline,
    'c.cover': d.coverAlt,
    'c.q.pV': d.problem, 'c.q.dV': d.did, 'c.q.rV': d.result,
    'c.story.h': d.story.title, 'c.did.h': d.work.title,
    'c.ref.q': d.reflection, 'c.ref.next': `${s['c.whatnext']}: ${d.next}`,
    ...(d.demo || {})
  };
  d.metrics.forEach((m, i) => { o[`c.mv${i + 1}`] = m.value; o[`c.m${i + 1}`] = m.label; });
  d.story.chapters.forEach((ch, i) => { const n = i + 1; Object.assign(o, { [`c.s${n}.k`]: ch.kicker, [`c.s${n}.h`]: ch.title, [`c.s${n}.p`]: ch.text, [`c.s${n}.ph`]: ch.data }); });
  d.work.items.forEach((w, i) => { const n = i + 1; Object.assign(o, { [`c.w${n}.h`]: w.title, [`c.w${n}.p`]: w.text, [`c.w${n}.ph`]: w.screen }); });
  (c.screens || []).forEach((g, i) => { o[`c.g${i}`] = g[l]; });
  (c.phones || []).forEach((g, i) => { o[`c.p${i}`] = g[l]; });
  /* image alt text: the gallery caption when the image is also in the gallery, else the workstream title */
  const cap = f => { const all = [...(c.screens || []), ...(c.phones || [])]; const g = all.find(x => x.file === f); return g && g[l]; };
  (c.workImages || []).forEach((f, i) => { if (f) o[`c.w${i + 1}.alt`] = cap(f) || d.work.items[i]?.title; });
  return o;
};

/* Keys for a project card (home lists, next link) and for a project page. */
const projectCardKeys = (p, l) => {
  const d = p[l];
  return { [`proj.${p.slug}.k`]: [d.sector, d.years].filter(Boolean).join(' · '), [`proj.${p.slug}.t`]: p.title, [`proj.${p.slug}.s`]: d.summary || '', [`proj.${p.slug}.r`]: d.role || '' };
};
const projectKeys = (p, l) => {
  const d = p[l], s = site[l], o = {
    'c.doc': `${p.title} — ${s['c.doc.suffix']}`,
    'p.kicker': `${s[p.group === 'building' ? 'p.label.build' : 'p.label']} · ${d.sector} · ${d.years}`,
    'p.roleV': d.role, 'p.timeV': d.timeline || d.years, 'p.teamV': d.team || '', 'p.note': d.note || '',
    'p.didL': d.didLabel || s['c.did'], 'p.res': d.results || ''
  };
  (d.did || []).forEach((x, i) => { o[`p.did${i}`] = x; });
  (d.sections || []).forEach((sec, i) => {
    o[`p.s${i}.h`] = sec.title; if (sec.text) o[`p.s${i}.p`] = sec.text; if (sec.kicker) o[`p.s${i}.k`] = sec.kicker;
    (sec.items || []).forEach((it, j) => { o[`p.s${i}.i${j}`] = it; });
  });
  (p.screens || []).forEach((g, i) => { o[`c.g${i}`] = g[l]; });
  (p.phones || []).forEach((g, i) => { o[`c.p${i}`] = g[l]; });
  (p.videos || []).forEach((v, i) => { o[`c.v${i}`] = v[l]; });
  if (d.galleryTitle) o['c.gal.h'] = d.galleryTitle;
  if (p.coverImage) o['c.cover'] = d.coverAlt || p.title;
  return o;
};

/* Dictionary for a page, both languages: site copy + every case card + this case's copy. */
export const dict = (current, project) => Object.fromEntries(LANGS.map(l => {
  const o = { ...site[l] };
  cases.forEach(c => Object.assign(o, cardKeys(c, l)));
  projects.forEach(p => Object.assign(o, projectCardKeys(p, l)));
  if (current) Object.assign(o, caseKeys(current, l));
  if (project) Object.assign(o, projectKeys(project, l));
  return [l, o];
}));

export const translator = (D, lang) => k => D[lang][k] ?? D.en[k] ?? k;
