import Link from "next/link";
import { BlogCard } from "@/components/blog/BlogCard";
import { blogPosts } from "@/lib/data/blog-posts";
import { Section } from "@/components/ui/Section";

export function BlogTeaser() {
  const latest = [...blogPosts]
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
    )
    .slice(0, 2);

  return (
    <Section
      id="blog"
      label="Writing"
      title="Blog & research"
      description="Notes on agent-ready sites, event-driven architecture, and automating the boring parts of shipping software."
    >
      <div className="grid gap-6 md:grid-cols-2">
        {latest.map((post) => (
          <BlogCard key={post.slug} post={post} />
        ))}
      </div>
      <div className="mt-8 text-center">
        <Link
          href="/blog"
          className="inline-flex rounded-full border border-aurora-violet/30 bg-aurora-violet/10 px-6 py-3 font-mono text-xs uppercase tracking-wider text-aurora-violet transition-colors hover:bg-aurora-violet/20"
        >
          View all posts →
        </Link>
      </div>
    </Section>
  );
}
