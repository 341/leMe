import { getWebBotAuthDirectoryResponse } from "@/lib/web-bot-auth/directory";

export const dynamic = "force-dynamic";

export function GET(request: Request) {
  const host =
    request.headers.get("x-forwarded-host") ??
    request.headers.get("host") ??
    "erollmaxhuni.com";

  return getWebBotAuthDirectoryResponse(host);
}
