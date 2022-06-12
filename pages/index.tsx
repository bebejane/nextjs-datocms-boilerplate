import styles from './index.module.scss'
import { GetStaticProps } from 'next'
import { withGlobalProps } from "/lib/hoc";
import Markdown from '/lib/dato/components/Markdown';

export default function Home(props : any) {
	const { siteName } = props
	
	return (
		<div className={styles.container}>
			{siteName ? siteName : 'NextJS + Dato'}
			<Markdown>
				hej
			</Markdown>
		</div>
	)
}

export const getStaticProps : GetStaticProps = withGlobalProps({}, async ({props, revalidate } : any) => {
	
	return {
		props,
		revalidate
	};
});