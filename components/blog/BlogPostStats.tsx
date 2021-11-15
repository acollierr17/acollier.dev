import { Text, useColorModeValue } from '@chakra-ui/react';
import readingTime from 'reading-time';

import { blocksToText } from '@lib/sanity';
import ViewCounter from './ViewCounter';

export default function BlogPostStats({ post, slug }: any) {
  return (
    <>
      <Text color={useColorModeValue('current', '#999999')} fontSize="sm">
        {readingTime(blocksToText(post.body)).text}
        {' • '}
        <ViewCounter slug={slug} />
      </Text>
    </>
  );
}
