export interface TechItem {
  id: string;
  name: string;
  category: "frontend" | "backend" | "database" | "legacy" | "devops" | "state";
  color: string;
  years?: number;
}

export interface BackendNode {
  id: string;
  label: string;
  type: "service" | "database" | "gateway" | "storage" | "container";
  description: string;
  tech: string[];
  x: number;
  y: number;
  connections: string[];
}

export interface CaseStudy {
  id: string;
  domain: string;
  title: string;
  subtitle: string;
  challenge: string;
  solution: string;
  impact: string[];
  stack: string[];
  accent: string;
  metrics: { label: string; value: string }[];
}

export interface ParticleConfig {
  label: string;
  color: string;
  mass: number;
  radius: number;
}
