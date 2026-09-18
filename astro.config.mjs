import { existsSync, readdirSync } from "node:fs";

import { defineConfig, envField } from "astro/config";

import sitemap from "@astrojs/sitemap";
import cloudflare from "@astrojs/cloudflare";

// The work gallery is worth indexing once it holds a project; until then the
// page also sets noindex, and a sitemap must not disagree with it.
// Same shape the projects collection loads: one directory per project.
const emptyGallery = !readdirSync("src/content/projects", { withFileTypes: true }).some(
  (entry) => entry.isDirectory() && existsSync(`src/content/projects/${entry.name}/project.yaml`),
);

export default defineConfig({
  site: "https://lorenzomarchisio.me",
  output: "server",
  // The CSS rides in the HTML instead of costing a round trip before first
  // paint; about 9 KB gzipped on the heaviest page.
  build: { inlineStylesheets: "always" },
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
  integrations: [
    sitemap({ filter: (page) => !(emptyGallery && page.includes("/websites/gallery")) }),
  ],
});
