import s from './[post].module.scss'
import { apiQuery, apiQueryAll } from 'dato-nextjs-utils/api';
import withGlobalProps from '/lib/withGlobalProps';
import type { GetStaticProps } from 'next'
import { AllPostsDocument, PostDocument } from '/lib/graphql';
import { DatoMarkdown as Markdown } from 'dato-nextjs-utils/components';
import { Image } from 'react-datocms';
import { useLivePreview } from 'dato-nextjs-utils/hooks';

export type Props = {
  post: PostRecord
  preview: boolean
}

export default function Post({ post: _post, preview }: Props) {

  const { data: { post }, error } = useLivePreview(PostDocument, { post: _post }, { variables: { slug: _post.slug }, preview })

  if (error)
    return <div>{error.message}</div>


  return (
    <div className={s.container}>
      <h1>{post.title}</h1>
      <Markdown>{post.content}</Markdown>
      {post.image && <Image data={post.image.responsiveImage} className={s.image} />}
    </div>
  )
}

export async function getStaticPaths() {
  const { posts } = await apiQueryAll(AllPostsDocument)
  const paths = posts.map(({ slug }) => ({ params: { post: slug } }))
  return {
    paths,
    fallback: 'blocking'
  }
}

export const getStaticProps: GetStaticProps = withGlobalProps(null, async ({ props, revalidate, context }) => {

  const { post } = await apiQuery(PostDocument, { variables: { slug: context.params.post }, preview: context.preview })

  if (!post) return { notFound: true }

  return {
    props: {
      ...props,
      post
    },
    revalidate
  }

})
