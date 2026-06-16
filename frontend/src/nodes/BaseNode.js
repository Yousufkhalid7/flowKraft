import { Handle } from 'reactflow';

export const BaseNode = ({ title, color, handles = [], children }) => {
  return (
    <div style={{
      minWidth: 200,
      minHeight: 80,
      border: '1px solid #d1d5db',
      borderRadius: 10,
      backgroundColor: '#ffffff',
      fontFamily: 'Inter, sans-serif',
      fontSize: 12,
      boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
    }}>

      <div style={{
        backgroundColor: color || '#6366f1',
        color: '#ffffff',
        padding: '6px 12px',
        borderRadius: '10px 10px 0 0',
        fontWeight: 600,
        fontSize: 11,
        letterSpacing: '0.05em',
        textTransform: 'uppercase',
      }}>
        {title}
      </div>

      <div style={{ padding: '10px 12px' }}>
        {children}
      </div>

      {handles.map((handle) => (
        <Handle
          key={handle.id}
          type={handle.type}
          position={handle.position}
          id={handle.id}
          style={handle.style || {}}
        />
      ))}
    </div>
  );
};