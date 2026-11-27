import React from "react";
import { motion, useReducedMotion } from "framer-motion";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  interactive?: boolean;
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = "",
  interactive = false,
  onClick
}) => {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      whileHover={interactive && !reduceMotion ? { y: -4 } : undefined}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className={`glass-panel p-6 md:p-8 flex flex-col ${interactive ? "cursor-pointer" : ""} ${className}`}
      onClick={onClick}
    >
      {children}
    </motion.div>
  );
};
