import React from "react";

export const ExoScanPreview: React.FC = () => {
  return (
    <div className="relative w-full h-full p-4 flex flex-col justify-between overflow-hidden select-none">
      {/* Background celestial grid & telemetry lines */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,23,68,0.18)_0%,transparent_60%)] pointer-events-none" />
      <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:16px_16px]" />

      {/* Top Bar: Telescope Sensor Tag & Metric Badge */}
      <div className="relative z-10 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#FF1744] animate-ping" />
          <span className="text-[10px] font-mono tracking-widest text-[#E6DEE1] font-semibold">
            NASA TESS FLUX
          </span>
        </div>

        <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-[#FF1744]/20 border border-[#FF1744]/40 text-[#FF5252] text-[11px] font-mono font-bold">
          <span>&uarr;</span>
          <span>+94.2%</span>
        </div>
      </div>

      {/* Center Visual: Photometric Light Curve with Dip & Detection Reticle */}
      <div className="relative z-10 my-auto py-2">
        <svg className="w-full h-20 overflow-visible" viewBox="0 0 320 80" fill="none">
          {/* Subtle grid lines */}
          <line x1="0" y1="20" x2="320" y2="20" stroke="rgba(255,255,255,0.08)" strokeDasharray="3 3" />
          <line x1="0" y1="50" x2="320" y2="50" stroke="rgba(255,255,255,0.08)" strokeDasharray="3 3" />
          <line x1="160" y1="0" x2="160" y2="80" stroke="rgba(255,23,68,0.25)" strokeDasharray="2 2" />

          {/* Planetary Transit Dip Curve */}
          <path
            d="M 10 24 Q 50 25 90 24 T 120 26 Q 140 28 150 56 Q 160 68 170 56 Q 180 28 200 25 T 250 24 T 310 25"
            stroke="#FF1744"
            strokeWidth="2.5"
            strokeLinecap="round"
            className="filter drop-shadow-[0_0_8px_rgba(255,23,68,0.8)]"
          />

          {/* Transit Detection Zone Highlight */}
          <circle cx="160" cy="65" r="5" fill="#ffffff" stroke="#FF1744" strokeWidth="2" className="animate-pulse" />
          <rect x="135" y="10" width="50" height="65" rx="4" fill="rgba(255,23,68,0.08)" stroke="rgba(255,23,68,0.4)" strokeDasharray="2 2" />
        </svg>
      </div>

      {/* Bottom Bar Chart: Signal-to-Noise Ratio Bars */}
      <div className="relative z-10 flex items-end justify-between pt-1 border-t border-white/10">
        <span className="text-[9px] font-mono tracking-wider text-[#A79BA0]">
          BLS PERIODOGRAM ANALYSIS
        </span>
        <div className="flex items-end gap-1 h-4">
          <div className="w-1.5 h-1.5 bg-[#A79BA0]/40 rounded-sm" />
          <div className="w-1.5 h-2.5 bg-[#A79BA0]/60 rounded-sm" />
          <div className="w-1.5 h-2 bg-[#A79BA0]/40 rounded-sm" />
          <div className="w-1.5 h-4 bg-[#FF1744] rounded-sm shadow-[0_0_6px_#FF1744]" />
          <div className="w-1.5 h-2 bg-[#A79BA0]/50 rounded-sm" />
          <div className="w-1.5 h-3 bg-[#A79BA0]/70 rounded-sm" />
        </div>
      </div>
    </div>
  );
};

