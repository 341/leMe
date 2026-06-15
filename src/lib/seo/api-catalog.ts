import { absoluteUrl, siteConfig } from "@/lib/seo/site";

const RFC9727_PROFILE = "https://www.rfc-editor.org/info/rfc9727";

export const apiCatalogContentType = `application/linkset+json; profile="${RFC9727_PROFILE}"`;

type LinkTarget = {
  href: string;
  type: string;
  title?: string;
};

type LinksetEntry = {
  anchor: string;
  "service-desc": LinkTarget[];
  "service-doc": LinkTarget[];
  status: LinkTarget[];
};

/**
 * RFC 9727 API catalog in Linkset format (RFC 9264).
 * @see https://www.rfc-editor.org/rfc/rfc9727#appendix-A.1
 */
export function buildApiCatalogLinkset(): { linkset: LinksetEntry[] } {
  const site = siteConfig.url.replace(/\/$/, "");

  return {
    linkset: [
      {
        anchor: `${site}/`,
        "service-desc": [
          {
            href: absoluteUrl("/llm.txt"),
            type: "text/plain",
            title: "Machine-readable developer profile",
          },
        ],
        "service-doc": [
          {
            href: absoluteUrl("/llms.txt"),
            type: "text/plain",
            title: "LLM index with key page links",
          },
        ],
        status: [
          {
            href: absoluteUrl("/.well-known/health"),
            type: "application/json",
            title: "Site health",
          },
        ],
      },
      {
        anchor: absoluteUrl("/sitemap.xml"),
        "service-desc": [
          {
            href: absoluteUrl("/sitemap.xml"),
            type: "application/xml",
            title: "XML sitemap",
          },
        ],
        "service-doc": [
          {
            href: absoluteUrl("/"),
            type: "text/html",
            title: "Portfolio homepage",
          },
        ],
        status: [
          {
            href: absoluteUrl("/.well-known/health"),
            type: "application/json",
            title: "Site health",
          },
        ],
      },
    ],
  };
}

export function getApiCatalogResponse(): Response {
  return new Response(JSON.stringify(buildApiCatalogLinkset(), null, 2), {
    headers: {
      "Content-Type": apiCatalogContentType,
      "Cache-Control": "public, max-age=3600, must-revalidate",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
