import useCanvasStore from '@/stores/CanvasStore';
import { isNumberValid } from '@/utils/check';
import { useEffect } from 'react';
import BaseNode from './BaseNode';
import NumberInput from './inputs/NumberInput';

export default function CropNode(props: any) {
  const { getNodeData, setNodeData } = useCanvasStore((state) => ({
    getNodeData: state.getNodeData,
    setNodeData: state.setNodeData,
  }));

  function getValidationError() {
    const { top, left, width, height } = getNodeData(props.id);
    if (!isNumberValid(top, 0, 10000)) {
      return "'top' must be between 0 and 10000";
    }

    if (!isNumberValid(left, 0, 10000)) {
      return "'left' must be between 0 and 10000";
    }

    if (!isNumberValid(width, 1, 10000)) {
      return "'width' must be between 1 and 10000";
    }

    if (!isNumberValid(height, 1, 10000)) {
      return "'height' must be between 0 and 10000";
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
    const { top, left, width, height } = getNodeData(props.id);
    if (!isNumberValid(top, 0, 10000)) {
      set({ top: 0 });
    }

    if (!isNumberValid(left, 0, 10000)) {
      set({ left: 0 });
    }

    if (!isNumberValid(width, 1, 10000)) {
      set({ width: 1 });
    }

    if (!isNumberValid(height, 1, 10000)) {
      set({ height: 1 });
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
      <BaseNode.Header collapsible>Crop</BaseNode.Header>
      <BaseNode.Content>
        <NumberInput
          label="Top"
          placeholder="Position of top left corner"
          value={getNodeData(props.id).top}
          min={0}
          max={10000}
          onValueChange={(e) =>
            set({
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
            set({
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
            set({
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
            set({
              height: e,
            })
          }
        />
      </BaseNode.Content>
    </BaseNode>
  );
}
