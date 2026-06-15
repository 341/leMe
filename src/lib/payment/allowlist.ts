const exactAllowlist = new Set([
  "/payment-required",
  "/.well-known/data-access-terms.json",
  "/api/payment/challenge",
  "/api/payment/verify",
]);

const prefixAllowlist = [
  "/_next/static",
  "/_next/image",
  "/favicon.ico",
];

export function isPaymentAllowlisted(pathname: string): boolean {
  if (exactAllowlist.has(pathname)) return true;
  return prefixAllowlist.some((prefix) => pathname.startsWith(prefix));
}
