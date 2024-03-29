import { withWebPreviewsEdge } from 'dato-nextjs-utils/hoc';

export const config = {
  runtime: 'edge'
}

export default withWebPreviewsEdge(async ({ item, itemType, locale }) => {

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