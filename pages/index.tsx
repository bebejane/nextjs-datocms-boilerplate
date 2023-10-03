import styles from './index.module.scss'
import { withGlobalProps } from 'dato-nextjs-utils/hoc';
import type { GetStaticProps } from 'next'
import Link from 'next/link';

export type HomeProps = { site: Site }

export default function Home({ site }: HomeProps) {

	return (
		<div className={styles.container}>
			Automatstudio
		</div>
	)
}

export const getStaticProps: GetStaticProps = withGlobalProps({ queries: [] }, async ({ props, revalidate }: any) => {

	return {
		props,
		revalidate
	};
});
