import styles from './index.module.scss'
import { useScrollInfo } from 'dato-nextjs-utils/hooks';
import { withGlobalProps } from 'dato-nextjs-utils/hoc';
import type { GetStaticProps } from 'next'
import { AllPostsDocument } from '/graphql';
import Link from 'next/link';
export type HomeProps = { site:Site, posts: PostRecord[] }

export default function Home({site, posts } : HomeProps) {

	const {scrolledPosition} = useScrollInfo()

	return (
		<div className={styles.container}>
			{posts.map(({title, slug, content}, key) => 
				<Link href={`/posts/${slug}`} key={key}>
					<a>
						{title}
					</a>
				</Link>
			)}
			{scrolledPosition}
		</div>
	)
}

export const getStaticProps : GetStaticProps = withGlobalProps({queries:[AllPostsDocument]}, async ({props, revalidate } : any) => {
	
	return {
		props,
		revalidate
	};
});
