import type { NextConfig } from "next";
import { performanceHeaders } from "./src/lib/performance/cache-headers";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  /** Enable gzip compression on the Node.js server (YSlow #3). */
  compress: true,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  experimental: {
    /** Tree-shake large packages to reduce JS payload (YSlow #2). */
    optimizePackageImports: ["framer-motion", "matter-js"],
  },
  async redirects() {
    return [
      {
        source: "/security.txt",
        destination: "/.well-known/security.txt",
        permanent: true,
      },
    ];
  },
  async headers() {
    return [...performanceHeaders];
  },
};

export default nextConfig;
