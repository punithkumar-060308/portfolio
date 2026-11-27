import React from "react";
import { Brain, Code2, Bot } from "lucide-react";
import { Reveal } from "../ui/Reveal";

interface FocusCategory {
  title: string;
  subtitle: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}

export const StatsStrip: React.FC = () => {
  const categories: FocusCategory[] = [
    {
      title: "AI/ML",
      subtitle: "Primary Focus",
      description: "Deep learning models, computer vision pipelines, and intelligent predictive algorithms.",
      icon: Brain,
    },
    {
      title: "Full Stack",
      subtitle: "Development",
      description: "Modern reactive frontends, robust backend APIs, and scalable cloud-ready architectures.",
      icon: Code2,
    },
    {
      title: "AI Agents",
      subtitle: "Exploration",
      description: "Autonomous reasoning workflows, tool-use execution, and multi-agent coordination systems.",
      icon: Bot,
    },
  ];

  return (
    <section id="stats" className="relative z-40 py-4 -mt-4 mb-14" aria-label="At a Glance">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="glass-panel p-3 sm:p-4 lg:p-5 grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 divide-y md:divide-y-0 md:divide-x divide-[rgba(255,75,112,0.15)] text-center">
            {categories.map((cat, idx) => {
              const Icon = cat.icon;
              return (
                <div
                  key={idx}
                  className="group relative flex flex-col items-center justify-center p-2.5 sm:p-3.5 rounded-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(242,13,69,0.2),inset_0_1px_0_rgba(255,255,255,0.08)] hover:bg-[rgba(242,13,69,0.03)] cursor-default pt-4 md:pt-2.5 first:pt-0"
                >
                  {/* Glowing Red Icon */}
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center bg-gradient-to-b from-[#2a0b14] to-[#120408] border border-[rgba(242,13,69,0.35)] text-[#FF1744] shadow-[0_0_15px_rgba(242,13,69,0.3)] group-hover:shadow-[0_0_24px_rgba(242,13,69,0.65)] group-hover:border-[#FF1744] group-hover:scale-105 transition-all duration-300 mb-2.5">
                    <Icon className="w-4.5 h-4.5 sm:w-5 sm:h-5 drop-shadow-[0_0_8px_rgba(255,23,68,0.85)]" />
                  </div>

                  {/* Large White Heading */}
                  <h3 className="text-lg sm:text-xl lg:text-2xl font-black text-[#F5F1F2] tracking-tight group-hover:text-white transition-colors duration-200">
                    {cat.title}
                  </h3>

                  {/* Category Subtitle / Tag */}
                  <span className="mt-0.5 text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.18em] text-[#F20D45] drop-shadow-[0_0_8px_rgba(242,13,69,0.5)]">
                    {cat.subtitle}
                  </span>

                  {/* Subtle Description */}
                  <p className="mt-1.5 text-[11px] sm:text-xs text-[#A79BA0] leading-normal max-w-[260px] group-hover:text-[#D4C8CD] transition-colors duration-200">
                    {cat.description}
                  </p>
                </div>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
};
