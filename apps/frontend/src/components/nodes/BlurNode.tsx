import useCanvasStore from '@/stores/CanvasStore';
import BaseNode from './BaseNode';
import NumberInput from './inputs/NumberInput';

export default function BlurNode(props: any) {
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
      <BaseNode.Header collapsible>Blur</BaseNode.Header>
      <BaseNode.Content>
        <NumberInput
          label="Amount"
          placeholder="Blur amount"
          min={0}
          max={100}
          value={getNodeData(props.id).sigma}
          onValueChange={(e) => setNodeData(props.id, { ...getNodeData(props.id), sigma: e })}
        />
      </BaseNode.Content>
    </BaseNode>
  );
}
