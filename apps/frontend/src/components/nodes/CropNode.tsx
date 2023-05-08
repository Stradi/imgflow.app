import useCanvasStore from '@/stores/CanvasStore';
import BaseNode from './BaseNode';
import NumberInput from './inputs/NumberInput';

export default function CropNode(props: any) {
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
      <BaseNode.Header collapsible>Crop</BaseNode.Header>
      <BaseNode.Content>
        <NumberInput
          label="Top"
          placeholder="Position of top left corner"
          value={getNodeData(props.id).top}
          min={0}
          max={10000}
          onValueChange={(e) =>
            setNodeData(props.id, {
              ...getNodeData(props.id),
              top: e,
            })
          }
        />
        <NumberInput
          label="Left"
          placeholder="Position of top left corner"
          value={getNodeData(props.id).left}
          min={0}
          max={10000}
          onValueChange={(e) =>
            setNodeData(props.id, {
              ...getNodeData(props.id),
              left: e,
            })
          }
        />
        <NumberInput
          label="Width"
          placeholder="Width of cropped image"
          value={getNodeData(props.id).width}
          min={0}
          max={10000}
          onValueChange={(e) =>
            setNodeData(props.id, {
              ...getNodeData(props.id),
              width: e,
            })
          }
        />
        <NumberInput
          label="Height"
          placeholder="Height of cropped image"
          value={getNodeData(props.id).height}
          min={0}
          max={10000}
          onValueChange={(e) =>
            setNodeData(props.id, {
              ...getNodeData(props.id),
              height: e,
            })
          }
        />
      </BaseNode.Content>
    </BaseNode>
  );
}
