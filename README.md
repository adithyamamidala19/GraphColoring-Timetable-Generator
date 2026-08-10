# ⚡ AutoSched AI — Automated Academic Timetable Generator

> An enterprise-grade, zero-conflict academic scheduling engine powered by **Graph Theory (DSatur Vertex Coloring Algorithm)**, built with React 19, TypeScript, Vite, Tailwind CSS, and a Python FastAPI backend.

---

## 🌟 Project Overview

**AutoSched AI** resolves complex university scheduling bottlenecks by converting academic timetabling into an undirected Graph Coloring problem. Class sessions are represented as vertices $V_i$, scheduling overlaps (shared faculty, sections, or lecture halls) as conflict edges $E_{ij}$, and time slots as chromatic colors $k$.

Using the **DSatur (Degree of Saturation)** greedy heuristic, the engine computes the minimum chromatic number $k$ to guarantee 100% hard-constraint collision avoidance in sub-50 milliseconds.

---

## ✨ Key Features

- 🧠 **DSatur Graph Coloring Engine**: Deterministic polynomial-time algorithm ensuring zero teacher double-booking, room collisions, or section overlaps.
- ⚛️ **Interactive Graph Visualizer**: Real-time SVG conflict graph with dynamic node-to-node energy flow animations illustrating chromatic slot allocation.
- 🎨 **$100k Pitch-Black Design**: Styled with a Cyber Emerald (`#10b981`) design system, kinetic grid backgrounds, and Google Fonts (`Neuton` & `Caveat`).
- 👥 **Dynamic Entity Management**: Full custom management for faculty members, student sections, continuous lab hours, and specialized lecture halls.
- 📄 **One-Click PDF & CSV Export**: Download publication-ready, landscape A4 weekly timetable matrix PDFs directly from the browser.
- ⚡ **Full-Stack Architecture**: Modern React 19 + Vite frontend paired with a high-performance Python FastAPI backend solver.

---

## 🛠️ Tech Stack

- **Frontend**: React 19, TypeScript, Vite, Tailwind CSS, Framer Motion, Lucide Icons, jsPDF.
- **Backend**: Python 3.11+, FastAPI, NetworkX, Uvicorn.
- **Algorithm**: DSatur Vertex Coloring Graph Theory Heuristic.

---

## 📁 Repository Structure

```
├── frontend/             # React 19 + TypeScript + Vite Frontend UI
│   ├── src/
│   │   ├── components/   # UI & Graph Visualization Components
│   │   ├── services/     # Client API & Solver Engine
│   │   └── types/        # TypeScript Definitions
│   └── package.json
├── backend/              # Python FastAPI Graph Solver Microservice
│   ├── app/              # DSatur Algorithm & NetworkX Solvers
│   └── main.py
├── .gitignore            # Git exclusion rules
└── README.md             # Project Documentation
```

---

## 🚀 Quickstart

### 1. Clone the repository
```bash
git clone https://github.com/adithyamamidala19/GraphColoring-Timetable-Generator.git
cd GraphColoring-Timetable-Generator
```

### 2. Run Frontend Web Application
```bash
cd frontend
npm install
npm run dev
```

### 3. Run Backend FastAPI Graph Solver
```bash
cd ../backend
pip install -r requirements.txt
python run.py
```
