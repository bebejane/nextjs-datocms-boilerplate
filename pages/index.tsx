import s from './index.module.scss'
import withGlobalProps from '/lib/withGlobalProps';
import type { GetStaticProps } from 'next'
import { AllPostsDocument } from '/graphql';
import Link from 'next/link';

export type HomeProps = {
	posts: PostRecord[]
}

export default function Home({ posts }: HomeProps) {

	return (
		<div className={s.container}>
			<h1>Posts</h1>
			<ul>
				{posts.map(post => (
					<li key={post.id}>
						<Link href={`/posts/${post.slug}`}>
							{post.title} {post.updatedAt}
						</Link>
					</li>
				))}
			</ul>
			{posts.length === 0 && 'No posts yet...'}
		</div>
	)
}

export const getStaticProps: GetStaticProps = withGlobalProps({ query: AllPostsDocument })
