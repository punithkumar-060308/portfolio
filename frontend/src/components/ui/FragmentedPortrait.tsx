import React from "react";

interface ShardData {
  id: string;
  name: string;
  clipPath: string;
  polygonPoints: string;
  translateZ: number;
}

// 5 Irregular Angular Polygon Shards with Shared Diagonal Seams
// Facial preservation strictly enforced: Shard 1 covers the entire head, hair, sunglasses,
// face, beard, chin, and neck down through the collar into the sweatshirt (Y >= 54%).
// Zero cuts across eyes, nose, mouth, chin, or neck!
const SHARDS: ShardData[] = [
  // 1. Head, Face, Neck & Collar Shard (Continuous & intact)
  {
    id: "shard-head-neck",
    name: "Head & Neck",
    clipPath: "polygon(0% 0%, 100% 0%, 100% 22%, 78% 56%, 22% 54%, 0% 28%)",
    polygonPoints: "0,0 100,0 100,22 78,56 22,54 0,28",
    translateZ: 26,
  },
  // 2. Left Shoulder & Upper Sleeve Shard
  {
    id: "shard-left-shoulder",
    name: "Left Shoulder",
    clipPath: "polygon(0% 28%, 22% 54%, 32% 78%, 0% 78%)",
    polygonPoints: "0,28 22,54 32,78 0,78",
    translateZ: 16,
  },
  // 3. Center Chest & Torso Shard
  {
    id: "shard-center-chest",
    name: "Center Chest",
    clipPath: "polygon(22% 54%, 78% 56%, 78% 74%, 65% 100%, 25% 100%, 32% 78%)",
    polygonPoints: "22,54 78,56 78,74 65,100 25,100 32,78",
    translateZ: 10,
  },
  // 4. Right Shoulder & Arm Shard
  {
    id: "shard-right-arm",
    name: "Right Arm",
    clipPath: "polygon(78% 56%, 100% 22%, 100% 100%, 65% 100%, 78% 74%)",
    polygonPoints: "78,56 100,22 100,100 65,100 78,74",
    translateZ: 20,
  },
  // 5. Lower Left Base Shard
  {
    id: "shard-lower-base",
    name: "Lower Base",
    clipPath: "polygon(0% 78%, 32% 78%, 25% 100%, 0% 100%)",
    polygonPoints: "0,78 32,78 25,100 0,100",
    translateZ: 8,
  },
];

interface FragmentedPortraitProps {
  imageSrc?: string;
}

export const FragmentedPortrait: React.FC<FragmentedPortraitProps> = ({
  imageSrc = "/punith-portrait-final.png",
}) => {
  return (
    <div
      className="relative w-full h-full flex items-end justify-end pointer-events-none select-none"
      style={{
        perspective: "1400px",
        transformStyle: "preserve-3d",
      }}
    >
      {SHARDS.map((shard) => (
        <div
          key={shard.id}
          className="absolute inset-0 w-full h-full pointer-events-none"
          style={{
            transform: `translate3d(0, 0, ${shard.translateZ}px)`,
            transformStyle: "preserve-3d",
          }}
        >
          {/* Clipped Image Shard */}
          <div
            className="w-full h-full relative"
            style={{
              clipPath: shard.clipPath,
              WebkitClipPath: shard.clipPath,
            }}
          >
            <img
              src={imageSrc}
              alt={shard.name}
              className="w-full h-full object-contain object-bottom select-none block pointer-events-none filter contrast-105"
            />
          </div>

          {/* Ultra-subtle cybernetic glass bevel edge (subtle glint at resting state) */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none opacity-25"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id={`shard-edge-${shard.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="rgba(255,255,255,0.7)" />
                <stop offset="30%" stopColor="rgba(64,224,208,0.55)" />
                <stop offset="70%" stopColor="rgba(229,22,62,0.6)" />
                <stop offset="100%" stopColor="rgba(255,75,112,0.3)" />
              </linearGradient>
            </defs>
            <polygon
              points={shard.polygonPoints}
              fill="none"
              stroke={`url(#shard-edge-${shard.id})`}
              strokeWidth="0.3"
              strokeLinejoin="round"
              strokeLinecap="round"
            />
          </svg>
        </div>
      ))}
    </div>
  );
};
