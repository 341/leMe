import type { MetadataRoute } from "next";
import { absoluteUrl, siteConfig } from "@/lib/seo/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.title,
    short_name: siteConfig.shortName,
    description: siteConfig.description,
    start_url: "/",
    display: "standalone",
    background_color: "#050508",
    theme_color: "#8b5cf6",
    lang: siteConfig.language,
    orientation: "portrait-primary",
    categories: ["business", "productivity", "technology"],
    icons: [
      {
        src: "/icon",
        sizes: "32x32",
        type: "image/png",
      },
      {
        src: "/apple-icon",
        sizes: "180x180",
        type: "image/png",
        purpose: "any",
      },
    ],
    id: absoluteUrl("/"),
  };
}
