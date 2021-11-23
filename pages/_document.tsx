import Document, { Head, Html, Main, NextScript } from 'next/document';
import { ColorModeScript } from '@chakra-ui/react';
import type { DocumentContext } from 'next/document';

import theme from '../theme';

export default class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/icons/apple-touch-icon.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/icons/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/icons/favicon-16x16.png"
          />
          <link rel="manifest" href="/icons/site.webmanifest" />
          <link
            rel="mask-icon"
            href="/icons/safari-pinned-tab.svg"
            color="#dd9323"
          />
          <link rel="shortcut icon" href="/icons/favicon.ico" />
          <meta name="apple-mobile-web-app-title" content="Anthony Collier" />
          <meta name="application-name" content="Anthony Collier" />
          <meta name="msapplication-TileColor" content="#dd9323" />
          <meta
            name="msapplication-config"
            content="/icons/browserconfig.xml"
          />
          <meta name="theme-color" content="#dd9323" />
        </Head>
        <body>
          <ColorModeScript initialColorMode={theme.config.initialColorMode} />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
