import { caseStudies } from "@/lib/data/case-studies";
import { siteConfig } from "@/lib/seo/site";
import type { ModelContextTool } from "@/lib/webmcp/types";

const discoveryPaths = [
  "/llm.txt",
  "/llms.txt",
  "/auth.md",
  "/.well-known/api-catalog",
  "/.well-known/agent-skills/index.json",
  "/.well-known/health",
  "/.well-known/mcp/server-card.json",
] as const;

const pageSections = [
  "hero",
  "architecture",
  "case-studies",
  "tech-stack",
  "contact",
] as const;

type DiscoveryPath = (typeof discoveryPaths)[number];
type PageSection = (typeof pageSections)[number];

function isDiscoveryPath(value: string): value is DiscoveryPath {
  return (discoveryPaths as readonly string[]).includes(value);
}

function isPageSection(value: string): value is PageSection {
  return (pageSections as readonly string[]).includes(value);
}

export const portfolioWebMcpTools: ModelContextTool[] = [
  {
    name: "get-developer-profile",
    title: "Developer profile",
    description:
      "Return a structured summary of Eroll Maxhuni's role, experience, skills, and availability for recruiters and agents.",
    inputSchema: {
      type: "object",
      additionalProperties: false,
      properties: {},
    },
    annotations: { readOnlyHint: true },
    execute: async () => ({
      name: siteConfig.name,
      jobTitle: siteConfig.jobTitle,
      description: siteConfig.description,
      tagline: siteConfig.tagline,
      email: siteConfig.email,
      url: siteConfig.url,
      yearsExperience: "13+",
      availability: "Available for senior roles and consulting (2026)",
      knowsAbout: siteConfig.knowsAbout,
      profiles: {
        github: siteConfig.sameAs[0],
        linkedin: siteConfig.sameAs[1],
      },
    }),
  },
  {
    name: "list-case-studies",
    title: "List case studies",
    description:
      "List portfolio case studies with id, title, domain, subtitle, stack, and impact metrics.",
    inputSchema: {
      type: "object",
      additionalProperties: false,
      properties: {},
    },
    annotations: { readOnlyHint: true },
    execute: async () =>
      caseStudies.map((study) => ({
        id: study.id,
        domain: study.domain,
        title: study.title,
        subtitle: study.subtitle,
        stack: study.stack,
        metrics: study.metrics,
        impact: study.impact,
      })),
  },
  {
    name: "get-case-study",
    title: "Get case study",
    description:
      "Fetch full details for one portfolio case study by id (expo-delivery, angular-wc, webrtc-secure).",
    inputSchema: {
      type: "object",
      additionalProperties: false,
      properties: {
        id: {
          type: "string",
          description: "Case study id",
          enum: caseStudies.map((study) => study.id),
        },
      },
      required: ["id"],
    },
    annotations: { readOnlyHint: true },
    execute: async (input) => {
      const id = String(input.id ?? "");
      const study = caseStudies.find((item) => item.id === id);

      if (!study) {
        return {
          error: "not_found",
          message: `Unknown case study id: ${id}`,
          availableIds: caseStudies.map((item) => item.id),
        };
      }

      return study;
    },
  },
  {
    name: "fetch-discovery-document",
    title: "Fetch discovery document",
    description:
      "Fetch a machine-readable discovery file from this site (llm.txt, auth.md, API catalog, agent skills index, MCP card, health).",
    inputSchema: {
      type: "object",
      additionalProperties: false,
      properties: {
        path: {
          type: "string",
          description: "Discovery document path on this origin",
          enum: [...discoveryPaths],
        },
      },
      required: ["path"],
    },
    annotations: { readOnlyHint: true, untrustedContentHint: true },
    execute: async (input) => {
      const path = String(input.path ?? "");

      if (!isDiscoveryPath(path)) {
        return {
          error: "invalid_path",
          message: `Unsupported path: ${path}`,
          allowedPaths: discoveryPaths,
        };
      }

      const response = await fetch(path, {
        headers: { Accept: "*/*" },
      });

      const contentType = response.headers.get("content-type") ?? "text/plain";
      const body = await response.text();

      return {
        path,
        status: response.status,
        contentType,
        body,
      };
    },
  },
  {
    name: "navigate-to-section",
    title: "Navigate to section",
    description:
      "Scroll the portfolio page to a main section: hero, architecture, case-studies, tech-stack, or contact.",
    inputSchema: {
      type: "object",
      additionalProperties: false,
      properties: {
        section: {
          type: "string",
          enum: [...pageSections],
        },
      },
      required: ["section"],
    },
    execute: async (input) => {
      const section = String(input.section ?? "");

      if (!isPageSection(section)) {
        return {
          error: "invalid_section",
          message: `Unknown section: ${section}`,
          availableSections: pageSections,
        };
      }

      const element = document.getElementById(section);

      if (!element) {
        return {
          error: "not_found",
          message: `Section #${section} is not present on this page.`,
          hint: "Open the homepage to use section navigation.",
        };
      }

      element.scrollIntoView({ behavior: "smooth", block: "start" });
      return { ok: true, section };
    },
  },
  {
    name: "get-contact-details",
    title: "Contact details",
    description:
      "Return hiring contact channels: email, LinkedIn, and GitHub for Eroll Maxhuni.",
    inputSchema: {
      type: "object",
      additionalProperties: false,
      properties: {},
    },
    annotations: { readOnlyHint: true },
    execute: async () => ({
      name: siteConfig.name,
      email: siteConfig.email,
      mailto: `mailto:${siteConfig.email}`,
      linkedin: siteConfig.sameAs[1],
      github: siteConfig.sameAs[0],
      note: "Preferred contact for roles and consulting is email.",
    }),
  },
];
