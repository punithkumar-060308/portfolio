# 11 — Build Roadmap

A practical sequence for implementing the portfolio without getting blocked by optional features.

## Phase 1 — Foundation
- Create repository and frontend/backend folders.
- Configure React, Vite, Tailwind and TypeScript.
- Add design tokens, fonts and responsive container.
- Build header, footer and button/card primitives.

**Done when:** the empty site shell works on desktop and mobile.

## Phase 2 — Static portfolio
- Build hero and About sections.
- Build project cards and project detail template.
- Add experience and skills.
- Add social links and resume download.

**Done when:** all content is accurate and navigation works without a backend.

## Phase 3 — Visual polish
- Add Framer Motion reveal and hover effects.
- Add theme toggle.
- Add responsive mobile navigation.
- Add reduced-motion support and focus states.

**Done when:** motion feels subtle and the site remains usable without it.

## Phase 4 — Backend
- Create FastAPI app and health route.
- Connect MongoDB.
- Add contact schema and endpoint.
- Add rate limiting and safe error handling.

**Done when:** valid contact submissions are stored and invalid ones rejected.

## Phase 5 — Integration
- Connect frontend form using Axios.
- Add loading/success/error states.
- Test backend unavailable and email provider unavailable cases.

**Done when:** the full contact journey works end-to-end.

## Phase 6 — Release
- Run responsive, accessibility and security checks.
- Deploy backend and database.
- Deploy frontend and configure environment variables.
- Add domain, metadata and social preview.
- Test the live contact form and all external links.

**Done when:** production works on mobile and desktop with no placeholder content.

## Suggested first milestone
Complete Phases 1 and 2 before adding the backend. This lets the visual design and portfolio content settle before introducing API complexity.
