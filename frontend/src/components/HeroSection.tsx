import React from "react";
import MarqueeAlongSvgPath from "@/components/ui/marquee-along-svg-path";
import { Sparkles, Calendar, Cpu, ArrowRight, CheckCircle2, Zap, Shield } from "lucide-react";

interface HeroSectionProps {
  onEnterWorkspace: () => void;
  onExploreAlgorithm: () => void;
}

const path =
  "M1 209.434C58.5872 255.935 387.926 325.938 482.583 209.434C600.905 63.8051 525.516 -43.2211 427.332 19.9613C329.149 83.1436 352.902 242.723 515.041 267.302C644.752 286.966 943.56 181.94 995 156.5";

const academicSubjectCards = [
  { code: "CS401", title: "Algorithms", teacher: "Dr. R. Kumar", room: "LH-101", color: "from-emerald-500 to-teal-700" },
  { code: "CS402", title: "Operating Systems", teacher: "Prof. A. Sharma", room: "LH-102", color: "from-cyan-600 to-emerald-800" },
  { code: "CS403P", title: "DAA Lab", teacher: "Dr. R. Kumar", room: "LAB-201", color: "from-purple-600 to-indigo-900" },
  { code: "CS404", title: "DBMS", teacher: "Dr. V. Patel", room: "LH-101", color: "from-amber-500 to-orange-700" },
  { code: "CS405P", title: "DBMS Lab", teacher: "Dr. V. Patel", room: "LAB-202", color: "from-pink-600 to-rose-900" },
  { code: "CS406", title: "Networks", teacher: "Prof. M. Reddy", room: "LH-102", color: "from-emerald-600 to-cyan-800" },
  { code: "MA407", title: "Discrete Math", teacher: "Dr. S. Gupta", room: "LH-101", color: "from-violet-600 to-purple-900" },
];

export const HeroSection: React.FC<HeroSectionProps> = ({
  onEnterWorkspace,
  onExploreAlgorithm,
}) => {
  return (
    <div className="relative min-h-[90vh] bg-black flex flex-col justify-center overflow-hidden border-b border-white/10 pt-8 pb-12">
      {/* Premium Glow Background Flares */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-emerald-500/10 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute top-1/3 right-5 w-[450px] h-[350px] bg-purple-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="container max-w-7xl mx-auto px-6 py-10 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column: Bold Typography & CTAs */}
        <div className="lg:col-span-6 space-y-6 text-left">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-black uppercase tracking-widest glow-emerald">
            <Zap className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
            Graph Theory Engine v2.0 • Ultra-Fast Solver
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.1]">
            Automated Academic <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent glow-text-emerald">Timetable Generator</span>
          </h1>

          <p className="text-base sm:text-lg text-zinc-400 leading-relaxed max-w-xl font-normal">
            Generate zero-conflict, mathematically proven university schedules using <strong className="text-emerald-400 font-bold">DSatur Graph Coloring</strong>, teacher workload balancing, and laboratory constraint optimization.
          </p>

          <div className="flex flex-wrap gap-4 pt-2">
            <button
              onClick={onEnterWorkspace}
              className="px-7 py-4 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-black font-black text-sm shadow-xl shadow-emerald-500/25 flex items-center gap-3 transition-all hover:scale-105 active:scale-95"
            >
              <Calendar className="w-5 h-5 text-black" />
              Launch Timetable Generator
              <ArrowRight className="w-4 h-4 text-black" />
            </button>

            <button
              onClick={onExploreAlgorithm}
              className="px-7 py-4 rounded-2xl bg-zinc-900/90 hover:bg-zinc-800 text-white font-bold text-sm border border-white/10 flex items-center gap-2.5 transition-all hover:border-emerald-500/50"
            >
              <Sparkles className="w-4 h-4 text-amber-400" />
              Explore DSatur Physics
            </button>
          </div>

          {/* Highlighted Stat Cards */}
          <div className="grid grid-cols-3 gap-4 pt-6 border-t border-white/10 max-w-md">
            <div className="bg-zinc-900/60 p-3 rounded-2xl border border-white/5 text-center">
              <div className="text-2xl font-black text-emerald-400">0</div>
              <div className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider">Hard Conflicts</div>
            </div>
            <div className="bg-zinc-900/60 p-3 rounded-2xl border border-white/5 text-center">
              <div className="text-2xl font-black text-white">100%</div>
              <div className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider">Explainable</div>
            </div>
            <div className="bg-zinc-900/60 p-3 rounded-2xl border border-white/5 text-center">
              <div className="text-2xl font-black text-amber-400">&lt; 50ms</div>
              <div className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider">Solve Speed</div>
            </div>
          </div>
        </div>

        {/* Right Column: Marquee Along SVG Path */}
        <div className="lg:col-span-6 h-[440px] relative rounded-3xl bg-black/80 border border-white/10 p-4 shadow-2xl backdrop-blur-md flex items-center justify-center overflow-hidden">
          <div className="absolute top-4 left-4 z-20 flex items-center gap-2 text-xs font-bold text-zinc-300 bg-zinc-900/90 px-3.5 py-1.5 rounded-full border border-white/10">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            Interactive Marquee • Path Flow
          </div>

          <MarqueeAlongSvgPath
            path={path}
            viewBox="0 0 996 330"
            baseVelocity={7}
            slowdownOnHover={true}
            draggable={true}
            repeat={2}
            dragSensitivity={0.1}
            className="w-full h-full scale-105"
            responsive
            grabCursor
          >
            {academicSubjectCards.map((card, i) => (
              <div
                key={i}
                className={`w-36 p-3.5 rounded-2xl bg-gradient-to-br ${card.color} text-white shadow-2xl hover:scale-110 transition-transform duration-300 cursor-pointer border border-white/20`}
              >
                <div className="text-[10px] uppercase font-black tracking-widest text-white/80">{card.code}</div>
                <div className="text-xs font-extrabold truncate mt-0.5">{card.title}</div>
                <div className="text-[10px] text-white/90 mt-1 truncate">{card.teacher}</div>
                <div className="text-[9px] bg-black/40 px-2 py-0.5 rounded text-white/90 w-fit mt-2 font-mono font-bold">{card.room}</div>
              </div>
            ))}
          </MarqueeAlongSvgPath>
        </div>
      </div>
    </div>
  );
};
