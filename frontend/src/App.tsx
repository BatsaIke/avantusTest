import React from 'react';
import { useBlueprintGraph } from './hooks/useBlueprintGraph';
import { FlowDiagram } from './components/FlowDiagram/FlowDiagram';

const App: React.FC = () => {
  const tenantId = '123';
  const actionBlueprintId = 'bp_456';

  const { data, loading, error } = useBlueprintGraph(tenantId, actionBlueprintId);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!data) return <div>No data found</div>;

  return <FlowDiagram initialNodes={data.nodes} initialEdges={data.edges} />;
}; 

export default App;
