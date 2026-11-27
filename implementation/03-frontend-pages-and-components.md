# 03 — Frontend Pages and Components

## Shared shell
Create:
- `SiteHeader`: logo/name, section links, theme toggle, mobile menu.
- `SiteFooter`: compact navigation, social links, copyright.
- `SectionHeading`: eyebrow label, title and optional description.
- `Button`, `IconButton`, `Tag`, `Card`: reusable primitives.

## Home page sections

### 1. Hero
Content:
- Small availability/focus label, if accurate.
- Heading: “Hi, I’m Punith Kumar B S.”
- Short positioning statement, for example: “I build intelligent systems with machine learning, data and software.”
- Primary CTA: View projects.
- Secondary CTA: Get in touch.
- Links: GitHub, LinkedIn and resume.
- Optional restrained visual: orbital illustration, abstract model graph or project preview.

Keep the headline and CTA visible without requiring a long scroll on desktop. On mobile, place the visual below the copy.

### 2. Featured projects
Show 3–4 strongest projects. Each card should contain:
- Project name
- One-sentence problem/solution
- Role and status
- 2–4 technologies
- GitHub link and live demo link when available

Suggested projects to verify before publishing:
- Exo-Scan AI — TESS light-curve processing and exoplanet transit detection.
- SentinelMesh AI — multi-agent incident detection/investigation/repair workflow.
- ACM Automation Suite — membership or certificate workflow automation.

Only publish measured performance metrics when reproducible and supported by the project. Explain the evaluation setup alongside metrics.

### 3. About
A short paragraph covering current studies, technical interests and the kinds of problems being explored. Avoid a long biography.

### 4. Experience and involvement
Use a timeline or compact list. Include ACM involvement, hackathons, research and internships only when dates, titles and status are confirmed.

### 5. Skills
Group skills by capability rather than showing every tool as an equal proficiency claim:
- Languages
- ML/data
- Backend and APIs
- Frontend
- Databases and developer tools

Use labels such as “worked with” or “currently learning” where appropriate.

### 6. Contact
Show email and professional links plus a contact form. Provide a clear success and error state after submission.

## Project detail page (recommended)
Route: `/projects/:slug`

Sections:
1. Summary and project status
2. Problem statement
3. Solution and architecture diagram
4. Key features
5. Tech stack
6. Your contribution
7. Results and limitations
8. Repository/demo links
9. Next steps or learnings

## Data-first implementation
Keep project cards in a typed data file initially. Example:
```ts
export type Project = {
  slug: string;
  title: string;
  summary: string;
  description: string;
  stack: string[];
  status: "completed" | "in-progress" | "prototype";
  githubUrl?: string;
  demoUrl?: string;
  featured: boolean;
};

export const projects: Project[] = [
  {
    slug: "exo-scan-ai",
    title: "Exo-Scan AI",
    summary: "A pipeline for analysing TESS light curves and detecting transit candidates.",
    description: "Replace this with a verified project description.",
    stack: ["Python", "Lightkurve", "NumPy", "Machine Learning"],
    status: "prototype",
    githubUrl: "",
    demoUrl: "",
    featured: true
  }
];
```

Do not leave empty URLs as clickable links. Render a link only when a valid destination exists.
