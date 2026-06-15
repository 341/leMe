import { createHash } from "node:crypto";
import type { Dirent } from "node:fs";
import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { absoluteUrl } from "@/lib/seo/site";

export const agentSkillsSchemaUri =
  "https://schemas.agentskills.io/discovery/0.2.0/schema.json";

export const agentSkillsDirectory = path.join(
  process.cwd(),
  "public/.well-known/agent-skills",
);

export type AgentSkillIndexEntry = {
  name: string;
  type: "skill-md";
  description: string;
  url: string;
  digest: string;
};

export type AgentSkillsIndex = {
  $schema: typeof agentSkillsSchemaUri;
  skills: AgentSkillIndexEntry[];
};

function sha256Digest(data: Buffer): string {
  return `sha256:${createHash("sha256").update(data).digest("hex")}`;
}

function parseSkillFrontmatter(content: string): {
  name?: string;
  description?: string;
} {
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) return {};

  const block = match[1];
  const name = block.match(/^name:\s*(.+)$/m)?.[1]?.trim();
  const description = block.match(/^description:\s*(.+)$/m)?.[1]?.trim();

  return { name, description };
}

export async function buildAgentSkillsIndex(): Promise<AgentSkillsIndex> {
  let entries: Dirent[];

  try {
    entries = await readdir(agentSkillsDirectory, { withFileTypes: true });
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") {
      return { $schema: agentSkillsSchemaUri, skills: [] };
    }
    throw error;
  }

  const skills: AgentSkillIndexEntry[] = [];

  for (const entry of entries.filter((item) => item.isDirectory())) {
    const skillPath = path.join(agentSkillsDirectory, entry.name, "SKILL.md");

    try {
      const content = await readFile(skillPath);
      const { name, description } = parseSkillFrontmatter(content.toString("utf8"));

      if (!name || !description) {
        console.warn(
          `Agent skill ${entry.name} is missing required frontmatter (name/description)`,
        );
        continue;
      }

      skills.push({
        name,
        type: "skill-md",
        description,
        url: absoluteUrl(`/.well-known/agent-skills/${entry.name}/SKILL.md`),
        digest: sha256Digest(content),
      });
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code !== "ENOENT") {
        console.warn(`Failed to load agent skill ${entry.name}:`, error);
      }
    }
  }

  skills.sort((a, b) => a.name.localeCompare(b.name));

  return { $schema: agentSkillsSchemaUri, skills };
}

export function getAgentSkillsIndexResponse(index: AgentSkillsIndex): Response {
  return Response.json(index, {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "public, max-age=3600, must-revalidate",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
