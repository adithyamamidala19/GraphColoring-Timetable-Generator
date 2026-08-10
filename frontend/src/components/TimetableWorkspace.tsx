import React, { useState } from "react";
import { LandingPage } from "./LandingPage";
import { TimetableGridView } from "./TimetableGridView";
import { GraphColoringVisualizer } from "./GraphColoringVisualizer";
import { SubjectManager } from "./SubjectManager";
import { TeacherManager } from "./TeacherManager";
import { SectionManager } from "./SectionManager";
import { RoomManager } from "./RoomManager";
import { ConflictCenter } from "./ConflictCenter";
import { AnalyticsView } from "./AnalyticsView";
import {
  initialSubjects,
  initialTeachers,
  initialRooms,
  initialSections,
  runGraphColoringAlgorithm,
} from "@/services/api";
import { Subject, Teacher, Room, Section, TimetableGenerationResult } from "@/types/timetable";
import {
  Calendar,
  Cpu,
  BookOpen,
  Users,
  Building,
  Layers,
  ShieldCheck,
  Sparkles,
  Home,
  BarChart3,
} from "lucide-react";

export const TimetableWorkspace: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("landing");

  // Dynamic Workspace State
  const [subjects, setSubjects] = useState<Subject[]>(initialSubjects);
  const [teachers, setTeachers] = useState<Teacher[]>(initialTeachers);
  const [rooms, setRooms] = useState<Room[]>(initialRooms);
  const [sections, setSections] = useState<Section[]>(initialSections);

  // Solved Result State
  const [solveResult, setSolveResult] = useState<TimetableGenerationResult>(() =>
    runGraphColoringAlgorithm(initialSubjects, initialTeachers, initialRooms, initialSections)
  );

  const handleRunSolver = () => {
    const res = runGraphColoringAlgorithm(subjects, teachers, rooms, sections);
    setSolveResult(res);
  };

  // Subjects
  const handleAddSubject = (newSub: Subject) => {
    const updated = [...subjects, newSub];
    setSubjects(updated);
    setSolveResult(runGraphColoringAlgorithm(updated, teachers, rooms, sections));
  };

  const handleDeleteSubject = (id: string) => {
    const updated = subjects.filter((s) => s.id !== id);
    setSubjects(updated);
    setSolveResult(runGraphColoringAlgorithm(updated, teachers, rooms, sections));
  };

  // Teachers
  const handleAddTeacher = (newTeacher: Teacher) => {
    const updated = [...teachers, newTeacher];
    setTeachers(updated);
    setSolveResult(runGraphColoringAlgorithm(subjects, updated, rooms, sections));
  };

  const handleDeleteTeacher = (id: string) => {
    const updated = teachers.filter((t) => t.id !== id);
    setTeachers(updated);
    setSolveResult(runGraphColoringAlgorithm(subjects, updated, rooms, sections));
  };

  // Sections
  const handleAddSection = (newSec: Section) => {
    const updated = [...sections, newSec];
    setSections(updated);
    setSolveResult(runGraphColoringAlgorithm(subjects, teachers, rooms, updated));
  };

  const handleDeleteSection = (id: string) => {
    const updated = sections.filter((s) => s.id !== id);
    setSections(updated);
    setSolveResult(runGraphColoringAlgorithm(subjects, teachers, rooms, updated));
  };

  // Rooms
  const handleAddRoom = (newRoom: Room) => {
    const updated = [...rooms, newRoom];
    setRooms(updated);
    setSolveResult(runGraphColoringAlgorithm(subjects, teachers, updated, sections));
  };

  const handleDeleteRoom = (id: string) => {
    const updated = rooms.filter((r) => r.id !== id);
    setRooms(updated);
    setSolveResult(runGraphColoringAlgorithm(subjects, teachers, updated, sections));
  };

  return (
    <div className="min-h-screen bg-black text-foreground flex flex-col font-sans antialiased">
      {/* Top Navbar */}
      <header className="sticky top-0 z-50 bg-black/90 backdrop-blur-xl border-b border-white/10 px-6 py-3.5 flex items-center justify-between shadow-2xl">
        <div className="flex items-center gap-3.5 cursor-pointer" onClick={() => setActiveTab("landing")}>
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center text-black font-black text-xl shadow-lg shadow-emerald-500/20">
            A
          </div>
          <div>
            <div className="font-black text-lg tracking-tight text-white flex items-center gap-2">
              AutoSched AI
              <span className="text-[10px] font-black uppercase bg-emerald-500/10 text-emerald-400 px-2.5 py-0.5 rounded-full border border-emerald-500/30">
                v2.0
              </span>
            </div>
            <div className="text-[11px] text-zinc-400 font-medium">
              Graph Coloring Academic Timetable Engine
            </div>
          </div>
        </div>

        {/* Unified Top Navigation */}
        <nav className="hidden lg:flex items-center gap-1 bg-zinc-900/90 p-1.5 rounded-2xl border border-white/10 text-xs font-bold shadow-inner">
          <button
            onClick={() => setActiveTab("landing")}
            className={`px-3 py-2 rounded-xl flex items-center gap-1.5 transition-all ${
              activeTab === "landing" ? "bg-emerald-500 text-black font-extrabold shadow-lg" : "text-zinc-400 hover:text-white"
            }`}
          >
            <Home className="w-3.5 h-3.5" />
            Home
          </button>

          <button
            onClick={() => setActiveTab("timetable")}
            className={`px-3 py-2 rounded-xl flex items-center gap-1.5 transition-all ${
              activeTab === "timetable" ? "bg-emerald-500 text-black font-extrabold shadow-lg" : "text-zinc-400 hover:text-white"
            }`}
          >
            <Calendar className="w-3.5 h-3.5" />
            Grid
          </button>

          <button
            onClick={() => setActiveTab("graph")}
            className={`px-3 py-2 rounded-xl flex items-center gap-1.5 transition-all ${
              activeTab === "graph" ? "bg-emerald-500 text-black font-extrabold shadow-lg" : "text-zinc-400 hover:text-white"
            }`}
          >
            <Cpu className="w-3.5 h-3.5" />
            Graph Theory
          </button>

          <button
            onClick={() => setActiveTab("subjects")}
            className={`px-3 py-2 rounded-xl flex items-center gap-1.5 transition-all ${
              activeTab === "subjects" ? "bg-emerald-500 text-black font-extrabold shadow-lg" : "text-zinc-400 hover:text-white"
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            Subjects
          </button>

          <button
            onClick={() => setActiveTab("teachers")}
            className={`px-3 py-2 rounded-xl flex items-center gap-1.5 transition-all ${
              activeTab === "teachers" ? "bg-emerald-500 text-black font-extrabold shadow-lg" : "text-zinc-400 hover:text-white"
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            Faculty
          </button>

          <button
            onClick={() => setActiveTab("sections")}
            className={`px-3 py-2 rounded-xl flex items-center gap-1.5 transition-all ${
              activeTab === "sections" ? "bg-emerald-500 text-black font-extrabold shadow-lg" : "text-zinc-400 hover:text-white"
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            Sections
          </button>

          <button
            onClick={() => setActiveTab("rooms")}
            className={`px-3 py-2 rounded-xl flex items-center gap-1.5 transition-all ${
              activeTab === "rooms" ? "bg-emerald-500 text-black font-extrabold shadow-lg" : "text-zinc-400 hover:text-white"
            }`}
          >
            <Building className="w-3.5 h-3.5" />
            Rooms
          </button>

          <button
            onClick={() => setActiveTab("conflicts")}
            className={`px-3 py-2 rounded-xl flex items-center gap-1.5 transition-all ${
              activeTab === "conflicts" ? "bg-emerald-500 text-black font-extrabold shadow-lg" : "text-zinc-400 hover:text-white"
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            Conflicts
          </button>

          <button
            onClick={() => setActiveTab("analytics")}
            className={`px-3 py-2 rounded-xl flex items-center gap-1.5 transition-all ${
              activeTab === "analytics" ? "bg-emerald-500 text-black font-extrabold shadow-lg" : "text-zinc-400 hover:text-white"
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5" />
            Analytics
          </button>
        </nav>

        {/* Generate Primary Button */}
        <div className="flex items-center gap-3">
          <button
            onClick={handleRunSolver}
            className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-black font-black rounded-2xl text-xs flex items-center gap-2 shadow-lg shadow-emerald-500/20 transition-all hover:scale-105 active:scale-95"
          >
            <Sparkles className="w-4 h-4 text-black animate-spin" />
            Generate Timetable
          </button>
        </div>
      </header>

      {/* Main Body View Selection */}
      <main className="flex-1 container max-w-7xl mx-auto p-6 space-y-8">
        {activeTab === "landing" && (
          <LandingPage
            onEnterWorkspace={() => setActiveTab("timetable")}
            sampleNodes={solveResult.nodes}
            sampleEdges={solveResult.edges}
            chromaticNumber={solveResult.chromaticNumber}
          />
        )}

        {activeTab === "timetable" && (
          <TimetableGridView
            cells={solveResult.cells}
            sections={sections}
            teachers={teachers}
            rooms={rooms}
          />
        )}

        {activeTab === "graph" && (
          <GraphColoringVisualizer
            nodes={solveResult.nodes}
            edges={solveResult.edges}
            chromaticNumber={solveResult.chromaticNumber}
            onSolveAgain={handleRunSolver}
          />
        )}

        {activeTab === "subjects" && (
          <SubjectManager
            subjects={subjects}
            teachers={teachers}
            sections={sections}
            onAddSubject={handleAddSubject}
            onDeleteSubject={handleDeleteSubject}
          />
        )}

        {activeTab === "teachers" && (
          <TeacherManager
            teachers={teachers}
            onAddTeacher={handleAddTeacher}
            onDeleteTeacher={handleDeleteTeacher}
          />
        )}

        {activeTab === "sections" && (
          <SectionManager
            sections={sections}
            onAddSection={handleAddSection}
            onDeleteSection={handleDeleteSection}
          />
        )}

        {activeTab === "rooms" && (
          <RoomManager
            rooms={rooms}
            onAddRoom={handleAddRoom}
            onDeleteRoom={handleDeleteRoom}
          />
        )}

        {activeTab === "conflicts" && (
          <ConflictCenter
            conflicts={solveResult.conflicts}
            hardConflictsCount={solveResult.hardConflictsCount}
            softViolationsCount={solveResult.softViolationsCount}
            qualityScore={solveResult.qualityScore}
            onRunAutoFix={handleRunSolver}
          />
        )}

        {activeTab === "analytics" && (
          <AnalyticsView
            teachers={teachers}
            rooms={rooms}
            subjects={subjects}
          />
        )}
      </main>
    </div>
  );
};
