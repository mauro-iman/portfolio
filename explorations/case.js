/* Case study page module (DESIGN.md › Page: Case study). Runs inside site.js after the shared setup. */
(window.MI_PAGES = window.MI_PAGES || []).push(M => {
  const { T, Field, fitCanvas, whenVisible, local, clamp, reduce, fine, root, ORDER, store } = M;

  /* ── Copy (draft: facts and numbers in [brackets] come from Mauro) ── */
  Object.assign(T.en, {
    'c.doc': 'Compass — Case study · Mauro Imán',
    'c.back': 'All work', 'c.kicker': 'Case study · PropTech · [year]',
    'c.f.role': 'Role', 'c.f.roleV': '[Senior product designer]', 'c.f.scope': 'Scope', 'c.f.scopeV': 'Compliance ops · CRM research · Design system',
    'c.f.team': 'Team', 'c.f.teamV': '[Team and partners]', 'c.f.time': 'Timeline', 'c.f.timeV': '[Years]',
    'c.cover': 'Compass product cover',
    'c.glance': 'At a glance', 'c.m1': 'company valuation', 'c.m2': '[what this number measures]', 'c.m3': '[what this number measures]',
    'c.q.p': 'Problem', 'c.q.pV': 'Every acquisition brought its own tools, patterns and compliance steps.',
    'c.q.d': 'What I did', 'c.q.dV': 'Compliance operations, CRM research and a design system that absorbs new brands.',
    'c.q.r': 'Result', 'c.q.rV': '[The outcome in one line, with a number.]',
    'c.story': 'The story', 'c.story.h': 'From scattered to aligned.',
    'c.ch1': '01 Problem', 'c.ch2': '02 Decision', 'c.ch3': '03 Result',
    'c.s1.k': 'Problem', 'c.s1.h': 'Growth by acquisition, one product at a time.', 'c.s1.p': 'Each brand arrived with its own tools, patterns and compliance steps. Operations scaled; the experience fragmented.', 'c.s1.ph': '→ [data point: brands or tools at the start]',
    'c.s2.k': 'Decision', 'c.s2.h': 'Design one system that absorbs new brands.', 'c.s2.p': 'Instead of redesigning every product, I focused on shared foundations: compliance workflows, research on how agents really work, and a system built to take in new brands.', 'c.s2.ph': '→ [the key decision, in one line]',
    'c.s3.k': 'Result', 'c.s3.h': 'New brands snap into place.', 'c.s3.p': 'Teams build on the same foundations, and each acquisition joins the system instead of adding to the noise.', 'c.s3.ph': '→ [impact metric]',
    'c.st0': 'Field · scattered', 'c.st1': 'Field · attracted', 'c.st2': 'Field · aligned',
    'c.did': 'What I did', 'c.did.h': 'Three workstreams, one direction.',
    'c.w1.h': 'Compliance operations', 'c.w1.p': 'Turned review and approval steps into clear queues with visible status. [Details: users, volume, what changed.]', 'c.w1.ph': '[screen: compliance queue]',
    'c.w2.h': 'CRM research', 'c.w2.p': 'Interviews and synthesis to understand how agents manage clients day to day. [Details: method, sample, key insight.]', 'c.w2.ph': '[image: research synthesis]',
    'c.w3.h': 'Design system', 'c.w3.p': 'Tokens and components that let a new brand re-skin the product without new code. [Details: adoption, teams, components.]', 'c.w3.ph': '[image: system components]',
    'c.try': 'Try it', 'c.try.h': 'One system, any brand.', 'c.try.p': 'Pick a brand. The same components take its color, shape and weight.',
    'c.b1': 'Brand A', 'c.b2': 'Brand B', 'c.b3': 'Brand C', 'c.bd.home': 'Listings', 'c.bd.r1': 'Review documents', 'c.bd.r2': 'Client follow-up', 'c.bd.r3': 'Disclosure signed',
    'c.bd.t1': 'Pending', 'c.bd.t2': 'Today', 'c.bd.t3': 'Done', 'c.bd.in': 'Search clients', 'c.bd.btn': 'New listing',
    'c.bd.note': 'Illustrative demo, not the real product.', 'c.bd.live': 'applied',
    'c.ref': 'Reflection', 'c.ref.q': '[What this project taught me, in one or two sentences.]', 'c.ref.next': 'What I’d do next: [one line]',
    'c.next': 'Next case', 'c.next.note': 'Case in progress: the link goes back to the work list.'
  });
  Object.assign(T.es, {
    'c.doc': 'Compass — Caso de estudio · Mauro Imán',
    'c.back': 'Todos los trabajos', 'c.kicker': 'Caso de estudio · PropTech · [año]',
    'c.f.role': 'Rol', 'c.f.roleV': '[Senior product designer]', 'c.f.scope': 'Alcance', 'c.f.scopeV': 'Operaciones de compliance · Research de CRM · Design system',
    'c.f.team': 'Equipo', 'c.f.teamV': '[Equipo y socios]', 'c.f.time': 'Período', 'c.f.timeV': '[Años]',
    'c.cover': 'Portada del producto Compass',
    'c.glance': 'En un vistazo', 'c.m1': 'valuación de la empresa', 'c.m2': '[qué mide este número]', 'c.m3': '[qué mide este número]',
    'c.q.p': 'Problema', 'c.q.pV': 'Cada adquisición traía sus propias herramientas, patrones y pasos de compliance.',
    'c.q.d': 'Qué hice', 'c.q.dV': 'Operaciones de compliance, research de CRM y un design system que absorbe marcas nuevas.',
    'c.q.r': 'Resultado', 'c.q.rV': '[El resultado en una línea, con un número.]',
    'c.story': 'La historia', 'c.story.h': 'Del caos al orden.',
    'c.ch1': '01 Problema', 'c.ch2': '02 Decisión', 'c.ch3': '03 Resultado',
    'c.s1.k': 'Problema', 'c.s1.h': 'Crecer comprando, un producto a la vez.', 'c.s1.p': 'Cada marca llegaba con sus herramientas, patrones y pasos de compliance. La operación escalaba; la experiencia se fragmentaba.', 'c.s1.ph': '→ [dato: marcas o herramientas al inicio]',
    'c.s2.k': 'Decisión', 'c.s2.h': 'Diseñar un sistema que absorba marcas nuevas.', 'c.s2.p': 'En lugar de rediseñar cada producto, me enfoqué en bases compartidas: flujos de compliance, research sobre cómo trabajan los agentes y un sistema pensado para sumar marcas.', 'c.s2.ph': '→ [la decisión clave, en una línea]',
    'c.s3.k': 'Resultado', 'c.s3.h': 'Las marcas nuevas encajan solas.', 'c.s3.p': 'Los equipos construyen sobre las mismas bases, y cada adquisición se suma al sistema en vez de sumar ruido.', 'c.s3.ph': '→ [métrica de impacto]',
    'c.st0': 'Campo · disperso', 'c.st1': 'Campo · atraído', 'c.st2': 'Campo · alineado',
    'c.did': 'Qué hice', 'c.did.h': 'Tres frentes, una dirección.',
    'c.w1.h': 'Operaciones de compliance', 'c.w1.p': 'Convertí pasos de revisión y aprobación en colas claras con estado visible. [Detalle: usuarios, volumen, qué cambió.]', 'c.w1.ph': '[pantalla: cola de compliance]',
    'c.w2.h': 'Research de CRM', 'c.w2.p': 'Entrevistas y síntesis para entender cómo los agentes gestionan a sus clientes día a día. [Detalle: método, muestra, insight clave.]', 'c.w2.ph': '[imagen: síntesis de research]',
    'c.w3.h': 'Design system', 'c.w3.p': 'Tokens y componentes que permiten que una marca nueva cambie la piel del producto sin código nuevo. [Detalle: adopción, equipos, componentes.]', 'c.w3.ph': '[imagen: componentes del sistema]',
    'c.try': 'Probalo', 'c.try.h': 'Un sistema, cualquier marca.', 'c.try.p': 'Elegí una marca. Los mismos componentes toman su color, forma y peso.',
    'c.b1': 'Marca A', 'c.b2': 'Marca B', 'c.b3': 'Marca C', 'c.bd.home': 'Propiedades', 'c.bd.r1': 'Revisar documentos', 'c.bd.r2': 'Seguimiento de cliente', 'c.bd.r3': 'Declaración firmada',
    'c.bd.t1': 'Pendiente', 'c.bd.t2': 'Hoy', 'c.bd.t3': 'Listo', 'c.bd.in': 'Buscar clientes', 'c.bd.btn': 'Nueva propiedad',
    'c.bd.note': 'Demo ilustrativa, no es el producto real.', 'c.bd.live': 'aplicada',
    'c.ref': 'Reflexión', 'c.ref.q': '[Qué me enseñó este proyecto, en una o dos frases.]', 'c.ref.next': 'Qué haría después: [una línea]',
    'c.next': 'Siguiente caso', 'c.next.note': 'Caso en preparación: el enlace vuelve a la lista de trabajos.'
  });

  /* ── 1 Intro: background field + the assembly ── */
  const sec = document.getElementById('case-top'), h1 = document.getElementById('c-h1');
  const bg = new Field(document.getElementById('fCase'), { spacing: 21, alpha: .45, home: [.8, .34], dot: false });
  sec.addEventListener('pointermove', e => { if (e.pointerType === 'mouse') bg.target = local(sec, e); });
  sec.addEventListener('pointerleave', () => { bg.target = null; });
  whenVisible(sec, n => bg.draw(n));
  const reveal = () => { root.classList.remove('asm'); bg.alphaT = M.fieldOn ? 1 : 0; };
  if (!root.classList.contains('asm')) reveal();
  else {
    bg.alpha = 0; bg.alphaT = 0;
    const safety = setTimeout(reveal, 3600);
    /* arriving from a case cover: start from the filings the home left on screen (see site.js › Opening a case) */
    let arrive = null; try { arrive = JSON.parse(sessionStorage.getItem('mi-arrive') || 'null'); sessionStorage.removeItem('mi-arrive'); } catch (e) {}
    if (arrive && (Date.now() - arrive.t > 5000 || Math.abs(arrive.W - innerWidth) > 40)) arrive = null;
    (document.fonts ? document.fonts.ready : Promise.resolve()).then(() => requestAnimationFrame(() => {
      const A = fitCanvas(document.getElementById('fAsm')), { W, H, ctx } = A;
      const sr = sec.getBoundingClientRect(), hr = h1.getBoundingClientRect(), cs = getComputedStyle(h1), fs = parseFloat(cs.fontSize);
      const node = [...h1.childNodes].find(n => n.nodeType === 3), text = h1.textContent;
      if (!W || !node) { clearTimeout(safety); reveal(); return; }
      /* find the title's real line breaks (it may wrap on narrow screens or with long names) */
      const lines = [], re = /\S+/g; let mw;
      while ((mw = re.exec(text))) {
        const rg = document.createRange(); rg.setStart(node, mw.index); rg.setEnd(node, mw.index + mw[0].length);
        const b = rg.getBoundingClientRect(), last = lines[lines.length - 1];
        if (last && Math.abs(b.top - last.top) < fs * .5) { last.e = mw.index + mw[0].length; last.right = b.right; }
        else lines.push({ s: mw.index, e: mw.index + mw[0].length, left: b.left, right: b.right, top: b.top, h: b.height });
      }
      if (!lines.length) { clearTimeout(safety); reveal(); return; }
      /* render each line off screen exactly where the real H1 draws it, then sample on a fine grid */
      const off = document.createElement('canvas'); off.width = Math.ceil(W); off.height = Math.ceil(H); const oc = off.getContext('2d');
      oc.font = `${cs.fontWeight} ${cs.fontSize} ${cs.fontFamily}`; if ('letterSpacing' in oc) oc.letterSpacing = cs.letterSpacing;
      const m = oc.measureText(text), asc = m.fontBoundingBoxAscent || fs * .8, desc = m.fontBoundingBoxDescent || fs * .2;
      oc.fillStyle = '#000';
      for (const ln of lines) oc.fillText(text.slice(ln.s, ln.e), ln.left - sr.left, ln.top - sr.top + (ln.h - (asc + desc)) / 2 + asc);
      const x0 = Math.min(...lines.map(l => l.left)) - sr.left, bw = Math.max(...lines.map(l => l.right)) - sr.left - x0;
      const btop = lines[0].top - sr.top, bbot = lines[lines.length - 1].top + lines[lines.length - 1].h - sr.top;
      const g = clamp(Math.round(fs / 28), 4, 7), img = oc.getImageData(0, 0, off.width, off.height).data, pts = [];
      for (let y = Math.max(0, Math.floor(btop - fs * .2)); y < Math.min(off.height, bbot + fs * .2); y += g)
        for (let x = Math.max(0, Math.floor(x0)); x < Math.min(off.width, x0 + bw + g); x += g)
          if (img[(y * off.width + x) * 4 + 3] > 140) pts.push({ tx: x, ty: y });
      if (!pts.length) { clearTimeout(safety); reveal(); return; }
      /* The title becomes a bar magnet: poles at its two ends. Phase 1 (FIELD): every filing on screen turns to the
         dipole's field lines, a wave spreading out from the title, and creeps toward it. Phase 2: the filings nearest
         the title are pulled in along those curved lines and line up into the letters; the rest stay as the field. */
      const ym = (btop + bbot) / 2, yA = Math.min(ym, btop + fs * .4), yB = Math.max(ym, bbot - fs * .4), P1x = x0 + fs * .25, P2x = x0 + bw - fs * .25, soft = (fs * .3) ** 2;
      const S = arrive ? arrive.S : (innerWidth < 600 ? 26 : 30), starts = [];
      if (arrive) {
        for (let y = S / 2; y < innerHeight; y += S) for (let x = S / 2; x < innerWidth; x += S) {
          const dd = Math.hypot(arrive.x - x, arrive.y - y), near = Math.exp(-dd / 260);
          if (y - sr.top > -S && y - sr.top < H + S) starts.push({ x, y: y - sr.top, a: Math.atan2(arrive.y - y, arrive.x - x), l: 4 + 9 * (.45 + .55 * near), g: near > .45 });
        }
      } else for (let y = S / 2; y < H; y += S) for (let x = S / 2; x < W; x += S) starts.push({ x, y, a: ORDER + (((Math.sin(x * 12.9898 + y * 78.233) * 43758.5453) % 1 + 1) % 1 - .5) * .5, l: 5, g: false });
      /* ── Variant B, "sweep" (DESIGN.md › Motion › Opening a case): filings never travel. A strong magnet slides
         behind the page from one side to the other; every filing turns toward it as it passes (springy, with a little
         wobble) and keeps the lean it had when the magnet left, like iron under a plastic lid. Filings inside the
         letters get magnetized as the magnet crosses them, so the title appears in its wake. ── */
      if (store.get('mi-asm') !== 'pull') {
        const rtl = store.get('mi-dir') !== 'ltr', ink = M.colors.ink, acc = M.colors.acc, Rf = fs * .9, Rb = Math.max(fs * 1.6, 160);
        const inLetter = (x, y) => { const xi = Math.round(x), yi = Math.round(y); return xi >= 0 && yi >= 0 && xi < off.width && yi < off.height && img[(yi * off.width + xi) * 4 + 3] > 140; };
        const bgF = starts.filter(s => !inLetter(s.x, s.y)).map(s => ({ x: s.x, y: s.y, a: s.a, v: 0, l: s.l, e: 0 }));
        const touch = !fine, LW = touch ? 1.6 : 1.3, BASE = touch ? 7 : 6; /* phones: thicker, longer filings so the motion reads on a small screen */
        const letters = pts.map(p => ({ x: p.tx, y: p.ty, a: ORDER, v: 0, m: 0, e: 0 }));
        const SW = 1700, T0 = 140, HOLD = T0 + SW + 500, END = HOLD + 600;
        const pad = Rb * .5, xa = rtl ? W + pad : -pad, xb = rtl ? -pad : W + pad; /* starts just off screen, so most of the sweep is visible */
        const turn = (a, b) => ((((b - a) % Math.PI) + Math.PI * 1.5) % Math.PI) - Math.PI / 2;
        /* spring toward the magnet: stiff only while it is near, so filings freeze in their lean once it has passed */
        const spring = (f, mx, my, k, dt) => { f.v += turn(f.a, Math.atan2(my - f.y, mx - f.x)) * 420 * k * dt; f.v *= Math.exp(-dt * 5.5); f.a += f.v * dt; f.e = Math.max(f.e * Math.exp(-dt * 1.6), k); };
        const seg = (P, f, l) => { const dx = Math.cos(f.a) * l / 2, dy = Math.sin(f.a) * l / 2; P.moveTo(f.x - dx, f.y - dy); P.lineTo(f.x + dx, f.y + dy); };
        let t0 = performance.now(), last = t0, shown = false;
        const frame = now => {
          const t = now - t0, dt = Math.min(.05, (now - last) / 1000); last = now;
          const q = clamp((t - T0) / SW, 0, 1), mx = xa + (xb - xa) * (1 - Math.cos(Math.PI * q)) / 2, my = ym, on = q > 0 && q < 1;
          const fade = t < HOLD ? 1 : 1 - clamp((t - HOLD) / (END - HOLD), 0, 1), intro = arrive ? 1 : clamp(t / 320, 0, 1);
          if (t > HOLD - 80 && !shown) { shown = true; clearTimeout(safety); reveal(); }
          ctx.clearRect(0, 0, W, H); ctx.lineCap = 'round'; ctx.lineWidth = LW;
          if (on) { /* the magnet's presence behind the lid: a soft green glow that travels with it */
            const gr = ctx.createRadialGradient(mx, my, 0, mx, my, Rb * 1.3); gr.addColorStop(0, acc); gr.addColorStop(1, 'transparent');
            ctx.globalAlpha = .12 * fade * Math.sin(Math.PI * q); ctx.fillStyle = gr; ctx.fillRect(mx - Rb * 1.3, my - Rb * 1.3, Rb * 2.6, Rb * 2.6); ctx.globalAlpha = 1;
          }
          const bI = new Path2D(), bN = new Path2D(), G = new Path2D(), lM = new Path2D(), lL = new Path2D();
          for (const f of bgF) {
            const dx = f.x - mx, k = on ? Math.exp(-(dx * dx) / (2 * Rb * Rb)) * Math.exp(-Math.abs(f.y - my) / (H * .7)) : 0;
            spring(f, mx, my, k, dt); f.l += (BASE - f.l) * dt * 2;
            seg(f.e > .62 ? G : f.e > .18 ? bN : bI, f, f.l + 13 * f.e); /* e: afterglow, so the magnet leaves a visible wake */
          }
          for (const f of letters) {
            const dx = f.x - mx, dy = f.y - my, k = on ? Math.exp(-(dx * dx) / (2 * Rf * Rf)) : 0;
            spring(f, mx, my, k * 1.4, dt);
            if (k < .15 && f.m > .9) f.a += turn(f.a, rtl ? -.55 : .55) * Math.min(1, dt * 4); /* once combed, letters settle to one lean so they read cleanly */
            f.m = q >= 1 ? f.m + (1 - f.m) * dt * 6 : Math.max(f.m, clamp((k - .45) * 2.4, 0, 1)); /* only right over the magnet: the title forms in its wake, not ahead of it */
            if (f.m < .12) continue;
            seg(k > .45 ? G : f.m < .6 ? lM : lL, f, g * (.5 + f.m) + g * .5 * k); /* letters stay crisp: no afterglow on them */
          }
          ctx.strokeStyle = ink;
          ctx.globalAlpha = .42 * fade * intro; ctx.stroke(bI);
          ctx.globalAlpha = .8 * fade * intro; ctx.stroke(bN); ctx.stroke(lM);
          ctx.globalAlpha = .94 * fade; ctx.stroke(lL);
          ctx.globalAlpha = .95 * fade * intro; ctx.strokeStyle = acc; ctx.stroke(G); ctx.globalAlpha = 1;
          if (t < END) requestAnimationFrame(frame); else { ctx.clearRect(0, 0, W, H); comb(); }
        };
        /* after the intro: with a mouse, moving over the title slides the magnet again and the letters turn to it */
        const comb = () => {
          if (!fine || reduce) return;
          const text0 = h1.textContent, W0 = innerWidth, pad = fs * .5;
          let mx = 0, my = 0, active = false, alpha = 0, idle = 0, raf = 0, lastC = 0;
          const loop = now => {
            const dt = Math.min(.05, (now - lastC) / 1000); lastC = now; idle += dt;
            alpha = clamp(alpha + (active && idle < .9 ? dt / .15 : -dt / .3), 0, 1);
            sec.classList.toggle('combing', alpha > 0);
            ctx.clearRect(0, 0, W, H); ctx.lineCap = 'round'; ctx.lineWidth = 1.3;
            const lL = new Path2D(), G = new Path2D();
            for (const f of letters) {
              const dx = f.x - mx, dy = f.y - my, k = active ? Math.exp(-(dx * dx + dy * dy) / (2 * Rf * Rf)) : 0;
              spring(f, mx, my, k * 1.4, dt); seg(k > .45 ? G : lL, f, g * 1.5 + g * .7 * k);
            }
            ctx.globalAlpha = .94 * alpha; ctx.strokeStyle = ink; ctx.stroke(lL);
            ctx.globalAlpha = .9 * alpha; ctx.strokeStyle = acc; ctx.stroke(G); ctx.globalAlpha = 1;
            if (alpha > 0) raf = requestAnimationFrame(loop); else { raf = 0; ctx.clearRect(0, 0, W, H); }
          };
          sec.addEventListener('pointermove', e => {
            if (e.pointerType !== 'mouse' || h1.textContent !== text0 || innerWidth !== W0) return;
            const r = sec.getBoundingClientRect(), x = e.clientX - r.left, y = e.clientY - r.top;
            const inside = x > x0 - pad && x < x0 + bw + pad && y > btop - pad && y < bbot + pad;
            if (!inside) { active = false; return; }
            mx = x; my = y; active = true; idle = 0;
            if (!raf) { lastC = performance.now(); raf = requestAnimationFrame(loop); }
          });
          sec.addEventListener('pointerleave', () => { active = false; });
        };
        frame(performance.now());
        return;
      }
      for (const s of starts) {
        const r1x = s.x - P1x, r2x = s.x - P2x, ry = s.y - ym, d1 = (r1x * r1x + ry * ry + soft) ** 1.5, d2 = (r2x * r2x + ry * ry + soft) ** 1.5;
        const bx = r1x / d1 - r2x / d2, by = ry / d1 - ry / d2;
        const cxs = clamp(s.x, P1x, P2x), cys = clamp(s.y, yA, yB), dseg = Math.hypot(s.x - cxs, s.y - cys) || 1, near = Math.exp(-dseg / (fs * 1.6));
        Object.assign(s, { fa: Math.atan2(by, bx), near, dseg, cx: (cxs - s.x) / dseg * 14 * near, cy: (cys - s.y) / dseg * 14 * near,
          fl: 4 + 11 * near, dl: Math.min(380, dseg * .45), fly: false, until: 0 });
      }
      /* the nearest filings feed the letters (about three letter points each) */
      const byNear = starts.slice().sort((a, b) => a.dseg - b.dseg), K = clamp(Math.ceil(pts.length / 3), 1, starts.length);
      const fliers = byNear.slice(0, K).sort((a, b) => a.x - b.x || a.y - b.y);
      fliers.forEach(s => { s.fly = true; });
      const FIELD = 950, DUR = 820, HOLD = lines.length > 1 ? 2400 : 2300, END = HOLD + 500; /* last filing lands at 950 + 540 + 820 = 2310 ms (two lines), before the reveal */
      pts.sort((a, b) => a.tx - b.tx);
      pts.forEach((p, i) => {
        const s = fliers[Math.floor(i * K / pts.length)], d = FIELD + (p.tx - x0) / Math.max(1, bw) * 320 + (p.ty - btop) / Math.max(1, bbot - btop) * 120 * (lines.length > 1) + Math.random() * 100;
        const sx = s.x + s.cx, sy = s.y + s.cy, dist = Math.hypot(p.tx - sx, p.ty - sy);
        let ux = Math.cos(s.fa), uy = Math.sin(s.fa); if (ux * (p.tx - sx) + uy * (p.ty - sy) < 0) { ux = -ux; uy = -uy; }
        Object.assign(p, { s, sx, sy, kx: sx + ux * dist * .45, ky: sy + uy * dist * .45, d }); s.until = Math.max(s.until, d);
      });
      const L = g * 1.35, t0 = performance.now(), ink = M.colors.ink, acc = M.colors.acc;
      const ease = q => 1 + 2.2 * Math.pow(q - 1, 3) + 1.2 * Math.pow(q - 1, 2); /* out-back: lands with a small overshoot */
      const out3 = q => 1 - Math.pow(1 - q, 3);
      const turn = (a, b) => ((((b - a) % Math.PI) + Math.PI * 1.5) % Math.PI) - Math.PI / 2; /* filings are symmetric: shortest turn mod π */
      let shown = false;
      const frame = now => {
        const t = now - t0; ctx.clearRect(0, 0, W, H);
        const fade = t < HOLD ? 1 : 1 - clamp((t - HOLD) / (END - HOLD), 0, 1), intro = arrive ? 1 : clamp(t / 320, 0, 1);
        if (t > HOLD - 80 && !shown) { shown = true; clearTimeout(safety); reveal(); }
        ctx.lineCap = 'round'; ctx.lineWidth = 1.3;
        const pI = new Path2D(), pN = new Path2D(), pG = new Path2D(), pF = new Path2D(), pL = new Path2D();
        /* the field: filings still in place */
        for (const s of starts) {
          if (s.fly && t >= s.until) continue;
          const r = out3(clamp((t - s.dl) / 650, 0, 1)), a = s.a + turn(s.a, s.fa) * r, l = s.l + (s.fl - s.l) * r;
          const x = s.x + s.cx * r, y = s.y + s.cy * r, dx = Math.cos(a) * l / 2, dy = Math.sin(a) * l / 2;
          const P = r > .5 ? (s.near > .5 ? pG : s.near > .2 ? pN : pI) : (s.g ? pG : pI);
          P.moveTo(x - dx, y - dy); P.lineTo(x + dx, y + dy);
        }
        /* the pull: filings flying along the field lines into the letters */
        for (const p of pts) {
          if (t < p.d) continue;
          const q = clamp((t - p.d) / DUR, 0, 1), e = ease(q), u = 1 - e;
          const x = u * u * p.sx + 2 * u * e * p.kx + e * e * p.tx, y = u * u * p.sy + 2 * u * e * p.ky + e * e * p.ty;
          const ta = Math.atan2(2 * u * (p.ky - p.sy) + 2 * e * (p.ty - p.ky), 2 * u * (p.kx - p.sx) + 2 * e * (p.tx - p.kx));
          const k = clamp((q - .7) / .3, 0, 1), a = ta + turn(ta, ORDER) * k, l = p.s.fl + (L - p.s.fl) * Math.min(1, q * 1.2);
          const dx = Math.cos(a) * l / 2, dy = Math.sin(a) * l / 2, P = q >= 1 ? pL : (q < .6 ? pG : pF);
          P.moveTo(x - dx, y - dy); P.lineTo(x + dx, y + dy);
        }
        ctx.strokeStyle = ink;
        ctx.globalAlpha = .42 * fade * intro; ctx.stroke(pI);
        ctx.globalAlpha = .7 * fade * intro; ctx.stroke(pN); ctx.stroke(pF);
        ctx.globalAlpha = .92 * fade; ctx.stroke(pL);
        ctx.globalAlpha = .88 * fade * intro; ctx.strokeStyle = acc; ctx.stroke(pG); ctx.globalAlpha = 1;
        if (t < END) requestAnimationFrame(frame); else ctx.clearRect(0, 0, W, H);
      };
      frame(performance.now()); /* draw the hand-off state in the very first frame */
    }));
  }

  /* ── 4 Chapters: the field tells the story with page scroll ── */
  if (document.getElementById('chPanel')) {
    const panel = document.getElementById('chPanel'), f = new Field(document.getElementById('fChap'), { spacing: 17, dot: true, strength: 1.7 });
    f.chaos = f.chaosT = 1;
    const steps = [...document.querySelectorAll('.c-step')], rail = [...document.querySelectorAll('.c-rail a')], state = document.getElementById('chState');
    let idx = -1;
    const update = () => {
      const mid = innerHeight * .5, a = steps[0].getBoundingClientRect().top + steps[0].offsetHeight / 2, b = steps[2].getBoundingClientRect().top + steps[2].offsetHeight / 2;
      const p = clamp((mid - a) / Math.max(1, b - a), 0, 1) * 2; /* 0 → 2 across the three chapters */
      f.chaosT = clamp(1 - p * 1.25, 0, 1); f.alignT = clamp(p - 1, 0, 1) * .95;
      f.rest = p > .35 && f.W ? { x: f.W * .5, y: f.H * .5 } : null;
      const i = clamp(Math.round(p), 0, 2);
      if (i !== idx) {
        idx = i; steps.forEach((s, j) => s.classList.toggle('on', j === i));
        rail.forEach((r, j) => { if (j === i) r.setAttribute('aria-current', 'step'); else r.removeAttribute('aria-current'); });
        state.dataset.i = 'c.st' + i; state.textContent = M.t('c.st' + i);
      }
    };
    addEventListener('scroll', update, { passive: true }); addEventListener('resize', update); update();
    whenVisible(panel, n => f.draw(n));
  }

  /* ── 6 System demo: one system re-skinned by brand tokens ── */
  if (document.getElementById('bdStage')) {
    const BRANDS = [
      { b: '#0E1311', ink: '#FFFFFF', soft: '#E1E5E3', txt: '#0E1311', r: 6, w: 600 },
      { b: '#1D4ED8', ink: '#FFFFFF', soft: '#DBE6FE', txt: '#1D3FA8', r: 14, w: 500 },
      { b: '#9A3412', ink: '#FFFFFF', soft: '#FBE3D3', txt: '#8A2E0F', r: 2, w: 700 }
    ];
    const stage = document.getElementById('bdStage'), chips = [...document.querySelectorAll('#bdChips button')], tl = document.getElementById('bdTilde'), live = document.getElementById('bdLive');
    const host = document.getElementById('bdChips');
    const place = el => { const r = el.getBoundingClientRect(), h = host.getBoundingClientRect(); tl.style.left = (r.left - h.left + r.width / 2 - 1.5) + 'px'; };
    const set = (i, announce) => {
      const B = BRANDS[i], s = stage.style;
      s.setProperty('--b', B.b); s.setProperty('--b-ink', B.ink); s.setProperty('--b-soft', B.soft); s.setProperty('--b-txt', B.txt); s.setProperty('--b-r', B.r + 'px'); s.setProperty('--b-w', B.w);
      chips.forEach((c, j) => c.setAttribute('aria-pressed', String(j === i))); place(chips[i]);
      const nm = document.getElementById('bdName'); nm.dataset.i = chips[i].dataset.i; nm.textContent = chips[i].textContent;
      if (announce) live.textContent = `${chips[i].textContent} ${M.t('c.bd.live')}`;
    };
    chips.forEach((c, i) => c.addEventListener('click', () => set(i, true)));
    new ResizeObserver(() => place(chips.find(c => c.getAttribute('aria-pressed') === 'true') || chips[0])).observe(host);
    set(0, false);
  }

  /* ── 8 Next case: the field leans toward the pointer ── */
  if (document.getElementById('cNext')) {
    const link = document.getElementById('cNext'), f = new Field(document.getElementById('fNext'), { spacing: 22, alpha: .55, home: [.82, .4], dot: false });
    link.addEventListener('pointermove', e => { f.target = local(link, e); });
    link.addEventListener('pointerleave', () => { f.target = null; });
    link.addEventListener('focus', () => { f.target = { x: f.W * .9, y: f.H * .5 }; });
    link.addEventListener('blur', () => { f.target = null; });
    whenVisible(link, n => f.draw(n));
  }
});
