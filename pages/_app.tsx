import '/styles/index.scss'
import type { AppProps } from 'next/app'
import { DatoSEO } from 'dato-nextjs-utils';
import { useRouter } from 'next/router';

function MyApp({ Component, pageProps } : AppProps) {
  
  const router = useRouter()
  const { asPath : pathname } = router
  const { site, seo } = pageProps as any;
  
  return (
    <>
      <DatoSEO seo={seo} site={site} pathname={pathname} key={pathname} noindex={true}/>
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
