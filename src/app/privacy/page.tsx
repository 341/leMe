import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/seo/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Privacy policy for erollmaxhuni.com — cookies, Google Analytics, and your data protection rights.",
  alternates: {
    canonical: "/privacy",
    types: {
      "application/amp+html": "/amp/privacy",
    },
  },
  robots: {
    index: true,
    follow: true,
  },
};

const lastUpdated = "14 June 2026";

export default function PrivacyPolicyPage() {
  return (
    <article className="mx-auto max-w-3xl px-6 py-24 md:py-32">
      <header className="mb-12">
        <p className="font-mono text-xs uppercase tracking-[0.25em] text-aurora-violet">
          Legal
        </p>
        <h1 className="mt-3 font-display text-4xl font-bold tracking-tight text-ink-primary md:text-5xl">
          Privacy Policy
        </h1>
        <p className="mt-4 text-sm text-ink-muted">Last updated: {lastUpdated}</p>
      </header>

      <div className="space-y-10 text-base leading-relaxed text-ink-secondary">
        <section>
          <h2 className="font-display text-xl font-semibold text-ink-primary">
            1. Who we are
          </h2>
          <p className="mt-3">
            This website ({siteConfig.url}) is operated by {siteConfig.name}, a
            freelance full stack developer based in Europe. For privacy-related
            inquiries, contact{" "}
            <a
              href={`mailto:${siteConfig.email}`}
              className="text-aurora-cyan hover:underline"
            >
              {siteConfig.email}
            </a>
            .
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold text-ink-primary">
            2. What this site collects
          </h2>
          <p className="mt-3">
            This portfolio is a static-first website. It does not offer user
            accounts, contact forms that store submissions on the server, or
            ecommerce checkout. When you visit, basic technical data (such as IP
            address, browser type, and pages viewed) may be processed by the
            hosting provider to deliver the site securely.
          </p>
          <p className="mt-3">
            If you accept analytics cookies, Google Tag (
            <span className="font-mono text-ink-primary">GT-NNS8SBK</span>)
            collects anonymised usage statistics such as pages visited, session
            duration, and approximate geography. Analytics scripts are{" "}
            <strong className="text-ink-primary">not loaded</strong> unless you
            click &ldquo;Accept analytics&rdquo; in the cookie banner.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold text-ink-primary">
            3. Cookies and local storage
          </h2>
          <ul className="mt-3 list-inside list-disc space-y-2">
            <li>
              <strong className="text-ink-primary">Essential preference</strong>{" "}
              — <span className="font-mono text-sm">analytics-consent</span> in
              local storage records whether you accepted or declined analytics.
            </li>
            <li>
              <strong className="text-ink-primary">Analytics cookies</strong> —
              set by Google only after you opt in. You can withdraw consent at
              any time via &ldquo;Cookie settings&rdquo; in the footer.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold text-ink-primary">
            4. Legal basis (GDPR)
          </h2>
          <p className="mt-3">
            Analytics processing is based on your{" "}
            <strong className="text-ink-primary">consent</strong> (Article 6(1)(a)
            GDPR). Hosting and security logs are processed on the basis of{" "}
            <strong className="text-ink-primary">legitimate interest</strong> in
            operating a secure website (Article 6(1)(f) GDPR).
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold text-ink-primary">
            5. Third parties
          </h2>
          <p className="mt-3">
            When analytics is enabled, data may be processed by Google (Google
            LLC / Google Ireland Ltd.) according to{" "}
            <a
              href="https://policies.google.com/privacy"
              className="text-aurora-cyan hover:underline"
              rel="noopener noreferrer"
              target="_blank"
            >
              Google&apos;s Privacy Policy
            </a>
            . The site is hosted on Hostinger and may be delivered through
            Cloudflare for performance and security.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold text-ink-primary">
            6. Your rights
          </h2>
          <p className="mt-3">
            If you are in the EU/EEA or UK, you may have the right to access,
            rectify, erase, restrict, or object to processing of your personal
            data, and to withdraw consent at any time. You may also lodge a
            complaint with your local data protection authority.
          </p>
          <p className="mt-3">
            To exercise your rights, email{" "}
            <a
              href={`mailto:${siteConfig.email}`}
              className="text-aurora-cyan hover:underline"
            >
              {siteConfig.email}
            </a>
            .
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold text-ink-primary">
            7. Data retention
          </h2>
          <p className="mt-3">
            Your cookie consent choice is stored locally in your browser until
            you clear site data or change your preference. Google Analytics
            retention settings are configured in GA4 (default event data
            retention applies).
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold text-ink-primary">
            8. Changes
          </h2>
          <p className="mt-3">
            This policy may be updated when the site, analytics setup, or legal
            requirements change. The &ldquo;Last updated&rdquo; date at the top
            will reflect the latest revision.
          </p>
        </section>
      </div>

      <div className="mt-12 border-t border-surface-border pt-8">
        <Link
          href="/"
          className="inline-flex rounded-full border border-surface-border px-6 py-3 font-mono text-xs uppercase tracking-wider text-ink-secondary transition-colors hover:border-aurora-violet/40 hover:text-ink-primary"
        >
          ← Back to home
        </Link>
      </div>
    </article>
  );
}
