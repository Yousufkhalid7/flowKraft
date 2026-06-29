# FlowCraft — Visual AI Pipeline Builder

A drag-and-drop pipeline builder for chaining AI workflow nodes, 
inspired by tools like VectorShift and n8n.

## Features
- 9 node types with a reusable BaseNode abstraction
- Dynamic {{ variable }} detection in Text nodes with auto-generated handles
- Auto-resizing textarea as content grows
- Dark mode UI with GitHub-inspired colors and hover glow effects
- Pipeline DAG validation via FastAPI backend

## Tech Stack
- **Frontend:** React, React Flow, Zustand
- **Backend:** Python, FastAPI

## Running locally

# Frontend
cd frontend
npm install
npm start

# Backend
cd backend
pip install fastapi uvicorn
uvicorn main:app --reload
