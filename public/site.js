(() => {
  /* ── Copy deck (DESIGN.md) ── */
  /* Copy comes from the page: Astro renders it from src/content and injects both languages (window.MI.D). */
  const MI = window.MI || { D: { en: {}, es: {} }, lang: 'en', base: '/', path: '', cases: [] };
  const T = MI.D;
  let lang = MI.lang;
  const t = k => T[lang][k] ?? T.en[k] ?? k;

  /* ── Shared ── */
  const store = { get: k => { try { return localStorage.getItem(k); } catch (e) { return null; } }, set: (k, v) => { try { v == null ? localStorage.removeItem(k) : localStorage.setItem(k, v); } catch (e) {} } };
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fine = matchMedia('(pointer: fine)').matches;
  const narrowQ = matchMedia('(max-width: 760px)');
  const root = document.documentElement;
  const tok = n => getComputedStyle(root).getPropertyValue(n).trim();
  const readColors = () => ({ ink: tok('--ink'), acc: tok('--fill'), paper: tok('--paper') });
  let colors = readColors();
  const hash = (x, y) => { const s = Math.sin(x * 12.9898 + y * 78.233) * 43758.5453; return s - Math.floor(s); };
  const ORDER = -0.98, clamp = (v, a, b) => Math.min(b, Math.max(a, v));
  let fieldOn = store.get('mi-field') !== 'off';
  const fields = [];
  /* ── Performance budget (DESIGN.md › Performance) ──
     lvl 2 = full · 1 = lighter (DPR 1, 30% sparser filings, half the flow) · 0 = also half frame rate.
     Steps down on its own when the device keeps missing frames for 1.5 s. */
  const Q = { lvl: 2, dpr: () => Math.min(devicePixelRatio || 1, Q.lvl >= 2 ? (fine ? 2 : 1.5) : 1), sp: () => Q.lvl >= 2 ? 1 : 1.3, fpsCap: () => (fine ? 60 : 30) / (Q.lvl >= 1 ? 1 : 2) };
  const canvases = []; let emaDt = 16.7, slowSince = 0;
  const watchFrame = dt => {
    if (dt > 120 || dt <= 0) return; emaDt += (dt - emaDt) * .06;
    if (emaDt < 24 || Q.lvl === 0) { slowSince = 0; return; }
    const now = performance.now(); if (!slowSince) { slowSince = now; return; }
    if (now - slowSince > 1500) { Q.lvl--; slowSince = 0; emaDt = 16.7; fields.forEach(f => f.resize()); canvases.forEach(c => c.rs()); dispatchEvent(new Event('mi-quality')); }
  };
  window.__mi = { Q };
  const local = (el, e) => { const r = el.getBoundingClientRect(); return { x: e.clientX - r.left, y: e.clientY - r.top }; };
  const whenVisible = (el, fn, fps = 60) => {
    let vis = false, raf = 0, last = 0, prev = 0;
    const loop = n => {
      if (prev) watchFrame(n - prev); prev = n;
      /* capped per device and quality; paused while the magnetic scroll owns the screen */
      if (n - last >= 1000 / Math.min(fps, Q.fpsCap()) - 2 && !root.classList.contains('pulling')) { last = n; fn(n); }
      raf = vis ? requestAnimationFrame(loop) : 0; if (!raf) prev = 0;
    };
    new IntersectionObserver(([e]) => { vis = e.isIntersecting; if (vis && !raf) raf = requestAnimationFrame(loop); }).observe(el);
  };
  const fitCanvas = cv => {
    const o = { cv, ctx: cv.getContext('2d'), W: 0, H: 0 };
    const rs = () => { const r = cv.getBoundingClientRect(); if (!r.width) return; const d = Q.dpr(); o.W = r.width; o.H = r.height; cv.width = o.W * d; cv.height = o.H * d; o.ctx.setTransform(d, 0, 0, d, 0, 0); };
    o.rs = rs; canvases.push(o); new ResizeObserver(rs).observe(cv); rs(); return o;
  };

  /* ── Field: iron filings around a dipole ── */
  class Field {
    constructor(cv, o = {}) {
      this.cv = cv; this.ctx = cv.getContext('2d');
      this.o = Object.assign({ spacing: 20, alpha: 1, orbit: false, dot: true, strength: 1, home: [.66, .5] }, o);
      this.mag = { x: 0, y: 0 }; this.target = null; this.rest = null;
      this.align = this.alignT = this.o.align || 0; this.alpha = this.alphaT = fieldOn ? 1 : 0; this.wake = 0; this.chaos = this.chaosT = 0;
      this.t0 = performance.now(); this.pulses = []; this.inited = false;
      new ResizeObserver(() => this.resize()).observe(cv); fields.push(this); this.resize();
    }
    resize() {
      const r = this.cv.getBoundingClientRect(); if (!r.width) return;
      this.dpr = Q.dpr(); this.W = r.width; this.H = r.height;
      this.cv.width = this.W * this.dpr; this.cv.height = this.H * this.dpr; this.ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
      if (!this.inited) { this.mag.x = this.W * this.o.home[0]; this.mag.y = this.H * this.o.home[1]; this.inited = true; }
      this.draw(performance.now());
    }
    pulse(x, y) { this.pulses.push({ x, y, t: performance.now() }); }
    draw(now) {
      const { ctx, W, H } = this; if (!W) return;
      const t = now - this.t0; let tx, ty;
      if (this.target) { tx = this.target.x; ty = this.target.y; }
      else if (this.rest) { tx = this.rest.x; ty = this.rest.y; }
      else if (this.o.orbit && !reduce) { tx = W * .5 + Math.cos(t * .00035) * W * .26; ty = H * .5 + Math.sin(t * .0006) * H * .28; }
      else { tx = W * this.o.home[0]; ty = H * this.o.home[1]; }
      const k = reduce ? 1 : .08; this.mag.x += (tx - this.mag.x) * k; this.mag.y += (ty - this.mag.y) * k;
      this.align += (this.alignT - this.align) * (reduce ? 1 : .06);
      this.alpha += (this.alphaT - this.alpha) * (reduce ? 1 : .1);
      this.chaos += (this.chaosT - this.chaos) * (reduce ? 1 : .05);
      if (this.o.wake) this.wake += ((this.target ? 1 : 0) - this.wake) * (reduce ? 1 : .08);
      ctx.clearRect(0, 0, W, H);
      const ga = this.alpha * this.o.alpha; if (ga < .01) return;
      const th = reduce ? 0 : t * .00018, mx = Math.cos(th), my = Math.sin(th);
      const s = this.o.spacing * (W < 500 ? .85 : 1) * Q.sp(), R = Math.max(W, H) * .32 * this.o.strength, A0 = this.align, WK = this.wake, C = this.chaos;
      const ox = Math.cos(ORDER), oy = Math.sin(ORDER);
      const P = [new Path2D(), new Path2D(), new Path2D(), new Path2D()];
      for (let y = s / 2; y < H; y += s) for (let x = s / 2; x < W; x += s) {
        const rx = x - this.mag.x, ry = y - this.mag.y, d = Math.hypot(rx, ry);
        const A = WK > .01 ? A0 * (1 - WK * Math.exp(-d / 90) * .95) : A0;
        if (d < 10 && A < .5) continue;
        const ux = rx / (d || 1), uy = ry / (d || 1), dt = mx * ux + my * uy;
        let bx = 3 * dt * ux - mx, by = 3 * dt * uy - my; const bl = Math.hypot(bx, by) || 1; bx /= bl; by /= bl;
        if (bx * ox + by * oy < 0) { bx = -bx; by = -by; }
        let vx = bx * (1 - A) + ox * A, vy = by * (1 - A) + oy * A; const vl = Math.hypot(vx, vy) || 1; vx /= vl; vy /= vl;
        if (C > .01) { const h = hash(x, y), a = ((h - .5) * Math.PI * 2 + (reduce ? 0 : Math.sin(t * .0004 + h * 6.283) * .5)) * C, ca = Math.cos(a), sa = Math.sin(a), nx = vx * ca - vy * sa; vy = vx * sa + vy * ca; vx = nx; }
        const f = Math.exp(-d / R) * (1 - A * .8) * (1 - C * .55), L = (2.5 + 6.5 * f) * (1 - A) + 3.2 * A;
        const b = f > .62 ? 0 : f > .4 ? 1 : f > .22 ? 2 : 3;
        P[b].moveTo(x - vx * L, y - vy * L); P[b].lineTo(x + vx * L, y + vy * L);
      }
      ctx.lineCap = 'round'; ctx.lineWidth = 1.4;
      ctx.globalAlpha = .95 * ga; ctx.strokeStyle = colors.acc; ctx.stroke(P[0]);
      ctx.strokeStyle = colors.ink;
      ctx.globalAlpha = .55 * ga; ctx.stroke(P[1]); ctx.globalAlpha = .32 * ga; ctx.stroke(P[2]); ctx.globalAlpha = (.16 + A0 * .06) * ga; ctx.stroke(P[3]);
      this.pulses = this.pulses.filter(p => now - p.t < 900); ctx.strokeStyle = colors.acc;
      this.pulses.forEach(p => { const q = (now - p.t) / 900; ctx.globalAlpha = (1 - q) * .8 * ga; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.arc(p.x, p.y, 8 + q * 90, 0, Math.PI * 2); ctx.stroke(); });
      if (this.o.dot && A0 < .5) { ctx.globalAlpha = ga * (1 - A0 * 2); ctx.fillStyle = colors.acc; ctx.beginPath(); ctx.arc(this.mag.x, this.mag.y, 4, 0, Math.PI * 2); ctx.fill(); }
      ctx.globalAlpha = 1;
    }
  }
  const dipoleB = (f, x, y, now) => {
    const th = reduce ? 0 : (now - f.t0) * .00018, mx = Math.cos(th), my = Math.sin(th);
    const rx = x - f.mag.x, ry = y - f.mag.y, d = Math.hypot(rx, ry) || 1, ux = rx / d, uy = ry / d, dt = mx * ux + my * uy;
    let bx = 3 * dt * ux - mx, by = 3 * dt * uy - my; const bl = Math.hypot(bx, by) || 1;
    return [bx / bl, by / bl, d];
  };

  /* ── Language ── */
  /* Language stream: new text resolves left→right out of "filings" (see DESIGN.md › Motion › Language switch) */
  const GLY = '/\\|-·', inView = el => { if (!el.getClientRects().length) return false; const r = el.getBoundingClientRect(); return r.bottom > 0 && r.top < innerHeight && r.width > 0; };
  let streamRaf = 0, streamSafe = 0, streaming = [];
  const endStream = () => { cancelAnimationFrame(streamRaf); clearTimeout(streamSafe); streaming.forEach(it => { it.el.textContent = it.txt; }); streaming = []; };
  const stream = items => {
    if (!items.length) return;
    streamSafe = setTimeout(() => { endStream(); settleNav(); settleTabs(); }, 1100); /* never leave filings on screen if frames stall */
    const top = Math.min(...items.map(it => it.y)), t0 = performance.now();
    items.forEach(it => {
      it.delay = Math.min(260, Math.max(0, it.y - top) * .35); it.dur = Math.min(650, 160 + it.txt.length * 12);
      it.el.textContent = ''; const sr = document.createElement('span'); sr.className = 'vh'; sr.textContent = it.txt;
      const vis = document.createElement('span'); vis.setAttribute('aria-hidden', 'true'); it.a = document.createElement('span'); it.g = document.createElement('span'); it.g.className = 'strm-g';
      vis.append(it.a, it.g); it.el.append(sr, vis); it.g.textContent = it.txt.replace(/\S/g, () => GLY[Math.random() * GLY.length | 0]);
    });
    streaming = items; let lastG = 0;
    const frame = now => {
      const reGlyph = now - lastG > 55; if (reGlyph) lastG = now; let live = 0;
      for (const it of items) {
        const q = clamp((now - t0 - it.delay) / it.dur, 0, 1), e = 1 - Math.pow(1 - q, 2), n = Math.round(e * it.txt.length);
        if (q < 1) live++;
        if (reGlyph) it.gs = it.txt.replace(/\S/g, () => GLY[Math.random() * GLY.length | 0]); if (n !== it.n || reGlyph) { it.n = n; it.a.textContent = it.txt.slice(0, n); it.g.textContent = it.gs.slice(n); }
      }
      if (live) streamRaf = requestAnimationFrame(frame); else { endStream(); settleNav(); settleTabs(); }
    };
    streamRaf = requestAnimationFrame(frame);
  };
  const applyLang = (l, animate = true) => {
    endStream(); lang = l; root.lang = l; store.set('mi-lang', l);
    const anim = animate && !reduce, items = [];
    document.querySelectorAll('[data-i]').forEach(el => { const txt = t(el.dataset.i); if (anim && txt.length > 1 && inView(el)) items.push({ el, txt, y: el.getBoundingClientRect().top }); else el.textContent = txt; });
    document.querySelectorAll('[data-ih]').forEach(el => { el.innerHTML = t(el.dataset.ih); if (anim && inView(el)) { el.classList.remove('strm-f'); void el.offsetWidth; el.classList.add('strm-f'); } });
    stream(items);
    document.querySelectorAll('[data-ia]').forEach(el => { el.alt = t(el.dataset.ia); });
    document.querySelectorAll('[data-il]').forEach(el => { el.setAttribute('aria-label', (el.dataset.ilPre ? t(el.dataset.ilPre) + ': ' : '') + t(el.dataset.il)); });
    const other = l === 'en' ? 'es' : 'en';
    const lt = document.getElementById('langTop'); lt.textContent = other.toUpperCase(); lt.lang = other; lt.setAttribute('aria-label', other === 'es' ? 'Español' : 'English');
    const lf = document.getElementById('langFoot'); lf.textContent = other === 'es' ? 'Español' : 'English'; lf.lang = other;
    /* the page now shows the other language: point the address, internal links and language links at it */
    const urlFor = (lg, p) => MI.base + (lg === 'es' ? 'es/' : '') + p;
    if (animate) try { history.replaceState(history.state, '', urlFor(l, MI.path) + location.hash); } catch (e) {}
    document.querySelectorAll('[data-l]').forEach(a => { a.href = urlFor(l, a.dataset.l); });
    [lt, lf].forEach(a => { a.href = urlFor(other, MI.path); a.hreflang = other; });
    document.getElementById('hloSteps').setAttribute('aria-label', t('hl.aria'));
    document.getElementById('themeSeg').setAttribute('aria-label', t('foot.theme'));
    fieldLabel(); tick(); buildSteps(); fitWord(); requestAnimationFrame(() => { settleNav(); settleTabs(); });
  };

  /* ── Theme ── */
  const themeBtns = [...document.querySelectorAll('#themeSeg button')];
  const applyTheme = th => {
    if (th === 'light' || th === 'dark') root.setAttribute('data-theme', th); else root.removeAttribute('data-theme');
    store.set('mi-theme', th === 'system' ? null : th);
    themeBtns.forEach(b => b.setAttribute('aria-pressed', String(b.dataset.t === th)));
    colors = readColors(); fields.forEach(f => f.draw(performance.now()));
  };
  themeBtns.forEach(b => b.addEventListener('click', () => applyTheme(b.dataset.t)));
  themeBtns.forEach(b => b.setAttribute('aria-pressed', String(b.dataset.t === (root.getAttribute('data-theme') || 'system'))));
  matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => { colors = readColors(); fields.forEach(f => f.draw(performance.now())); });

  /* ── Field switch ── */
  const fieldBtn = document.getElementById('fieldBtn'), fieldL = document.getElementById('fieldL');
  function fieldLabel() { fieldL.textContent = `${t('foot.field')} · ${fieldOn ? t('foot.on') : t('foot.off')}`; fieldBtn.setAttribute('aria-pressed', String(fieldOn)); }
  fieldBtn.addEventListener('click', () => { fieldOn = !fieldOn; store.set('mi-field', fieldOn ? null : 'off'); fields.forEach(f => f.alphaT = fieldOn ? 1 : 0); fieldLabel(); });

  /* ── Header, nav tilde, scroll spy, tabs ── */
  const top = document.getElementById('top'), nav = document.getElementById('nav'), navTilde = document.getElementById('navTilde');
  const navLinks = [...nav.querySelectorAll('a')], tabs = document.getElementById('tabs'), tabTilde = document.getElementById('tabTilde'), tabLinks = [...tabs.querySelectorAll('a')];
  const base = document.body.dataset.base || 'home'; let current = ''; /* empty so the first spy() marks the page's section */
  const tildeTo = (tl, el, host) => { const r = el.getBoundingClientRect(), h = host.getBoundingClientRect(); tl.style.left = (r.left - h.left + r.width / 2 - 1.5) + 'px'; };
  function settleNav() { const a = navLinks.find(l => l.dataset.sec === current); navTilde.style.opacity = a ? 1 : 0; if (a) tildeTo(navTilde, a, nav); }
  function settleTabs() { const a = tabLinks.find(l => l.dataset.sec === current) || tabLinks[0]; tildeTo(tabTilde, a, tabs); }
  navLinks.forEach(a => a.addEventListener('pointerenter', () => { navTilde.style.opacity = 1; tildeTo(navTilde, a, nav); }));
  nav.addEventListener('pointerleave', settleNav);
  const secs = ['home', 'work', 'highlights', 'about', 'contact'].map(id => document.getElementById(id)).filter(Boolean);
  const spy = () => {
    top.classList.toggle('scrolled', scrollY > 8);
    const y = scrollY + innerHeight * .4; let id = base;
    secs.forEach(s => { if (s.offsetTop <= y) id = s.id; });
    if (id !== current) {
      current = id;
      navLinks.forEach(a => a.setAttribute('aria-current', String(a.dataset.sec === id)));
      tabLinks.forEach(a => a.setAttribute('aria-current', String(a.dataset.sec === id || (id === 'contact' && a.dataset.sec === 'about'))));
      settleNav(); settleTabs();
    }
  };
  addEventListener('scroll', spy, { passive: true });
  new ResizeObserver(() => { settleNav(); settleTabs(); }).observe(document.body);
  document.fonts && document.fonts.ready.then(() => { settleNav(); settleTabs(); fitWord(); });

  /* ── Magnetic buttons (fine pointers only) ── */
  if (fine && !reduce) document.querySelectorAll('[data-mag]').forEach(el => {
    el.addEventListener('pointermove', e => { const r = el.getBoundingClientRect(); el.style.transform = `translate(${((e.clientX - r.left - r.width / 2) * .15).toFixed(1)}px, ${((e.clientY - r.top - r.height / 2) * .25).toFixed(1)}px)`; });
    el.addEventListener('pointerleave', () => { el.style.transform = ''; });
  });

  /* ── 1 Hero: full field + magnetite flow ── */
  if (document.getElementById('fHero')) {
    const st = document.getElementById('home'), f = new Field(document.getElementById('fHero'), { spacing: 21, alpha: .5, home: narrowQ.matches ? [.72, .16] : [.74, .36] });
    const P = fitCanvas(document.getElementById('fHeroP'));
    let parts = [], dragging = false, held = 0;
    addEventListener('mi-quality', () => { if (Q.lvl < 2) parts.length = Math.floor(parts.length / 2); });
    const spawn = p => { const a = Math.random() * Math.PI * 2, r = 16 + Math.random() * Math.min(P.W, P.H) * .55; p.x = f.mag.x + Math.cos(a) * r; p.y = f.mag.y + Math.sin(a) * r; p.life = 0; p.max = 70 + Math.random() * 110; p.dir = Math.random() < .5 ? 1 : -1; p.trail = []; };
    const step = (p, now, sp0) => {
      const [bx, by, d] = dipoleB(f, p.x, p.y, now), fall = Math.exp(-d / (Math.max(P.W, P.H) * .32));
      const sp = (.45 + 2.3 * fall) * sp0; p.x += bx * sp * p.dir; p.y += by * sp * p.dir; p.life += sp0; p.fall = fall;
      p.trail.push(p.x, p.y); if (p.trail.length > 22) p.trail.splice(0, 2);
      if (p.life > p.max || d < 9 || p.x < -10 || p.y < -10 || p.x > P.W + 10 || p.y > P.H + 10) spawn(p);
    };
    st.addEventListener('pointermove', e => { if (e.pointerType === 'mouse' || dragging) f.target = local(st, e); });
    st.addEventListener('pointerdown', e => { if (e.target.closest('a, button')) return; const p = local(st, e); f.target = p; f.pulse(p.x, p.y); dragging = e.pointerType !== 'mouse'; });
    const rel = () => { if (dragging) { dragging = false; held = performance.now(); } };
    st.addEventListener('pointerup', rel); st.addEventListener('pointercancel', rel);
    st.addEventListener('pointerleave', e => { if (e.pointerType === 'mouse') f.target = null; rel(); });
    whenVisible(st, now => {
      const p = clamp(scrollY / (st.offsetHeight * .7), 0, 1);
      f.alignT = p * .9;
      if (!fine && !dragging && f.target && now - held > 1800) f.target = null;
      f.draw(now);
      const { ctx, W, H } = P; if (!W) return;
      ctx.clearRect(0, 0, W, H);
      const sp0 = reduce ? 0 : 1 - p; if (!fieldOn || f.alpha < .05) return;
      if (!parts.length) { const n = W < 600 ? 100 : 210; for (let i = 0; i < n; i++) { const q = {}; spawn(q); q.life = Math.random() * q.max; parts.push(q); if (reduce) for (let k = 0; k < 14; k++) step(q, now, 1); } }
      ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.lineWidth = 1.2;
      const fade = (1 - p) * f.alpha;
      for (const q of parts) {
        if (sp0 > .02) step(q, now, sp0);
        const tr = q.trail; if (tr.length < 4) continue;
        const green = q.fall > .42;
        ctx.globalAlpha = Math.sin(Math.PI * clamp(q.life / q.max, 0, 1)) * (green ? .82 : .42) * fade;
        ctx.strokeStyle = green ? colors.acc : colors.ink;
        ctx.beginPath(); ctx.moveTo(tr[0], tr[1]); for (let i = 2; i < tr.length; i += 2) ctx.lineTo(tr[i], tr[i + 1]); ctx.stroke();
      }
      ctx.globalAlpha = 1;
    }, narrowQ.matches ? 30 : 60);
  }

  /* ── 2 Work: index field + magnetic film on covers ── */
  if (document.getElementById('fWork')) {
    const sec = document.getElementById('work'), cv = document.getElementById('fWork');
    const f = new Field(cv, { spacing: 22, alpha: .55, strength: .8, home: [.8, .7], dot: false });
    let hoverCard = null;
    document.querySelectorAll('[data-case]').forEach(c => {
      c.addEventListener('pointerenter', () => hoverCard = c); c.addEventListener('pointerleave', () => hoverCard = null);
      c.addEventListener('click', e => { if (c.getAttribute('href').startsWith('#')) e.preventDefault(); });
    });
    whenVisible(cv, now => {
      if (hoverCard) { const r = hoverCard.getBoundingClientRect(), s = cv.getBoundingClientRect(); f.target = { x: r.left - s.left + r.width / 2, y: f.H * .95 }; } else f.target = null;
      f.draw(now);
    }, 45);
  }

  /* ── Structure film on every case cover (DESIGN.md › Magnetic fluids › 2) ── */
  {
    // structure film (x-ray): the lens shows each cover as a wireframe on green film
    const NOTES = {
      compass: [['Navigation', 4, 14], ['KPI cards', 30, 30], ['Data table · 4 cols', 30, 52], ['Status token', 70, 78]],
      ypf: [['Route', 46, 50], ['Origin', 14, 70], ['Destination', 66, 34]],
      statlink: [['Navigation', 4, 14], ['Profile card', 28, 34], ['Avatar', 56, 30], ['Role tag', 40, 70]]
    };
    const filmTexture = (cv, W, H) => {
      const SC = 4, n = Math.ceil(W / SC), m = Math.ceil(H / SC), b = document.createElement('canvas'); b.width = n; b.height = m;
      const bc = b.getContext('2d'), img = bc.createImageData(n, m), D = img.data;
      const a = Math.min(W, H) * .3, cx = W * .5, cy = H * .5, ox = Math.cos(ORDER) * a, oy = Math.sin(ORDER) * a;
      for (let j = 0; j < m; j++) for (let i = 0; i < n; i++) {
        const px = i * SC, py = j * SC, psi = Math.atan2(py - cy - oy, px - cx - ox) - Math.atan2(py - cy + oy, px - cx + ox);
        const v = Math.pow(.5 + .5 * Math.cos(psi * 12), 3) * .35, k = (j * n + i) * 4;
        D[k] = 10 + 64 * v; D[k + 1] = 61 + 161 * v; D[k + 2] = 43 + 115 * v; D[k + 3] = 255;
      }
      bc.putImageData(img, 0, 0);
      const d = Math.min(devicePixelRatio || 1, 2); cv.width = W * d; cv.height = H * d;
      const c = cv.getContext('2d'); c.imageSmoothingEnabled = true; c.drawImage(b, 0, 0, cv.width, cv.height);
    };
    document.querySelectorAll('.mat[data-notes]').forEach(mat => {
      const cv = mat.querySelector('canvas'), xr = document.createElement('div'); xr.className = 'xray'; xr.setAttribute('aria-hidden', 'true');
      xr.append(cv, mat.querySelector('.shot').cloneNode(true));
      (NOTES[mat.dataset.notes] || []).forEach(([txt, x, y]) => { const s = document.createElement('span'); s.className = 'xnote'; s.textContent = txt; s.style.left = x + '%'; s.style.top = y + '%'; xr.append(s); });
      const ring = document.createElement('div'); ring.className = 'xring';
      mat.append(xr, ring);
      new ResizeObserver(() => { const r = mat.getBoundingClientRect(); if (r.width) { filmTexture(cv, r.width, r.height); mat.style.setProperty('--rmax', clamp(r.width * .16, 70, 120) + 'px'); } }).observe(mat);
      const at = e => { const p = local(mat, e); mat.style.setProperty('--x', p.x + 'px'); mat.style.setProperty('--y', p.y + 'px'); };
      const on = e => { if (!fieldOn) return; at(e); mat.classList.add('xr-on'); };
      mat.addEventListener('pointerenter', e => { if (e.pointerType === 'mouse') on(e); });
      mat.addEventListener('pointermove', e => { if (mat.classList.contains('xr-on')) at(e); });
      mat.addEventListener('pointerdown', e => { if (e.pointerType !== 'mouse') on(e); });
      const off = e => { if (e.type === 'pointerleave' || e.pointerType !== 'mouse') mat.classList.remove('xr-on'); };
      mat.addEventListener('pointerleave', off); mat.addEventListener('pointerup', off); mat.addEventListener('pointercancel', off);
    });
  }

  /* ── 3 Highlights: ordered band + 60 s overlay ── */
  const hlo = document.getElementById('hlo'), steps = document.getElementById('hloSteps');
  function buildSteps() {
    const S = [[t('hl.who'), t('hero.h1'), t('hero.lead'), '→ ' + t('hero.avail')]]
      .concat(MI.cases.map(c => [`${c.title} · ${t(`case.${c.slug}.k`)}`, t(`case.${c.slug}.s`), '', '→ ' + t(`case.${c.slug}.hl`)]))
      .concat([[t('bld.label'), t('bld.h2'), t('bld.sub'), '→ ' + (MI.building || []).join(' · ')]]);
    steps.innerHTML = S.map(([k, h, p, ph], i) => `<div class="hlo-step${i ? '' : ' on'}"><span class="label">${k}</span><h2${i ? '' : ' id="hlo-t"'}>${h}</h2>${p ? `<p>${p}</p>` : ''}<span class="ph">${ph}</span></div>`).join('')
      + `<div class="hlo-step"><span class="label">${t('hl.next')}</span><h2>${t('cta.h')}</h2><div class="cta-row"><a class="btn-p" href="#contact" data-close>${t('cta.btn')}</a><a class="btn-s" href="#work" data-close>${t('work.all')}</a></div></div>`;
    steps.querySelectorAll('[data-close]').forEach(a => a.addEventListener('click', closeHl));
  }
  if (document.getElementById('fHl')) {
    new Field(document.getElementById('fHl'), { spacing: 22, alpha: .8, align: .72, home: [.78, .4], dot: false });
    const band = document.getElementById('fHl'), fb = fields[fields.length - 1];
    whenVisible(band, n => fb.draw(n), 30);
  }
  const fo = new Field(document.getElementById('fHlo'), { spacing: 24, alpha: .5, align: .8, dot: false });
  let hlRaf = 0, lastFocus = null, hlIdx = 0;
  const spots = [[.8, .3], [.2, .7], [.82, .75], [.3, .25], [.7, .5]];
  const hlUpdate = () => {
    const max = steps.scrollHeight - steps.clientHeight, p = max > 0 ? clamp(steps.scrollTop / max, 0, 1) : 0;
    document.getElementById('hloFill').style.width = (p * 100) + '%'; document.getElementById('hloTilde').style.left = (p * 100) + '%';
    document.getElementById('hloTime').textContent = p > .98 ? t('hl.done') : `${Math.max(5, Math.round((1 - p) * 60 / 5) * 5)} ${t('hl.left')}`;
    const els = [...steps.children], i = clamp(Math.round(steps.scrollTop / steps.clientHeight), 0, els.length - 1);
    if (i !== hlIdx) { hlIdx = i; els.forEach((s, j) => s.classList.toggle('on', j === i)); }
    const [sx, sy] = spots[i] || spots[0]; fo.rest = { x: fo.W * sx, y: fo.H * sy };
  };
  steps.addEventListener('scroll', hlUpdate, { passive: true });
  function openHl() {
    lastFocus = document.activeElement; hlo.hidden = false; document.body.style.overflow = 'hidden';
    steps.scrollTop = 0; hlIdx = -1; fo.resize(); hlUpdate(); steps.focus({ preventScroll: true });
    const loop = n => { fo.draw(n); hlRaf = requestAnimationFrame(loop); }; hlRaf = requestAnimationFrame(loop);
  }
  function closeHl() { hlo.hidden = true; document.body.style.overflow = ''; cancelAnimationFrame(hlRaf); if (lastFocus) lastFocus.focus({ preventScroll: true }); }
  document.querySelectorAll('[data-hl], [data-hl-tab]').forEach(b => b.addEventListener('click', e => { e.preventDefault(); openHl(); }));
  document.getElementById('hloExit').addEventListener('click', closeHl);
  hlo.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeHl();
    if (e.key === 'Tab') { const f = [...hlo.querySelectorAll('button, a, [tabindex="0"]')]; const first = f[0], last = f[f.length - 1]; if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); } else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); } }
  });

  /* ── 7 Closing CTA: ferrofluid ── */
  if (document.getElementById('ctaSt')) {
    const st = document.getElementById('ctaSt'), btn = document.getElementById('ctaBtn');
    const f = new Field(document.getElementById('fCta'), { spacing: 22, alpha: .35, dot: false });
    const F = fitCanvas(document.getElementById('fFerro'));
    let ptr = null, m = null, boost = 0, rows = null;
    const center = () => { const r = btn.getBoundingClientRect(), s = st.getBoundingClientRect(); return { x: r.left - s.left + r.width / 2, y: r.top - s.top + r.height / 2 }; };
    st.addEventListener('pointermove', e => { if (e.pointerType === 'mouse' || e.buttons) ptr = local(st, e); });
    st.addEventListener('pointerdown', e => { if (!e.target.closest('a, button')) ptr = local(st, e); });
    st.addEventListener('pointerleave', () => { ptr = null; });
    btn.addEventListener('click', e => { e.preventDefault(); boost = 1; ptr = null; });
    whenVisible(st, now => {
      const { ctx, W, H } = F; if (!W) return;
      const c = center(); let tgt = c;
      if (ptr) { const d = Math.hypot(ptr.x - c.x, ptr.y - c.y); tgt = d < 150 ? c : ptr; }
      if (!m) m = { x: c.x, y: c.y };
      const k = reduce ? 1 : .12; m.x += (tgt.x - m.x) * k; m.y += (tgt.y - m.y) * k; boost *= reduce ? 0 : .96;
      f.target = { x: m.x, y: m.y }; f.draw(now);
      ctx.clearRect(0, 0, W, H); if (f.alpha < .05) return;
      // ferrofluid: two rows of concave cones, tallest under the magnet (DESIGN.md › Magnetic fluids › 3)
      const narrow = W < 560, N = narrow ? 7 : 11, cx = narrow ? W * .5 : W * .64, by = H * .9, w = Math.min(W * (narrow ? .88 : .6), 600), h0 = 14, sp = w / N;
      const Hmax = Math.min(H * (narrow ? .26 : .36), 170), x0 = cx - w / 2 - 22, x1 = cx + w / 2 + 22;
      const mkRow = n => Array.from({ length: n }, () => ({ h: 4, v: 0, l: 0, lv: 0 }));
      if (!rows || rows[1].length !== N) rows = [mkRow(N - 1), mkRow(N)];
      const domeE = x => { const q = (x - cx) / (w / 2 + 22); return Math.abs(q) < 1 ? Math.sqrt(1 - q * q) : 0; };
      const vert = clamp(1 - Math.max(0, by - m.y) / (H * 1.4), .3, 1);
      const update = (row, off, scale) => row.map((s, i) => {
        const xi = cx - w / 2 + sp * (i + .5 + off), de = domeE(xi), gx = Math.exp(-Math.pow((xi - m.x) / (w * .5), 2));
        const th = (3 + Hmax * scale * (.2 + .8 * gx) * vert * Math.pow(de, .6)) * (1 + boost * .8);
        const dl = clamp((m.x - xi) / Math.max(60, Math.hypot(m.x - xi, by - m.y)), -1, 1) * .35;
        if (reduce) { s.h = th; s.l = dl; } else { s.v = (s.v + (th - s.h) * .08) * .8; s.h += s.v; s.lv = (s.lv + (dl - s.l) * .07) * .8; s.l += s.lv; }
        const hw = sp * .62, h = Math.max(0, s.h), tip = clamp(xi + s.l * h * .7, xi - hw + 4, xi + hw - 4);
        return { xi, h, hw, tip, L: xi - hw, R: xi + hw };
      });
      const back = update(rows[0], .5, .65), front = update(rows[1], 0, 1);
      const prof = (row, x) => { let y = 0; for (const p of row) { if (x <= p.L || x >= p.R) continue; const u = x < p.tip ? (p.tip - x) / (p.tip - p.L) : (x - p.tip) / (p.R - p.tip); if (u < 1) { const v = p.h * Math.pow(1 - u, 2.4); if (v > y) y = v; } } return y; };
      const surf = row => { const P = new Path2D(); for (let x = x0; x <= x1 + .1; x += 1.5) { const d = domeE(x), y = by - h0 * d - (d > 0 ? prof(row, x) : 0); x === x0 ? P.moveTo(x, y) : P.lineTo(x, y); } return P; };
      const body = top => { const B = new Path2D(top); B.lineTo(x1, by); B.lineTo(x0, by); B.closePath(); return B; };
      // soft contact shadow
      ctx.save(); ctx.translate(cx, by + 3); ctx.scale(1, .07);
      const sg = ctx.createRadialGradient(0, 0, 0, 0, 0, w / 2 + 40); sg.addColorStop(0, 'rgba(0,0,0,.28)'); sg.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = sg; ctx.beginPath(); ctx.arc(0, 0, w / 2 + 40, 0, Math.PI * 2); ctx.fill(); ctx.restore();
      ctx.globalAlpha = f.alpha;
      // back row: lighter, it sits farther away
      const bTop = surf(back), gb = ctx.createLinearGradient(0, by - Hmax, 0, by); gb.addColorStop(0, '#4A524E'); gb.addColorStop(1, '#141916');
      ctx.fillStyle = gb; ctx.fill(body(bTop)); ctx.strokeStyle = 'rgba(255,255,255,.08)'; ctx.lineWidth = 1; ctx.stroke(bTop);
      // front row
      const fTop = surf(front), g = ctx.createLinearGradient(0, by - Hmax * 1.2, 0, by); g.addColorStop(0, '#3A433F'); g.addColorStop(.5, '#111613'); g.addColorStop(1, '#020403');
      ctx.fillStyle = g; ctx.fill(body(fTop)); ctx.strokeStyle = 'rgba(255,255,255,.12)'; ctx.stroke(fTop);
      // highlight down the left flank + specular dot near each tip
      ctx.lineCap = 'round'; ctx.lineWidth = 1.1; ctx.strokeStyle = '#FFFFFF'; ctx.fillStyle = '#FFFFFF';
      const flank = (p, u) => { const x = p.tip - u * (p.tip - p.L) + 1.4; return [x, by - h0 * domeE(x) - p.h * Math.pow(1 - u, 2.4) + 1.2]; };
      for (const p of front) {
        if (p.h < 12) continue;
        ctx.globalAlpha = f.alpha * clamp(p.h / Hmax, .25, .7);
        ctx.beginPath(); for (let u = .05; u <= .5; u += .05) { const [x, y] = flank(p, u); u < .06 ? ctx.moveTo(x, y) : ctx.lineTo(x, y); } ctx.stroke();
        const [sx, sy] = flank(p, .03); ctx.globalAlpha = f.alpha * .8; ctx.beginPath(); ctx.arc(sx, sy + 2, 1.1, 0, Math.PI * 2); ctx.fill();
      }
      // one green glint on the tallest tip
      const topP = front.reduce((a, b) => (b.h > a.h ? b : a));
      ctx.globalAlpha = .85 * f.alpha; ctx.fillStyle = colors.acc; ctx.beginPath(); ctx.arc(topP.tip, by - h0 * domeE(topP.tip) - topP.h - 1, 1.8, 0, Math.PI * 2); ctx.fill();
      ctx.globalAlpha = 1;
    });
    const copy = document.getElementById('copy'), ck = document.getElementById('ck'), em = document.getElementById('email'), status = document.getElementById('status');
    let timer = 0;
    copy.addEventListener('click', async () => {
      let ok = false; try { await navigator.clipboard.writeText(em.textContent); ok = true; } catch (e) {}
      clearTimeout(timer);
      if (ok) { copy.classList.add('done'); ck.textContent = t('cta.copied'); status.textContent = t('cta.copiedMsg'); }
      else { const r = document.createRange(); r.selectNodeContents(em); const s = getSelection(); s.removeAllRanges(); s.addRange(r); status.textContent = t('cta.selMsg'); }
      timer = setTimeout(() => { copy.classList.remove('done'); ck.textContent = t('cta.copy'); status.textContent = ''; }, 3000);
    });
  }

  /* ── 8 Footer: field at rest, time, wordmark ── */
  {
    const foot = document.getElementById('foot');
    const f = new Field(document.getElementById('fFoot'), { spacing: 20, alpha: .55, strength: .55, wake: true, dot: false, align: .94 });
    foot.addEventListener('pointermove', e => { if (e.pointerType === 'mouse') f.target = local(foot, e); });
    foot.addEventListener('pointerleave', () => { f.target = null; });
    whenVisible(foot, n => f.draw(n), 45);
    document.getElementById('topBtn').addEventListener('click', () => { const first = document.querySelector('main section'); magnetTo(first, '#' + first.id, document.getElementById('topBtn')); document.querySelector('.logo').focus({ preventScroll: true }); });
  }
  const timeEl = document.getElementById('time');
  function tick() { try { timeEl.textContent = new Intl.DateTimeFormat(lang === 'es' ? 'es-AR' : 'en-GB', { timeZone: 'America/Argentina/Buenos_Aires', hour: '2-digit', minute: '2-digit', hourCycle: 'h23' }).format(new Date()); } catch (e) {} }
  setInterval(tick, 15000);
  const word = document.getElementById('word');
  // fit the wordmark by its ink bounds: the 'I' starts on column 1 and the 'n' ends on column 12 (DESIGN.md › Alignment rule)
  function fitWord() {
    const box = word.parentElement, avail = box.clientWidth; if (!avail) return;
    const c = document.createElement('canvas').getContext('2d'); c.font = '800 200px Geist';
    if ('letterSpacing' in c) c.letterSpacing = (-.055 * 200) + 'px';
    const mt = c.measureText(word.textContent), inkL = -mt.actualBoundingBoxLeft, inkW = mt.actualBoundingBoxRight + mt.actualBoundingBoxLeft;
    if (!inkW) return;
    const fs = 200 * avail / inkW; word.style.fontSize = fs + 'px'; word.style.marginLeft = (-inkL * fs / 200) + 'px';
  }
  new ResizeObserver(fitWord).observe(word.parentElement);

  /* ── Page modules (case.html etc.) run after the shared setup ── */
  (window.MI_PAGES || []).forEach(fn => fn({ T, t, Field, fitCanvas, whenVisible, local, clamp, reduce, fine, narrowQ, root, fields, store, Q, ORDER, get lang() { return lang; }, get colors() { return colors; }, get fieldOn() { return fieldOn; }, magnetTo: (...a) => magnetTo(...a) }));

  /* ── Language buttons ── */
  ['langTop', 'langFoot'].forEach(id => document.getElementById(id).addEventListener('click', e => { if (e.metaKey || e.ctrlKey || e.shiftKey || e.button) return; e.preventDefault(); applyLang(lang === 'en' ? 'es' : 'en'); }));

  /* ── Grid overlay (G) ── */
  const gridov = document.getElementById('gridov');
  addEventListener('keydown', e => { if (e.key.toLowerCase() === 'g' && !e.metaKey && !e.ctrlKey && !e.altKey && !/input|textarea/i.test(e.target.tagName) && hlo.hidden) gridov.classList.toggle('on'); });

  /* ── Section entrances ── */
  const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { threshold: .15 });
  document.querySelectorAll('.rv').forEach(el => io.observe(el));

  /* ── Magnetic navigation v2 (DESIGN.md › Motion › Magnetic scroll) ──
     1 Grab: the clicked link charges and the page answers in the same frame (no dead time).
     2 Pull: real spring physics, damping tuned so every trip overshoots by the same ~16px.
     3 Field: while the page travels, filings appear and point at the magnet ahead; they stretch with speed.
     4 Clack: at the overshoot peak a green seam snaps across under the header (+ a short haptic tick on touch). */
  const fx = document.getElementById('pullFx'), seam = document.getElementById('seam'), fxc = fx.getContext('2d');
  let pullRaf = 0, pullSafe = 0, fxA = 0;
  const endPull = () => { cancelAnimationFrame(pullRaf); pullRaf = 0; clearTimeout(pullSafe); root.classList.remove('pulling'); };
  const stopPull = () => { if (pullRaf) { endPull(); fadeFx(); } };
  ['wheel', 'touchstart', 'keydown'].forEach(ev => addEventListener(ev, stopPull, { passive: true }));
  const sizeFx = () => { const dpr = Q.dpr(); fx.width = innerWidth * dpr; fx.height = innerHeight * dpr; fxc.setTransform(dpr, 0, 0, dpr, 0, 0); };
  const drawFx = (v, dir, a) => {
    const W = innerWidth, H = innerHeight; fxc.clearRect(0, 0, W, H); if (a < .01) return;
    const S = W < 600 ? 26 : 30, off = ((-scrollY % S) + S) % S, mx = W / 2, my = dir > 0 ? H * 1.5 : -H * .5;
    const L = Math.min(22, 5 + Math.abs(v) * .55);
    fxc.lineCap = 'round'; fxc.lineWidth = 1.2;
    for (let y = off - S; y < H + S; y += S) for (let x = S / 2; x < W; x += S) {
      const dx = mx - x, dy = my - y, dl = Math.hypot(dx, dy), ux = dx / dl, uy = dy / dl;
      const near = dir > 0 ? y / H : 1 - y / H; /* filings closer to the magnet are stronger and turn green */
      fxc.globalAlpha = Math.min(.6, a * (.12 + .3 * near)); fxc.strokeStyle = near > .78 ? colors.acc : colors.ink;
      fxc.beginPath(); fxc.moveTo(x - ux * L / 2, y - uy * L / 2); fxc.lineTo(x + ux * L / 2, y + uy * L / 2); fxc.stroke();
    }
    fxc.globalAlpha = 1;
  };
  const fadeFx = () => { const a0 = fxA, t0 = performance.now(); const f = now => { const q = Math.min(1, (now - t0) / 260); fxA = a0 * (1 - q); drawFx(0, 1, fxA); if (q < 1) requestAnimationFrame(f); else { fx.hidden = true; } }; requestAnimationFrame(f); };
  const clack = () => {
    seam.style.top = document.getElementById('top').offsetHeight + 'px';
    seam.classList.remove('on'); void seam.offsetWidth; seam.classList.add('on');
    if (!fine && navigator.vibrate && (!navigator.userActivation || navigator.userActivation.hasBeenActive)) try { navigator.vibrate(12); } catch (e) {}
  };
  const charge = link => { if (!link) return; link.classList.remove('charge'); void link.offsetWidth; link.classList.add('charge'); };
  const magnetTo = (target, hash, link) => {
    stopPull(); charge(link);
    const head = document.getElementById('top').offsetHeight, maxY = document.documentElement.scrollHeight - innerHeight;
    const y0 = scrollY, y1 = target === document.querySelector('main section') ? 0 : clamp(target.getBoundingClientRect().top + scrollY - head, 0, maxY), d = y1 - y0, dist = Math.abs(d);
    const land = () => { if (hash) history.pushState(null, '', hash); if (!target.hasAttribute('tabindex')) target.setAttribute('tabindex', '-1'); target.focus({ preventScroll: true }); };
    if (reduce || dist < 2) { scrollTo(0, y1); land(); return; }
    /* snappy spring (ζ .6) in normalized space; past the target the overshoot is compressed to ≤16px → impact, then a small rebound */
    const room = d > 0 ? maxY - y1 : y1, os = Math.min(16, room, dist * .08), z = .6, Ts = clamp(560 + dist * .14, 620, 1250) / 1000, w = 4.4 / (z * Ts), wd = w * Math.sqrt(1 - z * z);
    const pos = t => 1 - Math.exp(-z * w * t) * (Math.cos(wd * t) + (z * w / wd) * Math.sin(wd * t)), OV = Math.exp(-z * Math.PI / Math.sqrt(1 - z * z));
    let hit = false; const at = t => { const p = pos(t); if (p >= 1) hit = true; return hit ? y1 + Math.sign(d) * (p - 1) / OV * os : y0 + d * p; };
    const total = Ts * 1000 + 80, t0 = performance.now();
    let clacked = false, prevY = y0, prevT = t0;
    root.classList.add('pulling'); sizeFx(); fx.hidden = false; fxA = 0;
    pullSafe = setTimeout(() => { if (pullRaf) { endPull(); scrollTo(0, y1); fx.hidden = true; land(); } }, total + 400);
    const frame = now => {
      const t = (now - t0) / 1000, y = at(t); scrollTo(0, y);
      const v = (y - prevY) * 16.67 / Math.max(4, now - prevT); prevY = y; prevT = now; /* px per 60 Hz frame, so 90/120 Hz screens look the same */
      fxA = clamp(Math.abs(v) / 14, 0, 1) * (clacked ? .5 : 1) * (fine ? 1 : 1.25); drawFx(v, Math.sign(d), fxA);
      if (!clacked && hit) { clacked = true; clack(); }
      if (now - t0 < total) pullRaf = requestAnimationFrame(frame);
      else { endPull(); scrollTo(0, y1); fadeFx(); land(); }
    };
    pullRaf = requestAnimationFrame(frame);
  };
  addEventListener('resize', () => { if (!fx.hidden) sizeFx(); });

  /* ── Opening a case (DESIGN.md › Motion › Opening a case) ──
     Before leaving the home, the field takes the screen: filings on a 30px grid turn toward the case title
     as if the magnet landed on it, while the page dims. Their final state is handed to the case page
     (sessionStorage 'mi-arrive'), which starts its assembly from exactly those filings. */
  const GATHER = 420, GS = 30;
  const gatherTo = (titleEl, href) => {
    const r = titleEl.getBoundingClientRect(), mx = r.left + Math.min(r.width, 220) / 2, my = r.top + r.height / 2;
    try { sessionStorage.setItem('mi-arrive', JSON.stringify({ x: mx, y: my, S: GS, W: innerWidth, H: innerHeight, t: Date.now() })); } catch (e) {}
    if (reduce) { location.href = href; return; }
    sizeFx(); fx.hidden = false; root.classList.add('leaving');
    const W = innerWidth, H = innerHeight, t0 = performance.now(); let gone = false;
    const go = () => { if (!gone) { gone = true; location.href = href; } };
    setTimeout(go, GATHER + 250); /* frames stalled: still leave */
    const frame = now => {
      const q = Math.min(1, (now - t0) / GATHER), e = 1 - Math.pow(1 - q, 3);
      fxc.clearRect(0, 0, W, H); fxc.lineCap = 'round'; fxc.lineWidth = 1.3;
      const pI = new Path2D(), pG = new Path2D();
      for (let y = GS / 2; y < H; y += GS) for (let x = GS / 2; x < W; x += GS) {
        const dx = mx - x, dy = my - y, d = Math.hypot(dx, dy) || 1, near = Math.exp(-d / 260);
        const a = Math.atan2(dy, dx) * e + ORDER * (1 - e), L = 4 + 9 * e * (.45 + .55 * near);
        const cx = Math.cos(a) * L / 2, cy = Math.sin(a) * L / 2, P = near > .45 ? pG : pI;
        P.moveTo(x - cx, y - cy); P.lineTo(x + cx, y + cy);
      }
      fxc.globalAlpha = .55 * e; fxc.strokeStyle = colors.ink; fxc.stroke(pI);
      fxc.globalAlpha = .9 * e; fxc.strokeStyle = colors.acc; fxc.stroke(pG); fxc.globalAlpha = 1;
      if (q < 1) requestAnimationFrame(frame); else go();
    };
    requestAnimationFrame(frame);
  };
  document.addEventListener('click', e => {
    const a = e.target.closest('a[data-case]'); if (!a || e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.button) return;
    const href = a.getAttribute('href'); if (!href || href.startsWith('#')) return;
    e.preventDefault(); gatherTo(a.querySelector('h3') || a, href);
  });
  /* coming back with the browser's back button restores the page as it was before leaving */
  addEventListener('pageshow', () => { root.classList.remove('leaving'); fx.hidden = true; });
  document.addEventListener('click', e => {
    const a = e.target.closest('a[href^="#"]'); if (!a || e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.button) return;
    if (a.matches('[data-case], [data-hl-tab], .skip') || a.closest('.hlo')) return;
    const id = a.getAttribute('href').slice(1), target = id && document.getElementById(id); if (!target) return;
    e.preventDefault(); magnetTo(target, '#' + id, a);
  });

  applyLang(MI.lang, false); spy();
})();
