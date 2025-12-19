// baseNode.js
// Core abstraction for all node types

import { useState } from 'react';
import { Handle, Position } from 'reactflow';
import { useStore } from '../store';

export const BaseNode = ({ id, data, config, selected }) => {
  const [fields, setFields] = useState(config.fields || {});
  const updateNodeField = useStore((state) => state.updateNodeField);
  const deleteNode = useStore((state) => state.deleteNode);

  const handleFieldChange = (fieldName, value) => {
    setFields(prev => ({ ...prev, [fieldName]: value }));
    updateNodeField(id, fieldName, value);
  };

  const handleDelete = () => {
    deleteNode(id);
  };

  // Extract variables from text (for Text node)
  const extractVariables = (text) => {
    const regex = /\{\{(\s*\w+\s*)\}\}/g;
    const matches = [];
    let match;
    while ((match = regex.exec(text)) !== null) {
      matches.push(match[1].trim());
    }
    return matches;
  };

  const variables = config.type === 'text' && fields.text 
    ? extractVariables(fields.text) 
    : [];

  // Calculate dynamic height for text node
  const textLength = config.type === 'text' && fields.text ? fields.text.length : 0;
  const dynamicHeight = config.type === 'text' 
    ? Math.max(120, 120 + Math.floor(textLength / 30) * 20)
    : config.height || 140;

  return (
    <div style={{
      width: config.width || 240,
      minHeight: dynamicHeight,
      background: 'linear-gradient(135deg, rgb(0 60 255) 0%, rgba(0, 0, 0, 1) 25%, rgba(0, 0, 0, 1) 75%, rgb(255 0 0) 100%)',
      border: selected ? '3px solid #fbbf24' : '2px solid #fff',
      borderRadius: '12px',
      padding: '16px',
      boxShadow: selected 
        ? '0 8px 16px rgba(0,0,0,0.2), 0 0 0 3px rgba(251, 36, 36, 0.78)' 
        : '0 4px 6px rgba(0,0,0,0.1), 0 1px 3px rgba(0,0,0,0.08)',
      color: '#fff',
      fontFamily: 'Inter, system-ui, sans-serif',
      position: 'relative'
    }}>
      {/* Delete Button - Only show when selected */}
      {selected && (
        <button
          onClick={handleDelete}
          style={{
            position: 'absolute',
            top: '-12px',
            right: '-12px',
            width: '28px',
            height: '28px',
            borderRadius: '50%',
            border: '2px solid #fff',
            background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
            color: '#fff',
            fontSize: '16px',
            fontWeight: 'bold',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
            zIndex: 10,
            transition: 'transform 0.2s',
          }}
          onMouseEnter={(e) => e.target.style.transform = 'scale(1.1)'}
          onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
          title="Delete node (or press Delete key)"
        >
          ×
        </button>
      )}

      {/* Handles - Inputs */}
      {config.handles?.inputs?.map((handle, idx) => (
        <Handle
          key={`input-${idx}`}
          type="target"
          position={Position.Left}
          id={`${id}-${handle.id}`}
          style={{
            top: config.handles.inputs.length > 1 
              ? `${((idx + 1) * 100) / (config.handles.inputs.length + 1)}%`
              : '50%',
            background: '#fff',
            border: '2px solid #667eea',
            width: '12px',
            height: '12px'
          }}
        />
      ))}

      {/* Dynamic handles for text node variables */}
      {config.type === 'text' && variables.map((varName, idx) => (
        <Handle
          key={`var-${varName}`}
          type="target"
          position={Position.Left}
          id={`${id}-${varName}`}
          style={{
            top: `${((idx + 2) * 100) / (variables.length + 3)}%`,
            background: '#fbbf24',
            border: '2px solid #fff',
            width: '10px',
            height: '10px'
          }}
        />
      ))}

      {/* Header */}
      <div style={{
        fontSize: '16px',
        fontWeight: '700',
        marginBottom: '12px',
        display: 'flex',
        alignItems: 'center',
        gap: '8px'
      }}>
        <span style={{ fontSize: '20px' }}>{config.icon}</span>
        {config.label}
      </div>

      {/* Fields */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {Object.entries(config.fields || {}).map(([fieldName, fieldConfig]) => (
          <div key={fieldName}>
            <label style={{
              display: 'block',
              fontSize: '12px',
              marginBottom: '4px',
              opacity: 0.9,
              fontWeight: '500'
            }}>
              {fieldConfig.label}:
            </label>
            {fieldConfig.type === 'text' && (
              <input
                type="text"
                value={fields[fieldName] || fieldConfig.default || ''}
                onChange={(e) => handleFieldChange(fieldName, e.target.value)}
                style={{
                  width: '100%',
                  padding: '6px 8px',
                  borderRadius: '6px',
                  border: 'none',
                  fontSize: '13px',
                  fontFamily: 'inherit'
                }}
              />
            )}
            {fieldConfig.type === 'textarea' && (
              <textarea
                value={fields[fieldName] || fieldConfig.default || ''}
                onChange={(e) => handleFieldChange(fieldName, e.target.value)}
                rows={3}
                style={{
                  width: '100%',
                  padding: '6px 8px',
                  borderRadius: '6px',
                  border: 'none',
                  fontSize: '13px',
                  fontFamily: 'inherit',
                  resize: 'vertical'
                }}
              />
            )}
            {fieldConfig.type === 'select' && (
              <select
                value={fields[fieldName] || fieldConfig.default || fieldConfig.options[0]}
                onChange={(e) => handleFieldChange(fieldName, e.target.value)}
                style={{
                  width: '100%',
                  padding: '6px 8px',
                  borderRadius: '6px',
                  border: 'none',
                  fontSize: '13px',
                  fontFamily: 'inherit'
                }}
              >
                {fieldConfig.options.map(opt => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            )}
          </div>
        ))}
      </div>

      {/* Show detected variables for text node */}
      {config.type === 'text' && variables.length > 0 && (
        <div style={{
          marginTop: '10px',
          fontSize: '11px',
          opacity: 0.8,
          fontStyle: 'italic'
        }}>
          Variables: {variables.join(', ')}
        </div>
      )}

      {/* Handles - Outputs */}
      {config.handles?.outputs?.map((handle, idx) => (
        <Handle
          key={`output-${idx}`}
          type="source"
          position={Position.Right}
          id={`${id}-${handle.id}`}
          style={{
            top: config.handles.outputs.length > 1 
              ? `${((idx + 1) * 100) / (config.handles.outputs.length + 1)}%`
              : '50%',
            background: '#fff',
            border: '2px solid #764ba2',
            width: '12px',
            height: '12px'
          }}
        />
      ))}
    </div>
  );
};