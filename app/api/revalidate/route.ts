
import withRevalidate from './withRevalidate';

export const runtime = "edge"

export async function POST(req: Request) {

  return await withRevalidate(req, async (record, revalidate) => {

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

    return revalidate(paths)
  })
}