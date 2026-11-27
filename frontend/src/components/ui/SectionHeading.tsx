import React from "react";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  eyebrow,
  title,
  description,
  align = "center",
  className = ""
}) => {
  return (
    <div
      className={`mb-12 md:mb-16 ${align === "center" ? "text-center mx-auto" : ""} max-w-3xl ${className}`}
    >
      {eyebrow && (
        <span className="inline-block text-[11px] sm:text-xs font-bold tracking-[0.18em] uppercase text-[#F20D45] mb-3">
          {eyebrow}
        </span>
      )}
      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold uppercase tracking-tight text-[#F5F1F2]">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-sm sm:text-base text-[#A79BA0] leading-relaxed max-w-2xl mx-auto">
          {description}
        </p>
      )}
    </div>
  );
};
