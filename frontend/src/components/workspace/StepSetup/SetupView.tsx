import React, { useState } from "react";
import {
  BookOpen,
  Users,
  Layers,
  Building,
  Plus,
  Search,
  Trash2,
  Edit2,
  Database,
  FlaskConical,
} from "lucide-react";
import { useTimetable } from "@/context/TimetableContext";
import { SlideOverDrawer } from "@/components/common/SlideOverDrawer";
import { Subject, Teacher, Section, Room } from "@/types/timetable";

type SetupTab = "subjects" | "faculty" | "sections" | "rooms";

export const SetupView: React.FC = () => {
  const {
    subjects,
    teachers,
    sections,
    rooms,
    addSubject,
    updateSubject,
    deleteSubject,
    addTeacher,
    updateTeacher,
    deleteTeacher,
    addSection,
    updateSection,
    deleteSection,
    addRoom,
    updateRoom,
    deleteRoom,
    loadDemoData,
  } = useTimetable();

  const [activeTab, setActiveTab] = useState<SetupTab>("subjects");
  const [searchQuery, setSearchQuery] = useState("");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any | null>(null);

  // Subject Form State
  const [subCode, setSubCode] = useState("");
  const [subName, setSubName] = useState("");
  const [subType, setSubType] = useState<Subject["type"]>("theory");
  const [subCredits, setSubCredits] = useState(3);
  const [subSessions, setSubSessions] = useState(3);
  const [subTeacherId, setSubTeacherId] = useState("");
  const [subSectionId, setSubSectionId] = useState("");

  // Teacher Form State
  const [teacherName, setTeacherName] = useState("");
  const [teacherEmpId, setTeacherEmpId] = useState("");
  const [teacherDept, setTeacherDept] = useState("Computer Science");
  const [teacherEmail, setTeacherEmail] = useState("");
  const [teacherMaxHours, setTeacherMaxHours] = useState(16);

  // Section Form State
  const [sectionName, setSectionName] = useState("");
  const [sectionDept, setSectionDept] = useState("Computer Science");
  const [sectionSemester, setSectionSemester] = useState(4);
  const [sectionStudents, setSectionStudents] = useState(60);

  // Room Form State
  const [roomCode, setRoomCode] = useState("");
  const [roomName, setRoomName] = useState("");
  const [roomBuilding, setRoomBuilding] = useState("Main Block");
  const [roomCapacity, setRoomCapacity] = useState(70);
  const [roomType, setRoomType] = useState<Room["type"]>("classroom");

  // Open Drawer for Add
  const handleOpenAdd = () => {
    setEditingItem(null);
    if (activeTab === "subjects") {
      setSubCode("");
      setSubName("");
      setSubType("theory");
      setSubCredits(3);
      setSubSessions(3);
      setSubTeacherId(teachers[0]?.id || "");
      setSubSectionId(sections[0]?.id || "");
    } else if (activeTab === "faculty") {
      setTeacherName("");
      setTeacherEmpId("");
      setTeacherDept("Computer Science");
      setTeacherEmail("");
      setTeacherMaxHours(16);
    } else if (activeTab === "sections") {
      setSectionName("");
      setSectionDept("Computer Science");
      setSectionSemester(4);
      setSectionStudents(60);
    } else if (activeTab === "rooms") {
      setRoomCode("");
      setRoomName("");
      setRoomBuilding("Main Block");
      setRoomCapacity(70);
      setRoomType("classroom");
    }
    setIsDrawerOpen(true);
  };

  // Open Drawer for Edit
  const handleOpenEdit = (item: any) => {
    setEditingItem(item);
    if (activeTab === "subjects") {
      const s = item as Subject;
      setSubCode(s.code);
      setSubName(s.name);
      setSubType(s.type);
      setSubCredits(s.credits);
      setSubSessions(s.sessionsPerWeek);
      setSubTeacherId(s.teacherId);
      setSubSectionId(s.sectionId);
    } else if (activeTab === "faculty") {
      const t = item as Teacher;
      setTeacherName(t.name);
      setTeacherEmpId(t.employeeId);
      setTeacherDept(t.department);
      setTeacherEmail(t.email);
      setTeacherMaxHours(t.maxHoursPerWeek);
    } else if (activeTab === "sections") {
      const sec = item as Section;
      setSectionName(sec.name);
      setSectionDept(sec.department);
      setSectionSemester(sec.semester);
      setSectionStudents(sec.studentCount);
    } else if (activeTab === "rooms") {
      const r = item as Room;
      setRoomCode(r.code);
      setRoomName(r.name);
      setRoomBuilding(r.building);
      setRoomCapacity(r.capacity);
      setRoomType(r.type);
    }
    setIsDrawerOpen(true);
  };

  // Form Submit Handler
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (activeTab === "subjects") {
      const tObj = teachers.find((t) => t.id === subTeacherId) || teachers[0];
      const sObj = sections.find((s) => s.id === subSectionId) || sections[0];
      if (editingItem) {
        updateSubject(editingItem.id, {
          code: subCode.toUpperCase(),
          name: subName,
          shortName: subCode.toUpperCase(),
          type: subType,
          credits: Number(subCredits),
          sessionsPerWeek: Number(subSessions),
          teacherId: tObj?.id || "",
          teacherName: tObj?.name || "",
          sectionId: sObj?.id || "",
          sectionName: sObj?.name || "",
          requiredRoomType: subType === "lab" ? "lab" : "classroom",
        });
      } else {
        const newSub: Subject = {
          id: `sub-${Date.now()}`,
          code: subCode.toUpperCase(),
          name: subName,
          shortName: subCode.toUpperCase(),
          type: subType,
          credits: Number(subCredits),
          theoryHours: subType === "theory" ? Number(subSessions) : 0,
          labHours: subType === "lab" ? 3 : 0,
          totalHoursPerWeek: Number(subSessions),
          sessionsPerWeek: Number(subSessions),
          teacherId: tObj?.id || "",
          teacherName: tObj?.name || "Dr. Rajesh Kumar",
          requiredRoomType: subType === "lab" ? "lab" : "classroom",
          sectionId: sObj?.id || "",
          sectionName: sObj?.name || "CSE-4A",
          colorHex: subType === "lab" ? "#DDD6FE" : "#BAE6FD",
        };
        addSubject(newSub);
      }
    } else if (activeTab === "faculty") {
      if (editingItem) {
        updateTeacher(editingItem.id, {
          name: teacherName,
          employeeId: teacherEmpId,
          department: teacherDept,
          email: teacherEmail,
          maxHoursPerWeek: Number(teacherMaxHours),
        });
      } else {
        const newTeacher: Teacher = {
          id: `t-${Date.now()}`,
          name: teacherName,
          employeeId: teacherEmpId || `EMP-${Math.floor(100 + Math.random() * 900)}`,
          department: teacherDept,
          email: teacherEmail || `${teacherName.toLowerCase().replace(/\s+/g, ".")}@univ.edu`,
          maxHoursPerWeek: Number(teacherMaxHours),
          currentWorkloadHours: 0,
          unavailableSlots: [],
          preferredSlots: [],
        };
        addTeacher(newTeacher);
      }
    } else if (activeTab === "sections") {
      if (editingItem) {
        updateSection(editingItem.id, {
          name: sectionName,
          department: sectionDept,
          semester: Number(sectionSemester),
          studentCount: Number(sectionStudents),
        });
      } else {
        const newSec: Section = {
          id: `sec-${Date.now()}`,
          name: sectionName,
          department: sectionDept,
          semester: Number(sectionSemester),
          academicYear: "2026-2027",
          studentCount: Number(sectionStudents),
          batch: "2024-2028",
        };
        addSection(newSec);
      }
    } else if (activeTab === "rooms") {
      if (editingItem) {
        updateRoom(editingItem.id, {
          code: roomCode.toUpperCase(),
          name: roomName,
          building: roomBuilding,
          capacity: Number(roomCapacity),
          type: roomType,
        });
      } else {
        const newRoom: Room = {
          id: `r-${Date.now()}`,
          code: roomCode.toUpperCase(),
          name: roomName || `Room ${roomCode.toUpperCase()}`,
          building: roomBuilding,
          capacity: Number(roomCapacity),
          type: roomType,
          isAvailable: true,
        };
        addRoom(newRoom);
      }
    }
    setIsDrawerOpen(false);
  };

  // Filtered lists
  const filteredSubjects = subjects.filter(
    (s) =>
      s.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.teacherName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredTeachers = teachers.filter(
    (t) =>
      t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.employeeId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.department.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredSections = sections.filter(
    (s) =>
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.department.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredRooms = rooms.filter(
    (r) =>
      r.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.building.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Top Controls: Segmented tabs + Search + Prominent Demo Data + Add Drawer */}
      <div className="bg-white border border-[#E8E2D2] rounded-3xl p-5 shadow-soft flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Segmented Control */}
        <div className="flex items-center gap-1 bg-[#F3EFE4] p-1 rounded-2xl border border-[#E8E2D2] overflow-x-auto">
          {[
            { id: "subjects", label: "Subjects", count: subjects.length, icon: BookOpen },
            { id: "faculty", label: "Faculty", count: teachers.length, icon: Users },
            { id: "sections", label: "Sections", count: sections.length, icon: Layers },
            { id: "rooms", label: "Rooms", count: rooms.length, icon: Building },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id as SetupTab);
                  setSearchQuery("");
                }}
                className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all ${
                  isActive
                    ? "bg-white text-[#14201B] font-bold shadow-subtle border border-[#E8E2D2]"
                    : "text-[#5B6B63] hover:text-[#14201B]"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
                <span
                  className={`text-[10px] font-mono px-1.5 py-0.5 rounded-full ${
                    isActive ? "bg-[#D1FAE5] text-[#065F46]" : "bg-[#E8E2D2] text-[#5B6B63]"
                  }`}
                >
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Actions: Search bar, Load demo data, Add Button */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative flex-1 sm:w-60">
            <Search className="w-3.5 h-3.5 text-[#5B6B63] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder={`Search ${activeTab}...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 bg-[#FAF7F0] border border-[#E8E2D2] rounded-xl text-xs font-medium text-[#14201B] placeholder-[#5B6B63] focus-visible:ring-2 focus-visible:ring-[#10B981]"
            />
          </div>

          <button
            onClick={loadDemoData}
            className="px-3.5 py-1.5 bg-[#FAF7F0] hover:bg-[#F3EFE4] text-[#14201B] border border-[#E8E2D2] rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-subtle cursor-pointer"
            title="Load default realistic department dataset (FR-8)"
          >
            <Database className="w-3.5 h-3.5 text-[#10B981]" />
            <span>Load demo data</span>
          </button>

          <button
            onClick={handleOpenAdd}
            className="px-4 py-1.5 bg-[#10B981] hover:bg-[#059669] text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-sm transition-transform hover:scale-102 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add {activeTab.slice(0, -1)}</span>
          </button>
        </div>
      </div>

      {/* Main Data Tables with generous spacing and row hover */}
      <div className="bg-white border border-[#E8E2D2] rounded-3xl shadow-soft overflow-hidden">
        {activeTab === "subjects" && (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-[#E8E2D2] bg-[#FAF7F0] text-[#5B6B63] font-semibold">
                  <th className="py-3.5 px-6">Subject</th>
                  <th className="py-3.5 px-6">Type</th>
                  <th className="py-3.5 px-6">Sessions / Wk</th>
                  <th className="py-3.5 px-6">Assigned Faculty</th>
                  <th className="py-3.5 px-6">Target Section</th>
                  <th className="py-3.5 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E8E2D2]">
                {filteredSubjects.map((sub) => (
                  <tr
                    key={sub.id}
                    className="hover:bg-[#FAF7F0]/60 transition-colors group"
                  >
                    <td className="py-3.5 px-6">
                      <div className="flex items-center gap-3">
                        <span
                          className="w-3 h-3 rounded-full shrink-0 shadow-sm"
                          style={{ backgroundColor: sub.colorHex || "#BAE6FD" }}
                        />
                        <div>
                          <span className="font-mono font-bold text-[#14201B]">
                            {sub.code}
                          </span>
                          <span className="text-[#5B6B63] ml-2 font-medium">
                            {sub.name}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-6">
                      {sub.type === "lab" ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-mono font-bold text-[#5B21B6] bg-[#DDD6FE] px-2 py-0.5 rounded-full">
                          <FlaskConical className="w-3 h-3" />
                          Lab
                        </span>
                      ) : (
                        <span className="text-[11px] font-mono text-[#5B6B63] bg-[#F3EFE4] px-2 py-0.5 rounded-full">
                          Theory
                        </span>
                      )}
                    </td>
                    <td className="py-3.5 px-6 font-mono font-semibold text-[#14201B]">
                      {sub.sessionsPerWeek} hrs/wk ({sub.credits} cr)
                    </td>
                    <td className="py-3.5 px-6 font-medium text-[#14201B]">
                      {sub.teacherName}
                    </td>
                    <td className="py-3.5 px-6 font-mono text-[#5B6B63]">
                      {sub.sectionName}
                    </td>
                    <td className="py-3.5 px-6 text-right">
                      <div className="flex items-center justify-end gap-2 opacity-80 group-hover:opacity-100">
                        <button
                          onClick={() => handleOpenEdit(sub)}
                          className="p-1 text-[#5B6B63] hover:text-[#14201B] rounded-lg transition-colors"
                          title="Edit"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => deleteSubject(sub.id)}
                          className="p-1 text-[#5B6B63] hover:text-[#991B1B] rounded-lg transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === "faculty" && (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-[#E8E2D2] bg-[#FAF7F0] text-[#5B6B63] font-semibold">
                  <th className="py-3.5 px-6">Faculty Name</th>
                  <th className="py-3.5 px-6">Employee ID</th>
                  <th className="py-3.5 px-6">Department</th>
                  <th className="py-3.5 px-6">Email</th>
                  <th className="py-3.5 px-6">Max Load</th>
                  <th className="py-3.5 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E8E2D2]">
                {filteredTeachers.map((t) => (
                  <tr key={t.id} className="hover:bg-[#FAF7F0]/60 transition-colors group">
                    <td className="py-3.5 px-6 font-bold text-[#14201B]">{t.name}</td>
                    <td className="py-3.5 px-6 font-mono text-[#5B6B63]">{t.employeeId}</td>
                    <td className="py-3.5 px-6 text-[#5B6B63]">{t.department}</td>
                    <td className="py-3.5 px-6 font-mono text-[#5B6B63]">{t.email}</td>
                    <td className="py-3.5 px-6 font-mono font-bold text-[#065F46]">
                      {t.maxHoursPerWeek} hrs/wk
                    </td>
                    <td className="py-3.5 px-6 text-right">
                      <div className="flex items-center justify-end gap-2 opacity-80 group-hover:opacity-100">
                        <button
                          onClick={() => handleOpenEdit(t)}
                          className="p-1 text-[#5B6B63] hover:text-[#14201B] rounded-lg transition-colors"
                          title="Edit"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => deleteTeacher(t.id)}
                          className="p-1 text-[#5B6B63] hover:text-[#991B1B] rounded-lg transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === "sections" && (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-[#E8E2D2] bg-[#FAF7F0] text-[#5B6B63] font-semibold">
                  <th className="py-3.5 px-6">Section Name</th>
                  <th className="py-3.5 px-6">Department</th>
                  <th className="py-3.5 px-6">Semester</th>
                  <th className="py-3.5 px-6">Strength</th>
                  <th className="py-3.5 px-6">Batch</th>
                  <th className="py-3.5 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E8E2D2]">
                {filteredSections.map((sec) => (
                  <tr key={sec.id} className="hover:bg-[#FAF7F0]/60 transition-colors group">
                    <td className="py-3.5 px-6 font-bold text-[#14201B]">{sec.name}</td>
                    <td className="py-3.5 px-6 text-[#5B6B63]">{sec.department}</td>
                    <td className="py-3.5 px-6 font-mono text-[#5B6B63]">Sem {sec.semester}</td>
                    <td className="py-3.5 px-6 font-mono font-semibold text-[#14201B]">
                      {sec.studentCount} students
                    </td>
                    <td className="py-3.5 px-6 font-mono text-[#5B6B63]">{sec.batch}</td>
                    <td className="py-3.5 px-6 text-right">
                      <div className="flex items-center justify-end gap-2 opacity-80 group-hover:opacity-100">
                        <button
                          onClick={() => handleOpenEdit(sec)}
                          className="p-1 text-[#5B6B63] hover:text-[#14201B] rounded-lg transition-colors"
                          title="Edit"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => deleteSection(sec.id)}
                          className="p-1 text-[#5B6B63] hover:text-[#991B1B] rounded-lg transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === "rooms" && (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-[#E8E2D2] bg-[#FAF7F0] text-[#5B6B63] font-semibold">
                  <th className="py-3.5 px-6">Room Code</th>
                  <th className="py-3.5 px-6">Name</th>
                  <th className="py-3.5 px-6">Type</th>
                  <th className="py-3.5 px-6">Building</th>
                  <th className="py-3.5 px-6">Capacity</th>
                  <th className="py-3.5 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E8E2D2]">
                {filteredRooms.map((r) => (
                  <tr key={r.id} className="hover:bg-[#FAF7F0]/60 transition-colors group">
                    <td className="py-3.5 px-6 font-mono font-bold text-[#14201B]">{r.code}</td>
                    <td className="py-3.5 px-6 font-medium text-[#14201B]">{r.name}</td>
                    <td className="py-3.5 px-6">
                      <span
                        className={`text-[11px] font-mono px-2 py-0.5 rounded-full ${
                          r.type === "lab"
                            ? "bg-[#DDD6FE] text-[#5B21B6] font-bold"
                            : "bg-[#F3EFE4] text-[#5B6B63]"
                        }`}
                      >
                        {r.type.toUpperCase()}
                      </span>
                    </td>
                    <td className="py-3.5 px-6 text-[#5B6B63]">{r.building}</td>
                    <td className="py-3.5 px-6 font-mono font-bold text-[#14201B]">
                      {r.capacity} seats
                    </td>
                    <td className="py-3.5 px-6 text-right">
                      <div className="flex items-center justify-end gap-2 opacity-80 group-hover:opacity-100">
                        <button
                          onClick={() => handleOpenEdit(r)}
                          className="p-1 text-[#5B6B63] hover:text-[#14201B] rounded-lg transition-colors"
                          title="Edit"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => deleteRoom(r.id)}
                          className="p-1 text-[#5B6B63] hover:text-[#991B1B] rounded-lg transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Slide-Over Drawer for Entity Creation & Editing */}
      <SlideOverDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        title={editingItem ? `Edit ${activeTab.slice(0, -1)}` : `Add New ${activeTab.slice(0, -1)}`}
        description="Enter entity metadata. Timetable conflicts update reactively upon save."
      >
        <form onSubmit={handleFormSubmit} className="space-y-4 text-xs">
          {activeTab === "subjects" && (
            <>
              <div>
                <label className="font-semibold text-[#14201B] block mb-1">Subject Code *</label>
                <input
                  type="text"
                  placeholder="e.g. CS401"
                  value={subCode}
                  onChange={(e) => setSubCode(e.target.value)}
                  className="w-full bg-[#FAF7F0] border border-[#E8E2D2] rounded-xl px-3 py-2 text-[#14201B] font-mono font-bold"
                  required
                />
              </div>

              <div>
                <label className="font-semibold text-[#14201B] block mb-1">Subject Name *</label>
                <input
                  type="text"
                  placeholder="e.g. Design & Analysis of Algorithms"
                  value={subName}
                  onChange={(e) => setSubName(e.target.value)}
                  className="w-full bg-[#FAF7F0] border border-[#E8E2D2] rounded-xl px-3 py-2 text-[#14201B]"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-[#14201B] block mb-1">Course Type</label>
                  <select
                    value={subType}
                    onChange={(e) => setSubType(e.target.value as Subject["type"])}
                    className="w-full bg-[#FAF7F0] border border-[#E8E2D2] rounded-xl px-3 py-2 text-[#14201B]"
                  >
                    <option value="theory">Theory</option>
                    <option value="lab">Laboratory</option>
                    <option value="elective">Elective</option>
                  </select>
                </div>

                <div>
                  <label className="font-semibold text-[#14201B] block mb-1">Sessions / Week</label>
                  <input
                    type="number"
                    min={1}
                    max={6}
                    value={subSessions}
                    onChange={(e) => setSubSessions(Number(e.target.value))}
                    className="w-full bg-[#FAF7F0] border border-[#E8E2D2] rounded-xl px-3 py-2 text-[#14201B] font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold text-[#14201B] block mb-1">Assigned Faculty</label>
                <select
                  value={subTeacherId}
                  onChange={(e) => setSubTeacherId(e.target.value)}
                  className="w-full bg-[#FAF7F0] border border-[#E8E2D2] rounded-xl px-3 py-2 text-[#14201B]"
                >
                  {teachers.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.name} ({t.department})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="font-semibold text-[#14201B] block mb-1">Target Section</label>
                <select
                  value={subSectionId}
                  onChange={(e) => setSubSectionId(e.target.value)}
                  className="w-full bg-[#FAF7F0] border border-[#E8E2D2] rounded-xl px-3 py-2 text-[#14201B]"
                >
                  {sections.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.name} ({s.department})
                    </option>
                  ))}
                </select>
              </div>
            </>
          )}

          {activeTab === "faculty" && (
            <>
              <div>
                <label className="font-semibold text-[#14201B] block mb-1">Full Name *</label>
                <input
                  type="text"
                  placeholder="e.g. Dr. Rajesh Kumar"
                  value={teacherName}
                  onChange={(e) => setTeacherName(e.target.value)}
                  className="w-full bg-[#FAF7F0] border border-[#E8E2D2] rounded-xl px-3 py-2 text-[#14201B]"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-[#14201B] block mb-1">Employee ID</label>
                  <input
                    type="text"
                    placeholder="EMP-101"
                    value={teacherEmpId}
                    onChange={(e) => setTeacherEmpId(e.target.value)}
                    className="w-full bg-[#FAF7F0] border border-[#E8E2D2] rounded-xl px-3 py-2 text-[#14201B] font-mono"
                  />
                </div>
                <div>
                  <label className="font-semibold text-[#14201B] block mb-1">Department</label>
                  <input
                    type="text"
                    placeholder="CSE"
                    value={teacherDept}
                    onChange={(e) => setTeacherDept(e.target.value)}
                    className="w-full bg-[#FAF7F0] border border-[#E8E2D2] rounded-xl px-3 py-2 text-[#14201B]"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold text-[#14201B] block mb-1">Email</label>
                <input
                  type="email"
                  placeholder="name@univ.edu"
                  value={teacherEmail}
                  onChange={(e) => setTeacherEmail(e.target.value)}
                  className="w-full bg-[#FAF7F0] border border-[#E8E2D2] rounded-xl px-3 py-2 text-[#14201B] font-mono"
                />
              </div>

              <div>
                <label className="font-semibold text-[#14201B] block mb-1">Max Teaching Hours / Wk</label>
                <input
                  type="number"
                  min={4}
                  max={30}
                  value={teacherMaxHours}
                  onChange={(e) => setTeacherMaxHours(Number(e.target.value))}
                  className="w-full bg-[#FAF7F0] border border-[#E8E2D2] rounded-xl px-3 py-2 text-[#14201B] font-mono"
                />
              </div>
            </>
          )}

          {activeTab === "sections" && (
            <>
              <div>
                <label className="font-semibold text-[#14201B] block mb-1">Section Name *</label>
                <input
                  type="text"
                  placeholder="e.g. CSE-4A"
                  value={sectionName}
                  onChange={(e) => setSectionName(e.target.value)}
                  className="w-full bg-[#FAF7F0] border border-[#E8E2D2] rounded-xl px-3 py-2 text-[#14201B] font-bold"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-[#14201B] block mb-1">Semester</label>
                  <input
                    type="number"
                    min={1}
                    max={8}
                    value={sectionSemester}
                    onChange={(e) => setSectionSemester(Number(e.target.value))}
                    className="w-full bg-[#FAF7F0] border border-[#E8E2D2] rounded-xl px-3 py-2 text-[#14201B] font-mono"
                  />
                </div>
                <div>
                  <label className="font-semibold text-[#14201B] block mb-1">Student Strength</label>
                  <input
                    type="number"
                    min={10}
                    max={250}
                    value={sectionStudents}
                    onChange={(e) => setSectionStudents(Number(e.target.value))}
                    className="w-full bg-[#FAF7F0] border border-[#E8E2D2] rounded-xl px-3 py-2 text-[#14201B] font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold text-[#14201B] block mb-1">Department</label>
                <input
                  type="text"
                  value={sectionDept}
                  onChange={(e) => setSectionDept(e.target.value)}
                  className="w-full bg-[#FAF7F0] border border-[#E8E2D2] rounded-xl px-3 py-2 text-[#14201B]"
                />
              </div>
            </>
          )}

          {activeTab === "rooms" && (
            <>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-[#14201B] block mb-1">Room Code *</label>
                  <input
                    type="text"
                    placeholder="e.g. LH-101"
                    value={roomCode}
                    onChange={(e) => setRoomCode(e.target.value)}
                    className="w-full bg-[#FAF7F0] border border-[#E8E2D2] rounded-xl px-3 py-2 text-[#14201B] font-mono font-bold"
                    required
                  />
                </div>
                <div>
                  <label className="font-semibold text-[#14201B] block mb-1">Type</label>
                  <select
                    value={roomType}
                    onChange={(e) => setRoomType(e.target.value as Room["type"])}
                    className="w-full bg-[#FAF7F0] border border-[#E8E2D2] rounded-xl px-3 py-2 text-[#14201B]"
                  >
                    <option value="classroom">Classroom</option>
                    <option value="lab">Laboratory</option>
                    <option value="auditorium">Auditorium</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-semibold text-[#14201B] block mb-1">Room Name</label>
                <input
                  type="text"
                  placeholder="e.g. Lecture Hall 101"
                  value={roomName}
                  onChange={(e) => setRoomName(e.target.value)}
                  className="w-full bg-[#FAF7F0] border border-[#E8E2D2] rounded-xl px-3 py-2 text-[#14201B]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-[#14201B] block mb-1">Capacity (Seats)</label>
                  <input
                    type="number"
                    min={10}
                    max={500}
                    value={roomCapacity}
                    onChange={(e) => setRoomCapacity(Number(e.target.value))}
                    className="w-full bg-[#FAF7F0] border border-[#E8E2D2] rounded-xl px-3 py-2 text-[#14201B] font-mono"
                  />
                </div>
                <div>
                  <label className="font-semibold text-[#14201B] block mb-1">Building</label>
                  <input
                    type="text"
                    value={roomBuilding}
                    onChange={(e) => setRoomBuilding(e.target.value)}
                    className="w-full bg-[#FAF7F0] border border-[#E8E2D2] rounded-xl px-3 py-2 text-[#14201B]"
                  />
                </div>
              </div>
            </>
          )}

          <div className="pt-4 border-t border-[#E8E2D2] flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setIsDrawerOpen(false)}
              className="px-4 py-2 rounded-xl border border-[#E8E2D2] text-[#5B6B63] hover:text-[#14201B] font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-[#10B981] hover:bg-[#059669] text-white rounded-xl font-semibold shadow-sm"
            >
              {editingItem ? "Save Changes" : "Create Entity"}
            </button>
          </div>
        </form>
      </SlideOverDrawer>
    </div>
  );
};
