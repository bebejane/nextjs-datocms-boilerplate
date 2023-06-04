import { withRevalidate } from 'dato-nextjs-utils/hoc'

export default withRevalidate(async (record, revalidate) => {

  const { api_key: apiKey } = record.model;
  const { slug } = record
  const paths = []

  switch (apiKey) {
    case 'post':
      paths.push(`/posts/${slug}`)
      break;
    case 'user':
      paths.push(`/users/${slug}`)
      break;
    default:
      break;
  }
  revalidate(paths)
})