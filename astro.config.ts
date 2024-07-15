import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import remarkToc from "remark-toc";
import remarkCollapse from "remark-collapse";
import sitemap from "@astrojs/sitemap";
import { SITE } from "./src/config";

import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  site: SITE.url,
  integrations: [
    tailwind({
      applyBaseStyles: false,
    }),
    sitemap(),
    react(),
  ],
  markdown: {
    remarkPlugins: [
      remarkToc,
      [
        remarkCollapse,
        {
          test: "Table of contents",
        },
      ],
    ],
    shikiConfig: {
      themes: {
        light: "catppuccin-latte",
        dark: "catppuccin-mocha",
      },
      wrap: true,
    },
  },
  vite: {
    optimizeDeps: {
      exclude: ["@resvg/resvg-js"],
    },
  },
  scopedStyleStrategy: "where",
});
