# FlowCraft — Visual AI Pipeline Builder

A drag-and-drop pipeline builder for chaining AI workflow nodes, inspired by tools like VectorShift and n8n. Users can visually construct pipelines by connecting nodes, validate them as a DAG, or simply describe a goal in plain English and let AI generate the entire pipeline automatically.

## Features

- **Reusable node abstraction** — a single `BaseNode` component powers 9 distinct node types (Input, LLM, Output, Text, Prompt, Math, Timer, Filter, Note), eliminating repetitive code across node files.
- **Dynamic variable detection** — Text nodes parse `{{ variable }}` syntax in real time and automatically generate corresponding connection handles.
- **Auto-resizing text input** — the Text node grows in height as the user types.
- **Dark mode UI** — GitHub-inspired color palette, hover glow effects on nodes, and animated connection edges.
- **Pipeline validation** — clicking Submit sends the pipeline to a FastAPI backend, which counts nodes/edges and checks whether the graph is a valid DAG (no cycles) using DFS-based cycle detection.
- **Natural-language-to-pipeline generation** — a floating chat panel lets users describe a goal (e.g. *"summarize this text and translate it to French"*). The prompt is sent to an LLM via the Groq API, which returns structured JSON (`{ nodes, edges }`) that is rendered directly onto the canvas.

## Tech Stack

**Frontend:** React, React Flow, Zustand
**Backend:** Python, FastAPI, Groq API (Llama 3 70B)

## Project Structure

```
flowcraft/
├── frontend/
│   └── src/
│       ├── nodes/
│       │   ├── BaseNode.js        # shared node abstraction
│       │   ├── inputNode.js
│       │   ├── outputNode.js
│       │   ├── llmNode.js
│       │   ├── textNode.js        # auto-resize + variable detection
│       │   ├── promptNode.js
│       │   ├── noteNode.js
│       │   ├── mathNode.js
│       │   ├── timerNode.js
│       │   └── filterNode.js
│       ├── App.js
│       ├── toolbar.js
│       ├── ui.js                  # React Flow canvas
│       ├── store.js               # Zustand state management
│       ├── submit.js              # pipeline submission + DAG result UI
│       └── PipelineGenerator.js   # natural-language pipeline generation panel
└── backend/
    ├── main.py                    # FastAPI app: DAG validation + LLM generation
    └── .env                       # GROQ_API_KEY (not committed)
```

## Running Locally

### Frontend

```bash
cd frontend
npm install
npm start
```

Runs at `http://localhost:3000`.

### Backend

```bash
cd backend
pip install fastapi uvicorn groq python-dotenv
uvicorn main:app --reload
```

Runs at `http://localhost:8000`.

### Environment Setup

Create a `.env` file inside `backend/`:

```
GROQ_API_KEY=your_groq_api_key_here
```

Get a free API key at [console.groq.com](https://console.groq.com).

## How It Works

### Node Abstraction

All node types are built on top of a single `BaseNode` component that handles the shared layout — header bar, body container, and connection handles. Each individual node file only defines its own title, color, and content, reducing per-node code significantly compared to a copy-paste approach.

### Pipeline Validation

When a user clicks Submit, the frontend sends the current nodes and edges to `POST /pipelines/parse`. The backend builds an adjacency list from the edges and runs a depth-first search to detect cycles, returning:

```json
{
  "num_nodes": 4,
  "num_edges": 3,
  "is_dag": true
}
```

### Natural-Language Pipeline Generation

The `PipelineGenerator` panel sends the user's prompt to `POST /pipelines/generate`. The backend forwards it to Groq's Llama 3 70B model with a system prompt describing the available node types, their handles, and the required JSON output format. The model's response is parsed and validated, then merged directly into the canvas state via Zustand.

## Branch History

This project was built incrementally, with one branch per feature:

```
main
├── feature/node-abstraction      # Part 1: BaseNode + 9 node types
├── feature/styling                # Part 2: dark mode UI, hover glow, animated edges
├── feature/text-node-logic        # Part 3: auto-resize + dynamic variable handles
├── feature/backend-integration    # Part 4: DAG validation + submission UI
└── feature/nl-to-pipeline         # Bonus: AI-generated pipelines from plain English
```
