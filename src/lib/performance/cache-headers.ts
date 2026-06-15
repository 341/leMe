/** Cache-Control values aligned with static asset fingerprinting and CDN best practices. */

import { buildHomeLinkHeader } from "../seo/link-headers";

export const cacheControl = {
  /** Hashed build assets (_next/static) — safe to cache indefinitely. */
  immutable: "public, max-age=31536000, immutable",
  /** Generated images/icons that may change on redeploy. */
  daily: "public, max-age=86400, must-revalidate",
  /** SEO and AI text files — refresh daily. */
  hourly: "public, max-age=3600, must-revalidate",
  /** HTML documents — revalidate each visit, allow CDN stale serving. */
  html: "public, max-age=3600, must-revalidate, stale-while-revalidate=86400",
} as const;

export const performanceHeaders = [
  {
    source: "/_next/static/:path*",
    headers: [
      {
        key: "Cache-Control",
        value: cacheControl.immutable,
      },
    ],
  },
  {
    source: "/icon",
    headers: [{ key: "Cache-Control", value: cacheControl.daily }],
  },
  {
    source: "/apple-icon",
    headers: [{ key: "Cache-Control", value: cacheControl.daily }],
  },
  {
    source: "/opengraph-image",
    headers: [{ key: "Cache-Control", value: cacheControl.daily }],
  },
  {
    source: "/manifest.webmanifest",
    headers: [{ key: "Cache-Control", value: cacheControl.daily }],
  },
  {
    source: "/",
    headers: [
      { key: "Cache-Control", value: cacheControl.html },
      { key: "Link", value: buildHomeLinkHeader() },
      { key: "Vary", value: "Accept" },
    ],
  },
  {
    source: "/privacy",
    headers: [
      { key: "Cache-Control", value: cacheControl.html },
      { key: "Vary", value: "Accept" },
    ],
  },
  {
    source: "/amp",
    headers: [{ key: "Cache-Control", value: cacheControl.html }],
  },
  {
    source: "/amp/privacy",
    headers: [{ key: "Cache-Control", value: cacheControl.html }],
  },
  {
    source: "/sitemap.xml",
    headers: [
      { key: "Content-Type", value: "application/xml; charset=utf-8" },
      { key: "Cache-Control", value: cacheControl.hourly },
    ],
  },
  {
    source: "/llm.txt",
    headers: [
      { key: "Content-Type", value: "text/plain; charset=utf-8" },
      { key: "Cache-Control", value: cacheControl.daily },
    ],
  },
  {
    source: "/llms.txt",
    headers: [
      { key: "Content-Type", value: "text/plain; charset=utf-8" },
      { key: "Cache-Control", value: cacheControl.daily },
    ],
  },
  {
    source: "/.well-known/security.txt",
    headers: [
      { key: "Content-Type", value: "text/plain; charset=utf-8" },
      { key: "Cache-Control", value: cacheControl.daily },
    ],
  },
  {
    source: "/auth.md",
    headers: [
      { key: "Content-Type", value: "text/markdown; charset=utf-8" },
      { key: "Cache-Control", value: cacheControl.daily },
    ],
  },
  {
    source: "/.well-known/oauth-protected-resource",
    headers: [
      { key: "Content-Type", value: "application/json; charset=utf-8" },
      { key: "Cache-Control", value: cacheControl.hourly },
    ],
  },
  {
    source: "/.well-known/oauth-authorization-server",
    headers: [
      { key: "Content-Type", value: "application/json; charset=utf-8" },
      { key: "Cache-Control", value: cacheControl.hourly },
    ],
  },
  {
    source: "/.well-known/oauth/token",
    headers: [
      { key: "Content-Type", value: "application/json; charset=utf-8" },
      { key: "Cache-Control", value: "no-store" },
    ],
  },
  {
    source: "/.well-known/api-catalog",
    headers: [
      {
        key: "Content-Type",
        value:
          'application/linkset+json; profile="https://www.rfc-editor.org/info/rfc9727"',
      },
      { key: "Cache-Control", value: cacheControl.hourly },
    ],
  },
  {
    source: "/.well-known/health",
    headers: [
      { key: "Content-Type", value: "application/json; charset=utf-8" },
      { key: "Cache-Control", value: "public, max-age=60, must-revalidate" },
    ],
  },
  {
    source: "/.well-known/mcp/server-card.json",
    headers: [
      { key: "Content-Type", value: "application/json; charset=utf-8" },
      { key: "Cache-Control", value: cacheControl.hourly },
    ],
  },
  {
    source: "/mcp",
    headers: [
      { key: "Content-Type", value: "application/json; charset=utf-8" },
      { key: "Cache-Control", value: "no-store" },
    ],
  },
  {
    source: "/.well-known/http-message-signatures-directory",
    headers: [
      {
        key: "Content-Type",
        value: "application/http-message-signatures-directory+json",
      },
      { key: "Cache-Control", value: cacheControl.hourly },
    ],
  },
  {
    source: "/.well-known/agent-skills/index.json",
    headers: [
      { key: "Content-Type", value: "application/json; charset=utf-8" },
      { key: "Cache-Control", value: cacheControl.hourly },
    ],
  },
  {
    source: "/.well-known/agent-skills/:path*/SKILL.md",
    headers: [
      { key: "Content-Type", value: "text/markdown; charset=utf-8" },
      { key: "Cache-Control", value: cacheControl.daily },
    ],
  },
] ;
