'use server'
'use server'

import { notFound } from 'next/navigation';
import s from './page.module.scss'
import { apiQuery } from '/lib/client';
import { PostDocument } from '/lib/graphql';
import { DatoMarkdown as Markdown } from 'dato-nextjs-utils/components';

export default async function Post({ params }) {

  const { post } = await apiQuery<PostQuery>(PostDocument, { variables: { slug: params.post } });

  if (!post)
    return notFound();

  return (
    <div className={s.container}>
      <h1>{post.title}</h1>
      <Markdown>{post.content}</Markdown>
    </div>
  )
}