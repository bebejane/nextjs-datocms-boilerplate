import type { NextApiRequest, NextApiResponse } from 'next'

export default async function api(req: NextApiRequest, res: NextApiResponse) {
  res.json({data:'hej api'})
}