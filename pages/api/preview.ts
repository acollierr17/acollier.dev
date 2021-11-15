import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (!req?.query?.secret) {
    return res.status(401).json({ message: 'No secret token' });
  }

  // Check the secret and next parameters
  // This secret should only be known to this API route and the CMS
  if (req.query.secret !== process.env.SANITY_PREVIEW_SECRET) {
    return res.status(401).json({ message: 'Invalid secret token' });
  }

  if (!req.query.slug) {
    return res.status(401).json({ message: 'No slug' });
  }

  // const post = await sanity.fetch()

  // Enable Preview Mode by setting the cookies
  res.setPreviewData({});

  // Redirect to the path from the fetched post
  // We don't redirect to req.query.slug as that might lead to open redirect vulnerabilities
  res.writeHead(307, { Location: `/blog/${req?.query?.slug}` ?? '/' });

  return res.end();
}
