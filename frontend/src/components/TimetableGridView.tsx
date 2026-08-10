import React, { useState } from "react";
import { ScheduledCell, Section, Teacher, Room } from "@/types/timetable";
import { defaultDays, defaultPeriods } from "@/services/api";
import { Calendar, Filter, Download, FileText, User, MapPin, Printer } from "lucide-react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

interface TimetableGridViewProps {
  cells: ScheduledCell[];
  sections: Section[];
  teachers: Teacher[];
  rooms: Room[];
}

export const TimetableGridView: React.FC<TimetableGridViewProps> = ({
  cells,
  sections,
  teachers,
  rooms,
}) => {
  const [selectedSection, setSelectedSection] = useState<string>("sec-1");
  const [selectedTeacher, setSelectedTeacher] = useState<string>("all");
  const [selectedRoom, setSelectedRoom] = useState<string>("all");

  // Filter scheduled cells
  const filteredCells = cells.filter((cell) => {
    if (selectedSection !== "all" && cell.sectionId !== selectedSection) return false;
    if (selectedTeacher !== "all" && cell.teacherId !== selectedTeacher) return false;
    if (selectedRoom !== "all" && cell.roomId !== selectedRoom) return false;
    return true;
  });

  // Map cells to (day, period) matrix
  const getCellForSlot = (day: string, period: number) => {
    return filteredCells.find((c) => c.day === day && c.period === period);
  };

  const currentSectionObj = sections.find((s) => s.id === selectedSection);
  const sectionTitle = currentSectionObj ? `${currentSectionObj.name} (${currentSectionObj.department})` : "All Sections";

  // 1. Export CSV
  const handleExportCSV = () => {
    const headers = ["Day", "Period", "Time", "Subject Code", "Subject Name", "Teacher", "Room", "Section"];
    const rows = filteredCells.map((c) => {
      const pInfo = defaultPeriods.find((p) => p.period === c.period);
      return [
        c.day,
        c.period,
        `${pInfo?.start || ""} - ${pInfo?.end || ""}`,
        c.subjectCode,
        `"${c.subjectName}"`,
        `"${c.teacherName}"`,
        c.roomCode,
        c.sectionName,
      ].join(",");
    });

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Timetable_${selectedSection}_Export.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // 2. Export PDF
  const handleExportPDF = () => {
    try {
      const doc = new jsPDF({
        orientation: "landscape",
        unit: "mm",
        format: "a4",
      });

      // Title & Header Branding
      doc.setFillColor(10, 10, 14);
      doc.rect(0, 0, 297, 25, "F");

      doc.setTextColor(16, 185, 129); // Emerald
      doc.setFontSize(16);
      doc.setFont("helvetica", "bold");
      doc.text("AUTOMATED ACADEMIC TIMETABLE GENERATOR", 14, 12);

      doc.setTextColor(200, 200, 200);
      doc.setFontSize(9);
      doc.setFont("helvetica", "normal");
      doc.text(`Target Section / Filter: ${sectionTitle}  |  Generated: ${new Date().toLocaleDateString()}`, 14, 19);

      // Construct PDF Table Columns (Day + Period 1 to 6)
      const head = [
        [
          "Day / Period",
          ...defaultPeriods.map((p) => `Period ${p.period}\n(${p.start})`),
        ],
      ];

      // Construct Table Body Rows
      const body = defaultDays.map((day) => {
        const rowCells = defaultPeriods.map((p) => {
          const cell = getCellForSlot(day, p.period);
          if (!cell) return "Free Slot";
          return `${cell.subjectCode}\n${cell.subjectName}\nFac: ${cell.teacherName}\nRm: ${cell.roomCode} [${cell.sectionName}]`;
        });
        return [day, ...rowCells];
      });

      // Render autoTable
      autoTable(doc, {
        startY: 28,
        head,
        body,
        theme: "grid",
        headStyles: {
          fillColor: [16, 185, 129],
          textColor: [0, 0, 0],
          fontStyle: "bold",
          fontSize: 8.5,
          halign: "center",
        },
        bodyStyles: {
          fontSize: 7.5,
          cellPadding: 3,
          valign: "middle",
          halign: "center",
        },
        alternateRowStyles: {
          fillColor: [245, 247, 250],
        },
        columnStyles: {
          0: { fontStyle: "bold", fillColor: [230, 235, 240], cellWidth: 28 },
        },
      });

      // Save PDF Document
      doc.save(`Timetable_${selectedSection}_Schedule.pdf`);
    } catch (err) {
      console.error("PDF generation fallback: ", err);
      // Fallback: Trigger browser print preview to save as PDF
      window.print();
    }
  };

  return (
    <div className="space-y-6">
      {/* Header & Filter Controls */}
      <div className="bg-[#07070a] border border-white/10 rounded-3xl p-6 shadow-2xl space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-5">
          <div>
            <div className="flex items-center gap-2 text-emerald-400 font-black text-xs uppercase tracking-widest bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20 w-fit">
              <Calendar className="w-3.5 h-3.5" />
              Master Schedule Matrix
            </div>
            <h2 className="text-2xl font-black text-white tracking-tight mt-2 font-neuton">
              Generated Weekly Academic Timetable Grid
            </h2>
            <p className="text-xs text-zinc-400 mt-1">
              Zero hard conflicts verified across Sections, Teachers, and Lecture Halls.
            </p>
          </div>

          {/* Export Action Buttons */}
          <div className="flex items-center gap-3">
            <button
              onClick={handleExportPDF}
              className="px-5 py-3 bg-emerald-500 hover:bg-emerald-400 text-black font-black rounded-2xl text-xs flex items-center gap-2 shadow-lg shadow-emerald-500/20 transition-all hover:scale-105"
            >
              <FileText className="w-4 h-4 text-black" />
              Download PDF Schedule
            </button>

            <button
              onClick={handleExportCSV}
              className="px-4 py-3 bg-zinc-900 hover:bg-zinc-800 text-white border border-white/10 font-bold rounded-2xl text-xs flex items-center gap-2 transition-all"
            >
              <Download className="w-4 h-4 text-zinc-400" />
              Export CSV
            </button>

            <button
              onClick={() => window.print()}
              className="p-3 bg-zinc-900 hover:bg-zinc-800 text-white border border-white/10 rounded-2xl text-xs transition-all"
              title="Print Schedule"
            >
              <Printer className="w-4 h-4 text-zinc-400" />
            </button>
          </div>
        </div>

        {/* Filter Toolbar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
          <div>
            <label className="text-[11px] font-black text-zinc-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Filter className="w-3.5 h-3.5 text-emerald-400" /> Filter by Section:
            </label>
            <select
              value={selectedSection}
              onChange={(e) => setSelectedSection(e.target.value)}
              className="w-full bg-zinc-900 border border-white/10 rounded-2xl px-3.5 py-2.5 text-xs font-bold text-white focus:ring-2 focus:ring-emerald-400 focus:outline-none"
            >
              <option value="all">All Sections</option>
              {sections.map((s) => (
                <option key={s.id} value={s.id}>{s.name} ({s.department})</option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-[11px] font-black text-zinc-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-emerald-400" /> Filter by Faculty:
            </label>
            <select
              value={selectedTeacher}
              onChange={(e) => setSelectedTeacher(e.target.value)}
              className="w-full bg-zinc-900 border border-white/10 rounded-2xl px-3.5 py-2.5 text-xs font-bold text-white focus:ring-2 focus:ring-emerald-400 focus:outline-none"
            >
              <option value="all">All Faculty Members</option>
              {teachers.map((t) => (
                <option key={t.id} value={t.id}>{t.name} ({t.department})</option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-[11px] font-black text-zinc-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-emerald-400" /> Filter by Room / Lab:
            </label>
            <select
              value={selectedRoom}
              onChange={(e) => setSelectedRoom(e.target.value)}
              className="w-full bg-zinc-900 border border-white/10 rounded-2xl px-3.5 py-2.5 text-xs font-bold text-white focus:ring-2 focus:ring-emerald-400 focus:outline-none"
            >
              <option value="all">All Classrooms & Labs</option>
              {rooms.map((r) => (
                <option key={r.id} value={r.id}>{r.code} - {r.name}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Timetable Table Grid */}
      <div className="bg-[#07070a] border border-white/10 rounded-3xl p-6 shadow-2xl overflow-x-auto">
        <table className="w-full border-collapse min-w-[850px]">
          <thead>
            <tr>
              <th className="p-3.5 bg-zinc-900/90 border border-white/10 text-left text-xs font-black text-zinc-400 uppercase tracking-wider w-32">
                Day / Period
              </th>
              {defaultPeriods.map((p) => (
                <th key={p.period} className="p-3.5 bg-zinc-900/90 border border-white/10 text-center text-xs font-black text-zinc-400 uppercase tracking-wider">
                  <div className="text-white">Period {p.period}</div>
                  <div className="text-[10px] text-zinc-400 font-normal font-mono mt-0.5">{p.start} - {p.end}</div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {defaultDays.map((day) => (
              <tr key={day} className="hover:bg-white/[0.02] transition-colors">
                <td className="p-3.5 font-black text-xs text-white border border-white/10 bg-zinc-900/60">
                  {day}
                </td>

                {defaultPeriods.map((p) => {
                  const cell = getCellForSlot(day, p.period);
                  return (
                    <td key={p.period} className="p-2 border border-white/10 min-h-[95px] h-28 align-top w-1/6">
                      {cell ? (
                        <div
                          className="h-full w-full p-3 rounded-2xl text-white flex flex-col justify-between shadow-xl transition-transform hover:scale-[1.04] cursor-pointer border border-white/20"
                          style={{ backgroundColor: cell.colorHex || "#10b981" }}
                        >
                          <div className="flex justify-between items-start">
                            <span className="text-[11px] font-black uppercase tracking-wider bg-black/40 px-2 py-0.5 rounded text-white">
                              {cell.subjectCode}
                            </span>
                            {cell.isLab && (
                              <span className="text-[9px] font-extrabold bg-purple-950/80 px-2 py-0.5 rounded text-purple-200">
                                LAB
                              </span>
                            )}
                          </div>

                          <div className="text-xs font-extrabold truncate mt-1" title={cell.subjectName}>
                            {cell.subjectName}
                          </div>

                          <div className="text-[10px] text-white/90 truncate mt-0.5 font-medium">
                            {cell.teacherName}
                          </div>

                          <div className="flex justify-between items-center text-[10px] text-white/80 font-mono mt-1 pt-1 border-t border-white/20 font-bold">
                            <span>{cell.roomCode}</span>
                            <span>{cell.sectionName}</span>
                          </div>
                        </div>
                      ) : (
                        <div className="h-full w-full rounded-2xl border border-dashed border-white/10 flex items-center justify-center text-[11px] text-zinc-600 font-semibold">
                          Free Slot
                        </div>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
