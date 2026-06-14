# Design System — Premium Portfolio

## Color Palette

### Foundation (Dark Mode First)

| Token | Hex | Usage |
|-------|-----|-------|
| `void` | `#050508` | Page background, deepest layer |
| `void-100` | `#0f0f16` | Section alternates |
| `surface` | `#111118` | Cards, panels |
| `surface-elevated` | `#1a1a24` | Hover states, modals |
| `surface-border` | `#2a2a3a` | Borders, dividers |

### Aurora Accent Spectrum

| Token | Hex | Usage |
|-------|-----|-------|
| `aurora-cyan` | `#00e5ff` | React, Node.js, interactive highlights |
| `aurora-violet` | `#8b5cf6` | Primary CTA, Angular, Nest.js |
| `aurora-magenta` | `#f472b6` | WebRTC, real-time features |
| `aurora-amber` | `#fbbf24` | AWS, infrastructure, warnings |

### Typography Colors

| Token | Hex | Usage |
|-------|-----|-------|
| `ink-primary` | `#f4f4f8` | Headlines, body |
| `ink-secondary` | `#a1a1b5` | Subheadings, descriptions |
| `ink-muted` | `#6b6b80` | Captions, metadata |

### Gradients

```css
/* Hero aurora wash */
background: radial-gradient(ellipse 80% 50% at 50% -20%, rgba(139,92,246,0.25), transparent),
            radial-gradient(ellipse 60% 40% at 80% 50%, rgba(0,229,255,0.12), transparent);

/* CTA button */
background: linear-gradient(135deg, #8b5cf6 0%, #00e5ff 100%);

/* Tech stack orbit ring */
border: 1px solid rgba(139, 92, 246, 0.3);
box-shadow: 0 0 40px rgba(139, 92, 246, 0.15);
```

---

## Typography

### Font Stack

| Role | Family | Weight | Tracking |
|------|--------|--------|----------|
| Display | **Syne** | 700–800 | `-0.03em` |
| Body | **DM Sans** | 400–500 | `0` |
| Mono | **JetBrains Mono** | 400–500 | `0` |

Loaded via `next/font/google` for zero layout shift.

### Type Scale

| Element | Size (desktop) | Size (mobile) | Line Height |
|---------|----------------|---------------|-------------|
| Hero H1 | `clamp(3rem, 8vw, 6rem)` | same | `1.05` |
| Section H2 | `clamp(2rem, 4vw, 3rem)` | same | `1.1` |
| Card H3 | `1.5rem` | `1.25rem` | `1.3` |
| Body Large | `1.125rem` | `1rem` | `1.7` |
| Body | `1rem` | `0.9375rem` | `1.65` |
| Caption / Label | `0.75rem` | same | `1.4` |
| Mono Code | `0.875rem` | same | `1.6` |

### Hierarchy Rules

1. **Display font** — hero headlines, section titles, stat numbers
2. **Body font** — paragraphs, card copy, navigation
3. **Mono font** — tech labels, architecture nodes, code snippets, version tags

---

## Spacing & Layout

- **Max content width:** `1280px` (`max-w-7xl`)
- **Section padding:** `py-24 md:py-32`
- **Grid:** 12-column with `gap-6 md:gap-8`
- **Border radius:** `rounded-2xl` cards, `rounded-full` pills
- **Motion:** `cubic-bezier(0.22, 1, 0.36, 1)` for premium easing

---

## Component Tokens

```css
--card-backdrop: rgba(17, 17, 24, 0.7);
--card-border: rgba(42, 42, 58, 0.8);
--glow-violet: 0 0 40px rgba(139, 92, 246, 0.25);
--glow-cyan: 0 0 40px rgba(0, 229, 255, 0.2);
```
