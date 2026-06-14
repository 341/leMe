"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ParticleEngine } from "./ParticleEngine";
import { heroParticles } from "@/lib/data/hero-particles";
import { HeroContent } from "./HeroContent";

export function PhysicsHero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const engineRef = useRef<ParticleEngine | null>(null);
  const [isReady, setIsReady] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  const initEngine = useCallback(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container || prefersReducedMotion) return;

    const rect = container.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    if (engineRef.current) {
      engineRef.current.dispose();
    }

    engineRef.current = new ParticleEngine(canvas, {
      width,
      height,
      particles: heroParticles,
      onReady: () => setIsReady(true),
    });
  }, [prefersReducedMotion]);

  useEffect(() => {
    if (prefersReducedMotion) {
      setIsReady(true);
      return;
    }

    const scheduleInit = () => {
      if ("requestIdleCallback" in window) {
        requestIdleCallback(() => initEngine(), { timeout: 2000 });
      } else {
        setTimeout(initEngine, 100);
      }
    };

    scheduleInit();

    const handleResize = () => {
      const container = containerRef.current;
      if (!container || !engineRef.current) return;
      const rect = container.getBoundingClientRect();
      engineRef.current.resize(rect.width, rect.height);
    };

    const resizeObserver = new ResizeObserver(handleResize);
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => {
      resizeObserver.disconnect();
      engineRef.current?.dispose();
    };
  }, [initEngine, prefersReducedMotion]);

  return (
    <section
      id="hero"
      className="relative min-h-screen overflow-hidden bg-void"
      aria-label="Introduction"
    >
      <div className="pointer-events-none absolute inset-0 bg-aurora-radial" />
      <div
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(139,92,246,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(139,92,246,0.06) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage: "radial-gradient(ellipse 70% 60% at 50% 50%, black, transparent)",
        }}
      />

      <div ref={containerRef} className="absolute inset-0">
        {!prefersReducedMotion && (
          <canvas
            ref={canvasRef}
            className="absolute inset-0 h-full w-full"
            style={{ touchAction: "none" }}
            aria-hidden="true"
          />
        )}

        {prefersReducedMotion && (
          <div className="absolute inset-0 flex flex-wrap items-center justify-center gap-4 p-8 opacity-40">
            {heroParticles.map((p) => (
              <span
                key={p.label}
                className="rounded-full px-4 py-2 font-mono text-sm"
                style={{
                  backgroundColor: `${p.color}22`,
                  color: p.color,
                  border: `1px solid ${p.color}44`,
                }}
              >
                {p.label}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6">
        <HeroContent isReady={isReady} />

        {!prefersReducedMotion && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: isReady ? 1 : 0 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="mt-8 font-mono text-xs tracking-widest text-ink-muted"
          >
            MOVE CURSOR TO INTERACT
          </motion.p>
        )}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
      >
        <div className="flex flex-col items-center gap-2">
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-ink-muted">
            Scroll
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="h-8 w-5 rounded-full border border-surface-border p-1"
          >
            <div className="mx-auto h-2 w-1 rounded-full bg-aurora-violet" />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
