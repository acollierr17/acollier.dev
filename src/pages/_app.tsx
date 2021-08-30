import { ChakraProvider } from '@chakra-ui/react';
import type { AppProps } from 'next/app';
import { DefaultSeo } from 'next-seo';
import theme from '../theme';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <DefaultSeo titleTemplate="Anthony • %s" defaultTitle="Anthony Collier" />
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
