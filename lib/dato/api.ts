import { DocumentNode } from 'graphql/language/ast';
import gql from 'graphql-tag';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import GetIntl from '/graphql/GetIntl.graphql';
import { buildClient } from '@datocms/cma-client-node';
import { buildClient as buildClientBrowser} from '@datocms/cma-client-browser';
import { isServer } from '/lib/utils';

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
      fetchPolicy: process.env.DEV_CACHE ? 'cache-first' : 'network-only',
      errorPolicy: 'all',
    }
  }
});

export type ApiQueryOptions = {variables : any | [any], preview?: boolean}

export const apiQuery = async (query: DocumentNode | [DocumentNode], {variables, preview = false} : ApiQueryOptions) : Promise<any> => {
  
  if(query === null) 
    throw "Invalid Query!"

  if(!GRAPHQL_API_TOKEN) 
    throw "No api token in .env.local"

  const batch = (Array.isArray(query) ? query : [query]).map((q, idx) => {
    const vars = Array.isArray(variables) && variables.length > idx -1 ? variables[idx] : variables || {}
    return client.query({query:q, variables:vars})
  })
  
  const data = await Promise.all(batch)
  let result = {}
  data.forEach((res) => result = {...result, ...res?.data})
  return result
}

export const SEOQuery = (schema: string) => {
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
  `
}

type IntlMessage = { key:string, value:string }

export const intlQuery = async (page : string, locale : string, fallbackLocales : [string] = ['en']) : Promise<any> => {

  const res = await apiQuery(GetIntl, { variables: { page, locale, fallbackLocales }})
  const messages : [IntlMessage] = res.messages
  const dictionary : {[page:string]: any} = {[page]:{}}
  messages.forEach(({key, value}) => dictionary[page][key] = value)
  return dictionary
}

export const datoError = (err : Error) =>{
  console.log(err)
  return err.message || err
}