import { Box, Container } from '@chakra-ui/react';
import type { ReactNode } from 'react';

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <Container maxW="container.md">
        <Box my={6} maxW="2xl">
          <Navbar />
          {children}
          <Footer />
        </Box>
      </Container>
    </>
  );
}
