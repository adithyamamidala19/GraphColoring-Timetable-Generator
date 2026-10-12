import React, { useState } from "react";
import { Calendar, Cpu, ShieldCheck } from "lucide-react";
import { TimetableGrid } from "./TimetableGrid";
import { DeclutteredGraph } from "./DeclutteredGraph";
import { ConflictsPanel } from "./ConflictsPanel";
import { useTimetable } from "@/context/TimetableContext";

type ReviewSubView = "timetable" | "graph" | "conflicts";

export const ReviewView: React.FC = () => {
  const { solveResult, sections, teachers, rooms } = useTimetable();
  const [subView, setSubView] = useState<ReviewSubView>("timetable");

  return (
    <div className="space-y-6">
      {/* Segmented View Switcher: Timetable | Graph | Conflicts */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#E8E2D2] pb-4">
        <div className="flex items-center gap-1 bg-[#F3EFE4] p-1 rounded-2xl border border-[#E8E2D2] overflow-x-auto max-w-full">
          {[
            { id: "timetable", label: "Timetable Grid", icon: Calendar },
            { id: "graph", label: "Graph Theory (χ(G))", icon: Cpu },
            { id: "conflicts", label: "Conflicts & Audit", icon: ShieldCheck },
          ].map((item) => {
            const Icon = item.icon;
            const isActive = subView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setSubView(item.id as ReviewSubView)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer ${
                  isActive
                    ? "bg-white text-[#14201B] font-bold shadow-subtle border border-[#E8E2D2]"
                    : "text-[#5B6B63] hover:text-[#14201B]"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* Quick stat */}
        <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-[#5B6B63]">
          <span>{solveResult.cells.length} Scheduled Slots</span>
          <span>•</span>
          <span className="text-[#065F46] font-bold">0 Hard Conflicts</span>
        </div>
      </div>

      {/* Render Active Sub-View */}
      {subView === "timetable" && (
        <TimetableGrid
          cells={solveResult.cells}
          sections={sections}
          teachers={teachers}
          rooms={rooms}
        />
      )}

      {subView === "graph" && (
        <DeclutteredGraph
          nodes={solveResult.nodes}
          edges={solveResult.edges}
          chromaticNumber={solveResult.chromaticNumber}
        />
      )}

      {subView === "conflicts" && (
        <ConflictsPanel
          conflicts={solveResult.conflicts}
          hardConflictsCount={solveResult.hardConflictsCount}
          softViolationsCount={solveResult.softViolationsCount}
          qualityScore={solveResult.qualityScore}
        />
      )}
    </div>
  );
};
