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
  return o;
};

/* Dictionary for a page, both languages: site copy + every case card + this case's copy. */
export const dict = (current) => Object.fromEntries(LANGS.map(l => {
  const o = { ...site[l] };
  cases.forEach(c => Object.assign(o, cardKeys(c, l)));
  site.archive.forEach((a, i) => { o[`arch.${i}`] = a[l]; });
  if (current) Object.assign(o, caseKeys(current, l));
  return [l, o];
}));

export const translator = (D, lang) => k => D[lang][k] ?? D.en[k] ?? k;
