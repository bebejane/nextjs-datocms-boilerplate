import type { NextRequest } from 'next/server'

export const config = {
  runtime: 'experimental-edge',
}

export default async function handler(req: NextRequest) {
  return new Response(
    JSON.stringify({
      city: req.headers.get('x-vercel-ip-city'),
      country: req.headers.get('x-vercel-ip-country'),
      region: req.headers.get('x-vercel-ip-country-region'),
      headers:{...req.headers}
    }),
    {
      status: 200,
      headers: {
        'content-type': 'application/json',
      },
    }
  )
}
