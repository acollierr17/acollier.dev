import { Box } from '@chakra-ui/react';

// @ts-ignore
import BlockContent from '@sanity/block-content-to-react';

export default function PostBody({ content }: any) {
  return (
    <Box>
      <BlockContent
        blocks={content}
        projectId={process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}
        dataset={process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'}
      />
    </Box>
  );
}
