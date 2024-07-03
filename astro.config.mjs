import { defineConfig } from "astro/config";
import node from "@astrojs/node";

// https://astro.build/config
export default defineConfig({
  site: "https://luisfelipesantofimio.github.io",
  base: "aronnax-erm/dist/",
  i18n: {
    defaultLocale: "es",
    locales: ["es", "en"],
    routing: {
      prefixDefaultLocale: true,
      trailingSlash: true,
    },
  },
});
