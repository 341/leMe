import { buildPublicAccessRegistrationResponse } from "@/lib/auth-md/metadata";

export const dynamic = "force-dynamic";

export async function POST() {
  return Response.json(buildPublicAccessRegistrationResponse(), {
    headers: {
      "Cache-Control": "no-store",
      "X-Content-Type-Options": "nosniff",
    },
  });
}

export function GET() {
  return Response.json(
    {
      ...buildPublicAccessRegistrationResponse(),
      method: "POST",
      description: "POST JSON with type anonymous for public access guidance.",
    },
    {
      headers: {
        "Cache-Control": "no-store",
        "X-Content-Type-Options": "nosniff",
      },
    },
  );
}
