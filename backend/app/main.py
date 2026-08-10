from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict, Any, Optional
from app.solver.graph_coloring import solve_timetable_graph_coloring

app = FastAPI(
    title="Automated Timetable Generator API",
    description="Graph Coloring Algorithm Engine for Academic Scheduling",
    version="2.0.0"
)

# Enable CORS for Frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class GenerateRequest(BaseModel):
    subjects: List[Dict[str, Any]]
    teachers: List[Dict[str, Any]]
    rooms: List[Dict[str, Any]]
    sections: List[Dict[str, Any]]

@app.get("/")
def read_root():
    return {
        "status": "online",
        "service": "Automated Timetable Generator Graph Solver API",
        "version": "2.0.0",
        "algorithm": "DSatur Graph Coloring"
    }

@app.get("/api/health")
def health_check():
    return {"status": "ok", "solver": "DSatur Graph Coloring", "active_nodes": 5}

@app.post("/api/generate")
def generate_timetable(req: GenerateRequest):
    try:
        result = solve_timetable_graph_coloring(
            req.subjects,
            req.teachers,
            req.rooms,
            req.sections
        )
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
