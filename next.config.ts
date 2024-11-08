// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "10008",
        pathname: "/wp-content/uploads/**",
      },
    ],
  },
  env: {
    NEXT_PUBLIC_WORDPRESS_API_URL: process.env.NEXT_PUBLIC_WORDPRESS_API_URL,
    NEXT_PUBLIC_SCRAPING_DATA_URL: process.env.NEXT_PUBLIC_SCRAPING_DATA_URL,
  },
  experimental: {
    // turbo: false, // Desactiva Turbopack
  },
};

export default nextConfig;
