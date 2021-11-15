import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useToast } from '@chakra-ui/react';
import { NextSeo } from 'next-seo';

import client, { getClient, urlFor, usePreviewSubscription } from '@lib/sanity';
import { postBySlugQuery, postSlugsQuery } from '@lib/queries';

import BlogPost from '../../components/blog/BlogPost';

export default function Post({ data, preview }: any) {
  const router = useRouter();
  const toast = useToast();

  const toastId = 'preview-toast';
  const slug = data?.page?.slug;

  const exitPreview = () => {
    window.location.replace(`/api/exit-preview?slug=${slug}`);
  };

  const { data: previewData } = usePreviewSubscription(postBySlugQuery, {
    params: { slug },
    initialData: data?.page,
    enabled: preview && slug,
  });

  useEffect(() => {
    if (!preview) return;
    if (toast.isActive(toastId)) return;
    toast({
      title: 'Preview Mode Activated!',
      description:
        'Any changes you make in the CMS will be displayed here in realtime. Exit this message to quit.',
      status: 'success',
      isClosable: true,
      duration: null,
      onCloseComplete: () => {
        exitPreview();
      },
    });
  }, [preview]);

  const post = filterDataToSingleItem(previewData, preview);

  if (!router.isFallback && !slug) {
    return <div>Post not found. Woops!</div>;
  }

  return (
    <>
      {router.isFallback ? (
        <div>Loading...</div>
      ) : (
        <>
          <NextSeo
            title={post.title}
            description={post.excerpt}
            openGraph={{
              title: post.title,
              description: post.excerpt,
              url: `https://acollier.dev/blog/${slug}`,
              type: 'article',
              article: {
                publishedTime: post.date,
                authors: ['https://acollier.dev/about'],
              },
              images: [
                {
                  url: urlFor(post.coverImage)
                    .width(800)
                    .auto('format')
                    .quality(80)
                    .fit('crop')
                    .url()!,
                  width: 800,
                  height: 600,
                  alt: post.coverImage.alt,
                  type: 'image/jpeg',
                },
              ],
            }}
          />
          <BlogPost post={post} slug={slug} />
        </>
      )}
    </>
  );
}

function filterDataToSingleItem(data: Array<any> | any, preview) {
  if (!Array.isArray(data)) return data;

  if (data.length === 1) return data[0];

  if (preview) {
    return data.find((item: any) => item._id.startsWith('drafts.')) || data[0];
  }

  return data[0];
}

export async function getStaticProps({ params, preview = false }: any) {
  const post = await getClient(preview).fetch(postBySlugQuery, {
    slug: params.slug,
  });
  if (post?.length < 1) return { notFound: true };

  const page = filterDataToSingleItem(post, preview);

  return {
    props: {
      preview,
      data: {
        page,
      },
    },
    revalidate: 10,
  };
}

export async function getStaticPaths() {
  const paths = await client.fetch(postSlugsQuery);
  return {
    paths: paths.map((slug) => ({ params: { slug } })),
    fallback: true,
  };
}
