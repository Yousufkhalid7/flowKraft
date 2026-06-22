import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';

export const OutputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(
    data?.outputName || id.replace('customOutput-', 'output_')
  );
  const [outputType, setOutputType] = useState(data.outputType);

  const handles = [
    { type: 'target', position: Position.Left, id: `${id}-value` }
  ];

  return (
    <BaseNode title="Output" color="#f59e0b" handles={handles}>
      <label style={{ display: 'block', marginBottom: 6 }}>
        <span style={{ color: '#c9d1d9', fontSize: 11 }}>Name</span>
        <input
          type="text"
          value={currName}
          onChange={(e) => setCurrName(e.target.value)}
          placeholder="Enter Output"
          style={{
            display: 'block', width: '100%', marginTop: 2,
            padding: '4px 8px', border: '1px solid #30363d',
            borderRadius: 4, fontSize: 12, boxSizing: 'border-box',
            backgroundColor: '#0d1117',
            color: '#c9d1d9',
          }}
        />
      </label>
      <label style={{ display: 'block' }}>
        <span style={{ color: '#c9d1d9', fontSize: 11 }}>Type</span>
        <select
          value={outputType}
          onChange={(e) => setOutputType(e.target.value)}
          style={{
            display: 'block', width: '100%', marginTop: 2,
            padding: '4px 8px', border: '1px solid #30363d',
            borderRadius: 4, fontSize: 12, boxSizing: 'border-box',
            backgroundColor: '#0d1117',
            color: '#c9d1d9',
          }}
        >
          <option value="Text">Text</option>
          <option value="Image">Image</option>
        </select>
      </label>
    </BaseNode>
  );
};