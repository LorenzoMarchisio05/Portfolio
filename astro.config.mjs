import { defineConfig, envField } from "astro/config";

import sitemap from "@astrojs/sitemap";
import cloudflare from "@astrojs/cloudflare";

import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  site: "https://lorenzomarchisio.dev",
  output: "server",
  env: {
    schema: {
      RESEND_API_KEY: envField.string({ context: "server", access: "secret" }),
    },
  },

  adapter: cloudflare({
    imageService: "passthrough",
    platformProxy: {
      enabled: true,
    },
  }),
  vite: {
    plugins: [tailwindcss()],
  },

  integrations: [sitemap()],
});
