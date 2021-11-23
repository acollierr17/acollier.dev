import Link from 'next/link';
import { Heading, Link as ChakraLink } from '@chakra-ui/react';

export default function FourOhFour() {
  return (
    <>
      <Heading>404 - Page Not Found</Heading>
      <ChakraLink as={Link} href="/">
        Go back home
      </ChakraLink>
    </>
  );
}
