---
name: markdown-negotiation
description: Request markdown representations of portfolio HTML pages using Accept text/markdown content negotiation.
---

# Markdown content negotiation

Use this skill when you need token-efficient markdown instead of full HTML from this site.

## Request

Send `Accept: text/markdown` (optionally with `text/html` at lower quality):

```http
GET / HTTP/1.1
Host: erollmaxhuni.com
Accept: text/markdown
```

```http
GET /privacy HTTP/1.1
Host: erollmaxhuni.com
Accept: text/markdown
```

## Response

- `Content-Type: text/markdown; charset=utf-8`
- `Vary: Accept`
- `x-markdown-tokens` — estimated token count of the markdown body

HTML remains the default when `Accept` does not prefer markdown.

## Supported paths

- `/` — portfolio homepage (YAML frontmatter, case studies, tech stack, JSON-LD)
- `/privacy` — privacy policy

## Example

```bash
curl -H "Accept: text/markdown" https://erollmaxhuni.com/
```
