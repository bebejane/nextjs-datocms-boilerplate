
import { default as POST } from './withRevalidate';

export const runtime = "edge"

export default POST(async (record, revalidate) => {

  const { api_key } = record.model;
  const { slug } = record
  const paths = []

  switch (api_key) {
    case 'post':
      paths.push(`/posts/${slug}`)
      paths.push(`/`)
      break;
    default:
      break;
  }

  await revalidate(paths)
})