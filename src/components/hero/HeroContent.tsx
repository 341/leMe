"use client";

import { motion } from "framer-motion";

interface HeroContentProps {
  isReady: boolean;
}

const stats = [
  { value: "13+", label: "Years Experience" },
  { value: "50+", label: "Projects Delivered" },
  { value: "6", label: "Core Frameworks" },
];

export function HeroContent({ isReady }: HeroContentProps) {
  return (
    <div className="max-w-5xl text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: isReady ? 1 : 0, y: isReady ? 0 : 20 }}
        transition={{ duration: 0.6 }}
      >
        <span className="mb-6 inline-block rounded-full border border-aurora-violet/30 bg-aurora-violet/10 px-4 py-1.5 font-mono text-xs tracking-wider text-aurora-violet">
          FULL STACK DEVELOPER
        </span>
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: isReady ? 1 : 0, y: isReady ? 0 : 30 }}
        transition={{ duration: 0.8, delay: 0.1 }}
        className="font-display text-[clamp(2.5rem,8vw,5.5rem)] font-extrabold leading-[1.05] tracking-tight text-ink-primary"
      >
        Engineering{" "}
        <span className="bg-gradient-to-r from-aurora-cyan via-aurora-violet to-aurora-magenta bg-clip-text text-transparent">
          Distributed
        </span>{" "}
        Systems
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: isReady ? 1 : 0, y: isReady ? 0 : 20 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-ink-secondary md:text-xl"
      >
        13 years architecting enterprise-grade applications across React, Angular,
        Node.js, and AWS — from real-time mobile platforms to secure WebRTC systems.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: isReady ? 1 : 0, y: isReady ? 0 : 20 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="mt-10 flex flex-wrap items-center justify-center gap-4"
      >
        <a
          href="#case-studies"
          className="group relative overflow-hidden rounded-full bg-gradient-to-r from-aurora-violet to-aurora-cyan px-8 py-3.5 font-display font-semibold text-void shadow-glow transition-transform hover:scale-105"
        >
          <span className="relative z-10">View Case Studies</span>
        </a>
        <a
          href="#architecture"
          className="rounded-full border border-surface-border bg-surface/50 px-8 py-3.5 font-display font-semibold text-ink-primary backdrop-blur-sm transition-colors hover:border-aurora-violet/50 hover:bg-surface-elevated"
        >
          Backend Architecture
        </a>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isReady ? 1 : 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        className="mt-16 grid grid-cols-3 gap-8 border-t border-surface-border/50 pt-10"
      >
        {stats.map((stat) => (
          <div key={stat.label}>
            <div className="font-display text-3xl font-bold text-ink-primary md:text-4xl">
              {stat.value}
            </div>
            <div className="mt-1 font-mono text-xs uppercase tracking-wider text-ink-muted">
              {stat.label}
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
