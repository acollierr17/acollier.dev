const remoteUrl = 'https://acollier.dev';
const localUrl = 'http://localhost:3000';

export default function resolveProductionUrl(doc) {
  const baseUrl =
    window.location.hostname === 'localhost' ? localUrl : remoteUrl;

  const previewUrl = new URL(baseUrl);

  previewUrl.pathname = '/api/preview';
  previewUrl.searchParams.append('secret', process.env.SANITY_PREVIEW_SECRET);
  previewUrl.searchParams.append('slug', doc?.slug?.current ?? '/');

  return previewUrl.toString();
}
