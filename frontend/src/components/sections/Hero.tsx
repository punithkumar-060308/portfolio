import React, { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Mail } from "lucide-react";
import { MosaicPanel } from "../ui/MosaicPanel";
import { GithubIcon, LinkedinIcon } from "../ui/Icons";
import { profileData } from "../../data/profile";

// Register ScrollTrigger for scroll-driven 3D shard animation
gsap.registerPlugin(ScrollTrigger);

// Coordinated 6-Shard Shattered Glass Polygon Geometry (1440 x 720 canvas)
// Exact architectural reconstruction of the cinematic reference:
// - Thick 3D intersecting angular glass shards with central V-shaped intersection at (640, 430)
// - Chamfered 24px rounded outer corners on perimeter shards (Shard 1, 4, 6)
// - 100% facial preservation: Shard 3 encapsulates entire head, hair, sunglasses, nose, beard, chin & neck
// - Natural diagonal cuts across lower chest fabric under collar
const SHATTERED_PATHS = {
  // Shard 1: Left Main Text Glass Shard (with rounded outer left corners and sharp chevron V-arm pointing to 640, 430)
  shard1_text:
    "M 36 30 L 440 30 L 640 430 L 480 690 L 36 690 A 24 24 0 0 1 12 666 L 12 54 A 24 24 0 0 1 36 30 Z",

  // Shard 2: Upper-Middle Angular Triangular Wedge (Left wing of central V)
  shard2_top_mid:
    "M 440 30 L 820 30 L 640 430 Z",

  // Shard 3: Crown & Face Shard (Preserves 100% head, hair, sunglasses, face, chin & neck; right wing of central V)
  shard3_face:
    "M 820 30 L 1180 30 L 1260 310 L 1000 500 L 640 430 Z",

  // Shard 4: Upper-Right Glass Corner Shard
  shard4_top_right:
    "M 1180 30 L 1404 30 A 24 24 0 0 1 1428 54 L 1428 380 L 1260 310 Z",

  // Shard 5: Lower-Center Chest Shard (Lower chevron crossing chest fabric)
  shard5_chest:
    "M 640 430 L 1000 500 L 1180 690 L 480 690 Z",

  // Shard 6: Lower-Right Arm & Shoulder Shard
  shard6_right_arm:
    "M 1260 310 L 1428 380 L 1428 666 A 24 24 0 0 1 1404 690 L 1180 690 L 1000 500 Z",
};

