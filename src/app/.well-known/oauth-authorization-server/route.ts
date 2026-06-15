import {
  buildOAuthAuthorizationServerMetadata,
  getJsonWellKnownResponse,
} from "@/lib/auth-md/metadata";

export const dynamic = "force-static";
export const revalidate = 3600;

export function GET() {
  return getJsonWellKnownResponse(buildOAuthAuthorizationServerMetadata());
}
