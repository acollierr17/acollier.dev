import { useEffect } from 'react';
import useSWR from 'swr';

import fetcher from '@lib/fetcher';
import type { Views } from '@lib/types';

export default function ViewCounter({ slug }) {
  const { data } = useSWR<Views>(`/api/views/${slug}`, fetcher);
  const views = Number(data?.total);

  useEffect(() => {
    const registerView = () => {
      fetcher(`/api/views/${slug}`, {
        method: 'POST',
      });
    };

    registerView();
  }, [slug]);

  return <span>{`${views > 0 ? views.toLocaleString() : '---'} views`}</span>;
}
