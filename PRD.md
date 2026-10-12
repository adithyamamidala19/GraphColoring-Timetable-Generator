# Product Requirements Document (PRD)

## AutoSched AI — Automated Academic Timetable Generator
**A DAA Capstone Project: Graph Coloring (DSatur) Constraint Optimization Engine**

---

### Document Control & Metadata

| Attribute | Specification |
| :--- | :--- |
| **Document Title** | Product Requirements Document (PRD) — AutoSched AI |
| **Version** | 2.1.0 |
| **Document Status** | Approved / Living Specification |
| **Owner / Author** | Adithya Mamidala |
| **Academic Domain** | Design & Analysis of Algorithms (DAA) / Graph Theory |
| **Target Platform** | Full-Stack Web Application (Unified Desktop & Tablet Interface) |
| **Primary Stack** | React 19 (TypeScript), Tailwind CSS, Python 3.11+ FastAPI, NetworkX DSatur |
| **Last Updated** | 2026-10-12 |

---

## 1. Executive Summary & Problem Statement

### 1.1 Problem Statement
Academic timetabling in colleges and universities is an **NP-complete combinatorial optimization problem**. The traditional manual or spreadsheet-driven scheduling process suffers from severe systemic vulnerabilities:
- **Collisions & Overlaps**: Faculty members double-booked across classes or sections assigned simultaneously.
- **Resource Wastage**: High-capacity lecture halls assigned to small seminar groups, or specialized hardware laboratories underutilized or bottlenecked.
- **Exhaustive Iterations**: Manually resolving scheduling conflicts across dozens of departments and hundreds of subject hours takes administrative committees multiple weeks.
- **Lack of Transparency**: Inability to explain *why* a particular slot was assigned or provide mathematical guarantees of zero hard-constraint violations.

### 1.2 Proposed Solution
**AutoSched AI** models the academic timetable ecosystem as an **Undirected Graph Vertex Coloring Problem** $G = (V, E)$:
- **Vertices ($V$)**: Individual weekly class/lab sessions.
- **Edges ($E$)**: Pairwise scheduling conflicts (shared faculty, shared student section, shared laboratory).
- **Colors ($\mathcal{C}$)**: Distinct academic time slots across the working week.

Using the **DSatur (Degree of Saturation)** heuristic alongside secondary constraint filters, the platform deterministically assigns valid time slots and classrooms with a **mathematical guarantee of zero hard-constraint violations**, computing complete multi-section timetables in under **50 milliseconds**.

---

## 2. Product Vision, Goals & Success Metrics

### 2.1 Product Vision
To provide an end-to-end, single-workspace web platform that automates timetable generation from raw institution data, interactively visualizes the graph coloring algorithm in real-time, surfaces resource utilization analytics, and exports publication-ready schedules.

### 2.2 Core Goals
1. **Zero Hard Collisions**: Never allow teacher overlap, section overlap, or room double-booking.
2. **Deterministic & Fast Solver**: Solve 100+ session instances in under 50ms with optimal or near-optimal chromatic number $\chi(G)$.
3. **Interactive DAA Education**: Provide real-time SVG visualizers illustrating dynamic vertex saturation and edge tensions during chromatic allocation.
4. **Unified Workspace Experience**: Single cohesive interface encompassing landing page, entity management, generator, multi-view timetable matrix, conflict center, analytics, and PDF export.

### 2.3 Non-Goals
- Multi-tenant cloud SaaS with billing/subscriptions (this is an academic/institutional deployment).
- Separate siloed portals for students/faculty/admins (AutoSched intentionally provides **one unified administrative workspace**).
- Automated live facial-recognition student attendance tracking.

