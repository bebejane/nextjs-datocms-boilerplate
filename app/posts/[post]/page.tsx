'use server'
'use server'

import s from './page.module.scss'
import { notFound } from 'next/navigation';
import { apiQuery } from '/lib/client';
import { AllPostsDocument, PostDocument } from '/lib/graphql';
import { DatoMarkdown as Markdown } from 'dato-nextjs-utils/components';

export async function generateStaticParams() {
  const { posts } = await apiQuery<AllPostsQuery>(AllPostsDocument);

  return posts.map((post) => ({
    post: post.slug,
  }))
}

export default async function Post({ params }: { params: { post: string } }) {

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