# 02 — Design System and Responsive UI

## Design tokens
Start with CSS variables so the theme can be changed consistently.

```css
:root {
  --color-bg: #faf9f7;
  --color-surface: #ffffff;
  --color-text: #17171d;
  --color-muted: #686875;
  --color-border: #e9e7ef;
  --color-accent: #6554d9;
  --color-accent-soft: #efedff;
  --radius-card: 1.25rem;
  --shadow-card: 0 12px 32px rgba(25, 20, 55, 0.06);
}

[data-theme="dark"] {
  --color-bg: #111116;
  --color-surface: #1a1a22;
  --color-text: #f5f4fa;
  --color-muted: #aaa8b8;
  --color-border: #30303b;
  --color-accent: #a99bff;
  --color-accent-soft: #29243f;
  --shadow-card: 0 12px 32px rgba(0, 0, 0, 0.2);
}
```

## Typography
Use one modern sans-serif family with a clear scale:
- Display heading: clamp(2.6rem, 6vw, 5rem)
- Section heading: clamp(1.8rem, 3vw, 2.6rem)
- Card heading: 1.1–1.3rem
- Body: 1rem with 1.6 line-height
- Metadata: 0.8–0.9rem

Avoid using too many font weights. Ensure headings wrap cleanly on narrow screens.

## Layout rules
- Main content max width: approximately 1160–1240px.
- Desktop section spacing: 88–120px.
- Mobile section spacing: 56–72px.
- Use a consistent 12-column desktop grid where useful.
- Project cards: 3 columns on wide screens, 2 on tablet, 1 on mobile.
- Avoid horizontal scrolling at all viewport sizes.

## Component styling
- Buttons: strong contrast, visible focus ring, minimum 44px target height.
- Cards: subtle border, soft shadow, hover lift limited to a few pixels.
- Tags: small neutral pills, not large colorful badges.
- Navigation: sticky only if it does not consume too much mobile screen space.
- Images: consistent aspect ratios, compressed formats, descriptive alt text.

## Responsive breakpoints
Use the framework's standard breakpoints or define a consistent set:
- Small: under 640px
- Medium: 640–1023px
- Large: 1024px and above

## Accessibility requirements
- Text contrast should meet WCAG AA where possible.
- Never use color alone to communicate state.
- All interactive controls need visible focus styles.
- Provide semantic landmarks and a logical heading hierarchy.
- Respect `prefers-reduced-motion`.
- Add alt text to meaningful images; decorative images should have empty alt text.
