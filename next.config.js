// @ts-check
const withPWA = require('next-pwa');
const runtimeCaching = require('next-pwa/cache');

const STUDIO_REWRITE = {
  source: '/studio/:path*',
  destination:
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:3333/studio/:path*'
      : '/studio/index.html',
};

/**
 * @type {import('next').NextConfig}
 **/
const nextConfig = {
  distDir: 'build',
  rewrites: () => [STUDIO_REWRITE],
  swcMinify: true,
  pwa: {
    dest: 'public',
    disable: process.env.NODE_ENV === 'development',
    register: true,
    skipWaiting: true,
    runtimeCaching,
    buildExcludes: [/middleware-manifest.json$/],
  },
};

module.exports = withPWA(nextConfig);
