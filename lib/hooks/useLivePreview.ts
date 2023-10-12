import { useQuerySubscription } from 'react-datocms';
import { DocumentNode } from '@apollo/client/core';

export type LivePreviewOptions = {
  preview: boolean
  variables?: any
  apiToken?: string
}

export default function useLivePreview(
  query: DocumentNode,
  initialData: any = {},
  options: LivePreviewOptions = {
    preview: false,
    variables: {},
    apiToken: process.env.NEXT_PUBLIC_GRAPHQL_API_TOKEN
  }) {

  const { data, error, status } = useQuerySubscription({
    token: options.apiToken,
    query: query,
    initialData,
    variables: options.variables,
    enabled: options.preview,
    includeDrafts: options.preview,
    excludeInvalid: true,
    reconnectionPeriod: 5000,
  })
  console.log(data)

  return { data, error, status }

}