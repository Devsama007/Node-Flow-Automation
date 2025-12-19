// inputNode.js

import { BaseNode } from './baseNode';

const config = {
  type: 'input',
  label: 'Input',
  icon: '📥',
  width: 240,
  height: 140,
  fields: {
    inputName: { type: 'text', label: 'Name', default: 'input_1' },
    inputType: { type: 'select', label: 'Type', options: ['Text', 'File'] }
  },
  handles: {
    outputs: [{ id: 'value' }]
  }
};

export const InputNode = (props) => <BaseNode {...props} config={config} />;