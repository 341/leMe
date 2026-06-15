import { absoluteUrl } from "@/lib/seo/site";

export const dynamic = "force-dynamic";

export async function POST() {
  return Response.json(
    {
      error: "unsupported_grant_type",
      error_description:
        "This portfolio does not issue OAuth access tokens. Public resources require no authentication.",
      auth_md: absoluteUrl("/auth.md"),
      resource_metadata: absoluteUrl("/.well-known/oauth-protected-resource"),
    },
    {
      status: 400,
      headers: { "Cache-Control": "no-store" },
    },
  );
}
