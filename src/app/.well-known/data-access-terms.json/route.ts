import { buildDataAccessTerms } from "@/lib/payment/terms";

export const dynamic = "force-static";
export const revalidate = 3600;

export function GET() {
  return Response.json(buildDataAccessTerms(), {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "public, max-age=3600, must-revalidate",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
