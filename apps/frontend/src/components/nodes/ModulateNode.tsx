import useCanvasStore from '@/stores/CanvasStore';
import BaseNode from './BaseNode';
import NumberInput from './inputs/NumberInput';

export default function ModulateNode(props: any) {
  const { getNodeData, setNodeData } = useCanvasStore((state) => ({
    getNodeData: state.getNodeData,
    setNodeData: state.setNodeData,
  }));

  function getValidationError() {
    const { brightness, saturation, hue } = getNodeData(props.id);
    if (!brightness || isNaN(brightness)) {
      return 'Brightness cannot be empty';
    }

    if (brightness < 0 || brightness > 5) {
      return 'Brightness must be between 0 and 5';
    }

    if (!saturation || isNaN(saturation)) {
      return 'Saturation cannot be empty';
    }

    if (saturation < 0 || saturation > 5) {
      return 'Saturation must be between 0 and 5';
    }

    if (!hue || isNaN(hue)) {
      return 'Hue cannot be empty';
    }

    if (hue < 0 || hue > 360) {
      return 'Hue must be between 0 and 5';
    }

    return '';
  }

  function set(data: any) {
    setNodeData(props.id, {
      ...getNodeData(props.id),
      ...data,
      getValidationError,
    });
  }

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
      <BaseNode.Header collapsible>Modulate</BaseNode.Header>
      <BaseNode.Content>
        <NumberInput
          label="Brightness"
          placeholder="Brightness multiplier"
          value={getNodeData(props.id).brightness}
          min={0}
          max={5}
          onValueChange={(e) =>
            set({
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
            set({
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
            set({
              hue: e,
            })
          }
        />
      </BaseNode.Content>
    </BaseNode>
  );
}
