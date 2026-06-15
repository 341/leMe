import { absoluteUrl, siteConfig } from "@/lib/seo/site";

const issuer = () => siteConfig.url.replace(/\/$/, "");

export const authMdScopes = ["portfolio.read", "discovery.read"] as const;

export function buildOAuthProtectedResourceMetadata() {
  const base = issuer();

  return {
    resource: `${base}/`,
    resource_name: siteConfig.name,
    authorization_servers: [base],
    scopes_supported: [...authMdScopes],
    bearer_methods_supported: ["header"],
  };
}

export function buildOAuthAuthorizationServerMetadata() {
  const base = issuer();

  return {
    issuer: base,
    authorization_endpoint: absoluteUrl("/agent/auth"),
    token_endpoint: absoluteUrl("/.well-known/oauth/token"),
    jwks_uri: absoluteUrl("/.well-known/http-message-signatures-directory"),
    grant_types_supported: [
      "client_credentials",
      "urn:ietf:params:oauth:grant-type:jwt-bearer",
    ],
    response_types_supported: ["token"],
    scopes_supported: [...authMdScopes],
    agent_auth: {
      skill: absoluteUrl("/auth.md"),
      register_uri: absoluteUrl("/agent/auth"),
      claim_uri: absoluteUrl("/agent/auth/claim"),
      identity_types_supported: ["anonymous"],
      anonymous: {
        credential_types_supported: ["access_token"],
        claim_uri: absoluteUrl("/agent/auth/claim"),
      },
    },
  };
}

export function getJsonWellKnownResponse(body: unknown): Response {
  return Response.json(body, {
    headers: {
      "Cache-Control": "public, max-age=3600, must-revalidate",
      "X-Content-Type-Options": "nosniff",
    },
  });
}

export const publicAgentResources = [
  absoluteUrl("/"),
  absoluteUrl("/llm.txt"),
  absoluteUrl("/llms.txt"),
  absoluteUrl("/sitemap.xml"),
  absoluteUrl("/.well-known/api-catalog"),
  absoluteUrl("/.well-known/health"),
] as const;

export function buildPublicAccessRegistrationResponse() {
  return {
    type: "anonymous",
    message:
      "No OAuth registration is required. This portfolio is publicly readable.",
    credential_required: false,
    scopes_granted: [...authMdScopes],
    resources: [...publicAgentResources],
    contact: `mailto:${siteConfig.email}`,
  };
}
