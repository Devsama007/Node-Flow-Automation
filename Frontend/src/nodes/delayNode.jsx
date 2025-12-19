// delayNode.js

import { BaseNode } from './baseNode';

const config = {
  type: 'delay',
  label: 'Delay',
  icon: '⏱️',
  width: 240,
  height: 140,
  fields: {
    duration: { type: 'text', label: 'Duration (ms)', default: '1000' }
  },
  handles: {
    inputs: [{ id: 'input' }],
    outputs: [{ id: 'output' }]
  }
};

export const DelayNode = (props) => <BaseNode {...props} config={config} />;