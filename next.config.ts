import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true, // Good for catching bugs in development
  swcMinify: true,       // Use the Rust compiler for faster builds
  experimental: {
    serverActions: {}, // Enable server actions if you're using them
  },
  
  eslint: {
    ignoreDuringBuilds: true, // Optional: speeds up build if eslint is slow
  },
  typescript: {
    ignoreBuildErrors: true, // Optional: removes TS checks on build (for dev only)
  },
};

export default nextConfig;
