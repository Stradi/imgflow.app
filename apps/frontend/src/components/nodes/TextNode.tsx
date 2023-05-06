import useCanvasStore from '@/stores/CanvasStore';
import BaseNode from './BaseNode';
import ColorPickerInput from './inputs/ColorPickerInput';
import SelectInput from './inputs/SelectInput';
import SliderInput from './inputs/SliderInput';
import TextInput from './inputs/TextInput';

export default function TextNode(props: any) {
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
      <BaseNode.Header>Text</BaseNode.Header>
      <BaseNode.Content>
        <TextInput
          label="Text"
          placeholder="Text"
          value={getNodeData(props.id).text}
          onValueChange={(e) => setNodeData(props.id, { ...getNodeData(props.id), text: e })}
        />
        <SliderInput
          label="Size"
          min={0}
          max={100}
          value={getNodeData(props.id).size}
          onValueChange={(e) => setNodeData(props.id, { ...getNodeData(props.id), size: e })}
          step={1}
        />
        <SelectInput
          label="Position"
          placeholder="Position of text"
          value={getNodeData(props.id).position}
          onValueChange={(e) => setNodeData(props.id, { ...getNodeData(props.id), position: e })}
          options={[
            'Top Left',
            'Top Center',
            'Top Right',
            'Center Left',
            'Center',
            'Center Right',
            'Bottom Left',
            'Bottom Center',
            'Bottom Right',
          ]}
        />
        <ColorPickerInput
          label="Text Color"
          value={getNodeData(props.id).textColor}
          onValueChange={(e) => setNodeData(props.id, { ...getNodeData(props.id), textColor: e })}
        />
      </BaseNode.Content>
    </BaseNode>
  );
}
