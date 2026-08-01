import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,

  experimental: {
    serverActions: {},
  },

  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;