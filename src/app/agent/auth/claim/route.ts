import { absoluteUrl } from "@/lib/seo/site";

export const dynamic = "force-dynamic";

const notApplicable = {
  error: "not_applicable",
  error_description:
    "User claim is not required. Portfolio content is publicly readable without credentials.",
  auth_md: absoluteUrl("/auth.md"),
};

export async function POST() {
  return Response.json(notApplicable, {
    status: 501,
    headers: { "Cache-Control": "no-store" },
  });
}

export function GET() {
  return Response.json(notApplicable, {
    status: 501,
    headers: { "Cache-Control": "no-store" },
  });
}
