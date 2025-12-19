// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: true,
//   swcMinify: true,
//   images: {
//     formats: ['image/avif', 'image/webp'],
//     deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
//     imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
//     remotePatterns: [
//       {
//         protocol: 'https',
//         hostname: 'images.unsplash.com',
//       },
//       {
//         protocol: 'https',
//         hostname: '**.googleusercontent.com',
//       },
//     ],
//   },
//   async headers() {
//     return [
//       {
//         source: '/(.*)',
//         headers: [
//           {
//             key: 'X-DNS-Prefetch-Control',
//             value: 'on',
//           },
//           {
//             key: 'Strict-Transport-Security',
//             value: 'max-age=31536000; includeSubDomains',
//           },
//           {
//             key: 'X-Content-Type-Options',
//             value: 'nosniff',
//           },
//           {
//             key: 'X-Frame-Options',
//             value: 'SAMEORIGIN',
//           },
//           {
//             key: 'X-XSS-Protection',
//             value: '1; mode=block',
//           },
//           {
//             key: 'Referrer-Policy',
//             value: 'origin-when-cross-origin',
//           },
//         ],
//       },
//     ]
//   },
// }

// module.exports = nextConfig

// next.config.ts
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp'],
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