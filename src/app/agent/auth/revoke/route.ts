export const dynamic = "force-dynamic";

export async function POST() {
  return Response.json(
    {
      error: "unsupported_operation",
      error_description:
        "Credential revocation is not applicable for public read-only portfolio access.",
    },
    { status: 501, headers: { "Cache-Control": "no-store" } },
  );
}
