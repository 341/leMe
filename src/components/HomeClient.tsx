"use client";

import dynamic from "next/dynamic";
import { HeroContent } from "@/components/hero/HeroContent";

const PhysicsHero = dynamic(
  () => import("@/components/hero/PhysicsHero").then((m) => m.PhysicsHero),
  {
    loading: () => (
      <section
        id="hero"
        className="relative flex min-h-screen items-center justify-center bg-void"
      >
        <div className="absolute inset-0 bg-aurora-radial" />
        <HeroContent isReady />
      </section>
    ),
  },
);

const BackendShowcase = dynamic(
  () =>
    import("@/components/backend/BackendShowcase").then(
      (m) => m.BackendShowcase,
    ),
);

const TechStackEcosystem = dynamic(
  () =>
    import("@/components/tech-stack/TechStackEcosystem").then(
      (m) => m.TechStackEcosystem,
    ),
);

const StackMatcher = dynamic(
  () =>
    import("@/components/hire/StackMatcher").then((m) => m.StackMatcher),
);

export function HomeClient() {
  return (
    <>
      <PhysicsHero />
      <BackendShowcase />
      <TechStackEcosystem />
      <StackMatcher />
    </>
  );
}
