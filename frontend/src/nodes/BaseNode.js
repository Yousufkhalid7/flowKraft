import { useState } from 'react';
import { Handle } from 'reactflow';

export const BaseNode = ({ title, color, handles = [], children }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        minWidth: 200,
        minHeight: 80,
        backgroundColor: '#161b22',
        border: `1px solid ${isHovered ? color : '#30363d'}`,
        borderRadius: 10,
        fontFamily: 'Inter, sans-serif',
        fontSize: 12,
        color: '#c9d1d9',
        boxShadow: isHovered
          ? `0 0 0 50px ${color}, 0 100px 50px ${color}1`
          : '0 5px 5px rgba(0, 0, 0, 0.3)',
        transition: 'all 0.5s ease',
        cursor: 'default',
      }}
    >
      {/* Colored header bar */}
      <div style={{
        backgroundColor: color || '#58a6ff',
        color: '#0d1117',
        padding: '6px 12px',
        borderRadius: '10px 10px 0 0',
        fontWeight: 700,
        fontSize: 11,
        letterSpacing: '0.05em',
        textTransform: 'uppercase',
      }}>
        {title}
      </div>

      {/* Body content */}
      <div style={{ padding: '10px 12px' }}>
        {children}
      </div>

      {/* Connection dots */}
      {handles.map((handle) => (
        <Handle
          key={handle.id}
          type={handle.type}
          position={handle.position}
          id={handle.id}
          style={{
            backgroundColor: color || '#58a6ff',
            width: 8,
            height: 8,
            border: '2px solid #0d1117',
            ...handle.style,
          }}
        />
      ))}
    </div>
  );
};