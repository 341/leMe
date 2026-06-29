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
    slug: "agents-need-discovery-not-more-context",
    title: "Agents need discovery, not bigger prompts",
    description:
      "ARD, GitHub Agent Finder, and Cursor Origin point to the next developer bottleneck: tool wiring you can govern.",
    publishedAt: "2026-06-29",
    tags: ["agents", "tooling", "github", "cursor"],
    readingMinutes: 7,
    sections: [
      {
        paragraphs: [
          "The interesting AI coding news this month is not that another model got better at editing files. That is background radiation now. The useful shift is that agent tooling is admitting what builders already feel: an agent is only as good as the tools it can safely find, understand, and use.",
          "On June 17, GitHub shipped Agent Finder for Copilot. The pitch is simple: describe a task in plain language, search a registry of AI resources, and let Copilot return ranked MCP servers, skills, tools, canvases, and agents that match the work. It does not silently install them. It points at a public catalog or a private registry, respects managed settings, and leaves the final wiring decision with the developer or organization.",
          "Microsoft announced the underlying Agentic Resource Discovery specification at the same time, with collaborators including GitHub, Google, GoDaddy, Hugging Face, Nvidia, Salesforce, ServiceNow, and Snowflake. ARD gives agentic resources a discovery surface: what the resource does, who provides it, how it is invoked, what authority it needs, and whether it fits a policy environment. A few days later, The Decoder reported Cursor's Origin, a Git platform designed for humans and agents, with internal load tests simulating thousands of agents reading and writing one repository. Cursor also previewed mobile agent control and its first fully self-trained model.",
        ],
      },
      {
        heading: "The old workflow is already cracking",
        paragraphs: [
          "If you use agents seriously, you know the current setup tax. You paste instructions. You maintain MCP config. You explain where the staging logs live. You add another tool, then wonder why every session starts with a bloated context preamble. None of that is wasted work, but it is fragile work. It depends on each client remembering exactly what you remembered to wire in.",
          "That model does not scale to a team, and it barely scales to one indie developer with multiple projects. I might need a Prisma migration skill for one issue, a Stripe webhook verifier for another, and a browser performance auditor for a third. Preloading all of them is noisy. Manually discovering them each time is slow. Hard-coding them into one vendor's client makes the toolchain sticky in the wrong place.",
          "ARD is interesting because it moves discovery out of folklore and into infrastructure. The agent can ask, 'What capability helps with this task?' The registry can answer with structured metadata. The organization can decide which catalogs are trusted. That is boring in the best way. The breakthrough is not magic autonomy; it is turning tool availability into something indexable, governable, and reviewable.",
        ],
      },
      {
        heading: "What this means for a real codebase",
        paragraphs: [
          "For builders, the practical move is to stop treating agent instructions as a giant README and start treating capabilities as product surfaces. If your project has an internal deployment script, document it like a resource. If your app exposes diagnostic endpoints, describe what they do and who may call them.",
          "This does not mean every repo needs a full public tool catalog next week. It means the direction is clear: agents will prefer resources with structured descriptions, explicit inputs, narrow scopes, and clean invocation paths. The same way good APIs beat tribal knowledge, good agent resources will beat 'ask Eki how deploys work.' A local script with predictable flags and a short manifest is more useful than a heroic paragraph in CONTRIBUTING.md.",
          "The security angle matters too. GitHub's Agent Finder note explicitly says there is no automatic installation. That detail is not cosmetic. The moment agents can discover tools dynamically, the governance question becomes the product. Which registries are allowed? Which MCP servers can touch production data? Which actions require human review? Which tools are visible to contractors, CI agents, or personal accounts? Discovery without policy is just a faster path to a bad incident.",
        ],
      },
      {
        heading: "The repository becomes the runtime",
        paragraphs: [
          "Cursor's Origin announcement points at the other half of the problem. Once agents can find the right tools, they still need somewhere sane to work. Normal Git workflows were designed around humans creating branches, reviewing diffs, and occasionally resolving conflicts, not agents fixing CI and rebasing at machine speed.",
          "You do not need Cursor Origin specifically to feel this pressure. Any team running concurrent coding agents will hit it. CI queues become the bottleneck. Test flakiness turns into agent churn. Merge conflicts stop being rare interruptions and become scheduler events. Review comments need enough structure for an agent to act without guessing. The repository starts behaving less like a folder of source code and more like an execution environment.",
          "That should change how you design projects. Keep modules small. Make tests deterministic. Prefer generators over hand-updated duplicated metadata. Put validation close to the change. Use typed config. Add idempotency to scripts. Avoid hidden local state. These were already good engineering habits, but agent-heavy workflows punish violations faster because machines will explore every ambiguous path you left open.",
        ],
      },
      {
        heading: "My checklist after this news",
        paragraphs: [
          "First, I would audit which project tasks still live only in my head: deploy checks, database read-only inspection, sitemap generation, payment verification, screenshot review, and incident triage. Each one should become either a script, a documented endpoint, or a small tool with explicit inputs.",
          "Second, I would separate discovery from permission. It is fine for an agent to learn that a production log tool exists. It is not fine for every agent to read production logs. The registry answers 'what can help?' The auth layer answers 'are you allowed?' Mixing those two creates either overexposure or unusable automation.",
          "Third, I would budget context like money. If a tool is only relevant for one task, it should be pulled in when needed, not carried forever. Agent Finder and ARD treat context as an operational resource.",
          "The headline for developers is simple: the agent era is becoming less about prompting and more about systems design. Better models will keep arriving. The compounding advantage will go to teams whose tools are discoverable, whose permissions are boring, and whose repositories can absorb autonomous work without turning every merge into archaeology.",
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
