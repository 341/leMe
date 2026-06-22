export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  publishedAt: string;
  tags: string[];
  readingMinutes: number;
  sections: Array<{ heading?: string; paragraphs: string[] }>;
};

export const blogPosts: BlogPost[] = [
  {
    slug: "coding-agents-need-dependency-management",
    title: "Coding agents need dependency management now",
    description:
      "Recent releases from GitHub, Vercel, and OpenAI make one thing clear: the hard part is not prompting, it is controlling what the agent can find, run, and remember.",
    publishedAt: "2026-06-22",
    tags: ["agents", "developer-tools", "automation"],
    readingMinutes: 5,
    sections: [
      {
        paragraphs: [
          "On June 17, GitHub shipped Agent Finder for Copilot. The pitch sounds small at first: describe a task, let Copilot search a registry of MCP servers, skills, canvases, agents, and tools, then pick what to load. But this is not a feature about convenience. It is GitHub admitting that the next bottleneck in agentic coding is not the model. It is resource management.",
          "The same week, Vercel announced its Agent Stack and eve, an open-source, filesystem-first framework for durable backend agents. A day later, OpenAI released Codex CLI 0.141.0 with authenticated end-to-end encrypted Noise relay channels for remote executors, per-thread MCP activation from selected executor plugins, and fixes around hooks, sandboxing, and enterprise proxy TLS. Different products, same direction: agents are turning into runtime systems.",
          "That matters if you are building real software and not demos. The question is shifting from \"Can an agent write code?\" to \"Can I trust the environment around the agent when it writes code, runs commands, pulls tools, and keeps state across a messy task?\"",
        ],
      },
      {
        heading: "Discovery is not a nice-to-have",
        paragraphs: [
          "Most teams still wire agent tools like a junk drawer. A repo gets an MCP server here, a custom script there, a project-specific instruction file, a Slack integration, a database read tool, and three half-documented one-off commands that only work on one laptop. Then somebody asks the agent to fix a production bug and wonders why it either misses the right tool or loads everything into context until the useful signal disappears.",
          "GitHub's Agent Finder is interesting because it implements the open Agentic Resource Discovery specification, built with Google, GoDaddy, Hugging Face, and Microsoft. The practical detail is governance: Copilot searches a registry you choose, including private internal registries, and enterprise settings decide what can be discovered. It does not silently install tools. It ranks candidates and lets the developer decide what gets wired in.",
          "That is the right primitive. Agents need the equivalent of package discovery, but with policy attached. You would not let a production service import random packages at runtime because a dependency name looked plausible. Agents need the same suspicion. A tool registry should answer: who owns this tool, what permissions does it need, what data can it read, what side effects can it trigger, and how do we revoke it?",
        ],
      },
      {
        heading: "The framework layer is hardening",
        paragraphs: [
          "Vercel's eve launch points at the other half of the problem. Their Agent Stack breaks the runtime into pieces developers already recognize: AI SDK for model calls, AI Gateway for routing and failover, Workflow SDK for durable execution, Sandbox for isolated compute, Connect for scoped short-lived access to external systems, and Chat SDK for delivery into surfaces like Slack, GitHub, Linear, WhatsApp, and Discord.",
          "The useful part is the file shape. An eve agent lives under an agent directory: instructions in markdown, runtime config in TypeScript, tools in a tools folder, skills loaded on demand, subagents for narrower work, channels for where it listens, schedules for autonomous runs. That feels boring in the best way. The more agent systems behave like ordinary applications, the easier it becomes to review, version, test, and deploy them.",
          "This is also where a lot of indie projects will get burned. A framework can give you durability, but it cannot decide your trust boundaries. If your agent can open GitHub issues, write to Notion, query Snowflake, and run shell commands, the important design work is not the prompt. It is permission scoping, audit trails, approval gates, and rollback paths. The product surface is the agent. The security surface is every tool behind it.",
        ],
      },
      {
        heading: "Terminal agents are becoming infrastructure",
        paragraphs: [
          "OpenAI's Codex CLI 0.141.0 release is a good example of boring details becoming strategically important. Authenticated encrypted relays for remote executors are not headline bait, but they are exactly the kind of plumbing you need when an agent leaves the local laptop and starts working inside cloud machines. Preserving native working directories and shells across app-server and exec-server boundaries sounds narrow until a cross-platform task fails because the agent reasoned against the wrong filesystem assumptions.",
          "Per-thread MCP activation is another signal. A long-running agent should not expose every available capability to every thread. It should activate the tools needed for the current task, in the current context, with the current auth mode. That reduces prompt noise, lowers accidental side effects, and gives operators a smaller surface to inspect when something goes wrong.",
          "The bug fixes tell the same story: hook trust bypass persistence, blocking PostToolUse hooks, Windows sandbox credential repair, enterprise TLS compatibility, and a bundled SQLite pin for a WAL-reset corruption fix. This is not the romantic part of AI. It is what happens when coding agents become part of the delivery path and inherit every old problem from CI, remote dev environments, package managers, and build farms.",
        ],
      },
      {
        heading: "What I would change in a real repo",
        paragraphs: [
          "First, I would stop treating agent instructions as a dumping ground. Put stable project rules in one reviewed file. Put task-specific context in issues or run prompts. Put large procedures into skills that load only when relevant. If a rule cannot be tested or observed, ask whether it belongs in the agent's always-on context.",
          "Second, I would inventory tools like dependencies. For each MCP server, script, workflow, or API capability, record the owner, permissions, data access, install path, and failure mode. If the agent can mutate production data, the tool needs an approval gate or a constrained dry-run mode. If the tool reads secrets, the agent should receive scoped credentials, not raw long-lived tokens.",
          "Third, I would make agent runs reviewable. Save the prompt, discovered tools, selected tools, commands, diffs, test output, and final reasoning. Not because every run deserves ceremony, but because debugging an agent without a trail feels like debugging a flaky deployment with only a screenshot.",
          "The June news is not saying every developer needs another agent framework this week. It is saying the casual phase is ending. Agents are no longer just smarter autocomplete. They are processes with dependency discovery, runtime isolation, auth, observability, and state. Builders who model them that way will ship useful automations. Builders who keep pasting giant prompts into a privileged shell will eventually learn the same lesson through an incident report.",
        ],
      },
    ],
  },
  {
    slug: "agent-ready-portfolios",
    title: "Making a Developer Portfolio Agent-Ready",
    description:
      "Research notes on auth.md, WebMCP, agent skills discovery, and why machine-readable hiring sites matter in 2026.",
    publishedAt: "2026-06-10",
    tags: ["agents", "research", "discovery"],
    readingMinutes: 6,
    sections: [
      {
        paragraphs: [
          "Recruiters still browse HTML. Agents increasingly read link headers, llm.txt files, OAuth discovery metadata, and browser-registered tools. A portfolio that speaks only to humans leaves signal on the table.",
          "I treated erollmaxhuni.com as a small research project: implement the specs, run scanners, and document what actually passes versus what is theater.",
        ],
      },
      {
        heading: "What agents look for first",
        paragraphs: [
          "Plain-language profiles (llm.txt), API catalogs (RFC 9727), Auth.md registration metadata, and optional WebMCP tools on page load. Each layer answers a different question: who is this person, what endpoints exist, how do I register, what can I do interactively?",
          "The interesting finding: consistency beats volume. Contradictory metadata — free access in one file, payment required in another — fails validation faster than missing features.",
        ],
      },
      {
        heading: "What humans still need",
        paragraphs: [
          "Agents do not hire you. Hiring managers do. Agent-ready markup is additive SEO for machines, not a substitute for case studies, contact paths, and proof of production delivery.",
          "The sustainable pattern: one data source (case studies, stack, contact) rendered for HTML, markdown negotiation, and discovery JSON alike.",
        ],
      },
    ],
  },
  {
    slug: "markdown-content-negotiation",
    title: "Markdown for Agents: Accept Headers as a Public API",
    description:
      "Why Accept: text/markdown matters, how content negotiation reduces token waste, and lessons from implementing it in Next.js middleware.",
    publishedAt: "2026-06-08",
    tags: ["markdown", "agents", "nextjs"],
    readingMinutes: 5,
    sections: [
      {
        paragraphs: [
          "HTML is verbose. For an agent summarizing a portfolio, the DOM noise dominates the signal. Cloudflare's Markdown for Agents proposal formalizes what many crawlers already want: ask politely, receive structured text.",
        ],
      },
      {
        heading: "Implementation sketch",
        paragraphs: [
          "Middleware inspects Accept. When text/markdown wins quality negotiation, return a purpose-built markdown document with YAML frontmatter and optional JSON-LD — not HTML converted on the fly unless you have edge conversion.",
          "Set Vary: Accept so CDNs do not serve HTML to markdown clients from cache.",
        ],
      },
      {
        heading: "Trade-off",
        paragraphs: [
          "You maintain two representations or a generator from structured data. I chose generators tied to caseStudies and siteConfig so markdown never drifts from the React UI.",
        ],
      },
    ],
  },
  {
    slug: "event-driven-logistics",
    title: "Event-Driven Order State in High-Volume Logistics",
    description:
      "Story from a national courier rollout: SQS fan-out, idempotent handlers, and why ETA accuracy is an observability problem.",
    publishedAt: "2026-05-22",
    tags: ["aws", "nestjs", "architecture", "story"],
    readingMinutes: 7,
    sections: [
      {
        paragraphs: [
          "Two thousand active drivers do not fail gracefully. They fail concurrently — duplicate taps, stale GPS fixes, offline queues replaying in random order.",
          "The product promise was simple: customers see trustworthy ETAs. The system requirement was harder: every state transition must be explainable after the fact.",
        ],
      },
      {
        heading: "Sagas without the ceremony",
        paragraphs: [
          "We did not adopt a heavyweight saga framework. Each order lived in a finite state machine. SQS carried domain events; Lambda workers were idempotent on orderId + transition + version.",
          "When a handler failed, the message returned to the queue with backoff. Ops could replay from PostgreSQL event rows without reconstructing tribal knowledge.",
        ],
      },
      {
        heading: "What moved the ETA metric",
        paragraphs: [
          "Better geolocation batching helped. Honest uncertainty in the model helped more. We started publishing confidence intervals internally before smoothing them for customers.",
          "34% ETA error reduction was as much about measurement honesty as about algorithms.",
        ],
      },
    ],
  },
  {
    slug: "automating-developer-workflows",
    title: "Automating the Boring Parts of Shipping Software",
    description:
      "CI pipelines, agent skills, scheduled checks, and when automation earns its keep versus when it hides problems.",
    publishedAt: "2026-05-05",
    tags: ["automation", "ci", "story"],
    readingMinutes: 6,
    sections: [
      {
        paragraphs: [
          "Automation is not magic. It is a contract: when X happens, Y runs reliably with observable failure modes.",
          "The best automations I have shipped removed recurring human decisions — deploy smoke tests, sitemap regeneration, dependency audit on schedule — not creative work.",
        ],
      },
      {
        heading: "Portfolio automation",
        paragraphs: [
          "This site runs sitemap generation on build, static well-known routes for discovery, and scanner-driven iteration on agent metadata. Each is boring. That is the point.",
          "Cursor Automations and similar tools extend the same idea to PR comments, incident triage, and weekly digests — if the trigger and outcome are crisp.",
        ],
      },
      {
        heading: "Anti-patterns",
        paragraphs: [
          "Automating a flaky test without fixing the test. Auto-merging without ownership boundaries. Agents that post to Slack with no idempotency key.",
          "If you cannot explain the rollback path, you are not automating — you are accelerating incidents.",
        ],
      },
    ],
  },
];

export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}

export function getAllBlogSlugs(): string[] {
  return blogPosts.map((post) => post.slug);
}
