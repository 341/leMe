/** Shared AMP custom styles — must stay under 75 KB. */
export const ampCustomStyles = `
  :root {
    --void: #050508;
    --surface: #0c0c12;
    --border: #2a2a3a;
    --ink: #f4f4f8;
    --muted: #9494a8;
    --violet: #8b5cf6;
    --cyan: #00e5ff;
  }

  * { box-sizing: border-box; }

  body {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
    background: var(--void);
    color: var(--ink);
    line-height: 1.6;
  }

  a { color: var(--cyan); text-decoration: none; }
  a:hover { text-decoration: underline; }

  .wrap {
    max-width: 720px;
    margin: 0 auto;
    padding: 0 1.25rem 3rem;
  }

  .site-header {
    padding: 1rem 0 0.5rem;
    border-bottom: 1px solid var(--border);
    margin-bottom: 2rem;
  }

  .brand {
    font-size: 1.125rem;
    font-weight: 700;
    color: var(--ink);
    letter-spacing: -0.02em;
  }

  .brand span { color: var(--violet); }

  .eyebrow {
    display: inline-block;
    margin-bottom: 1rem;
    padding: 0.35rem 0.85rem;
    border: 1px solid rgba(139, 92, 246, 0.35);
    border-radius: 999px;
    font-size: 0.6875rem;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--violet);
  }

  h1 {
    margin: 0 0 1rem;
    font-size: clamp(2rem, 8vw, 2.75rem);
    line-height: 1.08;
    letter-spacing: -0.03em;
  }

  .gradient {
    background: linear-gradient(90deg, var(--cyan), var(--violet));
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
  }

  .lead {
    margin: 0 0 1.5rem;
    color: var(--muted);
    font-size: 1.0625rem;
  }

  .stats {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
    margin: 2rem 0;
    padding-top: 1.5rem;
    border-top: 1px solid var(--border);
  }

  .stat-value {
    font-size: 1.75rem;
    font-weight: 800;
    line-height: 1;
  }

  .stat-label {
    margin-top: 0.35rem;
    font-size: 0.625rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--muted);
  }

  section { margin-top: 2.5rem; }

  .section-label {
    margin: 0 0 0.5rem;
    font-size: 0.6875rem;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: var(--violet);
  }

  h2 {
    margin: 0 0 0.75rem;
    font-size: 1.5rem;
    line-height: 1.2;
  }

  .card {
    margin-top: 1rem;
    padding: 1.25rem;
    border: 1px solid var(--border);
    border-radius: 1rem;
    background: rgba(12, 12, 18, 0.85);
  }

  .card-domain {
    margin: 0 0 0.35rem;
    font-size: 0.625rem;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: var(--cyan);
  }

  .card h3 {
    margin: 0 0 0.35rem;
    font-size: 1.125rem;
  }

  .card-sub {
    margin: 0 0 1rem;
    color: var(--muted);
    font-size: 0.9375rem;
  }

  .metrics {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 0.75rem;
    margin-bottom: 1rem;
  }

  .metric-value {
    font-size: 1.25rem;
    font-weight: 700;
  }

  .metric-label {
    font-size: 0.5625rem;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--muted);
  }

  .tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.4rem;
    margin-top: 0.75rem;
  }

  .tag {
    padding: 0.25rem 0.65rem;
    border: 1px solid var(--border);
    border-radius: 999px;
    font-size: 0.6875rem;
    color: var(--muted);
  }

  .stack-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-top: 0.75rem;
  }

  .stack-pill {
    padding: 0.45rem 0.75rem;
    border: 1px solid var(--border);
    border-radius: 0.65rem;
    font-size: 0.8125rem;
    background: rgba(12, 12, 18, 0.7);
  }

  .cta-row {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
    margin-top: 1.25rem;
  }

  .btn {
    display: inline-block;
    padding: 0.75rem 1.25rem;
    border-radius: 999px;
    font-weight: 600;
    font-size: 0.9375rem;
  }

  .btn-primary {
    background: linear-gradient(90deg, var(--violet), var(--cyan));
    color: var(--void);
  }

  .btn-secondary {
    border: 1px solid var(--border);
    color: var(--ink);
  }

  .site-footer {
    margin-top: 3rem;
    padding-top: 1.5rem;
    border-top: 1px solid var(--border);
    color: var(--muted);
    font-size: 0.8125rem;
  }

  .site-footer p { margin: 0 0 0.75rem; }

  .legal h2 {
    margin-top: 1.75rem;
    font-size: 1.125rem;
  }

  .legal p,
  .legal li {
    color: var(--muted);
    font-size: 0.9375rem;
  }

  .legal ul {
    margin: 0.5rem 0 0;
    padding-left: 1.25rem;
  }

  .full-site {
    margin-top: 1rem;
    font-size: 0.8125rem;
  }
`.trim();
