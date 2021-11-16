import { useRouter } from 'next/router';
import { Heading, VStack } from '@chakra-ui/react';
import { NextSeo } from 'next-seo';

import { getClient, usePreviewSubscription } from '@lib/sanity';
import { indexQuery } from '@lib/queries';
import PostPreview from '../../components/blog/PostPreview';
import generateRssFeed from '../../lib/generateRssFeed';

export default function Posts({ data, preview }: any) {
  const router = useRouter();

  const { data: postsData } = usePreviewSubscription(indexQuery, {
    initialData: data?.posts,
    enabled: preview ?? router.query.preview,
  });

  if (!router.isFallback && !postsData?.length) {
    return <div>Posts could not be found.</div>;
  }

  return (
    <>
      <NextSeo
        title="Blog"
        description="Keep up with new thoughts and ideas I share to the world."
        openGraph={{
          title: 'Blog',
          description:
            'Keep up wih new thoughts and ideas I share to the world.',
          url: 'https://acollier.dev/blog',
        }}
      />
      <Heading as="h1">Recent Posts</Heading>
      <VStack spacing={12} marginTop={{ base: '1', sm: '5' }}>
        {postsData.map((post: any, i: number) => (
          <PostPreview key={i} post={post} />
        ))}
      </VStack>
    </>
  );
}

export async function getStaticProps({ preview = false }: any) {
  const posts = await getClient(preview).fetch(indexQuery);
  await generateRssFeed();

  return {
    props: {
      data: { posts },
      preview,
    },
    revalidate: 10,
  };
}
