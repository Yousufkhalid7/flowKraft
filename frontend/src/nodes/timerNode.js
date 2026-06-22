import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';

export const TimerNode = ({ id, data }) => {
  const [delay, setDelay] = useState(data?.delay);

  const handles = [
    { type: 'target', position: Position.Left, id: `${id}-trigger` },
    { type: 'source', position: Position.Right, id: `${id}-output` },
  ];

  return (
    <BaseNode title="Timer" color="#f97316" handles={handles}>
      <label style={{ display: 'block' }}>
        <span style={{ color: '#c9d1d9', fontSize: 11 }}>Delay (ms)</span>
        <input
          type="number"
          value={delay}
          onChange={(e) => setDelay(e.target.value)}
          placeholder='Enter delay'
          style={{
            display: 'block', width: '100%', marginTop: 2,
            padding: '3px 6px', border: '1px solid #30363d',
            borderRadius: 4, fontSize: 12, boxSizing: 'border-box',
            backgroundColor: '#0d1117',
            color: '#c9d1d9',
          }}
        />
      </label>
      <p style={{ margin: '6px 0 0', color: '#9ca3af', fontSize: 10 }}>
        Waits before passing signal through
      </p>
    </BaseNode>
  );
};