import React, { useState, useEffect, useRef } from "react";
import { GraphNode, GraphEdge } from "@/types/timetable";
import {
  Play,
  Pause,
  SkipForward,
  RotateCcw,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Layers,
  Cpu,
  Info,
} from "lucide-react";
import { prefersReducedMotion } from "@/motion";

interface DeclutteredGraphProps {
  nodes: GraphNode[];
  edges: GraphEdge[];
  chromaticNumber: number;
}

// 6 slot colors from the pastel design system
const SLOT_LEGEND = [
  { id: 1, label: "Slot 1 (09:00 AM)", bg: "#BAE6FD", border: "#7DD3FC", text: "#0369A1" },
  { id: 2, label: "Slot 2 (10:00 AM)", bg: "#DDD6FE", border: "#C4B5FD", text: "#5B21B6" },
  { id: 3, label: "Slot 3 (11:15 AM)", bg: "#FED7AA", border: "#FDBA74", text: "#9A3412" },
  { id: 4, label: "Slot 4 (12:15 PM)", bg: "#FECDD3", border: "#FDA4AF", text: "#9F1239" },
  { id: 5, label: "Slot 5 (02:00 PM)", bg: "#FEF08A", border: "#FDE047", text: "#854D0E" },
  { id: 6, label: "Slot 6 (03:00 PM)", bg: "#A7F3D0", border: "#6EE7B7", text: "#065F46" },
];

