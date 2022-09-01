import styles from './index.module.scss'
import styleVars from '/styles/exports.module.scss';

import { GetStaticProps } from 'next'
import withGlobalProps from "/lib/withGlobalProps";

export type HomeProps = { site:Site }

export default function Home({site } : HomeProps) {
	console.log({styleVars})	
	return (
		<div className={styles.container}>
			hola
		</div>
	)
}

export const getStaticProps : GetStaticProps = withGlobalProps({queries:[]}, async ({props, revalidate } : any) => {
	
	return {
		props,
		revalidate
	};
});
