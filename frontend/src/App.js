import { PipelineToolbar } from './toolbar';
import { PipelineUI } from './ui';
import { SubmitButton } from './submit';
import { PipelineGenerator } from './PipelineGenerator';  // add this

function App() {
  return (
    <div>
      <PipelineToolbar />
      <PipelineUI />
      <SubmitButton />
      <PipelineGenerator />
    </div>
  );
}

export default App;