import React from "react";
import { Teacher, Room, Subject } from "@/types/timetable";
import { BarChart3, PieChart, Users, Building, Cpu } from "lucide-react";

interface AnalyticsViewProps {
  teachers: Teacher[];
  rooms: Room[];
  subjects: Subject[];
}

export const AnalyticsView: React.FC<AnalyticsViewProps> = ({
  teachers,
  rooms,
  subjects,
}) => {
  return (
    <div className="space-y-6">
      <div className="bg-card border border-border/50 rounded-2xl p-6 shadow-xl space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border/40 pb-4">
          <div>
            <div className="flex items-center gap-2 text-primary font-bold text-sm">
              <BarChart3 className="w-4 h-4" />
              Resource Optimization Metrics
            </div>
            <h2 className="text-2xl font-black text-foreground mt-0.5">
              University Operations & Utilization Analytics
            </h2>
            <p className="text-xs text-muted-foreground mt-1">
              Real-time monitoring of faculty workload capacity, classroom space utilization, and solver chromatic saturation.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Faculty Workload Capacity */}
        <div className="lg:col-span-6 bg-card border border-border/50 rounded-2xl p-6 shadow-xl space-y-4">
          <h3 className="text-base font-bold text-foreground flex items-center gap-2 border-b border-border/40 pb-3">
            <Users className="w-4 h-4 text-primary" />
            Faculty Workload Hours & Capacity
          </h3>

          <div className="space-y-3">
            {teachers.map((t) => {
              const assignedHours = subjects
                .filter(s => s.teacherId === t.id)
                .reduce((acc, curr) => acc + curr.sessionsPerWeek, 0);

              const utilizationPct = Math.min(Math.round((assignedHours / t.maxHoursPerWeek) * 100), 100);

              return (
                <div key={t.id} className="space-y-1 text-xs">
                  <div className="flex justify-between font-semibold">
                    <span className="text-foreground">{t.name} ({t.department})</span>
                    <span className="text-primary font-mono">{assignedHours} / {t.maxHoursPerWeek} hrs ({utilizationPct}%)</span>
                  </div>
                  <div className="w-full h-2.5 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full transition-all duration-500"
                      style={{ width: `${utilizationPct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Room & Lab Utilization */}
        <div className="lg:col-span-6 bg-card border border-border/50 rounded-2xl p-6 shadow-xl space-y-4">
          <h3 className="text-base font-bold text-foreground flex items-center gap-2 border-b border-border/40 pb-3">
            <Building className="w-4 h-4 text-emerald-400" />
            Classroom & Laboratory Utilization Rate
          </h3>

          <div className="space-y-3">
            {rooms.map((r) => {
              const roomUsageCount = subjects
                .filter(s => s.requiredRoomType === r.type)
                .reduce((acc, curr) => acc + curr.sessionsPerWeek, 0);

              const utilizationPct = Math.min(Math.round((roomUsageCount / 30) * 100), 100);

              return (
                <div key={r.id} className="space-y-1 text-xs">
                  <div className="flex justify-between font-semibold">
                    <span className="text-foreground">{r.code} - {r.name} ({r.type.toUpperCase()})</span>
                    <span className="text-emerald-400 font-mono">{utilizationPct}% Occupancy</span>
                  </div>
                  <div className="w-full h-2.5 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full transition-all duration-500"
                      style={{ width: `${utilizationPct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
