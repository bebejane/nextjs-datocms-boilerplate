import { GetServerSideProps } from "next";

export const getServerSideProps: GetServerSideProps = async function ({ res, req }) {

  const query = await fetch('https://graphql.datocms.com/', {
    method: 'POST',
    body: JSON.stringify({
      query:
        `query Site {
          site: _site {
            favicon{
              url
              mimeType
            }
          }
        }
    `}),
    headers: {
      "Content-Type": "application/json",
      'Accepts': 'application/json',
      'Authorization': process.env.NEXT_PUBLIC_GRAPHQL_API_TOKEN
    }
  })

  const { data: { site } } = await query.json() as { data: { site: Site } }

  if (!site?.favicon.url)
    return { notFound: true }

  const reader = (await fetch(site.favicon.url)).body.getReader()

  while (true) {
    const { done, value } = await reader.read();
    if (done)
      break;
    res.write(value)
  }

  res.end()

  return {
    props: {},
  };
}

export default function Favicon() {
  return null
}