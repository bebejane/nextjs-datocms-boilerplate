import { ApolloClient, InMemoryCache } from '@apollo/client';
import { BatchHttpLink } from "@apollo/client/link/batch-http"; 
import { TypedDocumentNode, gql } from '@apollo/client';

export type IntlMessage = { key:string, value:string }
export type ApiQueryOptions = { variables?: any | any[], preview?: boolean}

const isServer = typeof window === 'undefined';
const GRAPHQL_API_ENDPOINT = process.env.GRAPHQL_API_ENDPOINT || process.env.NEXT_PUBLIC_GRAPHQL_API_ENDPOINT || `https://graphql.datocms.com`;
const GRAPHQL_API_TOKEN = (isServer ? process.env.GRAPHQL_API_TOKEN : process.env.NEXT_PUBLIC_GRAPHQL_API_TOKEN) || null

export const apiQuery = async (query: TypedDocumentNode | TypedDocumentNode[], options? : ApiQueryOptions) : Promise<any> => {
  
  const { variables, preview = false} = options || {}

  if(query === null) 
    throw "Invalid Query!"

  if(!GRAPHQL_API_TOKEN) 
    throw "No api token in .env.local"
  
  client.setLink(preview ? previewLink : link)

  try{
    
    const batch = (Array.isArray(query) ? query : [query]).map((q, idx) => {
      const vars = Array.isArray(variables) && variables.length > idx -1 ? variables[idx] : variables || {}
      return client.query({query:q, variables:vars})
    })
  
    const data = await Promise.all(batch)
    const errors = data.filter(({errors}) => errors).map(({errors})=> errors?.reduce((curr, acc) => curr + '. ' + acc.message, ''))
    
    if(errors.length)
      throw new Error(errors.join('. '))
    
    let result = {}
    data.forEach((res) => result = {...result, ...res?.data})
    return result

  }catch(err){
    throw err
  }
}


const loggingFetch = async (input: RequestInfo, init?: RequestInit): Promise<Response>  => {
  
  const operations = init !== undefined  && init.body ? (JSON.parse(init.body.toString())).map((op : {operationName:string}) => op.operationName) : []
  const requestName = `${operations.join(', ')}`
  const response = await fetch(input, init)
  const t = new Date().getTime()

  return {
    ...response,
    async text () {
      const result = await response.text()
      console.log("\x1b[33m%s\x1b[0m", 'gql  ', `- ${requestName}`, `- ${new Date().getTime()-t}ms`)
      return result
    }
  }
}

const linkConfig = {
  uri: GRAPHQL_API_ENDPOINT,
  fetch: process.env.LOG_GRAPHQL ? loggingFetch : undefined,
  batchMax: 10, 
  batchInterval: 50,
  headers: { 
    'Authorization': `Bearer ${GRAPHQL_API_TOKEN}`
  }
}

const link = new BatchHttpLink(linkConfig)
const previewLink = new BatchHttpLink({...linkConfig, headers:{...linkConfig.headers, 'X-Include-Drafts': true}})

export const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
  ssrMode: isServer,
  defaultOptions: {
    query: {
      fetchPolicy: process.env.DEV_CACHE ? 'cache-first' : 'no-cache',
      errorPolicy: 'all',
    }
  }
});

export const SEOQuery = (schema: string) : TypedDocumentNode => {
  const q = "query GetSEO {seo: " + schema + " {id tags: _seoMetaTags {attributes content tag}}}";
  return gql(q) as TypedDocumentNode
}

export const datoError = (err : Error) =>{
  console.log(err)
  return err.message || err
}