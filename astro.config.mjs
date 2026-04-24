// @ts-check
import { defineConfig } from "astro/config";

import tailwindcss from "@tailwindcss/vite";
import { siteConfig } from "./site.config.mjs";

// https://astro.build/config
export default defineConfig({
  site: siteConfig.site,
  vite: {
    plugins: [tailwindcss()],
  },
});
