import { caseStudies } from "@/lib/data/case-studies";
import { techStack } from "@/lib/data/tech-stack";
import { buildPersonJsonLd } from "@/lib/seo/json-ld";
import { buildAmpDocument } from "@/lib/amp/document";
import { escapeHtml } from "@/lib/amp/escape";
import { absoluteUrl, siteConfig } from "@/lib/seo/site";

function renderCaseStudies(): string {
  return caseStudies
    .map((study) => {
      const metrics = study.metrics
        .map(
          (metric) => `<div>
            <div class="metric-value">${escapeHtml(metric.value)}</div>
            <div class="metric-label">${escapeHtml(metric.label)}</div>
          </div>`,
        )
        .join("");

      const tags = study.stack
        .map((item) => `<span class="tag">${escapeHtml(item)}</span>`)
        .join("");

      const impact = study.impact
        .map((item) => `<li>${escapeHtml(item)}</li>`)
        .join("");

      return `<article class="card">
        <p class="card-domain">${escapeHtml(study.domain)}</p>
        <h3>${escapeHtml(study.title)}</h3>
        <p class="card-sub">${escapeHtml(study.subtitle)}</p>
        <div class="metrics">${metrics}</div>
        <p><strong>Challenge.</strong> ${escapeHtml(study.challenge)}</p>
        <p><strong>Solution.</strong> ${escapeHtml(study.solution)}</p>
        <p><strong>Impact.</strong></p>
        <ul>${impact}</ul>
        <div class="tags">${tags}</div>
      </article>`;
    })
    .join("");
}

function renderTechStack(): string {
  return techStack
    .map(
      (item) =>
        `<span class="stack-pill">${escapeHtml(item.name)} · ${item.years}y</span>`,
    )
    .join("");
}

export function buildAmpHomeDocument(): string {
  const body = `<div class="wrap">
  <header class="site-header">
    <div class="brand">EM<span>.</span></div>
  </header>

  <main>
    <p class="eyebrow">Full Stack Developer</p>
    <h1>Engineering <span class="gradient">Distributed</span> Systems</h1>
    <p class="lead">${escapeHtml(siteConfig.tagline)}</p>

    <div class="stats">
      <div>
        <div class="stat-value">13+</div>
        <div class="stat-label">Years Experience</div>
      </div>
      <div>
        <div class="stat-value">50+</div>
        <div class="stat-label">Projects Delivered</div>
      </div>
      <div>
        <div class="stat-value">6</div>
        <div class="stat-label">Core Frameworks</div>
      </div>
    </div>

    <section id="architecture">
      <p class="section-label">Backend Architecture</p>
      <h2>Microservices on AWS</h2>
      <p class="lead">Lambda, API Gateway, NestJS, PostgreSQL, Redis, S3, and Docker — production-grade distributed systems.</p>
    </section>

    <section id="case-studies">
      <p class="section-label">Case Studies</p>
      <h2>Enterprise Delivery</h2>
      ${renderCaseStudies()}
    </section>

    <section id="tech-stack">
      <p class="section-label">Tech Stack</p>
      <h2>Full Spectrum Fluency</h2>
      <div class="stack-grid">${renderTechStack()}</div>
    </section>

    <section id="contact">
      <p class="section-label">Contact</p>
      <h2>Let's build something extraordinary.</h2>
      <p class="lead">Available for senior full-stack roles, architecture consulting, and high-impact freelance engagements worldwide.</p>
      <div class="cta-row">
        <a class="btn btn-primary" href="mailto:${escapeHtml(siteConfig.email)}">Email ${escapeHtml(siteConfig.email)}</a>
        <a class="btn btn-secondary" href="${escapeHtml(siteConfig.sameAs[1])}">LinkedIn</a>
        <a class="btn btn-secondary" href="${escapeHtml(siteConfig.sameAs[0])}">GitHub</a>
      </div>
    </section>
  </main>

  <footer class="site-footer">
    <p>© ${new Date().getFullYear()} ${escapeHtml(siteConfig.name)}. AMP version of the portfolio.</p>
    <p class="full-site"><a href="${escapeHtml(absoluteUrl("/"))}">View full interactive site</a> · <a href="${escapeHtml(absoluteUrl("/privacy"))}">Privacy</a></p>
  </footer>
</div>`;

  return buildAmpDocument(
    {
      title: siteConfig.title,
      description: siteConfig.description,
      canonicalPath: "/",
      jsonLd: buildPersonJsonLd(),
    },
    body,
  );
}
