import { ampHtmlResponse } from "@/lib/amp/document";
import { buildAmpHomeDocument } from "@/lib/amp/pages/home";

export function GET() {
  return ampHtmlResponse(buildAmpHomeDocument());
}
