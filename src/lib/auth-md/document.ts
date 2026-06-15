import { absoluteUrl, siteConfig } from "@/lib/seo/site";
import { authMdScopes } from "@/lib/auth-md/metadata";
import { paymentConfig } from "@/lib/payment/config";
import { paymentWallets } from "@/lib/payment/wallets";

export function buildAuthMdDocument(): string {
  const registerUri = absoluteUrl("/agent/auth");
  const claimUri = absoluteUrl("/agent/auth/claim");
  const prmUri = absoluteUrl("/.well-known/oauth-protected-resource");
  const asUri = absoluteUrl("/.well-known/oauth-authorization-server");
  const termsUri = absoluteUrl("/.well-known/data-access-terms.json");
  const scopes = authMdScopes.map((scope) => `\`${scope}\``).join(", ");

  const paymentLine = paymentConfig.enforced
    ? `Automated scraping, bulk retrieval, indexing, and model-training use **requires a verified micro-payment** per session (~$${paymentConfig.baseUsd} USD equivalent).`
    : `Automated clients may access public content freely. A **voluntary micro-payment** (~$${paymentConfig.baseUsd} USD equivalent) is requested to support data access.`;

  return `# auth.md

Agent registration and access guide for [${siteConfig.name}](${siteConfig.url}).

## Service

**Name:** ${siteConfig.name} — Portfolio  
**Description:** Developer profile, case studies, and agent discovery documents.  
**Audience:** AI agents indexing, summarizing, or routing hiring-related queries.

## Automated access (${paymentConfig.mode} mode)

${paymentLine}

- Terms: ${termsUri}
- Challenge: \`POST /api/payment/challenge\`
- Verify: \`POST /api/payment/verify\`
- Enforcement: ${paymentConfig.enforced ? "HTTP 402 blocks unpaid bots" : "content served; payment is optional"}

## Discovery

| Document | URL |
|----------|-----|
| Data access terms | ${termsUri} |
| Protected Resource Metadata | ${prmUri} |
| Authorization Server metadata | ${asUri} |
| This guide | ${absoluteUrl("/auth.md")} |

## Authentication model

\`credential_required: ${paymentConfig.enforced}\` for automated clients.

Supported identity type: **anonymous**${paymentConfig.enforced ? " with on-chain micro-payment verification" : " with optional voluntary payment"}.

## Scopes

| Scope | Description |
|-------|-------------|
| \`portfolio.read\` | Read HTML pages, case studies, and profile content |
| \`discovery.read\` | Read machine-readable discovery files |

Supported scopes: ${scopes}.

## Registration

**Register URI:** \`${registerUri}\`

\`\`\`http
POST /agent/auth HTTP/1.1
Host: ${new URL(siteConfig.url).host}
Content-Type: application/json

{"type":"anonymous"}
\`\`\`

Returns payment endpoints, wallet addresses, and session requirements.

## Payment wallets

| Chain | Addresses |
|-------|-----------|
| ETH | ${paymentWallets.eth.join(", ")} |
| BTC | ${paymentWallets.btc.join(", ")} |
| SOL | ${paymentWallets.sol.join(", ")} |
| TRON | ${paymentWallets.tron.join(", ")} |

Recommended chains: ${paymentConfig.recommendedChains.join(", ")}.

### Claim

**Claim URI:** \`${claimUri}\` — optional; not required for public read access.

## Human contact

Hiring inquiries: [${siteConfig.email}](mailto:${siteConfig.email})

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
