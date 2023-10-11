import { apiQuery } from "dato-nextjs-utils/api";
import { GetStaticProps, GetServerSideProps } from 'next'
import { GlobalDocument, } from "/graphql";
import type { TypedDocumentNode } from "@apollo/client/core/types.js";

export type GlobalPropsOptions = {
  query?: TypedDocumentNode,
  queries?: TypedDocumentNode[],
}

export default function withGlobalProps(opt?: GlobalPropsOptions, callback?: Function): GetStaticProps | GetServerSideProps {

  const revalidate: number = parseInt(process.env.REVALIDATE_TIME)
  const queries: TypedDocumentNode[] = [GlobalDocument]

  if (opt?.query)
    queries.push(opt.query)
  if (opt?.queries)
    queries.push.apply(queries, opt.queries)

  return async (context: any) => {

    const props = await apiQuery(queries, { preview: context.preview });

    if (callback)
      return await callback({ context, props: { ...props }, revalidate });
    else
      return { props: { ...props }, revalidate };
  }
}