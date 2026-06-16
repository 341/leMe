import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { buildMarkdownForPath } from "@/lib/markdown/pages";
import {
  buildMarkdownResponseHeaders,
  prefersMarkdown,
} from "@/lib/markdown/negotiation";

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const markdown = buildMarkdownForPath(pathname);

  if (markdown && prefersMarkdown(request.headers.get("accept"))) {
    return new NextResponse(markdown, {
      headers: buildMarkdownResponseHeaders(markdown),
    });
  }

  const response = NextResponse.next();

  if (markdown) {
    response.headers.append("Vary", "Accept");
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|icon|apple-icon|opengraph-image).*)",
  ],
};
