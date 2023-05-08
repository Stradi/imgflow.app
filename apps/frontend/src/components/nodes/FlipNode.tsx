import useCanvasStore from '@/stores/CanvasStore';
import BaseNode from './BaseNode';
import CheckboxInput from './inputs/CheckboxInput';

export default function FlipNode(props: any) {
  const { getNodeData, setNodeData } = useCanvasStore((state) => ({
    getNodeData: state.getNodeData,
    setNodeData: state.setNodeData,
  }));

  return (
    <BaseNode
      node={props}
      leftHandle={{
        type: 'target',
      }}
      rightHandle={{
        type: 'source',
      }}
    >
      <BaseNode.Header collapsible>Flip</BaseNode.Header>
      <BaseNode.Content>
        <CheckboxInput
          label="Horizontal"
          value={getNodeData(props.id).x}
          onValueChange={(e) => setNodeData(props.id, { ...getNodeData(props.id), x: e })}
        />
        <CheckboxInput
          label="Vertical"
          value={getNodeData(props.id).y}
          onValueChange={(e) => setNodeData(props.id, { ...getNodeData(props.id), y: e })}
        />
      </BaseNode.Content>
    </BaseNode>
  );
}
