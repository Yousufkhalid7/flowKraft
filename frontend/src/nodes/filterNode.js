import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';

export const FilterNode = ({ id, data }) => {
  const [condition, setCondition] = useState(data?.condition || '');

  const handles = [
    { type: 'target', position: Position.Left, id: `${id}-input` },
    { type: 'source', position: Position.Right, id: `${id}-pass`, style: { top: '35%' } },
    { type: 'source', position: Position.Right, id: `${id}-fail`, style: { top: '70%' } },
  ];

  return (
    <BaseNode title="Filter" color="#dc2626" handles={handles}>
      <label style={{ display: 'block' }}>
        <span style={{ color: '#c9d1d9', fontSize: 11 }}>Condition</span>
        <input
          type="text"
          value={condition}
          onChange={(e) => setCondition(e.target.value)}
          placeholder="e.g. value > 10"
          style={{
            display: 'block', width: '100%', marginTop: 2,
            padding: '3px 6px', border: '1px solid #30363d',
            borderRadius: 4, fontSize: 12, boxSizing: 'border-box',
            backgroundColor: '#0d1117',
            color: '#c9d1d9',
          }}
        />
      </label>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6 }}>
        <span style={{ color: '#c9d1d9', fontSize: 10 }}>↑ pass</span>
        <span style={{ color: '#c9d1d9', fontSize: 10 }}>↓ fail</span>
      </div>
    </BaseNode>
  );
};