import styles from './index.module.scss'
import { withGlobalProps } from 'dato-nextjs-utils/hoc';
import type { GetStaticProps } from 'next'
import { AllPostsDocument } from '/graphql';
import Link from 'next/link';

export type HomeProps = { site: Site, posts: PostRecord[] }

export default function Home({ posts }: HomeProps) {

	return (
		<div className={styles.container}>
			<h1>Posts</h1>
			{posts.map(({ title, slug }, key) =>
				<Link href={`/posts/${slug}`} key={key}>
					{title}
				</Link>
			)}
		</div>
	)
}

export const getStaticProps: GetStaticProps = withGlobalProps({ queries: [AllPostsDocument] }, async ({ props, revalidate }: any) => {

	return {
		props,
		revalidate
	};
});
