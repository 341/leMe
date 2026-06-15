import {
  buildAgentSkillsIndex,
  getAgentSkillsIndexResponse,
} from "@/lib/agent-skills";

export const dynamic = "force-static";
export const revalidate = 3600;

export async function GET() {
  return getAgentSkillsIndexResponse(await buildAgentSkillsIndex());
}
