# 00 — Project Overview

## Product goal
Build a responsive personal portfolio for Punith Kumar B S that presents him as an AI/ML developer, student, project builder and open-source learner. The site should feel like a clean personal workspace: minimal, credible, easy to navigate and project-focused.

## Primary outcomes
- Explain who Punith is within the first screen.
- Make selected projects easy to understand and explore.
- Show technical skills with context rather than an oversized logo wall.
- Present experience, activities and achievements accurately.
- Let visitors contact him through a working backend-powered form.
- Load quickly, work on mobile and support keyboard navigation.

## Visual direction
- Light warm-white background with deep charcoal text.
- Restrained violet/indigo accent.
- Large but controlled typography and generous whitespace.
- Soft borders, modest shadows and rounded cards.
- A dark mode using the same layout and contrast principles.
- Motion should support hierarchy and feedback, not distract.

## Site map
- `/` — Home
- `/#about` — About
- `/#projects` — Projects
- `/#experience` — Experience
- `/#skills` — Skills
- `/#contact` — Contact
- `/projects/:slug` — Optional project detail page
- `/admin` — Optional protected content manager

## Core user journeys
1. Recruiter opens home → understands focus → views projects → opens GitHub/demo → contacts.
2. Developer opens project → sees problem, role, architecture, stack and outcomes.
3. Visitor submits contact form → backend validates → stores message → optionally sends notification email.

## Scope boundaries
Build the public portfolio first. Admin CMS, blog, analytics dashboard and authentication are optional phase-two features. Do not add a login system unless there is a real need to edit content through the browser.

## Architecture
Browser (React) → FastAPI REST API → MongoDB.
The frontend may initially read static project/profile content from local data files. Move content to the API only if dynamic editing is required. Contact submissions should always go through the backend.
