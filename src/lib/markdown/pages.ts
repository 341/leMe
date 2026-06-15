import { caseStudies } from "@/lib/data/case-studies";
import { backendNodes } from "@/lib/data/backend-services";
import { techCategories, techStack } from "@/lib/data/tech-stack";
import { buildHomeJsonLd } from "@/lib/seo/json-ld";
import { absoluteUrl, siteConfig } from "@/lib/seo/site";
import {
  appendJsonLdBlock,
  buildYamlFrontmatter,
} from "@/lib/markdown/negotiation";

const privacyLastUpdated = "14 June 2026";

function renderCaseStudiesMarkdown(): string {
  return caseStudies
    .map((study) => {
      const metrics = study.metrics
        .map((metric) => `- **${metric.label}:** ${metric.value}`)
        .join("\n");
      const impact = study.impact.map((item) => `- ${item}`).join("\n");
      const stack = study.stack.join(", ");

      return `### ${study.title}

*${study.domain}* — ${study.subtitle}

${metrics}

**Challenge.** ${study.challenge}

**Solution.** ${study.solution}

**Impact.**

${impact}

**Stack:** ${stack}`;
    })
    .join("\n\n");
}

function renderBackendArchitectureMarkdown(): string {
  const nodes = backendNodes
    .map((node) => `- **${node.label}** — ${node.description} (${node.tech.join(", ")})`)
    .join("\n");

  return `## Backend Architecture

Microservices on AWS — Lambda, API Gateway, NestJS, PostgreSQL, Redis, S3, and Docker.

${nodes}`;
}

function renderTechStackMarkdown(): string {
  const byCategory = techCategories
    .map((category) => {
      const items = techStack
        .filter((item) => item.category === category.id)
        .map((item) => `${item.name} (${item.years}y)`)
        .join(", ");

      if (!items) return "";
      return `### ${category.label}\n\n${items}`;
    })
    .filter(Boolean)
    .join("\n\n");

  return `## Tech Stack

${byCategory}`;
}

export function buildHomeMarkdown(): string {
  const frontmatter = buildYamlFrontmatter({
    title: siteConfig.title,
    description: siteConfig.description,
    image: absoluteUrl("/opengraph-image"),
  });

  const body = `# Engineering Distributed Systems

**${siteConfig.jobTitle}**

${siteConfig.tagline}

- **13+** Years Experience
- **50+** Projects Delivered
- **6** Core Frameworks

${renderBackendArchitectureMarkdown()}

## Case Studies

${renderCaseStudiesMarkdown()}

${renderTechStackMarkdown()}

## Contact

Let's build something extraordinary.

Available for senior full-stack roles, architecture consulting, and high-impact freelance engagements worldwide.

- Email: [${siteConfig.email}](mailto:${siteConfig.email})
- LinkedIn: ${siteConfig.sameAs[1]}
- GitHub: ${siteConfig.sameAs[0]}

[Privacy policy](${absoluteUrl("/privacy")})`;

  return appendJsonLdBlock(frontmatter + body, buildHomeJsonLd());
}

export function buildPrivacyMarkdown(): string {
  const title = `Privacy Policy | ${siteConfig.name}`;
  const description =
    "Privacy policy for erollmaxhuni.com — cookies, Google Analytics, and your data protection rights.";

  const frontmatter = buildYamlFrontmatter({
    title,
    description,
  });

  const body = `# Privacy Policy

Last updated: ${privacyLastUpdated}

## 1. Who we are

This website (${siteConfig.url}) is operated by ${siteConfig.name}, a freelance full stack developer based in Europe. For privacy-related inquiries, contact [${siteConfig.email}](mailto:${siteConfig.email}).

## 2. What this site collects

This portfolio is a static-first website. It does not offer user accounts, contact forms that store submissions on the server, or ecommerce checkout. When you visit, basic technical data (such as IP address, browser type, and pages viewed) may be processed by the hosting provider to deliver the site securely.

If you accept analytics cookies, Google Analytics 4 (measurement ID \`G-T52WE3ZVWN\`) collects anonymised usage statistics such as pages visited, session duration, and approximate geography. Analytics scripts are **not loaded** unless you click "Accept analytics" in the cookie banner.

## 3. Cookies and local storage

- **Essential preference** — \`analytics-consent\` in local storage records whether you accepted or declined analytics.
- **Analytics cookies** — set by Google only after you opt in. You can withdraw consent at any time via "Cookie settings" in the footer.

## 4. Legal basis (GDPR)

Analytics processing is based on your **consent** (Article 6(1)(a) GDPR). Hosting and security logs are processed on the basis of **legitimate interest** in operating a secure website (Article 6(1)(f) GDPR).

## 5. Third parties

When analytics is enabled, data may be processed by Google (Google LLC / Google Ireland Ltd.) according to [Google's Privacy Policy](https://policies.google.com/privacy). The site is hosted on Hostinger and may be delivered through Cloudflare for performance and security.

## 6. Your rights

If you are in the EU/EEA or UK, you may have the right to access, rectify, erase, restrict, or object to processing of your personal data, and to withdraw consent at any time. You may also lodge a complaint with your local data protection authority.

To exercise your rights, email [${siteConfig.email}](mailto:${siteConfig.email}).

## 7. Data retention

Your cookie consent choice is stored locally in your browser until you clear site data or change your preference. Google Analytics retention settings are configured in GA4 (default event data retention applies).

## 8. Changes

This policy may be updated when the site, analytics setup, or legal requirements change. The "Last updated" date at the top will reflect the latest revision.

[← Back to home](${absoluteUrl("/")})`;

  return frontmatter + body;
}

const markdownBuilders: Record<string, () => string> = {
  "/": buildHomeMarkdown,
  "/privacy": buildPrivacyMarkdown,
};

export function buildMarkdownForPath(pathname: string): string | null {
  const normalized =
    pathname.length > 1 && pathname.endsWith("/")
      ? pathname.slice(0, -1)
      : pathname;

  const builder = markdownBuilders[normalized];
  return builder ? builder() : null;
}
