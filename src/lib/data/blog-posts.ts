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
