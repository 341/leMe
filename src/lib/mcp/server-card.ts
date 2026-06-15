import { readFile } from "node:fs/promises";
import path from "node:path";
import { buildAuthMdDocument } from "@/lib/auth-md/document";
import { buildApiCatalogLinkset, apiCatalogContentType } from "@/lib/seo/api-catalog";
import { absoluteUrl, siteConfig } from "@/lib/seo/site";

export const mcpServerVersion = "1.0.0";
export const mcpServerName = "com.erollmaxhuni/portfolio-discovery";

const protocolVersion = "2025-03-26";

export const mcpEndpointPath = "/mcp";

export const mcpDiscoveryResources = [
  {
    uri: "portfolio://llm.txt",
    name: "llm-profile",
    description: "Plain-language developer profile for AI agents",
    mimeType: "text/plain",
    href: absoluteUrl("/llm.txt"),
  },
  {
    uri: "portfolio://llms.txt",
    name: "llms-index",
    description: "Structured LLM index with key page links",
    mimeType: "text/plain",
    href: absoluteUrl("/llms.txt"),
  },
  {
    uri: "portfolio://api-catalog",
    name: "api-catalog",
    description: "RFC 9727 API catalog (linkset)",
    mimeType: "application/linkset+json",
    href: absoluteUrl("/.well-known/api-catalog"),
  },
  {
    uri: "portfolio://auth.md",
    name: "auth-md",
    description: "Auth.md agent registration guide",
    mimeType: "text/markdown",
    href: absoluteUrl("/auth.md"),
  },
] as const;

/**
 * SEP-1649 / SEP-2127 MCP Server Card for agent discovery.
 * @see https://github.com/modelcontextprotocol/modelcontextprotocol/pull/2127
 */
export function buildMcpServerCard() {
  const endpoint = absoluteUrl(mcpEndpointPath);

  return {
    $schema:
      "https://static.modelcontextprotocol.io/schemas/v1/server-card.schema.json",
    serverInfo: {
      name: mcpServerName,
      version: mcpServerVersion,
      title: `${siteConfig.name} — Portfolio Discovery`,
      description:
        "Read-only MCP server exposing public portfolio and agent discovery resources.",
    },
    name: mcpServerName,
    version: mcpServerVersion,
    title: `${siteConfig.name} — Portfolio Discovery`,
    description:
      "Read-only MCP server exposing public portfolio and agent discovery resources.",
    websiteUrl: siteConfig.url,
    repository: {
      url: "https://github.com/341/leMe",
      source: "github",
    },
    endpoint,
    transport: {
      type: "streamable-http",
      url: endpoint,
    },
    remotes: [
      {
        type: "streamable-http",
        url: endpoint,
        supportedProtocolVersions: [protocolVersion],
      },
    ],
    capabilities: {
      tools: {},
      resources: {
        listChanged: false,
        subscribe: false,
      },
      prompts: {},
    },
    resources: mcpDiscoveryResources.map(({ uri, name, description, mimeType }) => ({
      uri,
      name,
      description,
      mimeType,
    })),
  };
}

export function getMcpServerCardResponse(): Response {
  return Response.json(buildMcpServerCard(), {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "public, max-age=3600, must-revalidate",
      "X-Content-Type-Options": "nosniff",
    },
  });
}

export function getMcpInitializeResult() {
  return {
    protocolVersion,
    capabilities: {
      tools: {},
      resources: { listChanged: false, subscribe: false },
      prompts: {},
    },
    serverInfo: {
      name: mcpServerName,
      version: mcpServerVersion,
    },
  };
}

export function listMcpResources() {
  return {
    resources: mcpDiscoveryResources.map(({ uri, name, description, mimeType }) => ({
      uri,
      name,
      description,
      mimeType,
    })),
  };
}

export async function readMcpResource(
  uri: string,
): Promise<{ mimeType: string; text: string } | null> {
  switch (uri) {
    case "portfolio://llm.txt":
      return {
        mimeType: "text/plain",
        text: await readFile(
          path.join(process.cwd(), "public/llm.txt"),
          "utf8",
        ),
      };
    case "portfolio://llms.txt":
      return {
        mimeType: "text/plain",
        text: await readFile(
          path.join(process.cwd(), "public/llms.txt"),
          "utf8",
        ),
      };
    case "portfolio://auth.md":
      return {
        mimeType: "text/markdown",
        text: buildAuthMdDocument(),
      };
    case "portfolio://api-catalog":
      return {
        mimeType: apiCatalogContentType.split(";")[0],
        text: JSON.stringify(buildApiCatalogLinkset(), null, 2),
      };
    default:
      return null;
  }
}
