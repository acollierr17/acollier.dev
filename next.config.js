// @ts-check
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
};

module.exports = nextConfig;
