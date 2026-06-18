import { useState } from 'react';
import { BaseNode } from './BaseNode';

export const NoteNode = ({ id, data }) => {
  const [note, setNote] = useState(data?.note || '');

  return (
    <BaseNode title="Note" color="#64748b" handles={[]}>
      <textarea
        value={note}
        onChange={(e) => setNote(e.target.value)}
        placeholder="Write a note..."
        style={{
          display: 'block', width: '100%',
          padding: '3px 6px', border: '1px solid #d1d5db',
          borderRadius: 4, fontSize: 12, boxSizing: 'border-box',
          resize: 'none', minHeight: 60, fontFamily: 'inherit',
        }}
      />
    </BaseNode>
  );
};