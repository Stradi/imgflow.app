import useCanvasStore from '@/stores/CanvasStore';
import { isNumberValid } from '@/utils/check';
import { useEffect } from 'react';
import BaseNode from './BaseNode';
import NumberInput from './inputs/NumberInput';

export default function ModulateNode(props: any) {
  const { getNodeData, setNodeData } = useCanvasStore((state) => ({
    getNodeData: state.getNodeData,
    setNodeData: state.setNodeData,
  }));

  function getValidationError() {
    const { brightness, saturation, hue } = getNodeData(props.id);
    if (!isNumberValid(brightness, 0, 5)) {
      return "'brightness' must be between 0 and 5";
    }

    if (!isNumberValid(saturation, 0, 5)) {
      return "'saturation' must be between 0 and 5";
    }

    if (!isNumberValid(hue, 0, 360)) {
      return "'hue' must be between 0 and 360";
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
    const { brightness, saturation, hue } = getNodeData(props.id);
    if (!isNumberValid(brightness, 0, 5)) {
      set({ brightness: 0 });
    }

    if (!isNumberValid(saturation, 0, 5)) {
      set({ saturation: 0 });
    }

    if (!isNumberValid(hue, 0, 360)) {
      set({ hue: 0 });
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
