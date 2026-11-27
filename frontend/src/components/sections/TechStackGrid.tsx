import React from "react";
import { SectionHeading } from "../ui/SectionHeading";
import { Reveal } from "../ui/Reveal";

interface TechItem {
  name: string;
  category: string;
  iconSvg: React.ReactNode;
}

export const TechStackGrid: React.FC = () => {
  const techs: TechItem[] = [
    {
      name: "Python",
      category: "Core Language",
      iconSvg: (
        <svg viewBox="0 0 24 24" className="w-7 h-7" fill="none">
          <path
            d="M11.9 2C6.9 2 7.1 4.2 7.1 4.2l.02 2.2h4.9v.7H5.2S2 6.8 2 11.8s2.8 5 2.8 5h1.7v-2.4s-.1-2.8 2.8-2.8h4.8s2.7.1 2.7-2.6V4.7S17 2 11.9 2zm-1.4 1.5a.9.9 0 1 1 0 1.8.9.9 0 0 1 0-1.8z"
            fill="#3776AB"
          />
          <path
            d="M12.1 22c5 0 4.8-2.2 4.8-2.2l-.02-2.2H12v-.7h6.8s3.2.3 3.2-4.7-2.8-5-2.8-5h-1.7v2.4s.1 2.8-2.8 2.8H9.9s-2.7-.1-2.7 2.6v4.1s-.2 2.7 4.9 2.7zm1.4-1.5a.9.9 0 1 1 0-1.8.9.9 0 0 1 0 1.8z"
            fill="#FFD43B"
          />
        </svg>
      )
    },
    {
      name: "C",
      category: "Core Language",
      iconSvg: (
        <svg viewBox="0 0 24 24" className="w-7 h-7" fill="none">
          <path
            d="M12 2L3.5 7v10L12 22l8.5-5V7L12 2z"
            fill="#283593"
          />
          <path
            d="M12 4l6.8 4v8L12 20l-6.8-4V8L12 4z"
            fill="#00599C"
          />
          <path
            d="M15.5 15.2c-.8.6-1.8 1-2.9 1-2.6 0-4.6-2-4.6-4.6s2-4.6 4.6-4.6c1.1 0 2.1.4 2.9 1l1.4-1.6C15.6 5.4 14.1 4.8 12.6 4.8 8.8 4.8 5.8 7.8 5.8 11.6s3 6.8 6.8 6.8c1.5 0 3-.6 4.3-1.6l-1.4-1.6z"
            fill="#FFFFFF"
          />
        </svg>
      )
    },
    {
      name: "Java",
      category: "Core Language",
      iconSvg: (
        <svg viewBox="0 0 24 24" className="w-7 h-7" fill="none">
          <path
            d="M8.5 17.5c0 0-1.2.3.8.5 2.5.2 4.2.2 7.3-.3 0 0-1.2.6-3.4.9-3.8.5-8.2.2-4.7-1.1z"
            fill="#5382A1"
          />
          <path
            d="M7.7 15.6c0 0-1.4.5 1.1.7 3.1.2 5.3.2 9.2-.4 0 0-1.6.7-4.4 1.1-4.8.6-10.4.3-5.9-1.4z"
            fill="#5382A1"
          />
          <path
            d="M13.2 11.5c1 .9 1.6 1.7 1.6 1.7s-.8.5-2.6.2c-2.3-.4-4.2-1.8-1.5-2.8 2.1-.8 4.2-.3 2.5.9z"
            fill="#E76F00"
          />
          <path
            d="M16.5 14.5c2.5-1.4 3.4-3.1 3.4-3.1s-.4.6-2.1 1.1c-2.2.6-4.5.6-5.8 0-1.1-.5-.8-1.5-.8-1.5s-.6.5.6 1.2c2.1 1.2 4.7 2.3 4.7 2.3z"
            fill="#E76F00"
          />
          <path
            d="M11.9 2.5c.8 1.4-.4 2.8-.4 2.8s2.2-1.2 1.3-2.8c-.8-1.3-1.4-1-1-1 .3.4.1 1 .1 1z"
            fill="#E76F00"
          />
          <path
            d="M15.4 5.2c1.4 2-.5 4.3-.5 4.3s2.6-1.7 1.4-4.2c-.8-1.7-1.4-1.2-1.4-1.2.4.4.5 1.1.5 1.1z"
            fill="#E76F00"
          />
          <path
            d="M6.2 19.8c3.2.3 8 .3 11.9-.3 1.2-.2 2.3-.5 2.3-.5s-.7.6-2.2.9c-4.4.8-10.5.8-14.7-.2 0 0 .9-.2 2.7-.9z"
            fill="#5382A1"
          />
        </svg>
      )
    },
    {
      name: "JavaScript",
      category: "Web Language",
      iconSvg: (
        <svg viewBox="0 0 24 24" className="w-7 h-7" fill="none">
          <rect width="20" height="20" x="2" y="2" rx="3" fill="#F7DF1E" />
          <path
            d="M7.5 17.5c.8.5 1.7.8 2.5.8 1.4 0 2.2-.7 2.2-1.8v-6.3h-2.1v6.3c0 .5-.3.8-.8.8-.4 0-.8-.2-1.1-.4l-.7.6zm8.2.1c.9.5 2 .8 3 .8 2.2 0 3.3-1.1 3.3-2.6 0-1.4-.8-2.1-2.2-2.7l-.8-.3c-.8-.3-1.2-.6-1.2-1.1 0-.5.4-.9 1.2-.9.7 0 1.5.3 2 .6l.6-.7c-.7-.5-1.6-.7-2.6-.7-2 0-3.1 1.1-3.1 2.4 0 1.3.8 2 2.1 2.5l.8.3c.9.4 1.3.7 1.3 1.3 0 .6-.5 1-1.4 1-.9 0-1.8-.3-2.4-.8l-.7.7z"
            fill="#000000"
          />
        </svg>
      )
    },
    {
      name: "HTML & CSS",
      category: "Web Markup & UI",
      iconSvg: (
        <svg viewBox="0 0 24 24" className="w-7 h-7" fill="none">
          <path d="M3 3l1.6 17.5L12 23l7.4-2.5L21 3H3z" fill="#E44D26" />
          <path d="M12 4.8v16.4l5.9-2 1.3-14.4H12z" fill="#F16529" />
          <path
            d="M7.8 7.6h8.4l-.2 2H9.8l.2 2h5.8l-.5 5.5-3.3 1-3.3-1-.2-2.4h2l.1 1.2 1.4.4 1.4-.4.2-2H7.6l-.4-4.5.6-1.2z"
            fill="#FFFFFF"
          />
        </svg>
      )
    },
    {
      name: "FastAPI",
      category: "Backend Framework",
      iconSvg: (
        <svg viewBox="0 0 24 24" className="w-7 h-7" fill="none">
          <circle cx="12" cy="12" r="10" fill="#009688" />
          <path d="M12 4L6 14h5l-1 6 6-10h-5l1-6z" fill="#FFFFFF" />
        </svg>
      )
    },
    {
      name: "Express",
      category: "Backend Framework",
      iconSvg: (
        <svg viewBox="0 0 24 24" className="w-7 h-7" fill="none">
          <circle cx="12" cy="12" r="10" fill="#18181B" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
          <path
            d="M7 8h5v1.8H9v2.2h2.5v1.8H9v2.4h3v1.8H7V8zm6 0h2.2l1.6 3 1.6-3h2.2L18.4 12l2.4 4h-2.2l-1.8-3.2-1.8 3.2H13l2.4-4-2.4-4z"
            fill="#F4F4F5"
          />
        </svg>
      )
    },
    {
      name: "React",
      category: "Frontend Library",
      iconSvg: (
        <svg viewBox="0 0 24 24" className="w-7 h-7" fill="none">
          <ellipse
            cx="12"
            cy="12"
            rx="4"
            ry="10"
            transform="rotate(30 12 12)"
            stroke="#61DAFB"
            strokeWidth="1.5"
            fill="none"
          />
          <ellipse
            cx="12"
            cy="12"
            rx="4"
            ry="10"
            transform="rotate(90 12 12)"
            stroke="#61DAFB"
            strokeWidth="1.5"
            fill="none"
          />
          <ellipse
            cx="12"
            cy="12"
            rx="4"
            ry="10"
            transform="rotate(150 12 12)"
            stroke="#61DAFB"
            strokeWidth="1.5"
            fill="none"
          />
          <circle cx="12" cy="12" r="1.8" fill="#61DAFB" />
        </svg>
      )
    },
    {
      name: "Spring Boot",
      category: "Enterprise Backend",
      iconSvg: (
        <svg viewBox="0 0 24 24" className="w-7 h-7" fill="none">
          <path
            d="M21.5 12c0 5.2-4.3 9.5-9.5 9.5S2.5 17.2 2.5 12 6.8 2.5 12 2.5s9.5 4.3 9.5 9.5z"
            fill="#6DB33F"
          />
          <path
            d="M17.4 8.2c-.3-.4-.8-.6-1.3-.4-3.5 1.1-6.4 3.8-7.7 7.2-.2.5 0 1 .4 1.3.4.2.9.2 1.3-.1 3.5-2.2 5.9-5.6 7.3-8z"
            fill="#FFFFFF"
          />
          <path
            d="M12.5 12.2c-.2-.1-.5-.1-.7.1-1.4 1.4-2.1 3.3-2 5.3.1.5.5.9 1 .8.5-.1.9-.5.8-1-.1-1.5.5-2.9 1.5-4 .3-.3.2-.8-.6-1.2z"
            fill="#FFFFFF"
          />
        </svg>
      )
    },
    {
      name: "MongoDB",
      category: "NoSQL Database",
      iconSvg: (
        <svg viewBox="0 0 24 24" className="w-7 h-7" fill="#47A248">
          <path d="M12 2s-4 4.5-4 10.5c0 4.5 3 7.5 4 8.5 1-1 4-4 4-8.5C16 6.5 12 2 12 2zm-.2 18.2c-.3-.3-2.8-2.8-2.8-7.7 0-4.3 2.5-7.9 3-8.5v16.2z" />
        </svg>
      )
    },
    {
      name: "MySQL / SQL",
      category: "Relational Database",
      iconSvg: (
        <svg viewBox="0 0 24 24" className="w-7 h-7" fill="none">
          <ellipse cx="12" cy="6" rx="8" ry="3" fill="#00758F" />
          <path
            d="M4 6v5c0 1.66 3.58 3 8 3s8-1.34 8-3V6"
            stroke="#F29111"
            strokeWidth="1.6"
            fill="none"
          />
          <path
            d="M4 11v5c0 1.66 3.58 3 8 3s8-1.34 8-3v-5"
            stroke="#00758F"
            strokeWidth="1.6"
            fill="none"
          />
        </svg>
      )
    },
    {
      name: "NumPy",
      category: "Scientific Computing",
      iconSvg: (
        <svg viewBox="0 0 24 24" className="w-7 h-7" fill="none">
          <rect width="20" height="20" x="2" y="2" rx="3" fill="#4DABCF" />
          <path d="M6.5 6h2.2v12H6.5V6zm8.8 0h2.2v12h-2.2V6zm-5.5 3.5h4.4v5H9.8v-5z" fill="#013243" />
        </svg>
      )
    },
    {
      name: "Git & GitHub",
      category: "Version Control & CI",
      iconSvg: (
        <svg viewBox="0 0 24 24" className="w-7 h-7" fill="#F05032">
          <path d="M21.6 10.9L13.1 2.4c-.6-.6-1.5-.6-2.1 0L8.9 4.5l2.7 2.7c.6-.2 1.3-.1 1.8.4.5.5.6 1.3.4 1.9l2.6 2.6c.6-.2 1.4-.1 1.9.4.7.7.7 1.9 0 2.7s-1.9.7-2.7 0c-.6-.6-.7-1.4-.4-2.1l-2.4-2.4v5.3c.2.2.3.4.3.7 0 1-.8 1.8-1.8 1.8s-1.8-.8-1.8-1.8c0-.6.3-1.1.7-1.5V9.4c-.4-.3-.7-.8-.7-1.5 0-.4.1-.7.3-1L7.1 4.2 2.4 8.9c-.6.6-.6 1.5 0 2.1l8.5 8.5c.6.6 1.5.6 2.1 0l8.6-8.6c.6-.6.6-1.5 0-2.1z" />
        </svg>
      )
    },
    {
      name: "Postman",
      category: "API Testing & Dev",
      iconSvg: (
        <svg viewBox="0 0 24 24" className="w-7 h-7" fill="none">
          <circle cx="12" cy="12" r="10" fill="#FF6C37" />
          <path
            d="M12 6.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zm-3.8 6.8c1.3-.8 2.6-1.1 3.8-1.1s2.5.3 3.8 1.1c.8.5 1.2 1.4 1.2 2.3V17H7v-1.4c0-.9.4-1.8 1.2-2.3z"
            fill="#FFFFFF"
          />
        </svg>
      )
    }
  ];

  return (
    <section className="relative z-40 py-20 md:py-28">
      {/* Background ambient red glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-[radial-gradient(circle,rgba(242,13,69,0.08)_0%,rgba(5,5,7,0)_70%)] pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="ECOSYSTEM"
          title="MY TECH STACK"
          description="Production languages, web frameworks, distributed databases, and developer tooling."
        />

        {/* Responsive justified & centered grid: 6 columns desktop, 3 tablet, 2 mobile */}
        <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
          {techs.map((tech, idx) => (
            <Reveal
              key={tech.name}
              delay={idx * 0.03}
              className="w-[calc(50%-6px)] sm:w-[calc(50%-8px)] md:w-[calc(33.333%-11px)] lg:w-[calc(16.666%-14px)]"
            >
              <div className="glass-panel p-3.5 sm:p-4 flex flex-col items-center justify-center text-center group cursor-default h-32 hover:-translate-y-1 hover:border-[#FF1744]/60 hover:shadow-[0_0_20px_rgba(255,23,68,0.25)] transition-all duration-200">
                <div className="mb-2.5 transition-transform duration-200 group-hover:scale-110 drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]">
                  {tech.iconSvg}
                </div>
                <h4 className="text-xs font-bold text-[#F5F1F2] group-hover:text-[#FF315B] transition-colors line-clamp-1">
                  {tech.name}
                </h4>
                <span className="text-[10px] font-mono text-[#74676D] mt-0.5 line-clamp-1">
                  {tech.category}
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};
