"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/lib/seo/site";

const navLinks = [
  { href: "/#architecture", label: "Architecture" },
  { href: "/work", label: "Work", route: true },
  { href: "/#tech-stack", label: "Tech Stack" },
  { href: "/blog", label: "Blog", route: true },
  { href: "/#contact", label: "Contact" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "top-0 z-50 w-full transition-all duration-300",
        scrolled
          ? "border-b border-surface-border/50 bg-void/80 backdrop-blur-xl"
          : "bg-transparent",
      )}
    >
      <nav
        aria-label="Primary navigation"
        className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4"
      >
        <Link
          href="/"
          aria-label="Eroll Maxhuni — home"
          className="font-display text-lg font-bold tracking-tight text-ink-primary"
        >
          EM<span className="text-aurora-violet">.</span>
        </Link>

        <ul className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              {link.route ? (
                <Link
                  href={link.href}
                  className="font-mono text-xs uppercase tracking-wider text-ink-secondary transition-colors hover:text-aurora-cyan"
                >
                  {link.label}
                </Link>
              ) : (
                <a
                  href={link.href}
                  className="font-mono text-xs uppercase tracking-wider text-ink-secondary transition-colors hover:text-aurora-cyan"
                >
                  {link.label}
                </a>
              )}
            </li>
          ))}
        </ul>

        <a
          href={`mailto:${siteConfig.email}`}
          className="rounded-full border border-aurora-violet/30 bg-aurora-violet/10 px-4 py-2 font-mono text-xs text-aurora-violet transition-colors hover:bg-aurora-violet/20"
        >
          Hire Me
        </a>
      </nav>
    </header>
  );
}
