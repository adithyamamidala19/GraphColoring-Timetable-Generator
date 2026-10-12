import React, { useState } from "react";
import { Check, Zap, Cpu, Building2, FlaskConical, ShieldCheck, BarChart3, FileSpreadsheet, FileText } from "lucide-react";
import { useReveal, useCountUp } from "@/motion";

export const HomeBento: React.FC = () => {
  const containerRef = useReveal<HTMLDivElement>({
    selector: ".bento-card",
    yOffset: 36,
    stagger: 0.1,
  });

  const { displayValue: msCount } = useCountUp({ end: 18, duration: 1.2, suffix: "ms" });
  const [resolvedState, setResolvedState] = useState(false);
  const [hoveredNode, setHoveredNode] = useState<number | null>(null);

  return (
    <section id="features" ref={containerRef} className="py-24 px-4 sm:px-6 lg:px-8 bg-[#FAF7F0]">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="text-left space-y-2">
          <div className="text-xs font-mono font-bold uppercase tracking-widest text-[#065F46] bg-[#D1FAE5] px-3 py-1 rounded-full w-fit border border-[#A7F3D0]">
            Algorithmic Features
          </div>
          <h2 className="fluid-section-headline font-display font-bold text-[#14201B] tracking-tight">
            Engineered for combinatorial perfection.
          </h2>
          <p className="text-base text-[#5B6B63] max-w-lg">
            Hard constraints mathematically enforced via DSatur graph coloring heuristics.
          </p>
        </div>

        {/* Bento Grid (6 cards) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Card 1: Zero Hard Conflicts (Span 7) */}
          <div className="bento-card md:col-span-7 bg-white border border-[#E8E2D2] rounded-3xl p-7 shadow-soft flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 hover:shadow-float group">
            <div className="flex justify-between items-start">
              <div className="w-10 h-10 rounded-2xl bg-[#D1FAE5] text-[#065F46] flex items-center justify-center font-bold">
                <ShieldCheck className="w-5 h-5 text-[#065F46]" />
              </div>
              <span className="text-xs font-mono font-bold text-[#065F46] bg-[#D1FAE5] px-2.5 py-1 rounded-full">
                Zero Violations
              </span>
            </div>

            <div className="my-6">
              <h3 className="font-display font-bold text-2xl text-[#14201B]">
                Zero hard conflicts guaranteed.
              </h3>
              <p className="text-sm text-[#5B6B63] mt-1">
                Five strict exclusion boundaries enforced simultaneously.
              </p>
            </div>

            {/* HC-1 .. HC-5 check pills */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-4 border-t border-[#E8E2D2]">
              {[
                { id: "HC-1", name: "Teacher Overlap" },
                { id: "HC-2", name: "Section Clash" },
                { id: "HC-3", name: "Room Double-Book" },
                { id: "HC-4", name: "Capacity Limits" },
                { id: "HC-5", name: "Lab Requirements" },
              ].map((hc) => (
                <div
                  key={hc.id}
                  className="flex items-center gap-2 p-2 rounded-xl bg-[#FAF7F0] border border-[#E8E2D2] text-xs font-medium text-[#14201B]"
                >
                  <div className="w-4 h-4 rounded-full bg-[#10B981] flex items-center justify-center text-white shrink-0">
                    <Check className="w-2.5 h-2.5 stroke-[3]" />
                  </div>
                  <span className="truncate">{hc.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Card 2: Under 50ms Solver (Span 5) */}
          <div className="bento-card md:col-span-5 bg-white border border-[#E8E2D2] rounded-3xl p-7 shadow-soft flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 hover:shadow-float">
            <div className="flex justify-between items-start">
              <div className="w-10 h-10 rounded-2xl bg-[#FEF08A] text-[#854D0E] flex items-center justify-center">
                <Zap className="w-5 h-5 text-[#854D0E]" />
              </div>
              <span className="text-xs font-mono font-bold text-[#854D0E] bg-[#FEF08A] px-2.5 py-1 rounded-full">
                Benchmark
              </span>
            </div>

            <div className="my-4">
              <div className="text-5xl font-display font-extrabold text-[#14201B] font-mono tracking-tight">
                {msCount}
              </div>
              <h3 className="font-display font-bold text-lg text-[#14201B] mt-2">
                Sub-50ms execution latency.
              </h3>
              <p className="text-xs text-[#5B6B63] mt-1">
                Colors 100+ weekly classes faster than a single browser render frame.
              </p>
            </div>

            <div className="space-y-1.5 pt-3 border-t border-[#E8E2D2]">
              <div className="flex justify-between text-[11px] text-[#5B6B63]">
                <span>Speed relative to manual (14 days)</span>
                <span className="font-mono font-bold text-[#065F46]">99.9% faster</span>
              </div>
              <div className="w-full h-2 bg-[#F3EFE4] rounded-full overflow-hidden">
                <div className="h-full bg-[#10B981] rounded-full w-[96%]" />
              </div>
            </div>
          </div>

          {/* Card 3: Interactive Graph Mini Preview (Span 4) */}
          <div className="bento-card md:col-span-4 bg-white border border-[#E8E2D2] rounded-3xl p-6 shadow-soft flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 hover:shadow-float">
            <div className="flex justify-between items-center pb-2 border-b border-[#E8E2D2]">
              <div className="flex items-center gap-2">
                <Cpu className="w-4 h-4 text-[#10B981]" />
                <h3 className="font-display font-bold text-sm text-[#14201B]">
                  Interactive Graph
                </h3>
              </div>
              <span className="text-[10px] font-mono text-[#5B6B63]">χ(G) allocation</span>
            </div>

            {/* Mini visualizer nodes */}
            <div className="py-6 flex items-center justify-center relative">
              <svg viewBox="0 0 200 120" className="w-full h-28">
                {/* Neighbor lines to node 0 */}
                {hoveredNode === 0 && (
                  <>
                    <line x1="100" y1="60" x2="40" y2="40" stroke="#10B981" strokeWidth="2" strokeDasharray="3,3" />
                    <line x1="100" y1="60" x2="160" y2="40" stroke="#10B981" strokeWidth="2" strokeDasharray="3,3" />
                    <line x1="100" y1="60" x2="60" y2="90" stroke="#10B981" strokeWidth="2" strokeDasharray="3,3" />
                  </>
                )}
                {/* Nodes */}
                <circle cx="40" cy="40" r="14" fill="#BAE6FD" stroke="#7DD3FC" strokeWidth="1.5" />
                <circle cx="160" cy="40" r="14" fill="#FED7AA" stroke="#FDBA74" strokeWidth="1.5" />
                <circle cx="60" cy="90" r="14" fill="#DDD6FE" stroke="#C4B5FD" strokeWidth="1.5" />
                <circle cx="140" cy="90" r="14" fill="#FECDD3" stroke="#FDA4AF" strokeWidth="1.5" />
                {/* Center Node */}
                <circle
                  cx="100"
                  cy="60"
                  r="18"
                  fill="#A7F3D0"
                  stroke="#10B981"
                  strokeWidth="2.5"
                  className="cursor-pointer transition-transform hover:scale-110"
                  onMouseEnter={() => setHoveredNode(0)}
                  onMouseLeave={() => setHoveredNode(null)}
                />
                <text x="100" y="64" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#065F46">
                  V_1
                </text>
              </svg>
            </div>

            <p className="text-xs text-[#5B6B63] pt-2 border-t border-[#E8E2D2]">
              Hover highlights connected conflict neighbors in real time.
            </p>
          </div>

          {/* Card 4: Smart Rooms & Labs (Span 4) */}
          <div className="bento-card md:col-span-4 bg-white border border-[#E8E2D2] rounded-3xl p-6 shadow-soft flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 hover:shadow-float">
            <div className="flex justify-between items-center pb-2 border-b border-[#E8E2D2]">
              <div className="flex items-center gap-2">
                <Building2 className="w-4 h-4 text-[#065F46]" />
                <h3 className="font-display font-bold text-sm text-[#14201B]">
                  Smart Room Fit
                </h3>
              </div>
              <span className="text-[10px] font-mono text-[#5B6B63]">Capacity ≥ Strength</span>
            </div>

            <div className="py-4 space-y-3">
              <div className="p-3 rounded-2xl bg-[#FAF7F0] border border-[#E8E2D2] flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-[#14201B]">LH-101 (Lecture Hall)</div>
                  <div className="text-[10px] text-[#5B6B63]">Capacity: 70 • Section: 60</div>
                </div>
                <div className="w-6 h-6 rounded-full bg-[#D1FAE5] flex items-center justify-center text-[#065F46]">
                  <Check className="w-3.5 h-3.5" />
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-[#DDD6FE]/30 border border-[#C4B5FD] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FlaskConical className="w-4 h-4 text-[#5B21B6]" />
                  <div>
                    <div className="text-xs font-bold text-[#5B21B6]">LAB-201 (Computing)</div>
                    <div className="text-[10px] text-[#5B21B6]/80">3-hr Block Laboratory</div>
                  </div>
                </div>
                <span className="text-[10px] font-mono font-bold bg-[#DDD6FE] text-[#5B21B6] px-2 py-0.5 rounded-full">
                  LAB
                </span>
              </div>
            </div>

            <p className="text-xs text-[#5B6B63] pt-2 border-t border-[#E8E2D2]">
              Zero room under-allocation or hardware lab mismatches.
            </p>
          </div>

          {/* Card 5: Conflict Center & Auto Resolve (Span 4) */}
          <div className="bento-card md:col-span-4 bg-white border border-[#E8E2D2] rounded-3xl p-6 shadow-soft flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 hover:shadow-float">
            <div className="flex justify-between items-center pb-2 border-b border-[#E8E2D2]">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#10B981]" />
                <h3 className="font-display font-bold text-sm text-[#14201B]">
                  Conflict Center
                </h3>
              </div>
              <span className="text-[10px] font-mono text-[#065F46] font-bold">Auto Resolve</span>
            </div>

            <div className="py-4 my-auto">
              <div
                onClick={() => setResolvedState(!resolvedState)}
                className={`p-3.5 rounded-2xl border cursor-pointer transition-all ${
                  resolvedState
                    ? "bg-[#D1FAE5] border-[#A7F3D0] text-[#065F46]"
                    : "bg-[#FEE2E2] border-[#FECDD3] text-[#991B1B]"
                }`}
              >
                <div className="flex items-center justify-between text-xs font-bold">
                  <span>{resolvedState ? "Resolved: No Conflicts" : "Collision: Faculty Double-Book"}</span>
                  <span className="font-mono text-[10px]">
                    {resolvedState ? "0 Violations" : "Click to Fix"}
                  </span>
                </div>
                <div className="text-[11px] opacity-85 mt-1">
                  {resolvedState
                    ? "Alternative chromatic slot allocated instantly."
                    : "Teacher Dr. Rajesh Kumar overlapping on Period 2."}
                </div>
              </div>
            </div>

            <p className="text-xs text-[#5B6B63] pt-2 border-t border-[#E8E2D2]">
              One-click DSatur re-coloring resolves custom edits.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