export const DeclutteredGraph: React.FC<DeclutteredGraphProps> = ({
  nodes,
  edges,
  chromaticNumber,
}) => {
  const [selectedNodeId, setSelectedNodeId] = useState<string>(nodes[0]?.id || "");
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);
  const [layoutMode, setLayoutMode] = useState<"radial" | "clustered">("radial");
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [speedMs, setSpeedMs] = useState<number>(1000);
  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);
  const [dashOffset, setDashOffset] = useState<number>(0);

  // Animate edge dash pulse
  useEffect(() => {
    if (prefersReducedMotion()) return;
    const interval = setInterval(() => {
      setDashOffset((prev) => (prev + 1) % 100);
    }, 40);
    return () => clearInterval(interval);
  }, []);

  // Playback timer
  useEffect(() => {
    if (!isPlaying || prefersReducedMotion() || nodes.length === 0) return;
    const interval = setInterval(() => {
      setActiveStepIndex((prev) => {
        const next = (prev + 1) % nodes.length;
        setSelectedNodeId(nodes[next]?.id || "");
        return next;
      });
    }, speedMs);
    return () => clearInterval(interval);
  }, [isPlaying, speedMs, nodes]);

  const activeFocusId = hoveredNodeId || selectedNodeId;
  const activeNode = nodes.find((n) => n.id === activeFocusId) || nodes[0];

  // Canvas geometry
  const width = 640;
  const height = 480;
  const centerX = width / 2;
  const centerY = height / 2;

  // Calculate Node Positions based on Radial vs Clustered layout
  const positionedNodes = nodes.map((node, index) => {
    if (layoutMode === "radial") {
      const angle = (index / nodes.length) * 2 * Math.PI - Math.PI / 2;
      const radius = 175;
      return {
        ...node,
        cx: centerX + radius * Math.cos(angle),
        cy: centerY + radius * Math.sin(angle),
      };
    } else {
      // Clustered by subject
      const colorClusterIndex = (node.colorId || 1) - 1;
      const clusterAngle = (colorClusterIndex / 6) * 2 * Math.PI;
      const clusterCenterX = centerX + 120 * Math.cos(clusterAngle);
      const clusterCenterY = centerY + 120 * Math.sin(clusterAngle);

      const offsetAngle = (index % 4) * (Math.PI / 2);
      const subRadius = 45;
      return {
        ...node,
        cx: clusterCenterX + subRadius * Math.cos(offsetAngle),
        cy: clusterCenterY + subRadius * Math.sin(offsetAngle),
      };
    }
  });

  const nodePosMap = new Map(positionedNodes.map((n) => [n.id, n]));

  // Find neighbor IDs connected to active node
  const activeNeighborIds = new Set<string>();
  if (activeFocusId) {
    edges.forEach((edge) => {
      if (edge.source === activeFocusId) activeNeighborIds.add(edge.target);
      if (edge.target === activeFocusId) activeNeighborIds.add(edge.source);
    });
  }

  const handleStepNext = () => {
    setActiveStepIndex((prev) => {
      const next = (prev + 1) % nodes.length;
      setSelectedNodeId(nodes[next]?.id || "");
      return next;
    });
  };

  const handleReset = () => {
    setIsPlaying(false);
    setActiveStepIndex(0);
    setSelectedNodeId(nodes[0]?.id || "");
  };

  return (
    <div className="space-y-6">
      {/* Header Bar: LaTeX Bug Fixed to plain text "Chromatic number χ(G)" */}
      <div className="bg-white border border-[#E8E2D2] rounded-3xl p-5 shadow-soft flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAF7F0] border border-[#E8E2D2] text-[#065F46] text-xs font-semibold">
            <Cpu className="w-3.5 h-3.5 text-[#10B981]" />
            <span>Graph Theory Model</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-display font-bold text-[#14201B] tracking-tight mt-1">
            Vertex Conflict Graph & Chromatic Allocation
          </h2>
          <p className="text-xs text-[#5B6B63] mt-0.5">
            Edges isolated on interaction to eliminate visual clutter.
          </p>
        </div>

        {/* Chromatic Number χ(G) plain text pill */}
        <div className="flex items-center gap-3">
          <div className="px-4 py-2 rounded-2xl bg-[#D1FAE5] border border-[#A7F3D0] text-center">
            <div className="text-[10px] font-mono text-[#065F46] uppercase font-bold tracking-wider">
              Chromatic number χ(G)
            </div>
            <div className="text-xl font-display font-extrabold text-[#065F46]">
              {chromaticNumber} Slots
            </div>
          </div>
        </div>
      </div>

      {/* Main Graph Grid: Left SVG Canvas, Right Vertex Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Interactive SVG Canvas (Span 8) */}
        <div className="lg:col-span-8 bg-white border border-[#E8E2D2] rounded-3xl p-5 shadow-soft flex flex-col justify-between">
          {/* Controls Bar: Layout toggle, Play/Pause/Step/Reset, Zoom */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[#E8E2D2]">
            {/* Playback Controls */}
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="px-3 py-1.5 bg-[#10B981] hover:bg-[#059669] text-white text-xs font-semibold rounded-xl flex items-center gap-1.5 shadow-sm transition-all"
              >
                {isPlaying ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
                <span>{isPlaying ? "Pause" : "Play"}</span>
              </button>

              <button
                onClick={handleStepNext}
                disabled={isPlaying}
                className="px-3 py-1.5 bg-[#FAF7F0] hover:bg-[#F3EFE4] text-[#14201B] border border-[#E8E2D2] text-xs font-semibold rounded-xl flex items-center gap-1 transition-colors disabled:opacity-50"
              >
                <SkipForward className="w-3 h-3" />
                <span>Step</span>
              </button>

              <button
                onClick={handleReset}
                className="px-2.5 py-1.5 bg-[#FAF7F0] hover:bg-[#F3EFE4] text-[#5B6B63] border border-[#E8E2D2] text-xs rounded-xl transition-colors"
                title="Reset"
              >
                <RotateCcw className="w-3 h-3" />
              </button>
            </div>

            {/* Layout Toggle: Radial vs Clustered */}
            <div className="flex items-center gap-1 bg-[#FAF7F0] p-1 rounded-xl border border-[#E8E2D2] text-xs font-semibold">
              <button
                onClick={() => setLayoutMode("radial")}
                className={`px-3 py-1 rounded-lg transition-colors ${
                  layoutMode === "radial"
                    ? "bg-white text-[#14201B] shadow-subtle border border-[#E8E2D2]"
                    : "text-[#5B6B63] hover:text-[#14201B]"
                }`}
              >
                Radial
              </button>
              <button
                onClick={() => setLayoutMode("clustered")}
                className={`px-3 py-1 rounded-lg transition-colors ${
                  layoutMode === "clustered"
                    ? "bg-white text-[#14201B] shadow-subtle border border-[#E8E2D2]"
                    : "text-[#5B6B63] hover:text-[#14201B]"
                }`}
              >
                Clustered
              </button>
            </div>

            {/* Zoom Controls */}
            <div className="flex items-center gap-1">
              <button
                onClick={() => setZoomLevel((z) => Math.min(1.6, z + 0.15))}
                className="p-1.5 rounded-lg bg-[#FAF7F0] hover:bg-[#F3EFE4] border border-[#E8E2D2] text-[#5B6B63]"
                title="Zoom in"
              >
                <ZoomIn className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setZoomLevel((z) => Math.max(0.7, z - 0.15))}
                className="p-1.5 rounded-lg bg-[#FAF7F0] hover:bg-[#F3EFE4] border border-[#E8E2D2] text-[#5B6B63]"
                title="Zoom out"
              >
                <ZoomOut className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setZoomLevel(1)}
                className="p-1.5 rounded-lg bg-[#FAF7F0] hover:bg-[#F3EFE4] border border-[#E8E2D2] text-[#5B6B63]"
                title="Reset zoom"
              >
                <Maximize2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* SVG Canvas Area */}
          <div className="w-full h-[420px] relative flex items-center justify-center overflow-hidden my-3 bg-[#FAF7F0]/40 rounded-2xl border border-[#E8E2D2]/60">
            <svg
              viewBox={`0 0 ${width} ${height}`}
              className="w-full h-full transition-transform duration-300"
              style={{ transform: `scale(${zoomLevel})` }}
            >
              {/* Edges Layer: Default 8% opacity thin light-gray */}
              {edges.map((edge) => {
                const source = nodePosMap.get(edge.source);
                const target = nodePosMap.get(edge.target);
                if (!source || !target) return null;

                const isConnected =
                  activeFocusId === source.id || activeFocusId === target.id;

                return (
                  <line
                    key={edge.id}
                    x1={source.cx}
                    y1={source.cy}
                    x2={target.cx}
                    y2={target.cy}
                    stroke={isConnected ? "#10B981" : "#E2E8F0"}
                    strokeWidth={isConnected ? 2.5 : 1}
                    strokeDasharray={isConnected ? "6,4" : "none"}
                    strokeDashoffset={isConnected ? -dashOffset : 0}
                    opacity={isConnected ? 1 : 0.08}
                    className="transition-all duration-200"
                  />
                );
              })}

              {/* Vertices Layer */}
              {positionedNodes.map((node) => {
                const isFocused = activeFocusId === node.id;
                const isNeighbor = activeNeighborIds.has(node.id);
                const legendColor =
                  SLOT_LEGEND[(node.colorId || 1) - 1] || SLOT_LEGEND[0];

                return (
                  <g
                    key={node.id}
                    className="cursor-pointer transition-transform"
                    onClick={() => setSelectedNodeId(node.id)}
                    onMouseEnter={() => setHoveredNodeId(node.id)}
                    onMouseLeave={() => setHoveredNodeId(null)}
                  >
                    {/* Focus Halo Ring */}
                    {isFocused && (
                      <circle
                        cx={node.cx}
                        cy={node.cy}
                        r={26}
                        fill="none"
                        stroke="#10B981"
                        strokeWidth="2"
                        strokeDasharray="4,4"
                      />
                    )}

                    {/* Neighbor highlight indicator */}
                    {isNeighbor && (
                      <circle
                        cx={node.cx}
                        cy={node.cy}
                        r={22}
                        fill="none"
                        stroke="#F59E0B"
                        strokeWidth="1.5"
                        strokeDasharray="3,3"
                      />
                    )}

                    {/* Node Core Circle */}
                    <circle
                      cx={node.cx}
                      cy={node.cy}
                      r={18}
                      fill={legendColor.bg}
                      stroke={isFocused ? "#10B981" : legendColor.border}
                      strokeWidth={isFocused ? 2.5 : 1.5}
                      opacity={activeFocusId && !isFocused && !isNeighbor ? 0.35 : 1}
                      className="transition-all duration-200"
                    />

                    {/* Subject Code Label */}
                    <text
                      x={node.cx}
                      y={node.cy + 3.5}
                      textAnchor="middle"
                      fontSize="8.5"
                      fontWeight="700"
                      fontFamily="JetBrains Mono"
                      fill={legendColor.text}
                      pointerEvents="none"
                      opacity={activeFocusId && !isFocused && !isNeighbor ? 0.4 : 1}
                    >
                      {node.subjectCode}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Slot Color Palette Legend at Bottom of Canvas */}
          <div className="pt-3 border-t border-[#E8E2D2]">
            <div className="text-[11px] font-semibold text-[#5B6B63] mb-2">
              Assigned Time Slot Palette:
            </div>
            <div className="flex flex-wrap gap-2">
              {SLOT_LEGEND.slice(0, chromaticNumber).map((slot) => (
                <div
                  key={slot.id}
                  className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl text-[11px] font-semibold border shadow-subtle"
                  style={{
                    backgroundColor: slot.bg,
                    borderColor: slot.border,
                    color: slot.text,
                  }}
                >
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: slot.text }} />
                  <span>{slot.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Vertex Inspector (Span 4) */}
        <div className="lg:col-span-4 bg-white border border-[#E8E2D2] rounded-3xl p-6 shadow-soft space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-[#E8E2D2]">
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-[#10B981]" />
              <h3 className="font-display font-bold text-base text-[#14201B]">
                Vertex Inspector
              </h3>
            </div>
            <span className="font-mono text-xs font-bold text-[#065F46] bg-[#D1FAE5] px-2.5 py-0.5 rounded-full">
              {activeNode?.id}
            </span>
          </div>

          {activeNode ? (
            <div className="space-y-3 text-xs">
              <div className="flex justify-between items-center p-3 rounded-2xl bg-[#FAF7F0] border border-[#E8E2D2]">
                <span className="text-[#5B6B63]">Subject Code:</span>
                <span className="font-mono font-bold text-[#14201B] text-sm">
                  {activeNode.subjectCode}
                </span>
              </div>

              <div className="flex justify-between items-center p-3 rounded-2xl bg-[#FAF7F0] border border-[#E8E2D2]">
                <span className="text-[#5B6B63]">Assigned Faculty:</span>
                <span className="font-bold text-[#14201B]">{activeNode.teacherName}</span>
              </div>

              <div className="flex justify-between items-center p-3 rounded-2xl bg-[#FAF7F0] border border-[#E8E2D2]">
                <span className="text-[#5B6B63]">Target Section:</span>
                <span className="font-mono font-bold text-[#14201B]">
                  {activeNode.sectionName}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-2xl bg-[#FAF7F0] border border-[#E8E2D2]">
                  <div className="text-[#5B6B63] text-[11px]">Degree d(v)</div>
                  <div className="text-xl font-display font-bold text-[#14201B] mt-0.5">
                    {activeNode.degree}
                  </div>
                  <div className="text-[10px] text-[#5B6B63]">Conflict edges</div>
                </div>

                <div className="p-3 rounded-2xl bg-[#FAF7F0] border border-[#E8E2D2]">
                  <div className="text-[#5B6B63] text-[11px]">Saturation sat(v)</div>
                  <div className="text-xl font-display font-bold text-[#10B981] mt-0.5">
                    {activeNode.colorId ? activeNode.colorId : 1}
                  </div>
                  <div className="text-[10px] text-[#5B6B63]">Unique colors</div>
                </div>
              </div>

              {/* Slot Color */}
              <div className="p-3.5 rounded-2xl bg-[#FAF7F0] border border-[#E8E2D2]">
                <div className="text-[#5B6B63] text-[11px] mb-1">Allocated Slot Color:</div>
                <div className="flex items-center gap-2">
                  <span
                    className="w-4 h-4 rounded-full border shadow-sm"
                    style={{
                      backgroundColor:
                        SLOT_LEGEND[(activeNode.colorId || 1) - 1]?.bg || "#A7F3D0",
                      borderColor:
                        SLOT_LEGEND[(activeNode.colorId || 1) - 1]?.border || "#6EE7B7",
                    }}
                  />
                  <span className="font-mono font-bold text-xs text-[#14201B]">
                    Slot #{activeNode.colorId || 1} •{" "}
                    {SLOT_LEGEND[(activeNode.colorId || 1) - 1]?.label}
                  </span>
                </div>
              </div>
            </div>
          ) : null}

          {/* Conflict Neighbors Summary */}
          <div className="p-3.5 rounded-2xl bg-[#FAF7F0] border border-[#E8E2D2] text-xs space-y-1.5">
            <div className="font-semibold text-[#14201B] flex items-center gap-1.5">
              <Info className="w-3.5 h-3.5 text-[#10B981]" />
              <span>Isolated Neighborhood</span>
            </div>
            <p className="text-[#5B6B63] leading-relaxed text-[11px]">
              This vertex shares mutual exclusions with {activeNeighborIds.size} other
              class sessions. No two connected nodes share the same chromatic slot.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
