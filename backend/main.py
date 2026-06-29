from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Any
from groq import Groq
from dotenv import load_dotenv
import os
import json

load_dotenv()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# ── existing models ──────────────────────────────────────────
class PipelineData(BaseModel):
    nodes: List[Any]
    edges: List[Any]

class PromptRequest(BaseModel):
    prompt: str

# ── existing helpers ─────────────────────────────────────────
def is_dag(nodes, edges):
    graph = {node['id']: [] for node in nodes}
    for edge in edges:
        if edge['source'] in graph:
            graph[edge['source']].append(edge['target'])

    visited = set()
    in_stack = set()

    def has_cycle(node_id):
        visited.add(node_id)
        in_stack.add(node_id)
        for neighbor in graph.get(node_id, []):
            if neighbor not in visited:
                if has_cycle(neighbor):
                    return True
            elif neighbor in in_stack:
                return True
        in_stack.remove(node_id)
        return False

    for node in nodes:
        if node['id'] not in visited:
            if has_cycle(node['id']):
                return False
    return True

# ── existing routes ───────────────────────────────────────────
@app.get('/')
def read_root():
    return {'Ping': 'Pong'}

@app.post('/pipelines/parse')
def parse_pipeline(pipeline: PipelineData):
    return {
        'num_nodes': len(pipeline.nodes),
        'num_edges': len(pipeline.edges),
        'is_dag': is_dag(pipeline.nodes, pipeline.edges),
    }

# ── NEW: natural language → pipeline ─────────────────────────
SYSTEM_PROMPT = """
You are a pipeline architect for an AI workflow tool.
The user will describe a goal in plain English.
You must return ONLY a valid JSON object with this exact structure:

{
  "nodes": [
    {
      "id": "node_1",
      "type": "customInput",
      "position": { "x": 100, "y": 200 },
      "data": { "id": "node_1", "nodeType": "customInput" }
    }
  ],
  "edges": [
    {
      "id": "edge_1",
      "source": "node_1",
      "target": "node_2",
      "sourceHandle": "node_1-value",
      "targetHandle": "node_2-system"
    }
  ]
}

Available node types and their handles:
- customInput   → source handle: "{id}-value"
- customOutput  → target handle: "{id}-value"
- llm           → target handles: "{id}-system" (top), "{id}-prompt" (bottom); source: "{id}-response"
- text          → source handle: "{id}-output"; target handles created dynamically from {{variable}} syntax
- prompt        → target: "{id}-input"; source: "{id}-output"
- math          → target: "{id}-a", "{id}-b"; source: "{id}-result"
- timer         → target: "{id}-trigger"; source: "{id}-output"
- filter        → target: "{id}-input"; source: "{id}-pass", "{id}-fail"
- note          → no handles

Layout rules:
- Space nodes at least 300px apart horizontally, 150px vertically
- Start x at 100, start y at 200
- Flow left to right

Return ONLY the JSON. No explanation, no markdown, no code blocks.
""".strip()

@app.post('/pipelines/generate')
def generate_pipeline(request: PromptRequest):
    client = Groq(api_key=os.getenv('GROQ_API_KEY'))

    chat = client.chat.completions.create(
        model='llama3-70b-8192',
        messages=[
            { 'role': 'system', 'content': SYSTEM_PROMPT },
            { 'role': 'user',   'content': request.prompt },
        ],
        temperature=0.3,   # low = more predictable/structured output
        max_tokens=1500,
    )

    raw = chat.choices[0].message.content.strip()

    # strip markdown code fences if model adds them anyway
    if raw.startswith('```'):
        raw = raw.split('\n', 1)[-1]
        raw = raw.rsplit('```', 1)[0]

    try:
        pipeline = json.loads(raw)
    except json.JSONDecodeError:
        return { 'error': 'Model returned invalid JSON', 'raw': raw }

    return pipeline