// toolbar.js

import { DraggableNode } from './draggableNode';

export const PipelineToolbar = () => {
  return (
    <div style={{ 
      padding: '20px',
      background: 'linear-gradient(136deg,rgba(245, 2, 2, 1) 0%, rgba(0, 0, 255, 1) 100%)',
      borderBottom: '2px solid #4c1d95'
    }}>
      <h2 style={{ 
        color: '#fff', 
        marginBottom: '16px',
        fontSize: '24px',
        fontWeight: '700'
      }}>
        Pipeline Builder
      </h2>
      <div style={{ 
        display: 'flex', 
        flexWrap: 'wrap', 
        gap: '12px' 
      }}>
        <DraggableNode type='customInput' label='Input' icon='📥' />
        <DraggableNode type='llm' label='LLM' icon='🤖' />
        <DraggableNode type='customOutput' label='Output' icon='📤' />
        <DraggableNode type='text' label='Text' icon='📝' />
        <DraggableNode type='filter' label='Filter' icon='🔍' />
        <DraggableNode type='transform' label='Transform' icon='⚙️' />
        <DraggableNode type='merge' label='Merge' icon='🔗' />
        <DraggableNode type='conditional' label='Conditional' icon='🔀' />
        <DraggableNode type='delay' label='Delay' icon='⏱️' />
      </div>
    </div>
  );
};