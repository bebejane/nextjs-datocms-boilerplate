import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export const SEOFragmentDoc = gql`
    fragment SEOFragment on Tag {
  attributes
  content
  tag
}
    `;
export const ImageFragmentDoc = gql`
    fragment ImageFragment on FileField {
  alt
  basename
  format
  height
  id
  mimeType
  size
  title
  url
  width
  customData
  responsiveImage {
    alt
    aspectRatio
    base64
    bgColor
    height
    sizes
    src
    srcSet
    webpSrcSet
    title
    width
  }
}
    `;
export const SiteFragmentDoc = gql`
    fragment SiteFragment on Site {
  favicon: faviconMetaTags {
    attributes
    content
    tag
  }
  globalSeo {
    facebookPageUrl
    siteName
    titleSuffix
    twitterAccount
    fallbackSeo {
      description
      title
      twitterCard
      image {
        ...ImageFragment
      }
    }
  }
}
    `;
export const VideoFragmentDoc = gql`
    fragment VideoFragment on FileField {
  id
  alt
  basename
  format
  mimeType
  size
  title
  url
  width
  height
  video {
    thumbnailUrl
    streamingUrl
    mp4high: mp4Url(res: high)
    mp4med: mp4Url(res: medium)
    mp4low: mp4Url(res: low)
    framerate
    duration
  }
}
    `;
export const GetAllPostsDocument = gql`
    query GetAllPosts {
  allPosts {
    title
    image {
      ...ImageFragment
    }
    video {
      ...VideoFragment
    }
  }
}
    ${ImageFragmentDoc}
${VideoFragmentDoc}`;

/**
 * __useGetAllPostsQuery__
 *
 * To run a query within a React component, call `useGetAllPostsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllPostsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllPostsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllPostsQuery(baseOptions?: Apollo.QueryHookOptions<GetAllPostsQuery, GetAllPostsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllPostsQuery, GetAllPostsQueryVariables>(GetAllPostsDocument, options);
      }
export function useGetAllPostsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllPostsQuery, GetAllPostsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllPostsQuery, GetAllPostsQueryVariables>(GetAllPostsDocument, options);
        }
export type GetAllPostsQueryHookResult = ReturnType<typeof useGetAllPostsQuery>;
export type GetAllPostsLazyQueryHookResult = ReturnType<typeof useGetAllPostsLazyQuery>;
export type GetAllPostsQueryResult = Apollo.QueryResult<GetAllPostsQuery, GetAllPostsQueryVariables>;
export const GetGlobalDocument = gql`
    query GetGlobal {
  site: _site {
    ...SiteFragment
  }
}
    ${SiteFragmentDoc}
${ImageFragmentDoc}`;

/**
 * __useGetGlobalQuery__
 *
 * To run a query within a React component, call `useGetGlobalQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetGlobalQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetGlobalQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetGlobalQuery(baseOptions?: Apollo.QueryHookOptions<GetGlobalQuery, GetGlobalQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetGlobalQuery, GetGlobalQueryVariables>(GetGlobalDocument, options);
      }
export function useGetGlobalLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetGlobalQuery, GetGlobalQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetGlobalQuery, GetGlobalQueryVariables>(GetGlobalDocument, options);
        }
export type GetGlobalQueryHookResult = ReturnType<typeof useGetGlobalQuery>;
export type GetGlobalLazyQueryHookResult = ReturnType<typeof useGetGlobalLazyQuery>;
export type GetGlobalQueryResult = Apollo.QueryResult<GetGlobalQuery, GetGlobalQueryVariables>;
export const GetSiteSEODocument = gql`
    query GetSiteSEO {
  site: _site {
    ...SiteFragment
  }
}
    ${SiteFragmentDoc}
${ImageFragmentDoc}`;

/**
 * __useGetSiteSEOQuery__
 *
 * To run a query within a React component, call `useGetSiteSEOQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSiteSEOQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSiteSEOQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetSiteSEOQuery(baseOptions?: Apollo.QueryHookOptions<GetSiteSEOQuery, GetSiteSEOQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetSiteSEOQuery, GetSiteSEOQueryVariables>(GetSiteSEODocument, options);
      }
export function useGetSiteSEOLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetSiteSEOQuery, GetSiteSEOQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetSiteSEOQuery, GetSiteSEOQueryVariables>(GetSiteSEODocument, options);
        }
export type GetSiteSEOQueryHookResult = ReturnType<typeof useGetSiteSEOQuery>;
export type GetSiteSEOLazyQueryHookResult = ReturnType<typeof useGetSiteSEOLazyQuery>;
export type GetSiteSEOQueryResult = Apollo.QueryResult<GetSiteSEOQuery, GetSiteSEOQueryVariables>;