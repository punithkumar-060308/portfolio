import React, { useRef, useState, useEffect, useCallback } from "react";

interface InteractiveGlassPanelProps {
  id: string;
  name?: string;
  className?: string;
  style?: React.CSSProperties;
  translateZ?: number; // Predefined resting translateZ depth
  children?: React.ReactNode;
}

export const InteractiveGlassPanel: React.FC<InteractiveGlassPanelProps> = ({
  id,
  name,
  className = "",
  style = {},
  translateZ = 16,
  children,
}) => {
  const panelRef = useRef<HTMLDivElement | null>(null);

  // Independent physics state per panel
  const physicsRef = useRef({
    // Position offset from predefined resting position
    x: 0,
    y: 0,
    targetX: 0,
    targetY: 0,
    vx: 0,
    vy: 0,
    // 3D Tilt angles (limited to ~8 degrees)
    rotX: 0,
    rotY: 0,
    targetRotX: 0,
    targetRotY: 0,
    // Dynamic Z depth with lift during dragging
    currentZ: translateZ,
    targetZ: translateZ,
    // Drag state
    isDragging: false,
    pointerId: -1,
    dragStartX: 0,
    dragStartY: 0,
    startOffsetX: 0,
    startOffsetY: 0,
    // Container clamping bounds
    minX: -500,
    maxX: 500,
    minY: -500,
    maxY: 500,
  });

  const [isDragging, setIsDragging] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Spring physics loop running at 60/120fps via requestAnimationFrame
  useEffect(() => {
    let animId: number;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const animate = () => {
      const p = physicsRef.current;
      const el = panelRef.current;

      if (prefersReducedMotion) {
        p.x = p.targetX;
        p.y = p.targetY;
        p.rotX = 0;
        p.rotY = 0;
        p.currentZ = p.targetZ;
      } else {
        // High quality damped spring physics
        if (p.isDragging) {
          // Responsive tracking while dragging
          p.x += (p.targetX - p.x) * 0.35;
          p.y += (p.targetY - p.y) * 0.35;
          p.vx = 0;
          p.vy = 0;
        } else {
          // Damped spring return when released
          const stiffness = 0.18;
          const damping = 0.80;
          p.vx = (p.vx + (p.targetX - p.x) * stiffness) * damping;
          p.x += p.vx;
          p.vy = (p.vy + (p.targetY - p.y) * stiffness) * damping;
          p.y += p.vy;

          // Snap to exact resting position when near zero to eliminate micro-vibrations
          if (Math.abs(p.x) < 0.25 && Math.abs(p.vx) < 0.25) {
            p.x = 0;
            p.vx = 0;
          }
          if (Math.abs(p.y) < 0.25 && Math.abs(p.vy) < 0.25) {
            p.y = 0;
            p.vy = 0;
          }
        }

        // Smooth spring for 3D tilt
        p.rotX += (p.targetRotX - p.rotX) * 0.14;
        p.rotY += (p.targetRotY - p.rotY) * 0.14;

        // Smooth spring for Z depth (lifts while dragging)
        p.currentZ += (p.targetZ - p.currentZ) * 0.15;
      }

      if (el) {
        el.style.transform = `translate3d(${p.x.toFixed(2)}px, ${p.y.toFixed(2)}px, ${p.currentZ.toFixed(2)}px) rotateX(${p.rotX.toFixed(2)}deg) rotateY(${p.rotY.toFixed(2)}deg)`;
      }

      animId = requestAnimationFrame(animate);
    };

    animId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animId);
      document.body.style.userSelect = "";
    };
  }, [translateZ]);

  // Pointer Down: Start dragging and capture pointer
  const handlePointerDown = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    // Only primary button (left mouse click or touch)
    if (e.button !== 0 && e.pointerType === "mouse") return;

    // Do not initiate drag if user clicked an interactive CTA button or link
    const target = e.target as HTMLElement;
    if (target.closest("button") || target.closest("a") || target.closest("input")) {
      return;
    }

    const el = panelRef.current;
    if (!el) return;

    // Find parent glass-scene container to compute clamping constraints
    const scene = el.closest(".glass-scene") || el.parentElement;
    if (!scene) return;

    e.preventDefault();
    e.stopPropagation();

    try {
      el.setPointerCapture(e.pointerId);
    } catch {
      // Ignore if not supported
    }

    const p = physicsRef.current;
    p.isDragging = true;
    p.pointerId = e.pointerId;
    p.dragStartX = e.clientX;
    p.dragStartY = e.clientY;
    p.startOffsetX = p.x;
    p.startOffsetY = p.y;

    // Calculate exact scene bounding box to prevent escaping the container
    const elRect = el.getBoundingClientRect();
    const sceneRect = scene.getBoundingClientRect();

    // Resting positions without current transform offset
    const restLeft = elRect.left - p.x;
    const restRight = elRect.right - p.x;
    const restTop = elRect.top - p.y;
    const restBottom = elRect.bottom - p.y;

    // Strict boundary clamps within glass-scene with 16px safety margin for 3D perspective projection
    const padding = 16;
    p.minX = (sceneRect.left + padding) - restLeft;
    p.maxX = (sceneRect.right - padding) - restRight;
    p.minY = (sceneRect.top + padding) - restTop;
    p.maxY = (sceneRect.bottom - padding) - restBottom;

    if (p.maxX < p.minX) p.maxX = p.minX;
    if (p.maxY < p.minY) p.maxY = p.minY;

    // Slight Z-depth lift while dragging
    p.targetZ = translateZ + 35;

    // Prevent text selection during drag
    document.body.style.userSelect = "none";
    setIsDragging(true);
  }, [translateZ]);

  // Pointer Move: Dragging updates position; Hover updates 3D tilt
  const handlePointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    const p = physicsRef.current;
    const el = panelRef.current;
    if (!el) return;

    if (p.isDragging && e.pointerId === p.pointerId) {
      const dx = e.clientX - p.dragStartX;
      const dy = e.clientY - p.dragStartY;

      // Constrain movement strictly within glass-scene container
      const newX = p.startOffsetX + dx;
      const newY = p.startOffsetY + dy;

      p.targetX = Math.max(p.minX, Math.min(p.maxX, newX));
      p.targetY = Math.max(p.minY, Math.min(p.maxY, newY));

      // Dynamic tilt during dragging (limited to ~8 deg)
      p.targetRotX = Math.max(-8, Math.min(8, -dy * 0.05));
      p.targetRotY = Math.max(-8, Math.min(8, dx * 0.05));
    } else if (!p.isDragging) {
      // Cursor movement produces 3D tilt (limited to ~8 deg)
      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const normX = (e.clientX - centerX) / (rect.width / 2 || 1);
      const normY = (e.clientY - centerY) / (rect.height / 2 || 1);

      p.targetRotX = Math.max(-8, Math.min(8, -normY * 8));
      p.targetRotY = Math.max(-8, Math.min(8, normX * 8));
    }
  }, []);

  // Pointer Up / Cancel: End dragging and spring back smoothly to original position
  const handlePointerUp = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    const p = physicsRef.current;
    if (!p.isDragging) return;

    const el = panelRef.current;
    if (el) {
      try {
        if (el.hasPointerCapture(e.pointerId)) {
          el.releasePointerCapture(e.pointerId);
        }
      } catch {
        // Ignore
      }
    }

    p.isDragging = false;
    p.pointerId = -1;

    // Spring-based return to original resting position (0, 0, translateZ)
    p.targetX = 0;
    p.targetY = 0;
    p.targetRotX = 0;
    p.targetRotY = 0;
    p.targetZ = translateZ;

    document.body.style.userSelect = "";
    setIsDragging(false);
  }, [translateZ]);

  const handlePointerEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  // Pointer Leave: Reset tilt smoothly
  const handlePointerLeave = useCallback(() => {
    setIsHovered(false);
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
      aria-label={name || id}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      className={`touch-none select-none pointer-events-auto ${
        isDragging
          ? "cursor-grabbing z-40 shadow-[0_24px_50px_rgba(0,0,0,0.8)] filter brightness-110"
          : isHovered
          ? "cursor-grab filter brightness-105"
          : "cursor-grab"
      } ${className}`}
      style={{
        transformStyle: "preserve-3d",
        willChange: "transform",
        ...style,
      }}
    >
      {children}
    </div>
  );
};
