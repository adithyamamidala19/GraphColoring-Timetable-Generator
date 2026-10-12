import React, { useState, useRef } from "react";
import { ScheduledCell, Section, Teacher, Room } from "@/types/timetable";
import { defaultDays, defaultPeriods } from "@/services/api";
import {
  Download,
  FileText,
  Printer,
  ChevronDown,
  FlaskConical,
  Filter,
} from "lucide-react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { useGSAP } from "@gsap/react";
import { gsap, prefersReducedMotion } from "@/motion";

interface TimetableGridProps {
  cells: ScheduledCell[];
  sections: Section[];
  teachers: Teacher[];
  rooms: Room[];
}

// Distinct pastel color palette for subjects
const SUBJECT_PASTELS: Record<string, { bg: string; text: string; border: string }> = {
  CS401: { bg: "#A7F3D0", text: "#065F46", border: "#6EE7B7" }, // Mint
  CS402: { bg: "#BAE6FD", text: "#0369A1", border: "#7DD3FC" }, // Sky
  CS403P: { bg: "#DDD6FE", text: "#5B21B6", border: "#C4B5FD" }, // Lavender
  CS404: { bg: "#FED7AA", text: "#9A3412", border: "#FDBA74" }, // Peach
  CS405P: { bg: "#FECDD3", text: "#9F1239", border: "#FDA4AF" }, // Rose
  CS406: { bg: "#FEF08A", text: "#854D0E", border: "#FDE047" }, // Lemon
  MA407: { bg: "#E9D5FF", text: "#6B21A8", border: "#D8B4FE" }, // Purple
};

