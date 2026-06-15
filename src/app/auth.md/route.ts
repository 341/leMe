import { getAuthMdResponse } from "@/lib/auth-md/document";

export const dynamic = "force-static";
export const revalidate = 3600;

export function GET() {
  return getAuthMdResponse();
}
