import { ApolloClient, InMemoryCache } from '@apollo/client';
import { buildClient } from '@datocms/cma-client-node';
import { buildClient as buildClientBrowser} from '@datocms/cma-client-browser';
import { isServer } from '/lib/utils';
import { TypedDocumentNode, gql } from '@apollo/client';

export type IntlMessage = { key:string, value:string }

export const GRAPHQL_API_ENDPOINT = `https://graphql.datocms.com`;
export const GRAPHQL_PREVIEW_API_ENDPOINT = `https://graphql.datocms.com/preview`;
export const GRAPHQL_API_TOKEN = (isServer ? process.env.GRAPHQL_API_TOKEN : process.env.NEXT_PUBLIC_GRAPHQL_API_TOKEN) || null
export const Dato = (isServer ? buildClient : buildClientBrowser)({apiToken:GRAPHQL_API_TOKEN})

export const client = new ApolloClient({
  uri: GRAPHQL_API_ENDPOINT,
  cache: new InMemoryCache(),
  headers: { Authorization: `Bearer ${GRAPHQL_API_TOKEN}` },
  ssrMode: isServer,
  defaultOptions: {
    query: {
      fetchPolicy: process.env.DEV_CACHE ? 'cache-first' : 'no-cache',
      errorPolicy: 'all',
    }
  }
});

export type ApiQueryOptions = {variables?: any | any[], preview?: boolean}

export const apiQuery = async (query: TypedDocumentNode | TypedDocumentNode[], options? : ApiQueryOptions) : Promise<any> => {
  
  const { variables, preview = false} = options || {}
  if(query === null) 
    throw "Invalid Query!"

  if(!GRAPHQL_API_TOKEN) 
    throw "No api token in .env.local"

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
}

export const SEOQuery = (schema: string) : TypedDocumentNode => {
  return gql`
    query GetSEO {
      seo: ${schema} {
        id
        tags: _seoMetaTags {
          attributes
          content
          tag
        }
      }
    }
  ` as TypedDocumentNode
}

export const datoError = (err : Error) =>{
  console.log(err)
  return err.message || err
}