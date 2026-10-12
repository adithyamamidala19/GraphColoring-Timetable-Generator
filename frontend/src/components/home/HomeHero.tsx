import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Play, RotateCcw, ShieldCheck, Zap, Sparkles } from "lucide-react";
import { useGSAP } from "@gsap/react";
import { gsap, MOTION, prefersReducedMotion, useMagnetic, useCountUp } from "@/motion";

// Slot color palette
const SLOT_COLORS = [
  { bg: "#BAE6FD", border: "#7DD3FC", text: "#0369A1" }, // Sky
  { bg: "#DDD6FE", border: "#C4B5FD", text: "#5B21B6" }, // Lavender
  { bg: "#FED7AA", border: "#FDBA74", text: "#9A3412" }, // Peach
  { bg: "#FECDD3", border: "#FDA4AF", text: "#9F1239" }, // Rose
  { bg: "#FEF08A", border: "#FDE047", text: "#854D0E" }, // Lemon
  { bg: "#A7F3D0", border: "#6EE7B7", text: "#065F46" }, // Mint
];

// Initial random scatter coordinates for ~24 nodes
const INITIAL_NODES = Array.from({ length: 24 }).map((_, i) => {
  const angle = (i / 24) * 2 * Math.PI;
  const dist = 90 + ((i * 37) % 80);
  return {
    id: i,
    label: ["CS401", "CS402", "CS403", "CS404", "CS405", "CS406", "MA407", "AI408"][i % 8],
    cloudX: 250 + Math.cos(angle) * dist,
    cloudY: 200 + Math.sin(angle) * dist,
    // Target 6x4 or 5x5 grid positions (grid width 500, height 380)
    gridX: 65 + (i % 6) * 72,
    gridY: 70 + Math.floor(i / 6) * 78,
    color: SLOT_COLORS[i % SLOT_COLORS.length],
  };
});

