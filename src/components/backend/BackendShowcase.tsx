"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { backendNodes } from "@/lib/data/backend-services";
import type { BackendNode } from "@/types";
import { Section } from "@/components/ui/Section";
import { cn } from "@/lib/utils";

const typeColors: Record<BackendNode["type"], string> = {
  service: "#8b5cf6",
  gateway: "#00e5ff",
  database: "#336791",
  storage: "#fbbf24",
  container: "#2496ed",
};

const typeIcons: Record<BackendNode["type"], string> = {
  service: "λ",
  gateway: "⬡",
  database: "◉",
  storage: "▣",
  container: "◫",
};

export function BackendShowcase() {
  const [activeId, setActiveId] = useState<string | null>("gateway");
  const activeNode = backendNodes.find((n) => n.id === activeId);

  return (
    <Section
      id="architecture"
      label="Backend Architecture"
      title="Microservices on AWS"
      description="Interactive topology of a production-grade distributed system — Lambda, API Gateway, Prisma, PostgreSQL, Docker."
    >
      <div className="grid gap-8 lg:grid-cols-5">
        <div className="relative lg:col-span-3">
          <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-surface-border bg-surface/50 backdrop-blur-sm">
            <svg
              className="absolute inset-0 h-full w-full"
              viewBox="0 0 100 100"
              preserveAspectRatio="xMidYMid meet"
            >
              <defs>
                <linearGradient id="line-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.2" />
                  <stop offset="50%" stopColor="#00e5ff" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.2" />
                </linearGradient>
              </defs>

              {backendNodes.flatMap((node) =>
                node.connections.map((targetId) => {
                  const target = backendNodes.find((n) => n.id === targetId);
                  if (!target) return null;
                  const isActive =
                    activeId === node.id || activeId === targetId;
                  return (
                    <motion.line
                      key={`${node.id}-${targetId}`}
                      x1={node.x}
                      y1={node.y}
                      x2={target.x}
                      y2={target.y}
                      stroke={isActive ? "url(#line-gradient)" : "rgba(42,42,58,0.6)"}
                      strokeWidth={isActive ? 0.4 : 0.2}
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 1.5, delay: 0.2 }}
                    />
                  );
                }),
              )}

              {activeId &&
                backendNodes
                  .find((n) => n.id === activeId)
                  ?.connections.map((targetId) => {
                    const source = backendNodes.find((n) => n.id === activeId)!;
                    const target = backendNodes.find((n) => n.id === targetId);
                    if (!target) return null;
                    return (
                      <motion.circle
                        key={`pulse-${activeId}-${targetId}`}
                        r="0.8"
                        fill="#00e5ff"
                        initial={{ cx: source.x, cy: source.y }}
                        animate={{ cx: target.x, cy: target.y }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                      />
                    );
                  })}
            </svg>

            {backendNodes.map((node, i) => (
              <motion.button
                key={node.id}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.08, type: "spring", stiffness: 200 }}
                onClick={() => setActiveId(node.id)}
                className={cn(
                  "absolute -translate-x-1/2 -translate-y-1/2 rounded-xl border px-3 py-2 transition-all",
                  activeId === node.id
                    ? "border-aurora-cyan bg-surface-elevated shadow-glow-cyan scale-110 z-10"
                    : "border-surface-border bg-surface/80 hover:border-aurora-violet/40",
                )}
                style={{
                  left: `${node.x}%`,
                  top: `${node.y}%`,
                }}
                aria-pressed={activeId === node.id}
              >
                <span
                  className="mr-1.5 font-mono text-sm"
                  style={{ color: typeColors[node.type] }}
                >
                  {typeIcons[node.type]}
                </span>
                <span className="font-mono text-[10px] uppercase tracking-wider text-ink-secondary">
                  {node.label}
                </span>
              </motion.button>
            ))}
          </div>
        </div>

        <div className="lg:col-span-2">
          <AnimatePresence mode="wait">
            {activeNode && (
              <motion.div
                key={activeNode.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="h-full rounded-2xl border border-surface-border bg-surface/50 p-6 backdrop-blur-sm"
              >
                <div className="flex items-center gap-3">
                  <div
                    className="flex h-10 w-10 items-center justify-center rounded-lg font-mono text-lg"
                    style={{
                      backgroundColor: `${typeColors[activeNode.type]}22`,
                      color: typeColors[activeNode.type],
                    }}
                  >
                    {typeIcons[activeNode.type]}
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-bold text-ink-primary">
                      {activeNode.label}
                    </h3>
                    <span className="font-mono text-[10px] uppercase tracking-wider text-ink-muted">
                      {activeNode.type}
                    </span>
                  </div>
                </div>

                <p className="mt-4 text-sm leading-relaxed text-ink-secondary">
                  {activeNode.description}
                </p>

                <div className="mt-6 flex flex-wrap gap-2">
                  {activeNode.tech.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full border border-surface-border bg-void-100 px-3 py-1 font-mono text-xs text-ink-secondary"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {activeNode.connections.length > 0 && (
                  <div className="mt-6 border-t border-surface-border pt-4">
                    <span className="font-mono text-[10px] uppercase tracking-wider text-ink-muted">
                      Connected to
                    </span>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {activeNode.connections.map((id) => {
                        const conn = backendNodes.find((n) => n.id === id);
                        return conn ? (
                          <button
                            key={id}
                            onClick={() => setActiveId(id)}
                            className="font-mono text-xs text-aurora-cyan hover:underline"
                          >
                            → {conn.label}
                          </button>
                        ) : null;
                      })}
                    </div>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </Section>
  );
}