export const SentinelMeshPreview: React.FC = () => {
  return (
    <div className="relative w-full h-full p-4 flex flex-col justify-between overflow-hidden select-none">
      {/* Radar Background Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,23,68,0.22)_0%,transparent_65%)] pointer-events-none" />

      {/* Top Bar: Cluster Status & Metric */}
      <div className="relative z-10 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400" />
          <span className="text-[10px] font-mono tracking-widest text-[#E6DEE1] font-semibold">
            CLUSTER AUTONOMY
          </span>
        </div>

        <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-[#FF1744]/20 border border-[#FF1744]/40 text-[#FF5252] text-[11px] font-mono font-bold">
          <span>&uarr;</span>
          <span>4.8x Speed</span>
        </div>
      </div>

      {/* Center Visual: Multi-Agent Mesh Topology */}
      <div className="relative z-10 my-auto py-2 flex items-center justify-center">
        <svg className="w-full h-24 overflow-visible" viewBox="0 0 280 90" fill="none">
          {/* Agent Connection Lines */}
          <path d="M 60 45 L 140 22 L 220 45 L 140 68 Z" stroke="rgba(255,23,68,0.4)" strokeWidth="1.5" strokeDasharray="4 3" />
          <line x1="60" y1="45" x2="220" y2="45" stroke="rgba(255,23,68,0.25)" strokeWidth="1" />
          <line x1="140" y1="22" x2="140" y2="68" stroke="rgba(255,23,68,0.3)" strokeWidth="1" />

          {/* Agent Node 1: Detector */}
          <circle cx="60" cy="45" r="14" fill="#14080e" stroke="#FF1744" strokeWidth="2" className="filter drop-shadow-[0_0_8px_rgba(255,23,68,0.6)]" />
          <circle cx="60" cy="45" r="4" fill="#FF1744" />
          <text x="60" y="73" fill="#A79BA0" fontSize="8" fontFamily="monospace" textAnchor="middle">DETECTOR</text>

          {/* Central Orchestrator Node */}
          <circle cx="140" cy="45" r="18" fill="#1f0a14" stroke="#ffffff" strokeWidth="2" className="filter drop-shadow-[0_0_12px_rgba(255,255,255,0.7)]" />
          <circle cx="140" cy="45" r="7" fill="#FF1744" className="animate-ping" />
          <circle cx="140" cy="45" r="5" fill="#ffffff" />
          <text x="140" y="80" fill="#ffffff" fontSize="9" fontWeight="bold" fontFamily="monospace" textAnchor="middle">ANALYST</text>

          {/* Agent Node 3: Remediator */}
          <circle cx="220" cy="45" r="14" fill="#0d1812" stroke="#10b981" strokeWidth="2" className="filter drop-shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
          <circle cx="220" cy="45" r="4" fill="#10b981" />
          <text x="220" y="73" fill="#A79BA0" fontSize="8" fontFamily="monospace" textAnchor="middle">HEALER</text>
        </svg>
      </div>

      {/* Bottom Bar: Telemetry Health Rate */}
      <div className="relative z-10 flex items-center justify-between pt-1 border-t border-white/10">
        <span className="text-[9px] font-mono tracking-wider text-[#A79BA0]">
          CONTAINER RECONCILIATION: ACTIVE
        </span>
        <div className="flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          <span className="text-[10px] font-mono text-emerald-400 font-bold">0 DOWNTIME</span>
        </div>
      </div>
    </div>
  );
};

export const AcmSuitePreview: React.FC = () => {
  return (
    <div className="relative w-full h-full p-4 flex flex-col justify-between overflow-hidden select-none">
      {/* Gradient Ambient Accent */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(255,23,68,0.18)_0%,transparent_60%)] pointer-events-none" />
      <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:16px_16px]" />

      {/* Top Bar: Organization Tag & Metric */}
      <div className="relative z-10 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#FF315B]" />
          <span className="text-[10px] font-mono tracking-widest text-[#E6DEE1] font-semibold">
            ACM STUDENT CHAPTER
          </span>
        </div>

        <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-[#FF1744]/20 border border-[#FF1744]/40 text-[#FF5252] text-[11px] font-mono font-bold">
          <span>&uarr;</span>
          <span>500+ Issued</span>
        </div>
      </div>

      {/* Center Visual: Certificate Stack & QR Code Verifier */}
      <div className="relative z-10 my-auto py-2 flex items-center justify-center">
        <div className="relative w-48 h-24 flex items-center justify-center">
          {/* Layered Card 1 (Back) */}
          <div className="absolute w-36 h-20 rounded-lg bg-[#14080e] border border-white/10 transform -rotate-6 translate-y-1 opacity-40 shadow-lg" />
          
          {/* Layered Card 2 (Mid) */}
          <div className="absolute w-40 h-22 rounded-lg bg-[#1a0a13] border border-[#FF1744]/30 transform rotate-3 opacity-70 shadow-xl" />

          {/* Front Certificate Card */}
          <div className="relative w-44 h-24 rounded-lg bg-gradient-to-br from-[#240c1a] to-[#12050d] border border-[#FF1744]/60 p-2.5 flex flex-col justify-between shadow-[0_8px_24px_rgba(255,23,68,0.35)]">
            <div className="flex items-center justify-between">
              <span className="text-[8px] font-mono text-[#FF315B] font-bold tracking-widest">CREDENTIAL VERIFIED</span>
              <div className="w-3 h-3 rounded bg-emerald-500/20 border border-emerald-500 flex items-center justify-center">
                <span className="text-[8px] text-emerald-400 font-bold">&#10003;</span>
              </div>
            </div>

            <div className="space-y-1">
              <div className="h-1.5 w-24 bg-white/30 rounded" />
              <div className="h-1 w-16 bg-[#FF1744]/60 rounded" />
            </div>

            <div className="flex items-center justify-between pt-1 border-t border-white/10">
              <span className="text-[7px] font-mono text-[#A79BA0]">SHA-256 SIGNED</span>
              <span className="text-[7px] font-mono text-white/60">QR VALID</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar: System Throughput */}
      <div className="relative z-10 flex items-center justify-between pt-1 border-t border-white/10">
        <span className="text-[9px] font-mono tracking-wider text-[#A79BA0]">
          FASTAPI + MONGODB ENGINE
        </span>
        <div className="flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          <span className="text-[10px] font-mono text-emerald-400 font-bold">100% AUTOMATED</span>
        </div>
      </div>
    </div>
  );
};

