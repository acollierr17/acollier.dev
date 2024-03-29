import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  res.clearPreviewData();

  res.writeHead(307, { Location: `/blog/${req?.query?.slug}` ?? '/' });
  return res.end();
}
