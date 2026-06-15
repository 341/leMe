import { siteConfig } from "@/lib/seo/site";

export const dynamic = "force-static";
export const revalidate = 60;

export function GET() {
  return Response.json(
    {
      status: "ok",
      service: siteConfig.url.replace(/\/$/, ""),
      timestamp: new Date().toISOString(),
    },
    {
      headers: {
        "Cache-Control": "public, max-age=60, must-revalidate",
        "X-Content-Type-Options": "nosniff",
      },
    },
  );
}
