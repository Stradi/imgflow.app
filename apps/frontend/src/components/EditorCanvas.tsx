import useCanvasStore from '@/stores/CanvasStore';
import { getLayoutedElements } from '@/utils/layout';
import { useCallback, useEffect, useRef, useState } from 'react';
import {
  Background,
  Edge,
  Node,
  ReactFlow,
  ReactFlowProvider,
  addEdge,
  getConnectedEdges,
  getIncomers,
  getOutgoers,
  useEdgesState,
  useNodesState,
} from 'reactflow';
import { shallow } from 'zustand/shallow';
import ReactiveEdge from './ReactiveEdge';
import InputImageNode from './nodes/InputImageNode';
import OutputNode from './nodes/OutputNode';
import ResizeNode from './nodes/ResizeNode';

const customNodes = {
  InputImage: InputImageNode,
  Output: OutputNode,
  Resize: ResizeNode,
};

const customEdges = {
  Reactive: ReactiveEdge,
};

export default function EditorCanvas() {
  const { getNewNodeID, getNewEdgeID } = useCanvasStore(
    (state) => ({
      getNewNodeID: state.getNewNodeID,
      getNewEdgeID: state.getNewEdgeID,
    }),
    shallow
  );

  const initialNodes: Node[] = [
    {
      id: getNewNodeID(),
      position: { x: 0, y: 0 },
      type: 'InputImage',
      deletable: false,
      data: {},
    },
    {
      id: getNewNodeID(),
      position: { x: 0, y: 150 },
      type: 'Output',
      deletable: false,
      data: {},
    },
  ];

  const initialEdges: Edge[] = [
    {
      id: getNewEdgeID(),
      source: initialNodes[0].id,
      target: initialNodes[1].id,
      type: 'Reactive',
    },
  ];

  const wrapper = useRef<HTMLDivElement>(null);

  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const [layoutedElements, setLayoutedElements] = useState<any[]>([]);

  useEffect(() => {
    // @ts-ignore
    setLayoutedElements(getLayoutedElements([...nodes, ...edges]));
  }, [nodes, edges]);

  const layoutedNodes = layoutedElements.filter((x) => x.position);
  const layoutedEdges = layoutedElements.filter((x) => !x.position);

  const onConnect = useCallback((params: any) => setEdges((eds) => addEdge(params, eds)), [setEdges]);

  const onDragOver = useCallback((event: any) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  function onNodesDelete(deletedNodes: Node[]) {
    setEdges(
      deletedNodes.reduce((acc, node) => {
        const incomers = getIncomers(node, nodes, edges);
        const outgoers = getOutgoers(node, nodes, edges);
        const connectedEdges = getConnectedEdges([node], edges);

        const remainingEdges = acc.filter((edge) => !connectedEdges.includes(edge));

        const createdEdges = incomers.flatMap(({ id: source }) =>
          outgoers.map(({ id: target }) => ({ id: getNewEdgeID(), source, target, type: 'Reactive' }))
        );

        return [...remainingEdges, ...createdEdges];
      }, edges)
    );
  }

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
          onDragOver={onDragOver}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onNodesDelete={onNodesDelete}
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
