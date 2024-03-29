import '@fontsource/mulish/400.css';
import '@fontsource/raleway/700.css';

import { ChakraProvider } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { DefaultSeo } from 'next-seo';
import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import type { ReactElement, ReactNode } from 'react';

import theme from '../theme';
import Layout from '../layouts/layout';

import { useAnalytics } from '@lib/analytics';

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  useAnalytics();

  const router = useRouter();

  return (
    <ChakraProvider theme={theme}>
      <DefaultSeo
        titleTemplate="%s • Anthony Collier"
        defaultTitle="Anthony Collier"
        description="My corner on the internet. Welcome!"
        canonical={`https://acollier.dev${router.asPath}`}
        openGraph={{
          type: 'website',
          locale: 'en_US',
          url: `https://acollier.dev${router.asPath}`,
          site_name: 'Anthony Collier',
          title: 'Anthony Collier',
          description: 'My corner on the internet. Welcome!',
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
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ChakraProvider>
  );
}

export default MyApp;
