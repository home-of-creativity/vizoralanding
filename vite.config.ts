import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

/** `/` locally. On GitHub Pages a project site is served from `/repo-name/`. */
function pagesBase() {
  if (process.env.GITHUB_PAGES !== 'true') return '/';
  const repo = process.env.GITHUB_REPOSITORY?.split('/')[1];
  const owner = process.env.GITHUB_REPOSITORY_OWNER;
  if (!repo || repo === `${owner}.github.io`) return '/';
  return `/${repo}/`;
}

// /ar and /en are client-side routes; Vite's SPA fallback serves index.html for both.
export default defineConfig({
  base: pagesBase(),
  plugins: [react(), tailwindcss()],
  server: {
    port: 5174,
    strictPort: true,
  },
  preview: {
    port: 4174,
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
  },
});