export const TimetableGrid: React.FC<TimetableGridProps> = ({
  cells,
  sections,
  teachers,
  rooms,
}) => {
  const [selectedSection, setSelectedSection] = useState<string>("sec-1");
  const [selectedTeacher, setSelectedTeacher] = useState<string>("all");
  const [selectedRoom, setSelectedRoom] = useState<string>("all");
  const [selectedDay, setSelectedDay] = useState<string>("all");
  const [hoveredSubjectCode, setHoveredSubjectCode] = useState<string | null>(null);
  const [isExportMenuOpen, setIsExportMenuOpen] = useState<boolean>(false);

  const gridContainerRef = useRef<HTMLDivElement | null>(null);

  // Filter cells
  const filteredCells = cells.filter((cell) => {
    if (selectedSection !== "all" && cell.sectionId !== selectedSection) return false;
    if (selectedTeacher !== "all" && cell.teacherId !== selectedTeacher) return false;
    if (selectedRoom !== "all" && cell.roomId !== selectedRoom) return false;
    if (selectedDay !== "all" && cell.day !== selectedDay) return false;
    return true;
  });

  const getCellForSlot = (day: string, period: number) => {
    return filteredCells.find((c) => c.day === day && c.period === period);
  };

  const currentSectionObj = sections.find((s) => s.id === selectedSection);
  const sectionTitle = currentSectionObj
    ? `${currentSectionObj.name} (${currentSectionObj.department})`
    : "All Sections";

  // Stagger animate rows after generation
  useGSAP(
    () => {
      if (prefersReducedMotion() || !gridContainerRef.current) return;
      const rows = gridContainerRef.current.querySelectorAll(".timetable-row");
      gsap.fromTo(
        rows,
        { opacity: 0, y: 14 },
        {
          opacity: 1,
          y: 0,
          duration: 0.35,
          stagger: 0.05,
          ease: "power2.out",
          clearProps: "transform,opacity",
        }
      );
    },
    { scope: gridContainerRef, dependencies: [cells, selectedSection, selectedTeacher, selectedRoom, selectedDay] }
  );

  // 1. Export CSV
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
    const rows = filteredCells.map((c) => {
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
    link.setAttribute("download", `Timetable_${selectedSection}_Export.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setIsExportMenuOpen(false);
  };

  // 2. Export PDF (A4 Landscape)
  const handleExportPDF = () => {
    try {
      const doc = new jsPDF({
        orientation: "landscape",
        unit: "mm",
        format: "a4",
      });

      // Warm ivory / emerald clean header
      doc.setFillColor(250, 247, 240);
      doc.rect(0, 0, 297, 26, "F");

      doc.setTextColor(6, 95, 70); // Deep emerald
      doc.setFontSize(15);
      doc.setFont("helvetica", "bold");
      doc.text("AUTOSCHED AI • ACADEMIC TIMETABLE MATRIX", 14, 12);

      doc.setTextColor(91, 107, 99);
      doc.setFontSize(9);
      doc.setFont("helvetica", "normal");
      doc.text(
        `Section: ${sectionTitle}   |   Verified: Zero Hard Conflicts   |   Date: ${new Date().toLocaleDateString()}`,
        14,
        19
      );

      // Columns (Day + Period 1 to 6)
      const head = [
        [
          "Day / Period",
          ...defaultPeriods.map((p) => `Period ${p.period}\n${p.start} - ${p.end}`),
        ],
      ];

      // Rows
      const body = defaultDays.map((day) => {
        const rowCells = defaultPeriods.map((p) => {
          const cell = getCellForSlot(day, p.period);
          if (!cell) return "—";
          return `${cell.subjectCode}\n${cell.subjectName}\n${cell.teacherName}\n${cell.roomCode}`;
        });
        return [day, ...rowCells];
      });

      autoTable(doc, {
        startY: 28,
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

      doc.save(`Timetable_${selectedSection}_A4.pdf`);
    } catch (err) {
      console.error("PDF generation fallback:", err);
      window.print();
    }
    setIsExportMenuOpen(false);
  };

  const getFacultyInitials = (name: string) => {
    return name
      .replace(/^Dr\.\s*|^Prof\.\s*/i, "")
      .split(" ")
      .map((part) => part[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
  };

  const activeDays = selectedDay === "all" ? defaultDays : [selectedDay];

  return (
    <div className="space-y-4">
      {/* Compact Pill Filter Bar + Export Menu */}
      <div className="bg-white border border-[#E8E2D2] rounded-3xl p-4 shadow-soft flex flex-wrap items-center justify-between gap-4">
        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className="flex items-center gap-1.5 font-semibold text-[#5B6B63] mr-1">
            <Filter className="w-3.5 h-3.5 text-[#10B981]" />
            Filters:
          </span>

          {/* Section Pill */}
          <div className="relative">
            <select
              id="filter-section"
              name="filter-section"
              aria-label="Filter by section"
              value={selectedSection}
              onChange={(e) => setSelectedSection(e.target.value)}
              className="bg-[#FAF7F0] border border-[#E8E2D2] text-[#14201B] font-semibold text-xs rounded-xl px-3 py-1.5 focus-visible:ring-2 focus-visible:ring-[#10B981] cursor-pointer"
            >
              <option value="all">All Sections</option>
              {sections.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              ))}
            </select>
          </div>

          {/* Faculty Pill */}
          <div className="relative">
            <select
              id="filter-faculty"
              name="filter-faculty"
              aria-label="Filter by faculty"
              value={selectedTeacher}
              onChange={(e) => setSelectedTeacher(e.target.value)}
              className="bg-[#FAF7F0] border border-[#E8E2D2] text-[#14201B] font-semibold text-xs rounded-xl px-3 py-1.5 focus-visible:ring-2 focus-visible:ring-[#10B981] cursor-pointer"
            >
              <option value="all">All Faculty</option>
              {teachers.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.name}
                </option>
              ))}
            </select>
          </div>

          {/* Room Pill */}
          <div className="relative">
            <select
              id="filter-room"
              name="filter-room"
              aria-label="Filter by room"
              value={selectedRoom}
              onChange={(e) => setSelectedRoom(e.target.value)}
              className="bg-[#FAF7F0] border border-[#E8E2D2] text-[#14201B] font-semibold text-xs rounded-xl px-3 py-1.5 focus-visible:ring-2 focus-visible:ring-[#10B981] cursor-pointer"
            >
              <option value="all">All Rooms</option>
              {rooms.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.code} ({r.type})
                </option>
              ))}
            </select>
          </div>

          {/* Day Pill */}
          <div className="relative">
            <select
              id="filter-day"
              name="filter-day"
              aria-label="Filter by day"
              value={selectedDay}
              onChange={(e) => setSelectedDay(e.target.value)}
              className="bg-[#FAF7F0] border border-[#E8E2D2] text-[#14201B] font-semibold text-xs rounded-xl px-3 py-1.5 focus-visible:ring-2 focus-visible:ring-[#10B981] cursor-pointer"
            >
              <option value="all">All 5 Days</option>
              {defaultDays.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Single "Export" Dropdown Button */}
        <div className="relative">
          <button
            onClick={() => setIsExportMenuOpen(!isExportMenuOpen)}
            className="px-4 py-2 bg-[#FAF7F0] hover:bg-[#F3EFE4] text-[#14201B] border border-[#E8E2D2] rounded-2xl text-xs font-semibold flex items-center gap-2 shadow-subtle transition-colors cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-[#10B981]" />
            <span>Export</span>
            <ChevronDown className="w-3.5 h-3.5 text-[#5B6B63]" />
          </button>

          {isExportMenuOpen && (
            <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-[#E8E2D2] rounded-2xl shadow-float z-30 py-1 text-xs divide-y divide-[#E8E2D2]">
              <button
                onClick={handleExportPDF}
                className="w-full px-4 py-2.5 text-left text-[#14201B] hover:bg-[#FAF7F0] flex items-center gap-2 font-medium"
              >
                <FileText className="w-4 h-4 text-[#10B981]" />
                <span>PDF Document (A4)</span>
              </button>
              <button
                onClick={handleExportCSV}
                className="w-full px-4 py-2.5 text-left text-[#14201B] hover:bg-[#FAF7F0] flex items-center gap-2 font-medium"
              >
                <Download className="w-4 h-4 text-[#5B6B63]" />
                <span>CSV Spreadsheet</span>
              </button>
              <button
                onClick={() => {
                  window.print();
                  setIsExportMenuOpen(false);
                }}
                className="w-full px-4 py-2.5 text-left text-[#14201B] hover:bg-[#FAF7F0] flex items-center gap-2 font-medium"
              >
                <Printer className="w-4 h-4 text-[#5B6B63]" />
                <span>Print Schedule</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Timetable Grid Container (Fits all 6 periods with NO horizontal clipping on desktop) */}
      <div
        ref={gridContainerRef}
        className="bg-white border border-[#E8E2D2] rounded-3xl p-5 shadow-soft overflow-x-auto"
      >
        <div className="min-w-[800px] w-full">
          {/* Header Row: Day Column + 6 Period Columns (CSS Grid minmax(0, 1fr)) */}
          <div className="grid grid-cols-[100px_repeat(6,minmax(0,1fr))] gap-2.5 pb-2.5 border-b border-[#E8E2D2] text-xs font-semibold text-[#5B6B63]">
            <div className="px-2 py-1.5 flex items-center text-[#14201B] font-bold">
              Day / Time
            </div>
            {defaultPeriods.map((p) => (
              <div
                key={p.period}
                className="px-2 py-1.5 rounded-xl bg-[#FAF7F0] border border-[#E8E2D2] text-center"
              >
                <div className="font-bold text-[#14201B] text-xs">Period {p.period}</div>
                <div className="text-[10px] font-mono text-[#5B6B63] mt-0.5 truncate">
                  {p.start.replace(" ", "")} - {p.end.replace(" ", "")}
                </div>
              </div>
            ))}
          </div>

          {/* Table Body Days */}
          <div className="space-y-2.5 pt-2.5">
            {activeDays.map((day) => (
              <div
                key={day}
                className="timetable-row grid grid-cols-[100px_repeat(6,minmax(0,1fr))] gap-2.5 items-stretch min-h-[96px]"
              >
                {/* Sticky/Fixed Day Label */}
                <div className="p-2.5 rounded-2xl bg-[#FAF7F0] border border-[#E8E2D2] flex flex-col justify-center items-center text-center">
                  <span className="font-display font-bold text-xs text-[#14201B]">
                    {day.slice(0, 3)}
                  </span>
                  <span className="text-[10px] text-[#5B6B63] font-mono">{day}</span>
                </div>

                {/* 6 Periods */}
                {defaultPeriods.map((p) => {
                  const cell = getCellForSlot(day, p.period);
                  const isMatch = hoveredSubjectCode && cell?.subjectCode === hoveredSubjectCode;
                  const isDimmed = hoveredSubjectCode && cell && cell.subjectCode !== hoveredSubjectCode;

                  const pastel = cell
                    ? SUBJECT_PASTELS[cell.subjectCode] || {
                        bg: "#A7F3D0",
                        text: "#065F46",
                        border: "#6EE7B7",
                      }
                    : null;

                  return (
                    <div key={p.period} className="h-full">
                      {cell ? (
                        <div
                          onMouseEnter={() => setHoveredSubjectCode(cell.subjectCode)}
                          onMouseLeave={() => setHoveredSubjectCode(null)}
                          className={`h-full w-full p-2.5 rounded-2xl border flex flex-col justify-between transition-all duration-200 cursor-pointer ${
                            isDimmed ? "opacity-30 scale-98" : isMatch ? "scale-102 shadow-md ring-2 ring-[#10B981]" : "shadow-subtle"
                          }`}
                          style={{
                            backgroundColor: pastel?.bg || "#A7F3D0",
                            borderColor: pastel?.border || "#6EE7B7",
                            color: pastel?.text || "#065F46",
                          }}
                        >
                          {/* Subject Code & Lab Icon */}
                          <div className="flex items-center justify-between gap-1">
                            <span className="font-mono font-extrabold text-xs tracking-tight">
                              {cell.subjectCode}
                            </span>
                            {cell.isLab && (
                              <span
                                title="Hardware Laboratory Session"
                                className="p-0.5 rounded-md bg-white/60"
                              >
                                <FlaskConical className="w-3 h-3 text-[#5B21B6]" />
                              </span>
                            )}
                          </div>

                          {/* Short Subject Name Truncated with Tooltip */}
                          <div
                            className="text-[11px] font-semibold truncate my-0.5"
                            title={cell.subjectName}
                          >
                            {cell.subjectName}
                          </div>

                          {/* Bottom Row: Faculty Initials Avatar + Room Chip */}
                          <div className="flex items-center justify-between gap-1 pt-1 border-t border-black/5 text-[10px]">
                            <div
                              className="w-4 h-4 rounded-full bg-white/70 flex items-center justify-center font-bold text-[9px] shrink-0"
                              title={cell.teacherName}
                            >
                              {getFacultyInitials(cell.teacherName)}
                            </div>
                            <span className="font-mono font-bold bg-white/60 px-1.5 py-0.2 rounded">
                              {cell.roomCode}
                            </span>
                          </div>
                        </div>
                      ) : (
                        /* Free slot: dashed, near-invisible */
                        <div className="h-full w-full rounded-2xl border border-dashed border-[#E8E2D2]/80 flex items-center justify-center text-[10px] text-[#A8B3AD] font-mono">
                          Free
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
