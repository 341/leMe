import { getApiCatalogResponse } from "@/lib/seo/api-catalog";

export const dynamic = "force-static";
export const revalidate = 3600;

export function GET() {
  return getApiCatalogResponse();
}
