import type { GetServerSidePropsContext } from 'next';
import { globby } from 'globby';
import { getAllBlogPosts } from '@lib/sanity.server';

export default function Sitemap() {}

const generateSitemap = async (): Promise<string> => {
  const baseUrl = {
    development: 'https://acollierdev.ngrok.io',
    production: 'https://acollier.dev',
  }[process.env.NODE_ENV as string];

  const [pages, posts] = await Promise.all([
    globby([
      'pages/*.*',
      'pages/blog/index.*',
      '!pages/_*.*',
      '!pages/api',
      '!pages/404.*',
      '!pages/sitemap.*',
    ]),
    getAllBlogPosts(),
  ]);

  return `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="https://www.sitemaps.org/schemas/sitemap/0.9">
      <!-- We'll render the URLs for our sitemap here. -->
      ${[
        pages.map((page) => {
          const route = page
            .replace('pages', '')
            .replace('index', '')
            .replace('.tsx', '')
            .replace('.js', '');

          return `
            <url>
              <loc>${`${baseUrl + route}`}</loc>
              <changefreq>monthly</changefreq>
              <priority>1.0</priority>
            </url>`;
        }),
        posts.map((post) => {
          const route = `${baseUrl}/blog/${post.slug}`;

          return `
            <url>
              <loc>${route}</loc>
              <changefreq>weekly</changefreq>
              <priority>0.7</priority>
            </url>`;
        }),
      ]
        .flat()
        .join('')}
    </urlset>
  `;
};

export async function getServerSideProps({ res }: GetServerSidePropsContext) {
  const sitemap = await generateSitemap();

  res.setHeader('Content-Type', 'text/xml');
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
}
