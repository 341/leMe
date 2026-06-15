import Link from "next/link";
import { siteConfig } from "@/lib/seo/site";
import { CookieSettingsButton } from "@/components/analytics/CookieSettingsButton";

const socialLinks = [
  { label: "GitHub", href: siteConfig.sameAs[0] },
  { label: "LinkedIn", href: siteConfig.sameAs[1] },
];

export function Footer() {
  return (
    <footer
      id="contact"
      aria-labelledby="contact-heading"
      className="border-t border-surface-border bg-void-50 py-16"
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-12 md:grid-cols-2">
          <div>
            <h2
              id="contact-heading"
              className="font-display text-3xl font-bold text-ink-primary"
            >
              Let&apos;s build something{" "}
              <span className="text-aurora-cyan">extraordinary</span>.
            </h2>
            <p className="mt-4 max-w-md text-ink-secondary">
              Available for senior full-stack roles, architecture consulting, and
              high-impact freelance engagements worldwide.
            </p>
          </div>

          <address className="flex flex-col items-start gap-4 not-italic md:items-end">
            <a
              href={`mailto:${siteConfig.email}`}
              className="font-display text-xl text-aurora-violet transition-colors hover:text-aurora-cyan"
            >
              {siteConfig.email}
            </a>
            <nav aria-label="Social profiles">
              <ul className="flex gap-4">
                {socialLinks.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      rel="me noopener noreferrer"
                      target="_blank"
                      className="font-mono text-xs uppercase tracking-wider text-ink-muted transition-colors hover:text-ink-primary"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </address>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-surface-border pt-8 md:flex-row">
          <p className="font-mono text-xs text-ink-muted">
            © {new Date().getFullYear()} {siteConfig.name}. Built with Next.js.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <CookieSettingsButton />
            <Link
              href="/blog"
              className="font-mono text-xs uppercase tracking-wider text-ink-muted transition-colors hover:text-ink-primary"
            >
              Blog
            </Link>
            <Link
              href="/work"
              className="font-mono text-xs uppercase tracking-wider text-ink-muted transition-colors hover:text-ink-primary"
            >
              Work
            </Link>
            <Link
              href="/privacy"
              className="font-mono text-xs uppercase tracking-wider text-ink-muted transition-colors hover:text-ink-primary"
            >
              Privacy
            </Link>
            <p className="font-mono text-xs text-ink-muted">
              React · TypeScript · Node.js · AWS
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
