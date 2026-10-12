import React, { useState, useEffect } from "react";
import { Play, Pause, SkipForward, RotateCcw, Cpu, Check, Info } from "lucide-react";
import { prefersReducedMotion } from "@/motion";

// Slot color palette (warm pastel tokens)
const DEMO_PALETTE = [
  { id: 1, name: "Period 1 (09:00 AM)", bg: "#BAE6FD", border: "#7DD3FC", text: "#0369A1" }, // Sky
  { id: 2, name: "Period 2 (10:00 AM)", bg: "#DDD6FE", border: "#C4B5FD", text: "#5B21B6" }, // Lavender
  { id: 3, name: "Period 3 (11:15 AM)", bg: "#FED7AA", border: "#FDBA74", text: "#9A3412" }, // Peach
  { id: 4, name: "Period 4 (12:15 PM)", bg: "#FECDD3", border: "#FDA4AF", text: "#9F1239" }, // Rose
  { id: 5, name: "Period 5 (02:00 PM)", bg: "#FEF08A", border: "#FDE047", text: "#854D0E" }, // Lemon
  { id: 6, name: "Period 6 (03:00 PM)", bg: "#A7F3D0", border: "#6EE7B7", text: "#065F46" }, // Mint
];

interface DemoNode {
  id: string;
  code: string;
  course: string;
  faculty: string;
  x: number;
  y: number;
  degree: number;
  saturation: number;
  assignedColorId?: number;
}

const RAW_NODES: DemoNode[] = [
  { id: "v1", code: "CS401", course: "Algorithms", faculty: "Dr. R. Kumar", x: 140, y: 70, degree: 4, saturation: 0 },
  { id: "v2", code: "CS402", course: "Operating Systems", faculty: "Prof. A. Sharma", x: 260, y: 70, degree: 3, saturation: 0 },
  { id: "v3", code: "CS403", course: "DAA Lab", faculty: "Dr. R. Kumar", x: 360, y: 130, degree: 5, saturation: 0 },
  { id: "v4", code: "CS404", course: "Database Systems", faculty: "Dr. V. Patel", x: 320, y: 230, degree: 4, saturation: 0 },
  { id: "v5", code: "CS405", course: "DBMS Lab", faculty: "Dr. V. Patel", x: 200, y: 250, degree: 3, saturation: 0 },
  { id: "v6", code: "CS406", course: "Networks", faculty: "Prof. M. Reddy", x: 90, y: 210, degree: 4, saturation: 0 },
  { id: "v7", code: "MA407", course: "Discrete Math", faculty: "Dr. S. Gupta", x: 60, y: 120, degree: 3, saturation: 0 },
  { id: "v8", code: "AI408", course: "Artificial Intelligence", faculty: "Prof. M. Reddy", x: 200, y: 150, degree: 6, saturation: 0 },
  { id: "v9", code: "CS401b", course: "Algorithms Sec B", faculty: "Dr. R. Kumar", x: 440, y: 80, degree: 3, saturation: 0 },
  { id: "v10", code: "CS402b", course: "OS Sec B", faculty: "Prof. A. Sharma", x: 440, y: 200, degree: 3, saturation: 0 },
  { id: "v11", code: "MA407b", course: "Discrete Math B", faculty: "Dr. S. Gupta", x: 30, y: 40, degree: 2, saturation: 0 },
  { id: "v12", code: "CS406b", course: "Networks B", faculty: "Prof. M. Reddy", x: 20, y: 260, degree: 2, saturation: 0 },
];

const RAW_EDGES: [string, string][] = [
  ["v1", "v2"], ["v1", "v3"], ["v1", "v7"], ["v1", "v8"],
  ["v2", "v3"], ["v2", "v8"],
  ["v3", "v4"], ["v3", "v8"], ["v3", "v9"],
  ["v4", "v5"], ["v4", "v8"], ["v4", "v10"],
  ["v5", "v6"], ["v5", "v8"],
  ["v6", "v7"], ["v6", "v8"], ["v6", "v12"],
  ["v7", "v8"], ["v7", "v11"],
  ["v9", "v10"],
];

