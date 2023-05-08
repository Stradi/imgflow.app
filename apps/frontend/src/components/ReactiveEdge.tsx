import useCanvasStore from '@/stores/CanvasStore';
import { Node, WrapEdgeProps, getBezierPath, useReactFlow } from 'reactflow';
import { shallow } from 'zustand/shallow';

export default function ReactiveEdge({
  id,
  style,
  source,
  sourceX,
  sourceY,
  sourcePosition,
  target,
  targetX,
  targetY,
  targetPosition,
}: WrapEdgeProps) {
  const { canvasWrapperRef, isDraggingNewNode, getNewNodeID, getNewEdgeID } = useCanvasStore(
    (state) => ({
      canvasWrapperRef: state.canvasWrapperRef,
      isDraggingNewNode: state.isDraggingNewNode,
      getNewNodeID: state.getNewNodeID,
      getNewEdgeID: state.getNewEdgeID,
    }),
    shallow
  );

  const rfInstance = useReactFlow();

  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  const onDrop = (e: React.DragEvent<SVGPathElement>) => {
    e.preventDefault();
    e.stopPropagation();

    const type = e.dataTransfer.getData('application/reactflow');
    if (typeof type === 'undefined' || !type) {
      return;
    }

    const offset =
      canvasWrapperRef && canvasWrapperRef.current
        ? canvasWrapperRef.current.getBoundingClientRect()
        : { left: 0, top: 0 };

    const newNode = {
      id: getNewNodeID(),
      type,
      position: rfInstance.project({
        x: e.clientX - offset.left,
        y: e.clientY - offset.top,
      }),
      // TODO: We somehow should add validation data in here for each node type
      // Here and in `EditorCanvas.ReactFlow.onDrop` event.
      data: {},
    } as Node;

    const newEdge = {
      id: getNewEdgeID(),
      source: source,
      sourceHandle: 'output',
      target: newNode.id,
      targetHandle: 'input',
      type: 'Reactive',
    };

    const newEdge2 = {
      id: getNewEdgeID(),
      source: newNode.id,
      sourceHandle: 'output',
      target: target,
      targetHandle: 'input',
      type: 'Reactive',
    };

    rfInstance.setNodes([...rfInstance.getNodes(), newNode]);
    rfInstance.setEdges([...rfInstance.getEdges().filter((e) => e.id !== id), newEdge, newEdge2]);
  };

  return (
    <>
      <path style={style} className="react-flow__edge-path-selector" d={edgePath} fillRule="evenodd" />
      <path style={style} className="react-flow__edge-path" d={edgePath} fillRule="evenodd" />
      {isDraggingNewNode && (
        <>
          <path className="react-flow__edge-path !stroke-red-500 !stroke-[8]" d={edgePath} />
          <path onDrop={onDrop} className="opacity-0 !stroke-[64]" d={edgePath} />{' '}
        </>
      )}
    </>
  );
}
