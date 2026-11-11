import type { NextConfig } from "next";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? process.env.NEXT_PUBLIC_SITE_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  trailingSlash: true,

  experimental: {
    cpus: 1,
    staticGenerationMaxConcurrency: 1,
  },

  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },

  output: "export",

  images: {
    unoptimized: true
  },

  basePath: basePath || undefined,
  assetPrefix: basePath ? `${basePath}/` : undefined
};

export default nextConfig;