export const NeuralFlowPreview: React.FC = () => {
  return (
    <div className="relative w-full h-full p-4 flex flex-col justify-between overflow-hidden select-none">
      {/* Background HUD Grid Accent */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_70%,rgba(255,23,68,0.2)_0%,transparent_60%)] pointer-events-none" />
      <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:16px_16px]" />

      {/* Top Bar: Sensor HUD Tag & Metric */}
      <div className="relative z-10 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[10px] font-mono tracking-widest text-[#E6DEE1] font-semibold">
            EDGE TENSORRT HUD
          </span>
        </div>

        <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-[#FF1744]/20 border border-[#FF1744]/40 text-[#FF5252] text-[11px] font-mono font-bold">
          <span>&uarr;</span>
          <span>64 FPS</span>
        </div>
      </div>

      {/* Center Visual: Computer Vision Detection Reticles & Bounding Boxes */}
      <div className="relative z-10 my-auto py-2 flex items-center justify-center">
        <svg className="w-full h-24 overflow-visible" viewBox="0 0 280 90" fill="none">
          {/* Subtle optical crosshairs */}
          <line x1="140" y1="10" x2="140" y2="80" stroke="rgba(255,255,255,0.12)" strokeDasharray="3 3" />
          <line x1="30" y1="45" x2="250" y2="45" stroke="rgba(255,255,255,0.12)" strokeDasharray="3 3" />
          <circle cx="140" cy="45" r="30" stroke="rgba(255,23,68,0.2)" strokeWidth="1" strokeDasharray="4 4" />

          {/* Primary Track Target Bounding Box */}
          <rect x="45" y="18" width="80" height="52" rx="4" fill="rgba(255,23,68,0.1)" stroke="#FF1744" strokeWidth="1.8" className="filter drop-shadow-[0_0_8px_rgba(255,23,68,0.6)]" />
          {/* Target Corner Accents */}
          <path d="M 45 28 L 45 18 L 55 18" stroke="#ffffff" strokeWidth="2" />
          <path d="M 115 18 L 125 18 L 125 28" stroke="#ffffff" strokeWidth="2" />
          <path d="M 45 60 L 45 70 L 55 70" stroke="#ffffff" strokeWidth="2" />
          <path d="M 115 70 L 125 70 L 125 60" stroke="#ffffff" strokeWidth="2" />
          {/* Target HUD Tags */}
          <rect x="45" y="8" width="56" height="10" rx="2" fill="#FF1744" />
          <text x="73" y="15.5" fill="#ffffff" fontSize="7" fontWeight="bold" fontFamily="monospace" textAnchor="middle">TARGET 01</text>
          <text x="50" y="32" fill="#FF5252" fontSize="7.5" fontFamily="monospace">CONF: 0.98</text>
          <text x="50" y="44" fill="#A79BA0" fontSize="7" fontFamily="monospace">VEL: 24.8m/s</text>

          {/* Secondary Target Box */}
          <rect x="160" y="28" width="70" height="42" rx="4" fill="rgba(16,185,129,0.08)" stroke="#10b981" strokeWidth="1.5" strokeDasharray="3 2" />
          <rect x="160" y="20" width="48" height="9" rx="2" fill="#10b981" />
          <text x="184" y="27" fill="#050507" fontSize="6.5" fontWeight="bold" fontFamily="monospace" textAnchor="middle">TRACK 02</text>
          {/* Velocity Vector Arrow */}
          <line x1="230" y1="49" x2="255" y2="40" stroke="#10b981" strokeWidth="1.5" markerEnd="url(#arrow)" />
          <circle cx="230" cy="49" r="2.5" fill="#10b981" />
        </svg>
      </div>

      {/* Bottom Bar: Edge Inference Telemetry */}
      <div className="relative z-10 flex items-center justify-between pt-1 border-t border-white/10">
        <span className="text-[9px] font-mono tracking-wider text-[#A79BA0]">
          BYTETRACK ASSOCIATION: LOCK
        </span>
        <div className="flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          <span className="text-[10px] font-mono text-emerald-400 font-bold">0 FRAME DROPS</span>
        </div>
      </div>
    </div>
  );
};

