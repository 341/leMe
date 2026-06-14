import type { TechItem } from "@/types";

export const techStack: TechItem[] = [
  { id: "react", name: "React", category: "frontend", color: "#00e5ff", years: 8 },
  { id: "typescript", name: "TypeScript", category: "frontend", color: "#3b82f6", years: 7 },
  { id: "nextjs", name: "Next.js", category: "frontend", color: "#f4f4f8", years: 5 },
  { id: "angular", name: "Angular", category: "frontend", color: "#dd0031", years: 6 },
  { id: "nodejs", name: "Node.js", category: "backend", color: "#68a063", years: 10 },
  { id: "nestjs", name: "NestJS", category: "backend", color: "#e0234e", years: 4 },
  { id: "redux", name: "Redux", category: "state", color: "#764abc", years: 6 },
  { id: "saga", name: "Redux Saga", category: "state", color: "#9999ff", years: 5 },
  { id: "prisma", name: "Prisma", category: "backend", color: "#2d3748", years: 3 },
  { id: "postgresql", name: "PostgreSQL", category: "database", color: "#336791", years: 9 },
  { id: "mysql", name: "MySQL", category: "database", color: "#00758f", years: 11 },
  { id: "mssql", name: "MSSQL", category: "database", color: "#cc2927", years: 8 },
  { id: "laravel", name: "Laravel", category: "legacy", color: "#ff2d20", years: 7 },
  { id: "symfony", name: "Symfony", category: "legacy", color: "#000000", years: 5 },
  { id: "wordpress", name: "WordPress", category: "legacy", color: "#21759b", years: 10 },
  { id: "php", name: "PHP", category: "legacy", color: "#777bb4", years: 11 },
  { id: "docker", name: "Docker", category: "devops", color: "#2496ed", years: 6 },
  { id: "aws", name: "AWS", category: "devops", color: "#fbbf24", years: 5 },
  { id: "expo", name: "Expo", category: "frontend", color: "#000020", years: 3 },
  { id: "webrtc", name: "WebRTC", category: "frontend", color: "#f472b6", years: 4 },
];

export const techCategories = [
  { id: "frontend", label: "Modern Frontend", color: "#00e5ff" },
  { id: "backend", label: "Backend & APIs", color: "#8b5cf6" },
  { id: "database", label: "Data Layer", color: "#336791" },
  { id: "state", label: "State Management", color: "#764abc" },
  { id: "legacy", label: "Enterprise Legacy", color: "#777bb4" },
  { id: "devops", label: "Cloud & DevOps", color: "#fbbf24" },
] as const;
