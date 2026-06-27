import { useStore } from './store';
import { shallow } from 'zustand/shallow';
import { useState } from 'react';

const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
});

export const SubmitButton = () => {
  const { nodes, edges } = useStore(selector, shallow);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    setResult(null);

    try {
      const response = await fetch('http://localhost:8000/pipelines/parse', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nodes, edges }),
      });

      const data = await response.json();
      setResult(data);
    } catch (error) {
      alert('Could not reach the backend. Make sure it is running.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Result popup */}
      {result && (
        <div style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.6)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
        }}
          onClick={() => setResult(null)}
        >
          <div style={{
            backgroundColor: '#161b22',
            border: '1px solid #30363d',
            borderRadius: 12,
            padding: '32px 40px',
            minWidth: 320,
            boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
          }}
            onClick={(e) => e.stopPropagation()}
          >
            <h2 style={{
              margin: '0 0 24px',
              color: '#c9d1d9',
              fontSize: 18,
              fontWeight: 600,
            }}>
              Pipeline Analysis
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

              <div style={statStyle}>
                <span style={labelStyle}>Nodes</span>
                <span style={valueStyle}>{result.num_nodes}</span>
              </div>

              <div style={statStyle}>
                <span style={labelStyle}>Edges</span>
                <span style={valueStyle}>{result.num_edges}</span>
              </div>

              <div style={statStyle}>
                <span style={labelStyle}>Valid DAG</span>
                <span style={{
                  ...valueStyle,
                  color: result.is_dag ? '#3fb950' : '#f85149',
                }}>
                  {result.is_dag ? '✓ Yes' : '✗ No'}
                </span>
              </div>

            </div>

            <p style={{
              margin: '20px 0 0',
              fontSize: 11,
              color: '#8b949e',
            }}>
              {result.is_dag
                ? 'This pipeline has no cycles and can be executed.'
                : 'This pipeline contains a cycle and cannot be executed.'}
            </p>

            <button
              onClick={() => setResult(null)}
              style={{
                marginTop: 24,
                width: '100%',
                padding: '8px',
                backgroundColor: '#21262d',
                border: '1px solid #30363d',
                borderRadius: 6,
                color: '#c9d1d9',
                cursor: 'pointer',
                fontSize: 13,
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Submit button */}
      <div style={{ display: 'flex', justifyContent: 'center', padding: '16px' }}>
        <button
          onClick={handleSubmit}
          disabled={loading}
          style={{
            backgroundColor: loading ? '#238636aa' : '#238636',
            color: 'white',
            border: 'none',
            borderRadius: 6,
            padding: '10px 32px',
            fontSize: 14,
            fontWeight: 600,
            cursor: loading ? 'not-allowed' : 'pointer',
            transition: 'background-color 0.2s ease',
          }}
        >
          {loading ? 'Analysing...' : 'Submit Pipeline'}
        </button>
      </div>
    </>
  );
};

const statStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '10px 0',
  borderBottom: '1px solid #21262d',
};

const labelStyle = {
  color: '#8b949e',
  fontSize: 13,
};

const valueStyle = {
  color: '#c9d1d9',
  fontSize: 20,
  fontWeight: 700,
};