export const CogniGraphPreview: React.FC = () => {
  return (
    <div className="relative w-full h-full p-4 flex flex-col justify-between overflow-hidden select-none">
      {/* Background Knowledge Radial Field */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,23,68,0.22)_0%,transparent_65%)] pointer-events-none" />
      <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:16px_16px]" />

      {/* Top Bar: Pipeline Tag & Metric */}
      <div className="relative z-10 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#FF1744] animate-ping" />
          <span className="text-[10px] font-mono tracking-widest text-[#E6DEE1] font-semibold">
            HYBRID KNOWLEDGE RAG
          </span>
        </div>

        <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-[#FF1744]/20 border border-[#FF1744]/40 text-[#FF5252] text-[11px] font-mono font-bold">
          <span>&uarr;</span>
          <span>+88.4%</span>
        </div>
      </div>

      {/* Center Visual: Graph Traversals & Semantic Embedding Vectors */}
      <div className="relative z-10 my-auto py-2 flex items-center justify-center">
        <svg className="w-full h-24 overflow-visible" viewBox="0 0 280 90" fill="none">
          {/* Graph Pathway Connectors */}
          <path d="M 50 45 L 140 22 L 230 45 L 140 68 Z" stroke="rgba(255,23,68,0.35)" strokeWidth="1.5" strokeDasharray="3 3" />
          <line x1="50" y1="45" x2="230" y2="45" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
          <line x1="140" y1="22" x2="140" y2="68" stroke="rgba(255,23,68,0.3)" strokeWidth="1" />

          {/* Node 1: Vector Embeddings (Qdrant) */}
          <circle cx="50" cy="45" r="14" fill="#14080e" stroke="#FF1744" strokeWidth="2" className="filter drop-shadow-[0_0_8px_rgba(255,23,68,0.6)]" />
          <circle cx="50" cy="45" r="4" fill="#FF1744" />
          <text x="50" y="72" fill="#A79BA0" fontSize="7.5" fontFamily="monospace" textAnchor="middle">VECTORS</text>

          {/* Center Hub: Hybrid RRF Fusion Core */}
          <circle cx="140" cy="45" r="18" fill="#220b16" stroke="#ffffff" strokeWidth="2" className="filter drop-shadow-[0_0_12px_rgba(255,255,255,0.7)]" />
          <circle cx="140" cy="45" r="8" fill="#FF1744" className="animate-ping" />
          <circle cx="140" cy="45" r="5" fill="#ffffff" />
          <text x="140" y="80" fill="#ffffff" fontSize="8.5" fontWeight="bold" fontFamily="monospace" textAnchor="middle">RRF FUSION</text>

          {/* Node 3: Neo4j Graph Cypher */}
          <circle cx="230" cy="45" r="14" fill="#0d1812" stroke="#10b981" strokeWidth="2" className="filter drop-shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
          <circle cx="230" cy="45" r="4" fill="#10b981" />
          <text x="230" y="72" fill="#A79BA0" fontSize="7.5" fontFamily="monospace" textAnchor="middle">CYPHER GRAPH</text>

          {/* Multi-Hop Traverse Tags */}
          <rect x="80" y="16" width="38" height="9" rx="2" fill="rgba(255,23,68,0.3)" stroke="rgba(255,23,68,0.6)" />
          <text x="99" y="23" fill="#FF708F" fontSize="6" fontFamily="monospace" textAnchor="middle">HOP 1</text>

          <rect x="162" y="16" width="38" height="9" rx="2" fill="rgba(16,185,129,0.2)" stroke="rgba(16,185,129,0.5)" />
          <text x="181" y="23" fill="#6EE7B7" fontSize="6" fontFamily="monospace" textAnchor="middle">HOP 2</text>
        </svg>
      </div>

      {/* Bottom Bar: Fusion Strategy & Verification */}
      <div className="relative z-10 flex items-center justify-between pt-1 border-t border-white/10">
        <span className="text-[9px] font-mono tracking-wider text-[#A79BA0]">
          RECIPROCAL RANK FUSION: ACTIVE
        </span>
        <div className="flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          <span className="text-[10px] font-mono text-emerald-400 font-bold">VERIFIED REASONING</span>
        </div>
      </div>
    </div>
  );
};

