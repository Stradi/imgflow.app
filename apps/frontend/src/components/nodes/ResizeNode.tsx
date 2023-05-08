import useCanvasStore from '@/stores/CanvasStore';
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
    const { width, height } = getNodeData(props.id);
    if (!width || isNaN(width)) {
      return 'Width cannot be empty';
    }

    if (width < 0 || width > 10000) {
      return 'Width must be between 0 and 10000';
    }

    if (!height || isNaN(height)) {
      return 'Height cannot be empty';
    }

    if (height < 0 || height > 10000) {
      return 'Height must be between 0 and 10000';
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
          value={getNodeData(props.id).format}
          onValueChange={(e) =>
            set({
              fit: e,
            })
          }
          defaultValue={getNodeData(props.id).format}
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
