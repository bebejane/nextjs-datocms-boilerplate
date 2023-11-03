import basicAuth from './basic-auth';

import { Client, buildClient } from '@datocms/cma-client-browser';
import { ItemType } from '@datocms/cma-client/dist/types/generated/SimpleSchemaTypes.js';

const tests = async (req: Request): Promise<Response> => {
  return await basicAuth(req, async (req: Request) => {
    const results = await testApiEndpoints()
    const params = new URLSearchParams(req.url.split('?')[1])

    if (params.get('json'))
      return new Response(JSON.stringify(results), { status: 200, headers: { 'Content-Type': 'application/json' } })
    else
      return new Response(testResultsToHtml(results), { status: 200, headers: { 'Content-Type': 'text/html' } })
  })
}

export default tests

const baseApiUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/api`

type PreviewLink = {
  label: string
  url: string
}

type RevalidateResponse = {
  revalidated: boolean,
  paths: string[]
  delays: number
  event_type: string
}

type TestResult = {
  model: string
  previews?: PreviewLink[]
  revalidate?: RevalidateResponse
}

export async function testApiEndpoints() {

  const client = buildClient({ apiToken: process.env.DATOCMS_API_TOKEN })
  const site = await client.site.find()

  console.log(`Testing site: ${site.name}`)

  const itemTypes = await client.itemTypes.list()
  const models = itemTypes.filter(t => !t.modular_block)

  const results = await Promise.all(models.map(async (model, i) => {

    const r: TestResult = { model: model.api_key }
    console.log(`${i + 1}/${models.length}: ${r.model}`)

    try {
      const previews = await testWebPreviewsEndpoint(model, client)
      if (previews.length > 0) {
        r.previews = previews
      }
    } catch (e) { }

    try {
      r.revalidate = await testRevalidateEndpoint(model, client)
    } catch (e) { }

    return r
  }))

  return results.sort((a, b) => a.model > b.model ? 1 : -1)
}

export const testResultsToString = (results: TestResult[]) => {
  const tests = results.map(r => {
    return `${r.model} - Previews: ${r.previews ? 'YES' : 'NO'} / Revalidate: ${r.revalidate ? 'YES' : 'NO'}`
  }).join('\n')

  const previews = results.filter(r => r.previews).map(r => r.model).sort((a, b) => a > b ? 1 : -1).join('\n')
  const revalidate = results.filter(r => r.revalidate?.paths.length).map(r => r.model).sort((a, b) => a > b ? 1 : -1).join('\n')
  const nopreviews = results.filter(r => !r.previews).map(r => r.model).sort((a, b) => a > b ? 1 : -1).join('\n')
  const norevalidate = results.filter(r => !r.revalidate || !r.revalidate?.paths.length).map(r => r.model).sort((a, b) => a > b ? 1 : -1).join('\n')

  return `WEB PREVIEWS\n${previews}\n\nNO WEB PREVIEWS:\n${nopreviews}\n\nREVALIDATE\n${revalidate}\n\nNO REVALIDATE\n${norevalidate}`

}

export const testResultsToHtml = (results: TestResult[]) => {
  return `
    <html>
      <head>
        <style>
          table {
            border-collapse: collapse;
            width: 400px;
          }
          th, td {
            padding: 5px;
            text-align:left;
          }
          .center{
            text-align:center;
          }
          .error{
            color:red;
          }
        </style>
      </head>
      <body>
        <pre>
        <table>
          <thead>
            <tr>
              <th>Model</th>
              <th>Web Previews</th>
              <th>Revalidate</th>
            </tr>
          </thead>
          <tbody>
            ${results.map(r => `
              <tr 
                title="Web Previews\n-----------\n${!r.previews ? '' : r.previews?.map(p => `${p.label}: ${p.url}`).join('\n')}\n\nRevalidate\n-----------\n${!r.revalidate ? '' : r.revalidate?.paths?.join('\n')}"
                class="${!r.previews || !r.revalidate?.revalidated ? 'error' : ''}"
              >
                <td>${r.model}</td>
                <td class="center">${r.previews ? 'x' : '-'}</td>
                <td class="center">${r.revalidate?.revalidated ? 'x' : '-'}</td>
              </tr>
            `).join('')}
          </tbody>
        </pre>
      </body>
    </html>
  `
}

const testWebPreviewsEndpoint = async (itemType: ItemType, client: Client): Promise<PreviewLink[]> => {

  const item = (await client.items.list({ filter: { type: itemType.api_key } }))[0]
  const res = await fetch(`${baseApiUrl}/web-previews`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Basic ${btoa(`${process.env.BASIC_AUTH_USER}:${process.env.BASIC_AUTH_PASSWORD}`)}`
    },
    body: JSON.stringify({
      item: {
        attributes: item || {}
      },
      itemType: {
        attributes: itemType
      },
      environmentId: "main",
      locale: "en"
    })
  })

  const json = await res.json()
  return json.previewLinks

}

const testRevalidateEndpoint = async (itemType: ItemType, client: Client): Promise<RevalidateResponse> => {

  const item = (await client.items.list({ filter: { type: itemType.api_key } }))[0]
  const res = await fetch(`${baseApiUrl}/revalidate`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Basic ${btoa(`${process.env.BASIC_AUTH_USER}:${process.env.BASIC_AUTH_PASSWORD}`)}`
    },
    body: JSON.stringify({
      "environment": "main",
      "entity_type": "item",
      "event_type": "update",
      "entity": {
        "id": item.id,
        "type": "item",
        "attributes": {
          ...item || {}
        },
        "relationships": {
          "item_type": {
            "data": {
              "id": itemType.id,
              "type": "item_type"
            }
          }
        },
        "meta": {
          ...item.meta,
          "updated_at": new Date().toISOString(),
          "published_at": new Date().toISOString(),
          "created_at": new Date().toISOString()
        }
      },
      "related_entities": [
        {
          "id": itemType.id,
          "type": "item_type",
          "attributes": itemType
        }
      ],
    })
  })
  if (res.status === 200) {
    const json = await res.json()
    return json
  } else {
    throw new Error(`Error testing revalidate endpoint: ${res.status} ${res.statusText}`)
  }
}