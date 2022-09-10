import type { NextApiRequest, NextApiResponse } from 'next'
import { buildClient } from '@datocms/cma-client-node';

const getPathsFromPayload = async (payload: any, record: any) => {
  const paths = []
  const { apiKey } = record.model;

  return ['/'];
}

export const basicAuth = (req: NextApiRequest) => {
  const basicAuth = req.headers.authorization
  if (!basicAuth) return true;

  const auth = basicAuth.split(' ')[1]
  const [user, pwd] = Buffer.from(auth, 'base64').toString().split(':')
  return user === process.env.BASIC_AUTH_USER && pwd === process.env.BASIC_AUTH_PASSWORD
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  if (!basicAuth(req))
    return res.status(401).send('Access denied')

  res.json({ revalidated: true })

  try {

    const payload = req.body?.entity;
    const record = await getRecordFromPayload(payload)

    if (!payload)
      throw 'Payload is empty'

    const paths = await getPathsFromPayload(payload, record)

    if (!paths.length)
      throw new Error(`Nothing to revalidate`);

    const result = await Promise.all(paths.map(path => res.revalidate(path)))
    console.log('revalidated', paths)
  } catch (err: any) {
    console.log(err)
    res.status(500).send(`Error revalidating: ${err.message || err}`)
  }
}

const getRecordFromPayload = async (payload: any) => {

  const modelId = payload?.relationships?.item_type?.data?.id

  if (!modelId) throw 'Model id not found in payload!'

  const apiToken = process.env.GRAPHQL_API_TOKEN || process.env.NEXT_PUBLIC_GRAPHQL_API_TOKEN || null
  const client = buildClient({ apiToken })
  const model = (await client.itemTypes.list()).filter(m => m.id === modelId)[0]
  const record = (await client.items.list({ filter: { type: model.api_key, fields: { id: { eq: payload.id } } } }))[0]

  if (!record)
    throw `No record found with modelId: ${modelId}`

  return { ...record, model }
}

