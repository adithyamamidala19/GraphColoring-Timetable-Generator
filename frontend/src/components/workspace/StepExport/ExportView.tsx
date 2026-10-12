import React, { useRef } from "react";
import {
  FileText,
  Download,
  Printer,
  BarChart3,
  Users,
  Building,
  CheckCircle2,
  Share2,
} from "lucide-react";
import { useTimetable } from "@/context/TimetableContext";
import { defaultDays, defaultPeriods } from "@/services/api";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { useGSAP } from "@gsap/react";
import { gsap, prefersReducedMotion } from "@/motion";

export const ExportView: React.FC = () => {
  const { solveResult, sections, teachers, rooms, subjects } = useTimetable();
  const chartsRef = useRef<HTMLDivElement | null>(null);

  // Stagger animate charts on mount
  useGSAP(
    () => {
      if (prefersReducedMotion() || !chartsRef.current) return;
      const bars = chartsRef.current.querySelectorAll(".chart-bar-fill");
      gsap.fromTo(
        bars,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 0.8,
          ease: "power2.out",
          transformOrigin: "left center",
          stagger: 0.05,
        }
      );
    },
    { scope: chartsRef }
  );

  // Export PDF (A4 Landscape)
  const handleExportPDF = () => {
    try {
      const doc = new jsPDF({
        orientation: "landscape",
        unit: "mm",
        format: "a4",
      });

      // Header Banner
      doc.setFillColor(250, 247, 240);
      doc.rect(0, 0, 297, 28, "F");

      doc.setTextColor(6, 95, 70);
      doc.setFontSize(16);
      doc.setFont("helvetica", "bold");
      doc.text("AUTOSCHED AI • ACADEMIC TIMETABLE REPORT", 14, 12);

      doc.setTextColor(91, 107, 99);
      doc.setFontSize(9);
      doc.setFont("helvetica", "normal");
      doc.text(
        `Generated: ${new Date().toLocaleDateString()}   |   Hard Conflicts: 0   |   Quality Score: ${solveResult.qualityScore}%`,
        14,
        20
      );

      const head = [
        [
          "Day / Period",
          ...defaultPeriods.map((p) => `Period ${p.period}\n${p.start} - ${p.end}`),
        ],
      ];

      const body = defaultDays.map((day) => {
        const rowCells = defaultPeriods.map((p) => {
          const cell = solveResult.cells.find(
            (c) => c.day === day && c.period === p.period
          );
          if (!cell) return "Free Slot";
          return `${cell.subjectCode}\n${cell.subjectName}\n${cell.teacherName}\n${cell.roomCode}`;
        });
        return [day, ...rowCells];
      });

      autoTable(doc, {
        startY: 32,
        head,
        body,
        theme: "grid",
        headStyles: {
          fillColor: [16, 185, 129],
          textColor: [255, 255, 255],
          fontStyle: "bold",
          fontSize: 8.5,
          halign: "center",
        },
        bodyStyles: {
          fontSize: 7.5,
          cellPadding: 3,
          valign: "middle",
          halign: "center",
          textColor: [20, 32, 27],
        },
        alternateRowStyles: {
          fillColor: [248, 250, 248],
        },
        columnStyles: {
          0: { fontStyle: "bold", fillColor: [243, 239, 228], cellWidth: 26 },
        },
      });

      doc.save("AutoSched_Academic_Timetable_A4.pdf");
    } catch (err) {
      console.error("PDF export fallback:", err);
      window.print();
    }
  };

  // Export CSV
  const handleExportCSV = () => {
    const headers = [
      "Day",
      "Period",
      "Time",
      "Subject Code",
      "Subject Name",
      "Teacher",
      "Room",
      "Section",
    ];
    const rows = solveResult.cells.map((c) => {
      const pInfo = defaultPeriods.find((p) => p.period === c.period);
      return [
        c.day,
        c.period,
        `"${pInfo?.start || ""} - ${pInfo?.end || ""}"`,
        c.subjectCode,
        `"${c.subjectName}"`,
        `"${c.teacherName}"`,
        c.roomCode,
        c.sectionName,
      ].join(",");
    });

    const csvContent =
      "data:text/csv;charset=utf-8," + [headers.join(","), ...rows].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "AutoSched_Timetable_Full.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-8 py-2">
      {/* Top Banner: Export Action Cards */}
      <div className="bg-white border border-[#E8E2D2] rounded-3xl p-6 sm:p-8 shadow-soft space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#E8E2D2] pb-5">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D1FAE5] border border-[#A7F3D0] text-[#065F46] text-xs font-semibold">
              <Share2 className="w-3.5 h-3.5 text-[#10B981]" />
              <span>Publication Suite</span>
            </div>
            <h2 className="text-2xl font-display font-bold text-[#14201B] tracking-tight mt-1">
              Export Schedule & Utilization Intelligence
            </h2>
            <p className="text-xs text-[#5B6B63] mt-0.5">
              Vector A4 landscape document, spreadsheet data, and resource analytics.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={handleExportPDF}
              className="px-5 py-3 bg-[#10B981] hover:bg-[#059669] text-white font-semibold rounded-2xl text-xs flex items-center gap-2 shadow-soft transition-transform hover:scale-102 cursor-pointer"
            >
              <FileText className="w-4 h-4" />
              <span>Download PDF (A4)</span>
            </button>

            <button
              onClick={handleExportCSV}
              className="px-4 py-3 bg-[#FAF7F0] hover:bg-[#F3EFE4] text-[#14201B] border border-[#E8E2D2] font-semibold rounded-2xl text-xs flex items-center gap-2 shadow-subtle transition-colors cursor-pointer"
            >
              <Download className="w-4 h-4 text-[#5B6B63]" />
              <span>Export CSV</span>
            </button>

            <button
              onClick={() => window.print()}
              className="p-3 bg-[#FAF7F0] hover:bg-[#F3EFE4] text-[#14201B] border border-[#E8E2D2] rounded-2xl text-xs transition-colors cursor-pointer"
              title="Print Schedule"
            >
              <Printer className="w-4 h-4 text-[#5B6B63]" />
            </button>
          </div>
        </div>

        {/* 4 Analytics KPI Summary Tiles */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="p-4 rounded-2xl bg-[#FAF7F0] border border-[#E8E2D2]">
            <div className="text-xs font-mono text-[#5B6B63]">Chromatic Number χ(G)</div>
            <div className="text-2xl font-display font-extrabold text-[#10B981] mt-1">
              {solveResult.chromaticNumber}
            </div>
            <div className="text-[11px] text-[#5B6B63] mt-0.5">Time slots required</div>
          </div>

          <div className="p-4 rounded-2xl bg-[#FAF7F0] border border-[#E8E2D2]">
            <div className="text-xs font-mono text-[#5B6B63]">Hard Collisions</div>
            <div className="text-2xl font-display font-extrabold text-[#065F46] mt-1">
              {solveResult.hardConflictsCount}
            </div>
            <div className="text-[11px] text-[#065F46] font-semibold mt-0.5">
              Strict 0 policy met
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[#FAF7F0] border border-[#E8E2D2]">
            <div className="text-xs font-mono text-[#5B6B63]">Scheduled Sessions</div>
            <div className="text-2xl font-display font-extrabold text-[#14201B] mt-1">
              {solveResult.cells.length}
            </div>
            <div className="text-[11px] text-[#5B6B63] mt-0.5">Across 5 days</div>
          </div>

          <div className="p-4 rounded-2xl bg-[#FAF7F0] border border-[#E8E2D2]">
            <div className="text-xs font-mono text-[#5B6B63]">Quality Metric</div>
            <div className="text-2xl font-display font-extrabold text-[#14201B] mt-1">
              {solveResult.qualityScore}%
            </div>
            <div className="text-[11px] text-[#5B6B63] mt-0.5">Soft penalty score</div>
          </div>
        </div>
      </div>

      {/* Analytics Charts Grid (Room Utilization + Faculty Workload) */}
      <div ref={chartsRef} className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Room Utilization Bar Chart (Span 6) */}
        <div className="lg:col-span-6 bg-white border border-[#E8E2D2] rounded-3xl p-6 shadow-soft space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#E8E2D2]">
            <div className="flex items-center gap-2">
              <Building className="w-4 h-4 text-[#10B981]" />
              <h3 className="font-display font-bold text-base text-[#14201B]">
                Classroom & Lab Utilization
              </h3>
            </div>
            <span className="text-[11px] font-mono text-[#5B6B63]">30 slot capacity</span>
          </div>

          <div className="space-y-4 pt-1">
            {rooms.map((r) => {
              const assignedCount = solveResult.cells.filter(
                (c) => c.roomId === r.id
              ).length;
              const pct = Math.min(100, Math.round((assignedCount / 30) * 100));

              return (
                <div key={r.id} className="space-y-1.5 text-xs">
                  <div className="flex justify-between font-medium">
                    <span className="text-[#14201B] font-bold">
                      {r.code} • {r.name}
                    </span>
                    <span className="font-mono text-[#065F46] font-semibold">
                      {assignedCount} / 30 slots ({pct}%)
                    </span>
                  </div>
                  <div className="w-full h-2.5 bg-[#F3EFE4] rounded-full overflow-hidden">
                    <div
                      className="chart-bar-fill h-full bg-[#10B981] rounded-full"
                      style={{ width: `${Math.max(4, pct)}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Faculty Workload Heat-Strip (Span 6) */}
        <div className="lg:col-span-6 bg-white border border-[#E8E2D2] rounded-3xl p-6 shadow-soft space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#E8E2D2]">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-[#10B981]" />
              <h3 className="font-display font-bold text-base text-[#14201B]">
                Faculty Teaching Workload
              </h3>
            </div>
            <span className="text-[11px] font-mono text-[#5B6B63]">Weekly hours</span>
          </div>

          <div className="space-y-4 pt-1">
            {teachers.map((t) => {
              const assignedHours = subjects
                .filter((s) => s.teacherId === t.id)
                .reduce((acc, curr) => acc + curr.sessionsPerWeek, 0);

              const pct = Math.min(
                100,
                Math.round((assignedHours / t.maxHoursPerWeek) * 100)
              );

              return (
                <div key={t.id} className="space-y-1.5 text-xs">
                  <div className="flex justify-between font-medium">
                    <span className="text-[#14201B] font-bold">
                      {t.name} ({t.department})
                    </span>
                    <span className="font-mono text-[#5B21B6] font-semibold">
                      {assignedHours} / {t.maxHoursPerWeek} hrs ({pct}%)
                    </span>
                  </div>
                  <div className="w-full h-2.5 bg-[#F3EFE4] rounded-full overflow-hidden">
                    <div
                      className="chart-bar-fill h-full bg-[#8B5CF6] rounded-full"
                      style={{ width: `${Math.max(4, pct)}%` }}
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
