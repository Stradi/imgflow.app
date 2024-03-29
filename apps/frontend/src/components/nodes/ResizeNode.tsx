import useCanvasStore from '@/stores/CanvasStore';
import { isColorValid, isNumberValid, isStringValid } from '@/utils/check';
import { useEffect } from 'react';
import BaseNode from './BaseNode';
import ColorPickerInput from './inputs/ColorPickerInput';
import NumberInput from './inputs/NumberInput';
import SelectInput from './inputs/SelectInput';

export default function ResizeNode(props: any) {
  const { getNodeData, setNodeData } = useCanvasStore((state) => ({
    getNodeData: state.getNodeData,
    setNodeData: state.setNodeData,
  }));

  function getValidationError() {
    const { width, height, fit, background } = getNodeData(props.id);
    if (!isNumberValid(width, 1, 10000)) {
      return "'width' must be between 1 and 10000";
    }

    if (!isNumberValid(height, 1, 10000)) {
      return "'height' must be between 1 and 10000";
    }

    if (!isStringValid(fit)) {
      return "'fit' cannot be empty";
    }

    if (!isColorValid(background)) {
      return "'background' must be a valid color";
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
    const { width, height, fit, background } = getNodeData(props.id);

    if (!isNumberValid(width, 1, 10000)) {
      set({ width: 1 });
    }

    if (!isNumberValid(height, 1, 10000)) {
      set({ height: 1 });
    }

    if (!isStringValid(fit)) {
      set({ fit: 'contain' });
    }

    if (!isColorValid(background)) {
      set({ background: '#000000' });
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
      <BaseNode.Header collapsible>Resize</BaseNode.Header>
      <BaseNode.Content>
        <NumberInput
          label="Width"
          placeholder="Select output width"
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
          placeholder="Select output height"
          value={getNodeData(props.id).height}
          min={0}
          max={10000}
          onValueChange={(e) =>
            set({
              height: e,
            })
          }
        />
        <SelectInput
          label="Fit"
          placeholder="Select fitting method"
          value={getNodeData(props.id).fit}
          onValueChange={(e) =>
            set({
              fit: e,
            })
          }
          defaultValue={getNodeData(props.id).fit}
          options={['contain', 'cover', 'fill', 'inside', 'outsite']}
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
