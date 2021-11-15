import {
  Box,
  Heading,
  Link as ChakraLink,
  Image,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import Link from 'next/link';

import { urlFor } from '@lib/sanity';
import BlogAuthor from './BlogAuthor';

export default function PostPreview({ post }: any) {
  return (
    <>
      <Box
        display="flex"
        flexDirection={{ base: 'column', sm: 'row' }}
        justifyContent="space-between">
        <Box
          display="flex"
          flex="1"
          marginRight="3"
          position="relative"
          alignItems="center">
          <Box
            width={{ base: '100%', sm: '85%' }}
            zIndex="2"
            // marginLeft={{ base: '0', sm: '5%' }}
            marginTop="5%">
            <Image
              borderRadius="lg"
              src={
                urlFor(post.coverImage)
                  .width(800)
                  .auto('format')
                  .quality(80)
                  .fit('crop')
                  .url()!
              }
              alt={post.coverImage.alt}
              objectFit="contain"
            />
          </Box>
          {/*<Box zIndex="1" width="100%" position="absolute" height="100%">*/}
          {/*  <Box*/}
          {/*    bgGradient={useColorModeValue(*/}
          {/*      'radial(orange.600 1px, transparent 1px)',*/}
          {/*      'radial(orange.300 1px, transparent 1px)',*/}
          {/*    )}*/}
          {/*    backgroundSize="20px 20px"*/}
          {/*    opacity="0.4"*/}
          {/*    height="100%"*/}
          {/*  />*/}
          {/*</Box>*/}
        </Box>
        <Box
          display="flex"
          flex="1"
          flexDirection="column"
          justifyContent="center"
          marginTop={{ base: '3', sm: '0' }}>
          <Heading>
            <ChakraLink
              as={Link}
              textDecoration="none"
              _hover={{ textDecoration: 'none' }}
              href={`/blog/${post.slug}`}>
              {post.title}
            </ChakraLink>
          </Heading>
          <Text
            as="p"
            marginTop="2"
            color={useColorModeValue('gray.700', 'gray.200')}
            fontSize="lg"
            mb={3}>
            {post.excerpt}
          </Text>
          <BlogAuthor author={post.author} published={post.date} />
        </Box>
      </Box>
    </>
  );
}
