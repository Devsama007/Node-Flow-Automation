// conditionalNode.js

import { BaseNode } from './baseNode';

const config = {
  type: 'conditional',
  label: 'Conditional',
  icon: '🔀',
  width: 240,
  height: 160,
  fields: {
    condition: { type: 'text', label: 'If Condition', default: 'true' }
  },
  handles: {
    inputs: [{ id: 'input' }],
    outputs: [{ id: 'true' }, { id: 'false' }]
  }
};

export const ConditionalNode = (props) => <BaseNode {...props} config={config} />;