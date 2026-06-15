import { absoluteUrl, siteConfig } from "@/lib/seo/site";
import { authMdScopes } from "@/lib/auth-md/metadata";

export function buildAuthMdDocument(): string {
  const registerUri = absoluteUrl("/agent/auth");
  const claimUri = absoluteUrl("/agent/auth/claim");
  const prmUri = absoluteUrl("/.well-known/oauth-protected-resource");
  const asUri = absoluteUrl("/.well-known/oauth-authorization-server");
  const scopes = authMdScopes.map((scope) => `\`${scope}\``).join(", ");

  return `# auth.md

Agent registration and access guide for [${siteConfig.name}](${siteConfig.url}).

## Service

**Name:** ${siteConfig.name} — Portfolio  
**Description:** Public read-only developer profile, case studies, and agent discovery documents.  
**Audience:** AI agents indexing, summarizing, or routing hiring-related queries.

## Discovery

| Document | URL |
|----------|-----|
| Protected Resource Metadata | ${prmUri} |
| Authorization Server metadata | ${asUri} |
| This guide | ${absoluteUrl("/auth.md")} |

## Authentication model

This site does **not** require OAuth credentials for public content. Agents may read listed resources with unauthenticated \`GET\` requests.

Supported identity type: **anonymous** (no user identity asserted).

## Scopes

| Scope | Description |
|-------|-------------|
| \`portfolio.read\` | Read public HTML pages, case studies, and profile content |
| \`discovery.read\` | Read machine-readable files (\`llm.txt\`, \`llms.txt\`, API catalog, sitemap) |

Supported scopes: ${scopes}.

## Registration

**Register URI:** \`${registerUri}\`

Anonymous public read does not issue credentials. Call the register endpoint for machine-readable access guidance:

\`\`\`http
POST /agent/auth HTTP/1.1
Host: ${new URL(siteConfig.url).host}
Content-Type: application/json

{"type":"anonymous"}
\`\`\`

**Response:** JSON with \`credential_required: false\`, granted scopes, and public resource URLs.

### Claim (optional)

**Claim URI:** \`${claimUri}\`

Not required for this read-only portfolio. The claim endpoint returns \`501 not_applicable\` because no user-owned credentials are issued.

## Human contact

For hiring or project inquiries, email [${siteConfig.email}](mailto:${siteConfig.email}). This is not an OAuth-protected API.

## Related discovery

- API catalog (RFC 9727): \`/.well-known/api-catalog\`
- Web Bot Auth JWKS: \`/.well-known/http-message-signatures-directory\`
- MCP server card: \`/.well-known/mcp/server-card.json\`
- Privacy policy: \`/privacy\`

## Contact

- Email: ${siteConfig.email}
- GitHub: ${siteConfig.sameAs[0]}
- LinkedIn: ${siteConfig.sameAs[1]}
`;
}

export function getAuthMdResponse(): Response {
  const body = buildAuthMdDocument();

  return new Response(body, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "public, max-age=3600, must-revalidate",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
