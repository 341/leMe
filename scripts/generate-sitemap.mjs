import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://erollmaxhuni.com"
).replace(/\/$/, "");

const blogSlugs = [
  "agent-ready-portfolios",
  "markdown-content-negotiation",
  "event-driven-logistics",
  "automating-developer-workflows",
];

const workSlugs = ["expo-delivery", "angular-wc", "webrtc-secure"];

const routes = [
  { path: "/", changefreq: "weekly", priority: "1.0" },
  { path: "/blog", changefreq: "weekly", priority: "0.85" },
  { path: "/work", changefreq: "monthly", priority: "0.85" },
  ...blogSlugs.map((slug) => ({
    path: `/blog/${slug}`,
    changefreq: "monthly",
    priority: "0.75",
  })),
  ...workSlugs.map((slug) => ({
    path: `/work/${slug}`,
    changefreq: "monthly",
    priority: "0.8",
  })),
  { path: "/amp", changefreq: "weekly", priority: "0.8" },
  { path: "/amp/privacy", changefreq: "monthly", priority: "0.5" },
  { path: "/privacy", changefreq: "monthly", priority: "0.6" },
  { path: "/llms.txt", changefreq: "monthly", priority: "0.9" },
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
