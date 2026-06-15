import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getCaseStudyDetail } from "@/lib/data/case-study-details";
import { caseStudies, getCaseStudyById } from "@/lib/data/case-studies";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return caseStudies.map((study) => ({ slug: study.id }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudyById(slug);

  if (!study) {
    return { title: "Case study not found" };
  }

  return {
    title: study.title,
    description: study.subtitle,
    alternates: {
      canonical: `/work/${study.id}`,
    },
  };
}

export default async function WorkDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const study = getCaseStudyById(slug);
  const detail = getCaseStudyDetail(slug);

  if (!study || !detail) {
    notFound();
  }

  return (
    <article className="mx-auto max-w-3xl px-6 py-24 md:py-32">
      <header className="mb-12">
        <p
          className="font-mono text-xs uppercase tracking-[0.25em]"
          style={{ color: study.accent }}
        >
          {study.domain}
        </p>
        <h1 className="mt-3 font-display text-4xl font-bold tracking-tight text-ink-primary md:text-5xl">
          {study.title}
        </h1>
        <p className="mt-4 text-lg text-ink-secondary">{study.subtitle}</p>
        <p className="mt-4 font-mono text-xs uppercase tracking-wider text-ink-muted">
          {detail.role} · {detail.timeline}
        </p>
      </header>

      <div className="mb-10 grid grid-cols-3 gap-4 rounded-2xl border border-surface-border bg-surface/40 p-6">
        {study.metrics.map((metric) => (
          <div key={metric.label}>
            <div
              className="font-display text-2xl font-bold md:text-3xl"
              style={{ color: study.accent }}
            >
              {metric.value}
            </div>
            <div className="font-mono text-[10px] uppercase tracking-wider text-ink-muted">
              {metric.label}
            </div>
          </div>
        ))}
      </div>

      <div className="space-y-10 text-base leading-relaxed text-ink-secondary">
        <section>
          <h2 className="font-display text-xl font-semibold text-ink-primary">
            Challenge
          </h2>
          <p className="mt-3">{study.challenge}</p>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold text-ink-primary">
            Solution
          </h2>
          <p className="mt-3">{study.solution}</p>
        </section>

        {detail.sections.map((section) => (
          <section key={section.title}>
            <h2 className="font-display text-xl font-semibold text-ink-primary">
              {section.title}
            </h2>
            <p className="mt-3">{section.body}</p>
          </section>
        ))}

        <section>
          <h2 className="font-display text-xl font-semibold text-ink-primary">
            Impact
          </h2>
          <ul className="mt-3 space-y-2">
            {study.impact.map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span style={{ color: study.accent }} aria-hidden="true">
                  ▸
                </span>
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold text-ink-primary">
            Lessons learned
          </h2>
          <ul className="mt-3 space-y-2">
            {detail.lessons.map((lesson) => (
              <li key={lesson} className="flex items-start gap-2">
                <span style={{ color: study.accent }} aria-hidden="true">
                  ▸
                </span>
                {lesson}
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold text-ink-primary">
            Stack
          </h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {study.stack.map((tech) => (
              <span
                key={tech}
                className="rounded-full border px-3 py-1 font-mono text-xs"
                style={{
                  borderColor: `${study.accent}33`,
                  color: study.accent,
                  backgroundColor: `${study.accent}11`,
                }}
              >
                {tech}
              </span>
            ))}
          </div>
        </section>
      </div>

      <div className="mt-12 flex flex-wrap gap-4 border-t border-surface-border pt-8">
        <Link
          href="/work"
          className="inline-flex rounded-full border border-surface-border px-6 py-3 font-mono text-xs uppercase tracking-wider text-ink-secondary transition-colors hover:border-aurora-violet/40 hover:text-ink-primary"
        >
          ← All work
        </Link>
        <Link
          href="/#fit-check"
          className="inline-flex rounded-full border border-aurora-violet/30 bg-aurora-violet/10 px-6 py-3 font-mono text-xs uppercase tracking-wider text-aurora-violet transition-colors hover:bg-aurora-violet/20"
        >
          Stack fit check →
        </Link>
      </div>
    </article>
  );
}
