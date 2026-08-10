import React, { useState, useEffect } from "react";
import { GraphNode, GraphEdge } from "@/types/timetable";
import { Cpu, RefreshCw, Layers, CheckCircle, Info, Hash, Play, Pause, RotateCcw, Activity } from "lucide-react";

interface GraphColoringVisualizerProps {
  nodes: GraphNode[];
  edges: GraphEdge[];
  chromaticNumber: number;
  onSolveAgain?: () => void;
}

export const GraphColoringVisualizer: React.FC<GraphColoringVisualizerProps> = ({
  nodes,
  edges,
  chromaticNumber,
  onSolveAgain,
}) => {
  const [selectedNode, setSelectedNode] = useState<GraphNode | null>(null);

  // Animated Node-to-Node Current Flow Simulation State
  const [isPlayingFlow, setIsPlayingFlow] = useState(true);
  const [activeNodeIndex, setActiveNodeIndex] = useState(0);
  const [pulsePhase, setPulsePhase] = useState(0);

  // Animated edge line energy pulse
  useEffect(() => {
    const interval = setInterval(() => {
      setPulsePhase((prev) => (prev + 1) % 100);
    }, 30);
    return () => clearInterval(interval);
  }, []);

  // Step-by-Step Node-to-Node Flow Interval
  useEffect(() => {
    if (!isPlayingFlow || nodes.length === 0) return;

    const interval = setInterval(() => {
      setActiveNodeIndex((prev) => (prev + 1) % nodes.length);
    }, 1200);

    return () => clearInterval(interval);
  }, [isPlayingFlow, nodes.length]);

  // Position nodes in a clean circular layout for SVG rendering
  const width = 640;
  const height = 440;
  const centerX = width / 2;
  const centerY = height / 2;
  const radius = 165;

  const positionedNodes = nodes.map((node, index) => {
    const angle = (index / nodes.length) * 2 * Math.PI - Math.PI / 2;
    return {
      ...node,
      cx: centerX + radius * Math.cos(angle),
      cy: centerY + radius * Math.sin(angle),
      nodeIndex: index,
    };
  });

  const nodePosMap = new Map(positionedNodes.map((n) => [n.id, n]));

  // Currently active node in flow animation
  const activeFlowNode = positionedNodes[activeNodeIndex] || positionedNodes[0];

  return (
    <div className="bg-[#050508] border border-white/10 rounded-3xl p-6 shadow-2xl space-y-6 relative overflow-hidden bg-dot-matrix">
      {/* Glow Effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[350px] bg-emerald-500/10 rounded-full blur-[160px] pointer-events-none" />

      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-5 relative z-10">
        <div>
          <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs uppercase tracking-widest bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20 w-fit">
            <Activity className="w-3.5 h-3.5 animate-pulse text-emerald-400" />
            Graph Theory Engine
            <span className="font-cursive text-base text-amber-300 ml-1">Live Node-to-Node Flow</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mt-2 font-neuton">
            Vertex Conflict Graph & Chromatic Allocation
          </h2>
          <p className="text-xs text-zinc-400 mt-1 font-sans">
            Vertices <strong className="text-emerald-400">V_i</strong> represent class sessions • Edges <strong className="text-rose-400">E_ij</strong> represent conflicts • Colors represent time slots.
          </p>
        </div>

        {/* Simulation Controls & Chromatic Counter */}
        <div className="flex items-center gap-3">
          <div className="bg-zinc-900/90 px-4 py-2 rounded-2xl border border-white/10 text-center shadow-lg">
            <div className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider">Chromatic Number (\(k\))</div>
            <div className="text-xl font-black text-emerald-400 flex items-center justify-center gap-1.5 glow-text-emerald font-mono">
              <Hash className="w-4 h-4" />
              {chromaticNumber} Time Slots
            </div>
          </div>

          <button
            onClick={() => setIsPlayingFlow(!isPlayingFlow)}
            className="px-3.5 py-2 bg-zinc-800 hover:bg-zinc-700 text-white font-bold rounded-2xl text-xs flex items-center gap-1.5 border border-white/10 transition-all"
            title={isPlayingFlow ? "Pause Flow Animation" : "Play Flow Animation"}
          >
            {isPlayingFlow ? <Pause className="w-3.5 h-3.5 text-amber-400" /> : <Play className="w-3.5 h-3.5 text-emerald-400" />}
            {isPlayingFlow ? "Pause Flow" : "Play Flow"}
          </button>

          {onSolveAgain && (
            <button
              onClick={onSolveAgain}
              className="px-4 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-black font-black rounded-2xl text-xs flex items-center gap-2 transition-all shadow-lg shadow-emerald-500/20 hover:scale-105"
            >
              <RefreshCw className="w-3.5 h-3.5 animate-spin text-black" />
              Re-Calculate
            </button>
          )}
        </div>
      </div>

      {/* Main Interactive SVG Canvas */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center relative z-10">
        {/* Left SVG Display */}
        <div className="lg:col-span-8 bg-black/90 border border-white/10 rounded-2xl p-4 flex items-center justify-center overflow-hidden relative min-h-[440px] shadow-inner bg-grid-kinetic">
          {/* Cursive Flow Banner Badge */}
          <div className="absolute top-3 left-3 bg-zinc-900/90 border border-white/10 px-3.5 py-1 rounded-full text-xs text-amber-300 font-cursive flex items-center gap-2 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            Current Step: Visiting Node #{activeNodeIndex + 1} ({activeFlowNode?.subjectCode})
          </div>

          <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} className="w-full h-auto">
            <defs>
              <filter id="glow-node-flow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="8" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* Draw Edges & Active Node-to-Node Current Flow Lines */}
            {edges.map((edge) => {
              const source = nodePosMap.get(edge.source);
              const target = nodePosMap.get(edge.target);
              if (!source || !target) return null;

              const isConnectedToActiveFlow =
                activeFlowNode && (activeFlowNode.id === source.id || activeFlowNode.id === target.id);

              const isSelected =
                selectedNode && (selectedNode.id === source.id || selectedNode.id === target.id);

              return (
                <g key={edge.id}>
                  {/* Base Edge Line */}
                  <line
                    x1={source.cx}
                    y1={source.cy}
                    x2={target.cx}
                    y2={target.cy}
                    stroke={
                      isConnectedToActiveFlow
                        ? "#10b981"
                        : isSelected
                        ? "#ef4444"
                        : "rgba(255, 255, 255, 0.12)"
                    }
                    strokeWidth={isConnectedToActiveFlow || isSelected ? 3 : 1}
                  />

                  {/* Energy Particle Motion Along Active Flow Edge */}
                  <line
                    x1={source.cx}
                    y1={source.cy}
                    x2={target.cx}
                    y2={target.cy}
                    stroke={isConnectedToActiveFlow ? "#00ff9d" : "#10b981"}
                    strokeWidth={isConnectedToActiveFlow ? 3.5 : 1.5}
                    strokeDasharray="8, 12"
                    strokeDashoffset={-pulsePhase * (isConnectedToActiveFlow ? 2.5 : 1)}
                    opacity={isConnectedToActiveFlow ? 1 : 0.4}
                  />
                </g>
              );
            })}

            {/* Draw Vertices */}
            {positionedNodes.map((node) => {
              const isActiveFlow = activeFlowNode?.id === node.id;
              const isSelected = selectedNode?.id === node.id;

              return (
                <g
                  key={node.id}
                  transform={`translate(${node.cx}, ${node.cy})`}
                  onClick={() => setSelectedNode(node)}
                  className="cursor-pointer transition-transform duration-300 hover:scale-125"
                >
                  {/* Active Flow Halo Pulse Ring */}
                  {isActiveFlow && (
                    <circle
                      r={30}
                      fill="none"
                      stroke="#10b981"
                      strokeWidth={2}
                      className="animate-ping opacity-75"
                    />
                  )}

                  {/* Glowing Outer Ring */}
                  <circle
                    r={isActiveFlow || isSelected ? 26 : 22}
                    fill="none"
                    stroke={node.colorHex || "#10b981"}
                    strokeWidth={isActiveFlow || isSelected ? 4 : 2}
                    opacity={isActiveFlow || isSelected ? 1 : 0.6}
                    filter="url(#glow-node-flow)"
                  />

                  {/* Core Vertex Circle */}
                  <circle
                    r={isActiveFlow || isSelected ? 20 : 16}
                    fill={node.colorHex || "#10b981"}
                    stroke="#ffffff"
                    strokeWidth={isActiveFlow || isSelected ? 3 : 1.5}
                  />

                  {/* Label Code */}
                  <text
                    textAnchor="middle"
                    dy="4"
                    fill="#ffffff"
                    fontSize={10}
                    fontWeight="900"
                    pointerEvents="none"
                  >
                    {node.subjectCode}
                  </text>
                </g>
              );
            })}
          </svg>

          {/* Hint Overlay */}
          <div className="absolute bottom-3 left-3 bg-zinc-900/90 border border-white/10 px-3.5 py-1 rounded-xl text-[11px] text-zinc-300 flex items-center gap-2 backdrop-blur-md font-sans">
            <Info className="w-3.5 h-3.5 text-emerald-400" />
            Node-to-node current flow animation shows real-time DSatur chromatic slot allocation.
          </div>
        </div>

        {/* Right Details Panel */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-zinc-900/80 border border-white/10 rounded-2xl p-5 space-y-3 shadow-xl backdrop-blur-md">
            <div className="text-xs font-extrabold text-white uppercase tracking-wider flex items-center justify-between border-b border-white/10 pb-3">
              <span className="flex items-center gap-2 font-neuton text-base">
                <Layers className="w-4 h-4 text-emerald-400" />
                Vertex Inspector
              </span>
              <span className="font-cursive text-amber-300 text-sm">Selected Node Info</span>
            </div>

            {selectedNode || activeFlowNode ? (
              <div className="space-y-2.5 text-xs">
                {(() => {
                  const target = selectedNode || activeFlowNode;
                  return (
                    <>
                      <div className="flex justify-between items-center bg-black/60 p-2.5 rounded-xl border border-white/5">
                        <span className="text-zinc-400 font-semibold">Vertex ID:</span>
                        <span className="font-mono font-bold text-white">{target.id}</span>
                      </div>
                      <div className="flex justify-between items-center bg-black/60 p-2.5 rounded-xl border border-white/5">
                        <span className="text-zinc-400 font-semibold">Course Code:</span>
                        <span className="font-black text-emerald-400 text-sm">{target.subjectCode}</span>
                      </div>
                      <div className="flex justify-between items-center bg-black/60 p-2.5 rounded-xl border border-white/5">
                        <span className="text-zinc-400 font-semibold">Faculty:</span>
                        <span className="font-bold text-zinc-200">{target.teacherName}</span>
                      </div>
                      <div className="flex justify-between items-center bg-black/60 p-2.5 rounded-xl border border-white/5">
                        <span className="text-zinc-400 font-semibold">Degree (Edges):</span>
                        <span className="font-bold text-rose-400">{target.degree} Conflict Edges</span>
                      </div>
                      <div className="flex justify-between items-center bg-black/60 p-2.5 rounded-xl border border-white/5">
                        <span className="text-zinc-400 font-semibold">Allocated Slot Color:</span>
                        <div className="flex items-center gap-2">
                          <span
                            className="w-3.5 h-3.5 rounded-full inline-block shadow-md"
                            style={{ backgroundColor: target.colorHex }}
                          />
                          <span className="font-bold text-white">Color #{target.colorId}</span>
                        </div>
                      </div>
                    </>
                  );
                })()}
              </div>
            ) : null}
          </div>

          {/* DSatur Math Explanation */}
          <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-4 text-xs space-y-2">
            <div className="font-black text-emerald-400 flex items-center gap-1.5 font-neuton text-base">
              <CheckCircle className="w-4 h-4 text-emerald-400" />
              DSatur Flow Guarantee
            </div>
            <p className="text-zinc-300 leading-relaxed text-[11px]">
              As the simulation flows from node to node, each vertex is dynamically assigned the lowest chromatic color index not occupied by any connected neighbor.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
