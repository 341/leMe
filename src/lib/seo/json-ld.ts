import { caseStudies } from "@/lib/data/case-studies";
import { absoluteUrl, siteConfig } from "@/lib/seo/site";

export function getPersonSchema() {
  const pageUrl = absoluteUrl("/");

  return {
    "@type": "Person" as const,
    "@id": `${pageUrl}#person`,
    name: siteConfig.name,
    url: pageUrl,
    jobTitle: siteConfig.jobTitle,
    email: siteConfig.email,
    description: siteConfig.description,
    knowsAbout: siteConfig.knowsAbout,
    sameAs: siteConfig.sameAs,
    image: absoluteUrl("/opengraph-image"),
  };
}

export function buildPersonJsonLd() {
  return {
    "@context": "https://schema.org",
    ...getPersonSchema(),
  };
}

export function buildHomeJsonLd() {
  const pageUrl = absoluteUrl("/");

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${pageUrl}#website`,
        url: pageUrl,
        name: siteConfig.name,
        description: siteConfig.description,
        inLanguage: siteConfig.language,
        publisher: { "@id": `${pageUrl}#person` },
      },
      {
        "@type": "WebPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: siteConfig.title,
        description: siteConfig.description,
        isPartOf: { "@id": `${pageUrl}#website` },
        about: { "@id": `${pageUrl}#person` },
        inLanguage: siteConfig.language,
        primaryImageOfPage: {
          "@type": "ImageObject",
          url: absoluteUrl("/opengraph-image"),
        },
      },
      {
        "@type": "ProfilePage",
        "@id": `${pageUrl}#profilepage`,
        url: pageUrl,
        name: siteConfig.title,
        description: siteConfig.description,
        mainEntity: { "@id": `${pageUrl}#person` },
        inLanguage: siteConfig.language,
      },
      getPersonSchema(),
      {
        "@type": "ProfessionalService",
        "@id": `${pageUrl}#service`,
        name: `${siteConfig.name} — Full Stack Development`,
        url: pageUrl,
        description:
          "Enterprise full-stack development, microservices architecture, and cloud-native solutions on AWS.",
        provider: { "@id": `${pageUrl}#person` },
        areaServed: "Worldwide",
        serviceType: [
          "Full Stack Web Development",
          "Mobile App Development",
          "Cloud Architecture",
          "Microservices Consulting",
        ],
        knowsAbout: siteConfig.knowsAbout,
      },
      {
        "@type": "ItemList",
        "@id": `${pageUrl}#casestudies`,
        name: "Portfolio Case Studies",
        itemListElement: caseStudies.map((study, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: study.title,
          description: study.subtitle,
          url: `${pageUrl}#case-studies`,
        })),
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${pageUrl}#breadcrumb`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: pageUrl,
          },
        ],
      },
    ],
  };
}