export const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const shardWrappers = [
      ".shard-wrapper-1",
      ".shard-wrapper-2",
      ".shard-wrapper-3",
      ".shard-wrapper-4",
      ".shard-wrapper-5",
      ".shard-wrapper-6",
    ];

    if (prefersReducedMotion) {
      gsap.set(shardWrappers, {
        x: 0,
        y: 0,
        z: 0,
        rotateX: 0,
        rotateY: 0,
        rotateZ: 0,
        scale: 1,
        opacity: 1,
        force3D: true,
      });
      return;
    }

    const ctx = gsap.context(() => {
      const isMobile = window.innerWidth < 1024;
      if (isMobile) {
        // Mobile/Tablet mode: clean rest state without scroll pinning
        gsap.set(shardWrappers, {
          x: 0,
          y: 0,
          z: 0,
          rotateX: 0,
          rotateY: 0,
          rotateZ: 0,
          scale: 1,
          opacity: 1,
          force3D: true,
        });
        return;
      }

      // Compact, fast pinning distance: 680px on desktop
      const pinDistance = 680;

      // Base state: 100% assembled, intact, fully visible at top of page
      gsap.set(shardWrappers, {
        x: 0,
        y: 0,
        z: 0,
        rotateX: 0,
        rotateY: 0,
        rotateZ: 0,
        scale: 1,
        opacity: 1,
        transformOrigin: "center center",
        force3D: true,
      });

      // Pin hero over scroll distance with snappy, immediate scrub response (0.3s)
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: `+=${pinDistance}`,
          pin: true,
          pinSpacing: true,
          scrub: 0.3,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const el = document.getElementById("scroll-indicator");
            if (el) {
              if (self.progress > 0.01) {
                el.style.opacity = "0";
                el.style.transform = "translateY(10px)";
                el.style.pointerEvents = "none";
              } else {
                el.style.opacity = "";
                el.style.transform = "";
                el.style.pointerEvents = "auto";
              }
            }
          },
        },
      });

      // 3D FORWARD DISASSEMBLY & FLIGHT for Desktop
      tl.to(
        ".shard-wrapper-1",
        {
          x: -420,
          y: 130,
          z: 460,
          rotateX: -14,
          rotateY: 20,
          rotateZ: -8,
          scale: 1.38,
          ease: "power1.out",
          duration: 0.75,
        },
        0
      );

      tl.to(
        ".shard-wrapper-2",
        {
          x: -120,
          y: -360,
          z: 480,
          rotateX: 24,
          rotateY: -16,
          rotateZ: 14,
          scale: 1.42,
          ease: "power1.out",
          duration: 0.75,
        },
        0
      );

      tl.to(
        ".shard-wrapper-3",
        {
          x: 240,
          y: -280,
          z: 550,
          rotateX: 18,
          rotateY: 22,
          rotateZ: -12,
          scale: 1.48,
          ease: "power1.out",
          duration: 0.75,
        },
        0
      );

      tl.to(
        ".shard-wrapper-4",
        {
          x: 480,
          y: -220,
          z: 460,
          rotateX: -16,
          rotateY: 26,
          rotateZ: 16,
          scale: 1.4,
          ease: "power1.out",
          duration: 0.75,
        },
        0
      );

      tl.to(
        ".shard-wrapper-5",
        {
          x: -80,
          y: 380,
          z: 440,
          rotateX: -22,
          rotateY: -18,
          rotateZ: 12,
          scale: 1.36,
          ease: "power1.out",
          duration: 0.75,
        },
        0
      );

      tl.to(
        ".shard-wrapper-6",
        {
          x: 460,
          y: 300,
          z: 450,
          rotateX: -18,
          rotateY: -24,
          rotateZ: -14,
          scale: 1.38,
          ease: "power1.out",
          duration: 0.75,
        },
        0
      );

      tl.to(
        shardWrappers,
        {
          opacity: 0,
          duration: 0.25,
          ease: "power1.in",
        },
        0.55
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const scrollToNext = () => {
    const nextTarget =
      document.getElementById("stats") ||
      document.querySelector("section[aria-label='At a Glance']") ||
      document.getElementById("about");
    if (nextTarget) {
      nextTarget.scrollIntoView({ behavior: "smooth" });
    } else {
      window.scrollBy({ top: window.innerHeight * 0.9, behavior: "smooth" });
    }
  };

  return (
    <div ref={containerRef} id="hero-scroll-container" className="relative w-full overflow-hidden">
      <section className="relative pt-20 sm:pt-24 lg:pt-28 pb-8 sm:pb-12 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">

        {/* ========================================================================= */}
        {/* 1. DESKTOP 3D SHATTERED GLASS SCENE (Visible on lg: >= 1024px)            */}
        {/* ========================================================================= */}
        <motion.div
          id="glass-scene"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="glass-scene relative hidden lg:flex w-full max-w-[1440px] min-h-[660px] xl:min-h-[700px] items-center overflow-visible bg-transparent pointer-events-none"
          style={{
            perspective: "1400px",
            transformStyle: "preserve-3d",
          }}
        >
          {/* Subtle Radiant Crimson Arrival Bloom as shards lock together */}
          <div
            className="hero-arrival-glow absolute inset-0 pointer-events-none rounded-3xl opacity-0 z-50"
            style={{
              background:
                "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(255, 23, 68, 0.30) 0%, rgba(229, 22, 62, 0.10) 45%, rgba(0, 0, 0, 0) 75%)",
              mixBlendMode: "screen",
            }}
          />

          {/* Global SVG Gradients & Filters for Prismatic Glass Bevels */}
          <svg className="absolute w-0 h-0" aria-hidden="true">
            <defs>
              <filter id="thickGlassDropShadow" x="-15%" y="-15%" width="130%" height="130%">
                <feDropShadow dx="0" dy="10" stdDeviation="10" floodColor="rgba(0,0,0,0.92)" />
                <feDropShadow dx="0" dy="3" stdDeviation="4" floodColor="rgba(0,0,0,0.75)" />
              </filter>

              <linearGradient id="bevelDark" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="rgba(24, 10, 18, 0.98)" />
                <stop offset="50%" stopColor="rgba(8, 3, 6, 0.98)" />
                <stop offset="100%" stopColor="rgba(20, 8, 15, 0.98)" />
              </linearGradient>

              <linearGradient id="bevelFacetRed" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="rgba(255, 60, 95, 0.95)" />
                <stop offset="35%" stopColor="rgba(200, 15, 50, 0.75)" />
                <stop offset="70%" stopColor="rgba(80, 10, 28, 0.85)" />
                <stop offset="100%" stopColor="rgba(255, 30, 70, 0.95)" />
              </linearGradient>

              <linearGradient id="prismaticRimGlow" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="rgba(255, 255, 255, 0.95)" />
                <stop offset="25%" stopColor="rgba(80, 235, 220, 0.85)" />
                <stop offset="65%" stopColor="rgba(255, 30, 75, 0.95)" />
                <stop offset="100%" stopColor="rgba(255, 120, 150, 0.75)" />
              </linearGradient>

              <linearGradient id="facetEdge1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="rgba(255,255,255,0.95)" />
                <stop offset="26%" stopColor="rgba(80,235,220,0.85)" />
                <stop offset="68%" stopColor="rgba(255,30,75,0.95)" />
                <stop offset="100%" stopColor="rgba(255,90,130,0.6)" />
              </linearGradient>

              <linearGradient id="facetEdge2" x1="100%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="rgba(80,235,220,0.85)" />
                <stop offset="42%" stopColor="rgba(255,255,255,0.92)" />
                <stop offset="85%" stopColor="rgba(255,30,75,0.95)" />
              </linearGradient>

              <linearGradient id="facetEdge3" x1="0%" y1="100%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="rgba(255,30,75,0.95)" />
                <stop offset="50%" stopColor="rgba(255,255,255,0.88)" />
                <stop offset="100%" stopColor="rgba(80,235,220,0.85)" />
              </linearGradient>

              <radialGradient id="coreGlowGradient" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="rgba(255, 30, 75, 0.90)" />
                <stop offset="36%" stopColor="rgba(229, 22, 62, 0.65)" />
                <stop offset="68%" stopColor="rgba(142, 8, 44, 0.28)" />
                <stop offset="100%" stopColor="rgba(142, 8, 44, 0)" />
              </radialGradient>

              <filter id="portraitRimGlow" x="-15%" y="-15%" width="130%" height="130%">
                <feDropShadow dx="0" dy="0" stdDeviation="10" floodColor="#ff1744" floodOpacity="0.60" />
                <feDropShadow dx="0" dy="0" stdDeviation="18" floodColor="#e5163e" floodOpacity="0.30" />
              </filter>
            </defs>
          </svg>

          {/* Shard 2 */}
          <div className="shard-wrapper shard-wrapper-2 absolute inset-0 w-full h-full pointer-events-none z-30" style={{ transformStyle: "preserve-3d" }}>
            <MosaicPanel
              id="shard-2-top-mid"
              name="Upper-Middle Angular Shard"
              pathD={SHATTERED_PATHS.shard2_top_mid}
              translateZ={16}
              strokeId="facetEdge3"
              smokeClass="panel-smoke-2"
              hasEnergyHalo={true}
              hasPortrait={false}
            />
          </div>

          {/* Shard 4 */}
          <div className="shard-wrapper shard-wrapper-4 absolute inset-0 w-full h-full pointer-events-none z-28" style={{ transformStyle: "preserve-3d" }}>
            <MosaicPanel
              id="shard-4-top-right"
              name="Upper-Right Glass Shard"
              pathD={SHATTERED_PATHS.shard4_top_right}
              translateZ={18}
              strokeId="facetEdge1"
              smokeClass="panel-smoke-4"
              hasEnergyHalo={true}
              hasPortrait={false}
            />
          </div>

          {/* Shard 6 */}
          <div className="shard-wrapper shard-wrapper-6 absolute inset-0 w-full h-full pointer-events-none z-26" style={{ transformStyle: "preserve-3d" }}>
            <MosaicPanel
              id="shard-6-right-arm"
              name="Lower-Right Arm Shard"
              pathD={SHATTERED_PATHS.shard6_right_arm}
              translateZ={14}
              strokeId="facetEdge2"
              smokeClass="panel-smoke-6"
              hasEnergyHalo={true}
              hasPortrait={true}
            />
          </div>

          {/* Shard 5 */}
          <div className="shard-wrapper shard-wrapper-5 absolute inset-0 w-full h-full pointer-events-none z-35" style={{ transformStyle: "preserve-3d" }}>
            <MosaicPanel
              id="shard-5-chest"
              name="Lower-Center Chest Shard"
              pathD={SHATTERED_PATHS.shard5_chest}
              translateZ={20}
              strokeId="facetEdge1"
              smokeClass="panel-smoke-5"
              hasEnergyHalo={true}
              hasPortrait={true}
            />
          </div>

          {/* Shard 3: Crown & Face Shard */}
          <div className="shard-wrapper shard-wrapper-3 absolute inset-0 w-full h-full pointer-events-none z-40" style={{ transformStyle: "preserve-3d" }}>
            <MosaicPanel
              id="shard-3-face"
              name="Crown & Face Shard"
              pathD={SHATTERED_PATHS.shard3_face}
              translateZ={30}
              strokeId="facetEdge2"
              smokeClass="panel-smoke-3"
              hasEnergyHalo={true}
              hasPortrait={true}
            />
          </div>

          {/* Shard 1: Left Main Text Glass Shard */}
          <div className="shard-wrapper shard-wrapper-1 left-panel-group absolute inset-0 w-full h-full pointer-events-none z-45" style={{ transformStyle: "preserve-3d" }}>
            <MosaicPanel
              id="shard-1-left-text"
              name="Left Text Glass Shard"
              pathD={SHATTERED_PATHS.shard1_text}
              translateZ={24}
              strokeId="facetEdge1"
              smokeClass="panel-smoke-1"
              hasEnergyHalo={false}
              isTextPanel={true}
            >
              <div className="w-full max-w-xl lg:max-w-[42%] px-6 sm:px-10 lg:px-14 xl:px-16 py-8 sm:py-12 flex flex-col items-start justify-center text-left pointer-events-none">
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.45 }}
                  className="mb-2 sm:mb-3 pointer-events-none select-none"
                >
                  <span className="text-xs sm:text-sm font-black uppercase tracking-[0.22em] text-[#E5163E] drop-shadow-[0_0_12px_rgba(229,22,62,0.7)]">
                    AI/ML DEVELOPER
                  </span>
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.65 }}
                  className="text-6xl lg:text-8xl xl:text-9xl font-black uppercase tracking-tight text-white leading-none whitespace-nowrap mb-1 select-none drop-shadow-[0_6px_30px_rgba(0,0,0,0.95)] pointer-events-none"
                >
                  PUNITH
                </motion.h1>

                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.80 }}
                  className="text-lg sm:text-xl lg:text-2xl font-black uppercase tracking-[0.28em] text-[#C8BEC3] mb-3 select-none drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)] pointer-events-none"
                >
                  KUMAR B S
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.95 }}
                  className="text-sm sm:text-base lg:text-lg font-black uppercase tracking-[0.14em] text-white mb-3 flex flex-wrap items-center gap-2 drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)] pointer-events-none select-none"
                >
                  <span>AI/ML DEVELOPER</span>
                </motion.div>

                <motion.p
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1.10 }}
                  className="text-sm sm:text-base text-[#D4C8CD] font-normal leading-relaxed max-w-lg mb-6 sm:mb-8 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] pointer-events-none select-none"
                >
                  Building intelligent systems that solve real-world problems.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1.30 }}
                  className="flex flex-wrap items-center gap-4 sm:gap-5 pointer-events-auto"
                >
                  <a
                    href="#projects"
                    className="group relative inline-flex items-center justify-center bg-[#0c0508] text-white font-black text-xs sm:text-sm uppercase tracking-[0.16em] px-8 sm:px-9 py-3 sm:py-3.5 rounded-full border-2 border-[#E5163E] shadow-[0_0_24px_rgba(229,22,62,0.7)] hover:shadow-[0_0_38px_rgba(255,36,77,0.95)] hover:bg-[#E5163E] hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer select-none"
                  >
                    <span>EXPLORE MY WORK</span>
                  </a>

                  <a
                    href="#contact"
                    className="inline-flex items-center justify-center bg-[rgba(20,10,15,0.7)] hover:bg-[rgba(35,16,25,0.9)] text-white font-black text-xs sm:text-sm uppercase tracking-[0.16em] px-8 sm:px-9 py-3 sm:py-3.5 rounded-full border border-white/20 hover:border-white/40 hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer select-none backdrop-blur-md shadow-[0_4px_16px_rgba(0,0,0,0.4)]"
                  >
                    <span>GET IN TOUCH</span>
                  </a>
                </motion.div>

                {/* Desktop Hero Social Links */}
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1.45 }}
                  className="mt-6 sm:mt-7 flex items-center gap-3 pointer-events-auto select-none"
                >
                  <span className="text-[11px] font-mono font-bold uppercase tracking-[0.2em] text-[#8E8388] mr-1">
                    CONNECT:
                  </span>
                  <a
                    href={profileData.socials.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub Profile"
                    className="w-9 h-9 rounded-full border border-white/15 bg-[#14060e]/80 text-[#D4C8CD] hover:text-white hover:border-[#FF1744] hover:shadow-[0_0_14px_rgba(255,23,68,0.5)] hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center transition-all duration-200 cursor-pointer backdrop-blur-md"
                  >
                    <GithubIcon className="w-4 h-4" />
                  </a>
                  <a
                    href={profileData.socials.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn Profile"
                    className="w-9 h-9 rounded-full border border-white/15 bg-[#14060e]/80 text-[#D4C8CD] hover:text-white hover:border-[#FF1744] hover:shadow-[0_0_14px_rgba(255,23,68,0.5)] hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center transition-all duration-200 cursor-pointer backdrop-blur-md"
                  >
                    <LinkedinIcon className="w-4 h-4" />
                  </a>
                  <a
                    href={`mailto:${profileData.email}`}
                    aria-label="Send direct email"
                    className="w-9 h-9 rounded-full border border-white/15 bg-[#14060e]/80 text-[#D4C8CD] hover:text-white hover:border-[#FF1744] hover:shadow-[0_0_14px_rgba(255,23,68,0.5)] hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center transition-all duration-200 cursor-pointer backdrop-blur-md"
                  >
                    <Mail className="w-4 h-4" />
                  </a>
                </motion.div>
              </div>
            </MosaicPanel>
          </div>
        </motion.div>

        {/* ========================================================================= */}
        {/* 2. MOBILE & TABLET RESPONSIVE HERO (Visible on < 1024px)                  */}
        {/* Adapts the glass-shard composition, stacks cleanly, prevents overflow    */}
        {/* ========================================================================= */}
        <div className="flex lg:hidden flex-col items-center justify-center w-full max-w-xl mx-auto text-center pt-2 pb-4">

          {/* Framed Glass Shard Portrait for Mobile & Tablet */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="relative w-[260px] sm:w-[300px] h-[310px] sm:h-[360px] rounded-2xl overflow-hidden border border-[rgba(255,75,112,0.35)] shadow-[0_20px_50px_rgba(0,0,0,0.9),0_0_25px_rgba(255,23,68,0.3)] backdrop-blur-md mb-6 sm:mb-8"
          >
            {/* Background Obsidian & Smoke Texture */}
            <div className="absolute inset-0 bg-[#060205]" />
            <img
              src="/cinematic-energy-core.jpg"
              alt="Energy Core"
              className="absolute inset-0 w-full h-full object-cover opacity-90 pointer-events-none"
            />

            {/* Radiant Ambient Core Glow */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(255,23,68,0.4)_0%,rgba(5,5,7,0.85)_75%)] pointer-events-none" />

            {/* Punith's Portrait with Natural Proportions */}
            <img
              src="/punith-portrait-final.png"
              alt="Punith Kumar"
              className="absolute inset-0 w-full h-full object-contain object-bottom drop-shadow-[0_0_15px_rgba(255,23,68,0.5)] pointer-events-none"
            />

            {/* Specular Beveled Glass Sheen Line */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#FF1744] to-transparent shadow-[0_0_10px_#FF1744]" />
          </motion.div>

          {/* Typography Block */}
          <div className="flex flex-col items-center w-full px-2">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mb-2"
            >
              <span className="text-xs sm:text-sm font-black uppercase tracking-[0.2em] text-[#E5163E] drop-shadow-[0_0_10px_rgba(229,22,62,0.6)]">
                AI/ML DEVELOPER
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-5xl sm:text-7xl font-black uppercase tracking-tight text-white leading-none drop-shadow-[0_4px_20px_rgba(0,0,0,0.9)]"
            >
              PUNITH
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-lg sm:text-2xl font-black uppercase tracking-[0.28em] text-[#C8BEC3] mt-1 mb-2.5 drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]"
            >
              KUMAR B S
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="text-xs sm:text-base font-black uppercase tracking-[0.14em] text-white mb-3.5 flex flex-wrap items-center justify-center gap-2"
            >
              <span>AI/ML DEVELOPER</span>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="text-xs sm:text-sm text-[#D4C8CD] font-normal leading-relaxed max-w-md mb-6"
            >
              Building intelligent systems that solve real-world problems.
            </motion.p>

            {/* Responsive Touch-Friendly CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4 w-full sm:w-auto px-4"
            >
              <a
                href="#projects"
                className="inline-flex items-center justify-center bg-[#0c0508] text-white font-black text-xs uppercase tracking-[0.16em] px-8 py-3.5 rounded-full border-2 border-[#E5163E] shadow-[0_0_20px_rgba(229,22,62,0.6)] active:scale-95 transition-all cursor-pointer min-h-[44px]"
              >
                <span>EXPLORE MY WORK</span>
              </a>

              <a
                href="#contact"
                className="inline-flex items-center justify-center bg-[rgba(20,10,15,0.7)] text-white font-black text-xs uppercase tracking-[0.16em] px-8 py-3.5 rounded-full border border-white/20 active:scale-95 transition-all cursor-pointer backdrop-blur-md min-h-[44px]"
              >
                <span>GET IN TOUCH</span>
              </a>
            </motion.div>

            {/* Mobile Hero Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="mt-5 flex items-center justify-center gap-3 pointer-events-auto"
            >
              <a
                href={profileData.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub Profile"
                className="w-9 h-9 rounded-full border border-white/15 bg-[#14060e]/80 text-[#D4C8CD] hover:text-white hover:border-[#FF1744] hover:shadow-[0_0_14px_rgba(255,23,68,0.5)] active:scale-95 flex items-center justify-center transition-all cursor-pointer backdrop-blur-md"
              >
                <GithubIcon className="w-4 h-4" />
              </a>
              <a
                href={profileData.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn Profile"
                className="w-9 h-9 rounded-full border border-white/15 bg-[#14060e]/80 text-[#D4C8CD] hover:text-white hover:border-[#FF1744] hover:shadow-[0_0_14px_rgba(255,23,68,0.5)] active:scale-95 flex items-center justify-center transition-all cursor-pointer backdrop-blur-md"
              >
                <LinkedinIcon className="w-4 h-4" />
              </a>
              <a
                href={`mailto:${profileData.email}`}
                aria-label="Send direct email"
                className="w-9 h-9 rounded-full border border-white/15 bg-[#14060e]/80 text-[#D4C8CD] hover:text-white hover:border-[#FF1744] hover:shadow-[0_0_14px_rgba(255,23,68,0.5)] active:scale-95 flex items-center justify-center transition-all cursor-pointer backdrop-blur-md"
              >
                <Mail className="w-4 h-4" />
              </a>
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.button
          id="scroll-indicator"
          onClick={scrollToNext}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="group relative z-30 flex flex-col items-center justify-center cursor-pointer pointer-events-auto mt-4 sm:mt-6 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF1744] rounded-lg py-1 px-2.5 transition-all duration-300 opacity-60 hover:opacity-100 hover:-translate-y-0.5 active:translate-y-0.5 select-none"
          aria-label="Scroll to explore"
        >
          <div className="relative w-4.5 h-7 sm:w-5 sm:h-7.5 rounded-full border border-white/20 group-hover:border-[#FF1744] transition-colors duration-300 flex items-start justify-center p-0.5 shadow-[0_0_8px_rgba(255,23,68,0.18)] group-hover:shadow-[0_0_16px_rgba(255,23,68,0.7)] bg-[#0c0407]/40 backdrop-blur-[2px]">
            <motion.div
              animate={{
                y: [0, 6, 0],
                opacity: [0.85, 0.35, 0.85],
              }}
              transition={{
                duration: 1.8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="w-1 h-1.5 sm:h-2 rounded-full bg-[#FF1744] shadow-[0_0_6px_#FF1744,0_0_8px_rgba(255,23,68,0.7)]"
            />
          </div>
          <span className="mt-1.5 text-[9px] sm:text-[10px] font-semibold uppercase tracking-[0.22em] text-[#8E8388] group-hover:text-white transition-colors duration-300">
            SCROLL TO EXPLORE
          </span>
        </motion.button>
      </section>
    </div>
  );
};
