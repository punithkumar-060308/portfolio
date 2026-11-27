import React from "react";
import { skillsData } from "../../data/skills";
import { SectionHeading } from "../ui/SectionHeading";
import { Card } from "../ui/Card";
import { Tag } from "../ui/Tag";
import { Reveal } from "../ui/Reveal";

export const Skills: React.FC = () => {
  return (
    <section id="skills" className="relative z-40 py-20 md:py-28 overflow-hidden">
      {/* Background ambient red glow */}
      <div className="absolute top-1/2 right-1/4 w-[500px] h-[350px] bg-[radial-gradient(circle,rgba(242,13,69,0.08)_0%,rgba(5,5,7,0)_70%)] pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="TOOLKIT &amp; CAPABILITIES"
          title="TECHNICAL SKILLS"
          description="Grouped by capability with honest proficiency context rather than arbitrary percentage bars."
        />

        {/* 6-Card Desktop Grid (3 columns x 2 rows), 2 columns on tablet, 1 on mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillsData.map((category, idx) => (
            <Reveal key={category.category} delay={idx * 0.08} className="h-full">
              <Card className="h-full flex flex-col justify-between">
                <div>
                  <h3 className="text-base font-bold uppercase tracking-wider text-[#F5F1F2] mb-1">
                    {category.category}
                  </h3>
                  <p className="text-xs text-[#A79BA0] mb-5 leading-relaxed">
                    {category.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill) => {
                      const levelVariant =
                        skill.level === "Proficient"
                          ? "accent"
                          : skill.level === "Working Knowledge"
                          ? "neutral"
                          : "warning";

                      return (
                        <Tag key={skill.name} variant={levelVariant} size="sm">
                          <span
                            className={`w-1.5 h-1.5 rounded-full mr-1.5 shrink-0 ${
                              levelVariant === "accent"
                                ? "bg-[#F20D45] shadow-[0_0_6px_#F20D45]"
                                : levelVariant === "neutral"
                                ? "bg-slate-400"
                                : "bg-amber-400 shadow-[0_0_6px_rgba(251,191,36,0.6)]"
                            }`}
                          />
                          {skill.name}
                        </Tag>
                      );
                    })}
                  </div>
                </div>

                {/* Three-Level Legend Indicator */}
                <div className="mt-6 pt-4 border-t border-[rgba(255,75,112,0.18)] flex flex-wrap items-center gap-x-4 gap-y-2 text-[11px] font-mono text-[#74676D]">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#F20D45] shadow-[0_0_6px_#F20D45]" />
                    Proficient
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-slate-400" />
                    Working
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-amber-400 shadow-[0_0_6px_rgba(251,191,36,0.6)]" />
                    Exploring
                  </span>
                </div>
              </Card>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};
