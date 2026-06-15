import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getAllBlogSlugs,
  getBlogPost,
} from "@/lib/data/blog-posts";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getAllBlogSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    return { title: "Post not found" };
  }

  return {
    title: post.title,
    description: post.description,
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
    openGraph: {
      type: "article",
      publishedTime: post.publishedAt,
      tags: post.tags,
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="mx-auto max-w-3xl px-6 py-24 md:py-32">
      <header className="mb-12">
        <p className="font-mono text-xs uppercase tracking-[0.25em] text-aurora-violet">
          Blog
        </p>
        <h1 className="mt-3 font-display text-4xl font-bold tracking-tight text-ink-primary md:text-5xl">
          {post.title}
        </h1>
        <p className="mt-4 text-sm text-ink-muted">
          <time dateTime={post.publishedAt}>{post.publishedAt}</time>
          {" · "}
          {post.readingMinutes} min read
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
      </header>

      <div className="space-y-10 text-base leading-relaxed text-ink-secondary">
        {post.sections.map((section, index) => (
          <section key={index}>
            {section.heading ? (
              <h2 className="font-display text-xl font-semibold text-ink-primary">
                {section.heading}
              </h2>
            ) : null}
            {section.paragraphs.map((paragraph, pIndex) => (
              <p
                key={pIndex}
                className={
                  section.heading || pIndex > 0 ? "mt-3" : undefined
                }
              >
                {paragraph}
              </p>
            ))}
          </section>
        ))}
      </div>

      <div className="mt-12 flex flex-wrap gap-4 border-t border-surface-border pt-8">
        <Link
          href="/blog"
          className="inline-flex rounded-full border border-surface-border px-6 py-3 font-mono text-xs uppercase tracking-wider text-ink-secondary transition-colors hover:border-aurora-violet/40 hover:text-ink-primary"
        >
          ← All posts
        </Link>
        <Link
          href="/#fit-check"
          className="inline-flex rounded-full border border-aurora-violet/30 bg-aurora-violet/10 px-6 py-3 font-mono text-xs uppercase tracking-wider text-aurora-violet transition-colors hover:bg-aurora-violet/20"
        >
          Do we match? →
        </Link>
      </div>
    </article>
  );
}
