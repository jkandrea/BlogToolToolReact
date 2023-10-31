/* eslint-disable no-undefined */
import React from 'react';
import { Helmet } from 'react-helmet';

const locales = {
  en: 'en_US',
  ko: 'ko_KR'
};

const Meta = ({ data }) => {
  const lang = locales[data.locale] || locales['en'];
  const title = data.title;
  const description = data.description;
  const image = data.image !== undefined && `${data.image}`;
  const canonical = `https://www.your-homepage.com/${data.canonical}`;
  const type = data.type === undefined ? 'website' : data.type;
  const width = data.image && (data.width || 1200);
  const height = data.image && (data.height || 630);

  return (
    <Helmet titleTemplate="%s">
      <html lang={lang} />
      <title>{title}</title>
      <meta name="description" content={description} />
      {canonical ? <link rel="canonical" href={canonical} /> : null}
      {image ? <link rel="image_src" href={image} /> : null}
      {image ? <meta itemprop="image" content={image} /> : null}

      <meta property="og:site_name" content="YOUR WEB SITE" />
      <meta property="og:title" content={title} />
      {description ? (
        <meta property="og:description" content={description} />
      ) : null}
      {canonical ? <meta property="og:url" content={canonical} /> : null}
      <meta property="og:locale" content={locales[lang]} />
      <meta property="og:type" content={type} />
      {image ? <meta property="og:image" content={image} /> : null}
      {width ? <meta property="og:image:width" content={width} /> : null}
      {height ? <meta property="og:image:height" content={height} /> : null}
      <meta property="fb:pages" content="YOUR WEB SITE" />

      {/* change type of twitter if there is no image? */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      {description ? (
        <meta name="twitter:description" content={description} />
      ) : null}
      {image ? <meta name="twitter:image" content={image} /> : null}
      <meta name="twitter:site" content="@YOURWEBSITE" />
      {canonical ? (
        <link rel="alternate" href={data.canonical} hreflang={lang} />
      ) : null}
    </Helmet>
  );
};

export default Meta;
/*출처 : https://velog.io/@byseop/SPA%EC%97%90%EC%84%9C-%EC%84%9C%EB%B2%84%EC%82%AC%EC%9D%B4%EB%93%9C-%EB%A0%8C%EB%8D%94%EB%A7%81%EC%9D%84-%EA%B5%AC%EC%B6%95%ED%95%98%EC%A7%80-%EC%95%8A%EA%B3%A0-SEO-%EC%B5%9C%EC%A0%81%ED%99%94%ED%95%98%EA%B8%B0 */