import useCanvasStore from '@/stores/CanvasStore';
import BaseNode from './BaseNode';
import NumberInput from './inputs/NumberInput';
import SelectInput from './inputs/SelectInput';
import TextInput from './inputs/TextInput';

export default function OutputNode(props: any) {
  const { getNodeData, setNodeData } = useCanvasStore((state) => ({
    getNodeData: state.getNodeData,
    setNodeData: state.setNodeData,
  }));

  function getValidationError() {
    const { filename, format, quality } = getNodeData(props.id);
    if (!filename || !format || !quality) {
      return 'All fields are required';
    }

    if (filename === '') {
      return 'Filename cannot be empty';
    }

    if (quality < 0 || quality > 100) {
      return 'Quality must be between 0 and 100';
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
    >
      <BaseNode.Header>Output</BaseNode.Header>
      <BaseNode.Content>
        <TextInput
          label="Filename"
          placeholder="Enter filename"
          value={getNodeData(props.id).filename}
          onValueChange={(e) =>
            set({
              filename: e,
            })
          }
        />
        <SelectInput
          label="Format"
          placeholder="Select output format"
          value={getNodeData(props.id).format}
          onValueChange={(e) =>
            set({
              format: e,
            })
          }
          defaultValue={getNodeData(props.id).format}
          options={['webp', 'jpg', 'png']}
        />
        <NumberInput
          label="Quality"
          placeholder="Select output quality"
          value={getNodeData(props.id).quality}
          min={0}
          max={100}
          onValueChange={(e) =>
            set({
              quality: e,
            })
          }
        />
      </BaseNode.Content>
    </BaseNode>
  );
}
