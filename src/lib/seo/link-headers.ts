import { absoluteUrl } from "./site";

/**
 * RFC 8288 / RFC 9727 §3 — homepage Link headers for agent discovery.
 * @see https://www.rfc-editor.org/rfc/rfc8288
 */
export function buildHomeLinkHeader(): string {
  return [
    `</.well-known/api-catalog>; rel="api-catalog"; type="application/linkset+json"`,
    `</.well-known/http-message-signatures-directory>; rel="describedby"; type="application/http-message-signatures-directory+json"`,
    `</.well-known/mcp/server-card.json>; rel="describedby"; type="application/json"`,
    `<${absoluteUrl("/auth.md")}>; rel="service-doc"; type="text/markdown"`,
    `<${absoluteUrl("/llm.txt")}>; rel="service-desc"; type="text/plain"`,
    `<${absoluteUrl("/llms.txt")}>; rel="service-doc"; type="text/plain"`,
    `<${absoluteUrl("/llm.txt")}>; rel="describedby"; type="text/plain"`,
    `</.well-known/agent-skills/index.json>; rel="describedby"; type="application/json"`,
    `</.well-known/data-access-terms.json>; rel="payment"; type="application/json"`,
  ].join(", ");
}
