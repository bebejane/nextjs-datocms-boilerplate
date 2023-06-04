import s from './[...user].module.scss'
import { withGlobalProps } from 'dato-nextjs-utils/hoc';
import { apiQuery } from 'dato-nextjs-utils/api';
import type { GetStaticProps } from 'next'
import { UserDocument, AllUsersDocument } from '/graphql';

export type UserProps = { user: UserRecord }

export default function User({ user }: UserProps) {

	return (
		<div className={s.container}>
			<h1>{user.name}</h1>
			{user.email}

		</div>
	)
}

export async function getStaticPaths() {
	const { users } = await apiQuery(AllUsersDocument)
	const paths = users.map(({ slug }) => ({ params: { user: [slug] } }))
	return {
		paths,
		fallback: 'blocking'
	}
}


export const getStaticProps: GetStaticProps = withGlobalProps({ queries: [] }, async ({ props, revalidate, context }: any) => {
	const { user } = await apiQuery(UserDocument, { variables: { slug: context.params.user[0] } })

	return {
		props: {
			...props,
			user
		},
		revalidate
	};
});
