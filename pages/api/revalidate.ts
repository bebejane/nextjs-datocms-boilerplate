import withRevalidate from '/lib/dato/webhook/withRevalidate'

export default withRevalidate(async (record, revalidate) => {
  
  const { api_key: apiKey } = record.model;
  const { slug }  = record
  const paths = []

  switch (apiKey) {
    case 'start':
      paths.push(`/`)
      break;
    default:
      break;
  }
  revalidate(paths)
})