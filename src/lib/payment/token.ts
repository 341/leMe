import { paymentConfig } from "@/lib/payment/config";
import type { PaymentChain } from "@/lib/payment/config";

type JwtHeader = { alg: "HS256"; typ: "JWT" };

export type ChallengeTokenPayload = {
  sub: "challenge";
  challengeId: string;
  chain: PaymentChain;
  address: string;
  exactAmount: string;
  memo?: string;
  iat: number;
  exp: number;
};

export type AccessTokenPayload = {
  sub: "access";
  challengeId: string;
  chain: PaymentChain;
  iat: number;
  exp: number;
};

function base64UrlEncode(data: Uint8Array | string): string {
  const bytes =
    typeof data === "string" ? new TextEncoder().encode(data) : data;
  let binary = "";
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function base64UrlDecode(value: string): Uint8Array {
  const padded = value.replace(/-/g, "+").replace(/_/g, "/");
  const pad = padded.length % 4 === 0 ? "" : "=".repeat(4 - (padded.length % 4));
  const binary = atob(padded + pad);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return bytes;
}

async function signHmacSha256(
  secret: string,
  message: string,
): Promise<string> {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const signature = await crypto.subtle.sign(
    "HMAC",
    key,
    new TextEncoder().encode(message),
  );
  return base64UrlEncode(new Uint8Array(signature));
}

async function createToken<T extends Record<string, unknown>>(
  payload: T,
): Promise<string> {
  const header: JwtHeader = { alg: "HS256", typ: "JWT" };
  const encodedHeader = base64UrlEncode(JSON.stringify(header));
  const encodedPayload = base64UrlEncode(JSON.stringify(payload));
  const signingInput = `${encodedHeader}.${encodedPayload}`;
  const signature = await signHmacSha256(paymentConfig.secret, signingInput);
  return `${signingInput}.${signature}`;
}

async function verifyToken<T extends { exp: number; sub: string }>(
  token: string,
  expectedSub: string,
): Promise<T | null> {
  const parts = token.split(".");
  if (parts.length !== 3) return null;

  const [encodedHeader, encodedPayload, signature] = parts;
  const signingInput = `${encodedHeader}.${encodedPayload}`;
  const expectedSignature = await signHmacSha256(
    paymentConfig.secret,
    signingInput,
  );

  if (signature !== expectedSignature) return null;

  try {
    const payload = JSON.parse(
      new TextDecoder().decode(base64UrlDecode(encodedPayload)),
    ) as T;

    if (payload.sub !== expectedSub) return null;
    if (payload.exp * 1000 < Date.now()) return null;

    return payload;
  } catch {
    return null;
  }
}

export async function createChallengeToken(
  payload: Omit<ChallengeTokenPayload, "sub" | "iat" | "exp"> & {
    expiresInSeconds: number;
  },
): Promise<string> {
  const now = Math.floor(Date.now() / 1000);
  return createToken<ChallengeTokenPayload>({
    sub: "challenge",
    challengeId: payload.challengeId,
    chain: payload.chain,
    address: payload.address,
    exactAmount: payload.exactAmount,
    memo: payload.memo,
    iat: now,
    exp: now + payload.expiresInSeconds,
  });
}

export async function verifyChallengeToken(
  token: string,
): Promise<ChallengeTokenPayload | null> {
  return verifyToken<ChallengeTokenPayload>(token, "challenge");
}

export async function createAccessToken(
  challengeId: string,
  chain: PaymentChain,
): Promise<string> {
  const now = Math.floor(Date.now() / 1000);
  const ttl = paymentConfig.sessionHours * 3600;
  return createToken<AccessTokenPayload>({
    sub: "access",
    challengeId,
    chain,
    iat: now,
    exp: now + ttl,
  });
}

export async function verifyAccessToken(
  token: string,
): Promise<AccessTokenPayload | null> {
  return verifyToken<AccessTokenPayload>(token, "access");
}
