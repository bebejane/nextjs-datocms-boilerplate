import { withWebPreviewsEdge as POST } from 'dato-nextjs-utils/hoc';

export const runtime = "edge"

export default POST(async ({ item, itemType, locale }) => {

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