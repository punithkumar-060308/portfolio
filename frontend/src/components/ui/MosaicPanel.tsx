import React, { useRef, useState, useEffect, useCallback } from "react";

export interface MosaicPanelProps {
  id: string;
  name: string;
  pathD: string;
  translateZ: number;
  strokeId: string;
  smokeClass?: string;
  hasEnergyHalo?: boolean;
  hasPortrait?: boolean;
  isTextPanel?: boolean;
  portraitX?: number;
  portraitY?: number;
  portraitWidth?: number;
  portraitHeight?: number;
  children?: React.ReactNode;
}

export const MosaicPanel: React.FC<MosaicPanelProps> = ({
  id,
  name,
  pathD,
  translateZ,
  strokeId,
  smokeClass,
  hasEnergyHalo = false,
  hasPortrait = false,
  isTextPanel = false,
  portraitX = 745,
  portraitY = 30,
  portraitWidth = 635,
  portraitHeight = 755,
  children,
}) => {
  const panelRef = useRef<HTMLDivElement | null>(null);

  // Independent 3D physics and spring-back state per mosaic shard
  const physicsRef = useRef({
    // Temporary drag offset (always springs back to 0, 0)
    dragX: 0,
    dragY: 0,
    dragZ: translateZ,
    targetDragX: 0,
    targetDragY: 0,
    targetDragZ: translateZ,

    // Velocity for natural spring-back return animation
    vx: 0,
    vy: 0,

    // Dynamic 3D lift while dragging (+40px towards camera)
    currentLiftZ: 0,

    // Inertial / hover tilt
    rotX: 0,
    rotY: 0,
    targetRotX: 0,
    targetRotY: 0,

    // Active drag interaction state
    isDragging: false,
    pointerId: -1,
    dragStartX: 0,
    dragStartY: 0,
    startOffsetX: 0,
    startOffsetY: 0,

    // Float blend weight (1.0 = fully floating, 0.0 = paused while dragging)
    floatWeight: 1.0,
  });

  const [isDragging, setIsDragging] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const rectRef = useRef<DOMRect | null>(null);

  // High-performance 60fps/120fps spring animation loop
  useEffect(() => {
    let animId: number;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const animate = () => {
      const p = physicsRef.current;
      const el = panelRef.current;

      // When settled and not interacted with, keep shards 100% stationary and sleep the loop
      const isSettled =
        !p.isDragging &&
        !isHovered &&
        Math.abs(p.dragX) < 0.08 &&
        Math.abs(p.dragY) < 0.08 &&
        Math.abs(p.vx) < 0.08 &&
        Math.abs(p.vy) < 0.08 &&
        Math.abs(p.rotX) < 0.08 &&
        Math.abs(p.rotY) < 0.08 &&
        Math.abs(p.dragZ - translateZ) < 0.1 &&
        Math.abs(p.currentLiftZ) < 0.1;

      if (isSettled) {
        p.dragX = 0;
        p.dragY = 0;
        p.vx = 0;
        p.vy = 0;
        p.rotX = 0;
        p.rotY = 0;
        p.dragZ = translateZ;
        p.currentLiftZ = 0;
        if (el) {
          el.style.transform = `translate3d(0px, 0px, ${translateZ}px)`;
        }
        animId = requestAnimationFrame(animate);
        return;
      }

      if (prefersReducedMotion) {
        p.dragX = p.targetDragX;
        p.dragY = p.targetDragY;
        p.dragZ = p.targetDragZ;
        p.rotX = 0;
        p.rotY = 0;
        if (el) {
          el.style.transform = `translate3d(${p.dragX.toFixed(2)}px, ${p.dragY.toFixed(2)}px, ${p.dragZ.toFixed(2)}px)`;
        }
      } else {
        if (p.isDragging) {
          // Direct responsive tracking during active drag
          const prevX = p.dragX;
          const prevY = p.dragY;
          p.dragX += (p.targetDragX - p.dragX) * 0.42;
          p.dragY += (p.targetDragY - p.dragY) * 0.42;
          p.dragZ += (p.targetDragZ - p.dragZ) * 0.25;

          // Track drag velocity for momentum into spring release
          p.vx = p.dragX - prevX;
          p.vy = p.dragY - prevY;
        } else {
          // Natural damped spring return to exact resting position (0, 0, translateZ)
          const k = 0.055;
          const c = 0.32;

          const ax = (0 - p.dragX) * k - p.vx * c;
          const ay = (0 - p.dragY) * k - p.vy * c;

          p.vx += ax;
          p.vy += ay;
          p.dragX += p.vx;
          p.dragY += p.vy;

          p.dragZ += (translateZ - p.dragZ) * 0.12;

          if (Math.abs(p.dragX) < 0.15 && Math.abs(p.vx) < 0.15) {
            p.dragX = 0;
            p.vx = 0;
          }
          if (Math.abs(p.dragY) < 0.15 && Math.abs(p.vy) < 0.15) {
            p.dragY = 0;
            p.vy = 0;
          }
        }

        // Dynamic 3D lift while dragging (+40px towards camera), returns to 0 on release
        const targetLift = p.isDragging ? 40 : 0;
        p.currentLiftZ += (targetLift - p.currentLiftZ) * 0.16;

        // Smooth lightweight tilt interpolation during hover or drag
        p.rotX += (p.targetRotX - p.rotX) * 0.14;
        p.rotY += (p.targetRotY - p.rotY) * 0.14;

        if (el) {
          const totalX = p.dragX;
          const totalY = p.dragY;
          const totalZ = p.dragZ + p.currentLiftZ;

          el.style.transform = `translate3d(${totalX.toFixed(2)}px, ${totalY.toFixed(2)}px, ${totalZ.toFixed(2)}px) rotateX(${p.rotX.toFixed(2)}deg) rotateY(${p.rotY.toFixed(2)}deg) rotateZ(0deg)`;
        }
      }

      animId = requestAnimationFrame(animate);
    };

    animId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animId);
      document.body.style.userSelect = "";
    };
  }, [translateZ, isHovered]);

  // Pointer Down: Start independent drag
  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    if (e.button !== 0 && e.pointerType === "mouse") return;

    // If clicked on an interactive button/link inside the panel, do not intercept drag
    const target = e.target as HTMLElement;
    if (target.closest("button, a, input, select, textarea, [role='button']")) {
      return;
    }

    e.preventDefault();
    e.stopPropagation();

    const targetEl = e.currentTarget as Element;
    try {
      targetEl.setPointerCapture(e.pointerId);
    } catch {
      // Ignore
    }

    const p = physicsRef.current;
    p.isDragging = true;
    p.pointerId = e.pointerId;
    p.dragStartX = e.clientX;
    p.dragStartY = e.clientY;
    p.startOffsetX = p.dragX;
    p.startOffsetY = p.dragY;

    document.body.style.userSelect = "none";
    setIsDragging(true);
  }, []);

  // Pointer Move: Dragging updates temporary offset; Hover updates 3D tilt
  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    const p = physicsRef.current;
    if (p.isDragging && e.pointerId === p.pointerId) {
      const dx = e.clientX - p.dragStartX;
      const dy = e.clientY - p.dragStartY;

      // Full 360-degree temporary dragging across any direction
      p.targetDragX = p.startOffsetX + dx;
      p.targetDragY = p.startOffsetY + dy;

      // Inertial tilt from mouse velocity
      p.targetRotX = Math.max(-14, Math.min(14, -dy * 0.05));
      p.targetRotY = Math.max(-14, Math.min(14, dx * 0.05));
    } else if (!p.isDragging) {
      // High-performance 3D tilt tracking using cached bounding rect (zero layout thrashing)
      const rect = rectRef.current || (e.currentTarget as Element).getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const normX = (e.clientX - centerX) / (rect.width / 2 || 1);
      const normY = (e.clientY - centerY) / (rect.height / 2 || 1);

      p.targetRotX = Math.max(-8, Math.min(8, -normY * 7));
      p.targetRotY = Math.max(-8, Math.min(8, normX * 7));
    }
  }, []);

  // Pointer Up: Release capture and trigger natural spring-back return to original position
  const handlePointerUp = useCallback((e: React.PointerEvent) => {
    const p = physicsRef.current;
    if (!p.isDragging) return;

    try {
      (e.currentTarget as Element).releasePointerCapture(e.pointerId);
    } catch {
      // Ignore
    }

    p.isDragging = false;
    p.pointerId = -1;

    // Dampen release momentum smoothly into the spring return
    p.vx = Math.max(-10, Math.min(10, p.vx * 0.35));
    p.vy = Math.max(-10, Math.min(10, p.vy * 0.35));

    // Reset target offsets to exact original coordinates (0, 0, translateZ)
    p.targetDragX = 0;
    p.targetDragY = 0;
    p.targetDragZ = translateZ;
    p.targetRotX = 0;
    p.targetRotY = 0;

    document.body.style.userSelect = "";
    setIsDragging(false);
  }, [translateZ]);

  // Wheel interaction: Subtle 3D depth adjustment (springs back when idle or on release)
  const handleWheel = useCallback((e: React.WheelEvent) => {
    e.stopPropagation();
    const p = physicsRef.current;
    p.targetDragZ = Math.max(translateZ - 60, Math.min(translateZ + 80, p.targetDragZ - e.deltaY * 0.25));
  }, [translateZ]);

  const handlePointerEnter = useCallback((e: React.PointerEvent) => {
    setIsHovered(true);
    rectRef.current = (e.currentTarget as Element).getBoundingClientRect();
  }, []);

  const handlePointerLeave = useCallback(() => {
    setIsHovered(false);
    rectRef.current = null;
    const p = physicsRef.current;
    if (!p.isDragging) {
      p.targetRotX = 0;
      p.targetRotY = 0;
    }
  }, []);

  return (
    <div
      ref={panelRef}
      id={id}
      data-panel-name={name}
      className={`absolute inset-0 w-full h-full pointer-events-none select-none transition-shadow duration-300 ${
        isDragging
          ? "z-50 drop-shadow-[0_0_35px_rgba(229,22,62,0.85)]"
          : isHovered
          ? "z-30 drop-shadow-[0_20px_50px_rgba(0,0,0,0.85)]"
          : "z-10"
      }`}
      style={{
        transformStyle: "preserve-3d",
        willChange: "transform",
      }}
    >
      {/* SVG Canvas for Panel Geometry & Portrait Clipping */}
      <svg
        viewBox="0 0 1440 720"
        className="w-full h-full absolute inset-0 overflow-visible pointer-events-none"
        preserveAspectRatio="none"
      >
        <defs>
          {/* Unique clipPath for this panel's exact boundary */}
          <clipPath id={`clip-${id}`} clipPathUnits="userSpaceOnUse">
            <path d={pathD} />
          </clipPath>

          {/* Specular glass reflection gradient */}
          <linearGradient id={`sheen-${id}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.09)" />
            <stop offset="35%" stopColor="rgba(255,255,255,0.02)" />
            <stop offset="60%" stopColor="rgba(64,224,208,0.05)" />
            <stop offset="100%" stopColor="rgba(229,22,62,0.03)" />
          </linearGradient>
        </defs>

        {/* Panel Content Clipped by its Exact Geometric Boundary */}
        <g clipPath={`url(#clip-${id})`}>
          {/* 1. Panel's Own Deep Obsidian Base (Clipped strictly to this shard's geometry) */}
          <rect width="1440" height="720" fill="#060205" />

          {/* 2. Panel's Own Clipped Animated Crimson Smoke Background Texture */}
          <g className={smokeClass || ""}>
            <image
              href="/cinematic-energy-core.jpg"
              x="0"
              y="0"
              width="1440"
              height="720"
              preserveAspectRatio="xMidYMid slice"
              className="select-none pointer-events-none opacity-95"
            />
          </g>

          {/* 3. Panel's Own Radiant Energy Halo (for shards around head & chest) */}
          {hasEnergyHalo && (
            <ellipse
              cx="1060"
              cy="245"
              rx="315"
              ry="315"
              fill="url(#coreGlowGradient)"
              className="animate-pulse-slow pointer-events-none"
              opacity="0.85"
            />
          )}

          {/* 4. Dark Translucent Glass Surface Tint */}
          <path
            d={pathD}
            fill="rgba(10, 4, 8, 0.22)"
            className="transition-colors duration-200 pointer-events-none"
          />

          {/* 5. Shared High-Res Portrait Layer (Identical placement across all mosaic panels) */}
          {hasPortrait && (
            <>
              {/* Subtle Red Rim Light Silhouette behind Hair & Shoulders */}
              <image
                href="/punith-portrait-final.png"
                x={portraitX}
                y={portraitY}
                width={portraitWidth}
                height={portraitHeight}
                preserveAspectRatio="xMidYMax meet"
                filter="url(#portraitRimGlow)"
                className="select-none pointer-events-none opacity-85"
              />
              {/* Original High-Res Portrait */}
              <image
                href="/punith-portrait-final.png"
                x={portraitX}
                y={portraitY}
                width={portraitWidth}
                height={portraitHeight}
                preserveAspectRatio="xMidYMax meet"
                className="select-none pointer-events-none"
              />
            </>
          )}

          {/* 6. Subtle Glass Surface Reflection Overlay */}
          <path
            d={pathD}
            fill={`url(#sheen-${id})`}
            opacity={isHovered || isDragging ? 0.75 : 0.4}
            className="transition-opacity duration-300 pointer-events-none"
          />

          {/* 7. Inner Bevel Shadow for Visible Glass Slab Depth */}
          <path
            d={pathD}
            fill="none"
            stroke="rgba(0, 0, 0, 0.70)"
            strokeWidth="14"
            className="pointer-events-none"
          />
        </g>

        {/* ========================================================================= */}
        {/* 3D BEVELED GLASS STRUCTURE (Visible thickness, dark bevel & red highlights) */}
        {/* ========================================================================= */}

        {/* 1. Deep Obsidian Bevel Rim (14px thickness with ambient depth shadow) */}
        <path
          d={pathD}
          fill="none"
          stroke="url(#bevelDark)"
          strokeWidth="14"
          strokeLinejoin="round"
          strokeLinecap="round"
          filter="url(#thickGlassDropShadow)"
          className="pointer-events-none"
        />

        {/* 2. Angled Bevel Chamfer Facet (6.5px reflective red/crimson gradient) */}
        <path
          d={pathD}
          fill="none"
          stroke="url(#bevelFacetRed)"
          strokeWidth="6.5"
          strokeLinejoin="round"
          strokeLinecap="round"
          className="pointer-events-none opacity-85"
        />

        {/* 3. Razor-Sharp Prismatic Glass Specular Rim */}
        <path
          d={pathD}
          fill="none"
          stroke={`url(#${strokeId})`}
          strokeWidth="2.4"
          strokeLinejoin="round"
          strokeLinecap="round"
          filter="url(#facetGlow)"
          className="pointer-events-none transition-opacity duration-200"
          opacity={isDragging ? 1 : isHovered ? 1 : 0.88}
        />

        {/* 4. Full-Surface Interactive Drag & Depth Plane (covers entire polygon area) */}
        <path
          d={pathD}
          fill="rgba(255,255,255,0.001)"
          pointerEvents="all"
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          onPointerEnter={handlePointerEnter}
          onPointerLeave={handlePointerLeave}
          onWheel={handleWheel}
          className={`pointer-events-auto touch-none ${
            isDragging ? "cursor-grabbing" : "cursor-grab"
          }`}
          style={{ pointerEvents: "all" }}
        />
      </svg>

      {/* Embedded Children (Typography, CTA Buttons for Text Panel) */}
      {isTextPanel && children && (
        <div
          className="absolute inset-0 w-full h-full pointer-events-none flex items-center"
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          onPointerEnter={handlePointerEnter}
          onPointerLeave={handlePointerLeave}
          onWheel={handleWheel}
        >
          {children}
        </div>
      )}
    </div>
  );
};
