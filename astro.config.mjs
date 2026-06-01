import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import icon from "astro-icon";

export default defineConfig({
  site: "https://heartlandtranspersonalalliance.github.io",
  base: "/sjs-staging",
  integrations: [
    icon({
      include: {
        tabler: ["*"]
      }
    }),
    tailwind({
      applyBaseStyles: false
    })
  ]
});
