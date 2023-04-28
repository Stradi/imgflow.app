import { useCallback, useRef, useState } from 'react';
import { Background, Edge, Node, ReactFlow, ReactFlowInstance, addEdge, useEdgesState, useNodesState } from 'reactflow';
import InputImageNode from './nodes/InputImageNode';
import OutputNode from './nodes/OutputNode';
import ResizeNode from './nodes/ResizeNode';

let nodeIdCounter = 0;
let edgeIdCounter = 0;

function getNewNodeID() {
  return `node_${nodeIdCounter++}`;
}

function getNewEdgeID() {
  return `edge_${edgeIdCounter++}`;
}

const customNodes = {
  InputImage: InputImageNode,
  Output: OutputNode,
  Resize: ResizeNode,
};

const initialNodes: Node[] = [
  {
    id: getNewNodeID(),
    position: { x: 0, y: 0 },
    type: 'InputImage',
    data: {},
  },
  {
    id: getNewNodeID(),
    position: { x: 0, y: 150 },
    type: 'Output',
    data: {},
  },
];

const initialEdges: Edge[] = [
  {
    id: getNewEdgeID(),
    source: initialNodes[0].id,
    target: initialNodes[1].id,
  },
];

export default function EditorCanvas() {
  const wrapper = useRef<HTMLDivElement>(null);
  const [instance, setInstance] = useState<ReactFlowInstance | null>(null);

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback((params: any) => setEdges((eds) => addEdge(params, eds)), [setEdges]);
  const onDragOver = useCallback((event: any) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);
  const onDrop = useCallback(
    (event: any) => {
      event.preventDefault();
      if (!wrapper || !wrapper.current || !instance) {
        return;
      }

      const type = event.dataTransfer.getData('application/reactflow');
      if (typeof type === 'undefined' || !type) {
        return;
      }

      const bounds = wrapper.current.getBoundingClientRect();
      const position = instance.project({
        x: event.clientX - bounds.left,
        y: event.clientY - bounds.top,
      });

      setNodes((nds) =>
        nds.concat({
          id: getNewNodeID(),
          type,
          position,
          data: {},
        })
      );
    },
    [instance, setNodes]
  );

  return (
    <div ref={wrapper} className="w-full h-full">
      <ReactFlow
        fitView
        nodeTypes={customNodes}
        nodes={nodes}
        edges={edges}
        onDrop={onDrop}
        onInit={setInstance}
        onConnect={onConnect}
        onDragOver={onDragOver}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        proOptions={{
          hideAttribution: true,
        }}
      >
        <Background className="bg-gray-100" />
      </ReactFlow>
    </div>
  );
}
