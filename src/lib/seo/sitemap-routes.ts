import { absoluteUrl } from "@/lib/seo/site";

export interface SitemapRoute {
  path: string;
  changeFrequency: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority: number;
}

export const sitemapRoutes: SitemapRoute[] = [
  {
    path: "/",
    changeFrequency: "weekly",
    priority: 1,
  },
  {
    path: "/llms.txt",
    changeFrequency: "monthly",
    priority: 0.8,
  },
  {
    path: "/llm.txt",
    changeFrequency: "monthly",
    priority: 0.7,
  },
];

export function buildSitemapXml(lastModified = new Date()): string {
  const isoDate = lastModified.toISOString().split("T")[0];

  const urls = sitemapRoutes
    .map(
      (route) => `  <url>
    <loc>${absoluteUrl(route.path)}</loc>
    <lastmod>${isoDate}</lastmod>
    <changefreq>${route.changeFrequency}</changefreq>
    <priority>${route.priority.toFixed(1)}</priority>
  </url>`,
    )
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;
}
