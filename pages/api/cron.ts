import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  cron: boolean
}

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

  //console.log(req.headers.authorization)
  console.log('cron', req.headers.authorization, process.env.CRON_SECRET)

  res.status(200).json({ cron: true })

}