# auth.md — erollmaxhuni.com

Machine-readable agent registration guide for [Eroll Maxhuni](https://erollmaxhuni.com/) — a public portfolio and discovery surface for senior full-stack engineering work.

## Service

**Name:** Eroll Maxhuni — Portfolio  
**Description:** Public read-only developer profile, case studies, and agent discovery documents.  
**Audience:** AI agents indexing, summarizing, or routing hiring-related queries.

## Authentication model

This site does **not** require OAuth credentials for public content. Agents may read listed resources with unauthenticated `GET` requests.

Structured discovery (authoritative):

- Protected Resource Metadata: `/.well-known/oauth-protected-resource`
- Authorization Server metadata: `/.well-known/oauth-authorization-server`

## Supported flows

### Anonymous public read

Agents do not need to register to read portfolio pages or discovery files.  
`POST /agent/auth` returns a machine-readable summary of public scopes and URLs.

### User contact (human channel)

For hiring or project inquiries, email [info@erollmaxhuni.com](mailto:info@erollmaxhuni.com). This is not an OAuth-protected API.

## Scopes

| Scope | Description |
|-------|-------------|
| `portfolio.read` | Read public HTML pages, case studies, and profile content |
| `discovery.read` | Read machine-readable files (`llm.txt`, `llms.txt`, API catalog, sitemap) |

## Registration endpoint

```http
POST /agent/auth HTTP/1.1
Host: erollmaxhuni.com
Content-Type: application/json

{"type":"anonymous"}
```

**Response:** JSON describing public access (`credential_required: false`) and resource URLs.

Claim and revocation endpoints exist for protocol compatibility but are not used for public read-only access.

## Related discovery

- API catalog (RFC 9727): `/.well-known/api-catalog`
- Web Bot Auth JWKS: `/.well-known/http-message-signatures-directory`
- Privacy policy: `/privacy`

## Contact

- Email: info@erollmaxhuni.com  
- GitHub: https://github.com/341  
- LinkedIn: https://www.linkedin.com/in/eroll-maxhuni/
