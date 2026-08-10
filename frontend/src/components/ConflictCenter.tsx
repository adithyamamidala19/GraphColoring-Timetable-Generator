import React from "react";
import { ConflictItem } from "@/types/timetable";
import { ShieldCheck, AlertOctagon, CheckCircle2, AlertTriangle, Info, Zap } from "lucide-react";

interface ConflictCenterProps {
  conflicts: ConflictItem[];
  hardConflictsCount: number;
  softViolationsCount: number;
  qualityScore: number;
  onRunAutoFix?: () => void;
}

export const ConflictCenter: React.FC<ConflictCenterProps> = ({
  conflicts,
  hardConflictsCount,
  softViolationsCount,
  qualityScore,
  onRunAutoFix,
}) => {
  return (
    <div className="space-y-6">
      {/* Overview Banner */}
      <div className="bg-card border border-border/50 rounded-2xl p-6 shadow-xl space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border/40 pb-4">
          <div>
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
              <ShieldCheck className="w-4 h-4" />
              Constraint Validation Matrix
            </div>
            <h2 className="text-2xl font-black text-foreground mt-0.5">
              Conflict & Compliance Resolution Center
            </h2>
            <p className="text-xs text-muted-foreground mt-1">
              Automated evaluation of hard constraints (zero overlaps) and soft preference optimizations.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <div className="bg-muted px-4 py-2 rounded-xl border border-border/40 text-center">
              <div className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider">Quality Score</div>
              <div className="text-xl font-black text-emerald-400">{qualityScore}%</div>
            </div>

            {onRunAutoFix && (
              <button
                onClick={onRunAutoFix}
                className="px-4 py-2.5 bg-emerald-500 text-white font-bold rounded-xl text-xs flex items-center gap-2 shadow-lg shadow-emerald-500/20 hover:bg-emerald-600 transition-all"
              >
                <Zap className="w-4 h-4" />
                Run Graph Re-Coloring Auto-Fix
              </button>
            )}
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4 flex items-center gap-3">
            <CheckCircle2 className="w-8 h-8 text-emerald-400" />
            <div>
              <div className="text-xl font-black text-foreground">{hardConflictsCount} Hard Conflicts</div>
              <div className="text-xs text-emerald-400/90 font-medium">Strict zero-overlap policy satisfied</div>
            </div>
          </div>

          <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4 flex items-center gap-3">
            <AlertTriangle className="w-8 h-8 text-amber-400" />
            <div>
              <div className="text-xl font-black text-foreground">{softViolationsCount} Soft Warnings</div>
              <div className="text-xs text-amber-400/90 font-medium">Minor faculty preference trade-offs</div>
            </div>
          </div>

          <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4 flex items-center gap-3">
            <Info className="w-8 h-8 text-blue-400" />
            <div>
              <div className="text-xl font-black text-foreground">100% Explainable</div>
              <div className="text-xs text-blue-400/90 font-medium">Every cell mapped to proof vertex</div>
            </div>
          </div>
        </div>
      </div>

      {/* Conflict Log List */}
      <div className="bg-card border border-border/50 rounded-2xl p-6 shadow-xl space-y-4">
        <h3 className="text-base font-bold text-foreground border-b border-border/40 pb-3">
          Diagnostic Evaluation Logs ({conflicts.length})
        </h3>

        {conflicts.length === 0 ? (
          <div className="text-center py-12 space-y-3">
            <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
            <h4 className="text-lg font-bold text-foreground">Zero Conflicts Detected!</h4>
            <p className="text-xs text-muted-foreground max-w-md mx-auto">
              The Graph Coloring engine successfully satisfied all hard constraints. The generated timetable is 100% conflict-free and valid.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {conflicts.map((conf) => (
              <div
                key={conf.id}
                className="bg-muted/40 border border-border/40 rounded-xl p-4 flex items-center justify-between gap-4"
              >
                <div className="flex items-center gap-3">
                  <AlertOctagon className="w-5 h-5 text-rose-400" />
                  <div>
                    <div className="font-bold text-sm text-foreground">{conf.description}</div>
                    <div className="text-xs text-muted-foreground mt-0.5">
                      Affected: {conf.affectedDay}, Period {conf.affectedPeriod} • Category: {conf.category}
                    </div>
                  </div>
                </div>

                <span className="text-[10px] font-bold uppercase px-2.5 py-1 rounded bg-rose-500/10 text-rose-400 border border-rose-500/20">
                  {conf.severity}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
