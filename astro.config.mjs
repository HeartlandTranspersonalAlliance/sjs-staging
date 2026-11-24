import { defineConfig } from "astro/config";
import icon from "astro-icon";

export default defineConfig({
  site: "https://safejourneysanctum.org",
  integrations: [
    icon({
      include: {
        tabler: ["*"]
      }
    })
  ]
});
