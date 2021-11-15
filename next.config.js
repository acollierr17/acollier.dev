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
  /* config options here */
  distDir: 'build',
  rewrites: () => [STUDIO_REWRITE],
};

module.exports = nextConfig;
