const postFields = `
  _id,
  name,
  title,
  'categories': categories[]->title,
  'published': publishedAt,
  'edited': _updatedAt,
  excerpt,
  'slug': slug.current,
  'coverImage': mainImage,
  'author': author->{name, 'picture': image.asset->url, 'created': _createdAt, 'slug': slug.current},
  body,
`;

export const indexQuery = `
*[_type == "post"] | order(date desc, _updatedAt desc) {
  ${postFields}
}`;

export const postSlugsQuery = `
*[_type == "post" && defined(slug.current)][].slug.current
`;

export const postBySlugQuery = `
*[_type == "post" && slug.current == $slug] | order(_updatedAt desc) {
  ${postFields}
}`;
