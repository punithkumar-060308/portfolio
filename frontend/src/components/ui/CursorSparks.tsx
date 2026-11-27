import { useEffect, useRef } from "react";

interface FireSpark {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  initialSize: number;
  life: number;        // 1.0 down to 0.0
  decay: number;
  heat: number;        // 1.0 (white-hot) down to 0.0 (smoky red)
  wobbleSpeed: number;
  wobbleOffset: number;
}

export function CursorSparks() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    let sparks: FireSpark[] = [];
    let animationFrameId: number;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    let lastX = 0;
    let lastY = 0;
    let lastTime = performance.now();

    const onMouseMove = (e: MouseEvent) => {
      const currentX = e.clientX;
      const currentY = e.clientY;
      const currentTime = performance.now();

      const dx = currentX - lastX;
      const dy = currentY - lastY;
      const dist = Math.hypot(dx, dy);
      const dt = Math.max(currentTime - lastTime, 1);
      const speed = dist / dt; // Mouse velocity

      // If moving, spawn authentic fire sparks
      if (dist > 1.5) {
        // Spawn more sparks when moving faster (between 3 and 10 sparks)
        const count = Math.min(Math.max(Math.floor(dist * 0.4), 3), 9);

        for (let i = 0; i < count; i++) {
          // Sparks spray backwards opposite to cursor velocity with spray divergence
          const baseAngle = Math.atan2(-dy, -dx);
          const sprayAngle = baseAngle + (Math.random() - 0.5) * 1.5; // Spread cone
          const sparkSpeed = (Math.random() * 2.8 + 1.2) * (speed * 0.6 + 0.8);

          const size = Math.random() * 2.8 + 1.2;

          sparks.push({
            x: currentX + (Math.random() - 0.5) * 6,
            y: currentY + (Math.random() - 0.5) * 6,
            vx: Math.cos(sprayAngle) * sparkSpeed + (Math.random() - 0.5) * 1.2,
            // Fire buoyancy: upward thermal lift
            vy: Math.sin(sprayAngle) * sparkSpeed - (Math.random() * 1.6 + 0.8),
            size,
            initialSize: size,
            life: 1.0,
            decay: Math.random() * 0.035 + 0.02, // 30-50 frame lifespan
            heat: 1.0, // Starts white-hot
            wobbleSpeed: Math.random() * 0.15 + 0.05,
            wobbleOffset: Math.random() * Math.PI * 2
          });
        }

        lastX = currentX;
        lastY = currentY;
        lastTime = currentTime;
      }
    };

    const onMouseDown = (e: MouseEvent) => {
      // Fire sparks explosion on click
      const burstCount = 14;
      for (let i = 0; i < burstCount; i++) {
        const angle = (Math.PI * 2 * i) / burstCount + (Math.random() - 0.5) * 0.5;
        const sparkSpeed = Math.random() * 4.5 + 2.0;
        const size = Math.random() * 3.0 + 1.5;

        sparks.push({
          x: e.clientX,
          y: e.clientY,
          vx: Math.cos(angle) * sparkSpeed,
          vy: Math.sin(angle) * sparkSpeed - 1.5, // Thermal upward bias
          size,
          initialSize: size,
          life: 1.0,
          decay: Math.random() * 0.03 + 0.02,
          heat: 1.0,
          wobbleSpeed: Math.random() * 0.2 + 0.1,
          wobbleOffset: Math.random() * Math.PI * 2
        });
      }
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("mousedown", onMouseDown, { passive: true });

    let tick = 0;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      tick++;

      // Use additive blending for realistic fire bloom & intense heat
      ctx.globalCompositeOperation = "lighter";

      for (let i = sparks.length - 1; i >= 0; i--) {
        const s = sparks[i];

        // Physics: drag + upward thermal buoyancy + subtle horizontal air wobble
        s.vx *= 0.94;
        s.vy *= 0.94;
        s.vy -= 0.06; // Fire rises
        s.x += s.vx + Math.sin(tick * s.wobbleSpeed + s.wobbleOffset) * 0.4;
        s.y += s.vy;

        s.life -= s.decay;
        s.heat = Math.max(s.life, 0); // Cools down as it lives

        if (s.life <= 0) {
          sparks.splice(i, 1);
          continue;
        }

        // Fire color spectrum based on heat:
        // Heat 0.8 - 1.0: White-Hot Gold (center of fire)
        // Heat 0.5 - 0.8: Fiery Orange
        // Heat 0.2 - 0.5: Intense Crimson Red
        // Heat 0.0 - 0.2: Deep Smoky Ember
        let r = 255;
        let g = 0;
        let b = 0;
        let glowRadius = s.size * 3.5;

        if (s.heat > 0.75) {
          // White-hot flame spark
          g = Math.floor(200 + (s.heat - 0.75) * 220);
          b = Math.floor(80 + (s.heat - 0.75) * 300);
        } else if (s.heat > 0.4) {
          // Burning orange spark
          g = Math.floor(80 + (s.heat - 0.4) * 340);
          b = 10;
        } else {
          // Deep fiery crimson spark
          r = Math.floor(180 + s.heat * 187);
          g = Math.floor(s.heat * 50);
          b = 5;
        }

        const alpha = Math.min(s.life * 1.2, 1);

        // Motion blur velocity streak for flying fire sparks
        const speed = Math.hypot(s.vx, s.vy);
        const tailLength = Math.min(speed * 3.5, 12);
        const tailX = s.x - (s.vx / (speed || 1)) * tailLength;
        const tailY = s.y - (s.vy / (speed || 1)) * tailLength;

        ctx.save();

        // 1. Outer Fire Glow Halo
        const glowGrad = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, glowRadius);
        glowGrad.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${alpha * 0.45})`);
        glowGrad.addColorStop(0.5, `rgba(242, 13, 69, ${alpha * 0.2})`);
        glowGrad.addColorStop(1, "rgba(242, 13, 69, 0)");

        ctx.fillStyle = glowGrad;
        ctx.beginPath();
        ctx.arc(s.x, s.y, glowRadius, 0, Math.PI * 2);
        ctx.fill();

        // 2. Fire Spark Streak / Body
        ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
        ctx.lineWidth = Math.max(s.size * s.life, 0.8);
        ctx.lineCap = "round";
        ctx.beginPath();
        ctx.moveTo(tailX, tailY);
        ctx.lineTo(s.x, s.y);
        ctx.stroke();

        // 3. Hot Spark Core Point
        ctx.fillStyle = `rgba(255, 255, ${Math.floor(b + 50)}, ${alpha})`;
        ctx.beginPath();
        ctx.arc(s.x, s.y, Math.max(s.size * 0.5 * s.life, 0.6), 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousedown", onMouseDown);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-50"
    />
  );
}
