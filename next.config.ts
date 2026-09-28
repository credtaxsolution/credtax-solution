import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: '/favicon.ico',
          destination: '/api/favicon',
        },
      ],
      afterFiles: [],
      fallback: [],
    };
  },
};

export default nextConfig;
