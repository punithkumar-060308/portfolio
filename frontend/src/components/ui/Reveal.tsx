import React from "react";
import { motion, useReducedMotion } from "framer-motion";

interface RevealProps {
  children: React.ReactNode;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  className?: string;
}

export const Reveal: React.FC<RevealProps> = ({
  children,
  delay = 0,
  direction = "up",
  className = ""
}) => {
  const reduceMotion = useReducedMotion();

  const getInitialPosition = () => {
    if (reduceMotion || direction === "none") return { x: 0, y: 0 };
    switch (direction) {
      case "up":
        return { x: 0, y: 16 };
      case "down":
        return { x: 0, y: -16 };
      case "left":
        return { x: 16, y: 0 };
      case "right":
        return { x: -16, y: 0 };
      default:
        return { x: 0, y: 16 };
    }
  };

  const initial = reduceMotion
    ? { opacity: 0 }
    : { opacity: 0, ...getInitialPosition() };

  return (
    <motion.div
      initial={initial}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration: 0.45,
        delay,
        ease: [0.16, 1, 0.3, 1]
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
