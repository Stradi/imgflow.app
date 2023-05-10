import useCanvasStore from '@/stores/CanvasStore';
import { isColorValid } from '@/utils/check';
import { useEffect } from 'react';
import BaseNode from './BaseNode';
import ColorPickerInput from './inputs/ColorPickerInput';

export default function TintNode(props: any) {
  const { getNodeData, setNodeData } = useCanvasStore((state) => ({
    getNodeData: state.getNodeData,
    setNodeData: state.setNodeData,
  }));

  function getValidationError() {
    const { color } = getNodeData(props.id);
    if (!isColorValid(color)) {
      return "'color' must be a valid color";
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
    const { color } = getNodeData(props.id);

    if (!isColorValid(color)) {
      set({ color: '#000000' });
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
      <BaseNode.Header collapsible>Tint</BaseNode.Header>
      <BaseNode.Content>
        <ColorPickerInput
          label="Color"
          value={getNodeData(props.id).color}
          onValueChange={(e) =>
            set({
              color: e,
            })
          }
        />
      </BaseNode.Content>
    </BaseNode>
  );
}
