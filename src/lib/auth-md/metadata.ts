import { absoluteUrl, siteConfig } from "@/lib/seo/site";
import { buildPaymentRequiredBody } from "@/lib/payment/challenge";
import { paymentConfig } from "@/lib/payment/config";

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
      payment_uri: absoluteUrl("/.well-known/data-access-terms.json"),
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
  const payment = buildPaymentRequiredBody();
  const enforced = paymentConfig.enforced;

  return {
    type: "anonymous",
    message: enforced
      ? "Automated access requires a verified micro-payment. Human browsers are exempt."
      : "Public read access is open. Voluntary micro-payments are requested from automated clients.",
    credential_required: enforced,
    payment_required: enforced,
    payment_voluntary: !enforced,
    enforcement_mode: paymentConfig.mode,
    price_usd: paymentConfig.baseUsd,
    session_hours: paymentConfig.sessionHours,
    terms_url: payment.terms_url,
    challenge_endpoint: payment.challenge_endpoint,
    verify_endpoint: payment.verify_endpoint,
    recommended_chains: payment.recommended_chains,
    wallets: payment.wallets,
    scopes_granted: enforced ? undefined : [...authMdScopes],
    scopes_after_payment: enforced ? [...authMdScopes] : undefined,
    resources: [...publicAgentResources],
    contact: `mailto:${siteConfig.email}`,
  };
}
