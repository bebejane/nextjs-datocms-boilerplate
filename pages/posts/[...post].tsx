import styles from './[...post].module.scss'
import { withGlobalProps } from 'dato-nextjs-utils/hoc';
import { apiQuery } from 'dato-nextjs-utils/api';
import { DatoMarkdown } from 'dato-nextjs-utils/components';
import type { GetStaticProps } from 'next'
import { PostDocument, AllPostsDocument } from '/graphql';
import { Image } from 'react-datocms'
export type PostProps = { post: PostRecord }

export default function Post({ post }: PostProps) {

	return (
		<div className={styles.container}>
			<h1>{post.title}</h1>
			{post.content &&
				<DatoMarkdown>
					{post.content}
				</DatoMarkdown>
			}
			{post.image && <Image data={post.image.responsiveImage} />}
		</div>
	)
}

export async function getStaticPaths(context) {
	const { posts } = await apiQuery(AllPostsDocument)
	const paths = posts.map(({ slug }) => ({ params: { post: [slug] } }))
	return {
		paths,
		fallback: 'blocking'
	}
}


export const getStaticProps: GetStaticProps = withGlobalProps({ queries: [] }, async ({ props, revalidate, context }: any) => {
	const { post } = await apiQuery(PostDocument, { variables: { slug: context.params.post[0] } })

	if (!post)
		return { notFound: true }

	return {
		props: {
			...props,
			post
		},
		revalidate
	};
});
