---
name: auth-md
description: Discover and use Auth.md agent registration for this portfolio via OAuth Protected Resource and Authorization Server metadata.
---

# Auth.md — erollmaxhuni.com

Use this skill when an agent needs to discover how to register or access this portfolio's public resources.

## Discovery documents

| Document | URL |
|----------|-----|
| Auth.md guide | `/auth.md` |
| Protected Resource Metadata | `/.well-known/oauth-protected-resource` |
| Authorization Server metadata | `/.well-known/oauth-authorization-server` |

## Registration model

This portfolio is **read-only** and does not require credentials for public content.

Supported identity type: **anonymous**.

## Register (optional guidance)

```http
POST /agent/auth HTTP/1.1
Host: erollmaxhuni.com
Content-Type: application/json

{"type":"anonymous"}
```

The response includes `credential_required: false`, granted scopes (`portfolio.read`, `discovery.read`), and public resource URLs.

## Scopes

- `portfolio.read` — HTML pages, case studies, profile content
- `discovery.read` — `llm.txt`, `llms.txt`, API catalog, sitemap, well-known endpoints

## Notes

- Claim (`/agent/auth/claim`) and revocation (`/agent/auth/revoke`) exist for protocol compatibility but return `501 not_applicable` for anonymous public read access.
- Human hiring inquiries: `info@erollmaxhuni.com`
