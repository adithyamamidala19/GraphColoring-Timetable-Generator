import React from "react";
import { HeroSection } from "./HeroSection";
import { GraphColoringVisualizer } from "./GraphColoringVisualizer";
import { PinnedWorkflowCards } from "./PinnedWorkflowCards";
import { GraphNode, GraphEdge } from "@/types/timetable";
import { Cpu, ShieldCheck, Zap, Layers, BarChart3, CheckCircle2, ArrowRight } from "lucide-react";

interface LandingPageProps {
  onEnterWorkspace: () => void;
  sampleNodes: GraphNode[];
  sampleEdges: GraphEdge[];
  chromaticNumber: number;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onEnterWorkspace,
  sampleNodes,
  sampleEdges,
  chromaticNumber,
}) => {
  return (
    <div className="space-y-20 pb-24 bg-black">
      {/* 1. Hero Section with MarqueeAlongSvgPath */}
      <HeroSection
        onEnterWorkspace={onEnterWorkspace}
        onExploreAlgorithm={() => {
          const el = document.getElementById("algorithm-preview");
          el?.scrollIntoView({ behavior: "smooth" });
        }}
      />

      {/* 2. Pinned Tilted Cards Workflow Component (Images 1–3) */}
      <PinnedWorkflowCards />

      {/* 3. Problem Statement Section */}
      <div className="container max-w-6xl mx-auto px-6">
        <div className="text-center space-y-3 max-w-2xl mx-auto mb-12">
          <div className="text-xs font-black uppercase tracking-widest text-rose-400 bg-rose-500/10 px-3.5 py-1 rounded-full w-fit mx-auto border border-rose-500/20">
            The Scheduling Bottleneck
            <span className="font-cursive text-amber-300 font-bold ml-1.5 text-base">Human Error Risk</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-black text-white tracking-tight font-neuton">
            Why Manual University Timetabling Fails
          </h2>
          <p className="text-sm text-zinc-400">
            Manual scheduling across hundreds of faculty members, student sections, and laboratories leads to exponential conflict complexity.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-zinc-950 border border-white/10 rounded-3xl p-6 space-y-3 shadow-2xl hover:border-rose-500/40 transition-all bg-dot-matrix">
            <div className="w-10 h-10 rounded-2xl bg-rose-500/10 text-rose-400 flex items-center justify-center font-black">
              01
            </div>
            <h3 className="text-2xl font-bold text-white font-neuton">Teacher Overlap Conflicts</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Faculty members accidentally assigned to teach two different sections during the exact same period, causing class delays and administrative friction.
            </p>
          </div>

          <div className="bg-zinc-950 border border-white/10 rounded-3xl p-6 space-y-3 shadow-2xl hover:border-amber-500/40 transition-all bg-dot-matrix">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/10 text-amber-400 flex items-center justify-center font-black">
              02
            </div>
            <h3 className="text-2xl font-bold text-white font-neuton">Room Capacity & Mismatches</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              60 students packed into 30-capacity rooms, or lab sessions assigned to regular lecture halls lacking required hardware infrastructure.
            </p>
          </div>

          <div className="bg-zinc-950 border border-white/10 rounded-3xl p-6 space-y-3 shadow-2xl hover:border-emerald-500/40 transition-all bg-dot-matrix">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-black">
              03
            </div>
            <h3 className="text-2xl font-bold text-white font-neuton">Uneven Workload Distribution</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Faculty scheduled for 6 back-to-back hours without breaks, while specialized laboratories sit empty during prime academic slots.
            </p>
          </div>
        </div>
      </div>

      {/* 4. Solution & Algorithm Section with Node-to-Node Current Flow Animation */}
      <div id="algorithm-preview" className="container max-w-6xl mx-auto px-6 space-y-8">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="text-xs font-black uppercase tracking-widest text-emerald-400 bg-emerald-500/10 px-3.5 py-1 rounded-full w-fit mx-auto border border-emerald-500/20">
            Graph Theory Solution
            <span className="font-cursive text-amber-300 font-bold ml-1.5 text-base">Mathematical Proof</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-black text-white tracking-tight font-neuton">
            Graph Coloring Algorithm
          </h2>
          <p className="text-sm text-zinc-400">
            We model every class session as a vertex V_i and every scheduling constraint as an undirected edge E_ij. Time slots are colors assigned to guarantee zero adjacent conflicts.
          </p>
        </div>

        <GraphColoringVisualizer
          nodes={sampleNodes}
          edges={sampleEdges}
          chromaticNumber={chromaticNumber}
        />
      </div>

      {/* 5. Core Features Showcase */}
      <div className="container max-w-6xl mx-auto px-6">
        <div className="bg-gradient-to-r from-zinc-950 via-black to-zinc-950 border border-white/10 rounded-3xl p-8 lg:p-12 shadow-2xl space-y-8 bg-grid-kinetic">
          <div className="max-w-2xl space-y-3">
            <div className="text-xs font-black uppercase tracking-widest text-emerald-400 bg-emerald-500/10 px-3.5 py-1 rounded-full w-fit border border-emerald-500/20">
              Complete Feature Suite
              <span className="font-cursive text-amber-300 font-bold ml-1.5 text-base">Enterprise Scale</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-black text-white tracking-tight font-neuton">
              Built for Modern Universities & Colleges
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="space-y-2">
              <ShieldCheck className="w-8 h-8 text-emerald-400" />
              <h4 className="font-bold text-base text-white font-neuton">Hard Constraints Gate</h4>
              <p className="text-xs text-zinc-400">Guarantees zero teacher double-booking, room overlap, or section collision.</p>
            </div>

            <div className="space-y-2">
              <Zap className="w-8 h-8 text-amber-400" />
              <h4 className="font-bold text-base text-white font-neuton">Sub-50ms Graph Solver</h4>
              <p className="text-xs text-zinc-400">Computes chromatic number and assigns slots in milliseconds using DSatur heuristic.</p>
            </div>

            <div className="space-y-2">
              <Layers className="w-8 h-8 text-purple-400" />
              <h4 className="font-bold text-base text-white font-neuton">Lab & Theory Rules</h4>
              <p className="text-xs text-zinc-400">Intelligent handling of multi-hour practical laboratory continuous slots.</p>
            </div>

            <div className="space-y-2">
              <BarChart3 className="w-8 h-8 text-cyan-400" />
              <h4 className="font-bold text-base text-white font-neuton">Analytics & Exporters</h4>
              <p className="text-xs text-zinc-400">Room utilization metrics, faculty workload distribution, and instant CSV/PDF export.</p>
            </div>
          </div>

          <div className="pt-4 border-t border-white/10 flex justify-center">
            <button
              onClick={onEnterWorkspace}
              className="px-9 py-4 rounded-2xl bg-emerald-500 text-black font-black shadow-xl shadow-emerald-500/25 hover:bg-emerald-400 transition-all flex items-center gap-3 text-sm hover:scale-105"
            >
              Open Timetable Application Workspace
              <ArrowRight className="w-4 h-4 text-black" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
