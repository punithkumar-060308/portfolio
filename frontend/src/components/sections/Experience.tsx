import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { getSortedTimeline } from "../../data/timeline";

export const Experience: React.FC = () => {
  const sortedMilestones = getSortedTimeline();
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);

  const checkScroll = () => {
    const el = scrollContainerRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 20);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 20);
    const maxScroll = el.scrollWidth - el.clientWidth;
    setScrollProgress(maxScroll > 0 ? (el.scrollLeft / maxScroll) * 100 : 0);
  };

  useEffect(() => {
    const el = scrollContainerRef.current;
    if (!el) return;
    checkScroll();
    el.addEventListener("scroll", checkScroll, { passive: true });
    window.addEventListener("resize", checkScroll);
    return () => {
      el.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, []);

  const scrollBy = (offset: number) => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: offset, behavior: "smooth" });
    }
  };

  return (
    <section
      id="experience"
      className="relative z-40 py-20 md:py-28 overflow-hidden bg-[#050507]"
    >
      {/* Anchor for #timeline navigation */}
      <span id="timeline" className="sr-only" />

      {/* Atmospheric Crimson Radial Glows matching portfolio theme */}
      <div className="absolute top-1/4 left-1/4 w-[650px] h-[450px] bg-[radial-gradient(circle,rgba(255,23,68,0.08)_0%,rgba(5,5,7,0)_70%)] pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 right-1/4 w-[550px] h-[400px] bg-[radial-gradient(circle,rgba(229,22,62,0.06)_0%,rgba(5,5,7,0)_70%)] pointer-events-none -z-10" />

      {/* Subtle floating ambient crimson particles */}
      <div aria-hidden="true" className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-[14%] left-[10%] w-1.5 h-1.5 rounded-full bg-[#FF1744]/40 shadow-[0_0_8px_#FF1744] animate-pulse" />
        <div className="absolute top-[26%] right-[14%] w-2 h-2 rounded-full bg-[#FF315B]/30 shadow-[0_0_10px_#FF1744] animate-pulse" style={{ animationDelay: "1s" }} />
        <div className="absolute top-[48%] left-[6%] w-1.5 h-1.5 rounded-full bg-[#FF1744]/35 shadow-[0_0_8px_#FF1744] animate-pulse" style={{ animationDelay: "2s" }} />
        <div className="absolute top-[68%] right-[10%] w-1 h-1 rounded-full bg-[#FF1744]/45 shadow-[0_0_6px_#FF1744] animate-pulse" style={{ animationDelay: "1.5s" }} />
        <div className="absolute top-[88%] left-[18%] w-2 h-2 rounded-full bg-[#FF315B]/25 shadow-[0_0_10px_#FF1744] animate-pulse" style={{ animationDelay: "0.5s" }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ================================================================= */}
        {/* SECTION HEADING & CONTROLS                                       */}
        {/* ================================================================= */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div>
            <span className="inline-block text-xs sm:text-sm font-black uppercase tracking-[0.24em] text-[#E5163E] drop-shadow-[0_0_10px_rgba(229,22,62,0.6)]">
              JOURNEY
            </span>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black uppercase text-white tracking-tight leading-none mt-2 sm:mt-3">
              MY JOURNEY THROUGH TIME
            </h2>
            <p className="mt-3 text-sm sm:text-base text-[#A79BA0] max-w-xl">
              A chronological timeline of my learning, growth, and engineering milestones.
            </p>
            <div className="w-14 sm:w-16 h-1.5 bg-[#E5163E] rounded-full mt-4 shadow-[0_0_14px_rgba(229,22,62,0.85)]" />
          </div>

          {/* Left / Right Scroll Navigation Buttons */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => scrollBy(-380)}
              disabled={!canScrollLeft}
              aria-label="Scroll timeline left"
              className={`w-11 h-11 rounded-full border flex items-center justify-center transition-all duration-300 cursor-pointer ${
                canScrollLeft
                  ? "bg-[#14060e] border-[#FF1744]/50 text-white hover:border-[#FF1744] hover:shadow-[0_0_16px_rgba(255,23,68,0.5)] active:scale-95"
                  : "bg-white/[0.03] border-white/10 text-white/30 cursor-not-allowed"
              }`}
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <button
              onClick={() => scrollBy(380)}
              disabled={!canScrollRight}
              aria-label="Scroll timeline right"
              className={`w-11 h-11 rounded-full border flex items-center justify-center transition-all duration-300 cursor-pointer ${
                canScrollRight
                  ? "bg-[#14060e] border-[#FF1744]/50 text-white hover:border-[#FF1744] hover:shadow-[0_0_16px_rgba(255,23,68,0.5)] active:scale-95"
                  : "bg-white/[0.03] border-white/10 text-white/30 cursor-not-allowed"
              }`}
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* ================================================================= */}
        {/* CONTINUOUS HORIZONTAL JOURNEY TIMELINE CONTAINER                  */}
        {/* ================================================================= */}
        <div className="relative">
          {/* Scrollable Single Row Container */}
          <div
            ref={scrollContainerRef}
            className="overflow-x-auto pb-6 pt-4 scroll-smooth no-scrollbar touch-pan-x"
            style={{ scrollSnapType: "x proximity" }}
          >
            <div className="relative inline-flex flex-nowrap gap-5 sm:gap-7 px-4 min-w-max items-start">
              {/* Continuous Horizontal Crimson Glowing Timeline Line */}
              <div
                aria-hidden="true"
                className="absolute top-[37px] left-8 right-8 h-[2px] bg-gradient-to-r from-[#FF1744]/20 via-[#FF1744] to-[#FF1744]/20 shadow-[0_0_12px_rgba(255,23,68,0.6)] pointer-events-none"
              />

              {/* Sequential Milestones in ONE Single Line */}
              {sortedMilestones.map((item, idx) => (
                <div
                  key={item.id || idx}
                  className="group flex flex-col items-center flex-shrink-0 w-[270px] sm:w-[320px] md:w-[340px]"
                  style={{ scrollSnapAlign: "start" }}
                >
                  {/* Top Timeline Node Assembly: Year Label, Circular Glowing Marker & Stem */}
                  <div className="flex flex-col items-center mb-4">
                    {/* Floating Year / Month Label */}
                    <span className="text-xs sm:text-sm font-mono font-black text-white/90 tracking-widest uppercase mb-2 group-hover:text-[#FF1744] transition-colors select-none">
                      {item.month ? `${item.month.toUpperCase()} ` : ""}{item.year}
                    </span>

                    {/* Glowing Circular Crimson Marker right on the horizontal line */}
                    <div className="relative w-5 h-5 rounded-full bg-[#14060e] border-2 border-[#FF1744] flex items-center justify-center shadow-[0_0_12px_#FF1744] group-hover:shadow-[0_0_22px_#FF1744] group-hover:scale-110 transition-all duration-300 z-10">
                      <span className="w-2 h-2 rounded-full bg-white shadow-[0_0_6px_#ffffff]" />
                      <span className="absolute inset-0 rounded-full bg-[#FF1744] animate-ping opacity-30" />
                    </div>

                    {/* Vertical stem connecting marker to milestone card */}
                    <div className="w-[2px] h-6 bg-gradient-to-b from-[#FF1744] to-white/10 shadow-[0_0_8px_rgba(255,23,68,0.5)]" />
                  </div>

                  {/* Dark Glass-Style Milestone Card */}
                  <motion.div
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.45,
                      delay: Math.min(idx * 0.05, 0.3),
                      ease: "easeOut"
                    }}
                    className="relative w-full min-h-[220px] rounded-2xl bg-gradient-to-b from-[#14060e]/90 via-[#0e0409]/95 to-[#070205] border border-white/[0.08] group-hover:border-[#FF1744]/60 p-6 sm:p-7 backdrop-blur-xl shadow-[0_12px_35px_rgba(0,0,0,0.7)] group-hover:shadow-[0_0_28px_rgba(255,23,68,0.25)] group-hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between overflow-hidden"
                  >
                    {/* Glowing Crimson Top Highlight Bar on Hover */}
                    <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#FF1744] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-t-2xl" />

                    <div>
                      {/* Milestone Sequence Index & Year Badge */}
                      <div className="flex items-center justify-between mb-3.5">
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold tracking-wider bg-[#FF1744]/15 border border-[#FF1744]/40 text-[#FF5252]">
                          {item.month ? `${item.month.toUpperCase()} ` : ""}{item.year}
                        </span>
                        <span className="text-[10px] font-mono text-[#A79BA0] tracking-wider">
                          STEP {String(idx + 1).padStart(2, "0")} / {String(sortedMilestones.length).padStart(2, "0")}
                        </span>
                      </div>

                      {/* Milestone Title */}
                      <h3 className="text-base sm:text-lg font-bold text-white tracking-wide group-hover:text-[#FF1744] transition-colors duration-200">
                        {item.title}
                      </h3>

                      {/* Milestone Description */}
                      <p className="mt-2.5 text-xs sm:text-sm text-[#D4C8CD] leading-relaxed font-normal">
                        {item.description}
                      </p>
                    </div>
                  </motion.div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Horizontal Scroll Progress Bar */}
          <div className="max-w-xs mx-auto mt-6 flex flex-col items-center gap-2 select-none">
            <div className="w-full bg-white/10 rounded-full h-1 overflow-hidden">
              <div
                className="bg-gradient-to-r from-[#FF1744] to-[#E5163E] h-full rounded-full transition-all duration-150 shadow-[0_0_8px_#FF1744]"
                style={{ width: `${Math.max(scrollProgress, 12)}%` }}
              />
            </div>
            <span className="text-[10px] font-mono text-[#A79BA0] uppercase tracking-widest">
              &larr; Scroll horizontally to explore journey &rarr;
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

// Re-export as Timeline for semantic use
export const Timeline = Experience;
export default Experience;
