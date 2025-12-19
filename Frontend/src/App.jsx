import { PipelineToolbar } from './toolbar';
import { PipelineUI } from './ui';
import { SubmitButton } from './submit';

function App() {
  return (
    <div style={{ 
      height: '100vh', 
      display: 'flex', 
      flexDirection: 'column',
      fontFamily: 'Inter, system-ui, sans-serif'
    }}>
      <PipelineToolbar />
      <PipelineUI />
      <SubmitButton />
    </div>
  );
}

export default App;
