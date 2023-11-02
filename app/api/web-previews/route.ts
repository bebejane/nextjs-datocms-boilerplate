import { NextRequest } from 'next/server';
import withWebPreviewsEdge from './withWebPreviewsEdge.js'

export const runtime = "edge"

export async function POST(req: NextRequest) {

  return withWebPreviewsEdge(req, async ({ item, itemType, locale }) => {

    let path = null;

    const { slug } = item.attributes

    switch (itemType.attributes.api_key) {
      case 'start':
        path = `/`
        break;
      case 'post':
        path = `/posts/${slug}`
        break;
      case 'user':
        path = `/users/${slug}`
        break;
      default:
        break;
    }

    return path
  })
}