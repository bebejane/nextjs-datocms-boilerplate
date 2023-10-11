import s from './[post].module.scss'
import { apiQuery, apiQueryAll } from 'dato-nextjs-utils/api';
import withGlobalProps from '/lib/withGlobalProps';
import type { GetStaticProps } from 'next'
import { AllPostsDocument, PostDocument } from '/graphql';

export type Props = {
  post: PostRecord
}

export default function Post({ post }: Props) {

  return (
    <div className={s.container}>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
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

  if (!post) {
    return {
      notFound: true
    }
  }

  return {
    props: {
      ...props,
      post,
    },
    revalidate
  }

})