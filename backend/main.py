from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Any

app = FastAPI()

# CORS lets the frontend (localhost:3000) talk to the backend (localhost:8000)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_methods=["*"],
    allow_headers=["*"],
)

class PipelineData(BaseModel):
    nodes: List[Any]
    edges: List[Any]

def is_dag(nodes, edges):
    # Build adjacency list — for each node, store which nodes it points TO
    graph = {node['id']: [] for node in nodes}
    for edge in edges:
        if edge['source'] in graph:
            graph[edge['source']].append(edge['target'])

    # DFS cycle detection
    # visited = nodes we've fully processed
    # in_stack = nodes in the current DFS path (if we see one again = cycle)
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
                return True  # found a cycle

        in_stack.remove(node_id)
        return False

    for node in nodes:
        if node['id'] not in visited:
            if has_cycle(node['id']):
                return False  # has cycle = NOT a DAG

    return True  # no cycles found = IS a DAG

@app.get('/')
def read_root():
    return {'Ping': 'Pong'}

@app.post('/pipelines/parse')
def parse_pipeline(pipeline: PipelineData):
    num_nodes = len(pipeline.nodes)
    num_edges = len(pipeline.edges)
    dag = is_dag(pipeline.nodes, pipeline.edges)

    return {
        'num_nodes': num_nodes,
        'num_edges': num_edges,
        'is_dag': dag,
    }