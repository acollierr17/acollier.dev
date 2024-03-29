// Credits: https://github.com/sreetamdas/sreetamdas.com/blob/main/src/components/blog/rss.tsx
import { Feed } from 'feed';
import type { Author } from 'feed';
import type { Category } from 'feed/lib/typings';

import { getAllBlogPosts } from './sanity/sanity.server';
import { urlFor } from './sanity';

type FeedType = 'regular' | 'atom' | 'json';

export default async function generateRssFeed(type: FeedType) {
  const posts = await getAllBlogPosts();
  const siteUrl =
    process.env.NODE_ENV === 'production'
      ? 'https://acollier.dev'
      : 'https://acollierdev.ngrok.io';
  const date = new Date();
  const author: Author = {
    name: 'Anthony Collier',
    email: 'hello@acollier.dev',
    link: `${siteUrl}/about`,
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
      date: new Date(post.published),
      category: post.categories.map((cat: Category) => ({ name: cat })),
      image: urlFor(post.coverImage)
        .width(1820)
        .height(904)
        .auto('format')
        .quality(80)
        .url()!
        .replace(/&/g, '&amp;'),
    });
  }

  const mappedTypes: Record<FeedType, string> = {
    regular: 'rss2',
    atom: 'atom1',
    json: 'json1',
  };

  return feed[mappedTypes[type]]();
}
