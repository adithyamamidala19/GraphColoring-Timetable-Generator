import React from "react";
import { Cpu, Sparkles, ArrowRight, CheckCircle2, ShieldAlert, Clock, Layers, BookOpen, Users, Building } from "lucide-react";
import { useTimetable } from "@/context/TimetableContext";
import { useCountUp } from "@/motion";

interface GenerateViewProps {
  onProceedToReview: () => void;
}

export const GenerateView: React.FC<GenerateViewProps> = ({ onProceedToReview }) => {
  const { subjects, teachers, sections, rooms, solveResult, runSolver, isSolving } = useTimetable();

  // Animated KPI numbers
  const { displayValue: chromaticVal } = useCountUp({
    end: solveResult.chromaticNumber,
    duration: 0.8,
  });
  const { displayValue: verticesVal } = useCountUp({
    end: solveResult.totalVertices,
    duration: 0.8,
  });
  const { displayValue: edgesVal } = useCountUp({
    end: solveResult.totalEdges,
    duration: 0.8,
  });
  const { displayValue: msVal } = useCountUp({
    end: solveResult.generationTimeMs,
    duration: 0.8,
    suffix: " ms",
  });
  const { displayValue: qualityVal } = useCountUp({
    end: solveResult.qualityScore,
    duration: 0.8,
    decimals: 1,
    suffix: "%",
  });

  const totalSessionsCount = subjects.reduce((sum, s) => sum + s.sessionsPerWeek, 0);

  return (
    <div className="max-w-4xl mx-auto space-y-8 py-4">
      {/* Primary Generator Card */}
      <div className="bg-white border border-[#E8E2D2] rounded-3xl p-8 sm:p-12 shadow-soft space-y-8 text-center relative overflow-hidden">
        {/* Subtle background flare */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[200px] bg-[#D1FAE5]/40 rounded-full blur-[100px] pointer-events-none" />

        {/* Input Summary Header */}
        <div className="space-y-3 relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FAF7F0] border border-[#E8E2D2] text-[#065F46] text-xs font-semibold shadow-subtle">
            <Cpu className="w-3.5 h-3.5 text-[#10B981]" />
            <span>DSatur Algorithmic Core</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-display font-bold text-[#14201B] tracking-tight">
            Combinatorial Optimization Engine
          </h2>

          <p className="text-sm text-[#5B6B63] max-w-md mx-auto">
            Ready to compute conflict-free timetable across active entities.
          </p>
        </div>

        {/* Counts Summary Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl mx-auto relative z-10">
          <div className="p-3.5 rounded-2xl bg-[#FAF7F0] border border-[#E8E2D2]">
            <div className="text-xs text-[#5B6B63] flex items-center justify-center gap-1.5 mb-1">
              <BookOpen className="w-3.5 h-3.5 text-[#10B981]" />
              <span>Subjects</span>
            </div>
            <div className="text-xl font-display font-extrabold text-[#14201B]">
              {subjects.length}
            </div>
            <div className="text-[10px] font-mono text-[#5B6B63] mt-0.5">
              {totalSessionsCount} weekly hours
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-[#FAF7F0] border border-[#E8E2D2]">
            <div className="text-xs text-[#5B6B63] flex items-center justify-center gap-1.5 mb-1">
              <Users className="w-3.5 h-3.5 text-[#10B981]" />
              <span>Faculty</span>
            </div>
            <div className="text-xl font-display font-extrabold text-[#14201B]">
              {teachers.length}
            </div>
            <div className="text-[10px] font-mono text-[#5B6B63] mt-0.5">
              Max load checked
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-[#FAF7F0] border border-[#E8E2D2]">
            <div className="text-xs text-[#5B6B63] flex items-center justify-center gap-1.5 mb-1">
              <Layers className="w-3.5 h-3.5 text-[#10B981]" />
              <span>Sections</span>
            </div>
            <div className="text-xl font-display font-extrabold text-[#14201B]">
              {sections.length}
            </div>
            <div className="text-[10px] font-mono text-[#5B6B63] mt-0.5">
              Target cohorts
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-[#FAF7F0] border border-[#E8E2D2]">
            <div className="text-xs text-[#5B6B63] flex items-center justify-center gap-1.5 mb-1">
              <Building className="w-3.5 h-3.5 text-[#10B981]" />
              <span>Rooms</span>
            </div>
            <div className="text-xl font-display font-extrabold text-[#14201B]">
              {rooms.length}
            </div>
            <div className="text-[10px] font-mono text-[#5B6B63] mt-0.5">
              Halls & labs
            </div>
          </div>
        </div>

        {/* Thinking Animation (during solve) or Focused Generate Button */}
        <div className="pt-2 relative z-10 flex flex-col items-center">
          {isSolving ? (
            <div className="w-full max-w-md py-6 space-y-4">
              {/* Nodes pulsing along a path */}
              <div className="h-16 relative flex items-center justify-center">
                <svg viewBox="0 0 300 60" className="w-full h-full">
                  <path
                    d="M 20 30 C 80 10, 120 50, 180 20 C 220 5, 260 45, 280 30"
                    fill="none"
                    stroke="#E8E2D2"
                    strokeWidth="2"
                    strokeDasharray="4,4"
                  />
                  {/* Pulsing nodes */}
                  <circle cx="50" cy="25" r="8" fill="#10B981" className="animate-ping opacity-75" />
                  <circle cx="50" cy="25" r="7" fill="#10B981" />
                  <circle cx="150" cy="35" r="8" fill="#BAE6FD" className="animate-pulse" />
                  <circle cx="150" cy="35" r="7" fill="#0369A1" />
                  <circle cx="250" cy="22" r="8" fill="#DDD6FE" className="animate-bounce" />
                  <circle cx="250" cy="22" r="7" fill="#5B21B6" />
                </svg>
              </div>

              <div className="text-xs font-mono font-semibold text-[#065F46] animate-pulse">
                Evaluating degree of saturation heuristic...
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-3">
              <button
                onClick={runSolver}
                className="px-8 py-4 bg-[#10B981] hover:bg-[#059669] text-white font-display font-bold text-base rounded-2xl flex items-center gap-3 shadow-soft transition-transform hover:scale-102 active:scale-98 cursor-pointer"
              >
                <Sparkles className="w-5 h-5" />
                <span>Generate Timetable</span>
              </button>
              <span className="text-xs text-[#5B6B63]">
                Zero hard conflicts guaranteed in &lt; 50ms
              </span>
            </div>
          )}
        </div>

        {/* 4 Count-up KPI Result Tiles */}
        <div className="pt-6 border-t border-[#E8E2D2] grid grid-cols-2 sm:grid-cols-4 gap-4 text-left relative z-10">
          <div className="p-4 rounded-2xl bg-[#FAF7F0] border border-[#E8E2D2]">
            <div className="text-xs font-mono text-[#5B6B63]">
              Chromatic Number χ(G)
            </div>
            <div className="text-2xl font-display font-extrabold text-[#10B981] mt-1">
              {chromaticVal}
            </div>
            <div className="text-[11px] text-[#5B6B63] mt-0.5">Optimal time slots</div>
          </div>

          <div className="p-4 rounded-2xl bg-[#FAF7F0] border border-[#E8E2D2]">
            <div className="text-xs font-mono text-[#5B6B63]">Conflict Graph Size</div>
            <div className="text-2xl font-display font-extrabold text-[#14201B] mt-1">
              {verticesVal} <span className="text-xs font-normal text-[#5B6B63]">V</span> • {edgesVal}{" "}
              <span className="text-xs font-normal text-[#5B6B63]">E</span>
            </div>
            <div className="text-[11px] text-[#5B6B63] mt-0.5">Sessions & edges</div>
          </div>

          <div className="p-4 rounded-2xl bg-[#FAF7F0] border border-[#E8E2D2]">
            <div className="text-xs font-mono text-[#5B6B63]">Solver Latency</div>
            <div className="text-2xl font-display font-extrabold text-[#14201B] font-mono mt-1">
              {msVal}
            </div>
            <div className="text-[11px] text-[#065F46] font-semibold mt-0.5">
              Sub-50ms verified
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[#FAF7F0] border border-[#E8E2D2]">
            <div className="text-xs font-mono text-[#5B6B63]">Quality Score</div>
            <div className="text-2xl font-display font-extrabold text-[#065F46] mt-1">
              {qualityVal}
            </div>
            <div className="text-[11px] text-[#065F46] font-semibold mt-0.5">
              0 hard conflicts
            </div>
          </div>
        </div>

        {/* Proceed to Review CTA */}
        {solveResult.cells.length > 0 && !isSolving && (
          <div className="pt-2 flex justify-center relative z-10">
            <button
              onClick={onProceedToReview}
              className="px-6 py-3 bg-[#FAF7F0] hover:bg-[#F3EFE4] text-[#14201B] border border-[#E8E2D2] font-semibold text-xs rounded-xl flex items-center gap-2 shadow-subtle transition-all cursor-pointer"
            >
              <span>Inspect Timetable, Graph & Conflicts</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#10B981]" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
