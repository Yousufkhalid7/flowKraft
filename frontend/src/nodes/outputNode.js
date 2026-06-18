import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';

export const OutputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(
    data?.outputName || id.replace('customOutput-', 'output_')
  );
  const [outputType, setOutputType] = useState(data.outputType || 'Text');

  const handles = [
    { type: 'target', position: Position.Left, id: `${id}-value` }
  ];

  return (
    <BaseNode title="Output" color="#f59e0b" handles={handles}>
      <label style={{ display: 'block', marginBottom: 6 }}>
        <span style={{ color: '#6b7280', fontSize: 11 }}>Name</span>
        <input
          type="text"
          value={currName}
          onChange={(e) => setCurrName(e.target.value)}
          style={{
            display: 'block', width: '100%', marginTop: 2,
            padding: '3px 6px', border: '1px solid #d1d5db',
            borderRadius: 4, fontSize: 12, boxSizing: 'border-box',
          }}
        />
      </label>
      <label style={{ display: 'block' }}>
        <span style={{ color: '#6b7280', fontSize: 11 }}>Type</span>
        <select
          value={outputType}
          onChange={(e) => setOutputType(e.target.value)}
          style={{
            display: 'block', width: '100%', marginTop: 2,
            padding: '3px 6px', border: '1px solid #d1d5db',
            borderRadius: 4, fontSize: 12, boxSizing: 'border-box',
          }}
        >
          <option value="Text">Text</option>
          <option value="Image">Image</option>
        </select>
      </label>
    </BaseNode>
  );
};