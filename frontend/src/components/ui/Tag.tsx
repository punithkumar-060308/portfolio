import React from "react";

interface TagProps {
  children: React.ReactNode;
  variant?: "neutral" | "accent" | "success" | "warning";
  size?: "sm" | "md";
  className?: string;
}

export const Tag: React.FC<TagProps> = ({
  children,
  variant = "neutral",
  size = "sm",
  className = ""
}) => {
  const sizeStyles = {
    sm: "px-2.5 py-1 text-[10px] tracking-wider uppercase font-semibold",
    md: "px-3.5 py-1.5 text-xs tracking-wider uppercase font-semibold"
  };

  const variantStyles = {
    neutral:
      "bg-[rgba(25,12,18,0.7)] text-[#A79BA0] border border-[rgba(255,75,112,0.18)]",
    accent:
      "bg-[rgba(242,13,69,0.14)] text-[#FF315B] border border-[rgba(242,13,69,0.38)] shadow-[0_0_10px_rgba(242,13,69,0.15)]",
    success:
      "bg-emerald-950/40 text-emerald-400 border border-emerald-500/30",
    warning:
      "bg-amber-950/40 text-amber-400 border border-amber-500/30"
  };

  return (
    <span
      className={`inline-flex items-center rounded-md transition-colors ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
    >
      {children}
    </span>
  );
};
