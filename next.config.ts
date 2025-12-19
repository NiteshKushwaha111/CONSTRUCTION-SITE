/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",

  basePath: "/CONSTRUCTION-SITE",
  assetPrefix: "/CONSTRUCTION-SITE",

  images: {
    unoptimized: true,
  },

  trailingSlash: true,
};

module.exports = nextConfig;
