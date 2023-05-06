import useCanvasStore from '@/stores/CanvasStore';
import BaseNode from './BaseNode';
import NumberInput from './inputs/NumberInput';

export default function ModulateNode(props: any) {
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
      <BaseNode.Header>Modulate</BaseNode.Header>
      <BaseNode.Content>
        <NumberInput
          label="Brightness"
          placeholder="Brightness multiplier"
          value={getNodeData(props.id).brightness}
          min={0}
          max={5}
          onValueChange={(e) =>
            setNodeData(props.id, {
              ...getNodeData(props.id),
              brightness: e,
            })
          }
        />
        <NumberInput
          label="Saturation"
          placeholder="Saturation multiplier"
          value={getNodeData(props.id).saturation}
          min={0}
          max={5}
          onValueChange={(e) =>
            setNodeData(props.id, {
              ...getNodeData(props.id),
              saturation: e,
            })
          }
        />
        <NumberInput
          label="Hue"
          placeholder="Hue rotation"
          value={getNodeData(props.id).hue}
          min={0}
          max={360}
          onValueChange={(e) =>
            setNodeData(props.id, {
              ...getNodeData(props.id),
              hue: e,
            })
          }
        />
      </BaseNode.Content>
    </BaseNode>
  );
}
