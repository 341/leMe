const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? "https://erollmaxhun.com";

export const siteConfig = {
  name: "Eroll Maxhuni",
  shortName: "Eroll Maxhuni",
  title: "Eroll Maxhuni — Full Stack Developer | React, Node.js, AWS",
  description:
    "Senior Full Stack Developer with 13 years of enterprise and freelance experience. Expert in React, TypeScript, Node.js, Angular, Next.js, NestJS, AWS microservices, PostgreSQL, and distributed systems architecture.",
  tagline:
    "13 years architecting enterprise-grade applications across React, Angular, Node.js, and AWS.",
  url: siteUrl,
  locale: "en_US",
  language: "en",
  email: "info@erollmaxhuni.com",
  jobTitle: "Full Stack Developer",
  keywords: [
    "Full Stack Developer",
    "Senior Software Engineer",
    "React Developer",
    "TypeScript Developer",
    "Node.js Developer",
    "Next.js Developer",
    "NestJS Developer",
    "Angular Developer",
    "AWS Architect",
    "Microservices",
    "PostgreSQL",
    "Prisma",
    "Docker",
    "WebRTC",
    "Expo React Native",
    "Enterprise Software",
    "Freelance Developer",
  ],
  sameAs: [
    "https://github.com/341",
    "https://www.linkedin.com/in/eroll-maxhuni/",
  ],
  knowsAbout: [
    "React",
    "TypeScript",
    "Node.js",
    "Angular",
    "Next.js",
    "NestJS",
    "AWS Lambda",
    "API Gateway",
    "Amazon S3",
    "PostgreSQL",
    "Prisma ORM",
    "Docker",
    "Microservices Architecture",
    "WebRTC",
    "Expo",
    "Redux",
    "PHP",
    "Laravel",
  ],
} as const;

export function absoluteUrl(path = ""): string {
  return `${siteConfig.url}${path.startsWith("/") ? path : `/${path}`}`;
}
