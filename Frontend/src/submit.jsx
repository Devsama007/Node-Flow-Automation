// submit.js

import { useStore } from './store';

export const SubmitButton = () => {
  const nodes = useStore((state) => state.nodes);
  const edges = useStore((state) => state.edges);

  const handleSubmit = async () => {
    try {
      const response = await fetch('http://localhost:8000/pipelines/parse', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nodes, edges }),
      });

      const data = await response.json();
      
      alert(`Pipeline Analysis:
      
✅ Number of Nodes: ${data.num_nodes}
✅ Number of Edges: ${data.num_edges}
${data.is_dag ? '✅' : '❌'} Is DAG: ${data.is_dag ? 'Yes' : 'No'}

${data.is_dag ? 'Your pipeline is valid!' : 'Warning: Your pipeline contains cycles!'}`);
    } catch (error) {
      alert(`Error: Failed to connect to backend. Make sure the server is running on http://localhost:8000\n\nError: ${error.message}`);
    }
  };

  return (
    <div style={{
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      padding: '20px',
      background: 'linear-gradient(136deg,rgba(0, 0, 255, 1) 0%, rgba(245, 2, 2, 1) 100%)',
      borderTop: '2px solid #4c1d95'
    }}>
      <button 
        onClick={handleSubmit}
        style={{
          padding: '14px 32px',
          fontSize: '16px',
          fontWeight: '700',
          color: 'black',
          background: 'linear-gradient(135deg,rgba(26, 255, 0, 1) 0%, rgba(78, 217, 136, 1) 50%, rgba(242, 218, 2, 1) 100%)',
          border: 'none',
          borderRadius: '10px',
          cursor: 'pointer',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
          transition: 'transform 0.2s, box-shadow 0.2s',
        }}
        onMouseEnter={(e) => {
          e.target.style.transform = 'translateY(-2px)';
          e.target.style.boxShadow = '0 6px 12px rgba(0,0,0,0.15)';
        }}
        onMouseLeave={(e) => {
          e.target.style.transform = 'translateY(0)';
          e.target.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
        }}
      >
        🚀 Submit Pipeline
      </button>
    </div>
  );
};