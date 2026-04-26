/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Next.js 16 (Turbopack) compatibility
  turbopack: {}, 
  // Keep webpack for backward compatibility or if using tools that haven't migrated
  webpack: (config) => {
    config.resolve.alias.canvas = false;
    return config;
  },
};

module.exports = nextConfig;
