export type SubjectType = "theory" | "lab" | "elective" | "seminar";
export type RoomType = "classroom" | "lab" | "auditorium" | "seminar_hall";
export type ConflictType = "teacher_overlap" | "room_overlap" | "section_overlap" | "capacity_exceeded" | "lab_requirement" | "soft_preference";

export interface Subject {
  id: string;
  code: string;
  name: string;
  shortName: string;
  type: SubjectType;
  credits: number;
  theoryHours: number;
  labHours: number;
  totalHoursPerWeek: number;
  sessionsPerWeek: number;
  teacherId: string;
  teacherName: string;
  requiredRoomType: RoomType;
  sectionId: string;
  sectionName: string;
  colorHex?: string;
}

export interface Teacher {
  id: string;
  employeeId: string;
  name: string;
  department: string;
  email: string;
  maxHoursPerWeek: number;
  currentWorkloadHours: number;
  unavailableSlots: { day: string; period: number }[];
  preferredSlots: { day: string; period: number }[];
}

export interface Room {
  id: string;
  code: string;
  name: string;
  building: string;
  capacity: number;
  type: RoomType;
  isAvailable: boolean;
}

export interface Section {
  id: string;
  name: string;
  department: string;
  semester: number;
  academicYear: string;
  studentCount: number;
  batch: string;
}

export interface TimeSlot {
  id: string;
  day: string; // "Monday", "Tuesday", etc.
  periodNumber: number; // 1, 2, 3, 4, 5, 6, 7
  startTime: string; // "09:00"
  endTime: string; // "10:00"
  isBreak?: boolean;
  isLunch?: boolean;
}

export interface HardConstraint {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
}

export interface SoftConstraint {
  id: string;
  name: string;
  description: string;
  weight: number; // 1 to 10
  enabled: boolean;
}

export interface ScheduledCell {
  id: string;
  day: string;
  period: number;
  subjectId: string;
  subjectCode: string;
  subjectName: string;
  teacherId: string;
  teacherName: string;
  roomId: string;
  roomCode: string;
  sectionId: string;
  sectionName: string;
  colorHex: string;
  isLab: boolean;
}

export interface ConflictItem {
  id: string;
  type: "hard" | "soft";
  category: ConflictType;
  severity: "critical" | "warning" | "info";
  description: string;
  affectedDay: string;
  affectedPeriod: number;
  entitiesInvolved: string[];
}

export interface GraphNode {
  id: string;
  label: string;
  subjectCode: string;
  teacherName: string;
  sectionName: string;
  degree: number;
  colorId?: number;
  colorHex?: string;
  x?: number;
  y?: number;
}

export interface GraphEdge {
  id: string;
  source: string;
  target: string;
  conflictType: string;
}

export interface TimetableGenerationResult {
  success: boolean;
  chromaticNumber: number;
  totalVertices: number;
  totalEdges: number;
  generationTimeMs: number;
  hardConflictsCount: number;
  softViolationsCount: number;
  qualityScore: number;
  cells: ScheduledCell[];
  conflicts: ConflictItem[];
  nodes: GraphNode[];
  edges: GraphEdge[];
}
