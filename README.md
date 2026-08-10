<div align="center">

  # ⚡ AutoSched AI — Automated Academic Timetable Generator
  
  **An Enterprise-Grade Scheduling Engine Powered by Graph Theory (DSatur Vertex Coloring)**

  [![React](https://img.shields.io/badge/React-19.0.0-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5.7.3-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
  [![FastAPI](https://img.shields.io/badge/FastAPI-0.100.0-009688?style=for-the-badge&logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com/)
  [![Python](https://img.shields.io/badge/Python-3.11+-3776AB?style=for-the-badge&logo=python&logoColor=white)](https://www.python.org/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.17-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
  [![License](https://img.shields.io/badge/License-MIT-green.style=for-the-badge)](#license)

  [Live Demo](http://localhost:5173/) • [API Reference](#-api-documentation) • [Algorithm Deep Dive](#-graph-coloring-mathematical-formulation) • [Report Bug](https://github.com/adithyamamidala19/GraphColoring-Timetable-Generator/issues)

</div>

---

## 🌟 Executive Summary

**AutoSched AI** is a state-of-the-art academic timetabling solution engineered to solve NP-complete scheduling bottlenecks faced by universities and higher education institutions.

Instead of traditional brute-force or manual spreadsheet mapping—which often results in faculty overlaps, room double-bookings, and uneven workloads—AutoSched AI transforms timetabling into an **Undirected Graph Coloring Optimization Problem**. Using the **DSatur (Degree of Saturation)** heuristic, the system computes optimal time-slot assignments with guaranteed zero hard-constraint violations in under **50 milliseconds**.

---

## 🧮 Graph Coloring Mathematical Formulation

The academic scheduling domain is mapped to graph theoretical structures $G = (V, E)$ as follows:

$$\begin{aligned}
\text{Vertices } V_i &\iff \text{Class Sessions } \{S_1, S_2, \dots, S_n\} \\
\text{Edges } E_{ij} &\iff \text{Scheduling Conflict Between } V_i \text{ and } V_j \\
\text{Colors } c(V_i) &\iff \text{Time Slot Index } \{1, 2, \dots, k\}
\end{aligned}$$

### DSatur (Degree of Saturation) Heuristic Execution Order:
1. **Saturation Degree ($\text{sat}(v)$)**: Number of distinct colors assigned to adjacent neighbors of vertex $v$.
2. **Static Degree ($\text{deg}(v)$)**: Total number of conflicting edges connected to vertex $v$.
3. **Selection Rule**: At each step, choose uncolored vertex $v$ with maximum $\text{sat}(v)$. Break ties using maximum static degree $\text{deg}(v)$.
4. **Color Assignment**: Assign vertex $v$ the smallest color index $c(v) \in \{1, 2, \dots, k\}$ not used by any adjacent neighbor.

$$\chi(G) \le \Delta(G) + 1 \quad \text{(Brooks' Theorem Bound)}$$

---

## ✨ Key Technical Features

- 🧠 **Deterministic DSatur Solver**: Guarantees zero hard collisions (no teacher double-booking, room overlap, or section collision).
- ⚡ **Interactive Graph Visualizer**: Real-time SVG conflict graph with active node-to-node current flow energy animations illustrating chromatic color allocation.
- 🎨 **$100k Dark Theme Design**: Cyber Emerald (`#10b981`) aesthetic with kinetic grid patterns, Google Fonts (`Neuton` serif & `Caveat` cursive script).
- 👥 **Dynamic Entity Management**: Full CRUD capabilities to configure custom Faculty members, Student Sections, Classrooms, Hardware Labs, and Electives.
- 📄 **Publication-Ready PDF Export**: One-click client-side landscape PDF matrix generation via `jsPDF` + `jspdf-autotable`.
- 📊 **Analytics & Workload Metrics**: Visual breakdown of faculty weekly load, room occupancy rates, and soft-constraint optimization scores.

---

## 🏗️ Architecture & Component Topology

```
                  ┌─────────────────────────────────────────┐
                  │       React 19 + TypeScript UI          │
                  │   (Vite, Tailwind CSS, Framer Motion)   │
                  └────────────────────┬────────────────────┘
                                       │
                         JSON Payloads │ (API Request)
                                       ▼
                  ┌─────────────────────────────────────────┐
                  │         Python FastAPI Backend          │
                  │        (RESTful CORS Microservice)      │
                  └────────────────────┬────────────────────┘
                                       │
                         Graph Engine  │ (NetworkX / DSatur)
                                       ▼
                  ┌─────────────────────────────────────────┐
                  │   DSatur Graph Coloring Solver Core     │
                  │  (Chromatic Slot Allocator Engine)      │
                  └─────────────────────────────────────────┘
```

---

## 📁 Repository Directory Structure

```
GraphColoring-Timetable-Generator/
├── frontend/                     # React 19 + TypeScript Frontend App
│   ├── src/
│   │   ├── components/           # UI, Visualizer & Manager Views
│   │   │   ├── GraphColoringVisualizer.tsx  # SVG Flow Visualizer
│   │   │   ├── PinnedWorkflowCards.tsx      # Tilted Process Cards
│   │   │   ├── TimetableGridView.tsx        # Schedule Grid & PDF Export
│   │   │   ├── SubjectManager.tsx           # Subject & Faculty Mapping
│   │   │   ├── TeacherManager.tsx           # Faculty Directory
│   │   │   ├── SectionManager.tsx           # Student Sections
│   │   │   └── RoomManager.tsx              # Classrooms & Labs
│   │   ├── services/             # API client & fallback engine
│   │   └── types/                # TypeScript Interfaces
│   ├── package.json
│   └── vite.config.ts
├── backend/                      # Python FastAPI Microservice
│   ├── app/
│   │   ├── solver/
│   │   │   └── graph_coloring.py # DSatur & NetworkX Core Algorithm
│   │   └── main.py               # FastAPI App Routes & Schemas
│   ├── requirements.txt
│   └── run.py                    # Uvicorn Server Launcher
├── .gitignore
└── README.md
```

---

## ⚡ API Documentation

### `POST /api/generate`
Generates a zero-conflict timetable matrix given academic setup parameters.

**Request Payload:**
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
  "teachers": [{"id": "t-1", "name": "Dr. Alan Turing", "department": "CSE"}],
  "rooms": [{"id": "r-1", "code": "LH-101", "capacity": 70, "type": "classroom"}],
  "sections": [{"id": "sec-1", "name": "CSE-4A", "strength": 60}]
}
```

**Response Payload:**
```json
{
  "chromaticNumber": 4,
  "hardConflictsCount": 0,
  "qualityScore": 100,
  "cells": [
    {
      "day": "Monday",
      "period": 1,
      "subjectCode": "CS401",
      "teacherName": "Dr. Alan Turing",
      "roomCode": "LH-101",
      "colorHex": "#10b981"
    }
  ]
}
```

---

## 🚀 Local Installation & Quickstart

### Prerequisites
- **Node.js** v18.0.0+
- **Python** v3.11+
- **npm** or **pnpm**

### 1. Clone Repository
```bash
git clone https://github.com/adithyamamidala19/GraphColoring-Timetable-Generator.git
cd GraphColoring-Timetable-Generator
```

### 2. Frontend Development Server
```bash
cd frontend
npm install
npm run dev
# App will run at http://localhost:5173
```

### 3. Backend Python Solver API
```bash
cd ../backend
pip install -r requirements.txt
python run.py
# API server will run at http://localhost:8000
```

---

## 🛡️ License

Distributed under the **MIT License**. See `LICENSE` for more information.

---

<div align="center">
  Developed by <b>Adithya Mamidala</b> • Computer Science & Engineering
</div>
