import styles from './index.module.scss'
import withGlobalProps from "/lib/withGlobalProps";
import type { GetStaticProps } from 'next'
import { AllPostsDocument } from '/graphql';
import Link from 'next/link';

export type HomeProps = { site:Site, posts: PostRecord[] }

export default function Home({site, posts } : HomeProps) {
	return (
		<div className={styles.container}>
			{posts.map(({title, slug}, key) => 
				<Link href={`/posts/${slug}`} key={key}>
					<a>
						{title}
					</a>
				</Link>
			)}
		</div>
	)
}

export const getStaticProps : GetStaticProps = withGlobalProps({queries:[AllPostsDocument]}, async ({props, revalidate } : any) => {
	
	return {
		props,
		revalidate
	};
});
