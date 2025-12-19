// draggableNode.js

export const DraggableNode = ({ type, label, icon }) => {
  const onDragStart = (event, nodeType) => {
    const appData = { nodeType };
    event.target.style.cursor = 'grabbing';
    event.dataTransfer.setData('application/reactflow', JSON.stringify(appData));
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div
      onDragStart={(event) => onDragStart(event, type)}
      onDragEnd={(event) => (event.target.style.cursor = 'grab')}
      style={{ 
        cursor: 'grab', 
        minWidth: '100px', 
        padding: '12px 16px',
        display: 'flex', 
        alignItems: 'center', 
        borderRadius: '10px',
        // background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        justifyContent: 'center', 
        gap: '8px',
        color: '#fff',
        fontWeight: '600',
        fontSize: '14px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        transition: 'transform 0.2s',
        border: '3px solid black'
      }} 
      draggable
    >
      <span style={{ fontSize: '18px' }}>{icon}</span>
      <span>{label}</span>
    </div>
  );
};