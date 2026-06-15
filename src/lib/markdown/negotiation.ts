export const MARKDOWN_MEDIA_TYPE = "text/markdown";

const MARKDOWN_TYPES = new Set(["text/markdown", "text/x-markdown"]);

type AcceptEntry = {
  type: string;
  q: number;
};

/** Parse an Accept header into typed entries with quality values. */
export function parseAcceptHeader(accept: string | null): AcceptEntry[] {
  if (!accept) return [];

  return accept.split(",").map((part) => {
    const [media, ...params] = part.trim().split(";");
    const qParam = params.find((param) => param.trim().startsWith("q="));
    const q = qParam ? Number.parseFloat(qParam.trim().slice(2)) : 1;

    return {
      type: media.trim().toLowerCase(),
      q: Number.isFinite(q) ? q : 0,
    };
  });
}

function qualityFor(entries: AcceptEntry[], types: Set<string>): number {
  let best = 0;

  for (const entry of entries) {
    if (!types.has(entry.type)) continue;
    best = Math.max(best, entry.q);
  }

  return best;
}

/**
 * True when the client prefers markdown over HTML for this request.
 * Browsers without an explicit markdown preference keep receiving HTML.
 */
export function prefersMarkdown(accept: string | null): boolean {
  const entries = parseAcceptHeader(accept);
  if (entries.length === 0) return false;

  const markdownQ = qualityFor(entries, MARKDOWN_TYPES);
  if (markdownQ === 0) return false;

  const htmlQ = qualityFor(entries, new Set(["text/html"]));
  const wildcardQ = qualityFor(entries, new Set(["*/*"]));

  const competingQ = Math.max(htmlQ, wildcardQ);
  return markdownQ >= competingQ;
}

/** Rough token estimate (characters / 4), aligned with common LLM heuristics. */
export function estimateMarkdownTokens(markdown: string): number {
  const trimmed = markdown.trim();
  if (!trimmed) return 0;
  return Math.ceil(trimmed.length / 4);
}

export function buildMarkdownResponseHeaders(
  markdown: string,
  options: { originalTokens?: number } = {},
): HeadersInit {
  const headers: Record<string, string> = {
    "Content-Type": "text/markdown; charset=utf-8",
    Vary: "Accept",
    "x-markdown-tokens": String(estimateMarkdownTokens(markdown)),
    "Cache-Control": "public, max-age=3600, must-revalidate, stale-while-revalidate=86400",
  };

  if (options.originalTokens !== undefined) {
    headers["x-original-tokens"] = String(options.originalTokens);
  }

  return headers;
}

export function escapeYamlValue(value: string): string {
  if (/[:#\n\r]/.test(value) || value.startsWith(" ") || value.endsWith(" ")) {
    return JSON.stringify(value);
  }
  return value;
}

export function buildYamlFrontmatter(fields: {
  title?: string;
  description?: string;
  image?: string;
}): string {
  const lines: string[] = [];

  if (fields.title) lines.push(`title: ${escapeYamlValue(fields.title)}`);
  if (fields.description) {
    lines.push(`description: ${escapeYamlValue(fields.description)}`);
  }
  if (fields.image) lines.push(`image: ${escapeYamlValue(fields.image)}`);

  if (lines.length === 0) return "";
  return `---\n${lines.join("\n")}\n---\n\n`;
}

export function appendJsonLdBlock(markdown: string, data: unknown): string {
  return `${markdown}\n\n\`\`\`json\n${JSON.stringify(data, null, 2)}\n\`\`\`\n`;
}
