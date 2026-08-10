import React, { useState } from "react";
import { Section } from "@/types/timetable";
import { Layers, Plus, Trash2, GraduationCap, Users } from "lucide-react";

interface SectionManagerProps {
  sections: Section[];
  onAddSection: (section: Section) => void;
  onDeleteSection: (id: string) => void;
}

export const SectionManager: React.FC<SectionManagerProps> = ({
  sections,
  onAddSection,
  onDeleteSection,
}) => {
  const [name, setName] = useState("");
  const [department, setDepartment] = useState("Computer Science");
  const [semester, setSemester] = useState(4);
  const [studentCount, setStudentCount] = useState(60);
  const [batch, setBatch] = useState("2024-2028");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const newSection: Section = {
      id: `sec-${Date.now()}`,
      name: name.trim(),
      department: department.trim() || "CSE",
      semester: Number(semester),
      academicYear: "2026-2027",
      studentCount: Number(studentCount),
      batch: batch.trim() || "2024-2028",
    };

    onAddSection(newSection);
    setName("");
  };

  return (
    <div className="space-y-6">
      <div className="bg-[#07070a] border border-white/10 rounded-3xl p-6 shadow-2xl flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-emerald-400 font-black text-xs uppercase tracking-widest bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20 w-fit">
            <Layers className="w-3.5 h-3.5" />
            Section & Student Group Directory
          </div>
          <h2 className="text-2xl font-black text-white tracking-tight mt-2">
            Target Academic Sections
          </h2>
          <p className="text-xs text-zinc-400 mt-1">
            Create custom student sections (e.g., CSE-4A, ECE-6B), define class strength, department, and semester.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Form: Add Custom Section */}
        <div className="lg:col-span-4 bg-[#07070a] border border-white/10 rounded-3xl p-6 shadow-2xl space-y-4">
          <h3 className="text-sm font-black text-white flex items-center gap-2 border-b border-white/10 pb-3 uppercase tracking-wider">
            <Plus className="w-4 h-4 text-emerald-400" />
            Add Custom Section
          </h3>

          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div>
              <label className="font-extrabold text-zinc-300 block mb-1.5 uppercase tracking-wider">Section Name *</label>
              <input
                type="text"
                placeholder="e.g. CSE-4C or ECE-6B"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-zinc-900 border border-white/10 rounded-2xl px-3.5 py-2.5 text-white font-extrabold focus:ring-2 focus:ring-emerald-400 focus:outline-none"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="font-extrabold text-zinc-300 block mb-1.5 uppercase tracking-wider">Semester</label>
                <input
                  type="number"
                  min={1}
                  max={8}
                  value={semester}
                  onChange={(e) => setSemester(Number(e.target.value))}
                  className="w-full bg-zinc-900 border border-white/10 rounded-2xl px-3.5 py-2.5 text-white font-mono focus:ring-2 focus:ring-emerald-400 focus:outline-none"
                />
              </div>

              <div>
                <label className="font-extrabold text-zinc-300 block mb-1.5 uppercase tracking-wider">Student Strength</label>
                <input
                  type="number"
                  min={10}
                  max={200}
                  value={studentCount}
                  onChange={(e) => setStudentCount(Number(e.target.value))}
                  className="w-full bg-zinc-900 border border-white/10 rounded-2xl px-3.5 py-2.5 text-white font-mono focus:ring-2 focus:ring-emerald-400 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="font-extrabold text-zinc-300 block mb-1.5 uppercase tracking-wider">Department</label>
              <input
                type="text"
                placeholder="e.g. Computer Science"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                className="w-full bg-zinc-900 border border-white/10 rounded-2xl px-3.5 py-2.5 text-white font-semibold focus:ring-2 focus:ring-emerald-400 focus:outline-none"
              />
            </div>

            <div>
              <label className="font-extrabold text-zinc-300 block mb-1.5 uppercase tracking-wider">Academic Batch</label>
              <input
                type="text"
                placeholder="e.g. 2024-2028"
                value={batch}
                onChange={(e) => setBatch(e.target.value)}
                className="w-full bg-zinc-900 border border-white/10 rounded-2xl px-3.5 py-2.5 text-white font-medium focus:ring-2 focus:ring-emerald-400 focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-emerald-500 hover:bg-emerald-400 text-black font-black rounded-2xl shadow-lg shadow-emerald-500/20 transition-all flex items-center justify-center gap-2 text-xs uppercase tracking-wider"
            >
              <Plus className="w-4 h-4 text-black" />
              Save Section
            </button>
          </form>
        </div>

        {/* List of Registered Sections */}
        <div className="lg:col-span-8 bg-[#07070a] border border-white/10 rounded-3xl p-6 shadow-2xl space-y-4">
          <h3 className="text-sm font-black text-white border-b border-white/10 pb-3 uppercase tracking-wider">
            Registered Sections ({sections.length})
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {sections.map((sec) => (
              <div
                key={sec.id}
                className="bg-zinc-900/80 border border-white/10 rounded-2xl p-4 flex items-center justify-between gap-3 hover:border-emerald-500/40 transition-all shadow-lg"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center font-black text-sm">
                    {sec.name.substring(0, 3)}
                  </div>
                  <div>
                    <div className="font-extrabold text-sm text-white">{sec.name}</div>
                    <div className="text-xs text-zinc-400 mt-0.5">
                      {sec.department} • Semester {sec.semester}
                    </div>
                    <div className="text-[10px] text-zinc-500 mt-0.5">
                      {sec.studentCount} Students • Batch {sec.batch}
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => onDeleteSection(sec.id)}
                  className="p-2 text-rose-400 hover:bg-rose-500/10 rounded-xl transition-colors"
                  title="Delete Section"
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
