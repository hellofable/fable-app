import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import path from 'path';

export default {
  kit: {
    alias: {
      $lib: path.resolve('src/lib') // No need for './', just 'src/lib'
    }
  },
  preprocess: vitePreprocess()
};
