import { apiQuery, SEOQuery } from "../dato/api";
import { GetStaticProps } from 'next'
import { GetGlobal } from "/graphql";
import { DocumentNode } from 'graphql/language/ast';

export default function withGlobalProps(opt: any , callback : Function) : GetStaticProps {
  
  const revalidate : number = parseInt(process.env.REVALIDATE_TIME)
  const queries :[DocumentNode] = [GetGlobal]
  
  if(opt.query) 
    queries.push(opt.query)
  if(opt.queries) 
    queries.push.apply(queries, opt.queries)
  if(opt.model) 
    queries.push(SEOQuery(opt.model))
  
  return async (context) => {
    const props = await apiQuery(queries, {}, context.preview);

    if(callback)
      return await callback({context, props: {...props}, revalidate});
    else
      return { props:{...props}, context, revalidate};
  }
}