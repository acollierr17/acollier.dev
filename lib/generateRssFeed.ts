// Credits: https://github.com/sreetamdas/sreetamdas.com/blob/main/src/components/blog/rss.tsx
import fs from 'fs';
import { Feed } from 'feed';

import { getAllBlogPosts } from './sanity.server';

export default async function generateRssFeed() {
  const posts = await getAllBlogPosts();
  const siteUrl = 'https://acollier.dev';
  const date = new Date();
  const author = {
    name: 'Anthony Collier',
    email: 'hello@acollier.dev',
    link: 'https://twitter.com/acollierr17',
  };

  const feed = new Feed({
    title: "Anthony Collier's Blog",
    description: 'Keep up wih new thoughts and ideas I share to the world.',
    id: siteUrl,
    link: siteUrl,
    image: `${siteUrl}/logo.png`,
    favicon: `${siteUrl}/favicon.ico`,
    copyright: `All rights reserved ${date.getFullYear()}, Anthony Collier`,
    updated: date,
    generator: 'Feed for Node.js',
    feedLinks: {
      rss2: `${siteUrl}/rss/feed.xml`,
      json: `${siteUrl}/rss/feed.json`,
      atom: `${siteUrl}/rss/atom.xml`,
    },
    author,
  });

  for (const post of posts) {
    const url = `${siteUrl}/blog/${post.slug}`;

    feed.addItem({
      title: post.title,
      id: url,
      link: url,
      description: post.excerpt,
      content: post.excerpt,
      author: [author],
      contributor: [author],
      date: new Date(post.published),
    });
  }

  fs.mkdirSync('./public/rss', { recursive: true });
  fs.writeFileSync('./public/rss/feed.xml', feed.rss2());
  fs.writeFileSync('./public/rss/atom.xml', feed.atom1());
  fs.writeFileSync('./public/rss/feed.json', feed.json1());
}
