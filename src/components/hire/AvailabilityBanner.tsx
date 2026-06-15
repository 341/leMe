import { siteConfig } from "@/lib/seo/site";

export function AvailabilityBanner() {
  return (
    <div
      role="status"
      className="border-b border-aurora-cyan/20 bg-aurora-cyan/5 px-4 py-2.5 text-center"
    >
      <p className="font-mono text-xs tracking-wide text-ink-secondary md:text-sm">
        <span className="mr-2 inline-block h-2 w-2 rounded-full bg-emerald-400 align-middle" />
        Available for senior full-stack roles & consulting · Remote (CET) ·{" "}
        <a
          href={`mailto:${siteConfig.email}?subject=Project%20inquiry`}
          className="text-aurora-cyan underline-offset-2 hover:underline"
        >
          {siteConfig.email}
        </a>
      </p>
    </div>
  );
}
