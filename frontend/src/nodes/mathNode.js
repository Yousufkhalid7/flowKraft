import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';

export const MathNode = ({ id, data }) => {
  const [operation, setOperation] = useState(data?.operation || 'add');

  const handles = [
    { type: 'target', position: Position.Left, id: `${id}-a`, style: { top: '40%' } },
    { type: 'target', position: Position.Left, id: `${id}-b`, style: { top: '70%' } },
    { type: 'source', position: Position.Right, id: `${id}-result` },
  ];

  return (
    <BaseNode title="Math" color="#06b6d4" handles={handles}>
      <label style={{ display: 'block' }}>
        <span style={{ color: '#6b7280', fontSize: 11 }}>Operation</span>
        <select
          value={operation}
          onChange={(e) => setOperation(e.target.value)}
          style={{
            display: 'block', width: '100%', marginTop: 2,
            padding: '3px 6px', border: '1px solid #d1d5db',
            borderRadius: 4, fontSize: 12, boxSizing: 'border-box',
          }}
        >
          <option value="add">Add (A + B)</option>
          <option value="subtract">Subtract (A - B)</option>
          <option value="multiply">Multiply (A × B)</option>
          <option value="divide">Divide (A ÷ B)</option>
        </select>
      </label>
      <p style={{ margin: '6px 0 0', color: '#9ca3af', fontSize: 10 }}>
        Connect two values on the left
      </p>
    </BaseNode>
  );
};