/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Disable linting during build to avoid Vercel failure on small warnings
  eslint: {
    ignoreDuringBuilds: true,
  },
  webpack: (config) => {
    config.resolve.alias.canvas = false;
    return config;
  },
};

module.exports = nextConfig;
