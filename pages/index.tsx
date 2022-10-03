import styles from './index.module.scss'
import withGlobalProps from "/lib/withGlobalProps";
import type { GetStaticProps } from 'next'

export type HomeProps = { site:Site }

export default function Home({site } : HomeProps) {
	return (
		<div className={styles.container}>
			hej {site?.globalSeo.siteName}
		</div>
	)
}

export const getStaticProps : GetStaticProps = withGlobalProps({queries:[]}, async ({props, revalidate } : any) => {
	
	return {
		props,
		revalidate
	};
});
