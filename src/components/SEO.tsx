import { Helmet } from "react-helmet-async";

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
}

const SITE_NAME = "HimQueenKing";
const DEFAULT_IMAGE = "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80";
const BASE_URL = "https://himqueenking.onrender.com";

const SEO = ({
  title,
  description,
  keywords,
  image = DEFAULT_IMAGE,
  url = BASE_URL,
  type = "website",
}: SEOProps) => {
  const fullTitle = title ? `${title} | ${SITE_NAME}` : `${SITE_NAME} | Best Himachal Pradesh & Himalaya Tour Packages 2026`;
  const fullDesc = description || "Book curated tour packages to Shimla Manali, Spiti Valley, Leh Ladakh, Kasol, Rishikesh & more. Best travel agency in Himachal Pradesh.";
  const fullKeywords = keywords || "himachal pradesh tour packages, shimla manali tour package, himalaya trekking, manali tour, spiti valley tour, leh ladakh tour, kasol backpacking, himachal trek, best travel agency himachal";

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={fullDesc} />
      <meta name="keywords" content={fullKeywords} />
      <link rel="canonical" href={url} />

      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={fullDesc} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content={SITE_NAME} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={fullDesc} />
      <meta name="twitter:image" content={image} />
    </Helmet>
  );
};

export default SEO;
