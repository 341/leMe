import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://erollmaxhuni.com"
).replace(/\/$/, "");

const routes = [
  { path: "/", changefreq: "weekly", priority: "1.0" },
  { path: "/privacy", changefreq: "monthly", priority: "0.6" },
  { path: "/llms.txt", changefreq: "monthly", priority: "0.9" },
  { path: "/robots.txt", changefreq: "monthly", priority: "0.9" },
  { path: "/llm.txt", changefreq: "monthly", priority: "0.8" },
  { path: "/.well-known/security.txt", changefreq: "monthly", priority: "0.7" },
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

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outPath = path.join(__dirname, "../public/sitemap.xml");

fs.writeFileSync(outPath, xml, "utf8");
console.log(`Generated ${outPath}`);
