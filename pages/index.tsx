import styles from './index.module.scss'
import { GetStaticProps } from 'next'
import { withGlobalProps } from "/lib/hoc";
import Markdown from '/lib/dato/components/Markdown';
import StructuredContent from '/lib/dato/components/structured-content';

export default function Home(props : any) {
	return (
		<div className={styles.container}>
			NextJS + Dato
			<br/>
			rename "/.env.local.example" to "/.env.local"
		</div>
	)
}

export const getStaticProps : GetStaticProps = withGlobalProps({}, async ({props, revalidate }) => {
	
	return {
		props,
		revalidate
	};
});