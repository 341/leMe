import { absoluteUrl, siteConfig } from "@/lib/seo/site";
import sitemapRoutes from "@/lib/seo/sitemap-routes.json";

type SitemapRoute = {
  path: string;
  changefreq: string;
  priority: string;
};

function buildRoutes(): SitemapRoute[] {
  const staticRoutes = sitemapRoutes.routes as SitemapRoute[];
  const blogRoutes = sitemapRoutes.blogSlugs.map((slug) => ({
    path: `/blog/${slug}`,
    changefreq: "monthly",
    priority: "0.75",
  }));
  const workRoutes = sitemapRoutes.workSlugs.map((slug) => ({
    path: `/work/${slug}`,
    changefreq: "monthly",
    priority: "0.8",
  }));

  return [
    staticRoutes[0],
    staticRoutes[1],
    staticRoutes[2],
    ...blogRoutes,
    ...workRoutes,
    ...staticRoutes.slice(3),
  ];
}

export function buildSitemapXml(lastModified = new Date()): string {
  const siteUrl = siteConfig.url.replace(/\/$/, "");
  const lastmod = lastModified.toISOString().split("T")[0];
  const routes = buildRoutes();

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

export const sitemapPaths = buildRoutes().map((route) => absoluteUrl(route.path));
