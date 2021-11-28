import type { GetServerSidePropsContext } from 'next';

import { getAllBlogPosts } from '@lib/sanity/sanity.server';

export default function Sitemap() {}

const generateSitemap = (posts: Array<any>): string => {
  const baseUrl = {
    development: 'https://acollierdev.ngrok.io',
    production: 'https://acollier.dev',
  }[process.env.NODE_ENV as string];

  return `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="https://www.sitemaps.org/schemas/sitemap/0.9">
      <url>
        <loc>${baseUrl}</loc>
        <changefreq>monthly</changefreq>
        <priority>1.0</priority>
      </url>
      <url>
        <loc>${baseUrl}/about</loc>
        <changefreq>monthly</changefreq>
        <priority>1.0</priority>
      </url>
      <url>
        <loc>${baseUrl}/blog</loc>
        <changefreq>monthly</changefreq>
        <priority>1.0</priority>
      </url>
      ${posts.map((post) => {
        const route = `${baseUrl}/blog/${post.slug}`;

        return `
            <url>
              <loc>${route}</loc>
              <changefreq>weekly</changefreq>
              <priority>0.7</priority>
            </url>`;
      })}
    </urlset>
  `;
};

export async function getServerSideProps({ res }: GetServerSidePropsContext) {
  const posts = await getAllBlogPosts();

  res.setHeader('Content-Type', 'text/xml');
  res.write(generateSitemap(posts));
  res.end();

  return {
    props: {},
  };
}
