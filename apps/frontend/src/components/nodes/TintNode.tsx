import useCanvasStore from '@/stores/CanvasStore';
import BaseNode from './BaseNode';
import ColorPickerInput from './inputs/ColorPickerInput';

export default function TintNode(props: any) {
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
      <BaseNode.Header collapsible>Tint</BaseNode.Header>
      <BaseNode.Content>
        <ColorPickerInput
          label="Color"
          value={getNodeData(props.id).color}
          onValueChange={(e) =>
            setNodeData(props.id, {
              ...getNodeData(props.id),
              color: e,
            })
          }
        />
      </BaseNode.Content>
    </BaseNode>
  );
}
