# 04 — Animations, Transitions and Effects

Use Framer Motion for purposeful motion. The portfolio should remain fast and calm.

## Motion principles
- Animate opacity and transform rather than layout-heavy properties.
- Keep most entrance animations between 250–600ms.
- Use small movement distances (8–20px).
- Avoid constant background movement and excessive parallax.
- Do not animate every paragraph independently.
- Respect reduced-motion preferences.

## Recommended effects
1. Hero entrance: headline and CTA fade/slide in with a small stagger.
2. Section reveal: sections fade in when entering the viewport.
3. Project cards: slight lift and border/accent transition on hover/focus.
4. Navigation: smooth anchor scrolling with active section indication.
5. Theme toggle: short color transition.
6. Mobile menu: spring or ease animation for open/close.
7. Project detail: shared layout transition only if it improves navigation clarity.
8. Contact form: clear loading, success and error feedback.

## Example reveal component
```tsx
import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

export function Reveal({ children }: { children: ReactNode }) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
```

## Example card hover
```tsx
import { motion } from "framer-motion";

<motion.article
  whileHover={{ y: -4 }}
  transition={{ duration: 0.2, ease: "easeOut" }}
  className="project-card"
>
  {/* card content */}
</motion.article>
```

## Reduced motion
Use `useReducedMotion()` or CSS `@media (prefers-reduced-motion: reduce)` to disable nonessential movement. Never make essential information available only through animation.

## Performance checks
- Avoid large blur filters over full-screen areas.
- Lazy-load below-the-fold images.
- Keep animation count low on mobile.
- Avoid scroll listeners that run expensive React renders.
- Test on a mid-range phone and with reduced motion enabled.
