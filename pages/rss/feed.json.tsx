import type { GetServerSidePropsContext } from 'next';

import generateRssFeed from '@lib/generateRssFeed';

export default function RssJson() {}

export async function getServerSideProps({ res }: GetServerSidePropsContext) {
  const feed = await generateRssFeed('json');

  /**  Set Cache Control in vercel @see https://vercel.com/docs/edge-network/caching#stale-while-revalidate */
  res.setHeader('Cache-Control', 's-maxage=30, stale-while-revalidate');

  res.setHeader('Content-Type', 'application/json');
  res.write(feed);
  res.end();

  return {
    props: {},
  };
}
