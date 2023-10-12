import { withRevalidate } from 'dato-nextjs-utils/hoc';

export default withRevalidate(async (record, revalidate) => {

  const { api_key } = record.model;
  const { slug, updated_at } = record
  const paths = []

  switch (api_key) {
    case 'post':
      paths.push(`/posts/${slug}`)
      paths.push(`/`)
      break;
    default:
      break;
  }
  console.log('revalidating paths', `${Math.abs(new Date(updated_at).getTime() - new Date().getTime())}ms`, paths)
  revalidate(paths)
})