// next.config.ts
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/CONSTRUCTION-SITE",
  assetPrefix: "/CONSTRUCTION-SITE/",
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    unoptimized: true,
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: '**.googleusercontent.com',
      },
    ],
  },
}

export default nextConfig