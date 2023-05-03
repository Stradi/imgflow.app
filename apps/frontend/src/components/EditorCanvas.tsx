import useCanvasStore from '@/stores/CanvasStore';
import { getLayoutedElements } from '@/utils/layout';
import { useEffect, useRef, useState } from 'react';
import { Background, Node, ReactFlow, ReactFlowProvider } from 'reactflow';
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
  const [rfInstance, setRfInstance] = useState<any>(null);

  const [layoutedElements, setLayoutedElements] = useState<any[]>([]);

  const {
    setCanvasWrapperRef,
    nodes,
    setNodes,
    edges,
    onConnect,
    onNodesChange,
    onEdgesChange,
    onNodesDelete,
    getNewNodeID,
  } = useCanvasStore(
    (state) => ({
      setCanvasWrapperRef: state.setCanvasWrapperRef,
      nodes: state.nodes,
      setNodes: state.setNodes,
      edges: state.edges,
      onConnect: state.onConnect,
      onNodesChange: state.onNodesChange,
      onEdgesChange: state.onEdgesChange,
      onNodesDelete: state.onNodesDelete,
      getNewNodeID: state.getNewNodeID,
    }),
    shallow
  );

  useEffect(() => {
    setCanvasWrapperRef(wrapper);
  }, [wrapper, setCanvasWrapperRef]);

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
          onInit={setRfInstance}
          nodeTypes={customNodes}
          // @ts-ignore
          edgeTypes={customEdges}
          nodes={nodes}
          edges={edges}
          onConnect={onConnect}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onNodesDelete={onNodesDelete}
          onDrop={(event) => {
            event.preventDefault();
            event.stopPropagation();
            const type = event.dataTransfer.getData('application/reactflow');
            if (typeof type === 'undefined' || !type) {
              return;
            }

            const offset = wrapper && wrapper.current ? wrapper.current.getBoundingClientRect() : { left: 0, top: 0 };

            const newNode = {
              id: getNewNodeID(),
              type,
              position: rfInstance.project({
                x: event.clientX - offset.left,
                y: event.pageY - offset.top,
              }),
              data: {},
            } as Node;

            setNodes([...nodes, newNode]);
          }}
          onDragOver={(event) => {
            event.preventDefault();
            event.stopPropagation();
          }}
          multiSelectionKeyCode={null}
          selectionKeyCode={null}
          proOptions={{
            hideAttribution: true,
          }}
          defaultEdgeOptions={{
            type: 'Reactive',
          }}
        >
          <Background className="bg-gray-100" />
        </ReactFlow>
      </ReactFlowProvider>
    </div>
  );
}
