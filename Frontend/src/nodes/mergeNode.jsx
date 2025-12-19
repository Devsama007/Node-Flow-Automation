// mergeNode.js

import { BaseNode } from './baseNode';

const config = {
  type: 'merge',
  label: 'Merge',
  icon: '🔗',
  width: 240,
  height: 140,
  fields: {
    separator: { type: 'text', label: 'Separator', default: ', ' }
  },
  handles: {
    inputs: [{ id: 'input1' }, { id: 'input2' }],
    outputs: [{ id: 'output' }]
  }
};

export const MergeNode = (props) => <BaseNode {...props} config={config} />;