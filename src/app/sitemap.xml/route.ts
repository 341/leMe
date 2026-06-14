import { getSitemapResponse } from "@/lib/seo/sitemap-xml";

export const dynamic = "force-static";
export const revalidate = 3600;

export function GET() {
  return getSitemapResponse();
}
