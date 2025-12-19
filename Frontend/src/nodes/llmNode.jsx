// llmNode.js

import { BaseNode } from './baseNode';

const config = {
  type: 'llm',
  label: 'LLM',
  icon: '🤖',
  width: 240,
  height: 140,
  fields: {},
  handles: {
    inputs: [{ id: 'system' }, { id: 'prompt' }],
    outputs: [{ id: 'response' }]
  }
};

export const LLMNode = (props) => <BaseNode {...props} config={config} />;