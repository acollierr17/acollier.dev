import {
  Image,
  Text,
  HStack,
  Link as ChakraLink,
  useColorModeValue,
} from '@chakra-ui/react';
import Link from 'next/link';

import { urlFor } from '@lib/sanity';

export default function BlogAuthor({ author, published }: any) {
  const textColor = useColorModeValue('current', '#999999');

  return (
    <HStack display="flex" alignItems="center">
      <Image
        borderRadius="full"
        boxSize="24px"
        src={
          urlFor(author.picture)
            .width(24)
            .auto('format')
            .quality(80)
            .fit('crop')
            .url()!
        }
        alt={`Avatar of ${author.name}`}
      />
      <Text color={textColor} fontSize="sm">
        <ChakraLink as={Link} href={author.slug === 'anthony' ? '/about' : '#'}>
          {author.name}
        </ChakraLink>
      </Text>
      <Text as="span" color={textColor} fontSize="sm">
        —
      </Text>
      <Text color={textColor} fontSize="sm">
        {new Date(published).toLocaleDateString('en-US', {
          day: 'numeric',
          month: 'long',
          year: 'numeric',
        })}
      </Text>
    </HStack>
  );
}
