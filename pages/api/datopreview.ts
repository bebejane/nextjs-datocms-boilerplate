// Put this code in the following path of your Next.js website:
// /pages/api/preview/links.js


// this "routing" function knows how to convert a DatoCMS record
// into canonical URL within the website

const generatePreviewLink = ({ item, itemType, locale }) => {
  const localePrefix = locale === "en" ? "" : `/${locale}`;

  switch (itemType.attributes.api_key) {
    case "post":
      return {
        label: `${item.title}`,
        url: `${ process.env.NEXT_PUBLIC_SITE_URL}/posts/${item.slug}`,
      };
    default:
      return null;
  }
};

const handler = (req, res) => {
  // setup CORS permissions
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Content-Type", "application/json");

  // This will allow OPTIONS request
  if (req.method === "OPTIONS") {
    return res.status(200).send("ok");
  }

  const previewLink = generatePreviewLink(req.body);

  if (!previewLink) {
    return res.status(200).json({ previewLinks: [] });
  }

  const previewLinks = [
    previewLink,
    {
      label: `${previewLink.label} - Preview`,
      url: `${ process.env.NEXT_PUBLIC_SITE_URL}/api/preview/?slug=${previewLink.url}`,
    },
  ];

  return res.status(200).json({ previewLinks });
};

export default handler;