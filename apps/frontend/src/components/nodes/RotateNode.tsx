import useCanvasStore from '@/stores/CanvasStore';
import { isNumberValid } from '@/utils/check';
import { useEffect } from 'react';
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
    if (!isNumberValid(angle, 0, 360)) {
      return "'angle' must be between 0 and 360";
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

  useEffect(() => {
    const { angle } = getNodeData(props.id);
    if (!isNumberValid(angle, 0, 360)) {
      set({ angle: 0 });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
