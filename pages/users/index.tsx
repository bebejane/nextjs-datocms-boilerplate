import s from './index.module.scss';
import { withGlobalProps } from 'dato-nextjs-utils/hoc';
import type { GetStaticProps } from 'next'
import { AllUsersDocument } from '/graphql';
import Link from 'next/link';

export type Props = { users: UserRecord[] }

export default function Home({ users }: Props) {

  return (
    <ul className={s.container}>
      {users.map(({ email, slug, name }, key) =>
        <li>
          <Link href={`/users/${slug}`} key={key}>
            {name} ({email})
          </Link>
        </li>
      )}
    </ul>
  )
}

export const getStaticProps: GetStaticProps = withGlobalProps({ queries: [AllUsersDocument] }, async ({ props, revalidate }: any) => {

  return {
    props,
    revalidate
  };
});
