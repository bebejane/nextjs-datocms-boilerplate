import styles from './index.module.scss'
import { GetStaticProps } from 'next'
import { withGlobalProps } from "/lib/hoc";

export default function Home(props : any) {
	const { siteName } = props
	
	return (
		<div className={styles.container}>
			{siteName ? siteName : 'NextJS + Dato'}
		</div>
	)
}

export const getStaticProps : GetStaticProps = withGlobalProps({}, async ({props, revalidate }) => {
	
	return {
		props,
		revalidate
	};
});