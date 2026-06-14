import Link from "next/link";

export default function NotFound() {
  return (
    <section className="flex min-h-[70vh] flex-col items-center justify-center px-6 py-24 text-center">
      <p className="font-mono text-xs uppercase tracking-[0.3em] text-aurora-violet">
        404 — Not found
      </p>
      <h1 className="mt-6 font-display text-[clamp(3rem,10vw,6rem)] font-extrabold leading-none tracking-tight text-ink-primary">
        Lost in the{" "}
        <span className="bg-gradient-to-r from-aurora-cyan to-aurora-violet bg-clip-text text-transparent">
          void
        </span>
      </h1>
      <p className="mx-auto mt-6 max-w-md text-lg leading-relaxed text-ink-secondary">
        The page you requested does not exist, was moved, or never shipped to
        production.
      </p>

      <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
        <Link
          href="/"
          className="rounded-full bg-gradient-to-r from-aurora-violet to-aurora-cyan px-8 py-3.5 font-display font-semibold text-void"
        >
          Back to home
        </Link>
        <Link
          href="/#case-studies"
          className="rounded-full border border-surface-border px-8 py-3.5 font-display font-semibold text-ink-primary transition-colors hover:border-aurora-violet/40"
        >
          View case studies
        </Link>
      </div>

      <p className="mt-12 font-mono text-xs text-ink-muted">
        Error code: 404 ·{" "}
        <Link href="/privacy" className="text-aurora-cyan hover:underline">
          Privacy policy
        </Link>
      </p>
    </section>
  );
}
