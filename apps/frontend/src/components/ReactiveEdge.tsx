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
  const { isDraggingNewNode, getNewNodeID, getNewEdgeID } = useCanvasStore(
    (state) => ({
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

  const onDrop = (e: React.DragEvent<SVGForeignObjectElement>) => {
    e.preventDefault();
    e.stopPropagation();

    const type = e.dataTransfer.getData('application/reactflow');
    if (typeof type === 'undefined' || !type) {
      return;
    }

    const newNode = {
      id: getNewNodeID(),
      type,
      position: rfInstance.project({
        x: e.clientX,
        y: e.clientY,
      }),
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
      <path id={id} style={style} className="react-flow__edge-path" d={edgePath} />
      {isDraggingNewNode && (
        <foreignObject width={80} height={80} x={labelX - 20} y={labelY - 20} onDrop={onDrop}>
          <div className="w-1/2 h-1/2 rounded-full bg-green-400/75"></div>
        </foreignObject>
      )}
    </>
  );
}
