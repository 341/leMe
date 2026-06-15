import { getMcpServerCardResponse } from "@/lib/mcp/server-card";

export const dynamic = "force-static";
export const revalidate = 3600;

export function GET() {
  return getMcpServerCardResponse();
}
