import { useState, useEffect, useRef } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || '{{input}}');
  const [variables, setVariables] = useState([]);
  const textareaRef = useRef(null);

  // FEATURE 1: Auto-resize
  // Runs every time currText changes
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';       // reset first
      textarea.style.height = `${textarea.scrollHeight}px`; // then grow
    }
  }, [currText]);

  // FEATURE 2: Variable detection
  // Runs every time currText changes
  useEffect(() => {
    // This regex finds anything matching {{ someVariable }}
    // \w+ means "one or more word characters (letters, numbers, underscore)"
    const regex = /\{\{\s*(\w+)\s*\}\}/g;
    const found = [];
    let match;

    // loop through every match in the text
    while ((match = regex.exec(currText)) !== null) {
      const varName = match[1]; // the captured group inside {{ }}
      if (!found.includes(varName)) {
        found.push(varName); // avoid duplicates
      }
    }

    setVariables(found);
  }, [currText]);

  // Build handles: one LEFT-side handle per detected variable
  const handles = [
    { type: 'source', position: Position.Right, id: `${id}-output` },
    ...variables.map((varName, index) => ({
      type: 'target',
      position: Position.Left,
      id: `${id}-${varName}`,
      style: {
        top: `${(index + 1) * (100 / (variables.length + 1))}%`,
      },
    })),
  ];

  return (
    <BaseNode title="Text" color="#3b82f6" handles={handles}>

      {/* Show a label for each detected variable */}
      {variables.length > 0 && (
        <div style={{ marginBottom: 8 }}>
          {variables.map((varName) => (
            <div key={varName} style={{
              fontSize: 10,
              color: '#3b82f6',
              marginBottom: 2,
              display: 'flex',
              alignItems: 'center',
              gap: 4,
            }}>
              <span style={{
                width: 6, height: 6,
                borderRadius: '50%',
                backgroundColor: '#3b82f6',
                display: 'inline-block',
              }}/>
              {varName}
            </div>
          ))}
        </div>
      )}

      <label style={{ display: 'block' }}>
        <span style={{ color: '#8b949e', fontSize: 11 }}>Text</span>
        <textarea
          ref={textareaRef}
          value={currText}
          onChange={(e) => setCurrText(e.target.value)}
          style={{
            display: 'block',
            width: '100%',
            marginTop: 2,
            padding: '6px 8px',
            border: '1px solid #30363d',
            borderRadius: 4,
            fontSize: 12,
            boxSizing: 'border-box',
            resize: 'none',
            minHeight: 60,
            fontFamily: 'inherit',
            backgroundColor: '#0d1117',
            color: '#c9d1d9',
            lineHeight: 1.5,
            overflow: 'hidden',
          }}
        />
      </label>

    </BaseNode>
  );
};