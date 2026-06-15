export type JsonSchema = Record<string, unknown>;

export type ModelContextTool = {
  name: string;
  description: string;
  title?: string;
  inputSchema?: JsonSchema;
  annotations?: {
    readOnlyHint?: boolean;
    untrustedContentHint?: boolean;
  };
  execute: (input: Record<string, unknown>) => Promise<unknown>;
};

export type ModelContext = {
  registerTool: (
    tool: ModelContextTool,
    options?: { signal?: AbortSignal; exposedTo?: string[] },
  ) => Promise<void>;
};

export function getModelContexts(): ModelContext[] {
  const contexts: ModelContext[] = [];

  if (typeof navigator !== "undefined" && "modelContext" in navigator) {
    const navigatorContext = (
      navigator as Navigator & { modelContext?: ModelContext }
    ).modelContext;
    if (navigatorContext) contexts.push(navigatorContext);
  }

  if (typeof document !== "undefined" && "modelContext" in document) {
    const documentContext = (
      document as Document & { modelContext?: ModelContext }
    ).modelContext;
    if (documentContext && !contexts.includes(documentContext)) {
      contexts.push(documentContext);
    }
  }

  return contexts;
}

/** Prefer navigator for WebMCP scanners; fall back to document per the spec. */
export function getModelContext(): ModelContext | undefined {
  return getModelContexts()[0];
}
