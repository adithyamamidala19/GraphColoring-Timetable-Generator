import React, { useState } from "react";
import { Teacher } from "@/types/timetable";
import { Users, Plus, Trash2, UserCheck, Mail, Building } from "lucide-react";

interface TeacherManagerProps {
  teachers: Teacher[];
  onAddTeacher: (teacher: Teacher) => void;
  onDeleteTeacher: (id: string) => void;
}

export const TeacherManager: React.FC<TeacherManagerProps> = ({
  teachers,
  onAddTeacher,
  onDeleteTeacher,
}) => {
  const [name, setName] = useState("");
  const [employeeId, setEmployeeId] = useState("");
  const [department, setDepartment] = useState("Computer Science");
  const [email, setEmail] = useState("");
  const [maxHours, setMaxHours] = useState(16);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const newTeacher: Teacher = {
      id: `t-${Date.now()}`,
      employeeId: employeeId.trim() || `EMP-${Math.floor(100 + Math.random() * 900)}`,
      name: name.trim(),
      department: department.trim() || "CSE",
      email: email.trim() || `${name.toLowerCase().replace(/\s+/g, ".")}@univ.edu`,
      maxHoursPerWeek: Number(maxHours),
      currentWorkloadHours: 0,
      unavailableSlots: [],
      preferredSlots: [],
    };

    onAddTeacher(newTeacher);
    setName("");
    setEmployeeId("");
    setEmail("");
  };

  return (
    <div className="space-y-6">
      <div className="bg-[#07070a] border border-white/10 rounded-3xl p-6 shadow-2xl flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-emerald-400 font-black text-xs uppercase tracking-widest bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20 w-fit">
            <Users className="w-3.5 h-3.5" />
            Faculty Management
          </div>
          <h2 className="text-2xl font-black text-white tracking-tight mt-2">
            Teacher & Faculty Directory
          </h2>
          <p className="text-xs text-zinc-400 mt-1">
            Add custom faculty members with personalized names, employee IDs, departments, and max workload hour caps.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Form: Add Custom Teacher */}
        <div className="lg:col-span-4 bg-[#07070a] border border-white/10 rounded-3xl p-6 shadow-2xl space-y-4">
          <h3 className="text-sm font-black text-white flex items-center gap-2 border-b border-white/10 pb-3 uppercase tracking-wider">
            <Plus className="w-4 h-4 text-emerald-400" />
            Add Custom Faculty Member
          </h3>

          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div>
              <label className="font-extrabold text-zinc-300 block mb-1.5 uppercase tracking-wider">Faculty Name *</label>
              <input
                type="text"
                placeholder="e.g. Dr. Hemanth Rao"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-zinc-900 border border-white/10 rounded-2xl px-3.5 py-2.5 text-white font-semibold focus:ring-2 focus:ring-emerald-400 focus:outline-none"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="font-extrabold text-zinc-300 block mb-1.5 uppercase tracking-wider">Employee ID</label>
                <input
                  type="text"
                  placeholder="e.g. EMP-204"
                  value={employeeId}
                  onChange={(e) => setEmployeeId(e.target.value)}
                  className="w-full bg-zinc-900 border border-white/10 rounded-2xl px-3.5 py-2.5 text-white font-mono focus:ring-2 focus:ring-emerald-400 focus:outline-none"
                />
              </div>

              <div>
                <label className="font-extrabold text-zinc-300 block mb-1.5 uppercase tracking-wider">Max Hours / Wk</label>
                <input
                  type="number"
                  min={4}
                  max={30}
                  value={maxHours}
                  onChange={(e) => setMaxHours(Number(e.target.value))}
                  className="w-full bg-zinc-900 border border-white/10 rounded-2xl px-3.5 py-2.5 text-white font-mono focus:ring-2 focus:ring-emerald-400 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="font-extrabold text-zinc-300 block mb-1.5 uppercase tracking-wider">Department</label>
              <input
                type="text"
                placeholder="e.g. Computer Science & Engineering"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                className="w-full bg-zinc-900 border border-white/10 rounded-2xl px-3.5 py-2.5 text-white font-semibold focus:ring-2 focus:ring-emerald-400 focus:outline-none"
              />
            </div>

            <div>
              <label className="font-extrabold text-zinc-300 block mb-1.5 uppercase tracking-wider">Email Address</label>
              <input
                type="email"
                placeholder="e.g. hemanth.rao@univ.edu"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-zinc-900 border border-white/10 rounded-2xl px-3.5 py-2.5 text-white font-medium focus:ring-2 focus:ring-emerald-400 focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-emerald-500 hover:bg-emerald-400 text-black font-black rounded-2xl shadow-lg shadow-emerald-500/20 transition-all flex items-center justify-center gap-2 text-xs uppercase tracking-wider"
            >
              <Plus className="w-4 h-4 text-black" />
              Save Faculty Member
            </button>
          </form>
        </div>

        {/* List of Registered Teachers */}
        <div className="lg:col-span-8 bg-[#07070a] border border-white/10 rounded-3xl p-6 shadow-2xl space-y-4">
          <h3 className="text-sm font-black text-white border-b border-white/10 pb-3 uppercase tracking-wider">
            Registered Teachers ({teachers.length})
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {teachers.map((t) => (
              <div
                key={t.id}
                className="bg-zinc-900/80 border border-white/10 rounded-2xl p-4 flex items-center justify-between gap-3 hover:border-emerald-500/40 transition-all shadow-lg"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center font-black text-sm">
                    {t.name.substring(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <div className="font-extrabold text-sm text-white">{t.name}</div>
                    <div className="text-xs text-zinc-400 mt-0.5">
                      {t.department} • <span className="font-mono text-emerald-400">{t.employeeId}</span>
                    </div>
                    <div className="text-[10px] text-zinc-500 mt-0.5">
                      Max: {t.maxHoursPerWeek} hrs/wk • {t.email}
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => onDeleteTeacher(t.id)}
                  className="p-2 text-rose-400 hover:bg-rose-500/10 rounded-xl transition-colors"
                  title="Delete Teacher"
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
