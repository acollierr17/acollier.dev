import type { PreviewData } from 'next';

import { createClient } from 'next-sanity';

import { sanityConfig } from './config';
import { indexQuery, postSlugsQuery } from './queries';

if (!sanityConfig.projectId) {
  throw Error('The Project ID is not set. Check your environment variables.');
}

export const sanityClient = createClient(sanityConfig);

export const previewClient = createClient(sanityConfig);

export const getClient = (usePreview?: PreviewData) =>
  usePreview ? previewClient : sanityClient;

export const getAllBlogPosts = () => sanityClient.fetch(indexQuery);
export const getAllBlogPostSlugs = () => sanityClient.fetch(postSlugsQuery);

export default sanityClient;
