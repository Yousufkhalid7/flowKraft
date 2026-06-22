import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';

export const LLMNode = ({ id, data }) => {

  const handles = [
    { type: 'target', position: Position.Left, id: `${id}-system`, style: { top: '33%' } },
    { type: 'target', position: Position.Left, id: `${id}-prompt`, style: { top: '67%' } },
    { type: 'source', position: Position.Right, id: `${id}-response` },
  ];

  return (
    <BaseNode title="LLM" color="#8b5cf6" handles={handles}>
      <p style={{ margin: 0, color: '#c9d1d9', fontSize: 11, lineHeight: 1.5 }}>
        Language model node. Connect a system prompt and user prompt on the left,
        and read the response on the right.
      </p>
    </BaseNode>
  );
};