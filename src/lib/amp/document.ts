import { absoluteUrl } from "@/lib/seo/site";
import { escapeHtml } from "@/lib/amp/escape";
import { ampCustomStyles } from "@/lib/amp/styles";

export type AmpPageMeta = {
  title: string;
  description: string;
  canonicalPath: string;
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
};

const ampBoilerplate = `body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}`;

export function buildAmpDocument(meta: AmpPageMeta, bodyHtml: string): string {
  const canonical = absoluteUrl(meta.canonicalPath);
  const jsonLdScript = meta.jsonLd
    ? `<script type="application/ld+json">${JSON.stringify(meta.jsonLd)}</script>`
    : "";

  return `<!doctype html>
<html ⚡ lang="en">
<head>
  <meta charset="utf-8">
  <script async src="https://cdn.ampproject.org/v0.js"></script>
  <meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1">
  <title>${escapeHtml(meta.title)}</title>
  <meta name="description" content="${escapeHtml(meta.description)}">
  <link rel="canonical" href="${escapeHtml(canonical)}">
  <style amp-boilerplate>${ampBoilerplate}</style>
  <noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>
  <style amp-custom>${ampCustomStyles}</style>
  ${jsonLdScript}
</head>
<body>
${bodyHtml}
</body>
</html>`;
}

export function ampHtmlResponse(html: string): Response {
  return new Response(html, {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "public, max-age=3600, must-revalidate, stale-while-revalidate=86400",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
