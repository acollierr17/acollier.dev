import React from 'react';
import type { SanityImageSource } from '@sanity/image-url/lib/types/types';
import type { PreviewData } from 'next';

import {
  createClient,
  createPortableTextComponent,
  createImageUrlBuilder,
  createPreviewSubscriptionHook,
} from 'next-sanity';

import { config } from './config';

if (!config.projectId) {
  throw Error('The Project ID is not set. Check your environment variables.');
}
export const urlFor = (source: SanityImageSource) =>
  createImageUrlBuilder(config).image(source);

export const imageBuilder = (source: SanityImageSource) =>
  createImageUrlBuilder(config).image(source);

export const usePreviewSubscription = createPreviewSubscriptionHook(config);

const serializers = {
  types: {
    code: (props: any) => (
      <pre data-language={props.node.language}>
        <code>{props.node.code}</code>
      </pre>
    ),
  },
};

// Set up Portable Text serialization
export const PortableText = createPortableTextComponent({
  ...config,
  // Serializers passed to @sanity/block-content-to-react
  // (https://github.com/sanity-io/block-content-to-react)
  serializers,
});

export const client = createClient(config);

export const previewClient = createClient({
  ...config,
  useCdn: false,
});

const defaults = { nonTextBehavior: 'remove' };
export const blocksToText = (blocks, opts?) => {
  const options = { ...defaults, ...opts };
  return blocks
    .map((block) => {
      if (block._type !== 'block' || !block.children) {
        return options.nonTextBehavior === 'remove'
          ? ''
          : `[${block._type} block]`;
      }

      return block.children.map((child) => child.text).join('');
    })
    .join('\n\n');
};

export const getClient = (usePreview: PreviewData) =>
  usePreview ? previewClient : client;
export default client;
