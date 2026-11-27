import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { projectsData } from "../../data/projects";
import type { Project } from "../../data/projects";
import { SectionHeading } from "../ui/SectionHeading";
import { ProjectModal } from "../projects/ProjectModal";
import {
  ExoScanPreview,
  SentinelMeshPreview,
  AcmSuitePreview,
  NeuralFlowPreview,
  CogniGraphPreview,
  DevPulsePreview,
} from "../projects/ProjectVisualPreviews";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

export const Projects: React.FC = () => {
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  const sectionRef = useRef<HTMLElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isMobileOrTablet = window.innerWidth < 1024;

    const section = sectionRef.current;
    const container = containerRef.current;
    if (!section || !container) return;

    if (prefersReducedMotion || isMobileOrTablet) {
      // In reduced-motion, mobile, or tablet mode, display cards at normal rest
      cardsRef.current.forEach((card) => {
        if (!card) return;
        gsap.set(card, { opacity: 1, scale: 1, x: 0, y: 0 });
        const num = card.querySelector(".project-bg-number");
        const title = card.querySelector(".project-gallery-title");
        const frame = card.querySelector(".project-gallery-frame");
        if (num) gsap.set(num, { opacity: 0.14, scale: 1 });
        if (title) gsap.set(title, { opacity: 1, y: 0 });
        if (frame) gsap.set(frame, { opacity: 1, scale: 1 });
      });
      return;
    }

    // Refresh ScrollTrigger when DOM is stable
    const ctx = gsap.context(() => {
      const cards = cardsRef.current.filter(Boolean) as HTMLDivElement[];
      if (cards.length === 0) return;

      // In a 3-column grid (desktop):
      // Col 0: dx = centerCol.left - col0.left (travel from center to left slot)
      // Col 1: dx = 0 (emerges directly in center slot)
      // Col 2: dx = centerCol.left - col2.left (travel from center to right slot)
      const getTravelOffsets = () => {
        if (cards.length >= 3) {
          const c0 = cards[0].getBoundingClientRect();
          const c1 = cards[1].getBoundingClientRect();
          const c2 = cards[2].getBoundingClientRect();
          return {
            leftColDx: c1.left - c0.left,
            rightColDx: c1.left - c2.left,
          };
        }
        return { leftColDx: 0, rightColDx: 0 };
      };

      const { leftColDx, rightColDx } = getTravelOffsets();

      // Initial State: All cards start stacked in the horizontal center, scaled down and invisible
      cards.forEach((card, i) => {
        const col = i % 3;
        const startX = col === 0 ? leftColDx : col === 2 ? rightColDx : 0;
        gsap.set(card, {
          x: startX,
          y: 60,
          scale: 0.45,
          opacity: 0,
          transformOrigin: "center center",
          willChange: "transform, opacity",
        });

        const num = card.querySelector(".project-bg-number");
        const title = card.querySelector(".project-gallery-title");
        const frame = card.querySelector(".project-gallery-frame");

        if (num) gsap.set(num, { opacity: 0, scale: 1.5 });
        if (title) gsap.set(title, { opacity: 0, y: 15 });
        if (frame) gsap.set(frame, { opacity: 0, scale: 0.8 });
      });

      // Master Scroll-Controlled Timeline
      // Pin section while the user scrolls through the emergent card flight
      const scrollDistance = cards.length > 3 ? 3600 : 2600;
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: `+=${scrollDistance}`,
          pin: true,
          pinSpacing: true,
          scrub: 1.2, // Smooth organic scrubbing
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // Sequential Emergence & Flight for each project card
      cards.forEach((card, i) => {
        const num = card.querySelector(".project-bg-number");
        const title = card.querySelector(".project-gallery-title");
        const frame = card.querySelector(".project-gallery-frame");
        const startTime = i * 0.85;

        // 1. Emerge at center: Number appears first, then frame & visual, then title
        tl.to(
          card,
          { opacity: 1, scale: 1.05, y: 0, duration: 0.65, ease: "power2.out" },
          startTime
        )
          .to(num, { opacity: 0.22, scale: 1.0, duration: 0.45, ease: "power2.out" }, startTime + 0.05)
          .to(frame, { opacity: 1, scale: 1.0, duration: 0.55, ease: "power2.out" }, startTime + 0.15)
          .to(title, { opacity: 1, y: 0, duration: 0.35, ease: "power2.out" }, startTime + 0.35);

        // 2. Physical Travel to assigned column
        tl.to(
          card,
          {
            x: 0,
            scale: 1.0,
            duration: 0.75,
            ease: "power2.inOut",
          },
          startTime + 0.7
        );
      });

      // Final Hold of the fully arranged gallery
      const holdStartTime = cards.length * 0.85 + 0.3;
      tl.to(
        cards,
        {
          x: 0,
          y: 0,
          scale: 1.0,
          opacity: 1,
          duration: 0.8,
          ease: "none",
        },
        holdStartTime
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const renderProjectVisual = (project: Project) => {
    switch (project.slug) {
      case "exo-scan-ai":
        return <ExoScanPreview />;
      case "sentinelmesh-ai":
        return <SentinelMeshPreview />;
      case "acm-automation-suite":
        return <AcmSuitePreview />;
      case "neuralflow-vision":
        return <NeuralFlowPreview />;
      case "cognigraph-rag":
        return <CogniGraphPreview />;
      case "devpulse-telemetry":
        return <DevPulsePreview />;
      default:
        break;
    }

    if (project.coverImage) {
      return (
        <div className="relative w-full h-full overflow-hidden">
          <img
            src={project.coverImage}
            alt={project.title}
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 pointer-events-none" />
          <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10 pointer-events-none">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold tracking-wider bg-black/75 border border-white/15 text-[#E6DEE1] backdrop-blur-md">
              {project.tag || project.category}
            </span>
            {project.metric && (
              <span className="px-2 py-0.5 rounded-md bg-[#FF1744]/25 border border-[#FF1744]/50 text-[#FF5252] text-[10px] font-mono font-bold backdrop-blur-md">
                {project.metric.trend === "up" ? "\u2191 " : ""}{project.metric.value}
              </span>
            )}
          </div>
        </div>
      );
    }

    return <ExoScanPreview />;
  };

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative z-40 min-h-screen py-12 md:py-16 flex flex-col justify-center overflow-hidden"
    >
      {/* Background ambient red glow matching reference */}
      <div className="absolute top-1/4 right-1/4 w-[650px] h-[450px] bg-[radial-gradient(circle,rgba(255,23,68,0.10)_0%,rgba(5,5,7,0)_70%)] pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 left-1/4 w-[550px] h-[380px] bg-[radial-gradient(circle,rgba(229,22,62,0.08)_0%,rgba(5,5,7,0)_70%)] pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-1 flex flex-col justify-center">
        {/* Section Header */}
        <div className="mb-4 sm:mb-8">
          <SectionHeading
            eyebrow="FEATURED SHOWCASE"
            title="FEATURED PROJECTS"
            description="Interactive case studies of deep learning pipelines, autonomous multi-agent systems, and production web platforms."
          />
        </div>

        {/* Pinned Travel Showcase Grid (3 cols desktop, 2 tablet, 1 mobile) */}
        <div
          ref={containerRef}
          className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 lg:gap-8 items-start my-auto min-h-[300px]"
        >
          {projectsData.map((project, idx) => {
            const formattedNumber = String(idx + 1).padStart(2, "0");

            return (
              <div
                key={project.slug}
                ref={(el) => {
                  cardsRef.current[idx] = el;
                }}
                className="project-flight-card relative group flex flex-col items-center w-full"
              >
                {/* Large Sequential Project Number Behind Incoming Project */}
                <div
                  aria-hidden="true"
                  className="project-bg-number absolute -top-8 -left-2 sm:-top-12 sm:-left-4 text-7xl sm:text-8xl md:text-9xl font-black font-mono tracking-tighter text-[#FF1744] select-none pointer-events-none z-0"
                  style={{ opacity: 0.14 }}
                >
                  {formattedNumber}
                </div>

                {/* Reference Project Card Frame with Fixed Aspect Ratio & Equal Height */}
                <div
                  onClick={() => setActiveProject(project)}
                  className="project-gallery-frame w-full aspect-[16/10] sm:aspect-[16/10.5] rounded-xl bg-gradient-to-b from-[#14060e] via-[#0d040a] to-[#070205] border border-[rgba(255,75,112,0.28)] group-hover:border-[#FF1744] shadow-[0_12px_35px_rgba(0,0,0,0.85)] group-hover:shadow-[0_0_30px_rgba(255,23,68,0.45)] group-hover:-translate-y-1.5 transition-all duration-300 cursor-pointer overflow-hidden relative z-10"
                >
                  {/* Glowing Crimson Top Highlight Bar on Hover */}
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#FF1744] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Subtle Inner Glass Vignette & Red Core Glow */}
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,23,68,0.12)_0%,rgba(7,2,5,0.92)_85%)] pointer-events-none" />

                  {/* Visual Cover Screen / Graphic Illustration */}
                  <div className="relative w-full h-full transform group-hover:scale-[1.03] transition-transform duration-500">
                    {renderProjectVisual(project)}
                  </div>

                  {/* Glass Inner Border Shimmer */}
                  <div className="absolute inset-0 rounded-xl border border-white/[0.06] pointer-events-none" />
                </div>

                {/* Project Title Directly Below Card with Standard Vertical Alignment */}
                <div className="w-full flex justify-center mt-3.5">
                  <h3 className="project-gallery-title text-xs sm:text-[13px] font-black uppercase tracking-[0.14em] text-[#E6DEE1] group-hover:text-[#FF1744] transition-colors duration-200 text-center select-none line-clamp-1">
                    {project.displayTitle || project.title}
                  </h3>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Reusable Project Details Modal Dialog */}
      <ProjectModal
        project={activeProject}
        onClose={() => setActiveProject(null)}
      />
    </section>
  );
};
