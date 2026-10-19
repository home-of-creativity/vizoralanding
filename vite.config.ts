import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// /ar and /en are client-side routes; Vite's SPA fallback serves index.html for both.
export default defineConfig({
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
