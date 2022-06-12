import '/styles/index.scss'
import type { AppProps } from 'next/app'
import DatoSEO from '/lib/dato/components/DatoSEO';
import { GoogleAnalytics, usePagesViews } from "nextjs-google-analytics";
import { useRouter } from 'next/router';

function MyApp({ Component, pageProps } : AppProps) {
  
  //usePagesViews(); // Google Analytics page view tracker = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID

  const router = useRouter()
  const { asPath : pathname } = router
  const { site, seo } = pageProps;
  
  return (
    <>
      <GoogleAnalytics />
      <DatoSEO seo={seo} site={site} pathname={pathname} key={pathname}/>
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
