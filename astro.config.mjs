import { existsSync, readdirSync, renameSync, rmdirSync } from "node:fs";

import { defineConfig, envField } from "astro/config";

import sitemap from "@astrojs/sitemap";
import cloudflare from "@astrojs/cloudflare";

// The work gallery is worth indexing once it holds a project; until then the
// page also sets noindex, and a sitemap must not disagree with it.
// Same shape the projects collection loads: one directory per project.
const emptyGallery = !readdirSync("src/content/projects", { withFileTypes: true }).some(
  (entry) => entry.isDirectory() && existsSync(`src/content/projects/${entry.name}/project.yaml`),
);

// Same list as src/i18n/locales.ts, which this file cannot import. Every page
// lives under one of them; the old unprefixed URLs redirect to English in
// public/_redirects (no comments there: the adapter reads every line as a rule).
const locales = ["en", "it", "fr"];

// Cloudflare Pages answers an unknown URL with the nearest 404.html up its
// path. Astro only writes a 404.html for src/pages/404.astro (the top-level
// one), so the localized pages ([lang]/404.astro) are moved into place here.
const notFoundPages = {
  name: "not-found-pages",
  hooks: {
    "astro:build:done": ({ dir }) => {
      for (const lang of locales) {
        const folder = new URL(`${lang}/404/`, dir);
        renameSync(new URL("index.html", folder), new URL(`${lang}/404.html`, dir));
        rmdirSync(folder);
      }
    },
  },
};

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
    sitemap({
      filter: (page) =>
        !page.endsWith("/404/") && !(emptyGallery && page.includes("/websites/gallery")),
      // Each page lists its other languages, as the pages' hreflang links do.
      i18n: { defaultLocale: "en", locales: Object.fromEntries(locales.map((l) => [l, l])) },
    }),
    notFoundPages,
  ],
});
