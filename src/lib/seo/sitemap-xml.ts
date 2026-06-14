import { absoluteUrl, siteConfig } from "@/lib/seo/site";

const routes = [
  { path: "/", changefreq: "weekly", priority: "1.0" },
  { path: "/amp", changefreq: "weekly", priority: "0.8" },
  { path: "/amp/privacy", changefreq: "monthly", priority: "0.5" },
  { path: "/privacy", changefreq: "monthly", priority: "0.6" },
  { path: "/llms.txt", changefreq: "monthly", priority: "0.9" },
  { path: "/robots.txt", changefreq: "monthly", priority: "0.9" },
  { path: "/llm.txt", changefreq: "monthly", priority: "0.8" },
  { path: "/.well-known/security.txt", changefreq: "monthly", priority: "0.7" },
] as const;

export function buildSitemapXml(lastModified = new Date()): string {
  const siteUrl = siteConfig.url.replace(/\/$/, "");
  const lastmod = lastModified.toISOString().split("T")[0];

  const urls = routes
    .map(
      (route) => `  <url>
    <loc>${siteUrl}${route.path}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`,
    )
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;
}

export function getSitemapResponse(lastModified = new Date()): Response {
  return new Response(buildSitemapXml(lastModified), {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, must-revalidate",
      "X-Content-Type-Options": "nosniff",
    },
  });
}

/** Used by scripts/generate-sitemap.mjs via duplicated routes — keep paths in sync. */
export const sitemapPaths = routes.map((route) => absoluteUrl(route.path));
