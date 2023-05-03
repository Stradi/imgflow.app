import useCanvasStore from '@/stores/CanvasStore';
import BaseNode from './BaseNode';
import NumberInput from './inputs/NumberInput';
import SelectInput from './inputs/SelectInput';

export default function ResizeNode(props: any) {
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
      <BaseNode.Header>Resize</BaseNode.Header>
      <BaseNode.Content>
        <NumberInput
          label="Width"
          placeholder="Select output width"
          value={getNodeData(props.id).width}
          min={0}
          max={10000}
          onValueChange={(e) =>
            setNodeData(props.id, {
              ...getNodeData(props.id),
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
            setNodeData(props.id, {
              ...getNodeData(props.id),
              height: e,
            })
          }
        />
        <SelectInput
          label="Fit"
          placeholder="Select fitting method"
          value={getNodeData(props.id).format}
          onValueChange={(e) =>
            setNodeData(props.id, {
              ...getNodeData(props.id),
              fit: e,
            })
          }
          defaultValue={getNodeData(props.id).format}
          options={['contain', 'cover', 'fill', 'inside', 'outsite']}
        />
      </BaseNode.Content>
    </BaseNode>
  );
}
