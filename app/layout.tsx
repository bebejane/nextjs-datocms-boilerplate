import '/styles/index.scss'
import { DatoAdminLink } from '/components';
import { apiQuery } from '/lib/client';
import { GlobalDocument } from '/lib/graphql';
import { Metadata } from 'next';
import { Icon } from 'react-datocms/seo';

export type LayoutProps = {
  children: React.ReactNode
}

export default async function RootLayout({ children }: LayoutProps) {

  return (
    <html lang="en">
      <body id="root">
        {children}
        <DatoAdminLink />
      </body>
    </html>
  );
}

export async function generateMetadata({ params }) {
  const { site: { globalSeo, favicon } } = await apiQuery<GlobalQuery>(GlobalDocument);
  return {
    title: globalSeo.siteName,
    description: globalSeo.fallbackSeo.description,
    image: globalSeo.fallbackSeo.image?.url,
    icons: favicon.map(({ attributes: { rel, sizes, type, href: url } }) => ({ rel, url, sizes, type })) as Icon[],
  } as Metadata
}
