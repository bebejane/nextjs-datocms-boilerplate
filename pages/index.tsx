import styles from './index.module.scss'
import { GetStaticProps } from 'next'
import { withGlobalProps } from "/lib/hoc";
import { GetAllPostsDocument } from '/graphql';

import type { PostRecord, Site } from '/@types/datocms';
import { useGetGlobalQuery } from '/graphql/hooks';

export type HomeProps = { site:Site, allPosts : PostRecord[]}

export default function Home({site, allPosts} : HomeProps) {
	
	return (
		<div className={styles.container}>
			
		</div>
	)
}

/*
export const getStaticProps : GetStaticProps = withGlobalProps({
	queries:[GetAllPostsDocument]
}, async ({props, revalidate } : any) => {
	
	return {
		props,
		revalidate
	};
});
*/