---
name: portfolio-discovery
description: Discover and read Eroll Maxhuni's public portfolio, case studies, and machine-readable agent documents.
---

# Portfolio discovery

Use this skill to find authoritative information about Eroll Maxhuni — senior full-stack developer — without scraping unstructured HTML first.

## Start here

| Resource | URL | Format |
|----------|-----|--------|
| LLM profile | `/llm.txt` | Plain text |
| LLM index | `/llms.txt` | Plain text |
| Auth.md | `/auth.md` | Markdown |
| API catalog (RFC 9727) | `/.well-known/api-catalog` | linkset+json |
| Agent skills index | `/.well-known/agent-skills/index.json` | JSON |
| MCP server card | `/.well-known/mcp/server-card.json` | JSON |
| Health | `/.well-known/health` | JSON |
| Sitemap | `/sitemap.xml` | XML |

## Homepage Link header

`GET /` returns RFC 8288 `Link` headers pointing to api-catalog, Web Bot Auth directory, MCP card, auth.md, and llm files.

## MCP (read-only)

- Endpoint: `POST /mcp` (JSON-RPC)
- Tools expose `llm.txt`, `llms.txt`, `auth.md`, and API catalog content

## Markdown alternative

For `/` and `/privacy`, prefer `Accept: text/markdown` for lower token usage. See the `markdown-negotiation` skill.

## Contact

- Email: info@erollmaxhuni.com
- LinkedIn: https://www.linkedin.com/in/eroll-maxhuni/
- GitHub: https://github.com/341
