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

  function getValidationError() {
    const { text, size } = getNodeData(props.id);
    if (!text) {
      return 'Text cannot be empty';
    }

    if (!size || isNaN(size)) {
      return 'Size cannot be empty';
    }

    if (size < 0 || size > 100) {
      return 'Size must be between 0 and 100';
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
      <BaseNode.Header collapsible>Text</BaseNode.Header>
      <BaseNode.Content>
        <TextInput
          label="Text"
          placeholder="Text"
          value={getNodeData(props.id).text}
          onValueChange={(e) => set({ text: e })}
        />
        <SliderInput
          label="Size"
          min={0}
          max={100}
          value={getNodeData(props.id).size}
          onValueChange={(e) => set({ size: e })}
          step={1}
        />
        <SelectInput
          label="Position"
          placeholder="Position of text"
          value={getNodeData(props.id).position}
          onValueChange={(e) => set({ position: e })}
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
          onValueChange={(e) => set({ textColor: e })}
        />
      </BaseNode.Content>
    </BaseNode>
  );
}
