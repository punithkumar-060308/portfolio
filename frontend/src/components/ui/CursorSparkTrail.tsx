import React, { useEffect, useRef } from "react";

interface SparkParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  initialSize: number;
  color: string;
  glowColor: string;
  life: number;        // 1.0 down to 0
  decay: number;       // rate per ms
  isStreak: boolean;   // elongated spark streak vs glowing dot
  length: number;      // for streaks
}

// Cinematic Neon Red / Crimson / Soft Pink / Fiery Orange Palette
const PALETTE = [
  { color: "#ff1744", glow: "rgba(255, 23, 68, 0.85)" },   // Neon red (primary)
  { color: "#e5163e", glow: "rgba(229, 22, 62, 0.85)" },   // Bright crimson
  { color: "#ff5252", glow: "rgba(255, 82, 82, 0.75)" },   // Coral crimson
  { color: "#ff80ab", glow: "rgba(255, 128, 171, 0.80)" }, // Soft glowing pink
  { color: "#ff9100", glow: "rgba(255, 145, 0, 0.85)" },   // Fiery orange
  { color: "#fff0f3", glow: "rgba(255, 23, 68, 0.95)" },   // White-hot core
];

export const CursorSparkTrail: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const dotRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Disable on touch-only mobile devices without fine pointer
    const isTouchOnly =
      window.matchMedia("(pointer: coarse)").matches &&
      !window.matchMedia("(pointer: fine)").matches;
    if (isTouchOnly) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const canvas = canvasRef.current;
    const dotEl = dotRef.current;
    const ringEl = ringRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    // Mouse positions:
    // Real mouse position updated directly on pointermove
    let mouseX = -100;
    let mouseY = -100;
    let prevMouseX = -100;
    let prevMouseY = -100;

    // Follower ring position (very responsive, subtle trailing)
    let ringX = -100;
    let ringY = -100;

    let isHoveringInteractive = false;
    let isMouseDown = false;
    let isVisible = false;

    let particles: SparkParticle[] = [];
    const MAX_PARTICLES = 140;

    let animId = 0;
    let isRunning = false;
    let lastFrameTime = performance.now();

    const spawnSparks = (x1: number, y1: number, x2: number, y2: number, speed: number) => {
      const dist = Math.hypot(x2 - x1, y2 - y1);
      if (dist < 1.2) return;

      // Rate scales with cursor speed
      const baseCount = Math.min(Math.floor(dist * 0.18) + 1, 5);
      const count = speed > 18 ? baseCount + 2 : baseCount;

      for (let i = 0; i < count; i++) {
        if (particles.length >= MAX_PARTICLES) {
          particles.shift();
        }

        // Interpolate along path
        const t = Math.random();
        const px = x1 + (x2 - x1) * t;
        const py = y1 + (y2 - y1) * t;

        const mouseAngle = Math.atan2(y2 - y1, x2 - x1);
        const scatterAngle = mouseAngle + (Math.random() - 0.5) * Math.PI * 1.5;
        const scatterSpeed = 0.35 + Math.random() * 2.4;

        // Subtle backward trailing drift
        const vx = -Math.cos(mouseAngle) * 0.3 + Math.cos(scatterAngle) * scatterSpeed;
        const vy = -Math.sin(mouseAngle) * 0.3 + Math.sin(scatterAngle) * scatterSpeed;

        const isStreak = Math.random() < 0.25;
        const colorItem = PALETTE[Math.floor(Math.random() * PALETTE.length)];
        const lifespanMs = 350 + Math.random() * 450; // fast, crisp 350-800ms

        particles.push({
          x: px,
          y: py,
          vx,
          vy,
          size: isStreak ? 1.4 + Math.random() * 1.5 : 1.1 + Math.random() * 2.0,
          initialSize: isStreak ? 1.4 + Math.random() * 1.5 : 1.1 + Math.random() * 2.0,
          color: colorItem.color,
          glowColor: colorItem.glow,
          life: 1.0,
          decay: 1 / lifespanMs,
          isStreak,
          length: 4 + Math.random() * 7,
        });
      }
    };

    const startLoop = () => {
      if (!isRunning) {
        isRunning = true;
        lastFrameTime = performance.now();
        animId = requestAnimationFrame(loop);
      }
    };

    const stopLoop = () => {
      if (isRunning) {
        isRunning = false;
        cancelAnimationFrame(animId);
      }
    };

    const handlePointerMove = (e: PointerEvent) => {
      if (e.pointerType === "touch") return;

      const currentX = e.clientX;
      const currentY = e.clientY;

      if (!isVisible) {
        isVisible = true;
        ringX = currentX;
        ringY = currentY;
        if (dotEl) dotEl.style.opacity = "1";
        if (ringEl) ringEl.style.opacity = "1";
      }

      if (prevMouseX === -100) {
        prevMouseX = currentX;
        prevMouseY = currentY;
      } else {
        const dx = currentX - prevMouseX;
        const dy = currentY - prevMouseY;
        const dist = Math.hypot(dx, dy);
        spawnSparks(prevMouseX, prevMouseY, currentX, currentY, dist);
        prevMouseX = currentX;
        prevMouseY = currentY;
      }

      mouseX = currentX;
      mouseY = currentY;

      // Update the main cursor dot IMMEDIATELY without rAF delay or smoothing lag
      if (dotEl) {
        dotEl.style.transform = `translate3d(${currentX}px, ${currentY}px, 0) translate(-50%, -50%)`;
      }

      // Check if hovering over clickable/interactive element
      const target = e.target as HTMLElement | null;
      if (target) {
        const interactive = !!target.closest("a, button, input, textarea, select, [role='button'], [tabindex], .cursor-pointer");
        if (interactive !== isHoveringInteractive) {
          isHoveringInteractive = interactive;
          if (dotEl) {
            dotEl.style.width = isHoveringInteractive ? "6px" : "5px";
            dotEl.style.height = isHoveringInteractive ? "6px" : "5px";
            dotEl.style.backgroundColor = isHoveringInteractive ? "#ffffff" : "#ff244d";
            dotEl.style.boxShadow = isHoveringInteractive
              ? "0 0 12px #ff1744, 0 0 6px #ffffff"
              : "0 0 8px #ff1744";
          }
          if (ringEl) {
            ringEl.style.borderColor = isHoveringInteractive ? "rgba(255, 36, 77, 0.95)" : "rgba(255, 23, 68, 0.55)";
            ringEl.style.boxShadow = isHoveringInteractive
              ? "0 0 16px rgba(255, 23, 68, 0.6), inset 0 0 8px rgba(255, 23, 68, 0.3)"
              : "0 0 8px rgba(255, 23, 68, 0.25)";
          }
        }
      }

      startLoop();
    };

    const handlePointerDown = () => {
      isMouseDown = true;
      if (ringEl) {
        ringEl.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%) scale(0.75)`;
      }
    };

    const handlePointerUp = () => {
      isMouseDown = false;
    };

    const handlePointerLeave = () => {
      isVisible = false;
      prevMouseX = -100;
      prevMouseY = -100;
      if (dotEl) dotEl.style.opacity = "0";
      if (ringEl) ringEl.style.opacity = "0";
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("pointerdown", handlePointerDown, { passive: true });
    window.addEventListener("pointerup", handlePointerUp, { passive: true });
    document.addEventListener("pointerleave", handlePointerLeave, { passive: true });
    window.addEventListener("resize", resize, { passive: true });

    const loop = (currentTime: number) => {
      if (!isRunning) return;

      const dt = Math.min(currentTime - lastFrameTime, 35);
      lastFrameTime = currentTime;

      // Ultra-fast responsive tracking for ring follower (0.42 interpolation = ~3 frames, 0 noticeable lag)
      if (isVisible) {
        const ringDx = mouseX - ringX;
        const ringDy = mouseY - ringY;
        ringX += ringDx * 0.42;
        ringY += ringDy * 0.42;

        if (ringEl) {
          const scale = isMouseDown ? 0.75 : isHoveringInteractive ? 1.45 : 1.0;
          ringEl.style.transform = `translate3d(${ringX.toFixed(1)}px, ${ringY.toFixed(1)}px, 0) translate(-50%, -50%) scale(${scale})`;
        }
      }

      ctx.clearRect(0, 0, width, height);

      if (particles.length > 0) {
        ctx.save();
        ctx.globalCompositeOperation = "lighter";

        let writeIndex = 0;
        const len = particles.length;

        for (let i = 0; i < len; i++) {
          const p = particles[i];
          p.life -= p.decay * dt;

          if (p.life <= 0) continue;

          p.x += p.vx * (dt / 16);
          p.y += p.vy * (dt / 16);
          p.vx *= 0.94;
          p.vy *= 0.94;
          p.vy += 0.02;

          const alpha = Math.max(0, p.life * (2 - p.life));
          const currentSize = p.initialSize * (0.35 + 0.65 * p.life);

          if (p.isStreak) {
            const speed = Math.hypot(p.vx, p.vy);
            const angle = Math.atan2(p.vy, p.vx);
            const streakLen = p.length * Math.min(speed * 0.8 + 0.6, 2.0) * p.life;

            ctx.save();
            ctx.translate(p.x, p.y);
            ctx.rotate(angle);

            // Wide outer bloom stroke
            ctx.beginPath();
            ctx.moveTo(-streakLen * 0.6, 0);
            ctx.lineTo(streakLen * 0.6, 0);
            ctx.strokeStyle = p.glowColor;
            ctx.globalAlpha = alpha * 0.45;
            ctx.lineWidth = currentSize * 2.2;
            ctx.lineCap = "round";
            ctx.stroke();

            // Mid vibrant color stroke
            ctx.beginPath();
            ctx.moveTo(-streakLen * 0.5, 0);
            ctx.lineTo(streakLen * 0.5, 0);
            ctx.strokeStyle = p.color;
            ctx.globalAlpha = alpha;
            ctx.lineWidth = currentSize * 0.85;
            ctx.stroke();

            // Inner hot white core stroke
            ctx.beginPath();
            ctx.moveTo(-streakLen * 0.25, 0);
            ctx.lineTo(streakLen * 0.25, 0);
            ctx.strokeStyle = "#ffffff";
            ctx.globalAlpha = alpha * 0.85;
            ctx.lineWidth = currentSize * 0.4;
            ctx.stroke();

            ctx.restore();
          } else {
            // Soft glowing round ember
            ctx.beginPath();
            ctx.arc(p.x, p.y, currentSize * 2.2, 0, Math.PI * 2);
            ctx.fillStyle = p.glowColor;
            ctx.globalAlpha = alpha * 0.38;
            ctx.fill();

            ctx.beginPath();
            ctx.arc(p.x, p.y, currentSize, 0, Math.PI * 2);
            ctx.fillStyle = p.color;
            ctx.globalAlpha = alpha;
            ctx.fill();

            if (currentSize > 1.1) {
              ctx.beginPath();
              ctx.arc(p.x, p.y, currentSize * 0.45, 0, Math.PI * 2);
              ctx.fillStyle = "#ffffff";
              ctx.globalAlpha = alpha * 0.9;
              ctx.fill();
            }
          }

          particles[writeIndex++] = p;
        }

        particles.length = writeIndex;
        ctx.restore();
      }

      // Check if we should keep animating:
      // Loop runs if particles exist OR if ring is still catching up to mouse (> 0.2px)
      const ringDist = Math.hypot(mouseX - ringX, mouseY - ringY);
      if (particles.length > 0 || ringDist > 0.2) {
        animId = requestAnimationFrame(loop);
      } else {
        isRunning = false;
      }
    };

    return () => {
      stopLoop();
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("pointerup", handlePointerUp);
      document.removeEventListener("pointerleave", handlePointerLeave);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <>
      {/* Spark canvas behind foreground content */}
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="fixed inset-0 pointer-events-none z-[2]"
        style={{
          width: "100vw",
          height: "100vh",
        }}
      />

      {/* Main cursor dot: zero latency, sticks instantly to mouse pointer */}
      <div
        ref={dotRef}
        aria-hidden="true"
        className="fixed top-0 left-0 pointer-events-none z-[9999] opacity-0 will-change-transform"
        style={{
          width: "5px",
          height: "5px",
          borderRadius: "50%",
          backgroundColor: "#ff244d",
          boxShadow: "0 0 8px #ff1744, 0 0 3px #ffffff",
          transform: "translate3d(-100px, -100px, 0)",
          transition: "opacity 0.2s ease, width 0.15s ease, height 0.15s ease, background-color 0.15s ease, box-shadow 0.15s ease",
        }}
      />

      {/* Smooth trailing glow ring: high responsiveness, subtle physical delay */}
      <div
        ref={ringRef}
        aria-hidden="true"
        className="fixed top-0 left-0 pointer-events-none z-[9998] opacity-0 will-change-transform"
        style={{
          width: "28px",
          height: "28px",
          borderRadius: "50%",
          border: "1.5px solid rgba(255, 23, 68, 0.55)",
          boxShadow: "0 0 8px rgba(255, 23, 68, 0.25)",
          transform: "translate3d(-100px, -100px, 0)",
          transition: "opacity 0.25s ease, border-color 0.2s ease, box-shadow 0.2s ease",
        }}
      />
    </>
  );
};
