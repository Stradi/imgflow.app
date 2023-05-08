import useCanvasStore from '@/stores/CanvasStore';
import BaseNode from './BaseNode';
import ColorPickerInput from './inputs/ColorPickerInput';
import NumberInput from './inputs/NumberInput';

export default function RotateNode(props: any) {
  const { getNodeData, setNodeData } = useCanvasStore((state) => ({
    getNodeData: state.getNodeData,
    setNodeData: state.setNodeData,
  }));

  function getValidationError() {
    const { angle } = getNodeData(props.id);
    if (!angle || isNaN(angle)) {
      return 'Angle cannot be empty';
    }

    if (angle < 0 || angle > 360) {
      return 'Angle must be between 0 and 360';
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
      <BaseNode.Header collapsible>Rotate</BaseNode.Header>
      <BaseNode.Content>
        <NumberInput
          label="Angle"
          placeholder="Angle of rotation"
          value={getNodeData(props.id).angle}
          min={0}
          max={360}
          onValueChange={(e) =>
            set({
              angle: e,
            })
          }
        />
        <ColorPickerInput
          label="Background color"
          value={getNodeData(props.id).background}
          onValueChange={(e) =>
            set({
              background: e,
            })
          }
        />
      </BaseNode.Content>
    </BaseNode>
  );
}
