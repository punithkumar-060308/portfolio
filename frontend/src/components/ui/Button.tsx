import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  href?: string;
  external?: boolean;
  icon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  size = "md",
  href,
  external = false,
  icon,
  className = "",
  disabled,
  ...props
}) => {
  const baseStyles =
    "inline-flex items-center justify-center font-semibold uppercase tracking-wider transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F20D45] focus-visible:ring-offset-2 focus-visible:ring-offset-[#050507] disabled:opacity-50 disabled:cursor-not-allowed select-none rounded-full min-h-[44px]";

  const sizeStyles = {
    sm: "px-4 py-2 text-xs gap-1.5 min-h-[38px]",
    md: "px-6 py-2.5 text-xs sm:text-sm gap-2 min-h-[44px]",
    lg: "px-8 py-3.5 text-sm gap-2.5 min-h-[48px]"
  };

  const variantStyles = {
    primary:
      "bg-[#F20D45] hover:bg-[#FF315B] text-white shadow-[0_0_24px_rgba(242,13,69,0.38)] hover:shadow-[0_0_32px_rgba(255,49,91,0.55)] active:scale-[0.98]",
    secondary:
      "bg-[rgba(20,12,16,0.85)] hover:bg-[rgba(35,12,20,0.9)] text-[#F5F1F2] border border-[rgba(255,75,112,0.3)] hover:border-[#F20D45] hover:shadow-[0_0_18px_rgba(242,13,69,0.22)]",
    outline:
      "bg-transparent border border-[rgba(255,75,112,0.35)] hover:border-[#F20D45] text-[#F5F1F2] hover:bg-[rgba(242,13,69,0.1)] hover:shadow-[0_0_18px_rgba(242,13,69,0.22)]",
    ghost:
      "bg-transparent text-[#A79BA0] hover:text-[#F5F1F2] hover:bg-[rgba(255,255,255,0.05)]"
  };

  const combinedClasses = `${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`;

  if (href) {
    return (
      <a
        href={href}
        className={combinedClasses}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
      >
        {icon && <span>{icon}</span>}
        <span>{children}</span>
      </a>
    );
  }

  return (
    <button className={combinedClasses} disabled={disabled} {...props}>
      {icon && <span>{icon}</span>}
      <span>{children}</span>
    </button>
  );
};
