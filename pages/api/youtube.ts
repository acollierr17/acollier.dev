import { google } from 'googleapis';
import type { NextApiRequest, NextApiResponse } from 'next';
import googleAuth from '@lib/google';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const auth = await googleAuth.getClient();
  const youtube = google.youtube({
    auth,
    version: 'v3',
  });

  const CHANNEL_ID = 'UCI_HY3KnAH_VusYqFvL2U9g';

  const response = await youtube.channels.list({
    id: [CHANNEL_ID],
    part: ['statistics'],
  });

  if (!response) {
    return res.status(200).json({ message: `No statistics for ${CHANNEL_ID}` });
  }

  const channel = response.data!.items![0];
  const { subscriberCount, viewCount } = channel.statistics!;

  res.setHeader(
    'Cache-Control',
    'public, s-maxage=1200, stale-while-revalidate=600',
  );

  return res.status(200).json({
    subscriberCount,
    viewCount,
  });
}
