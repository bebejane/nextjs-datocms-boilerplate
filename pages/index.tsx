import styles from './index.module.scss'
import { GetStaticProps } from 'next'
import { AllPostsDocument } from '/graphql';
import withGlobalProps from "/lib/withGlobalProps";

export type HomeProps = { site:Site }

export default function Home({site } : HomeProps) {
	return (
		<div className={styles.container}>
			skabholmen
		</div>
	)
}

export const getStaticProps : GetStaticProps = withGlobalProps({queries:[AllPostsDocument]}, async ({props, revalidate } : any) => {
	
	return {
		props,
		revalidate
	};
});
