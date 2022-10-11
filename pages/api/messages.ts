import { NextApiRequest, NextApiResponse } from 'next'
import { Redis } from '@upstash/redis'

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
})

export const config = {
  runtime: 'experimental-edge'
}

export default async function handler(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const m = searchParams.get('m')
  let messages = await redis.get('messages')
  
  messages = messages ? messages as string[] : []
  
  if(m){
    messages.push(m)
    let msg = await redis.set('messages', JSON.stringify(messages), {get:true})  
  }

  return new Response(
    JSON.stringify(messages),
    {
      status: 200,
      headers: {
        'content-type': 'application/json',
        'cache-control': 'public, s-maxage=1200, stale-while-revalidate=600',
      },
    }
  )
}

/*
export default async function preview(req : NextApiRequest, res : NextApiResponse) {
  
  const m = req.query.m
  let messages = await redis.get('messages')
  
  messages = messages ? messages as string[] : []
  
  if(m){
    messages.push(m)
    let msg = await redis.set('messages', JSON.stringify(messages), {get:true})
    console.log(msg);
    
  }
  //console.log(messages);
  res.status(200).json(messages)
}
*/