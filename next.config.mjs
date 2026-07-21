/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // GitHub Pages serves static files only — no Node server for SSR/ISR or
  // the next/image optimization API. This is a root user site
  // (raoulbouri.github.io), so no basePath/assetPrefix is needed.
  output: "export",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
