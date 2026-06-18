import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || '{{input}}');

  const handles = [
    { type: 'source', position: Position.Right, id: `${id}-output` },
  ];

  return (
    <BaseNode title="Text" color="#3b82f6" handles={handles}>
      <label style={{ display: 'block' }}>
        <span style={{ color: '#6b7280', fontSize: 11 }}>Text</span>
        <textarea
          value={currText}
          onChange={(e) => setCurrText(e.target.value)}
          style={{
            display: 'block', width: '100%', marginTop: 2,
            padding: '3px 6px', border: '1px solid #d1d5db',
            borderRadius: 4, fontSize: 12, boxSizing: 'border-box',
            resize: 'none', minHeight: 60, fontFamily: 'inherit',
          }}
        />
      </label>
    </BaseNode>
  );
};