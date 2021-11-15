import { Box, Heading, HStack } from '@chakra-ui/react';

import BlogAuthor from './BlogAuthor';
import PostBody from './PostBody';
import BlogPostStats from './BlogPostStats';

export default function BlogPost({ post, slug }: any) {
  return (
    <>
      <Box
        display="flex"
        flex="1"
        flexDirection="column"
        justifyContent="center"
        marginTop={{ base: '3', sm: '0' }}>
        <Heading size="2xl">{post.title}</Heading>
        <HStack my={8} alignItems="center" justifyContent="space-between">
          <BlogAuthor author={post.author} published={post.date} />
          <BlogPostStats post={post} slug={slug} />
        </HStack>
        <PostBody content={post.body} />
      </Box>
    </>
  );
}
