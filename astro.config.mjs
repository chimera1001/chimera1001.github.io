// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  // GitHub Pages: user site => https://<username>.github.io
  site: "https://chimera1001.github.io",
  vite: {
    plugins: [tailwindcss()],
  },
});
