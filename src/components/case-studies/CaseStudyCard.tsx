import type { CaseStudy } from "@/types";
import { cn } from "@/lib/utils";

interface CaseStudyCardProps {
  study: CaseStudy;
  index: number;
}

export function CaseStudyCard({ study, index }: CaseStudyCardProps) {
  const titleId = `case-study-${study.id}-title`;

  return (
    <article
      aria-labelledby={titleId}
      className="relative overflow-hidden rounded-2xl border border-surface-border bg-surface/50 backdrop-blur-sm transition-colors"
      style={{ animationDelay: `${index * 150}ms` }}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity group-hover:opacity-100 group-open:opacity-100"
        style={{
          background: `radial-gradient(ellipse at top left, ${study.accent}11, transparent 60%)`,
        }}
      />

      <details className="group relative open:border-aurora-violet/30">
        <summary className="cursor-pointer list-none p-6 md:p-8 [&::-webkit-details-marker]:hidden">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p
                className="font-mono text-[10px] uppercase tracking-[0.2em]"
                style={{ color: study.accent }}
              >
                {study.domain}
              </p>
              <h3
                id={titleId}
                className="mt-2 font-display text-xl font-bold text-ink-primary md:text-2xl"
              >
                {study.title}
              </h3>
              <p className="mt-1 text-sm text-ink-secondary">{study.subtitle}</p>
            </div>

            <div
              className={cn(
                "flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-surface-border text-ink-muted transition-transform",
                "group-open:rotate-45",
              )}
              aria-hidden="true"
            >
              +
            </div>
          </div>

          <div className="mt-6 grid grid-cols-3 gap-4">
            {study.metrics.map((metric) => (
              <div key={metric.label}>
                <div
                  className="font-display text-2xl font-bold"
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
        </summary>

        <div className="border-t border-surface-border px-6 pb-8 pt-4 md:px-8">
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <h4 className="font-mono text-xs uppercase tracking-wider text-ink-muted">
                Challenge
              </h4>
              <p className="mt-2 text-sm leading-relaxed text-ink-secondary">
                {study.challenge}
              </p>
            </div>
            <div>
              <h4 className="font-mono text-xs uppercase tracking-wider text-ink-muted">
                Solution
              </h4>
              <p className="mt-2 text-sm leading-relaxed text-ink-secondary">
                {study.solution}
              </p>
            </div>
          </div>

          <div className="mt-6">
            <h4 className="font-mono text-xs uppercase tracking-wider text-ink-muted">
              Impact
            </h4>
            <ul className="mt-3 space-y-2">
              {study.impact.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2 text-sm text-ink-secondary"
                >
                  <span style={{ color: study.accent }} aria-hidden="true">
                    ▸
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
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
        </div>
      </details>
    </article>
  );
}
