import { buildAmpDocument } from "@/lib/amp/document";
import { escapeHtml } from "@/lib/amp/escape";
import { absoluteUrl, siteConfig } from "@/lib/seo/site";

const lastUpdated = "14 June 2026";

export function buildAmpPrivacyDocument(): string {
  const body = `<div class="wrap">
  <header class="site-header">
    <div class="brand">EM<span>.</span></div>
  </header>

  <main class="legal">
    <p class="section-label">Legal</p>
    <h1>Privacy Policy</h1>
    <p class="lead">Last updated: ${escapeHtml(lastUpdated)}</p>

    <h2>1. Who we are</h2>
    <p>This website (${escapeHtml(siteConfig.url)}) is operated by ${escapeHtml(siteConfig.name)}. Contact <a href="mailto:${escapeHtml(siteConfig.email)}">${escapeHtml(siteConfig.email)}</a>.</p>

    <h2>2. What this site collects</h2>
    <p>This portfolio does not store contact form submissions on the server. Hosting providers may process basic technical data to deliver the site securely.</p>
    <p>Google Analytics 4 (G-T52WE3ZVWN) runs only after you accept analytics cookies on the full site.</p>

    <h2>3. Cookies and local storage</h2>
    <ul>
      <li><strong>analytics-consent</strong> — stores your analytics preference.</li>
      <li>Analytics cookies are set by Google only after opt-in.</li>
    </ul>

    <h2>4. Your rights</h2>
    <p>If you are in the EU/EEA or UK, you may request access, correction, deletion, or withdrawal of consent by emailing <a href="mailto:${escapeHtml(siteConfig.email)}">${escapeHtml(siteConfig.email)}</a>.</p>

    <h2>5. Full policy</h2>
    <p>This AMP page is a summary. Read the complete policy on the canonical site.</p>
    <p class="full-site"><a href="${escapeHtml(absoluteUrl("/privacy"))}">View full privacy policy</a></p>
  </main>

  <footer class="site-footer">
    <p class="full-site"><a href="${escapeHtml(absoluteUrl("/amp"))}">AMP home</a> · <a href="${escapeHtml(absoluteUrl("/"))}">Full site</a></p>
  </footer>
</div>`;

  return buildAmpDocument(
    {
      title: `Privacy Policy | ${siteConfig.name}`,
      description:
        "Privacy policy for erollmaxhuni.com — cookies, Google Analytics, and your data protection rights.",
      canonicalPath: "/privacy",
    },
    body,
  );
}
