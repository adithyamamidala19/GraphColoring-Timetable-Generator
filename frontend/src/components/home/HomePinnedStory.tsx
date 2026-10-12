import React, { useRef } from "react";
import { Download, FileText, Check, Cpu, Layers, Sparkles } from "lucide-react";
import { usePinnedStory } from "@/motion";

const STORY_STEPS = [
  {
    num: "01",
    title: "Input academic entities",
    subtitle: "Faculty, sections, and room constraints ingested into memory.",
  },
  {
    num: "02",
    title: "Build conflict graph",
    subtitle: "Undirected edges drawn selectively between overlapping sessions.",
  },
  {
    num: "03",
    title: "DSatur graph coloring",
    subtitle: "Nodes colored deterministically by maximum saturation degree.",
  },
  {
    num: "04",
    title: "Deploy conflict-free grid",
    subtitle: "Chromatic colors mapped to 5-day × 6-period weekly slots.",
  },
  {
    num: "05",
    title: "Export publication-ready PDF",
    subtitle: "Instant A4 landscape vector output with institutional headers.",
  },
];

export const HomePinnedStory: React.FC = () => {
  const { stageRef, activeStep, progress } = usePinnedStory({
    totalSteps: 5,
    pinDuration: "+=2800",
  });

  return (
    <div id="how-it-works" className="relative bg-[#FAF7F0] border-t border-[#E8E2D2]">
      {/* Pinned Stage Container */}
      <div
        ref={stageRef}
        className="w-full h-screen max-h-[960px] flex items-center justify-center px-4 sm:px-6 lg:px-8 py-10 overflow-hidden"
      >
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Progress Line + Step Information */}
          <div className="lg:col-span-5 flex gap-6 items-start">
            {/* Vertical Progress Rail */}
            <div className="relative w-1.5 h-72 sm:h-80 bg-[#E8E2D2] rounded-full overflow-hidden shrink-0 mt-2">
              <div
                className="w-full bg-[#10B981] rounded-full transition-all duration-300 ease-out"
                style={{ height: `${Math.max(8, progress * 100)}%` }}
              />
            </div>

            {/* Step Content */}
            <div className="flex flex-col justify-center space-y-4">
              <div className="text-xs font-mono font-bold uppercase tracking-widest text-[#065F46] bg-[#D1FAE5] px-3 py-1 rounded-full w-fit border border-[#A7F3D0]">
                Phase {activeStep + 1} of 5
              </div>

              <div className="text-6xl sm:text-7xl font-display font-extrabold text-[#14201B] tracking-tight">
                {STORY_STEPS[activeStep].num}
              </div>

              <h2 className="text-2xl sm:text-3xl font-display font-bold text-[#14201B] tracking-tight">
                {STORY_STEPS[activeStep].title}
              </h2>

              <p className="text-sm sm:text-base text-[#5B6B63] max-w-sm leading-relaxed">
                {STORY_STEPS[activeStep].subtitle}
              </p>

              {/* Step indicator dots */}
              <div className="flex items-center gap-2 pt-4">
                {STORY_STEPS.map((s, idx) => (
                  <div
                    key={s.num}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      idx === activeStep
                        ? "w-8 bg-[#10B981]"
                        : "w-2 bg-[#E8E2D2]"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Visual Stage that Transforms between 5 steps */}
          <div className="lg:col-span-7 flex items-center justify-center">
            <div className="w-full max-w-[560px] aspect-[4/3] bg-white border border-[#E8E2D2] rounded-3xl p-6 shadow-soft relative flex flex-col justify-between overflow-hidden">
              {/* Step 0: Input Chips Stack */}
              {activeStep === 0 && (
                <div className="h-full flex flex-col justify-between animate-in fade-in duration-300">
                  <div className="flex justify-between items-center text-xs text-[#5B6B63] border-b border-[#E8E2D2] pb-3">
                    <span className="font-semibold text-[#14201B]">Academic Input Stack</span>
                    <span className="font-mono">4 Sections • 14 Courses</span>
                  </div>
                  <div className="grid grid-cols-2 gap-3 my-auto">
                    {[
                      { code: "CS401", title: "Algorithms", fac: "Dr. R. Kumar", col: "bg-[#A7F3D0] text-[#065F46]" },
                      { code: "CS402", title: "Operating Systems", fac: "Prof. A. Sharma", col: "bg-[#BAE6FD] text-[#0369A1]" },
                      { code: "CS404", title: "Database Systems", fac: "Dr. V. Patel", col: "bg-[#FED7AA] text-[#9A3412]" },
                      { code: "MA407", title: "Discrete Math", fac: "Dr. S. Gupta", col: "bg-[#DDD6FE] text-[#5B21B6]" },
                    ].map((chip) => (
                      <div
                        key={chip.code}
                        className={`p-3.5 rounded-2xl border border-black/5 shadow-subtle ${chip.col} transition-transform hover:scale-102`}
                      >
                        <div className="text-xs font-mono font-bold">{chip.code}</div>
                        <div className="text-sm font-bold truncate mt-0.5">{chip.title}</div>
                        <div className="text-[11px] opacity-80 mt-1">{chip.fac}</div>
                      </div>
                    ))}
                  </div>
                  <div className="text-xs text-[#5B6B63] bg-[#FAF7F0] p-2.5 rounded-xl border border-[#E8E2D2] flex items-center gap-2">
                    <Layers className="w-4 h-4 text-[#10B981]" />
                    <span>All entities parsed with 0 initial constraint violations.</span>
                  </div>
                </div>
              )}

              {/* Step 1: Selective Edge Graph */}
              {activeStep === 1 && (
                <div className="h-full flex flex-col justify-between animate-in fade-in duration-300">
                  <div className="flex justify-between items-center text-xs text-[#5B6B63] border-b border-[#E8E2D2] pb-3">
                    <span className="font-semibold text-[#14201B]">Selective Conflict Graph</span>
                    <span className="font-mono text-[#065F46] font-semibold">Hovered Node: V_1 (CS401)</span>
                  </div>
                  <div className="flex-1 flex items-center justify-center relative">
                    <svg viewBox="0 0 400 240" className="w-full h-full">
                      {/* Selective animated dash edges connected only to Center Node */}
                      <line
                        x1="200"
                        y1="120"
                        x2="100"
                        y2="60"
                        stroke="#10B981"
                        strokeWidth="2.5"
                        strokeDasharray="6,4"
                      />
                      <line
                        x1="200"
                        y1="120"
                        x2="300"
                        y2="60"
                        stroke="#10B981"
                        strokeWidth="2.5"
                        strokeDasharray="6,4"
                      />
                      <line
                        x1="200"
                        y1="120"
                        x2="130"
                        y2="180"
                        stroke="#10B981"
                        strokeWidth="2.5"
                        strokeDasharray="6,4"
                      />
                      <line
                        x1="200"
                        y1="120"
                        x2="280"
                        y2="180"
                        stroke="#10B981"
                        strokeWidth="2.5"
                        strokeDasharray="6,4"
                      />

                      {/* Passive background edge (8% opacity) */}
                      <line x1="100" y1="60" x2="300" y2="60" stroke="#CBD5E1" strokeWidth="1" opacity="0.3" />
                      <line x1="130" y1="180" x2="280" y2="180" stroke="#CBD5E1" strokeWidth="1" opacity="0.3" />

                      {/* Peripheral Nodes */}
                      <circle cx="100" cy="60" r="18" fill="#F3EFE4" stroke="#E8E2D2" strokeWidth="2" />
                      <circle cx="300" cy="60" r="18" fill="#F3EFE4" stroke="#E8E2D2" strokeWidth="2" />
                      <circle cx="130" cy="180" r="18" fill="#F3EFE4" stroke="#E8E2D2" strokeWidth="2" />
                      <circle cx="280" cy="180" r="18" fill="#F3EFE4" stroke="#E8E2D2" strokeWidth="2" />

                      {/* Focused Node (V1) */}
                      <circle cx="200" cy="120" r="22" fill="#D1FAE5" stroke="#10B981" strokeWidth="3" />
                      <text x="200" y="124" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#065F46">
                        CS401
                      </text>
                    </svg>
                  </div>
                  <div className="text-xs text-[#5B6B63] bg-[#FAF7F0] p-2.5 rounded-xl border border-[#E8E2D2]">
                    Decluttered view: edges render selectively on focus to highlight mutual exclusion.
                  </div>
                </div>
              )}

              {/* Step 2: DSatur Coloring In Action */}
              {activeStep === 2 && (
                <div className="h-full flex flex-col justify-between animate-in fade-in duration-300">
                  <div className="flex justify-between items-center text-xs text-[#5B6B63] border-b border-[#E8E2D2] pb-3">
                    <span className="font-semibold text-[#14201B]">DSatur Dynamic Saturation</span>
                    <span className="font-mono text-[#065F46] font-bold">Progress: 100%</span>
                  </div>
                  <div className="flex-1 flex flex-col justify-center gap-4">
                    <div className="grid grid-cols-4 gap-3">
                      {[
                        { code: "CS401", sat: 3, col: "bg-[#A7F3D0] text-[#065F46]" },
                        { code: "CS402", sat: 4, col: "bg-[#BAE6FD] text-[#0369A1]" },
                        { code: "CS404", sat: 2, col: "bg-[#FED7AA] text-[#9A3412]" },
                        { code: "MA407", sat: 3, col: "bg-[#DDD6FE] text-[#5B21B6]" },
                      ].map((item) => (
                        <div
                          key={item.code}
                          className={`p-3 rounded-2xl text-center border border-black/5 ${item.col}`}
                        >
                          <div className="text-[10px] font-mono font-semibold opacity-75">
                            sat(v) = {item.sat}
                          </div>
                          <div className="text-sm font-bold font-mono mt-1">{item.code}</div>
                        </div>
                      ))}
                    </div>

                    <div className="space-y-1.5">
                      <div className="flex justify-between text-xs text-[#5B6B63]">
                        <span>Algorithmic Convergence</span>
                        <span className="font-mono text-[#065F46] font-bold">18 ms</span>
                      </div>
                      <div className="w-full h-2 bg-[#F3EFE4] rounded-full overflow-hidden">
                        <div className="h-full bg-[#10B981] rounded-full w-full transition-all duration-500" />
                      </div>
                    </div>
                  </div>
                  <div className="text-xs text-[#5B6B63] bg-[#FAF7F0] p-2.5 rounded-xl border border-[#E8E2D2] flex items-center gap-2">
                    <Cpu className="w-4 h-4 text-[#10B981]" />
                    <span>Every vertex colored with lowest available chromatic slot index.</span>
                  </div>
                </div>
              )}

              {/* Step 3: Timetable Grid Result */}
              {activeStep === 3 && (
                <div className="h-full flex flex-col justify-between animate-in fade-in duration-300">
                  <div className="flex justify-between items-center text-xs text-[#5B6B63] border-b border-[#E8E2D2] pb-3">
                    <span className="font-semibold text-[#14201B]">Master Schedule Matrix</span>
                    <span className="font-mono text-[#065F46] font-bold">0 Conflicts</span>
                  </div>
                  <div className="grid grid-cols-4 gap-2 my-auto">
                    {[
                      { code: "CS401", time: "09:00", col: "bg-[#A7F3D0] text-[#065F46]" },
                      { code: "CS402", time: "10:00", col: "bg-[#BAE6FD] text-[#0369A1]" },
                      { code: "CS404", time: "11:15", col: "bg-[#FED7AA] text-[#9A3412]" },
                      { code: "MA407", time: "12:15", col: "bg-[#DDD6FE] text-[#5B21B6]" },
                      { code: "CS403P", time: "02:00", col: "bg-[#FECDD3] text-[#9F1239]" },
                      { code: "CS406", time: "03:00", col: "bg-[#FEF08A] text-[#854D0E]" },
                      { code: "CS401", time: "09:00", col: "bg-[#A7F3D0] text-[#065F46]" },
                      { code: "CS402", time: "10:00", col: "bg-[#BAE6FD] text-[#0369A1]" },
                    ].map((slot, i) => (
                      <div
                        key={i}
                        className={`p-2 rounded-xl text-center border border-black/5 ${slot.col}`}
                      >
                        <div className="text-[9px] font-mono opacity-80">{slot.time}</div>
                        <div className="text-xs font-bold font-mono mt-0.5">{slot.code}</div>
                      </div>
                    ))}
                  </div>
                  <div className="text-xs text-[#5B6B63] bg-[#FAF7F0] p-2.5 rounded-xl border border-[#E8E2D2] flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#10B981]" />
                    <span>Hard constraints HC-1 through HC-5 100% verified.</span>
                  </div>
                </div>
              )}

              {/* Step 4: Export to A4 PDF Preview */}
              {activeStep === 4 && (
                <div className="h-full flex flex-col justify-between animate-in fade-in duration-300">
                  <div className="flex justify-between items-center text-xs text-[#5B6B63] border-b border-[#E8E2D2] pb-3">
                    <span className="font-semibold text-[#14201B]">A4 Landscape PDF Publication</span>
                    <span className="font-mono text-[#065F46] font-semibold">Ready to print</span>
                  </div>
                  <div className="my-auto flex flex-col items-center justify-center p-4 bg-[#FAF7F0] rounded-2xl border border-[#E8E2D2]">
                    <FileText className="w-12 h-12 text-[#10B981] mb-2" />
                    <div className="text-sm font-bold text-[#14201B]">Timetable_CSE-4A_2026.pdf</div>
                    <div className="text-xs text-[#5B6B63] mt-0.5">A4 Landscape • 297mm × 210mm</div>
                    <div className="mt-4 px-4 py-2 bg-[#10B981] text-white text-xs font-semibold rounded-xl flex items-center gap-2 shadow-sm animate-bounce">
                      <Download className="w-3.5 h-3.5" />
                      <span>Download PDF</span>
                    </div>
                  </div>
                  <div className="text-xs text-[#5B6B63] bg-[#FAF7F0] p-2.5 rounded-xl border border-[#E8E2D2]">
                    Pixel-perfect client-side PDF generated via jsPDF autotable.
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
