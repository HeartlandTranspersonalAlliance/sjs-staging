import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";

export default defineConfig({
  site: "https://heartlandtranspersonalalliance.github.io",
  base: "/sjs-staging",
  integrations: [
    tailwind({
      applyBaseStyles: false
    })
  ]
});
