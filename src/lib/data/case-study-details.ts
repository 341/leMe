export type CaseStudyDetailSection = {
  title: string;
  body: string;
};

export type CaseStudyDetail = {
  role: string;
  timeline: string;
  sections: CaseStudyDetailSection[];
  lessons: string[];
};

export const caseStudyDetails: Record<string, CaseStudyDetail> = {
  "expo-delivery": {
    role: "Lead full-stack architect — mobile, backend, and AWS infrastructure",
    timeline: "9 months · national logistics rollout",
    sections: [
      {
        title: "The problem",
        body:
          "Drivers used fragmented tools. Dispatchers lacked a single source of truth for order state. ETA predictions drifted because location updates were batched and lossy on poor networks.",
      },
      {
        title: "Architecture",
        body:
          "Expo monorepo for driver and customer apps with shared TypeScript domain models. NestJS services on Lambda consumed SQS events for order lifecycle transitions. Redis held live driver positions; PostgreSQL remained the system of record with optimistic concurrency on state changes.",
      },
      {
        title: "What I owned",
        body:
          "End-to-end delivery: mobile offline queues, WebSocket fan-out design, CI/CD for OTA updates, and the saga-style order processor that kept partial failures recoverable without manual ops intervention.",
      },
    ],
    lessons: [
      "Offline-first mobile is non-negotiable for field workforces.",
      "Event sourcing lightens debugging when 2,000 drivers mutate state concurrently.",
      "Invest in observability early — ETA accuracy was a metrics problem before it was an ML problem.",
    ],
  },
  "angular-wc": {
    role: "Frontend architect — React inside Angular without a rewrite",
    timeline: "14 months · university library consortium",
    sections: [
      {
        title: "The constraint",
        body:
          "The ILMS shell could not be replaced. Angular 12 routing, auth, and change detection had to remain untouched while product teams demanded modern React UX for catalog and reservations.",
      },
      {
        title: "The bridge",
        body:
          "Web Components with Shadow DOM isolated styles. A typed custom-event bus carried domain events between Angular services and React islands. Storybook documented each widget for QA and accessibility review.",
      },
      {
        title: "Outcome",
        body:
          "Twelve production widgets shipped incrementally. Teams stopped debating framework religion and started shipping features again.",
      },
    ],
    lessons: [
      "Framework boundaries are organizational boundaries — design for team autonomy.",
      "Accessibility belongs in the component contract, not a late audit.",
      "Shadow DOM saves you from global CSS wars in brownfield apps.",
    ],
  },
  "webrtc-secure": {
    role: "Security-focused full-stack lead",
    timeline: "11 months · healthcare SaaS",
    sections: [
      {
        title: "Regulatory pressure",
        body:
          "Clinicians needed real-time collaboration. Compliance required that clinical payload bytes never decrypt on infrastructure the vendor operated — only on endpoints.",
      },
      {
        title: "Technical approach",
        body:
          "NestJS signaling with TURN on AWS. DTLS-SRTP data channels with client-side AES-256. Audit UI surfaced session metadata and connection health without displaying message bodies.",
      },
      {
        title: "Verification",
        body:
          "Third-party penetration test on first submission. Architecture documentation mapped trust boundaries for the customer's security team.",
      },
    ],
    lessons: [
      "Threat modeling beats feature velocity in regulated domains.",
      "Signaling servers are metadata routers — treat them as sensitive audit surfaces.",
      "Latency budgets matter when clinicians work under time pressure.",
    ],
  },
};

export function getCaseStudyDetail(id: string): CaseStudyDetail | undefined {
  return caseStudyDetails[id];
}
