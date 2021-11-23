// Credit: https://github.com/leerob/leerob.io/blob/main/pages/api/github.ts
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const [user, repos] = await Promise.all([
    fetch('https://api.github.com/users/acollierr17'),
    fetch('https://api.github.com/users/acollierr17/repos?per_page=100'),
  ]).then((res) => Promise.all(res.map((x) => x.json())));

  const mine = repos.filter((repo) => !repo.fork);
  const stars = mine.reduce((acc, repo) => {
    return acc + repo['stargazers_count'];
  }, 0);

  res.setHeader(
    'Cache-Control',
    'public, s-maxage=1200, stale-while-revalidate=600',
  );

  return res.status(200).json({
    followers: user.followers,
    stars,
  });
}
