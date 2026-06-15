import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { isPaymentAllowlisted } from "@/lib/payment/allowlist";
import {
  isAutomatedRequest,
  requiresPayment,
} from "@/lib/payment/bot-detector";
import { buildPaymentRequiredResponse } from "@/lib/payment/challenge";
import { paymentConfig } from "@/lib/payment/config";
import { buildMarkdownForPath } from "@/lib/markdown/pages";
import {
  buildMarkdownResponseHeaders,
  prefersMarkdown,
} from "@/lib/markdown/negotiation";

function appendSoftPaymentNotice(response: NextResponse): void {
  response.headers.set(
    "X-Data-Access-Notice",
    "optional-micro-payment-requested",
  );
  response.headers.append(
    "Link",
    '</.well-known/data-access-terms.json>; rel="payment"; type="application/json"',
  );
}

function redirectWwwToApex(request: NextRequest): NextResponse | null {
  const host = request.headers.get("host") ?? "";
  if (!host.startsWith("www.")) return null;

  const url = request.nextUrl.clone();
  url.host = host.slice(4);
  return NextResponse.redirect(url, 301);
}

export async function middleware(request: NextRequest) {
  const wwwRedirect = redirectWwwToApex(request);
  if (wwwRedirect) return wwwRedirect;

  const pathname = request.nextUrl.pathname;

  if (!isPaymentAllowlisted(pathname) && (await requiresPayment(request))) {
    return buildPaymentRequiredResponse();
  }

  const markdown = buildMarkdownForPath(pathname);

  if (markdown && prefersMarkdown(request.headers.get("accept"))) {
    const markdownResponse = new NextResponse(markdown, {
      headers: buildMarkdownResponseHeaders(markdown),
    });

    if (
      paymentConfig.enabled &&
      paymentConfig.mode === "soft" &&
      (await isAutomatedRequest(request))
    ) {
      appendSoftPaymentNotice(markdownResponse);
    }

    return markdownResponse;
  }

  const response = NextResponse.next();

  if (markdown) {
    response.headers.append("Vary", "Accept");
  }

  if (
    paymentConfig.enabled &&
    paymentConfig.mode === "soft" &&
    (await isAutomatedRequest(request))
  ) {
    appendSoftPaymentNotice(response);
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|icon|apple-icon|opengraph-image).*)",
  ],
};
