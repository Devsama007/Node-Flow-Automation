// filterNode.js

import { BaseNode } from './baseNode';

const config = {
  type: 'filter',
  label: 'Filter',
  icon: '🔍',
  width: 240,
  height: 140,
  fields: {
    condition: { type: 'text', label: 'Condition', default: 'value > 0' }
  },
  handles: {
    inputs: [{ id: 'input' }],
    outputs: [{ id: 'output' }]
  }
};

export const FilterNode = (props) => <BaseNode {...props} config={config} />;