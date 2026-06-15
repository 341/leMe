import type { Metadata } from "next";
import { BlogTeaser } from "@/components/blog/BlogTeaser";
import { HomeClient } from "@/components/HomeClient";
import { CaseStudies } from "@/components/case-studies/CaseStudies";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildHomeJsonLd } from "@/lib/seo/json-ld";
import { homeMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = homeMetadata;

export default function HomePage() {
  const jsonLd = buildHomeJsonLd();

  return (
    <>
      <JsonLd data={jsonLd} />
      <HomeClient />
      <CaseStudies />
      <BlogTeaser />
    </>
  );
}
