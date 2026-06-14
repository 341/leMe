"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { techStack, techCategories } from "@/lib/data/tech-stack";
import { Section } from "@/components/ui/Section";
import { cn } from "@/lib/utils";

export function TechStackEcosystem() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const filtered =
    activeCategory === null
      ? techStack
      : techStack.filter((t) => t.category === activeCategory);

  return (
    <Section
      id="tech-stack"
      label="Tech Stack"
      title="Full Spectrum Fluency"
      description="From legacy PHP enterprise systems to modern React, NestJS, and AWS serverless — 13 years across the entire stack."
    >
      <div className="mb-10 flex flex-wrap gap-2">
        <button
          onClick={() => setActiveCategory(null)}
          className={cn(
            "rounded-full border px-4 py-2 font-mono text-xs transition-all",
            activeCategory === null
              ? "border-aurora-violet bg-aurora-violet/20 text-aurora-violet"
              : "border-surface-border text-ink-muted hover:border-aurora-violet/30",
          )}
        >
          All ({techStack.length})
        </button>
        {techCategories.map((cat) => {
          const count = techStack.filter((t) => t.category === cat.id).length;
          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={cn(
                "rounded-full border px-4 py-2 font-mono text-xs transition-all",
                activeCategory === cat.id
                  ? "border-aurora-violet bg-aurora-violet/20 text-aurora-violet"
                  : "border-surface-border text-ink-muted hover:border-aurora-violet/30",
              )}
            >
              {cat.label} ({count})
            </button>
          );
        })}
      </div>

      <div className="relative">
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full border border-aurora-violet/20 animate-spin-slow" />
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full border border-aurora-cyan/10" />

        <motion.div
          layout
          className="relative grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5"
        >
          {filtered.map((tech, i) => (
            <motion.div
              key={tech.id}
              layout
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ delay: i * 0.03, type: "spring", stiffness: 300 }}
              whileHover={{ scale: 1.05, y: -4 }}
              className="group relative overflow-hidden rounded-xl border border-surface-border bg-surface/50 p-4 backdrop-blur-sm transition-shadow hover:shadow-glow"
            >
              <div
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity group-hover:opacity-100"
                style={{
                  background: `radial-gradient(circle at center, ${tech.color}15, transparent 70%)`,
                }}
              />
              <div className="relative">
                <div
                  className="mb-2 h-2 w-2 rounded-full"
                  style={{ backgroundColor: tech.color }}
                />
                <div className="font-display text-sm font-semibold text-ink-primary">
                  {tech.name}
                </div>
                {tech.years && (
                  <div className="mt-1 font-mono text-[10px] text-ink-muted">
                    {tech.years}y exp
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <div className="mt-16 grid gap-6 md:grid-cols-3">
        {[
          {
            title: "Modern Frontend",
            items: ["React", "Next.js", "Angular", "TypeScript", "Expo"],
            color: "#00e5ff",
          },
          {
            title: "Backend & Cloud",
            items: ["Node.js", "NestJS", "AWS Lambda", "Docker", "Prisma"],
            color: "#8b5cf6",
          },
          {
            title: "Legacy & Data",
            items: ["PHP/Laravel", "Symfony", "MySQL", "MSSQL", "WordPress"],
            color: "#777bb4",
          },
        ].map((group) => (
          <div
            key={group.title}
            className="rounded-xl border border-surface-border bg-surface/30 p-6"
          >
            <h3
              className="font-display text-sm font-bold uppercase tracking-wider"
              style={{ color: group.color }}
            >
              {group.title}
            </h3>
            <ul className="mt-4 space-y-2">
              {group.items.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-2 font-mono text-sm text-ink-secondary"
                >
                  <span style={{ color: group.color }}>—</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}
