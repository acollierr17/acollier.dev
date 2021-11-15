import { ChakraProvider } from '@chakra-ui/react';
import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import type { ReactElement, ReactNode } from 'react';
import { DefaultSeo } from 'next-seo';

import theme from '../theme';

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <ChakraProvider theme={theme}>
      <DefaultSeo
        titleTemplate="%s • Anthony Collier"
        defaultTitle="Anthony Collier"
        openGraph={{
          type: 'website',
          locale: 'en_US',
          url: 'https://acollier.dev',
          site_name: 'Anthony Collier',
        }}
        twitter={{
          handle: '@acollierr17',
          site: '@acollierr17',
          cardType: 'summary_large_image',
        }}
        additionalMetaTags={[
          {
            property: 'theme-color',
            content: '#dd9323',
          },
        ]}
      />
      {getLayout(<Component {...pageProps} />)}
    </ChakraProvider>
  );
}

export default MyApp;
