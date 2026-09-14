# P0 Automotive Dashboard Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a static Astro foundation for car.emfls.com with a dark automotive dashboard experience and extensible content data.

**Architecture:** Use Astro pages and small reusable components, with content represented as typed local data in `src/data`. A shared layout owns SEO, navigation, and global structure; vanilla CSS owns the dashboard visual language and responsive behavior.

**Tech Stack:** Astro, TypeScript, static output, vanilla CSS, minimal client-side JavaScript.

**Spec:** User-approved P0 design in conversation.

## Global Constraints

- Work only inside `/Users/whitesmile/Documents/emfls-car`.
- Preserve `REPOSITORY_CONNECTION.md`.
- Do not add React, Vue, Svelte, Tailwind, database, API, authentication, or SSR.
- Demo dashboard values must be visibly labeled as Demo/Example.
- Do not complete the maintenance planner or fuel economy calculator.

### Task 1: Project foundation and content model

**Files:**
- Create: `package.json`, `astro.config.mjs`, `tsconfig.json`, `src/env.d.ts`
- Create: `src/data/site.ts`, `src/data/content.ts`
- Create: `public/favicon.svg`

- [ ] Define Astro static project configuration and scripts.
- [ ] Define typed categories, guides, and tool entries for future expansion.
- [ ] Add a simple branded favicon.

### Task 2: Shared layout and design system

**Files:**
- Create: `src/layouts/BaseLayout.astro`
- Create: `src/components/Header.astro`, `Footer.astro`, `SectionHeading.astro`, `GuideCard.astro`, `ToolCard.astro`, `StatusMetric.astro`
- Create: `src/styles/global.css`

- [ ] Build semantic document shell with title, description, canonical, Open Graph, and JSON-LD.
- [ ] Add responsive navigation and footer links.
- [ ] Implement graphite dashboard tokens, typography, cards, statuses, and mobile-first layout rules.

### Task 3: P0 pages and crawlable routes

**Files:**
- Create: `src/pages/index.astro`, `guides/index.astro`, `tools/index.astro`, `about/index.astro`, `privacy/index.astro`, `contact/index.astro`, `404.astro`
- Create: `public/robots.txt`, `public/_headers`

- [ ] Implement dashboard homepage with clearly labeled Example UI.
- [ ] Implement guide/tool listing pages and informational pages.
- [ ] Add crawlable internal links and accessible semantic markup.

### Task 4: Project documentation and verification

**Files:**
- Create/update: `AGENTS.md`, `SITE_STRATEGY.md`, `DESIGN_SYSTEM.md`, `TASKS.md`, `PROJECT_HISTORY.md`, `README.md`

- [ ] Document strategy, design system, task roadmap, and implementation history.
- [ ] Install dependencies and run Astro/TypeScript/build checks.
- [ ] Fix any validation errors and record final verification.
