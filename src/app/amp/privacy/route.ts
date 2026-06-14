import { ampHtmlResponse } from "@/lib/amp/document";
import { buildAmpPrivacyDocument } from "@/lib/amp/pages/privacy";

export function GET() {
  return ampHtmlResponse(buildAmpPrivacyDocument());
}
