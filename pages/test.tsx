import s from './test.module.scss'
import withGlobalProps from '/lib/withGlobalProps';
import type { GetStaticProps } from 'next'
import { AllPostsDocument } from '/graphql';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/router';


export type Props = {

}

export default function Test({ }: Props) {
  const searchParams = useSearchParams()
  const router = useRouter()
  const search = searchParams.get('s')

  return (
    <div className={s.container}>
      <h1>Test</h1>
      <input type="text" value={search} onChange={e => router.push(`/test?s=${e.target.value}`, `/test?s=${e.target.value}`, { shallow: true })} />
    </div>
  )
}

export const getStaticProps: GetStaticProps = withGlobalProps({ query: AllPostsDocument })
