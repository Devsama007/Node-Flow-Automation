from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict, Any
app = FastAPI()
# Add CORS middleware to allow frontend connections
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",  # Create React App
        "http://localhost:5173",  # Vite
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
class Node(BaseModel):
    id: str
class Edge(BaseModel):
    source: str
    target: str
class PipelineData(BaseModel):
    nodes: List[Dict[str, Any]]
    edges: List[Dict[str, Any]]
@app.get('/')
def read_root():
    return {'Ping': 'Pong'}
@app.post('/pipelines/parse')
def parse_pipeline(pipeline: PipelineData):
    """
    Parse the pipeline and return:
    - num_nodes: number of nodes
    - num_edges: number of edges
    - is_dag: whether the graph is a Directed Acyclic Graph
    """
    nodes = pipeline.nodes
    edges = pipeline.edges

    num_nodes = len(nodes)
    num_edges = len(edges)

    # Check if the graph is a DAG using DFS-based cycle detection
    is_dag = is_directed_acyclic_graph(nodes, edges)

    return {
        'num_nodes': num_nodes,
        'num_edges': num_edges,
        'is_dag': is_dag
    }
def is_directed_acyclic_graph(nodes: List[Dict[str, Any]], edges: List[Dict[str, Any]]) -> bool:
    """
    Check if the directed graph is acyclic using DFS with coloring.

    White (0): Node not visited
    Gray (1): Node currently being processed (in current DFS path)
    Black (2): Node completely processed

    If we encounter a gray node, we've found a cycle.
    """
    # Build adjacency list
    graph = {node['id']: [] for node in nodes}
    for edge in edges:
        source = edge['source']
        target = edge['target']
        if source in graph:
            graph[source].append(target)

    # Color map: 0 = white, 1 = gray, 2 = black
    color = {node['id']: 0 for node in nodes}

    def has_cycle(node_id: str) -> bool:
        """DFS to detect cycle"""
        color[node_id] = 1  # Mark as gray (being processed)

        # Visit all neighbors
        for neighbor in graph.get(node_id, []):
            if color.get(neighbor, 0) == 1:  # Found a back edge (cycle)
                return True
            if color.get(neighbor, 0) == 0:  # Not visited yet
                if has_cycle(neighbor):
                    return True

        color[node_id] = 2  # Mark as black (completely processed)
        return False

    # Check all nodes (graph might be disconnected)
    for node in nodes:
        if color[node['id']] == 0:  # Not visited
            if has_cycle(node['id']):
                return False  # Found a cycle, not a DAG

    return True  # No cycles found, it's a DAG