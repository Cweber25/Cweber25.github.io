import type { NextConfig } from 'next';

const isProd = process.env.NODE_ENV === 'production';

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  // Only use basePath and assetPrefix in production (for GitHub Pages)
  ...(isProd && {
    basePath: '/ResumePage',
    assetPrefix: '/ResumePage',
  }),
}

export default nextConfig