export const DevPulsePreview: React.FC = () => {
  return (
    <div className="relative w-full h-full p-4 flex flex-col justify-between overflow-hidden select-none">
      {/* Background Pulse Glow Accent */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(255,23,68,0.2)_0%,transparent_60%)] pointer-events-none" />
      <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:16px_16px]" />

      {/* Top Bar: Cluster Runtime Tag & Metric */}
      <div className="relative z-10 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400" />
          <span className="text-[10px] font-mono tracking-widest text-[#E6DEE1] font-semibold">
            KAFKA & CLICKHOUSE
          </span>
        </div>

        <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-[#FF1744]/20 border border-[#FF1744]/40 text-[#FF5252] text-[11px] font-mono font-bold">
          <span>&darr;</span>
          <span>&lt; 8ms</span>
        </div>
      </div>

      {/* Center Visual: Real-time Telemetry Waterfall Spans & Waveform */}
      <div className="relative z-10 my-auto py-2 flex flex-col justify-center space-y-1.5">
        {/* Real-time Latency Sparkline */}
        <svg className="w-full h-10 overflow-visible" viewBox="0 0 280 40" fill="none">
          <line x1="0" y1="35" x2="280" y2="35" stroke="rgba(255,255,255,0.08)" strokeDasharray="3 3" />
          <path
            d="M 10 30 Q 40 28 70 32 T 110 22 Q 130 10 150 25 T 190 31 T 230 18 T 270 28"
            stroke="#FF1744"
            strokeWidth="2"
            strokeLinecap="round"
            className="filter drop-shadow-[0_0_6px_rgba(255,23,68,0.7)]"
          />
          <circle cx="150" cy="25" r="3.5" fill="#ffffff" stroke="#FF1744" strokeWidth="2" />
        </svg>

        {/* Distributed Trace Latency Bars */}
        <div className="space-y-1 px-1">
          <div className="flex items-center justify-between text-[7px] font-mono text-[#A79BA0]">
            <span>INGESTION LAYER</span>
            <span className="text-emerald-400">1.2ms</span>
          </div>
          <div className="w-full bg-white/5 rounded-full h-1.5 overflow-hidden">
            <div className="bg-emerald-400 h-full rounded-full w-[24%]" />
          </div>

          <div className="flex items-center justify-between text-[7px] font-mono text-[#A79BA0]">
            <span>KAFKA EVENT BUFFER</span>
            <span className="text-[#FF5252]">2.8ms</span>
          </div>
          <div className="w-full bg-white/5 rounded-full h-1.5 overflow-hidden">
            <div className="bg-[#FF1744] h-full rounded-full w-[52%] shadow-[0_0_6px_#FF1744]" />
          </div>

          <div className="flex items-center justify-between text-[7px] font-mono text-[#A79BA0]">
            <span>CLICKHOUSE COMMIT</span>
            <span className="text-white/80">3.6ms</span>
          </div>
          <div className="w-full bg-white/5 rounded-full h-1.5 overflow-hidden">
            <div className="bg-white/40 h-full rounded-full w-[38%]" />
          </div>
        </div>
      </div>

      {/* Bottom Bar: Stream Throughput */}
      <div className="relative z-10 flex items-center justify-between pt-1 border-t border-white/10">
        <span className="text-[9px] font-mono tracking-wider text-[#A79BA0]">
          50,000+ MSG/SEC INGESTION
        </span>
        <div className="flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          <span className="text-[10px] font-mono text-emerald-400 font-bold">HEALTH: 100%</span>
        </div>
      </div>
    </div>
  );
};
