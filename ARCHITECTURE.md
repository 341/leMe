# Portfolio Architecture

## Directory Structure

```
portfolio/
├── ARCHITECTURE.md          # This file
├── DESIGN.md                # Color palette & typography guide
├── package.json
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
├── postcss.config.mjs
├── public/
│   └── og-image.png         # Open Graph asset (generate at build)
└── src/
    ├── app/
    │   ├── layout.tsx       # Root layout, fonts, metadata, JSON-LD
    │   ├── page.tsx         # SSR home page — composes all sections
    │   ├── globals.css      # Design tokens, base styles
    │   ├── sitemap.ts       # Dynamic sitemap for SEO
    │   └── robots.ts        # Crawler rules
    ├── components/
    │   ├── layout/
    │   │   ├── Header.tsx           # Sticky nav with scroll spy
    │   │   └── Footer.tsx           # Contact links, social
    │   ├── hero/
    │   │   ├── PhysicsHero.tsx      # ★ Award feature — Matter.js canvas
    │   │   ├── ParticleEngine.ts    # Physics engine abstraction
    │   │   └── HeroContent.tsx      # SSR text overlay
    │   ├── backend/
    │   │   └── BackendShowcase.tsx  # Interactive microservices diagram
    │   ├── case-studies/
    │   │   ├── CaseStudies.tsx      # Section wrapper
    │   │   └── CaseStudyCard.tsx    # Expandable case study panels
    │   ├── tech-stack/
    │   │   └── TechStackEcosystem.tsx # Orbital animation grid
    │   └── ui/
    │       ├── Section.tsx          # Consistent section shell
    │       ├── Badge.tsx
    │       └── GlassCard.tsx
    ├── lib/
    │   ├── utils.ts                 # cn() helper
    │   └── data/
    │       ├── case-studies.ts      # Case study content (SSG-friendly)
    │       ├── tech-stack.ts        # Tech ecosystem data
    │       └── backend-services.ts  # AWS / infra node graph
    └── types/
        └── index.ts                 # Shared TypeScript interfaces
```

## Rendering Strategy

| Layer | Strategy | Rationale |
|-------|----------|-----------|
| `layout.tsx` metadata | SSR | SEO, Open Graph, structured data |
| `page.tsx` shell | SSR | Instant HTML, crawlable content |
| `HeroContent` | SSR | Headlines visible without JS |
| `PhysicsHero` | Client (`"use client"`) | Canvas + Matter.js requires browser |
| `BackendShowcase` | Client | Interactive node graph |
| `CaseStudyCard` | Client | Expand/collapse animations |
| `TechStackEcosystem` | Client | Orbital CSS/Framer animations |

## Performance Targets

- **LCP:** < 1.2s (SSR hero text, deferred physics init)
- **CLS:** 0 (next/font, reserved canvas height)
- **FID:** < 50ms (physics loads after `requestIdleCallback`)
- **Bundle:** Physics chunk lazy-loaded via dynamic import

## SEO

- JSON-LD `Person` + `WebSite` schema in layout
- Semantic HTML5 landmarks (`header`, `main`, `section`, `footer`)
- `sitemap.ts` + `robots.ts` for crawlers
- Descriptive `alt` text and heading hierarchy