export const HomeLiveDemoStrip: React.FC = () => {
  const [nodes, setNodes] = useState<DemoNode[]>(RAW_NODES);
  const [selectedNodeId, setSelectedNodeId] = useState<string>("v8");
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [speed, setSpeed] = useState<number>(900); // ms per step
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);

  // DSatur Step Execution
  const stepNext = () => {
    setNodes((prevNodes) => {
      // Find uncolored node with max saturation (tie breaker: max degree)
      const uncolored = prevNodes.filter((n) => !n.assignedColorId);
      if (uncolored.length === 0) {
        setIsPlaying(false);
        return prevNodes;
      }

      uncolored.sort((a, b) => {
        if (b.saturation !== a.saturation) return b.saturation - a.saturation;
        return b.degree - a.degree;
      });

      const target = uncolored[0];

      // Find neighbor colors
      const neighborIds = RAW_EDGES
        .filter(([u, v]) => u === target.id || v === target.id)
        .map(([u, v]) => (u === target.id ? v : u));

      const neighborColors = new Set(
        prevNodes
          .filter((n) => neighborIds.includes(n.id) && n.assignedColorId)
          .map((n) => n.assignedColorId)
      );

      // Find lowest available color
      let colorId = 1;
      while (neighborColors.has(colorId)) {
        colorId++;
      }

      setSelectedNodeId(target.id);
      setCurrentStepIndex((prev) => prev + 1);

      // Update node color & neighbor saturation
      return prevNodes.map((n) => {
        if (n.id === target.id) {
          return { ...n, assignedColorId: colorId };
        }
        if (neighborIds.includes(n.id) && !n.assignedColorId) {
          return { ...n, saturation: n.saturation + 1 };
        }
        return n;
      });
    });
  };

  const handleReset = () => {
    setIsPlaying(false);
    setCurrentStepIndex(0);
    setNodes(RAW_NODES.map((n) => ({ ...n, saturation: 0, assignedColorId: undefined })));
    setSelectedNodeId("v8");
  };

  // Play loop
  useEffect(() => {
    if (!isPlaying || prefersReducedMotion()) return;
    const interval = setInterval(() => {
      setNodes((current) => {
        const uncolored = current.filter((n) => !n.assignedColorId);
        if (uncolored.length === 0) {
          setIsPlaying(false);
          return current;
        }
        return current;
      });
      stepNext();
    }, speed);

    return () => clearInterval(interval);
  }, [isPlaying, speed]);

  const activeFocusId = hoveredNodeId || selectedNodeId;
  const activeNode = nodes.find((n) => n.id === activeFocusId) || nodes[0];
  const maxColorUsed = Math.max(0, ...nodes.map((n) => n.assignedColorId || 0));

  return (
    <section id="demo" className="py-24 px-4 sm:px-6 lg:px-8 bg-[#FAF7F0] border-t border-[#E8E2D2]">
      <div className="max-w-7xl mx-auto space-y-10">
        {/* Header */}
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="space-y-2">
            <div className="text-xs font-mono font-bold uppercase tracking-widest text-[#065F46] bg-[#D1FAE5] px-3 py-1 rounded-full w-fit border border-[#A7F3D0]">
              DAA Capstone Showcase
            </div>
            <h2 className="fluid-section-headline font-display font-bold text-[#14201B] tracking-tight">
              Interactive DSatur engine playback.
            </h2>
            <p className="text-sm text-[#5B6B63] max-w-lg">
              Observe vertex priority ranking and chromatic color allocation step by step.
            </p>
          </div>

          {/* Plain Text Chromatic Number Badge (LaTeX bug fixed) */}
          <div className="flex items-center gap-4 bg-white border border-[#E8E2D2] p-4 rounded-2xl shadow-subtle">
            <div>
              <div className="text-xs font-mono text-[#5B6B63]">Chromatic number χ(G)</div>
              <div className="text-2xl font-display font-bold text-[#10B981]">
                {maxColorUsed > 0 ? `${maxColorUsed} slots` : "Uncolored"}
              </div>
            </div>
            <div className="w-10 h-10 rounded-xl bg-[#D1FAE5] flex items-center justify-center text-[#065F46] font-bold">
              <Cpu className="w-5 h-5" />
            </div>
          </div>
        </div>

        {/* Interactive Playground Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Canvas (Span 8) */}
          <div className="lg:col-span-8 bg-white border border-[#E8E2D2] rounded-3xl p-6 shadow-soft flex flex-col justify-between">
            {/* Controls Bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-[#E8E2D2]">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="px-4 py-2 bg-[#10B981] hover:bg-[#059669] text-white text-xs font-semibold rounded-xl flex items-center gap-2 shadow-sm transition-all"
                >
                  {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                  <span>{isPlaying ? "Pause" : "Play DSatur"}</span>
                </button>

                <button
                  onClick={stepNext}
                  disabled={isPlaying}
                  className="px-3.5 py-2 bg-[#FAF7F0] hover:bg-[#F3EFE4] text-[#14201B] border border-[#E8E2D2] text-xs font-semibold rounded-xl flex items-center gap-1.5 transition-colors disabled:opacity-50"
                  title="Next Step"
                >
                  <SkipForward className="w-3.5 h-3.5" />
                  <span>Step</span>
                </button>

                <button
                  onClick={handleReset}
                  className="px-3 py-2 bg-[#FAF7F0] hover:bg-[#F3EFE4] text-[#5B6B63] border border-[#E8E2D2] text-xs font-medium rounded-xl flex items-center gap-1.5 transition-colors"
                  title="Reset graph"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset</span>
                </button>
              </div>

              {/* Speed toggle */}
              <div className="flex items-center gap-2 text-xs text-[#5B6B63]">
                <span>Speed:</span>
                {[
                  { label: "Slow", val: 1400 },
                  { label: "Norm", val: 800 },
                  { label: "Fast", val: 350 },
                ].map((s) => (
                  <button
                    key={s.label}
                    onClick={() => setSpeed(s.val)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-mono transition-colors ${
                      speed === s.val
                        ? "bg-[#10B981] text-white font-bold"
                        : "bg-[#FAF7F0] text-[#5B6B63] hover:text-[#14201B]"
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>

            {/* SVG Visualizer Canvas */}
            <div className="w-full h-[360px] relative flex items-center justify-center my-4 overflow-hidden">
              <svg viewBox="0 0 480 320" className="w-full h-full">
                {/* Selective conflict edges: highlight connected edges in emerald flow dash, dim others to 8% opacity */}
                {RAW_EDGES.map(([u, v], i) => {
                  const nodeU = nodes.find((n) => n.id === u);
                  const nodeV = nodes.find((n) => n.id === v);
                  if (!nodeU || !nodeV) return null;

                  const isConnected = activeFocusId === u || activeFocusId === v;

                  return (
                    <line
                      key={`edge-${i}`}
                      x1={nodeU.x}
                      y1={nodeU.y}
                      x2={nodeV.x}
                      y2={nodeV.y}
                      stroke={isConnected ? "#10B981" : "#E2E8F0"}
                      strokeWidth={isConnected ? 2.5 : 1}
                      strokeDasharray={isConnected ? "5,3" : "none"}
                      opacity={isConnected ? 1 : 0.25}
                      className="transition-all duration-200"
                    />
                  );
                })}

                {/* Nodes */}
                {nodes.map((node) => {
                  const isFocused = activeFocusId === node.id;
                  const colorObj = node.assignedColorId
                    ? DEMO_PALETTE[node.assignedColorId - 1]
                    : null;

                  return (
                    <g
                      key={node.id}
                      className="cursor-pointer transition-transform"
                      onClick={() => setSelectedNodeId(node.id)}
                      onMouseEnter={() => setHoveredNodeId(node.id)}
                      onMouseLeave={() => setHoveredNodeId(null)}
                    >
                      {/* Pulse halo for focused node */}
                      {isFocused && (
                        <circle
                          cx={node.x}
                          cy={node.y}
                          r={26}
                          fill="none"
                          stroke="#10B981"
                          strokeWidth="2"
                          strokeDasharray="4,3"
                        />
                      )}

                      {/* Node Body */}
                      <circle
                        cx={node.x}
                        cy={node.y}
                        r={20}
                        fill={colorObj ? colorObj.bg : "#FFFFFF"}
                        stroke={colorObj ? colorObj.border : isFocused ? "#10B981" : "#E8E2D2"}
                        strokeWidth={isFocused ? 2.5 : 1.5}
                        className="transition-colors duration-300"
                      />

                      {/* Subject Code Label */}
                      <text
                        x={node.x}
                        y={node.y + 4}
                        textAnchor="middle"
                        fontSize="9"
                        fontWeight="700"
                        fontFamily="JetBrains Mono"
                        fill={colorObj ? colorObj.text : "#14201B"}
                        pointerEvents="none"
                      >
                        {node.code}
                      </text>

                      {/* Saturation badge above node */}
                      <text
                        x={node.x}
                        y={node.y - 24}
                        textAnchor="middle"
                        fontSize="8"
                        fontFamily="JetBrains Mono"
                        fill="#5B6B63"
                        opacity={0.8}
                        pointerEvents="none"
                      >
                        sat:{node.saturation}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>

            {/* Hint bar */}
            <div className="pt-3 border-t border-[#E8E2D2] flex items-center justify-between text-xs text-[#5B6B63]">
              <div className="flex items-center gap-1.5">
                <Info className="w-3.5 h-3.5 text-[#10B981]" />
                <span>Hover or click any vertex to isolate its conflict neighborhood.</span>
              </div>
              <span className="font-mono text-[11px]">Step {currentStepIndex} of 12</span>
            </div>
          </div>

          {/* Right Vertex Inspector (Span 4) */}
          <div className="lg:col-span-4 bg-white border border-[#E8E2D2] rounded-3xl p-6 shadow-soft space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-[#E8E2D2]">
              <h3 className="font-display font-bold text-base text-[#14201B]">
                Vertex Inspector
              </h3>
              <span className="text-xs font-mono font-bold text-[#065F46] bg-[#D1FAE5] px-2.5 py-0.5 rounded-full">
                {activeNode.id.toUpperCase()}
              </span>
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex justify-between items-center p-3 rounded-2xl bg-[#FAF7F0] border border-[#E8E2D2]">
                <span className="text-[#5B6B63]">Subject Code:</span>
                <span className="font-mono font-bold text-[#14201B] text-sm">{activeNode.code}</span>
              </div>

              <div className="flex justify-between items-center p-3 rounded-2xl bg-[#FAF7F0] border border-[#E8E2D2]">
                <span className="text-[#5B6B63]">Course Title:</span>
                <span className="font-semibold text-[#14201B] truncate max-w-[160px] text-right">
                  {activeNode.course}
                </span>
              </div>

              <div className="flex justify-between items-center p-3 rounded-2xl bg-[#FAF7F0] border border-[#E8E2D2]">
                <span className="text-[#5B6B63]">Assigned Faculty:</span>
                <span className="font-semibold text-[#14201B]">{activeNode.faculty}</span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-2xl bg-[#FAF7F0] border border-[#E8E2D2]">
                  <div className="text-[#5B6B63] text-[11px]">Static Degree d(v)</div>
                  <div className="text-lg font-mono font-bold text-[#14201B] mt-0.5">
                    {activeNode.degree} edges
                  </div>
                </div>

                <div className="p-3 rounded-2xl bg-[#FAF7F0] border border-[#E8E2D2]">
                  <div className="text-[#5B6B63] text-[11px]">Saturation sat(v)</div>
                  <div className="text-lg font-mono font-bold text-[#10B981] mt-0.5">
                    {activeNode.saturation} colors
                  </div>
                </div>
              </div>

              {/* Allocated Slot */}
              <div className="p-4 rounded-2xl border border-[#E8E2D2] bg-[#FAF7F0]">
                <div className="text-[#5B6B63] text-[11px] mb-1.5">Allocated Time Slot:</div>
                {activeNode.assignedColorId ? (
                  <div className="flex items-center gap-2">
                    <span
                      className="w-3.5 h-3.5 rounded-full shrink-0"
                      style={{
                        backgroundColor:
                          DEMO_PALETTE[activeNode.assignedColorId - 1].bg,
                        border: `1.5px solid ${DEMO_PALETTE[activeNode.assignedColorId - 1].border}`,
                      }}
                    />
                    <span className="font-mono font-bold text-xs text-[#14201B]">
                      {DEMO_PALETTE[activeNode.assignedColorId - 1].name}
                    </span>
                  </div>
                ) : (
                  <span className="text-xs text-[#5B6B63] italic">Unassigned (pending in DSatur queue)</span>
                )}
              </div>
            </div>

            {/* DSatur Heuristic Rule Note */}
            <div className="p-3.5 rounded-2xl bg-[#D1FAE5]/50 border border-[#A7F3D0] text-xs text-[#065F46] leading-relaxed">
              <strong>Selection Rule:</strong> argmax(sat(v), deg(v)). Vertices with the fewest valid color options remaining are colored first.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