### 2.4 Key Performance Indicators (KPIs) & Success Metrics
- **Hard Conflicts**: Strictly **0** in any accepted timetable.
- **Solving Latency**: $< 100\text{ ms}$ for typical department loads (30–150 sessions).
- **Chromatic Efficiency**: $\chi_{\text{actual}}(G) \le \Delta(G) + 1$ (complying with Brooks' Theorem).
- **Export Fidelity**: 100% compliant PDF vector tables formatted for standard A4 landscape publication.

---

## 3. User Personas & User Journeys

### 3.1 Personas
1. **Academic Dean / Department Head (HoD)**: Needs to ensure faculty teaching loads adhere to institutional guidelines and departmental sections have balanced daily hours.
2. **Timetable Coordinator**: Inputs academic course structures, faculty rosters, room capacities, and generates/edits the schedule.
3. **DAA Course Instructor / Viva Judge**: Evaluates algorithmic correctness, time/space complexity, graph construction logic, and edge-conflict guarantees.

### 3.2 End-to-End User Journey
```
┌────────────────────────────────────────────────────────┐
│ 1. Landing Page: Discover Concept & DAA Theory         │
└──────────────────────────┬─────────────────────────────┘
                           ▼
┌────────────────────────────────────────────────────────┐
│ 2. Seed Data / Custom Input: Faculty, Rooms, Sections  │
└──────────────────────────┬─────────────────────────────┘
                           ▼
┌────────────────────────────────────────────────────────┐
│ 3. One-Click DSatur Engine Run (< 50ms)                │
└──────────────────────────┬─────────────────────────────┘
                           ▼
┌────────────────────────────────────────────────────────┐
│ 4. Graph Visualizer: Inspect Saturation & Chromatics   │
└──────────────────────────┬─────────────────────────────┘
                           ▼
┌────────────────────────────────────────────────────────┐
│ 5. Multi-View Matrix: Section / Teacher / Room / Day   │
└──────────────────────────┬─────────────────────────────┘
                           ▼
┌────────────────────────────────────────────────────────┐
│ 6. Validation & Export: jsPDF Landscape Matrix Export  │
└────────────────────────────────────────────────────────┘
```

---

## 4. System Architecture & Tech Stack

### 4.1 Topology Diagram
```
┌─────────────────────────────────────────────────────────────────┐
│                       Client-Side UI                            │
│           React 19 + TypeScript 5.7 + Vite + Tailwind CSS       │
│  - Interactive SVG Conflict Graph Visualizer                    │
│  - Multi-Dimensional Timetable Matrix Grid                      │
│  - Entity Managers (Teachers, Rooms, Sections, Subjects)        │
│  - Client-Side Fallback Solver & jsPDF Table Generator          │
└────────────────────────────────┬────────────────────────────────┘
                                 │ HTTP POST /api/generate
                                 │ (JSON Payload)
                                 ▼
┌─────────────────────────────────────────────────────────────────┐
│                    FastAPI Microservice (Python 3.11+)          │
│  - CORS Middleware & Pydantic Request/Response Validation       │
│  - Health & Metrics API Endpoints                               │
└────────────────────────────────┬────────────────────────────────┘
                                 │
                                 ▼
┌─────────────────────────────────────────────────────────────────┐
│               DSatur Graph Coloring Engine                      │
│  - NetworkX Undirected Conflict Graph Builder                   │
│  - Degree of Saturation (DSatur) Heuristic Execution            │
│  - Room Allocation & Time Slot Permutation                      │
│  - Conflict Detector & Quality Score Evaluator                  │
└─────────────────────────────────────────────────────────────────┘
```

### 4.2 Tech Stack Selection Justification
- **Frontend**: React 19 + TypeScript provides type-safe reactive state management with sub-millisecond DOM reconciliation for animated graph nodes.
- **Styling**: Tailwind CSS with custom Cyber Emerald (`#10b981`) theme, glassmorphism, and Google Fonts (`Neuton` serif & `Caveat` handwriting script).
- **Backend API**: Python FastAPI for high-throughput asynchronous execution and clean OpenAPI documentation.
- **Graph Processing**: NetworkX leveraging deterministic heuristic implementations of greedy vertex saturation algorithms.
- **Document Generation**: `jspdf` & `jspdf-autotable` for pixel-perfect, client-side vector PDF generation without backend rendering dependencies.

---

## 5. Mathematical & Algorithmic Formulation

### 5.1 Graph Mapping Formulation
Let the scheduling problem be an undirected graph $G = (V, E)$:

$$\begin{aligned}
V &= \{v_{s, i} \mid s \in \text{Subjects}, 1 \le i \le \text{SessionsPerWeek}(s)\} \\
E &= \{(u, v) \mid \text{Conflict}(u, v) = \text{True}\} \\
\mathcal{C} &= \{1, 2, \dots, k\} \iff \text{Set of Weekly Time Slots } (T_1, T_2, \dots, T_k)
\end{aligned}$$

### 5.2 Conflict Criteria (Edge Formation)
An undirected edge $(u, v) \in E$ is drawn between session $u$ and session $v$ if and only if any of the following hard mutual exclusion criteria are satisfied:
1. **Section Overlap**: $\text{Section}(u) = \text{Section}(v)$ (A student section cannot attend two classes at the same time).
2. **Faculty Overlap**: $\text{Teacher}(u) = \text{Teacher}(v)$ (A faculty member cannot teach two classes simultaneously).
3. **Exclusive Room Overlap**: Both sessions require the exact same designated physical laboratory space.

### 5.3 DSatur (Degree of Saturation) Algorithm
DSatur dynamically prioritizes nodes with the least remaining color choices (most constrained first):
1. **Saturation Calculation**: For each uncolored vertex $v \in V$, compute $\text{sat}(v)$, defined as the number of distinct colors assigned to vertices adjacent to $v$.
2. **Selection Rule**:
   $$\text{Pick } v^* = \arg\max_{v \in V_{\text{uncolored}}} \left( \text{sat}(v), \text{deg}(v) \right)$$
   Ties in saturation degree are broken by static node degree $\text{deg}(v)$.
3. **Color Assignment**:
   $$c(v^*) = \min \{ c \in \mathbb{N}^+ \mid \forall u \in \text{Adj}(v^*), c(u) \ne c \}$$
4. **Update & Repeat**: Recompute saturation of all uncolored neighbors of $v^*$ and repeat until $V_{\text{uncolored}} = \emptyset$.

### 5.4 Theoretical Bounds
- **Brooks' Theorem**: For any connected graph $G$ that is neither complete nor an odd cycle:
  $$\chi(G) \le \Delta(G)$$
- **Upper Bound**: $\chi(G) \le \Delta(G) + 1$, guaranteeing that the required time slots never exceed the maximum conflict degree plus one.

---

## 6. Functional Requirements (FR)

### FR-1: Academic Entity Management
- **FR-1.1**: The system must provide full CRUD operations for:
  - **Faculty**: ID, Name, Department, Max Classes/Day, Preferred Time Slots.
  - **Sections**: ID, Section Name (e.g., CSE-4A), Strength, Academic Year.
  - **Subjects**: ID, Code (e.g., CS401), Title, Assigned Faculty, Target Section, Type (Theory / Lab), Weekly Hours.
  - **Rooms**: ID, Room Code (e.g., LH-101), Capacity, Room Type (Classroom / Lab).
- **FR-1.2**: Changes made in entity managers must instantly persist into local reactive workspace state.

### FR-2: Conflict Graph Construction & Solving
- **FR-2.1**: Transform subject session quotas into discrete vertex instances.
- **FR-2.2**: Build conflict adjacency matrix based on teacher, section, and room constraints.
- **FR-2.3**: Execute DSatur vertex coloring to determine optimal chromatic number and slot index.
- **FR-2.4**: Map chromatic indices onto 5-day $\times$ 6-period weekly time slots (Monday through Friday, Periods 1 to 6).
- **FR-2.5**: Match colored sessions to eligible classrooms based on capacity ($\text{Capacity} \ge \text{Strength}$) and room type compatibility ($\text{Subject Type} = \text{Lab} \implies \text{Room Type} = \text{Lab}$).

### FR-3: Timetable Matrix Display
- **FR-3.1**: Display schedules in a responsive 5-day grid with clear period headers.
- **FR-3.2**: Support multi-dimensional filtering:
  - Filter by Section (e.g., CSE-4A, CSE-4B)
  - Filter by Faculty Member
  - Filter by Room
  - Filter by Day of the Week
- **FR-3.3**: Timetable cells must display Subject Code, Subject Name, Faculty Name, Room Code, and Lab status badge with distinctive color coding.

### FR-4: Interactive Graph Coloring Visualizer
- **FR-4.1**: Render an SVG-based interactive force/spring-directed conflict graph.
- **FR-4.2**: Display nodes with visual labels, saturation degree, static degree, and assigned chromatic color.
- **FR-4.3**: Show animated energy flow along conflict edges to demonstrate mutual exclusion.
- **FR-4.4**: Provide step-by-step playback controls (Play, Pause, Step Next, Reset) to observe the DSatur coloring order.

### FR-5: Conflict Center & Integrity Verification
- **FR-5.1**: Independently audit generated timetables against all hard constraints.
- **FR-5.2**: Highlight any violations with severity flags (Critical, Warning, Informational).
- **FR-5.3**: Provide an **Auto Resolve** mechanism that recalculates alternative collision-free slots if manual changes introduce conflicts.

### FR-6: Analytics & Institutional Intelligence
- **FR-6.1**: Real-time KPI summary:
  - Chromatic Number $\chi(G)$
  - Total Vertices & Edges
  - Solver Execution Latency (ms)
  - Timetable Quality Score (0–100%)
  - Room Utilization Rate (%)
  - Faculty Workload Distribution

### FR-7: Publication-Ready Export
- **FR-7.1**: One-click PDF generation via `jsPDF` + `jspdf-autotable`.
- **FR-7.2**: Formatted in A4 landscape with institutional header, metadata, section name, and distinct period grids.
- **FR-7.3**: CSV data export for spreadsheet compatibility.

### FR-8: Seed & Demo Workflow
- **FR-8.1**: One-click "Load Demo Dataset" pre-populating realistic departmental data (Computer Science & Engineering: 4 sections, 8 faculty, 12 courses, 6 lecture halls/labs).
- **FR-8.2**: Enables zero-configuration demonstration for academic reviews and vivas.

---

## 7. Constraint Hierarchy Matrix

### 7.1 Hard Constraints (Zero Violation Tolerance)
| ID | Constraint Name | Mathematical Rule | Violation Action |
| :--- | :--- | :--- | :--- |
| **HC-1** | Teacher Clash | $\forall t \in T, \sum \text{Sessions}(t, \text{day}, \text{period}) \le 1$ | Prohibit generation / Color adjacent |
| **HC-2** | Section Clash | $\forall s \in S, \sum \text{Sessions}(s, \text{day}, \text{period}) \le 1$ | Prohibit generation / Color adjacent |
| **HC-3** | Room Overlap | $\forall r \in R, \sum \text{Sessions}(r, \text{day}, \text{period}) \le 1$ | Reject room assignment |
| **HC-4** | Room Capacity | $\text{Room.Capacity} \ge \text{Section.Strength}$ | Reassign to larger room |
| **HC-5** | Lab Compatibility | $\text{Subject.Type} = \text{Lab} \implies \text{Room.Type} = \text{Lab}$ | Restrict room candidates to Labs |

### 7.2 Soft Constraints (Optimized via Penalty Weighting)
| ID | Constraint Name | Goal / Objective | Weight Penalty |
| :--- | :--- | :--- | :--- |
| **SC-1** | Faculty Idle Gaps | Minimize non-teaching gap hours between faculty lectures | $-5$ points per gap |
| **SC-2** | Subject Spread | Distribute sessions of a subject evenly across the 5 days | $-8$ points per clustering |
| **SC-3** | Daily Workload Balance | Prevent sections from having $> 5$ continuous lecture hours | $-6$ points per overload |
| **SC-4** | Preferred Time Slots | Prioritize faculty morning/afternoon preference windows | $-3$ points per deviation |

$$\text{Quality Score} = 100 - \sum (\text{Soft Violations} \times \text{Weight})$$

---

## 8. Non-Functional Requirements (NFR)

### 8.1 Performance
- Solver execution time must not exceed **100ms** for up to 200 class sessions.
- Client-side graph visualizer must maintain a stable **60 FPS** during SVG node-link rendering.

### 8.2 Reliability & Fault Tolerance
- **Hybrid Solver Fallback**: If the backend FastAPI microservice is offline or unreachable, the frontend seamlessly engages an embedded in-browser TypeScript DSatur solver engine so users experience zero downtime.

### 8.3 User Experience & Aesthetics
- High-contrast **Cyber Emerald Dark Theme** (`#090d16` background, `#10b981` primary emerald accents, `#3b82f6` cyan highlights).
- Typographic hierarchy using Google Fonts: **Neuton** (high-authority editorial serif) and **Caveat** (expressive cursive notes).

### 8.4 Security & Data Privacy
- Client-side processing with zero third-party telemetry tracking.
- Backend request bodies sanitized using Pydantic schemas.

---

## 9. API Specifications & Data Contracts

### 9.1 Root & Health Check
- `GET /` $\implies$ Returns microservice status and algorithm signature.
- `GET /api/health` $\implies$ Returns active solver state and node metrics.

### 9.2 Generation Endpoint
- **URL**: `POST /api/generate`
- **Request Body**:
```json
{
  "subjects": [
    {
      "id": "sub-101",
      "code": "CS401",
      "name": "Design & Analysis of Algorithms",
      "teacherId": "t-1",
      "teacherName": "Dr. Alan Turing",
      "sectionId": "sec-1",
      "sectionName": "CSE-4A",
      "type": "theory",
      "sessionsPerWeek": 3
    }
  ],
  "teachers": [
    { "id": "t-1", "name": "Dr. Alan Turing", "department": "CSE" }
  ],
  "rooms": [
    { "id": "r-1", "code": "LH-101", "capacity": 70, "type": "classroom" }
  ],
  "sections": [
    { "id": "sec-1", "name": "CSE-4A", "strength": 60 }
  ]
}
```

- **Response Body**:
```json
{
  "success": true,
  "chromaticNumber": 5,
  "totalVertices": 24,
  "totalEdges": 48,
  "generationTimeMs": 14.8,
  "hardConflictsCount": 0,
  "softViolationsCount": 1,
  "qualityScore": 98.5,
  "cells": [
    {
      "id": "cell-v-sub-101-1",
      "day": "Monday",
      "period": 1,
      "subjectId": "sub-101",
      "subjectCode": "CS401",
      "subjectName": "Design & Analysis of Algorithms",
      "teacherId": "t-1",
      "teacherName": "Dr. Alan Turing",
      "roomId": "r-1",
      "roomCode": "LH-101",
      "sectionId": "sec-1",
      "sectionName": "CSE-4A",
      "colorHex": "#3b82f6",
      "isLab": false
    }
  ],
  "nodes": [
    {
      "id": "v-sub-101-1",
      "label": "CS401 (1)",
      "subjectCode": "CS401",
      "teacherName": "Dr. Alan Turing",
      "sectionName": "CSE-4A",
      "degree": 4,
      "colorId": 1,
      "colorHex": "#3b82f6"
    }
  ],
  "edges": [
    {
      "id": "edge-v-sub-101-1-v-sub-102-1",
      "source": "v-sub-101-1",
      "target": "v-sub-102-1",
      "conflictType": "Section Overlap"
    }
  ]
}
```

---

## 10. Edge Cases & Exception Handling

| Edge Case Scenario | Potential Failure Mode | System Response & Resolution Strategy |
| :--- | :--- | :--- |
| **Over-Constrained Section** | Section requires 35 hours in a 30-period week | Flags input validation error before graph generation; recommends reducing credits or adding Saturday periods. |
| **Single Faculty Bottleneck** | Single teacher assigned 35 sessions across sections | Triggers impossible schedule detector; identifies teacher bottleneck with explicit guidance to add co-faculty. |
| **Laboratory Capacity Deficit** | 4 concurrent labs requested, but only 2 lab rooms exist | Conflict engine flags lab resource exhaustion; colors vertices into distinct time slots to prevent simultaneous lab demands. |
| **Backend Service Offline** | Network failure or FastAPI container stopped | Frontend auto-switches to client-side TypeScript DSatur solver; user receives non-blocking toast notification. |

---

## 11. Acceptance Criteria & Definition of Done (DoD)

A release candidate is accepted when:
1. **Mathematical Correctness**: Brooks' Theorem bounds validated on all benchmark graphs. Zero hard conflicts verified across $\ge 10$ seed configurations.
2. **Visual Fidelity**: Interactive graph visualizer renders all nodes, degrees, saturation indices, and edge relationships without layout clipping.
3. **Export Integrity**: Exported PDF documents render legible, aligned tables with all metadata, room numbers, and faculty names intact.
4. **Code Quality**: TypeScript compiles with zero errors; FastAPI routes validate payloads with strict Pydantic models.
5. **Demonstration Readiness**: Demo data loads instantly in under 1 second, producing a 100% verified timetable with one click.
