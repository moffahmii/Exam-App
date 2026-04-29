import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'elevate-bootcamp.cloud',
        pathname: '/storage/**',
      },
      {
        protocol: 'https',
        hostname: 'www.elevate-bootcamp.cloud',
        pathname: '/storage/**',
      },
      {
        protocol: 'https',
        hostname: 'exam-app.elevate-bootcamp.cloud',
        pathname: '/storage/**',
      },
    ],
  },
  experimental: {
    authInterrupts: true,
  },
};

export default nextConfig;