import type { SanityImageSource } from '@sanity/image-url/lib/types/types';

import {
  createPortableTextComponent,
  createImageUrlBuilder,
  createPreviewSubscriptionHook,
} from 'next-sanity';

import { sanityConfig } from './config';

if (!sanityConfig.projectId) {
  throw Error('The Project ID is not set. Check your environment variables.');
}
export const urlFor = (source: SanityImageSource) =>
  createImageUrlBuilder(sanityConfig).image(source);

export const usePreviewSubscription =
  createPreviewSubscriptionHook(sanityConfig);

const serializers = {
  types: {
    code: (props: any) => `
      <pre data-language={props.node.language}>
        <code>{props.node.code}</code>
      </pre>
    `,
  },
};

// Set up Portable Text serialization
export const PortableText = createPortableTextComponent({
  ...sanityConfig,
  // Serializers passed to @sanity/block-content-to-react
  // (https://github.com/sanity-io/block-content-to-react)
  serializers,
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
