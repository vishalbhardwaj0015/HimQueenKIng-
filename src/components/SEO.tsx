import { useEffect } from "react";

const SITE_NAME = "HimQueenKing";
const DEFAULT_IMAGE = "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80";
const BASE_URL = "https://himqueenking.onrender.com";

function setMeta(property: string, content: string, isName = false) {
  const attr = isName ? "name" : "property";
  let el = document.querySelector(`meta[${attr}="${property}"]`) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, property);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
}

const SEO = ({
  title,
  description,
  keywords,
  image = DEFAULT_IMAGE,
  url = BASE_URL,
}: SEOProps) => {
  const fullTitle = title ? `${title} | ${SITE_NAME}` : `${SITE_NAME} | Best Himachal Pradesh & Himalaya Tour Packages 2026`;
  const fullDesc = description || "Book curated tour packages to Shimla Manali, Spiti Valley, Leh Ladakh, Kasol, Rishikesh & more.";
  const fullKeywords = keywords || "himachal pradesh tour packages, shimla manali tour package, himalaya trekking, manali tour, spiti valley tour, leh ladakh tour";

  useEffect(() => {
    document.title = fullTitle;
    setMeta("description", fullDesc, true);
    setMeta("keywords", fullKeywords, true);

    setMeta("og:title", fullTitle);
    setMeta("og:description", fullDesc);
    setMeta("og:image", image);
    setMeta("og:url", url);
    setMeta("og:site_name", SITE_NAME);

    setMeta("twitter:card", "summary_large_image");
    setMeta("twitter:title", fullTitle);
    setMeta("twitter:description", fullDesc);
    setMeta("twitter:image", image);
  }, [fullTitle, fullDesc, fullKeywords, image, url]);

  return null;
};

export default SEO;
