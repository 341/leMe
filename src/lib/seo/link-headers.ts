import { absoluteUrl } from "./site";

/**
 * RFC 8288 / RFC 9727 §3 — homepage Link headers for agent discovery.
 * @see https://www.rfc-editor.org/rfc/rfc8288
 */
export function buildHomeLinkHeader(): string {
  return [
    `</.well-known/api-catalog.json>; rel="api-catalog"; type="application/json"`,
    `<${absoluteUrl("/llm.txt")}>; rel="service-desc"; type="text/plain"`,
    `<${absoluteUrl("/llms.txt")}>; rel="service-doc"; type="text/plain"`,
    `<${absoluteUrl("/llm.txt")}>; rel="describedby"; type="text/plain"`,
  ].join(", ");
}
