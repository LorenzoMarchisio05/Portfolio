import { defineConfig, envField } from "astro/config";

import react from "@astrojs/react";
import cloudflare from "@astrojs/cloudflare";

import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  site: "https://lorenzomarchisio.dev",
  output: "server",
  env: {
    schema: {
      EMAIL_USER: envField.string({ context: "server", access: "secret" }),
      EMAIL_PASS: envField.string({ context: "server", access: "secret" }),
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
    resolve: {
      // Without this, Vite inlines its own copy of React into both the motion and
      // astro-react dep bundles. Two Reacts means "Invalid hook call", which leaves
      // every animated element stuck at its server-rendered opacity: 0.
      dedupe: ["react", "react-dom"],
      // Use react-dom/server.edge instead of react-dom/server.browser for React 19.
      // Without this, MessageChannel from node:worker_threads needs to be polyfilled.
      // (`X && {...}` yields `false` in dev, which is not a valid alias value.)
      alias: import.meta.env.PROD
        ? { "react-dom/server": "react-dom/server.edge" }
        : {},
    },
    optimizeDeps: {
      include: ["react", "react-dom", "react-dom/client", "motion/react"],
    },
  },
  integrations: [react()],
});
