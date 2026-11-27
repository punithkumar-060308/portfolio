import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Download, Eye } from "lucide-react";
import { profileData } from "../../data/profile";
import { Reveal } from "../ui/Reveal";

// Photo source for the hanging frame.
// When you upload your new photo, simply place it in frontend/public/ and update this path:
export const ABOUT_FRAME_PHOTO_SRC = "/punith-about.jpg";

const CORE_TOOLKIT = [
  "Python",
  "C",
  "Java",
  "JavaScript",
  "HTML & CSS",
  "FastAPI",
  "Express",
  "React",
  "Spring Boot",
  "MongoDB",
  "MySQL / SQL",
  "NumPy",
  "Git & GitHub",
  "Postman",
];

export const About: React.FC = () => {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(cardRef, { once: false, amount: 0.25 });

  return (
    <section id="about" className="relative z-40 py-20 md:py-28 overflow-hidden lg:overflow-visible">
      {/* Background Soft Red Atmospheric Ambient Glows */}
      <div className="absolute top-1/3 left-1/4 -translate-y-1/2 w-[650px] h-[450px] bg-[radial-gradient(circle,rgba(242,13,69,0.08)_0%,rgba(5,5,7,0)_70%)] pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[400px] bg-[radial-gradient(circle,rgba(242,13,69,0.06)_0%,rgba(5,5,7,0)_70%)] pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">

          {/* ================================================================= */}
          {/* LEFT CONTENT COLUMN: Header, Story, Bio, Core Toolkit Badges      */}
          {/* ================================================================= */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            {/* 1. Crimson Eyebrow Tag */}
            <Reveal>
              <span className="text-xs sm:text-sm font-black uppercase tracking-[0.24em] text-[#E5163E] drop-shadow-[0_0_10px_rgba(229,22,62,0.6)]">
                THE STORY BEHIND THE BUILD
              </span>
            </Reveal>

            {/* 2. Bold Two-Line Heading matching reference */}
            <Reveal delay={0.1}>
              <h2 className="text-4xl sm:text-6xl lg:text-7xl font-black uppercase text-white tracking-tight leading-none mt-2 sm:mt-3">
                ABOUT<br />
                <span className="text-white">PUNITH.</span>
              </h2>
            </Reveal>

            {/* 3. Thick Crimson Accent Bar */}
            <Reveal delay={0.15}>
              <div className="w-14 sm:w-16 h-1.5 bg-[#E5163E] rounded-full mt-3 sm:mt-4 mb-6 sm:mb-8 shadow-[0_0_14px_rgba(229,22,62,0.85)]" />
            </Reveal>

            {/* 4. Glass Card Container with Bio & Toolkit */}
            <Reveal delay={0.2}>
              <div className="rounded-2xl bg-gradient-to-b from-[#180811]/80 via-[#0e0409]/90 to-[#070205]/95 border border-white/[0.08] p-6 sm:p-8 backdrop-blur-xl shadow-[0_18px_50px_rgba(0,0,0,0.85),inset_0_1px_0_rgba(255,255,255,0.08)]">
                {/* Bio Paragraphs */}
                <p className="text-sm sm:text-base text-[#D4C8CD] leading-relaxed font-normal">
                  Hey! I'm Punith, a second-year AI &amp; Machine Learning undergraduate at BMS College of Engineering, Bangalore. Passionate about building things that matter — whether it's writing code at 2AM or sketching circuit ideas on paper, I'm all in.
                </p>

                <p className="text-sm sm:text-base text-[#D4C8CD] leading-relaxed font-normal mt-3.5">
                  I believe in learning by doing. From small Python scripts to exploring data structures and algorithms, I'm on a continuous mission to turn curiosity into capability.
                </p>

                <p className="text-sm sm:text-base text-[#A79BA0] leading-relaxed font-normal mt-3.5">
                  Outside of academics, I love stargazing, reading about emerging tech, exploring math rabbit holes, and occasionally building weird little projects just to see if they work.
                </p>

                {/* Resume Action Buttons (Download & View) */}
                <div className="mt-4 sm:mt-5 flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3 w-full sm:w-auto">
                  {/* Primary Button: Crimson-Filled Download Resume */}
                  <a
                    href="/PunithKumar_Resume.pdf"
                    download="PunithKumar_Resume.pdf"
                    className="group relative inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-full text-xs font-bold uppercase tracking-[0.12em] text-white bg-gradient-to-r from-[#FF1744] via-[#E5163E] to-[#C20E32] shadow-[0_0_15px_rgba(229,22,62,0.45)] hover:shadow-[0_0_25px_rgba(255,23,68,0.8)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 select-none cursor-pointer w-full sm:w-auto min-h-[44px]"
                  >
                    <Download className="w-3.5 h-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:scale-110" />
                    <span>Download Resume</span>
                  </a>

                  {/* Secondary Button: Subtle Outlined View Resume */}
                  <a
                    href="/PunithKumar_Resume.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-full text-xs font-bold uppercase tracking-[0.12em] text-[#E6DEE1] hover:text-white bg-[#15070f]/70 hover:bg-[#200a17]/90 border border-white/15 hover:border-[#E5163E]/70 shadow-[0_4px_14px_rgba(0,0,0,0.5)] hover:shadow-[0_0_18px_rgba(229,22,62,0.3)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 backdrop-blur-md select-none cursor-pointer w-full sm:w-auto min-h-[44px]"
                  >
                    <Eye className="w-3.5 h-3.5 text-[#FF2E5D] transition-transform duration-300 group-hover:scale-110" />
                    <span>View Resume</span>
                  </a>
                </div>

                {/* Toolkit Subheader */}
                <div className="mt-6 pt-5 border-t border-[rgba(255,75,112,0.15)]">
                  <span className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.2em] text-[#E5163E] block mb-3.5 drop-shadow-[0_0_8px_rgba(229,22,62,0.4)]">
                    CORE TOOLKIT &amp; PROFICIENCIES
                  </span>

                  {/* Pill Badges */}
                  <div className="flex flex-wrap gap-2 sm:gap-2.5">
                    {CORE_TOOLKIT.map((item, idx) => (
                      <span
                        key={idx}
                        className="px-3.5 py-1.5 rounded-full text-xs font-semibold text-[#E6DEE1] bg-[#1a0a12]/80 border border-white/10 hover:border-[#E5163E]/60 hover:text-white hover:bg-[#250d1a] hover:shadow-[0_0_14px_rgba(229,22,62,0.35)] transition-all duration-200 cursor-default select-none"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          {/* ================================================================= */}
          {/* RIGHT COLUMN: Interactive Tilted Hanging Framed Portrait          */}
          {/* ================================================================= */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center relative pt-4 sm:pt-2">

            {/* Unified Hanging Profile Card Assembly (All elements move together as ONE composition) */}
            <motion.div
              ref={cardRef}
              initial={{ opacity: 0, y: 35, rotate: -6 }}
              animate={
                isInView
                  ? {
                    opacity: 1,
                    y: [0, -6, 0],
                    rotate: [-3.8, -2.0, -3.8],
                  }
                  : { opacity: 0, y: 35, rotate: -6 }
              }
              transition={
                isInView
                  ? {
                    opacity: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
                    y: { duration: 6, repeat: Infinity, ease: "easeInOut" },
                    rotate: { duration: 7, repeat: Infinity, ease: "easeInOut" },
                  }
                  : { duration: 0.5 }
              }
              whileHover={{ scale: 1.025, rotate: -1.0, transition: { duration: 0.35, ease: "easeOut" } }}
              className="group relative z-20 flex flex-col items-center select-none"
              style={{ transformOrigin: "50% 10px" }}
            >
              {/* Connector Lines & Mount Pin SVG */}
              <div className="w-[265px] sm:w-[290px] md:w-[305px] h-[55px] relative overflow-visible pointer-events-none">
                <svg
                  viewBox="0 0 305 55"
                  className="w-full h-full overflow-visible"
                  aria-hidden="true"
                >
                  {/* Subtle Red Pulse Glow behind Center Mount Pin */}
                  <motion.circle
                    cx="152.5"
                    cy="8"
                    r="11"
                    fill="none"
                    stroke="#E5163E"
                    strokeWidth="1.2"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={
                      isInView
                        ? {
                            scale: [1, 1.45, 1],
                            opacity: [0.65, 0.2, 0.65],
                          }
                        : { opacity: 0 }
                    }
                    transition={{
                      duration: 2.8,
                      repeat: Infinity,
                      delay: 0.9,
                      ease: "easeInOut",
                    }}
                  />

                  {/* Left Connector Line (drawing itself on entrance) */}
                  <motion.path
                    d="M 152.5 8 L 42 52"
                    stroke="rgba(255, 255, 255, 0.45)"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={isInView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
                    transition={{ duration: 0.8, delay: 0.25, ease: "easeInOut" }}
                  />

                  {/* Right Connector Line (drawing itself on entrance) */}
                  <motion.path
                    d="M 152.5 8 L 263 52"
                    stroke="rgba(255, 255, 255, 0.45)"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={isInView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
                    transition={{ duration: 0.8, delay: 0.25, ease: "easeInOut" }}
                  />

                  {/* Center Node (Pin Head) */}
                  <motion.circle
                    cx="152.5"
                    cy="8"
                    r="6"
                    fill="#0c0407"
                    stroke="#E5163E"
                    strokeWidth="2.5"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
                    transition={{ duration: 0.4, delay: 0.1, type: "spring", stiffness: 320 }}
                  />
                  <circle cx="152.5" cy="8" r="2.2" fill="#ffffff" />

                  {/* Left & Right Circular Eyelet Nodes on Frame Top Border */}
                  <motion.g
                    initial={{ scale: 0, opacity: 0 }}
                    animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
                    transition={{ duration: 0.4, delay: 0.75, ease: "easeOut" }}
                  >
                    <circle
                      cx="42"
                      cy="52"
                      r="4"
                      fill="#14060e"
                      stroke="rgba(255,255,255,0.85)"
                      strokeWidth="1.5"
                    />
                    <circle
                      cx="263"
                      cy="52"
                      r="4"
                      fill="#14060e"
                      stroke="rgba(255,255,255,0.85)"
                      strokeWidth="1.5"
                    />
                  </motion.g>
                </svg>
              </div>

              {/* Physical Picture Frame Slab */}
              <div className="relative w-[265px] sm:w-[290px] md:w-[305px] aspect-[4/5] rounded-[24px] p-2 sm:p-2.5 bg-gradient-to-b from-[#25101b] via-[#13060e] to-[#080206] border-[2.5px] border-[#381a29] group-hover:border-[#E5163E]/80 shadow-[0_24px_55px_rgba(0,0,0,0.9),0_0_26px_rgba(229,22,62,0.18)] group-hover:shadow-[0_28px_65px_rgba(0,0,0,0.95),0_0_36px_rgba(229,22,62,0.45),inset_0_1px_0_rgba(255,255,255,0.2)] transition-all duration-300 -mt-1">

                {/* Photo Canvas Container */}
                <div className="relative w-full h-full rounded-[17px] overflow-hidden bg-gradient-to-b from-[#650b1e] via-[#2f050f] to-[#0f0307] border border-white/10">
                  {/* Rich Crimson Illuminated Background Spotlight */}
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(242,13,69,0.55)_0%,rgba(16,4,10,0.9)_75%)]" />

                  {/* Portrait Subject */}
                  <img
                    src={ABOUT_FRAME_PHOTO_SRC}
                    alt={profileData.name}
                    className="w-full h-full object-cover object-center select-none pointer-events-none filter contrast-105 drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)]"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = "/punith.jpg";
                    }}
                  />

                  {/* Specular Glass Sheen Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.04] to-white/[0.14] pointer-events-none" />

                  {/* Bottom Role & Name Badge matching reference */}
                  <motion.div
                    initial={{ opacity: 0, y: 14 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
                    transition={{ duration: 0.6, delay: 0.85, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute bottom-3 left-3 right-3 text-center py-2 px-3 rounded-xl bg-[#0c0407]/90 backdrop-blur-md border border-white/10 shadow-[0_6px_20px_rgba(0,0,0,0.8)]"
                  >
                    <div className="text-xs sm:text-sm font-black uppercase text-white tracking-wider leading-tight">
                      PUNITH
                    </div>
                    <div className="text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.16em] text-[#FF2E5D] mt-0.5">
                      AI/ML DEVELOPER
                    </div>
                    <div className="text-[8px] sm:text-[8px] font-bold uppercase tracking-[0.10em] text-[#EE] mt-0.5 whitespace-nowrap">
                      EXPLORING INTELLIGENCE · BUILDING INNOVATION
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};
