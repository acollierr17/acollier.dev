import { PortableText } from '@lib/sanity';

export default function PostBody({ content }: any) {
  return <PortableText blocks={content} />;
}
