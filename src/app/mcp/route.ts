import {
  getMcpInitializeResult,
  listMcpResources,
  readMcpResource,
} from "@/lib/mcp/server-card";
import { absoluteUrl } from "@/lib/seo/site";

export const dynamic = "force-dynamic";

type JsonRpcRequest = {
  jsonrpc?: string;
  id?: string | number | null;
  method?: string;
  params?: { uri?: string };
};

function jsonRpcResult(id: string | number | null | undefined, result: unknown) {
  return Response.json(
    { jsonrpc: "2.0", id: id ?? null, result },
    {
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-store",
      },
    },
  );
}

function jsonRpcError(
  id: string | number | null | undefined,
  code: number,
  message: string,
) {
  return Response.json(
    { jsonrpc: "2.0", id: id ?? null, error: { code, message } },
    {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-store",
      },
    },
  );
}

export async function POST(request: Request) {
  let body: JsonRpcRequest;

  try {
    body = (await request.json()) as JsonRpcRequest;
  } catch {
    return jsonRpcError(null, -32700, "Parse error");
  }

  const { id, method, params } = body;

  switch (method) {
    case "initialize":
      return jsonRpcResult(id, getMcpInitializeResult());
    case "notifications/initialized":
      return new Response(null, { status: 204 });
    case "resources/list":
      return jsonRpcResult(id, listMcpResources());
    case "resources/read": {
      const uri = params?.uri;
      if (!uri) {
        return jsonRpcError(id, -32602, "Missing resource uri");
      }
      const resource = await readMcpResource(uri);
      if (resource === null) {
        return jsonRpcError(id, -32002, "Resource not found");
      }
      return jsonRpcResult(id, {
        contents: [
          { uri, mimeType: resource.mimeType, text: resource.text },
        ],
      });
    }
    case "tools/list":
      return jsonRpcResult(id, { tools: [] });
    case "prompts/list":
      return jsonRpcResult(id, { prompts: [] });
    default:
      return jsonRpcError(id, -32601, `Method not found: ${method ?? "unknown"}`);
  }
}

export function GET() {
  return Response.json(
    {
      message: "MCP Streamable HTTP endpoint. Send JSON-RPC POST requests.",
      serverCard: absoluteUrl("/.well-known/mcp/server-card.json"),
    },
    { headers: { "Cache-Control": "no-store" } },
  );
}
