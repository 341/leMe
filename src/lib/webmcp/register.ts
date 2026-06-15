import { portfolioWebMcpTools } from "@/lib/webmcp/tools";
import { getModelContexts } from "@/lib/webmcp/types";

export async function registerPortfolioWebMcpTools(
  signal: AbortSignal,
): Promise<void> {
  const contexts = getModelContexts();

  if (contexts.length === 0) return;

  await Promise.all(
    contexts.flatMap((modelContext) =>
      portfolioWebMcpTools.map((tool) =>
        modelContext.registerTool(tool, { signal }).catch((error: unknown) => {
          if (signal.aborted) return;
          console.warn(`WebMCP: failed to register tool ${tool.name}`, error);
        }),
      ),
    ),
  );
}
