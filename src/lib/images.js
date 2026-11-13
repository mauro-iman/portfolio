/* Case images: every file in src/assets/cases/<slug>/ is available by name from the case YAML.
   Astro resizes and converts them to WebP at build time. */
const files = import.meta.glob('/src/assets/cases/*/*.{png,jpg,jpeg,webp,gif}', { eager: true, import: 'default' });

export const img = (slug, file) => {
  if (!file) return null;
  const m = files[`/src/assets/cases/${slug}/${file}`];
  if (!m) throw new Error(`Image not found: src/assets/cases/${slug}/${file}`);
  return m;
};

/* Wide banners and phone screens are shown whole (contain); regular screens fill the frame (cover). */
export const fit = m => (m.width / m.height < 1 || m.width / m.height > 2.2 ? 'contain' : 'cover');
