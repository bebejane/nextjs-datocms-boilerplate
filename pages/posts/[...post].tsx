import styles from './[...post].module.scss'
import withGlobalProps from "/lib/withGlobalProps";
import type { GetStaticProps } from 'next'
import { PostDocument, AllPostsDocument } from '/graphql';
import { apiQuery } from '/lib/dato/api';
import { StructuredText, Image} from 'react-datocms'
import Markdown from '/lib/dato/components/Markdown';
export type PostProps = { post: PostRecord }

export default function Post({ post } : PostProps) {
	return (
		<div className={styles.container}>
			<h1>{post.title}</h1>
			<Markdown>
				{post.content}
			</Markdown>
			{post.image && <Image data={post.image.responsiveImage}/>}
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


export const getStaticProps : GetStaticProps = withGlobalProps({queries:[]}, async ({props, revalidate, context } : any) => {
	const { post } = await apiQuery(PostDocument, { variables: { slug: context.params.post[0] } })
	
	return {
		props:{
			...props,
			post
		},
		revalidate
	};
});
