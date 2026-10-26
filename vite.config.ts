import { defineConfig } from 'vite';

// Relative asset URLs work both at the GitHub Pages project path and at a
// custom/root domain, without changing the generated game bundle.
export default defineConfig({
  base: './',
  plugins: [],
});
