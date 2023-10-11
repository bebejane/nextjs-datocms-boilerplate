import '/styles/index.scss'
import type { AppProps } from 'next/app'
import { useRouter } from 'next/router';
import { PageProvider } from '/lib/context/page';
import { DefaultDatoSEO } from 'dato-nextjs-utils/components';
import { DatoAdminLink } from '/components';

function MyApp({ Component, pageProps }: AppProps) {

  const router = useRouter()
  const { asPath: pathname } = router
  const { site, seo } = pageProps as any;

  return (
    <>
      <DefaultDatoSEO siteTitle="Boilerplate" site={site} />
      <PageProvider value={{ isHome: pathname === '/' }}>
        <Component {...pageProps} />
      </PageProvider>
      <DatoAdminLink />
    </>
  )
}

export default MyApp
