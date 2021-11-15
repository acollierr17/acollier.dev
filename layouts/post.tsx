import { Container, Heading } from '@chakra-ui/react';

export default function PostLayout({ children, post }) {
  return (
    <Container maxW={'7xl'} p="12">
      <Heading as="h1">{post.title}</Heading>
    </Container>
  );
}
