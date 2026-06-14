import { cn } from "@/lib/utils";

interface SectionProps {
  id: string;
  label: string;
  title: string;
  description: string;
  children: React.ReactNode;
  className?: string;
}

export function Section({
  id,
  label,
  title,
  description,
  children,
  className,
}: SectionProps) {
  const headingId = `${id}-heading`;

  return (
    <section
      id={id}
      aria-labelledby={headingId}
      className={cn("relative py-24 md:py-32", className)}
    >
      <div className="mx-auto max-w-7xl px-6">
        <header className="mb-12 max-w-2xl md:mb-16">
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-aurora-violet">
            {label}
          </p>
          <h2
            id={headingId}
            className="mt-3 font-display text-[clamp(2rem,4vw,3rem)] font-bold tracking-tight text-ink-primary"
          >
            {title}
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-ink-secondary">
            {description}
          </p>
        </header>
        {children}
      </div>
    </section>
  );
}
