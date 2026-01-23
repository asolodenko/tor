import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '1337',
        pathname: '/uploads/**',
      },
    ],
  },
};

export default nextConfig;
