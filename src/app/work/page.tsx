import type { Metadata } from "next";
import Link from "next/link";
import { caseStudies } from "@/lib/data/case-studies";

export const metadata: Metadata = {
  title: "Work — Case Studies",
  description:
    "Deep-dive case studies: Expo logistics, React in Angular ILMS, and HIPAA-aligned WebRTC platforms.",
  alternates: {
    canonical: "/work",
  },
};

export default function WorkPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-24 md:py-32">
      <header className="mb-12">
        <p className="font-mono text-xs uppercase tracking-[0.25em] text-aurora-violet">
          Portfolio
        </p>
        <h1 className="mt-3 font-display text-4xl font-bold tracking-tight text-ink-primary md:text-5xl">
          Work
        </h1>
        <p className="mt-4 max-w-2xl text-ink-secondary">
          Production systems across logistics, library tech, and secure
          communications — with architecture notes and lessons learned.
        </p>
      </header>

      <ul className="space-y-6">
        {caseStudies.map((study) => (
          <li key={study.id}>
            <Link
              href={`/work/${study.id}`}
              className="block rounded-2xl border border-surface-border bg-surface/40 p-6 transition-colors hover:border-aurora-violet/30"
            >
              <p
                className="font-mono text-[10px] uppercase tracking-wider"
                style={{ color: study.accent }}
              >
                {study.domain}
              </p>
              <h2 className="mt-2 font-display text-2xl font-bold text-ink-primary">
                {study.title}
              </h2>
              <p className="mt-2 text-sm text-ink-secondary">{study.subtitle}</p>
              <span className="mt-4 inline-block font-mono text-xs uppercase tracking-wider text-aurora-cyan">
                Read case study →
              </span>
            </Link>
          </li>
        ))}
      </ul>

      <div className="mt-12 border-t border-surface-border pt-8">
        <Link
          href="/"
          className="inline-flex rounded-full border border-surface-border px-6 py-3 font-mono text-xs uppercase tracking-wider text-ink-secondary transition-colors hover:border-aurora-violet/40 hover:text-ink-primary"
        >
          ← Back to home
        </Link>
      </div>
    </div>
  );
}