// Sparse sample edges
const INITIAL_EDGES = [
  [0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [6, 7], [8, 9], [10, 11],
  [12, 13], [14, 15], [16, 17], [18, 19], [0, 6], [2, 8], [5, 11],
  [7, 13], [1, 7], [3, 9], [12, 18], [14, 20], [17, 23], [9, 15]
];

export const HomeHero: React.FC = () => {
  const primaryBtnRef = useMagnetic<HTMLAnchorElement>({ strength: 0.25 });
  const containerRef = useRef<HTMLDivElement | null>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);
  const nodesGroupRef = useRef<SVGGElement | null>(null);
  const edgesGroupRef = useRef<SVGGElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [solvedBadge, setSolvedBadge] = useState("Coloring graph...");

  // KPI Count-ups
  const { displayValue: conflictCount } = useCountUp({ end: 0, duration: 1 });
  const { displayValue: speedMs } = useCountUp({ end: 24, duration: 1.2, suffix: " ms" });
  const { displayValue: explainability } = useCountUp({ end: 100, duration: 1, suffix: "%" });

  // Floating Cards tilt & parallax
  const floatingCardsRef = useRef<HTMLDivElement | null>(null);

  // Signature Animation A timeline
  const runMorphAnimation = () => {
    if (prefersReducedMotion() || !nodesGroupRef.current) return;
    setIsPlaying(true);
    setSolvedBadge("DSatur coloring in progress...");

    const nodeEls = nodesGroupRef.current.querySelectorAll(".hero-node");
    const edgeEls = edgesGroupRef.current?.querySelectorAll(".hero-edge");
    const labelEls = nodesGroupRef.current.querySelectorAll(".hero-node-label");

    const tl = gsap.timeline({
      onComplete: () => {
        setIsPlaying(false);
        setSolvedBadge("0 conflicts • Optimal χ(G)");
      },
    });

    // 1. Reset to cloud
    tl.set(nodeEls, {
      fill: "#E8E2D2",
      scale: 1,
      transformOrigin: "center center",
    });
    tl.set(edgeEls || [], { opacity: 0.4 });
    tl.set(labelEls, { opacity: 0 });

    // Move to cloud positions
    INITIAL_NODES.forEach((n, idx) => {
      tl.to(
        nodeEls[idx],
        {
          attr: { cx: n.cloudX, cy: n.cloudY, r: 14 },
          duration: 0.8,
          ease: "power2.out",
        },
        0
      );
    });

    // 2. Color one by one in DSatur order
    INITIAL_NODES.forEach((n, idx) => {
      tl.to(
        nodeEls[idx],
        {
          fill: n.color.bg,
          stroke: n.color.border,
          strokeWidth: 2,
          scale: 1.25,
          duration: 0.08,
          ease: "back.out(2)",
          yoyo: true,
          repeat: 1,
        },
        0.8 + idx * 0.045
      );
    });

    // 3. Edges fade to 10% opacity
    if (edgeEls) {
      tl.to(edgeEls, { opacity: 0.08, duration: 0.5 }, 2.0);
    }

    // 4. Morph nodes into clean 6x4 timetable grid cells
    INITIAL_NODES.forEach((n, idx) => {
      tl.to(
        nodeEls[idx],
        {
          attr: { cx: n.gridX, cy: n.gridY, r: 24 },
          duration: 1.1,
          ease: "power3.inOut",
        },
        2.2 + idx * 0.02
      );
    });

    // Reveal labels inside timetable grid cells
    tl.to(labelEls, { opacity: 1, duration: 0.4, stagger: 0.02 }, 2.6);
  };

  useGSAP(
    () => {
      runMorphAnimation();

      // Mouse Parallax on hero graphics
      if (!prefersReducedMotion() && containerRef.current && svgRef.current) {
        const xTo = gsap.quickTo(svgRef.current, "x", { duration: 0.9, ease: "power2.out" });
        const yTo = gsap.quickTo(svgRef.current, "y", { duration: 0.9, ease: "power2.out" });

        const cardsX = floatingCardsRef.current
          ? gsap.quickTo(floatingCardsRef.current, "x", { duration: 1.2, ease: "power2.out" })
          : null;
        const cardsY = floatingCardsRef.current
          ? gsap.quickTo(floatingCardsRef.current, "y", { duration: 1.2, ease: "power2.out" })
          : null;

        const onMouseMove = (e: MouseEvent) => {
          const { innerWidth, innerHeight } = window;
          const xNorm = (e.clientX / innerWidth - 0.5) * 2;
          const yNorm = (e.clientY / innerHeight - 0.5) * 2;
          xTo(-xNorm * 22);
          yTo(-yNorm * 18);
          cardsX?.(xNorm * 15);
          cardsY?.(yNorm * 12);
        };

        window.addEventListener("mousemove", onMouseMove, { passive: true });
        return () => window.removeEventListener("mousemove", onMouseMove);
      }
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="relative min-h-[92vh] flex flex-col justify-center px-4 sm:px-6 lg:px-8 pt-12 pb-20 overflow-hidden bg-[#FAF7F0]"
    >
      {/* Background Subtle Gradient Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-[#D1FAE5]/30 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        {/* Left Column: Big Fluid Headline & Magnetic CTAs */}
        <div className="lg:col-span-6 flex flex-col items-start z-10">
          {/* Eyebrow Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#E8E2D2] text-[#065F46] text-xs font-semibold shadow-subtle mb-6">
            <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
            <span>DSatur Graph Coloring Engine</span>
            <span className="text-[#5B6B63]">•</span>
            <span className="text-[#5B6B63] font-mono">v2.1</span>
          </div>

          {/* Headline with Instrument Serif Italic Accent Word */}
          <h1 className="fluid-hero-headline font-display font-bold text-[#14201B] tracking-tight">
            Timetables with{" "}
            <span className="font-serif italic font-normal text-[#10B981] pr-1">
              zero
            </span>{" "}
            conflicts.
          </h1>

          {/* Copy Rule: Max one short sentence under headline */}
          <p className="text-base sm:text-lg text-[#5B6B63] mt-5 max-w-lg leading-relaxed font-normal">
            Deterministic graph theory schedules generated in under 50 milliseconds with mathematical guarantees.
          </p>

          {/* Magnetic CTA Buttons */}
          <div className="flex flex-wrap items-center gap-4 mt-8">
            <Link
              ref={primaryBtnRef}
              to="/app"
              className="px-6 py-3.5 bg-[#10B981] hover:bg-[#059669] text-white font-semibold rounded-2xl text-sm flex items-center gap-2.5 shadow-soft transition-transform duration-200"
            >
              <span>Open workspace</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <a
              href="#demo"
              className="px-6 py-3.5 bg-white hover:bg-[#F3EFE4] text-[#14201B] border border-[#E8E2D2] font-semibold rounded-2xl text-sm flex items-center gap-2 shadow-subtle transition-colors"
            >
              <Play className="w-3.5 h-3.5 fill-[#14201B]" />
              <span>Watch it solve</span>
            </a>
          </div>

          {/* 3 Count-up KPI pills under CTAs */}
          <div className="grid grid-cols-3 gap-3 sm:gap-6 mt-10 pt-6 border-t border-[#E8E2D2] w-full max-w-md">
            <div>
              <div className="text-xl sm:text-2xl font-display font-extrabold text-[#14201B]">
                {conflictCount}
              </div>
              <div className="text-xs text-[#5B6B63] font-medium mt-0.5">conflicts</div>
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-display font-extrabold text-[#10B981] font-mono">
                {speedMs}
              </div>
              <div className="text-xs text-[#5B6B63] font-medium mt-0.5">solve speed</div>
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-display font-extrabold text-[#14201B]">
                {explainability}
              </div>
              <div className="text-xs text-[#5B6B63] font-medium mt-0.5">explainable</div>
            </div>
          </div>
        </div>

        {/* Right Column: Signature Animation A (Nodes to Timetable Morph) */}
        <div className="lg:col-span-6 relative flex items-center justify-center">
          {/* Floating Pastel Timetable Cards (Signature Animation C) */}
          <div ref={floatingCardsRef} className="absolute inset-0 pointer-events-none z-20">
            {/* Card 1: CS401 (Mint) */}
            <div className="absolute -top-4 right-12 bg-[#A7F3D0] border border-[#6EE7B7] p-3 rounded-2xl shadow-soft text-[#065F46] w-36 rotate-3 hidden sm:block animate-pulse duration-1000">
              <div className="text-[11px] font-mono font-bold">CS401 • DAA</div>
              <div className="text-xs font-bold truncate mt-0.5">Algorithms</div>
              <div className="text-[10px] text-[#065F46]/80 mt-1">LH-101 • Per 1</div>
            </div>

            {/* Card 2: CS404 (Peach) */}
            <div className="absolute bottom-6 left-2 bg-[#FED7AA] border border-[#FDBA74] p-3 rounded-2xl shadow-soft text-[#9A3412] w-36 -rotate-4 hidden sm:block">
              <div className="text-[11px] font-mono font-bold">CS404 • DBMS</div>
              <div className="text-xs font-bold truncate mt-0.5">Dr. V. Patel</div>
              <div className="text-[10px] text-[#9A3412]/80 mt-1">LH-102 • Per 3</div>
            </div>

            {/* Card 3: MA407 (Lavender) */}
            <div className="absolute top-1/2 -right-6 bg-[#DDD6FE] border border-[#C4B5FD] p-3 rounded-2xl shadow-soft text-[#5B21B6] w-36 rotate-2 hidden md:block">
              <div className="text-[11px] font-mono font-bold">MA407 • DMS</div>
              <div className="text-xs font-bold truncate mt-0.5">Discrete Math</div>
              <div className="text-[10px] text-[#5B21B6]/80 mt-1">LH-101 • Per 4</div>
            </div>
          </div>

          {/* Morphing Canvas Card */}
          <div className="relative w-full max-w-[540px] aspect-[5/4] bg-white border border-[#E8E2D2] rounded-3xl shadow-soft p-4 flex flex-col justify-between overflow-hidden">
            {/* Top Toolbar of Morph Card */}
            <div className="flex items-center justify-between pb-3 border-b border-[#E8E2D2] z-10">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#10B981]" />
                <span className="text-xs font-semibold text-[#14201B]">
                  {solvedBadge}
                </span>
              </div>
              <button
                onClick={runMorphAnimation}
                disabled={isPlaying}
                className="px-3 py-1 rounded-xl bg-[#FAF7F0] hover:bg-[#F3EFE4] text-xs font-medium text-[#5B6B63] flex items-center gap-1.5 border border-[#E8E2D2] transition-colors"
                title="Replay Nodes-to-Timetable Morph"
              >
                <RotateCcw className={`w-3 h-3 ${isPlaying ? "animate-spin" : ""}`} />
                <span>Replay</span>
              </button>
            </div>

            {/* SVG Morph Arena */}
            <div className="flex-1 w-full h-full relative flex items-center justify-center">
              <svg
                ref={svgRef}
                viewBox="0 0 500 380"
                className="w-full h-full overflow-visible"
              >
                {/* Edges Layer */}
                <g ref={edgesGroupRef}>
                  {INITIAL_EDGES.map(([src, tgt], idx) => {
                    const sNode = INITIAL_NODES[src];
                    const tNode = INITIAL_NODES[tgt];
                    return (
                      <line
                        key={`edge-${idx}`}
                        className="hero-edge"
                        x1={sNode.cloudX}
                        y1={sNode.cloudY}
                        x2={tNode.cloudX}
                        y2={tNode.cloudY}
                        stroke="#CBD5E1"
                        strokeWidth="1.2"
                        opacity="0.3"
                      />
                    );
                  })}
                </g>

                {/* Nodes Layer */}
                <g ref={nodesGroupRef}>
                  {INITIAL_NODES.map((n) => (
                    <g key={`node-group-${n.id}`}>
                      <circle
                        className="hero-node"
                        cx={n.cloudX}
                        cy={n.cloudY}
                        r={14}
                        fill="#E8E2D2"
                        stroke="#FAF7F0"
                        strokeWidth="2"
                      />
                      <text
                        className="hero-node-label"
                        x={n.gridX}
                        y={n.gridY + 4}
                        textAnchor="middle"
                        fontSize="9"
                        fontWeight="700"
                        fill={n.color.text}
                        fontFamily="JetBrains Mono"
                        opacity={0}
                        pointerEvents="none"
                      >
                        {n.label}
                      </text>
                    </g>
                  ))}
                </g>
              </svg>
            </div>

            {/* Bottom Status Ticker */}
            <div className="pt-2 border-t border-[#E8E2D2] flex items-center justify-between text-[11px] text-[#5B6B63] z-10">
              <span className="font-mono">|V| = 24 sessions</span>
              <span className="font-mono">|E| = 48 conflicts</span>
              <span className="font-mono text-[#065F46] font-bold">χ(G) = 6 slots</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
