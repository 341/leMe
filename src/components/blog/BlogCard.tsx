import Link from "next/link";
import type { BlogPost } from "@/lib/data/blog-posts";

export function BlogCard({ post }: { post: BlogPost }) {
  return (
    <article className="rounded-2xl border border-surface-border bg-surface/40 p-6 transition-colors hover:border-aurora-violet/30">
      <time
        dateTime={post.publishedAt}
        className="font-mono text-[10px] uppercase tracking-wider text-ink-muted"
      >
        {post.publishedAt} · {post.readingMinutes} min read
      </time>
      <h2 className="mt-3 font-display text-xl font-bold text-ink-primary">
        <Link href={`/blog/${post.slug}`} className="hover:text-aurora-cyan">
          {post.title}
        </Link>
      </h2>
      <p className="mt-2 text-sm leading-relaxed text-ink-secondary">
        {post.description}
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        {post.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-surface-border px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-ink-muted"
          >
            {tag}
          </span>
        ))}
      </div>
    </article>
  );
}
