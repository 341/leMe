import type { NextRequest } from "next/server";
import { paymentConfig } from "@/lib/payment/config";
import { verifyAccessToken } from "@/lib/payment/token";

const botUserAgentPatterns = [
  "bot",
  "crawler",
  "spider",
  "curl",
  "wget",
  "python-requests",
  "python/",
  "java/",
  "go-http-client",
  "headless",
  "gptbot",
  "claudebot",
  "bytespider",
  "ccbot",
  "anthropic",
  "petalbot",
  "semrush",
  "ahrefs",
  "scrapy",
  "httpclient",
  "libwww",
  "postman",
  "insomnia",
];

export function hasBrowserFetchMetadata(request: NextRequest): boolean {
  return Boolean(
    request.headers.get("sec-fetch-site") ||
      request.headers.get("sec-fetch-mode") ||
      request.headers.get("sec-fetch-dest"),
  );
}

export function hasKnownBotUserAgent(userAgent: string): boolean {
  const ua = userAgent.toLowerCase();
  if (!ua) return true;
  return botUserAgentPatterns.some((pattern) => ua.includes(pattern));
}

export async function hasValidPaymentAccess(
  request: NextRequest,
): Promise<boolean> {
  const token = request.cookies.get(paymentConfig.cookieName)?.value;
  if (!token) return false;
  const payload = await verifyAccessToken(token);
  return payload !== null;
}

export async function isHumanOrPaidRequest(
  request: NextRequest,
): Promise<boolean> {
  if (await hasValidPaymentAccess(request)) return true;
  if (hasBrowserFetchMetadata(request)) return true;

  const userAgent = request.headers.get("user-agent") ?? "";
  if (!hasKnownBotUserAgent(userAgent)) {
    return hasBrowserFetchMetadata(request);
  }

  return false;
}

export async function isAutomatedRequest(
  request: NextRequest,
): Promise<boolean> {
  return !(await isHumanOrPaidRequest(request));
}

export async function requiresPayment(
  request: NextRequest,
): Promise<boolean> {
  if (!paymentConfig.enabled || !paymentConfig.enforced) return false;
  return !(await isHumanOrPaidRequest(request));
}
