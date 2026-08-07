// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import icon from 'astro-icon';
import tailwindcss from '@tailwindcss/vite';

// ─────────────────────────────────────────────────────────────────────────────
// The repo is named after the org (ai-aws-ug-chile.github.io), so GitHub Pages
// serves it from the domain root and no `base` prefix is needed. Moving to a
// custom domain later means changing `site` and nothing else.
// ─────────────────────────────────────────────────────────────────────────────
export default defineConfig({
  site: 'https://ai-aws-ug-chile.github.io',
  trailingSlash: 'ignore',
  // Pages are a few KB gzipped, so fetching the next one while the pointer is
  // still travelling towards the link makes navigation feel instant. `hover`
  // rather than `viewport` keeps it from downloading links nobody aims at.
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'hover',
  },
  integrations: [
    sitemap(),
    // Icons are inlined as SVG at build time — no runtime JS, no icon font.
    // `lucide` covers UI glyphs; `simple-icons` covers brand logos, which
    // Lucide dropped from its set.
    icon({ include: { lucide: ['*'], 'simple-icons': ['*'] } }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
  image: {
    // Album photos are compressed and converted to modern formats at build time.
    responsiveStyles: true,
  },
});
