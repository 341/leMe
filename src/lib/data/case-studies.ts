import type { CaseStudy } from "@/types";

export const caseStudies: CaseStudy[] = [
  {
    id: "expo-delivery",
    domain: "Logistics & Mobility",
    title: "Expo Delivery & Driver Platform",
    subtitle: "Real-time fleet coordination for enterprise logistics",
    challenge:
      "A national courier needed unified driver and customer apps with offline-first delivery tracking, push notifications, and sub-second location updates across 2,000+ active drivers.",
    solution:
      "Architected a React Native (Expo) monorepo with shared business logic, WebSocket-backed live tracking, background geolocation, and a NestJS event-sourced backend on AWS Lambda with SQS fan-out for order state machines.",
    impact: [
      "Reduced delivery ETA errors by 34%",
      "99.7% crash-free sessions across iOS & Android",
      "Onboarded 2,000+ drivers in 6 weeks",
    ],
    stack: ["Expo", "React Native", "NestJS", "AWS Lambda", "PostgreSQL", "Redis"],
    accent: "#00e5ff",
    metrics: [
      { label: "Active Drivers", value: "2K+" },
      { label: "Crash-Free Rate", value: "99.7%" },
      { label: "ETA Accuracy", value: "+34%" },
    ],
  },
  {
    id: "angular-wc",
    domain: "Integrated Library Systems",
    title: "React Web Components in Angular",
    subtitle: "Cross-framework component bridge for enterprise ILMS",
    challenge:
      "A university library consortium required modern React UI widgets embedded inside a legacy Angular 12 ILMS without a full rewrite — preserving Angular routing, auth, and change detection.",
    solution:
      "Built a Web Components layer with Shadow DOM isolation, custom event buses for Angular↔React communication, and a shared design token system. Delivered catalog search, reservation flows, and accessibility-compliant forms as framework-agnostic custom elements.",
    impact: [
      "Shipped 12 React widgets into production Angular shell",
      "Zero regression in Angular change detection cycles",
      "WCAG 2.1 AA compliance across all new components",
    ],
    stack: ["React", "Web Components", "Angular", "TypeScript", "Storybook"],
    accent: "#8b5cf6",
    metrics: [
      { label: "Widgets Shipped", value: "12" },
      { label: "Frameworks", value: "2" },
      { label: "A11y Score", value: "AA" },
    ],
  },
  {
    id: "webrtc-secure",
    domain: "Secure Communications",
    title: "WebRTC Data Management Platform",
    subtitle: "End-to-end encrypted peer data channels for regulated industries",
    challenge:
      "A healthcare SaaS client needed HIPAA-aligned real-time data sync between clinicians with no server-side decryption of payload content — only metadata routing.",
    solution:
      "Designed a signaling server on NestJS with TURN/STUN on AWS, implemented DTLS-SRTP data channels with client-side AES-256 encryption, and built a React dashboard for session audit trails without exposing plaintext.",
    impact: [
      "Zero plaintext data at rest on servers",
      "Sub-200ms P2P sync latency in EU regions",
      "Passed third-party security audit on first review",
    ],
    stack: ["WebRTC", "React", "NestJS", "Node.js", "AWS", "PostgreSQL"],
    accent: "#f472b6",
    metrics: [
      { label: "P2P Latency", value: "<200ms" },
      { label: "Encryption", value: "E2E" },
      { label: "Audit Pass", value: "1st Try" },
    ],
  },
];
