# Strength 9 Design — Agency Website

## Overview

A bold, striking static agency website for **Strength 9 Design**. Mobile-first, ultra-fast, zero-dependency. Hosted on 20i reseller platform.

**Tech stack:** Pure HTML + CSS + vanilla JavaScript. No frameworks, no CMS, no build tools.

---

## Quality Standards — Non-Negotiable

### Lighthouse Scores: 100 / 100 / 100 / 100

Every page must score **100** across all four Lighthouse categories:

- **Performance** — no render-blocking resources, optimised images (WebP, lazy-loaded), minimal CSS/JS, font-display: swap
- **Accessibility** — semantic HTML, ARIA where needed, sufficient colour contrast (WCAG AA minimum), keyboard navigable, skip-to-content link, alt text on every image
- **Best Practices** — HTTPS, no console errors, no deprecated APIs, proper image aspect ratios
- **SEO** — meta title + description on every page, Open Graph tags, canonical URLs, structured data (JSON-LD), sitemap.xml, robots.txt, proper heading hierarchy (single h1 per page)

### Code Quality

- **W3C valid HTML5** — zero validation errors, zero warnings
- **W3C valid CSS3** — no broken properties, no vendor prefix without standard fallback
- **No broken tags, no broken scripts** — every file is production-ready
- **Semantic markup** — `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>` used correctly
- **Mobile-first responsive** — designed for 320px upward, breakpoints at 375px, 768px, 1024px, 1280px, 1440px

### Accessibility

- Skip-to-content link as first focusable element
- All interactive elements keyboard accessible
- Focus styles visible and clear
- `prefers-reduced-motion` respected for all animations
- `prefers-color-scheme` supported (dark mode)
- Minimum 4.5:1 contrast ratio for body text, 3:1 for large text

---

## File Structure

```
Strength9-Website/
├── index.html              # Home page
├── services.html           # Services page
├── products.html           # Products page
├── portfolio.html          # Portfolio page
├── about.html              # About page
├── contact.html            # Contact page
├── sitemap.xml             # XML sitemap for search engines
├── robots.txt              # Crawler directives
├── css/
│   └── style.css           # Single stylesheet — all styles
├── js/
│   └── main.js             # Single script — nav, animations, form
├── assets/
│   ├── logos/
│   │   ├── Strength9.png   # Full wordmark
│   │   └── Strength9-Small.png  # Icon mark
│   ├── images/             # Page images, portfolio screenshots
│   └── icons/              # Favicons, touch icons
├── .claude/                # Claude Code config
├── CLAUDE.md               # Agent instructions
├── nexus.json              # Riker project link
└── README.md               # This file
```

---

## Design System

### Colour Palette

Derived from the Strength 9 logo — grey wordmark with blue gradient "9" icon.

| Token                    | Value       | Usage                              |
|--------------------------|-------------|-------------------------------------|
| `--color-primary`        | `#2563EB`   | Primary blue — buttons, links, accents |
| `--color-primary-light`  | `#3B82F6`   | Hover states, gradient start        |
| `--color-primary-dark`   | `#1D4ED8`   | Active states, gradient end         |
| `--color-text`           | `#1A1A2E`   | Body text — near-black              |
| `--color-text-light`     | `#6B7280`   | Secondary text, captions            |
| `--color-heading`        | `#111827`   | Headings — deep charcoal            |
| `--color-bg`             | `#FFFFFF`   | Page background                     |
| `--color-bg-alt`         | `#F9FAFB`   | Alternating section backgrounds     |
| `--color-bg-dark`        | `#111827`   | Dark sections (hero, CTA, footer)   |
| `--color-bg-dark-text`   | `#F9FAFB`   | Text on dark backgrounds            |
| `--color-border`         | `#E5E7EB`   | Subtle borders, dividers            |
| `--color-accent`         | `#06B6D4`   | Cyan accent for highlights          |

### Typography

