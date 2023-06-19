import '/lib/styles/index.scss'
import type { AppProps } from 'next/app'
import { DatoSEO } from 'dato-nextjs-utils/components';
import { useRouter } from 'next/router';
import { PageProvider } from '/lib/context/page';

function MyApp({ Component, pageProps }: AppProps) {

  const router = useRouter()
  const { asPath: pathname } = router
  const { site, seo } = pageProps as any;

  return (
    <>
      <DatoSEO seo={seo} site={site} />
      <PageProvider value={{ isHome: pathname === '/' }}>
        <Component {...pageProps} />
      </PageProvider>
    </>
  )
}

export default MyApp
