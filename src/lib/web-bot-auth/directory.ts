import { createPrivateKey, randomBytes, sign, type JsonWebKey } from "node:crypto";
import {
  buildWebBotAuthJwks,
  webBotAuthKeyId,
} from "@/lib/web-bot-auth/public-key";

const DIRECTORY_CONTENT_TYPE =
  "application/http-message-signatures-directory+json";

function getPrivateKey() {
  const raw = process.env.WEB_BOT_AUTH_PRIVATE_JWK;
  if (!raw) return null;

  try {
    const jwk = JSON.parse(raw) as JsonWebKey;
    return createPrivateKey({ key: jwk, format: "jwk" });
  } catch {
    return null;
  }
}

function buildDirectorySignature(
  authority: string,
  keyId: string,
): { signature: string; signatureInput: string } | null {
  const privateKey = getPrivateKey();
  if (!privateKey) return null;

  const created = Math.floor(Date.now() / 1000);
  const expires = created + 3600;
  const nonce = randomBytes(64).toString("base64url");

  const signatureParams = `("@authority";req);alg="ed25519";keyid="${keyId}";nonce="${nonce}";tag="http-message-signatures-directory";created=${created};expires=${expires}`;
  const signatureInput = `sig1=${signatureParams}`;
  const signatureBase = `"@authority";req: ${authority}\n"@signature-params": sig1=${signatureParams}`;

  const digest = sign(null, Buffer.from(signatureBase), privateKey);
  const signature = `sig1=:${digest.toString("base64")}:`;

  return { signature, signatureInput };
}

export function getWebBotAuthDirectoryResponse(host: string): Response {
  const authority = host.split(":")[0];
  const body = JSON.stringify(buildWebBotAuthJwks());
  const headers = new Headers({
    "Content-Type": DIRECTORY_CONTENT_TYPE,
    "Cache-Control": "public, max-age=3600, must-revalidate",
    "X-Content-Type-Options": "nosniff",
  });

  const signed = buildDirectorySignature(authority, webBotAuthKeyId);
  if (signed) {
    headers.set("Signature", signed.signature);
    headers.set("Signature-Input", signed.signatureInput);
  }

  return new Response(body, { headers });
}
