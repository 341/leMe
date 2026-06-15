/** Ed25519 public key for Web Bot Auth (RFC 9421 directory). Private key lives in WEB_BOT_AUTH_PRIVATE_JWK. */
export const webBotAuthPublicJwk = {
  kty: "OKP",
  crv: "Ed25519",
  x: "ePh5mlvp5nQ69o7d0E1RJ2QgwrPXjhK6GCTEHL_383w",
} as const;

/** RFC 7638 JWK thumbprint (base64url). */
export const webBotAuthKeyId =
  "itnUWO_x-hoa4-1zHQr-8hrEpGDKX8vWSAufSRWXi0E";

export const webBotAuthDirectoryPath =
  "/.well-known/http-message-signatures-directory";

export function buildWebBotAuthJwks() {
  return { keys: [webBotAuthPublicJwk] };
}
