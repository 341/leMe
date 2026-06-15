import type { Metadata } from "next";
import Link from "next/link";
import { BlogCard } from "@/components/blog/BlogCard";
import { blogPosts } from "@/lib/data/blog-posts";

export const metadata: Metadata = {
  title: "Blog — Coding, Architecture & Automation",
  description:
    "Research notes and stories on agent-ready sites, event-driven systems, markdown for machines, and automating developer workflows.",
  alternates: {
    canonical: "/blog",
  },
};

export default function BlogPage() {
  const sorted = [...blogPosts].sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  );

  return (
    <div className="mx-auto max-w-4xl px-6 py-24 md:py-32">
      <header className="mb-12">
        <p className="font-mono text-xs uppercase tracking-[0.25em] text-aurora-violet">
          Writing
        </p>
        <h1 className="mt-3 font-display text-4xl font-bold tracking-tight text-ink-primary md:text-5xl">
          Blog
        </h1>
        <p className="mt-4 max-w-2xl text-ink-secondary">
          Research and field stories on coding, architecture, and automation —
          drawn from production work and experiments on this site.
        </p>
      </header>

      <div className="grid gap-6">
        {sorted.map((post) => (
          <BlogCard key={post.slug} post={post} />
        ))}
      </div>

      <div className="mt-12 border-t border-surface-border pt-8">
        <Link
          href="/"
          className="inline-flex rounded-full border border-surface-border px-6 py-3 font-mono text-xs uppercase tracking-wider text-ink-secondary transition-colors hover:border-aurora-violet/40 hover:text-ink-primary"
        >
          ← Back to home
        </Link>
      </div>
    </div>
  );
}
