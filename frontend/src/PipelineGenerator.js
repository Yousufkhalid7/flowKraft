import { useState } from 'react';
import { useStore } from './store';
import { shallow } from 'zustand/shallow';

const selector = (state) => ({
  addNode: state.addNode,
  setEdges: state.setEdges,
  edges: state.edges,
});

export const PipelineGenerator = () => {
  const { addNode, setEdges, edges } = useStore(selector, shallow);
  const [isOpen, setIsOpen]     = useState(false);
  const [prompt, setPrompt]     = useState('');
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState('');

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    setLoading(true);
    setError('');

    try {
      const res = await fetch('http://localhost:8000/pipelines/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });

      const data = await res.json();

      if (data.error) {
        setError(data.error);
        return;
      }

      // Add each node to the canvas
      data.nodes.forEach((node) => addNode(node));

      // Add edges to existing edges
      setEdges([...edges, ...data.edges]);

      setPrompt('');
      setIsOpen(false);

    } catch (err) {
      setError('Could not reach the backend.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating toggle button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          position: 'fixed',
          right: 24,
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 100,
          backgroundColor: '#238636',
          color: 'white',
          border: 'none',
          borderRadius: 8,
          padding: '12px 10px',
          cursor: 'pointer',
          writingMode: 'vertical-rl',
          fontSize: 12,
          fontWeight: 600,
          letterSpacing: '0.05em',
          boxShadow: '0 4px 16px rgba(0,0,0,0.4)',
          transition: 'background-color 0.2s',
        }}
      >
        ✦ Generate
      </button>

      {/* Sliding panel */}
      {isOpen && (
        <div style={{
          position: 'fixed',
          right: 70,
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 99,
          backgroundColor: '#161b22',
          border: '1px solid #30363d',
          borderRadius: 12,
          padding: 24,
          width: 320,
          boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
        }}>

          <h3 style={{
            margin: '0 0 6px',
            color: '#c9d1d9',
            fontSize: 15,
            fontWeight: 600,
          }}>
            ✦ Generate Pipeline
          </h3>

          <p style={{
            margin: '0 0 16px',
            color: '#8b949e',
            fontSize: 12,
            lineHeight: 1.5,
          }}>
            Describe your goal in plain English and AI will build the pipeline for you.
          </p>

          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder={'e.g. "Summarize text and translate it to French"'}
            rows={4}
            style={{
              width: '100%',
              backgroundColor: '#0d1117',
              border: '1px solid #30363d',
              borderRadius: 6,
              color: '#c9d1d9',
              fontSize: 13,
              padding: '8px 10px',
              boxSizing: 'border-box',
              resize: 'none',
              fontFamily: 'inherit',
              lineHeight: 1.5,
              outline: 'none',
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && e.metaKey) handleGenerate();
            }}
          />

          {error && (
            <p style={{
              margin: '8px 0 0',
              color: '#f85149',
              fontSize: 12,
            }}>
              {error}
            </p>
          )}

          <div style={{
            display: 'flex',
            gap: 8,
            marginTop: 12,
          }}>
            <button
              onClick={handleGenerate}
              disabled={loading || !prompt.trim()}
              style={{
                flex: 1,
                backgroundColor: loading ? '#238636aa' : '#238636',
                color: 'white',
                border: 'none',
                borderRadius: 6,
                padding: '8px 0',
                fontSize: 13,
                fontWeight: 600,
                cursor: loading ? 'not-allowed' : 'pointer',
                transition: 'background-color 0.2s',
              }}
            >
              {loading ? 'Building...' : 'Build ↵'}
            </button>

            <button
              onClick={() => setIsOpen(false)}
              style={{
                backgroundColor: '#21262d',
                color: '#8b949e',
                border: '1px solid #30363d',
                borderRadius: 6,
                padding: '8px 14px',
                fontSize: 13,
                cursor: 'pointer',
              }}
            >
              Cancel
            </button>
          </div>

          <p style={{
            margin: '10px 0 0',
            color: '#484f58',
            fontSize: 11,
            textAlign: 'center',
          }}>
            ⌘ + Enter to generate
          </p>
        </div>
      )}
    </>
  );
};