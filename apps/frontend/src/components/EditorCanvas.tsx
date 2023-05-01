import useCanvasStore from '@/stores/CanvasStore';
import { getLayoutedElements } from '@/utils/layout';
import { useEffect, useRef, useState } from 'react';
import { Background, ReactFlow, ReactFlowProvider } from 'reactflow';
import { shallow } from 'zustand/shallow';
import ReactiveEdge from './ReactiveEdge';
import CropNode from './nodes/CropNode';
import InputImageNode from './nodes/InputImageNode';
import OutputNode from './nodes/OutputNode';
import ResizeNode from './nodes/ResizeNode';

const customNodes = {
  InputImage: InputImageNode,
  Output: OutputNode,
  Resize: ResizeNode,
  Crop: CropNode,
};

const customEdges = {
  Reactive: ReactiveEdge,
};

export default function EditorCanvas() {
  const wrapper = useRef<HTMLDivElement>(null);
  const [layoutedElements, setLayoutedElements] = useState<any[]>([]);

  const { nodes, edges, onConnect, onNodesChange, onEdgesChange, onNodesDelete } = useCanvasStore(
    (state) => ({
      nodes: state.nodes,
      edges: state.edges,
      onConnect: state.onConnect,
      onNodesChange: state.onNodesChange,
      onEdgesChange: state.onEdgesChange,
      onNodesDelete: state.onNodesDelete,
    }),
    shallow
  );

  useEffect(() => {
    // @ts-ignore
    setLayoutedElements(getLayoutedElements([...nodes, ...edges]));
  }, [nodes, edges]);

  const layoutedNodes = layoutedElements.filter((x) => x.position);
  const layoutedEdges = layoutedElements.filter((x) => !x.position);

  return (
    <div ref={wrapper} className="w-full h-full">
      <ReactFlowProvider>
        <ReactFlow
          fitView
          nodeTypes={customNodes}
          // @ts-ignore
          edgeTypes={customEdges}
          nodes={layoutedNodes}
          edges={layoutedEdges}
          onConnect={onConnect}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onNodesDelete={onNodesDelete}
          onDragOver={(event) => {
            event.preventDefault();
            event.dataTransfer.dropEffect = 'move';
          }}
          multiSelectionKeyCode={null}
          selectionKeyCode={null}
          proOptions={{
            hideAttribution: true,
          }}
          defaultEdgeOptions={{
            deletable: false,
          }}
        >
          <Background className="bg-gray-100" />
        </ReactFlow>
      </ReactFlowProvider>
    </div>
  );
}
