import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  vz: number;
  radius: number;
  alpha: number;
  phase: number;
  isBright: boolean;
  push: number;
  screenX: number;
  screenY: number;
  screenRadius: number;
}

interface Ripple {
  x: number;
  y: number;
  startedAt: number;
}

interface ShootingStar {
  x: number;
  y: number;
  velocityX: number;
  velocityY: number;
  life: number;
}

const DEPTH_RANGE = 1800;
const FOCAL_LENGTH = 650;
const MAX_PIXEL_RATIO = 1.5;

const wrapDepth = (depth: number) => ((depth % DEPTH_RANGE) + DEPTH_RANGE) % DEPTH_RANGE;

export function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d", { alpha: true });
    if (!canvas || !context) return;

    const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let width = window.innerWidth;
    let height = window.innerHeight;
    let pixelRatio = 1;
    let animationFrame = 0;
    let lastFrameTime = 0;
    let cameraOffset = window.scrollY * 0.42;
    let previousCameraOffset = cameraOffset;
    let targetCameraOffset = cameraOffset;
    let nextShootingStarAt = performance.now() + 7000 + Math.random() * 8000;
    let shootingStar: ShootingStar | null = null;
    let tabIsVisible = !document.hidden;
    let pointerX = width / 2;
    let pointerY = height / 2;
    let pointerActive = false;
    let particles: Particle[] = [];
    const ripples: Ripple[] = [];

    const isMobile = window.matchMedia("(max-width: 700px)").matches;
    const particleCount = isMobile ? 55 : 135;

    const createParticle = (depth?: number): Particle => {
      const z = depth ?? Math.random() * DEPTH_RANGE;
      const spread = (z + FOCAL_LENGTH) / FOCAL_LENGTH;
      const isBright = Math.random() < 0.075;
      const speed = 0.25 + Math.random() * 0.85;
      const direction = Math.random() * Math.PI * 2;

      return {
        x: (Math.random() - 0.5) * width * 1.25 * spread,
        y: (Math.random() - 0.5) * height * 1.25 * spread,
        z,
        vx: Math.cos(direction) * speed,
        vy: Math.sin(direction) * speed,
        vz: (Math.random() - 0.5) * speed,
        radius: isBright ? 3 + Math.random() * 1.5 : 1.7 + Math.random() * 1.1,
        alpha: isBright ? 0.9 + Math.random() * 0.1 : 0.56 + Math.random() * 0.34,
        phase: Math.random() * Math.PI * 2,
        isBright,
        push: 0,
        screenX: 0,
        screenY: 0,
        screenRadius: 0,
      };
    };

    const resize = () => {
      const previousWidth = width;
      const previousHeight = height;
      width = window.innerWidth;
      height = window.innerHeight;
      pixelRatio = Math.min(window.devicePixelRatio || 1, MAX_PIXEL_RATIO);

      canvas.width = Math.round(width * pixelRatio);
      canvas.height = Math.round(height * pixelRatio);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);

      if (previousWidth > 0 && previousHeight > 0) {
        const scaleX = width / previousWidth;
        const scaleY = height / previousHeight;
        particles.forEach((particle) => {
          particle.x *= scaleX;
          particle.y *= scaleY;
        });
      }

      if (motionPreference.matches) drawFrame(performance.now(), 0);
    };

    const drawFrame = (now: number, deltaSeconds: number) => {
      context.clearRect(0, 0, width, height);

      if (!motionPreference.matches) {
        const blend = 1 - Math.exp(-Math.min(deltaSeconds, 0.05) * 5);
        cameraOffset += (targetCameraOffset - cameraOffset) * blend;
      }

      const scrollVelocity = deltaSeconds > 0
        ? (cameraOffset - previousCameraOffset) / deltaSeconds
        : 0;
      previousCameraOffset = cameraOffset;

      for (const particle of particles) {
        if (!motionPreference.matches) {
          particle.phase += deltaSeconds * (0.35 + particle.radius * 0.2);
          particle.x += particle.vx * deltaSeconds * 16;
          particle.y += particle.vy * deltaSeconds * 16;
          particle.z += particle.vz * deltaSeconds * 110;
          if (particle.push > 0) {
            particle.push = Math.min(particle.push + deltaSeconds * 1400, DEPTH_RANGE);
          }
        }

        const depth = wrapDepth(particle.z - cameraOffset + particle.push);
        const perspective = FOCAL_LENGTH / (depth + FOCAL_LENGTH);
        const halfWorldWidth = width / (2 * perspective);
        const halfWorldHeight = height / (2 * perspective);
        if (particle.x < -halfWorldWidth) particle.x = halfWorldWidth;
        if (particle.x > halfWorldWidth) particle.x = -halfWorldWidth;
        if (particle.y < -halfWorldHeight) particle.y = halfWorldHeight;
        if (particle.y > halfWorldHeight) particle.y = -halfWorldHeight;
        const parallaxX = pointerActive && !motionPreference.matches
          ? ((pointerX / width) - 0.5) * 7 * perspective
          : 0;
        const parallaxY = pointerActive && !motionPreference.matches
          ? ((pointerY / height) - 0.5) * 7 * perspective
          : 0;
        let screenX = width / 2 + particle.x * perspective + parallaxX;
        let screenY = height / 2 + particle.y * perspective + parallaxY;
        let proximity = 0;

        if (pointerActive && !motionPreference.matches) {
          const dx = screenX - pointerX;
          const dy = screenY - pointerY;
          const distance = Math.hypot(dx, dy);
          const influence = Math.max(0, 1 - distance / 125) * perspective;
          if (distance > 0 && influence > 0) {
            screenX += (dx / distance) * influence * 12;
            screenY += (dy / distance) * influence * 12;
            proximity = influence;
          }
        }

        const depthBrightness = 0.72 + (1 - depth / DEPTH_RANGE) * 0.28;
        const twinkle = motionPreference.matches ? 1 : 0.86 + Math.sin(particle.phase) * 0.14;
        const opacity = Math.max(0, particle.alpha * depthBrightness * twinkle);
        const radius = Math.max(particle.isBright ? 2.8 : 1.9, particle.radius * perspective);
        const fade = particle.push > 0 ? Math.max(0, 1 - particle.push / DEPTH_RANGE) : 1;

        particle.screenX = screenX;
        particle.screenY = screenY;
        particle.screenRadius = radius;

        if (Math.abs(scrollVelocity) > 80 && depth < 900 && fade > 0.1) {
          const trailLength = Math.min(20, Math.abs(scrollVelocity) * 0.004) * perspective;
          const directionX = screenX - width / 2;
          const directionY = screenY - height / 2;
          const directionLength = Math.hypot(directionX, directionY) || 1;
          context.beginPath();
          context.moveTo(
            screenX - (directionX / directionLength) * trailLength,
            screenY - (directionY / directionLength) * trailLength,
          );
          context.lineTo(screenX, screenY);
          context.strokeStyle = `rgba(255, 65, 98, ${opacity * fade * 0.34})`;
          context.lineWidth = Math.max(0.5, radius * 0.75);
          context.stroke();
        }

        // Draw particle with concentric glow circles instead of per-frame gradient allocation
        if (particle.isBright) {
          const glowRadius = radius * (3.5 + proximity * 2);
          context.beginPath();
          context.arc(screenX, screenY, glowRadius, 0, Math.PI * 2);
          context.fillStyle = `rgba(255, 23, 68, ${opacity * fade * 0.22})`;
          context.fill();

          context.beginPath();
          context.arc(screenX, screenY, radius * 1.8, 0, Math.PI * 2);
          context.fillStyle = `rgba(255, 50, 95, ${opacity * fade * 0.45})`;
          context.fill();

          context.fillStyle = `rgba(255, 200, 215, ${opacity * fade})`;
        } else {
          context.fillStyle = `rgba(242, 35, 75, ${opacity * fade})`;
        }

        context.beginPath();
        context.arc(screenX, screenY, radius * (1 + proximity * 0.2), 0, Math.PI * 2);
        context.fill();

        if (particle.push >= DEPTH_RANGE) {
          const replacementDepth = DEPTH_RANGE - 65;
          const spread = (replacementDepth + FOCAL_LENGTH) / FOCAL_LENGTH;
          particle.z = wrapDepth(cameraOffset + replacementDepth);
          particle.x = (Math.random() - 0.5) * width * 1.25 * spread;
          particle.y = (Math.random() - 0.5) * height * 1.25 * spread;
          particle.push = 0;
        }
      }

      for (let index = ripples.length - 1; index >= 0; index--) {
        const ripple = ripples[index];
        const progress = (now - ripple.startedAt) / 520;
        if (progress >= 1) {
          ripples.splice(index, 1);
          continue;
        }
        context.beginPath();
        context.arc(ripple.x, ripple.y, 3 + progress * 24, 0, Math.PI * 2);
        context.strokeStyle = `rgba(255, 49, 91, ${(1 - progress) * 0.5})`;
        context.lineWidth = 1.2;
        context.stroke();
      }

      if (!motionPreference.matches && now >= nextShootingStarAt) {
        shootingStar = {
          x: Math.random() * width,
          y: Math.random() * height * 0.62,
          velocityX: (Math.random() - 0.5) * 430,
          velocityY: 230 + Math.random() * 210,
          life: 0,
        };
        nextShootingStarAt = now + 9000 + Math.random() * 13000;
      }

      if (shootingStar && !motionPreference.matches) {
        shootingStar.x += shootingStar.velocityX * deltaSeconds;
        shootingStar.y += shootingStar.velocityY * deltaSeconds;
        shootingStar.life += deltaSeconds;
        const opacity = Math.max(0, 1 - shootingStar.life / 0.85);
        context.beginPath();
        context.moveTo(
          shootingStar.x - shootingStar.velocityX * 0.12,
          shootingStar.y - shootingStar.velocityY * 0.12,
        );
        context.lineTo(shootingStar.x, shootingStar.y);
        context.strokeStyle = `rgba(255, 95, 125, ${opacity * 0.7})`;
        context.lineWidth = 1;
        context.stroke();
        context.beginPath();
        context.arc(shootingStar.x, shootingStar.y, 1.3, 0, Math.PI * 2);
        context.fillStyle = `rgba(255, 172, 190, ${opacity})`;
        context.fill();
        if (shootingStar.life > 0.85 || shootingStar.y > height + 50) {
          shootingStar = null;
        }
      }
    };

    const animate = (now: number) => {
      if (!tabIsVisible || motionPreference.matches) return;
      const deltaSeconds = lastFrameTime ? Math.min((now - lastFrameTime) / 1000, 0.05) : 0;
      lastFrameTime = now;
      drawFrame(now, deltaSeconds);
      animationFrame = window.requestAnimationFrame(animate);
    };

    const startAnimation = () => {
      if (!tabIsVisible || motionPreference.matches || animationFrame) return;
      lastFrameTime = 0;
      animationFrame = window.requestAnimationFrame(animate);
    };

    const stopAnimation = () => {
      window.cancelAnimationFrame(animationFrame);
      animationFrame = 0;
      lastFrameTime = 0;
    };

    const onScroll = () => {
      targetCameraOffset = window.scrollY * 0.42;
    };

    const onPointerMove = (event: PointerEvent) => {
      if (event.pointerType === "touch") return;
      pointerX = event.clientX;
      pointerY = event.clientY;
      pointerActive = true;
    };

    const onPointerLeave = () => {
      pointerActive = false;
    };

    const onClick = (event: MouseEvent) => {
      if (motionPreference.matches) return;
      const target = event.target;
      if (!(target instanceof Element)) return;
      if (target.closest("a, button, input, textarea, select, [role='button'], [contenteditable='true']")) return;
      const selection = window.getSelection();
      if (selection && !selection.isCollapsed) return;
      const caret = document.caretPositionFromPoint?.(event.clientX, event.clientY);
      if (caret?.offsetNode.nodeType === Node.TEXT_NODE) return;
      const textRange = document.caretRangeFromPoint?.(event.clientX, event.clientY);
      if (textRange?.startContainer.nodeType === Node.TEXT_NODE) return;

      let closestParticle: Particle | undefined;
      let closestDistance = Infinity;
      for (const particle of particles) {
        const distance = Math.hypot(particle.screenX - event.clientX, particle.screenY - event.clientY);
        const hitRadius = Math.max(9, particle.screenRadius + 6);
        if (distance <= hitRadius && distance < closestDistance) {
          closestParticle = particle;
          closestDistance = distance;
        }
      }

      if (closestParticle) {
        closestParticle.push = 1;
        ripples.push({ x: event.clientX, y: event.clientY, startedAt: performance.now() });
      }
    };

    const onVisibilityChange = () => {
      tabIsVisible = !document.hidden;
      if (tabIsVisible) {
        if (motionPreference.matches) drawFrame(performance.now(), 0);
        else startAnimation();
      } else {
        stopAnimation();
      }
    };

    const onMotionPreferenceChange = () => {
      if (motionPreference.matches) {
        stopAnimation();
        drawFrame(performance.now(), 0);
      } else {
        startAnimation();
      }
    };

    particles = Array.from({ length: particleCount }, () => createParticle());
    resize();

    window.addEventListener("resize", resize, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerleave", onPointerLeave, { passive: true });
    document.addEventListener("click", onClick);
    document.addEventListener("visibilitychange", onVisibilityChange);
    motionPreference.addEventListener("change", onMotionPreferenceChange);

    if (motionPreference.matches) drawFrame(performance.now(), 0);
    else startAnimation();

    return () => {
      stopAnimation();
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerleave", onPointerLeave);
      document.removeEventListener("click", onClick);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      motionPreference.removeEventListener("change", onMotionPreferenceChange);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-[1]"
      style={{ opacity: 0.96 }}
    />
  );
}