| Token              | Value                              |
|--------------------|------------------------------------|
| `--font-heading`   | `'Inter', sans-serif`              |
| `--font-body`      | `'Inter', sans-serif`              |
| `--font-mono`      | `'JetBrains Mono', monospace`      |

Inter is loaded from Google Fonts with `font-display: swap`. Weights: 400, 500, 600, 700, 800, 900.

### Spacing & Layout

| Token              | Value    |
|--------------------|----------|
| `--max-width`      | `1200px` |
| `--section-padding`| `5rem 0` |
| `--gap`            | `2rem`   |
| `--radius`         | `0.5rem` |
| `--radius-lg`      | `1rem`   |

---

## Pages

### 1. Home (`index.html`)
- Full-viewport hero with bold headline, subtext, CTA button
- Services overview (3–4 cards linking to services page)
- Featured portfolio projects (3 items linking to portfolio page)
- About teaser with CTA to about page
- Contact CTA section

### 2. Services (`services.html`)
- 6 service sections with icons, descriptions, and outcomes
- Services: Web Design & Development, SaaS Product Development, WordPress Solutions, Branding & Identity, SEO & Digital Strategy, Hosting & Support

### 3. Products (`products.html`)
- Featured products: CRM system, LotIQ platform, WordPress plugins
- Each with description, features, and CTA

### 4. Portfolio (`portfolio.html`)
- Project grid with images, titles, descriptions
- Category filtering (optional: SvelteKit / WordPress / SaaS)
- Links to live sites where available

### 5. About (`about.html`)
- Company story, values, approach
- Key credentials and experience
- CTA to contact

### 6. Contact (`contact.html`)
- Formspree-powered contact form (name, email, message)
- Success/error states
- Direct email and phone as alternatives

---

## Shared Components

### Navigation
- Sticky header with logo and nav links
- Hamburger menu on mobile (< 768px)
- Active page indicator
- Smooth scroll for anchor links on home page

### Footer
- Logo, nav links, social icons
- Copyright notice
- Privacy policy link (placeholder)

---

## Agent Build Strategy

This project uses **multiple parallel Claude Code agents**, each responsible for a specific deliverable. Every agent must:

1. **Read this README first** — understand the full design system and standards
2. **Write production-ready code** — no placeholders, no TODOs, no "fix later"
3. **Validate before completing** — HTML must parse cleanly, CSS must be valid, JS must not error
4. **Mobile-first** — write mobile styles first, use `min-width` media queries to scale up
5. **Semantic HTML** — correct element usage, proper heading hierarchy, ARIA only where HTML semantics fall short
6. **Performance obsessed** — every image lazy-loaded (except above-fold), no render-blocking resources, minimal DOM depth

### Agent Workflow
1. Agent reads README and design system
2. Agent builds assigned page/component
3. Agent self-reviews against Lighthouse criteria
4. Work is committed to `development` branch
5. Checklist items marked complete in Riker

---

## SEO Checklist (Every Page)

- [ ] Unique `<title>` tag (50–60 characters)
- [ ] Unique `<meta name="description">` (150–160 characters)
- [ ] Single `<h1>` per page
- [ ] Logical heading hierarchy (h1 → h2 → h3, no skips)
- [ ] `<meta name="viewport" content="width=device-width, initial-scale=1">`
- [ ] `<link rel="canonical">` pointing to self
- [ ] Open Graph tags: `og:title`, `og:description`, `og:image`, `og:url`, `og:type`
- [ ] Twitter card tags: `twitter:card`, `twitter:title`, `twitter:description`
- [ ] Structured data (JSON-LD): Organization on home, LocalBusiness or WebPage on others
- [ ] All images have descriptive `alt` text
- [ ] All links have descriptive text (no "click here")
- [ ] `lang="en-GB"` on `<html>` element

---

## Deployment (20i)

- Upload static files via FTP or 20i file manager
- SSL provided by 20i — verify active
- Enable Gzip compression in control panel
- Set browser caching headers
- Submit sitemap.xml to Google Search Console
