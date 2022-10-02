import styles from './index.module.scss'
import { GetStaticProps } from 'next'
import withGlobalProps from "/lib/withGlobalProps";
import Markdown from '/lib/dato/components/Markdown';

export type HomeProps = { site:Site , allPosts: PostRecord[]}

export default function Home({site } : HomeProps) {
	return (
		<div className={styles.container}>
			
		</div>
	)
}

export const getStaticProps : GetStaticProps = withGlobalProps({queries:[]}, async ({props, revalidate } : any) => {
	
	return {
		props,
		revalidate
	};
});
