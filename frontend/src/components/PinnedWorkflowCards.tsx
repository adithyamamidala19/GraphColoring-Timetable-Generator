import React from "react";
import { Pin, ArrowRight } from "lucide-react";

interface WorkflowStep {
  number: string;
  title: string;
  description: string;
  pinColor: string; // "orange", "blue", "purple", "amber", "cyan"
  bgColor: string;
  rotation: string;
}

const steps: WorkflowStep[] = [
  {
    number: "01",
    title: "Input Academic Setup",
    description: "Enter university subjects, faculty members, target sections, credits, and room availability data.",
    pinColor: "#f97316", // Orange Pin
    bgColor: "from-amber-950/40 via-zinc-900/90 to-zinc-950",
    rotation: "rotate-[-3deg]",
  },
  {
    number: "02",
    title: "Construct Conflict Graph",
    description: "Map class sessions as vertices V_i and generate conflict edges E_ij for overlapping teachers or sections.",
    pinColor: "#3b82f6", // Blue Pin
    bgColor: "from-blue-950/40 via-zinc-900/90 to-zinc-950",
    rotation: "rotate-[3deg]",
  },
  {
    number: "03",
    title: "Run DSatur Solver",
    description: "Calculate chromatic number k and assign optimal time slot colors using saturation degree heuristics.",
    pinColor: "#a855f7", // Purple Pin
    bgColor: "from-purple-950/40 via-zinc-900/90 to-zinc-950",
    rotation: "rotate-[-2deg]",
  },
  {
    number: "04",
    title: "Validate Constraints",
    description: "Execute 100% hard constraint checks to guarantee zero double-bookings or room capacity violations.",
    pinColor: "#f59e0b", // Amber Pin
    bgColor: "from-amber-950/30 via-zinc-900/90 to-zinc-950",
    rotation: "rotate-[4deg]",
  },
  {
    number: "05",
    title: "Deploy Schedule Grid",
    description: "Instantly render the interactive weekly academic grid, export CSV/PDF, and monitor live solver nodes.",
    pinColor: "#06b6d4", // Cyan Pin
    bgColor: "from-cyan-950/40 via-zinc-900/90 to-zinc-950",
    rotation: "rotate-[-3deg]",
  },
];

export const PinnedWorkflowCards: React.FC = () => {
  return (
    <div className="relative py-16 px-6 bg-black border-y border-white/10 overflow-hidden bg-dark-horizontal-lines">
      {/* Glow Effects */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[300px] bg-emerald-500/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[500px] h-[300px] bg-purple-500/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="container max-w-7xl mx-auto space-y-12 relative z-10">
        {/* Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="text-xs font-black uppercase tracking-widest text-emerald-400 bg-emerald-500/10 px-3.5 py-1 rounded-full border border-emerald-500/20 w-fit mx-auto">
            Interactive Workflow Architecture
          </div>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight font-neuton">
            How Timetable Generation Works
          </h2>
          <p className="text-sm text-zinc-400">
            A 5-phase deterministic pipeline ensuring zero-conflict academic schedules.
          </p>
        </div>

        {/* Pinned Tilted Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8 pt-4">
          {steps.map((step, index) => (
            <div
              key={step.number}
              className={`relative transition-transform duration-300 hover:scale-105 hover:rotate-0 ${step.rotation}`}
            >
              {/* Colored Push-Pin Icon at Top Center */}
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-20 drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)]">
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center border-2 border-black/80 shadow-xl"
                  style={{ backgroundColor: step.pinColor }}
                >
                  <Pin className="w-4 h-4 text-white fill-white transform -rotate-45" />
                </div>
              </div>

              {/* Tilted Card Container */}
              <div className={`h-full bg-gradient-to-b ${step.bgColor} border border-white/15 rounded-3xl p-6 shadow-2xl flex flex-col justify-between backdrop-blur-md relative overflow-hidden group`}>
                {/* Background Number Glow */}
                <div
                  className="text-6xl font-black font-mono tracking-tighter opacity-80"
                  style={{ color: step.pinColor }}
                >
                  {step.number}
                </div>

                <div className="space-y-2 mt-4">
                  <h3 className="text-xl font-bold text-white font-neuton leading-snug group-hover:text-emerald-400 transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-xs text-zinc-400 leading-relaxed font-normal">
                    {step.description}
                  </p>
                </div>

                {/* Footer Tag */}
                <div className="pt-4 mt-4 border-t border-white/10 flex items-center justify-between text-[11px] font-bold text-zinc-400">
                  <span>Phase {index + 1}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-zinc-500 group-hover:text-emerald-400 group-hover:translate-x-1 transition-all" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
