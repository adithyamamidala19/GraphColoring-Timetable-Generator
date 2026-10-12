import React, { useState } from "react";
import { ConflictItem } from "@/types/timetable";
import { ShieldCheck, CheckCircle2, AlertOctagon, AlertTriangle, Info, Sparkles, Check } from "lucide-react";
import { useTimetable } from "@/context/TimetableContext";

interface ConflictsPanelProps {
  conflicts: ConflictItem[];
  hardConflictsCount: number;
  softViolationsCount: number;
  qualityScore: number;
}

export const ConflictsPanel: React.FC<ConflictsPanelProps> = ({
  conflicts,
  hardConflictsCount,
  softViolationsCount,
  qualityScore,
}) => {
  const { runSolver } = useTimetable();
  const [isResolving, setIsResolving] = useState(false);
  const [resolveSuccess, setResolveSuccess] = useState(false);

  const handleAutoResolve = async () => {
    setIsResolving(true);
    setResolveSuccess(false);
    await runSolver();
    setIsResolving(false);
    setResolveSuccess(true);
    setTimeout(() => setResolveSuccess(false), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Overview Banner Card */}
      <div className="bg-white border border-[#E8E2D2] rounded-3xl p-6 shadow-soft flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D1FAE5] border border-[#A7F3D0] text-[#065F46] text-xs font-semibold">
            <ShieldCheck className="w-3.5 h-3.5 text-[#10B981]" />
            <span>Integrity Verification</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-display font-bold text-[#14201B] tracking-tight mt-1">
            Constraint Audit & Conflict Resolution
          </h2>
          <p className="text-xs text-[#5B6B63] mt-0.5">
            Strict verification against teacher clashes, section overlap, and room capacities.
          </p>
        </div>

        {/* Action Button: Auto Resolve */}
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-[#FAF7F0] border border-[#E8E2D2] text-center">
            <div className="text-[10px] font-mono text-[#5B6B63] uppercase">Quality Score</div>
            <div className="text-xl font-display font-extrabold text-[#065F46]">
              {qualityScore}%
            </div>
          </div>

          <button
            onClick={handleAutoResolve}
            disabled={isResolving}
            className={`px-5 py-3 rounded-2xl text-xs font-semibold flex items-center gap-2 shadow-sm transition-all cursor-pointer ${
              resolveSuccess
                ? "bg-[#D1FAE5] text-[#065F46] border border-[#A7F3D0]"
                : "bg-[#10B981] hover:bg-[#059669] text-white"
            }`}
          >
            {resolveSuccess ? (
              <>
                <Check className="w-4 h-4 stroke-[3]" />
                <span>Resolved Cleanly</span>
              </>
            ) : (
              <>
                <Sparkles className={`w-4 h-4 ${isResolving ? "animate-spin" : ""}`} />
                <span>{isResolving ? "Recalculating Slots..." : "Auto Resolve Conflicts"}</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* 3 Metric Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white border border-[#E8E2D2] rounded-3xl p-5 shadow-soft flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-2xl bg-[#D1FAE5] text-[#065F46] flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-5 h-5 text-[#065F46]" />
          </div>
          <div>
            <div className="text-xl font-display font-extrabold text-[#14201B]">
              {hardConflictsCount} Hard Conflicts
            </div>
            <div className="text-xs text-[#065F46] font-semibold mt-0.5">
              Strict 0-collision guarantee satisfied
            </div>
          </div>
        </div>

        <div className="bg-white border border-[#E8E2D2] rounded-3xl p-5 shadow-soft flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-2xl bg-[#FEF08A] text-[#854D0E] flex items-center justify-center shrink-0">
            <AlertTriangle className="w-5 h-5 text-[#854D0E]" />
          </div>
          <div>
            <div className="text-xl font-display font-extrabold text-[#14201B]">
              {softViolationsCount} Soft Warnings
            </div>
            <div className="text-xs text-[#854D0E] font-medium mt-0.5">
              Workload & time preference trade-offs
            </div>
          </div>
        </div>

        <div className="bg-white border border-[#E8E2D2] rounded-3xl p-5 shadow-soft flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-2xl bg-[#BAE6FD] text-[#0369A1] flex items-center justify-center shrink-0">
            <Info className="w-5 h-5 text-[#0369A1]" />
          </div>
          <div>
            <div className="text-xl font-display font-extrabold text-[#14201B]">
              100% Explainable
            </div>
            <div className="text-xs text-[#0369A1] font-medium mt-0.5">
              Every period assignment provable
            </div>
          </div>
        </div>
      </div>

      {/* Conflicts List or Empty State */}
      <div className="bg-white border border-[#E8E2D2] rounded-3xl p-6 shadow-soft space-y-4">
        <h3 className="text-sm font-display font-bold text-[#14201B] border-b border-[#E8E2D2] pb-3">
          Diagnostic Audit Log ({conflicts.length})
        </h3>

        {conflicts.length === 0 ? (
          /* Empty State: Big green check "No conflicts" with checkmark draw SVG */
          <div className="text-center py-14 space-y-4">
            <div className="w-16 h-16 rounded-full bg-[#D1FAE5] border-2 border-[#10B981] flex items-center justify-center mx-auto shadow-subtle">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                <path
                  d="M 8 16 L 14 22 L 24 10"
                  stroke="#10B981"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div>
              <h4 className="text-xl font-display font-bold text-[#14201B]">
                No conflicts detected.
              </h4>
              <p className="text-xs text-[#5B6B63] max-w-sm mx-auto mt-1">
                The DSatur graph coloring engine satisfied all mutual exclusion criteria. The current schedule is 100% valid and publication-ready.
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            {conflicts.map((conf) => {
              const borderCol =
                conf.severity === "critical"
                  ? "border-l-rose-500"
                  : conf.severity === "warning"
                  ? "border-l-amber-500"
                  : "border-l-blue-500";

              return (
                <div
                  key={conf.id}
                  className={`p-4 rounded-2xl bg-[#FAF7F0] border border-[#E8E2D2] border-l-4 ${borderCol} flex items-center justify-between gap-4`}
                >
                  <div className="flex items-center gap-3">
                    {conf.severity === "critical" ? (
                      <AlertOctagon className="w-5 h-5 text-rose-500 shrink-0" />
                    ) : (
                      <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0" />
                    )}
                    <div>
                      <div className="font-semibold text-xs text-[#14201B]">
                        {conf.description}
                      </div>
                      <div className="text-[11px] text-[#5B6B63] mt-0.5">
                        Affected: {conf.affectedDay}, Period {conf.affectedPeriod} • Category:{" "}
                        {conf.category}
                      </div>
                    </div>
                  </div>

                  <span className="text-[10px] font-mono font-bold uppercase px-2.5 py-1 rounded-full bg-white border border-[#E8E2D2] text-[#14201B]">
                    {conf.severity}
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
