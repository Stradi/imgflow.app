import useCanvasStore from '@/stores/CanvasStore';
import BaseNode from './BaseNode';
import NumberInput from './inputs/NumberInput';

export default function RotateNode(props: any) {
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
      <BaseNode.Header>Rotate</BaseNode.Header>
      <BaseNode.Content>
        <NumberInput
          label="Angle"
          placeholder="Angle of rotation"
          value={getNodeData(props.id).angle}
          min={0}
          max={360}
          onValueChange={(e) =>
            setNodeData(props.id, {
              ...getNodeData(props.id),
              angle: e,
            })
          }
        />
      </BaseNode.Content>
    </BaseNode>
  );
}
