/* Lightbox for case screens and project videos (DESIGN.md › Case study › Screens, › Project videos).
   A native <dialog>: Esc closes it and focus returns to the thumbnail; ← → move between items of the same
   strip; swipe works on touch. A video item opens a player with controls and starts it (the visitor asked
   for it); it stops when the visitor moves to another item or closes the lightbox. */
(() => {
  const lb = document.getElementById('lb'); if (!lb || typeof lb.showModal !== 'function') return;
  const D = (window.MI && window.MI.D) || { en: {} };
  const t = k => { const l = document.documentElement.lang; return (D[l] && D[l][k]) ?? D.en[k] ?? k; };
  const vid = document.getElementById('lbVid'), im = document.getElementById('lbImg'), cap = document.getElementById('lbCap'), n = document.getElementById('lbN');
  const prev = document.getElementById('lbPrev'), next = document.getElementById('lbNext');
  let items = [], i = 0, opener = null;
  const stopVid = () => { if (!vid.hasAttribute('src')) return; vid.pause(); vid.removeAttribute('src'); vid.load(); };

  const show = j => {
    i = (j + items.length) % items.length; const b = items[i], isVid = !!b.dataset.video;
    stopVid();
    im.hidden = isVid; vid.hidden = !isVid;
    if (isVid) { vid.src = b.dataset.video; vid.play().catch(() => {}); }
    else { im.src = b.dataset.full; im.width = +b.dataset.w; im.height = +b.dataset.h; im.alt = t(b.dataset.cap); }
    cap.textContent = t(b.dataset.cap); n.textContent = `${i + 1} ${t('c.lb.of')} ${items.length}`;
    lb.classList.toggle('ph', !!b.closest('.gal-ph') || !!b.dataset.ph);
    const one = items.length < 2; prev.hidden = one; next.hidden = one;
    /* warm the neighbouring screens so stepping feels instant */
    if (!isVid) [i + 1, i - 1].forEach(k => { const o = items[(k + items.length) % items.length]; if (o && o.dataset.full) new Image().src = o.dataset.full; });
  };
  document.addEventListener('click', e => {
    const b = e.target.closest('.gal-it'); if (!b) return;
    opener = b; items = [...b.closest('.gal-strip').querySelectorAll('.gal-it')];
    show(items.indexOf(b)); lb.showModal(); document.documentElement.classList.add('lb-open');
  });
  const close = () => lb.close();
  lb.addEventListener('close', () => { document.documentElement.classList.remove('lb-open'); im.removeAttribute('src'); stopVid(); if (opener) opener.focus(); });
  document.getElementById('lbClose').addEventListener('click', close);
  prev.addEventListener('click', () => show(i - 1));
  next.addEventListener('click', () => show(i + 1));
  lb.addEventListener('click', e => { if (e.target === lb) close(); });   /* click on the backdrop */
  lb.addEventListener('keydown', e => {
    if (e.target === vid) return;   /* arrows seek inside the player */
    if (e.key === 'ArrowRight') { e.preventDefault(); show(i + 1); }
    else if (e.key === 'ArrowLeft') { e.preventDefault(); show(i - 1); }
  });
  let x0 = null;
  lb.addEventListener('pointerdown', e => { if (e.pointerType !== 'mouse' && e.target !== vid) x0 = e.clientX; });
  lb.addEventListener('pointerup', e => { if (x0 == null) return; const dx = e.clientX - x0; x0 = null; if (Math.abs(dx) > 50) show(i + (dx < 0 ? 1 : -1)); });
})();
