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
        <span style={{ color: '#c9d1d9', fontSize: 11 }}>Operation</span>
        <select
          value={operation}
          onChange={(e) => setOperation(e.target.value)}
          style={{
            display: 'block', width: '100%', marginTop: 2,
            padding: '3px 6px', border: '1px solid#30363d',
            borderRadius: 4, fontSize: 12, boxSizing: 'border-box',
            backgroundColor: '#0d1117',
            color: '#c9d1d9',
          }}
        >
          <option value="add">Add </option>
          <option value="subtract">Subtract </option>
          <option value="multiply">Multiply </option>
          <option value="divide">Divide </option>
          <option value="Modulus">Mod</option>
        </select>
      </label>
      <p style={{ margin: '6px 0 0', color: '#9ca3af', fontSize: 10 }}>
        Connect two values on the left
      </p>
    </BaseNode>
  );
};