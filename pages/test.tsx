import s from './test.module.scss'
import withGlobalProps from '/lib/withGlobalProps';
import type { GetStaticProps } from 'next'
import { AllPostsDocument } from '/graphql';
import Link from 'next/link';

export type Props = {

}

export default function Test({ }: Props) {

  return (
    <div className={s.container}>
      <h1>Test</h1>

    </div>
  )
}

export const getStaticProps: GetStaticProps = withGlobalProps({ query: AllPostsDocument })
