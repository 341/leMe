"use client";

import { useMemo, useState } from "react";
import { caseStudies } from "@/lib/data/case-studies";
import { siteConfig } from "@/lib/seo/site";
import { Section } from "@/components/ui/Section";
import { cn } from "@/lib/utils";

const matcherTags = [
  "React",
  "TypeScript",
  "Node.js",
  "NestJS",
  "AWS",
  "Expo",
  "Angular",
  "WebRTC",
  "PostgreSQL",
  "Microservices",
] as const;

export function StackMatcher() {
  const [selected, setSelected] = useState<string[]>([]);

  const matches = useMemo(() => {
    if (selected.length === 0) return [];

    return caseStudies.filter((study) =>
      selected.every((tag) =>
        study.stack.some(
          (item) =>
            item.toLowerCase() === tag.toLowerCase() ||
            item.toLowerCase().includes(tag.toLowerCase()) ||
            tag.toLowerCase().includes(item.toLowerCase()),
        ),
      ),
    );
  }, [selected]);

  function toggleTag(tag: string) {
    setSelected((current) =>
      current.includes(tag)
        ? current.filter((item) => item !== tag)
        : [...current, tag],
    );
  }

  return (
    <Section
      id="fit-check"
      label="Hire fit"
      title="Do we match?"
      description="Pick the technologies your team uses. I'll highlight relevant production work and how to start a conversation."
    >
      <div className="flex flex-wrap gap-2">
        {matcherTags.map((tag) => {
          const active = selected.includes(tag);
          return (
            <button
              key={tag}
              type="button"
              onClick={() => toggleTag(tag)}
              className={cn(
                "rounded-full border px-4 py-2 font-mono text-xs uppercase tracking-wider transition-colors",
                active
                  ? "border-aurora-violet bg-aurora-violet/20 text-aurora-cyan"
                  : "border-surface-border text-ink-secondary hover:border-aurora-violet/40",
              )}
            >
              {tag}
            </button>
          );
        })}
      </div>

      <div className="mt-10 min-h-[8rem] rounded-2xl border border-surface-border bg-surface/40 p-6 md:p-8">
        {selected.length === 0 ? (
          <p className="text-ink-muted">
            Select one or more tags to see matching case studies.
          </p>
        ) : matches.length > 0 ? (
          <div className="space-y-6">
            <p className="text-ink-secondary">
              I have shipped production systems with this stack combination:
            </p>
            <ul className="space-y-4">
              {matches.map((study) => (
                <li
                  key={study.id}
                  className="rounded-xl border border-surface-border bg-void/40 p-4"
                >
                  <p
                    className="font-mono text-[10px] uppercase tracking-wider"
                    style={{ color: study.accent }}
                  >
                    {study.domain}
                  </p>
                  <h3 className="mt-1 font-display text-lg font-semibold text-ink-primary">
                    {study.title}
                  </h3>
                  <p className="mt-2 text-sm text-ink-secondary">
                    {study.subtitle}
                  </p>
                  <a
                    href={`/work/${study.id}`}
                    className="mt-3 inline-block font-mono text-xs uppercase tracking-wider text-aurora-cyan hover:underline"
                  >
                    Read full case study →
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <p className="text-ink-secondary">
            No single case study covers every tag together — but I work across
            this stack daily.{" "}
            <a
              href={`mailto:${siteConfig.email}?subject=Stack%20fit%20question`}
              className="text-aurora-cyan hover:underline"
            >
              Email me
            </a>{" "}
            with your architecture and I will map relevant experience.
          </p>
        )}
      </div>
    </Section>
  );
}
