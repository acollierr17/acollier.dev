import fs from 'fs';
import { SitemapStream, streamToPromise } from 'sitemap';

import { getAllBlogPostSlugs } from './sanity.server';
import { Readable } from 'stream';

const defaultUrls = [
  { url: '/', priority: 1 },
  { url: '/blog/', changefreq: 'daily', priority: 0.7 },
  { url: '/about', priority: 0.5 },
  { url: '/projects', priority: 0.5 },
];

export default async function generateSitemap() {
  const siteUrl =
    process.env.NODE_ENV === 'production'
      ? 'https://acollier.dev'
      : 'https://acollierdev.ngrok.io';

  const slugs = await getAllBlogPostSlugs();

  const urls = [
    ...defaultUrls,
    ...slugs.map((slug) => ({ url: `/blog/${slug}`, priority: 0.5 })),
  ];

  const stream = new SitemapStream({
    hostname: siteUrl,
  });

  const sitemapXml = await streamToPromise(
    Readable.from(urls).pipe(stream),
  ).then((data) => data.toString());
  console.log('sitemap', sitemapXml);
}
