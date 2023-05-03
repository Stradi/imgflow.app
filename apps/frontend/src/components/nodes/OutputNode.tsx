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
            setNodeData(props.id, {
              ...getNodeData(props.id),
              filename: e,
            })
          }
        />
        <SelectInput
          label="Format"
          placeholder="Select output format"
          value={getNodeData(props.id).format}
          onValueChange={(e) =>
            setNodeData(props.id, {
              ...getNodeData(props.id),
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
            setNodeData(props.id, {
              ...getNodeData(props.id),
              quality: e,
            })
          }
        />
      </BaseNode.Content>
    </BaseNode>
  );
}
