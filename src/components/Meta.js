import { Helmet } from "react-helmet";

const SITE_URL = "https://blogtooltool.com";
const DEFAULT_IMAGE = `${SITE_URL}/logo512.png`;

function Meta({ title, description, path = "/", type = "website", noindex = false }) {
  const canonical = `${SITE_URL}${path === "/" ? "" : path}`;
  const schema = {
    "@context": "https://schema.org",
    "@type": type === "article" ? "Article" : "WebPage",
    name: title,
    description,
    url: canonical,
    isPartOf: { "@type": "WebSite", name: "BlogToolTool", url: SITE_URL },
  };
  return (
    <Helmet>
      <html lang="ko" />
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />
      {noindex && <meta name="robots" content="noindex,follow" />}
      <meta property="og:locale" content="ko_KR" />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content="BlogToolTool" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={DEFAULT_IMAGE} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={DEFAULT_IMAGE} />
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  );
}

export default Meta;
