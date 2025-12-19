// transformNode.js

import { BaseNode } from './baseNode';

const config = {
  type: 'transform',
  label: 'Transform',
  icon: '⚙️',
  width: 240,
  height: 140,
  fields: {
    operation: { type: 'select', label: 'Operation', options: ['Uppercase', 'Lowercase', 'Reverse', 'Trim'] }
  },
  handles: {
    inputs: [{ id: 'input' }],
    outputs: [{ id: 'output' }]
  }
};

export const TransformNode = (props) => <BaseNode {...props} config={config} />;