import type { NextConfig } from "next";

// GitHub Pages serves the site from /<repo>; the Pages workflow sets PAGES_BASE_PATH.
const basePath = process.env.PAGES_BASE_PATH ?? "";
const isPages = basePath !== "";

const nextConfig: NextConfig = {
  basePath,
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
  ...(isPages && { output: "export", trailingSlash: true }),
  images: {
    formats: ["image/avif", "image/webp"],
    // Static hosting has no image optimizer.
    unoptimized: isPages,
  },
};

export default nextConfig;
