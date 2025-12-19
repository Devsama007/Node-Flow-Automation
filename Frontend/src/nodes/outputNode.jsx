// outputNode.js

import { BaseNode } from './baseNode';

const config = {
  type: 'output',
  label: 'Output',
  icon: '📤',
  width: 240,
  height: 140,
  fields: {
    outputName: { type: 'text', label: 'Name', default: 'output_1' },
    outputType: { type: 'select', label: 'Type', options: ['Text', 'Image'] }
  },
  handles: {
    inputs: [{ id: 'value' }]
  }
};

export const OutputNode = (props) => <BaseNode {...props} config={config} />;