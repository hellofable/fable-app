import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import path from 'path';

export default defineConfig({
  plugins: [svelte()],
  server: {
    port: 8200,
    allowedHosts: ['app-dev.hellofable.com']

  },
  resolve: {
    alias: {
      $lib: path.resolve(__dirname, 'src/lib') // Ensure this is correct
    }
  }
});
