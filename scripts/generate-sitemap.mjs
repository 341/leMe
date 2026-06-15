import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://erollmaxhuni.com"
).replace(/\/$/, "");

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const routesConfig = JSON.parse(
  fs.readFileSync(
    path.join(__dirname, "../src/lib/seo/sitemap-routes.json"),
    "utf8",
  ),
);

const routes = [
  ...routesConfig.routes.slice(0, 3),
  ...routesConfig.blogSlugs.map((slug) => ({
    path: `/blog/${slug}`,
    changefreq: "monthly",
    priority: "0.75",
  })),
  ...routesConfig.workSlugs.map((slug) => ({
    path: `/work/${slug}`,
    changefreq: "monthly",
    priority: "0.8",
  })),
  ...routesConfig.routes.slice(3),
];

const lastmod = new Date().toISOString().split("T")[0];

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

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;

const outPath = path.join(__dirname, "../public/sitemap.xml");

fs.writeFileSync(outPath, xml, "utf8");
console.log(`Generated ${outPath}`);
