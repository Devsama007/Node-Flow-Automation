// textNode.js

import { BaseNode } from './baseNode';

const config = {
  type: 'text',
  label: 'Text',
  icon: '📝',
  width: 240,
  height: 140,
  fields: {
    text: { type: 'textarea', label: 'Text', default: '{{input}}' }
  },
  handles: {
    outputs: [{ id: 'output' }]
  }
};

export const TextNode = (props) => <BaseNode {...props} config={config} />;