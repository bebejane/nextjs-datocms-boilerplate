import { NextRequest, NextResponse } from "next/server";
import cors from './cors'

export type PreviewLink = {
  label: string
  url: string
}

export default async function withWebPreviewsEdge(req: NextRequest, generatePreviewUrl: (record: any) => Promise<string | null>): Promise<Response> {

  const corsOptions = {
    origin: '*',
    methods: ['POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    preflightContinue: false,
  }


  if (!process.env.NEXT_PUBLIC_SITE_URL && !process.env.SITE_URL)
    throw new Error('NEXT_PUBLIC_SITE_URL is not set in .env')

  if (!process.env.DATOCMS_PREVIEW_SECRET)
    throw new Error('DATOCMS_PREVIEW_SECRET is not set in .env')

  if (req.method === 'OPTIONS')
    return cors(req, new Response('ok', { status: 200 }), corsOptions)

  const payload = await req.json()

  if (!payload)
    throw new Error('No form data in request body')

  const previewLinks = []
  let path = await generatePreviewUrl(payload);
  let baseUrl = process.env.NEXT_PUBLIC_SITE_URL || process.env.SITE_URL
  const isExternal = path?.startsWith('https://')

  if (isExternal) {
    const url = new URL(path)
    baseUrl = url.origin
    path = url.pathname
  }

  if (path) {
    previewLinks.push({ label: 'Live', url: `${baseUrl}${path}` })
    previewLinks.push({ label: 'Preview', url: `${baseUrl}/api/preview?slug=${path}&secret=${process.env.DATOCMS_PREVIEW_SECRET}` })
  }

  return cors(
    req,
    new Response(JSON.stringify({ previewLinks }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    }), corsOptions)
}