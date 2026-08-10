import React, { useState } from "react";
import { Subject, Teacher, Section } from "@/types/timetable";
import { BookOpen, Plus, Trash2, UserCheck, Layers, Type } from "lucide-react";

interface SubjectManagerProps {
  subjects: Subject[];
  teachers: Teacher[];
  sections: Section[];
  onAddSubject: (sub: Subject) => void;
  onDeleteSubject: (id: string) => void;
}

export const SubjectManager: React.FC<SubjectManagerProps> = ({
  subjects,
  teachers,
  sections,
  onAddSubject,
  onDeleteSubject,
}) => {
  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [type, setType] = useState<Subject["type"]>("theory");
  const [credits, setCredits] = useState(3);
  const [sessionsPerWeek, setSessionsPerWeek] = useState(3);

  // Teacher Selection or Custom Input
  const [teacherMode, setTeacherMode] = useState<"select" | "custom">("select");
  const [teacherId, setTeacherId] = useState(teachers[0]?.id || "");
  const [customTeacherName, setCustomTeacherName] = useState("");

  // Section Selection or Custom Input
  const [sectionMode, setSectionMode] = useState<"select" | "custom">("select");
  const [sectionId, setSectionId] = useState(sections[0]?.id || "");
  const [customSectionName, setCustomSectionName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!code.trim() || !name.trim()) return;

    // Resolve Teacher
    let resolvedTeacherId = teacherId;
    let resolvedTeacherName = "";
    if (teacherMode === "custom" && customTeacherName.trim()) {
      resolvedTeacherName = customTeacherName.trim();
      resolvedTeacherId = `t-custom-${Date.now()}`;
    } else {
      const tObj = teachers.find(t => t.id === teacherId);
      resolvedTeacherName = tObj?.name || customTeacherName.trim() || "Unassigned Faculty";
    }

    // Resolve Section
    let resolvedSectionId = sectionId;
    let resolvedSectionName = "";
    if (sectionMode === "custom" && customSectionName.trim()) {
      resolvedSectionName = customSectionName.trim();
      resolvedSectionId = `sec-custom-${Date.now()}`;
    } else {
      const sObj = sections.find(s => s.id === sectionId);
      resolvedSectionName = sObj?.name || customSectionName.trim() || "CSE-4A";
    }

    const newSub: Subject = {
      id: `sub-${Date.now()}`,
      code: code.trim().toUpperCase(),
      name: name.trim(),
      shortName: code.trim().toUpperCase(),
      type,
      credits: Number(credits),
      theoryHours: type === "theory" ? Number(sessionsPerWeek) : 0,
      labHours: type === "lab" ? 3 : 0,
      totalHoursPerWeek: Number(sessionsPerWeek),
      sessionsPerWeek: Number(sessionsPerWeek),
      teacherId: resolvedTeacherId,
      teacherName: resolvedTeacherName,
      requiredRoomType: type === "lab" ? "lab" : "classroom",
      sectionId: resolvedSectionId,
      sectionName: resolvedSectionName,
      colorHex: type === "lab" ? "#8b5cf6" : "#10b981",
    };

    onAddSubject(newSub);
    setCode("");
    setName("");
    setCustomTeacherName("");
    setCustomSectionName("");
  };

  return (
    <div className="space-y-6">
      <div className="bg-[#07070a] border border-white/10 rounded-3xl p-6 shadow-2xl flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-emerald-400 font-black text-xs uppercase tracking-widest bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20 w-fit">
            <BookOpen className="w-3.5 h-3.5" />
            Curriculum Setup
          </div>
          <h2 className="text-2xl font-black text-white tracking-tight mt-2">
            Subject & Course Management
          </h2>
          <p className="text-xs text-zinc-400 mt-1">
            Configure weekly credit hours, sessions per week, custom assigned faculty names, and target student sections.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Form: Add New Subject */}
        <div className="lg:col-span-4 bg-[#07070a] border border-white/10 rounded-3xl p-6 shadow-2xl space-y-4">
          <h3 className="text-sm font-black text-white flex items-center gap-2 border-b border-white/10 pb-3 uppercase tracking-wider">
            <Plus className="w-4 h-4 text-emerald-400" />
            Add New Academic Subject
          </h3>

          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div>
              <label className="font-extrabold text-zinc-300 block mb-1.5 uppercase tracking-wider">Subject Code *</label>
              <input
                type="text"
                placeholder="e.g. CS401"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-full bg-zinc-900 border border-white/10 rounded-2xl px-3.5 py-2.5 text-white font-mono font-bold focus:ring-2 focus:ring-emerald-400 focus:outline-none"
                required
              />
            </div>

            <div>
              <label className="font-extrabold text-zinc-300 block mb-1.5 uppercase tracking-wider">Subject Name *</label>
              <input
                type="text"
                placeholder="e.g. Design & Analysis of Algorithms"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-zinc-900 border border-white/10 rounded-2xl px-3.5 py-2.5 text-white font-semibold focus:ring-2 focus:ring-emerald-400 focus:outline-none"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="font-extrabold text-zinc-300 block mb-1.5 uppercase tracking-wider">Type</label>
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value as Subject["type"])}
                  className="w-full bg-zinc-900 border border-white/10 rounded-2xl px-3.5 py-2.5 text-white font-semibold focus:ring-2 focus:ring-emerald-400 focus:outline-none"
                >
                  <option value="theory">Theory</option>
                  <option value="lab">Laboratory</option>
                  <option value="elective">Elective</option>
                </select>
              </div>

              <div>
                <label className="font-extrabold text-zinc-300 block mb-1.5 uppercase tracking-wider">Sessions / Wk</label>
                <input
                  type="number"
                  min={1}
                  max={6}
                  value={sessionsPerWeek}
                  onChange={(e) => setSessionsPerWeek(Number(e.target.value))}
                  className="w-full bg-zinc-900 border border-white/10 rounded-2xl px-3.5 py-2.5 text-white font-mono focus:ring-2 focus:ring-emerald-400 focus:outline-none"
                />
              </div>
            </div>

            {/* Assigned Teacher (Select or Custom Input) */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center">
                <label className="font-extrabold text-zinc-300 uppercase tracking-wider">Assigned Teacher</label>
                <button
                  type="button"
                  onClick={() => setTeacherMode(teacherMode === "select" ? "custom" : "select")}
                  className="text-[10px] text-emerald-400 hover:underline font-bold flex items-center gap-1"
                >
                  <Type className="w-3 h-3" />
                  {teacherMode === "select" ? "+ Type Custom Name" : "← Pick from List"}
                </button>
              </div>

              {teacherMode === "select" ? (
                <select
                  value={teacherId}
                  onChange={(e) => setTeacherId(e.target.value)}
                  className="w-full bg-zinc-900 border border-white/10 rounded-2xl px-3.5 py-2.5 text-white font-semibold focus:ring-2 focus:ring-emerald-400 focus:outline-none"
                >
                  {teachers.map(t => (
                    <option key={t.id} value={t.id}>{t.name} ({t.department})</option>
                  ))}
                </select>
              ) : (
                <input
                  type="text"
                  placeholder="Enter any custom teacher name (e.g. Dr. Hemanth Rao)"
                  value={customTeacherName}
                  onChange={(e) => setCustomTeacherName(e.target.value)}
                  className="w-full bg-zinc-900 border border-emerald-500/50 rounded-2xl px-3.5 py-2.5 text-white font-bold focus:ring-2 focus:ring-emerald-400 focus:outline-none"
                  required
                />
              )}
            </div>

            {/* Target Section (Select or Custom Input) */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center">
                <label className="font-extrabold text-zinc-300 uppercase tracking-wider">Target Section</label>
                <button
                  type="button"
                  onClick={() => setSectionMode(sectionMode === "select" ? "custom" : "select")}
                  className="text-[10px] text-emerald-400 hover:underline font-bold flex items-center gap-1"
                >
                  <Type className="w-3 h-3" />
                  {sectionMode === "select" ? "+ Type Custom Section" : "← Pick from List"}
                </button>
              </div>

              {sectionMode === "select" ? (
                <select
                  value={sectionId}
                  onChange={(e) => setSectionId(e.target.value)}
                  className="w-full bg-zinc-900 border border-white/10 rounded-2xl px-3.5 py-2.5 text-white font-semibold focus:ring-2 focus:ring-emerald-400 focus:outline-none"
                >
                  {sections.map(s => (
                    <option key={s.id} value={s.id}>{s.name} ({s.department})</option>
                  ))}
                </select>
              ) : (
                <input
                  type="text"
                  placeholder="Enter any custom section name (e.g. CSE-4C or ECE-6B)"
                  value={customSectionName}
                  onChange={(e) => setCustomSectionName(e.target.value)}
                  className="w-full bg-zinc-900 border border-emerald-500/50 rounded-2xl px-3.5 py-2.5 text-white font-bold focus:ring-2 focus:ring-emerald-400 focus:outline-none"
                  required
                />
              )}
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-emerald-500 hover:bg-emerald-400 text-black font-black rounded-2xl shadow-lg shadow-emerald-500/20 transition-all flex items-center justify-center gap-2 text-xs uppercase tracking-wider"
            >
              <Plus className="w-4 h-4 text-black" />
              Save Subject
            </button>
          </form>
        </div>

        {/* List of Registered Subjects */}
        <div className="lg:col-span-8 bg-[#07070a] border border-white/10 rounded-3xl p-6 shadow-2xl space-y-4">
          <h3 className="text-sm font-black text-white border-b border-white/10 pb-3 uppercase tracking-wider">
            Active Registered Subjects ({subjects.length})
          </h3>

          <div className="space-y-3">
            {subjects.map((sub) => (
              <div
                key={sub.id}
                className="bg-zinc-900/80 border border-white/10 rounded-2xl p-4 flex items-center justify-between gap-4 hover:border-emerald-500/40 transition-colors shadow-lg"
              >
                <div className="flex items-center gap-3.5">
                  <div
                    className="w-10 h-10 rounded-2xl flex items-center justify-center font-black text-black text-xs shadow-lg"
                    style={{ backgroundColor: sub.colorHex || "#10b981" }}
                  >
                    {sub.code.substring(0, 3)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-extrabold text-sm text-white">{sub.code}: {sub.name}</span>
                      <span className="text-[10px] uppercase font-black bg-emerald-500/10 text-emerald-400 px-2.5 py-0.5 rounded-full border border-emerald-500/30">
                        {sub.type}
                      </span>
                    </div>
                    <div className="text-xs text-zinc-400 mt-0.5">
                      Faculty: <strong className="text-white">{sub.teacherName}</strong> • Target: <strong className="text-emerald-400">{sub.sectionName}</strong> • {sub.sessionsPerWeek} hrs/wk
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => onDeleteSubject(sub.id)}
                  className="p-2 text-rose-400 hover:bg-rose-500/10 rounded-xl transition-colors"
                  title="Delete Subject"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
